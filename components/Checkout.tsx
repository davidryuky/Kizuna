
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoupleData, PlanType, Language } from '../types';
import { getPlans } from '../constants';
import { CheckCircle, CreditCard, Lock, Sparkles, Mail, QrCode, ShieldCheck, Info, Globe, Clock, ArrowLeft, Download, ExternalLink, Calendar, User } from 'lucide-react';

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
  
  // Simulated Card State
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
    // Simula processamento de 3 segundos
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length > 0) return parts.join(' ');
    return value;
  };

  if (success) {
    return (
      <div className={`max-w-4xl mx-auto px-4 py-20 animate-in zoom-in slide-in-from-bottom-8 duration-700 ${lang === 'jp' ? 'font-jp' : ''}`}>
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
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Sua Página está Pronta</label>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <Globe size={20} className="text-[#67cbf1]" />
                    <span className="text-[#30302e] font-bold break-all">{pageUrl}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl border border-dashed border-gray-200">
                  <Mail size={20} className="text-[#a47fba] flex-shrink-0" />
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Enviamos os dados de acesso, painel de edição e recibo para <strong>{email}</strong>. Verifique sua caixa de entrada e spam.
                  </p>
                </div>

                {isInfinity && (
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
                    <Clock className="text-amber-500 flex-shrink-0" size={20} />
                    <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest leading-tight">
                      {t.domain48h}
                    </p>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <a href={pageUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#30302e] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all">
                    Acessar Página <ExternalLink size={14} />
                  </a>
                  <button onClick={() => navigate('/')} className="flex-1 border-2 border-gray-100 text-gray-400 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all">
                    Voltar para Home
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 relative group">
                <div className="absolute top-4 right-4 text-[#a47fba]/20 group-hover:text-[#a47fba] transition-colors">
                  <QrCode size={24} />
                </div>
                <img src={qrUrl} alt="QR Code" className="w-48 h-48 mb-6" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Escaneie para Visualizar</p>
                <a href={qrUrl} download="kizuna-qrcode.png" className="mt-4 flex items-center gap-2 text-[#a47fba] font-bold text-xs hover:underline">
                  <Download size={14} /> Baixar QR Code
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
      <button onClick={() => navigate('/editar')} className="mb-8 flex items-center gap-3 text-[#a47fba] font-black text-xs uppercase tracking-widest hover:translate-x-[-4px] transition-all">
        <ArrowLeft size={18} /> Voltar para o Editor
      </button>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Resumo do Pedido */}
        <div className="w-full lg:w-5/12 space-y-6 animate-in slide-in-from-left-8 duration-700">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-50 relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] font-black text-[#a47fba] uppercase tracking-[0.3em] block mb-2">Você está assinando:</span>
              <h3 className="text-4xl font-elegant font-bold text-[#30302e] mb-4">{planInfo.name}</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-black text-[#30302e] tracking-tighter">{planInfo.price}</span>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Pagamento Único</span>
              </div>
              
              <ul className="space-y-4 pt-8 border-t border-gray-100">
                {planInfo.features.slice(0, 5).map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                    <CheckCircle size={16} className="text-[#a47fba]" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            {/* Efeito visual decorativo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f4f0f7] rounded-full -mr-16 -mt-16"></div>
          </div>

          <div className="p-6 bg-[#f4f0f7]/50 rounded-2xl border border-[#e8e1f0] flex items-center gap-4">
            <Lock className="text-[#a47fba]" size={24} />
            <div className="text-[10px] font-black text-[#a47fba] uppercase tracking-widest leading-relaxed">
              Ambiente 100% Seguro <br /> Processado por Kizuna Pay (via Stripe)
            </div>
          </div>
        </div>

        {/* Formulário de Pagamento Simulando Stripe */}
        <div className="w-full lg:w-7/12 animate-in slide-in-from-right-8 duration-700">
          <div className="bg-white p-8 md:p-14 rounded-[3.5rem] shadow-2xl border border-gray-50">
            <form onSubmit={handlePayment} className="space-y-10">
              <div className="space-y-8">
                {/* E-mail de Entrega */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                    <Mail size={14} className="text-[#a47fba]" /> E-mail de Recebimento
                  </label>
                  <input 
                    required 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full px-6 py-4 rounded-2xl border-2 border-[#f0eef2] bg-[#f8f7f9]/30 outline-none focus:border-[#a47fba] focus:bg-white transition-all font-medium text-lg shadow-sm" 
                    placeholder="voce@exemplo.com" 
                  />
                  <p className="text-[9px] text-gray-400 pl-1 uppercase tracking-widest">Enviaremos os dados de acesso para este endereço.</p>
                </div>

                {/* Dados do Cartão (Simulação Stripe) */}
                <div className="bg-[#f8f7f9] p-8 rounded-[2.5rem] border border-[#f0eef2] space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Informações de Pagamento</span>
                    <div className="flex gap-2">
                      <div className="w-8 h-5 bg-white border border-gray-100 rounded shadow-sm flex items-center justify-center text-[8px] font-bold text-blue-800">VISA</div>
                      <div className="w-8 h-5 bg-white border border-gray-100 rounded shadow-sm flex items-center justify-center text-[8px] font-bold text-orange-600">MC</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Número do Cartão</label>
                    <div className="relative">
                      <input 
                        required 
                        type="text" 
                        maxLength={19}
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
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1"><Calendar size={12} /> Validade</label>
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
                        className="w-full px-6 py-4 rounded-2xl border-2 border-white bg-white outline-none focus:border-[#a47fba] transition-all font-bold text-gray-700 shadow-sm" 
                        placeholder="MM/AA" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1"><Lock size={12} /> CVC</label>
                      <input 
                        required 
                        type="password" 
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-6 py-4 rounded-2xl border-2 border-white bg-white outline-none focus:border-[#a47fba] transition-all font-bold text-gray-700 shadow-sm" 
                        placeholder="123" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1"><User size={12} /> Nome no Cartão</label>
                    <input 
                      required 
                      type="text" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-white bg-white outline-none focus:border-[#a47fba] transition-all font-bold text-gray-700 shadow-sm" 
                      placeholder="COMO IMPRESSO NO CARTÃO" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className={`w-full py-6 rounded-2xl font-black text-xl text-white shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#a47fba] hover:bg-[#8e6aa3] shadow-[#a47fba33]'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Processando...
                    </>
                  ) : (
                    <> {t.payBtn} {planInfo.price} <ArrowLeft size={20} className="rotate-180" /> </>
                  )}
                </button>
                
                <div className="flex items-center justify-center gap-6 text-gray-300">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                     <ShieldCheck size={14} /> PCI Compliance
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                     <Lock size={14} /> SSL 256-bit
                   </div>
                </div>
              </div>
            </form>
          </div>
          
          <div className="mt-8 flex items-center gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl text-blue-600">
             <Info size={18} className="flex-shrink-0" />
             <p className="text-[10px] font-bold leading-relaxed">
               Ao finalizar a compra, você concorda com nossos termos de uso. O acesso à plataforma é vitalício para os planos Premium e Infinity.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
