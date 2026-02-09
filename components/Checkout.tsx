
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoupleData, PlanType, Language } from '../types';
import { getPlans } from '../constants';
import { 
  CheckCircle, 
  CreditCard, 
  Lock, 
  Mail, 
  QrCode, 
  ShieldCheck, 
  Info, 
  Globe, 
  Clock, 
  ArrowLeft, 
  Download, 
  ExternalLink, 
  Calendar, 
  User,
  ShieldAlert
} from 'lucide-react';

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
  
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const isInfinity = data.plan === PlanType.INFINITY;
  const pageUrl = isInfinity && data.requestedDomain 
    ? `https://www.${data.requestedDomain}` 
    : `https://kizuna.love/${data.slug || 'nosso-amor'}`;
  
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(pageUrl)}&color=050505&bgcolor=ffffff`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [success]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2500);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const parts = [];
    for (let i = 0, len = v.length; i < len; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.join(' ').slice(0, 19);
  };

  if (success) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 animate-in zoom-in duration-700">
        <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-[#a47fba] to-[#67cbf1] h-3"></div>
          
          <div className="p-8 md:p-16 text-center">
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner animate-bounce">
              <CheckCircle size={48} />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-4 text-[#30302e]">{t.paymentSuccess}</h2>
            <p className="text-gray-500 mb-12 text-lg md:text-xl font-light">{t.thankYou}</p>
            
            <div className="grid md:grid-cols-2 gap-12 items-center text-left bg-[#f8f7f9] p-8 md:p-12 rounded-[3rem] border border-gray-100">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Página Publicada</label>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <Globe size={20} className="text-[#67cbf1]" />
                    <span className="text-[#30302e] font-bold break-all text-sm">{pageUrl}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/80 rounded-2xl border border-dashed border-gray-200">
                  <Mail size={20} className="text-[#a47fba] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-700 font-bold mb-1">Confirmação enviada!</p>
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      Os detalhes de acesso, link de edição e sua nota fiscal foram enviados para <strong>{email}</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <a href={pageUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#30302e] text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all">
                    Abrir Página <ExternalLink size={14} />
                  </a>
                  <button onClick={() => navigate('/')} className="flex-1 border-2 border-gray-100 text-gray-400 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all">
                    Voltar Início
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
                <img src={qrUrl} alt="QR Code" className="w-44 h-44 mb-6" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Escaneie o QR Code</p>
                <a href={qrUrl} download="kizuna-qrcode.png" className="mt-4 flex items-center gap-2 text-[#a47fba] font-bold text-[10px] hover:underline">
                  <Download size={14} /> Baixar Imagem
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto px-4 py-16 ${lang === 'jp' ? 'font-jp' : ''}`}>
      <button onClick={() => navigate('/editar')} className="mb-8 flex items-center gap-3 text-[#a47fba] font-black text-[10px] uppercase tracking-widest hover:translate-x-[-4px] transition-all">
        <ArrowLeft size={18} /> Voltar para Edição
      </button>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Resumo Simplificado */}
        <div className="w-full lg:w-5/12 space-y-6 animate-in slide-in-from-left-8 duration-700">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-50 relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] font-black text-[#a47fba] uppercase tracking-[0.3em] block mb-2">Resumo da Compra</span>
              <h3 className="text-3xl font-elegant font-bold text-[#30302e] mb-2">{planInfo.name}</h3>
              <p className="text-xs text-gray-400 mb-8 font-medium">Acesso Vitalício • Sem Mensalidades</p>
              
              <div className="flex items-baseline gap-2 pt-6 border-t border-gray-100">
                <span className="text-5xl font-black text-[#30302e] tracking-tighter">{planInfo.price}</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Total</span>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#f4f0f7] rounded-full"></div>
          </div>

          {/* Badges de Segurança Requisitados */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-[8px]">Stripe</div>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Verified</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-red-500 font-bold text-[8px]">PayPay</div>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Ready</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3 shadow-sm">
              <ShieldCheck className="text-green-500" size={18} />
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">PCI COMPLIANCE</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3 shadow-sm">
              <Lock className="text-gray-400" size={18} />
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">SSL 256-BIT</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="w-full lg:w-7/12 animate-in slide-in-from-right-8 duration-700">
          <div className="bg-white p-8 md:p-14 rounded-[3.5rem] shadow-2xl border border-gray-50">
            <form onSubmit={handlePayment} className="space-y-10">
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                    <Mail size={14} className="text-[#a47fba]" /> E-mail para Recebimento
                  </label>
                  <input 
                    required 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full px-6 py-4 rounded-2xl border-2 border-[#f0eef2] bg-[#f8f7f9]/30 outline-none focus:border-[#a47fba] focus:bg-white transition-all font-medium text-lg shadow-sm" 
                    placeholder="voce@exemplo.com" 
                  />
                </div>

                <div className="bg-[#f8f7f9] p-8 rounded-[2.5rem] border border-[#f0eef2] space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cartão de Crédito</span>
                    <div className="flex gap-2 grayscale opacity-50">
                      <div className="w-8 h-5 bg-white border border-gray-200 rounded flex items-center justify-center text-[7px] font-bold">VISA</div>
                      <div className="w-8 h-5 bg-white border border-gray-200 rounded flex items-center justify-center text-[7px] font-bold">MASTER</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Número</label>
                    <div className="relative">
                      <input 
                        required 
                        type="text" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        className="w-full px-6 py-4 rounded-2xl border-2 border-white bg-white outline-none focus:border-[#a47fba] transition-all font-bold text-gray-700 tracking-widest shadow-sm" 
                        placeholder="0000 0000 0000 0000" 
                      />
                      <CreditCard className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Expiração</label>
                      <input 
                        required 
                        type="text" 
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => {
                          let v = e.target.value.replace(/\D/g, '');
                          if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
                          setCardExpiry(v);
                        }}
                        className="w-full px-6 py-4 rounded-2xl border-2 border-white bg-white outline-none focus:border-[#a47fba] transition-all font-bold text-gray-700 shadow-sm text-center" 
                        placeholder="MM/AA" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">CVC</label>
                      <input 
                        required 
                        type="password" 
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-6 py-4 rounded-2xl border-2 border-white bg-white outline-none focus:border-[#a47fba] transition-all font-bold text-gray-700 shadow-sm text-center" 
                        placeholder="•••" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Nome no Cartão</label>
                    <input 
                      required 
                      type="text" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-white bg-white outline-none focus:border-[#a47fba] transition-all font-bold text-gray-700 shadow-sm" 
                      placeholder="TITULAR DO CARTÃO" 
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className={`w-full py-6 rounded-2xl font-black text-xl text-white shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#a47fba] hover:bg-[#8e6aa3] shadow-[#a47fba33]'
                }`}
              >
                {loading ? (
                  <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <> FINALIZAR PAGAMENTO </>
                )}
              </button>
            </form>
          </div>
          
          <div className="mt-8 flex items-center gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-2xl text-amber-700">
             <ShieldAlert size={18} className="flex-shrink-0" />
             <p className="text-[10px] font-bold leading-relaxed">
               Este é um ambiente de simulação. Não utilize dados de cartões reais. O sistema processará o pagamento fictício para liberar sua visualização final.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
