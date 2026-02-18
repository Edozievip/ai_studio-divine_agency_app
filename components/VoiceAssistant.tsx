
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { 
  X, 
  AudioLines, 
  Loader2, 
  Volume2, 
  Mic
} from 'lucide-react';
import { 
  DIVINE_AGENCY_SYSTEM_INSTRUCTION, 
  createPcmBlob, 
  decodeAudio, 
  decodeAudioData 
} from '../services/geminiLive';

interface VoiceAssistantProps {
  onClose: () => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onClose }) => {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  
  const aiRef = useRef<any>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const startSession = async () => {
    try {
      setStatus('connecting');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      aiRef.current = ai;

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          systemInstruction: DIVINE_AGENCY_SYSTEM_INSTRUCTION,
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setStatus('listening');
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message) => {
            if (message.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
              const base64Audio = message.serverContent.modelTurn.parts[0].inlineData.data;
              const bytes = decodeAudio(base64Audio);
              const buffer = await decodeAudioData(bytes, outputCtx, 24000, 1);
              
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
              setStatus('speaking');
              setTimeout(() => setStatus('listening'), buffer.duration * 1000);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            if (message.serverContent?.inputTranscription) {
              setTranscript(prev => message.serverContent?.inputTranscription?.text || prev);
            }
          },
          onerror: (e) => {
            console.error('Gemini Live error:', e);
            setStatus('error');
            setErrorMessage('Connection lost. Please try again.');
          },
          onclose: () => {
            setStatus('idle');
          }
        }
      });

      sessionPromiseRef.current = sessionPromise;
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to start voice assistant');
    }
  };

  useEffect(() => {
    startSession();
    return () => {
      if (sessionPromiseRef.current) {
        sessionPromiseRef.current.then(s => s.close());
      }
      inputAudioContextRef.current?.close();
      outputAudioContextRef.current?.close();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-200">
        <div className="p-6 bg-gray-50 flex justify-between items-center border-b">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${status === 'listening' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
              {status === 'speaking' ? <Volume2 size={24} /> : <Mic size={24} />}
            </div>
            <div>
              <h2 className="font-bold text-gray-800">Voice Assistant</h2>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Divine Agency</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 flex flex-col items-center justify-center space-y-8 min-h-[300px]">
          {status === 'connecting' && (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 size={64} className="text-orange-500 animate-spin" />
              <p className="text-gray-600 font-medium">Connecting to Divine Voice...</p>
            </div>
          )}

          {(status === 'listening' || status === 'speaking') && (
            <div className="flex flex-col items-center w-full space-y-8 text-center">
              <div className="relative">
                <div className={`w-32 h-32 rounded-full border-4 border-orange-500/20 flex items-center justify-center transition-all duration-300 ${status === 'listening' ? 'scale-110' : 'scale-100'}`}>
                  <AudioLines size={64} className={`text-orange-600 ${status === 'speaking' ? 'animate-bounce' : 'animate-pulse'}`} />
                </div>
                {status === 'listening' && (
                  <div className="absolute -inset-2 border-2 border-orange-200 rounded-full animate-ping opacity-50" />
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-xl font-bold text-gray-800">
                  {status === 'listening' ? 'I\'m listening...' : 'Divine Agency Assistant'}
                </p>
                <p className="text-gray-500 text-sm max-w-[250px] italic">
                  "{transcript || 'Ask me about cement prices, rods, or tiles'}"
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-red-100 text-red-600 rounded-full">
                <X size={48} />
              </div>
              <p className="text-red-600 font-bold">{errorMessage}</p>
              <button 
                onClick={startSession}
                className="px-6 py-2 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t flex justify-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
