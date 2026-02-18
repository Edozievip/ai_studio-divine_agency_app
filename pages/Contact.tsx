
import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';
import { saveInquiry } from '../db';
import { Inquiry } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newInquiry: Inquiry = {
      id: `INQ-${Date.now()}`,
      timestamp: Date.now(),
      name: formData.name,
      phone: formData.phone,
      message: formData.message
    };
    await saveInquiry(newInquiry);
    setSubmitted(true);
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <div className="bg-white">
      <section className="bg-gray-50 py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-black text-black uppercase mb-4 tracking-tighter">GET IN <span className="text-orange-600">TOUCH</span></h1>
          <p className="text-gray-500 uppercase font-bold tracking-[0.2em] text-sm">We are here to help your construction project succeed</p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black uppercase mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-orange-600 p-4 text-white shrink-0"><Phone size={24} /></div>
                  <div>
                    <p className="font-black uppercase text-xs text-gray-400 mb-1">Call Us</p>
                    <p className="text-xl font-bold text-black">+234 810 718 9127</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="bg-orange-600 p-4 text-white shrink-0"><MapPin size={24} /></div>
                  <div>
                    <p className="font-black uppercase text-xs text-gray-400 mb-1">Visit Office</p>
                    <p className="text-xl font-bold text-black">Anambra State, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="bg-green-500 p-4 text-white shrink-0"><MessageCircle size={24} /></div>
                  <div>
                    <p className="font-black uppercase text-xs text-gray-400 mb-1">WhatsApp Chat</p>
                    <a href={WHATSAPP_LINK} target="_blank" className="text-xl font-bold text-black hover:text-green-500 underline transition-colors">Start Chatting Now</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black text-white p-10 space-y-6">
              <h3 className="text-xl font-black uppercase text-orange-500">Working Hours</h3>
              <div className="space-y-2 text-sm font-bold uppercase tracking-widest text-gray-400">
                <div className="flex justify-between"><span>Mon - Fri</span> <span className="text-white">8:00 AM - 6:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday</span> <span className="text-white">9:00 AM - 4:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span> <span className="text-white text-orange-600">Closed</span></div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 p-10 border">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="text-green-600"><Send size={64} className="animate-bounce" /></div>
                <h3 className="text-2xl font-black uppercase">Message Sent!</h3>
                <p className="text-gray-500">We will get back to you within 2 hours.</p>
                <button onClick={() => setSubmitted(false)} className="text-orange-600 font-bold uppercase underline">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-black uppercase mb-8">Send an Inquiry</h3>
                <div className="space-y-4">
                  <input 
                    required
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-4 border font-bold outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    required
                    type="tel" 
                    placeholder="Phone Number" 
                    className="w-full p-4 border font-bold outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  <textarea 
                    required
                    rows={5}
                    placeholder="How can we help you?" 
                    className="w-full p-4 border font-bold outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full bg-black text-white py-5 font-black uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center space-x-3">
                  <Send size={18} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] w-full grayscale hover:grayscale-0 transition-all duration-500">
        <iframe 
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126895.84592476571!2d7.008983!3d6.210611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043763f03b2210d%3A0xc3928e469e5d4443!2sAwka!5e0!3m2!1sen!2sng!4v1690000000000!5m2!1sen!2sng"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
