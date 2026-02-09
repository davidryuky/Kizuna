
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoupleData, PlanType, Language } from '../types';
import { getPlans } from '../constants';
import { CheckCircle, CreditCard, Lock, Sparkles, Mail, QrCode, ShieldCheck, Info, Globe, Clock } from 'lucide-react';

interface CheckoutProps {
  data: CoupleData;
  lang: Language;
  t: any;
}

const Checkout: React.FC<CheckoutProps> = ({ data, lang, t }) => {
  const navigate = useNavigate();
  const plans = getPlans(lang);
  const planInfo = plans.find(p => p.id === data.plan) || plans[0];
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  
  const isInfinity = data.plan === PlanType.INFINITY;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [success]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 3000);
  };

  if (success) {
    return (
      <div className={`max-w-2xl mx-auto px-4 py-20 text-center animate-in zoom-in slide-in-from-bottom-8 duration-700 ${lang === 'jp' ? 'font-jp' : ''}`}>
        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner animate-bounce">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-4xl font-elegant font-bold mb-4 text-gray-900">{t.paymentSuccess}</h2>
        <p className="text-gray-500 mb-10 text-lg">{t.thankYou}</p>
        
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl mb-10 border border-rose-50 relative overflow-hidden">
           {isInfinity && (
             <div className="mb-8 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-4 text-left">
                <Clock className="text-amber-500 flex-shrink-0" size={32} />
                <p className="text-sm font-bold text-amber-800 leading-tight">
                  {t.domain48h}
                </p>
             </div>
           )}
           <p className="text-rose-600 font-bold text-lg md:text-xl break-all mb-4">
             {isInfinity && data.requestedDomain ? `www.${data.requestedDomain}` : `kizuna.love/${data.slug || 'love'}`}
           </p>
           <p className="text-xs text-gray-400">Enviamos os detalhes para {email || 'seu e-mail'}</p>
        </div>

        <button onClick={() => navigate('/')} className="bg-gray-900 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-black transition-all shadow-2xl">ホームに戻る</button>
      </div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto px-4 py-16 ${lang === 'jp' ? 'font-jp' : ''}`}>
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="w-full lg:w-5/12 space-y-8 animate-in slide-in-from-left-8 duration-700">
          <h2 className="text-4xl font-elegant font-bold text-gray-900 mb-2">{lang === 'pt' ? 'Finalizar Compra' : 'お支払い'}</h2>
          
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-rose-50 relative overflow-hidden">
            <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-1">Plano Selecionado</span>
            <h3 className="text-3xl font-black text-gray-900 mb-4">{planInfo.name}</h3>
            <span className="text-5xl font-black text-rose-500 tracking-tighter">{planInfo.price}</span>
          </div>

          {isInfinity && (
            <div className="p-6 bg-[#30302e] text-white rounded-3xl flex items-center gap-4 animate-pulse">
              <Clock className="text-[#67cbf1]" />
              <p className="text-sm font-bold">{t.domain48h}</p>
            </div>
          )}
        </div>

        <div className="w-full lg:w-7/12">
          <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-gray-50">
            <form onSubmit={handlePayment} className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{t.emailLabel}</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 outline-none focus:border-rose-400 transition-all font-medium text-lg" placeholder="voce@exemplo.com" />
              </div>
              <button type="submit" disabled={loading} className={`w-full py-6 rounded-2xl font-black text-xl text-white shadow-2xl transition-all ${loading ? 'bg-gray-400' : 'bg-rose-500 hover:bg-rose-600'}`}>
                {loading ? 'Validando...' : `${t.payBtn} ${planInfo.price}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
