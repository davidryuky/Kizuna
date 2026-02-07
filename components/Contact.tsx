
import React, { useState } from 'react';
import { Mail, Send, MapPin, Phone } from 'lucide-react';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
  t: any;
}

const Contact: React.FC<ContactProps> = ({ lang, t }) => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <div className="inline-flex p-3 bg-rose-50 text-rose-500 rounded-2xl mb-4">
          <Mail size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-elegant font-bold text-gray-900">{t.contact}</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-rose-50 flex items-center gap-6">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">E-mail</p>
              <p className="text-lg font-bold text-gray-900">suporte@kizuna.love</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-rose-50 flex items-center gap-6">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">WhatsApp</p>
              <p className="text-lg font-bold text-gray-900">+55 (11) 99999-9999</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-rose-50 flex items-center gap-6">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Localização</p>
              <p className="text-lg font-bold text-gray-900">São Paulo, Brasil</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 md:p-12 rounded-[3.5rem] shadow-xl border border-rose-50">
          {sent ? (
            <div className="text-center py-12 animate-in fade-in zoom-in">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Mensagem Enviada!</h3>
              <p className="text-gray-500">Responderemos o mais breve possível.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{t.nameLabel}</label>
                <input required type="text" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-rose-50/20 focus:bg-white focus:ring-4 focus:ring-rose-50 outline-none transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{t.emailLabel}</label>
                <input required type="email" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-rose-50/20 focus:bg-white focus:ring-4 focus:ring-rose-50 outline-none transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{t.msgLabel}</label>
                <textarea required rows={4} className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-rose-50/20 focus:bg-white focus:ring-4 focus:ring-rose-50 outline-none transition-all font-medium resize-none" />
              </div>
              <button type="submit" className="w-full bg-rose-500 text-white py-5 rounded-full font-black text-lg hover:bg-rose-600 transition-all shadow-xl shadow-rose-200 flex items-center justify-center gap-3">
                {t.send} <Send size={20} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
