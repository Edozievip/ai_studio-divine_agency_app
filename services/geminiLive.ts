
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

export const encodeAudio = (bytes: Uint8Array) => {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export const decodeAudio = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function createPcmBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encodeAudio(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

export const DIVINE_AGENCY_SYSTEM_INSTRUCTION = `
You are the Voice Assistant for Divine Agency, a top-tier construction material supplier in Anambra State, Nigeria.
Your goal is to help customers find products, check prices, and learn about the agency.
Divine Agency sells: Cement (Dangote, BUA), Zinc, Roofing Sheets, Tiles, Nails, Reinforcement rods (8mm to 20mm), Sand, Granite, and Blocks.
We deliver across Anambra State (Awka, Onitsha, Nnewi, Ekwulobia, etc.).
Be professional, helpful, and energetic. Encourage users to add items to their cart or call the official number.
Always mention that bulk orders get discounts. 
Official contact: +234 810 718 9127.
If asked about prices:
- Dangote Cement: 9,500 Naira per bag.
- 12mm Rod: 12,500 Naira per length.
- 16mm Rod: 18,500 Naira per length.
- Sharp Sand: 45,000 Naira per trip.
- Granite: 85,000 Naira per trip.
`;
