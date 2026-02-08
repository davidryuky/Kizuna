
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
      <section className="relative pt-24 pb-32 px-6 overflow-hidden flex items-start lg:items-center min-h-[90vh]">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Coluna de Texto */}
          <div className="relative z-10 text-left animate-in slide-in-from-left-10 duration-1000 lg:mt-12">
            <h1 className="text-[2.4rem] md:text-[3.6rem] lg:text-[4.8rem] font-elegant font-bold mb-10 leading-[1.05] tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-rose-700 to-rose-400">
                {t.heroTitle}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-xl leading-relaxed font-light">
              {t.heroSubtitle}
            </p>
            
            <div className="flex flex-col gap-10">
              <div className="flex flex-col sm:flex-row gap-5">
                <button 
                  onClick={scrollToPlans}
                  className="bg-rose-500 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl shadow-rose-200 hover:bg-rose-600 transition-all flex items-center justify-center gap-4 transform hover:-translate-y-1 active:scale-95"
                >
                  {t.createBtn} <ArrowRight size={24} />
                </button>
                
                <button 
                  onClick={scrollToPlans}
                  className="bg-white text-rose-500 border-2 border-rose-100 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-rose-50 hover:border-rose-200 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1 active:scale-95"
                >
                  {t.viewPlans}
                </button>
              </div>

              {/* Filosofia da Marca */}
              <p className="text-xs md:text-sm text-gray-500 max-w-md leading-relaxed border-l-2 border-rose-200 pl-4 font-medium tracking-wide">
                {t.brandPhilosophy}
              </p>
            </div>
          </div>

          {/* Coluna Visual */}
          <div className="relative animate-in slide-in-from-right-10 duration-1000 delay-200 hidden lg:block">
            <div className="relative group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-50 rounded-full blur-3xl opacity-60"></div>
              
              <div className="relative bg-white p-4 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden transform rotate-2 group-hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200" 
                  alt="Kizuna Preview" 
                  className="rounded-[2.5rem] w-full h-[540px] object-cover shadow-inner"
                />
                
                <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-rose-50 animate-bounce-slow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-lg">
                      <Heart size={20} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900">Presente Especial</p>
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
      <section id="plans" className="py-24 bg-[#fafafa] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="text-left">
              <h2 className="text-5xl md:text-6xl font-elegant font-bold mb-4 text-gray-900">{t.planSelectionTitle}</h2>
              <p className="text-rose-500 uppercase tracking-[0.3em] text-[11px] font-black">{t.planSelectionSub}</p>
            </div>
            <div className="hidden md:block">
              <p className="text-gray-400 max-w-xs text-right text-sm italic font-elegant">Escolha a base ideal para sua celebração digital. Ativação imediata.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-stretch max-w-5xl mx-auto mb-32">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`flex flex-col bg-white p-9 lg:p-11 rounded-[2.5rem] border-2 transition-all duration-700 hover:-translate-y-3 ${
                  plan.id === PlanType.PREMIUM 
                    ? 'border-rose-500 shadow-[0_45px_85px_-20px_rgba(225,29,72,0.14)] relative md:scale-[1.03] z-10' 
                    : 'border-gray-100 shadow-xl opacity-95'
                }`}
              >
                {plan.id === PlanType.PREMIUM && (
                  <div className="absolute -top-6 left-12 bg-rose-500 text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl flex items-center gap-2">
                    <Star size={12} fill="white" /> {t.bestSeller}
                  </div>
                )}
                
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">{plan.name}</h3>
                <div className="mb-7">
                  <span className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter">{plan.price}</span>
                  <span className="text-gray-400 text-sm font-bold ml-3 uppercase tracking-widest">/ único</span>
                </div>

                <ul className="space-y-4 mb-10 text-left flex-grow">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-500 text-base font-medium leading-tight group">
                      <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                        <CheckCircle2 size={14} className="flex-shrink-0" />
                      </div>
                      <span className="group-hover:text-gray-900 transition-colors text-sm lg:text-base">{feat}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleSelect(plan.id)}
                  className={`w-full py-5 rounded-2xl font-black text-xl transition-all transform active:scale-95 ${
                    plan.id === PlanType.PREMIUM 
                    ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-2xl shadow-rose-200' 
                    : 'bg-gray-900 text-white hover:bg-black shadow-xl shadow-gray-200'
                  }`}
                >
                  {t.startNow}
                </button>
              </div>
            ))}
          </div>

          {/* Seção Como Funciona */}
          <div className="pt-24 border-t border-gray-100">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-elegant font-bold text-gray-900 mb-4">{t.howItWorksTitle}</h2>
              <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full opacity-20"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Passo 1 */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all">
                  <Heart size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">{t.step1Title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {t.step1Desc}
                </p>
              </div>

              {/* Passo 2 */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all">
                  <CreditCard size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">{t.step2Title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {t.step2Desc}
                </p>
              </div>

              {/* Passo 3 */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all">
                  <Mail size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">{t.step3Title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {t.step3Desc}
                </p>
              </div>

              {/* Passo 4 */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all">
                  <Gift size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">{t.step4Title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {t.step4Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
