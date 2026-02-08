
import React, { useState } from 'react';
import { Mail, Send, Phone, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
  t: any;
}

const Contact: React.FC<ContactProps> = ({ lang, t }) => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-24 animate-in fade-in duration-700">
      <div className="text-center mb-12 md:mb-20">
        <div className="inline-flex p-4 bg-rose-50 text-rose-500 rounded-3xl mb-6 shadow-sm">
          <Mail size={32} />
        </div>
        <h1 className="text-4xl md:text-6xl font-elegant font-bold text-gray-900 mb-4">{t.contact}</h1>
        <div className="w-20 md:w-24 h-1 bg-rose-500 mx-auto rounded-full opacity-20"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        {/* Lado Esquerdo - Info */}
        <div className="space-y-6 md:space-y-8">
          <div className="bg-white p-7 md:p-8 rounded-[2.5rem] shadow-sm border border-rose-50 flex items-center gap-6 group hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">E-mail Corporativo</p>
              <p className="text-lg font-bold text-gray-900">atendimento@kizuna.love</p>
            </div>
          </div>

          <div className="bg-white p-7 md:p-8 rounded-[2.5rem] shadow-sm border border-rose-50 flex items-center gap-6 group hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">Atendimento Direto</p>
              <p className="text-lg font-bold text-gray-900">+55 (11) 97721-0044</p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-rose-500 mb-2">
              <ShieldCheck size={24} />
              <span className="font-bold uppercase text-[10px] tracking-widest text-rose-400">Suporte Dedicado</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-medium">
              Nossa equipe técnica e criativa está à disposição para garantir que sua experiência KIZUNA seja impecável. Respondemos a todas as mensagens em ordem de chegada.
            </p>
          </div>
        </div>

        {/* Lado Direito - Form */}
        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-rose-50 border border-gray-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl opacity-30 -mr-16 -mt-16"></div>
          
          {sent ? (
            <div className="text-center py-12 md:py-20 animate-in fade-in zoom-in">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Send size={32} className="animate-pulse" />
              </div>
              <h3 className="text-3xl font-elegant font-bold mb-4 text-gray-900">Mensagem Recebida</h3>
              <p className="text-gray-400 font-medium">Agradecemos o contato. Analisaremos sua solicitação com prioridade.</p>
              <button 
                onClick={() => setSent(false)} 
                className="mt-10 text-rose-500 font-black uppercase text-[10px] tracking-widest hover:underline"
              >
                Nova Mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-1">{t.nameLabel}</label>
                <input 
                  required 
                  type="text" 
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-50 outline-none transition-all font-medium text-gray-800" 
                  placeholder="Nome completo"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-1">{t.emailLabel}</label>
                <input 
                  required 
                  type="email" 
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-50 outline-none transition-all font-medium text-gray-800" 
                  placeholder="contato@exemplo.com"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-1">{t.msgLabel}</label>
                <textarea 
                  required 
                  rows={4} 
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-50 outline-none transition-all font-medium text-gray-800 resize-none" 
                  placeholder="Como podemos ajudar hoje?"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95"
              >
                {loading ? (
                  <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <> {t.send} <Send size={20} /> </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
