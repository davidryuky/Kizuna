
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Star, CheckCircle2, ArrowRight, CreditCard, Mail, Gift } from 'lucide-react';
import { PlanType, Language } from '../types';
import { getPlans } from '../constants';
import { SocialProof } from './SocialProof';

interface LandingPageProps {
  onSelectPlan: (plan: PlanType) => void;
  lang: Language;
  t: any;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectPlan, lang, t }) => {
  const navigate = useNavigate();
  const plans = getPlans(lang);

  const handleSelect = (planId: PlanType) => {
    onSelectPlan(planId);
    navigate('/editar');
  };

  const scrollToPlans = () => {
    document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      <SocialProof t={t} />
      
      {/* Hero Section */}
      <section className="relative pt-10 md:pt-24 pb-12 md:pb-32 px-6 overflow-hidden flex items-start lg:items-center min-h-[60vh] lg:min-h-[90vh]">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Coluna de Texto */}
          <div className="relative z-10 text-left animate-in slide-in-from-left-10 duration-1000 lg:mt-12">
            <h1 className="text-[2.1rem] md:text-[3.6rem] lg:text-[4.8rem] font-elegant font-bold mb-6 md:mb-10 leading-[1.15] tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#30302e] via-[#a47fba] to-[#67cbf1]">
                {t.heroTitle}
              </span>
            </h1>
            
            <p className="text-base md:text-xl text-gray-500 mb-8 md:mb-12 max-w-xl leading-relaxed font-light">
              {t.heroSubtitle}
            </p>
            
            <div className="flex flex-col gap-6 md:gap-10">
              <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
                <button 
                  onClick={scrollToPlans}
                  className="bg-[#a47fba] text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-lg md:text-xl shadow-2xl shadow-[#a47fba22] hover:bg-[#8e6aa3] transition-all flex items-center justify-center gap-4 transform hover:-translate-y-1 active:scale-95"
                >
                  {t.createBtn} <ArrowRight size={22} />
                </button>
                
                <button 
                  onClick={scrollToPlans}
                  className="bg-white text-[#67cbf1] border-2 border-[#67cbf122] px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-lg md:text-xl hover:bg-sky-50 hover:border-[#67cbf144] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1 active:scale-95"
                >
                  {t.viewPlans}
                </button>
              </div>

              {/* Filosofia da Marca */}
              <p className="text-xs md:text-sm text-gray-400 max-w-md leading-relaxed border-l-2 border-[#a47fba33] pl-4 font-medium tracking-wide italic">
                {t.brandPhilosophy}
              </p>
            </div>
          </div>

          {/* Coluna Visual */}
          <div className="relative animate-in slide-in-from-right-10 duration-1000 delay-200 hidden lg:block">
            <div className="relative group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#a47fba11] rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#67cbf111] rounded-full blur-3xl opacity-60"></div>
              
              <div className="relative bg-white p-4 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(48,48,46,0.1)] border border-[#f0eef2] overflow-hidden transform rotate-2 group-hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200" 
                  alt="Kizuna Preview" 
                  className="rounded-[2.5rem] w-full h-[540px] object-cover shadow-inner"
                />
                
                <div className="absolute bottom-10 right-10 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-[#f4f0f7] animate-bounce-slow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#a47fba] rounded-full flex items-center justify-center text-white shadow-lg">
                      <Heart size={20} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#30302e]">Presente Eterno</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">Escaneie o QR Code</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-12 md:py-24 bg-[#f8f7f9] relative overflow-hidden border-t border-[#f0eef2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-6 text-center md:text-left">
            <div className="w-full md:w-auto">
              <h2 className="text-4xl md:text-6xl font-elegant font-bold mb-3 text-[#30302e]">{t.planSelectionTitle}</h2>
              <p className="text-[#a47fba] uppercase tracking-[0.3em] text-[9px] md:text-[11px] font-black">{t.planSelectionSub}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-stretch max-w-5xl mx-auto mb-16 md:mb-32">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`flex flex-col bg-white p-7 md:p-11 rounded-[2.5rem] border-2 transition-all duration-700 hover:-translate-y-2 ${
                  plan.id === PlanType.PREMIUM 
                    ? 'border-[#a47fba] shadow-[0_45px_85px_-20px_rgba(164,127,186,0.15)] relative md:scale-[1.03] z-10' 
                    : 'border-gray-100 shadow-xl opacity-95'
                }`}
              >
                {plan.id === PlanType.PREMIUM && (
                  <div className="absolute -top-6 left-6 md:left-12 bg-[#67cbf1] text-white px-5 md:px-8 py-2 md:py-2.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] shadow-xl flex items-center gap-2">
                    <Star size={12} fill="white" /> {t.bestSeller}
                  </div>
                )}
                
                <h3 className="text-xl md:text-3xl font-black text-[#30302e] mb-3 uppercase tracking-tighter">{plan.name}</h3>
                <div className="mb-5 md:mb-7">
                  <span className="text-3xl md:text-5xl font-black text-[#30302e] tracking-tighter">{plan.price}</span>
                  <span className="text-gray-400 text-xs md:text-sm font-bold ml-3 uppercase tracking-widest">/ único</span>
                </div>

                <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 text-left flex-grow">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 md:gap-4 text-gray-500 text-sm md:text-base font-medium leading-tight group">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#f4f0f7] flex items-center justify-center flex-shrink-0 group-hover:bg-[#a47fba] group-hover:text-white transition-colors duration-300">
                        <CheckCircle2 size={12} className="flex-shrink-0" />
                      </div>
                      <span className="group-hover:text-[#30302e] transition-colors">{feat}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleSelect(plan.id)}
                  className={`w-full py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl transition-all transform active:scale-95 ${
                    plan.id === PlanType.PREMIUM 
                    ? 'bg-[#a47fba] text-white hover:bg-[#8e6aa3] shadow-2xl shadow-[#a47fba22]' 
                    : 'bg-[#30302e] text-white hover:bg-black shadow-xl shadow-gray-200'
                  }`}
                >
                  {t.startNow}
                </button>
              </div>
            ))}
          </div>

          {/* Seção Como Funciona */}
          <div className="pt-12 md:pt-24 border-t border-[#f0eef2]">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-elegant font-bold text-[#30302e] mb-4">{t.howItWorksTitle}</h2>
              <div className="w-16 md:w-24 h-1 bg-[#a47fba] mx-auto rounded-full opacity-20"></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { icon: <Heart size={32} />, title: t.step1Title, desc: t.step1Desc },
                { icon: <CreditCard size={32} />, title: t.step2Title, desc: t.step2Desc },
                { icon: <Mail size={32} />, title: t.step3Title, desc: t.step3Desc },
                { icon: <Gift size={32} />, title: t.step4Title, desc: t.step4Desc }
              ].map((step, i) => (
                <div key={i} className="bg-white p-6 md:p-8 rounded-[2rem] border border-[#f0eef2] shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#f4f0f7] rounded-2xl flex items-center justify-center text-[#a47fba] mb-6 group-hover:scale-110 group-hover:bg-[#a47fba] group-hover:text-white transition-all">
                    {step.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-[#30302e] mb-2 leading-tight">{step.title}</h3>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;