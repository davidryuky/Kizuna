
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoupleData, PlanType, Language } from '../types';
import { getPlans } from '../constants';
import { CheckCircle, CreditCard, Lock, Sparkles, Mail, QrCode, ShieldCheck, Info } from 'lucide-react';

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
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Simulação de URL final da página do casal
  const pageUrl = `https://kizuna.love/casal/${data.partner1?.toLowerCase().replace(/\s+/g, '-') || 'love'}-${data.partner2?.toLowerCase().replace(/\s+/g, '-') || 'forever'}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pageUrl)}&color=e11d48&bgcolor=ffffff`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [success]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulação de comunicação com Stripe API (Modo Demo)
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
        <p className="text-gray-500 mb-10 text-lg">
          {t.thankYou}
        </p>
        
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] mb-10 border border-rose-50 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-green-400 to-emerald-500"></div>
           
           <div className="mb-10 flex flex-col items-center">
             <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-rose-50 mb-6 group transition-all hover:scale-105 hover:rotate-1">
               <img src={qrCodeUrl} alt="QR Code Link" className="w-48 h-48" />
             </div>
             <p className="text-sm font-black text-rose-500 flex items-center gap-2 uppercase tracking-widest bg-rose-50 px-4 py-2 rounded-full">
               <QrCode size={18} /> {t.qrCodeLabel}
             </p>
           </div>

           <div className="space-y-6">
             <div className="bg-rose-50/30 p-6 rounded-2xl border border-rose-100">
               <p className="text-[10px] font-black text-rose-300 mb-2 uppercase tracking-[0.2em]">{lang === 'pt' ? 'Endereço da sua História' : 'あなたの物語のURL'}</p>
               <p className="text-rose-600 font-bold text-lg md:text-xl select-all cursor-pointer hover:underline break-all leading-tight">
                 {pageUrl}
               </p>
             </div>
             
             <div className="pt-6">
               <div className="flex items-center justify-center gap-2 text-gray-500 mb-1">
                 <Mail size={16} className="text-rose-400" />
                 <span className="text-sm font-medium">{t.emailSentMsg}</span>
               </div>
               <p className="font-black text-gray-800 text-lg">{email || 'voce@exemplo.com'}</p>
             </div>
           </div>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="bg-gray-900 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-black transition-all shadow-2xl transform hover:-translate-y-1 active:scale-95"
        >
          {lang === 'pt' ? 'Voltar ao Início' : 'ホームに戻る'}
        </button>
      </div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto px-4 py-16 ${lang === 'jp' ? 'font-jp' : ''}`}>
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Lado Esquerdo: Resumo */}
        <div className="w-full lg:w-5/12 space-y-8 animate-in slide-in-from-left-8 duration-700">
          <div>
            <button 
              onClick={() => navigate('/editar')}
              className="text-rose-500 font-black text-xs uppercase tracking-widest flex items-center gap-2 mb-6 hover:translate-x-1 transition-transform"
            >
              ← {lang === 'pt' ? 'Voltar para edição' : '編集に戻る'}
            </button>
            <h2 className="text-4xl font-elegant font-bold text-gray-900 mb-2">{lang === 'pt' ? 'Finalizar Compra' : 'お支払い'}</h2>
            <p className="text-gray-500 text-lg font-light">{lang === 'pt' ? 'Sua página será ativada instantaneamente após o pagamento.' : 'お支払い後、ページはすぐに有効になります。'}</p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-rose-50 relative overflow-hidden">
            <div className="absolute bottom-4 right-4 p-2 opacity-[0.05] rotate-6 pointer-events-none z-0">
               <Sparkles className="text-rose-500" size={160} />
            </div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-1">{lang === 'pt' ? 'Plano Selecionado' : '選択されたプラン'}</span>
                <h3 className="text-3xl font-black text-gray-900">{planInfo.name}</h3>
              </div>
            </div>
            
            <div className="relative z-10">
               <span className="text-5xl font-black text-rose-500 tracking-tighter">{planInfo.price}</span>
               <span className="text-gray-400 text-xs font-bold ml-3 uppercase tracking-widest">Pagamento Único</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <ShieldCheck size={32} className="text-green-500" />
            <div>
              <p className="text-sm font-bold text-gray-900">{lang === 'pt' ? 'Garantia de Satisfação' : '満足保証'}</p>
              <p className="text-xs text-gray-500">{lang === 'pt' ? 'Sua felicidade é nossa prioridade absoluta.' : 'お客様の幸せが私たちの最優先事項です。'}</p>
            </div>
          </div>
        </div>

        {/* Lado Direito: Stripe Mockup */}
        <div className="w-full lg:w-7/12 animate-in slide-in-from-right-8 duration-700 delay-100">
          <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-gray-50">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <CreditCard size={28} className="text-rose-500" /> {lang === 'pt' ? 'Informações de Pagamento' : 'カード情報の入力'}
              </h3>
              <div className="flex items-center gap-1 bg-rose-50 text-rose-600 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
                <span className="animate-pulse mr-1 inline-block">●</span> Demo Mode
              </div>
            </div>
            
            <form onSubmit={handlePayment} className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex justify-between">
                  {t.emailLabel}
                </label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-rose-400 transition-colors" size={20} />
                  <input 
                    required
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-100 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-50 transition-all font-medium text-lg" 
                    placeholder="voce@exemplo.com" 
                  />
                </div>
              </div>

              <div className="space-y-6 bg-gray-50/50 p-8 rounded-3xl border border-gray-100">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{t.cardNumberLabel}</label>
                  <div className="relative group">
                    <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-rose-400 transition-colors" size={20} />
                    <input 
                      required 
                      type="text" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').substring(0, 16))}
                      className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-100 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-50 transition-all font-mono text-lg tracking-wider" 
                      placeholder="4242 4242 4242 4242" 
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-2">
                       <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
                       <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{lang === 'pt' ? 'Validade' : '有効期限'}</label>
                    <input 
                      required 
                      type="text" 
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value.substring(0, 5))}
                      className="w-full px-6 py-5 rounded-2xl border-2 border-gray-100 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-50 transition-all font-mono text-lg" 
                      placeholder="MM / AA" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">CVC</label>
                    <input 
                      required 
                      type="password" 
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                      className="w-full px-6 py-5 rounded-2xl border-2 border-gray-100 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-50 transition-all font-mono text-lg" 
                      placeholder="123" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{t.cardNameLabel}</label>
                  <input 
                    required 
                    type="text" 
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-6 py-5 rounded-2xl border-2 border-gray-100 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-50 transition-all font-medium uppercase text-lg" 
                    placeholder="NOME IGUAL AO CARTÃO" 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full py-6 rounded-2xl font-black text-xl text-white shadow-2xl transition-all flex items-center justify-center gap-4 transform hover:-translate-y-1 active:scale-95 ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600 shadow-rose-200'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {lang === 'pt' ? 'Validando...' : '確認中...'}
                    </>
                  ) : (
                    <>
                      <Lock size={20} />
                      {t.payBtn} {planInfo.price}
                    </>
                  )}
                </button>
                
                <p className="text-center text-[11px] text-gray-400 font-medium px-4 leading-relaxed">
                  {lang === 'pt' ? 'Ao clicar em pagar, você concorda com nossos termos de serviço. O pagamento é processado de forma segura e criptografada.' : '支払うをクリックすることで、利用規約に同意したことになります。支払いは安全に暗号化されて処理されます。'}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-center gap-8 opacity-50">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1200px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" className="h-6 object-contain" />
                 <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                   <Lock size={12} /> Secure
                 </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
