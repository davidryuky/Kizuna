
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, CheckCircle2, ArrowRight, ShieldCheck, Crown } from 'lucide-react';
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
          <div className="relative z-10 text-left">
            <h1 className="text-[2.1rem] md:text-[3.6rem] lg:text-[4.8rem] font-elegant font-bold mb-6 md:mb-10 leading-[1.15] tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#30302e] via-[#a47fba] to-[#67cbf1]">
                {t.heroTitle}
              </span>
            </h1>
            <p className="text-base md:text-xl text-gray-500 mb-8 md:mb-12 max-w-xl font-light">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
              <button onClick={scrollToPlans} className="bg-[#a47fba] text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-lg md:text-xl shadow-2xl shadow-[#a47fba22] hover:bg-[#8e6aa3] transition-all flex items-center justify-center gap-4">
                {t.createBtn} <ArrowRight size={22} />
              </button>
              <button onClick={scrollToPlans} className="bg-white text-[#67cbf1] border-2 border-[#67cbf122] px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-lg md:text-xl hover:bg-sky-50 transition-all flex items-center justify-center gap-2">
                {t.viewPlans}
              </button>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200" alt="Preview" className="rounded-[3rem] shadow-2xl rotate-2 transform hover:rotate-0 transition-all duration-700 w-full h-[500px] object-cover" />
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-12 md:py-24 bg-[#f8f7f9] border-t border-[#f0eef2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-elegant font-bold mb-3 text-[#30302e]">{t.planSelectionTitle}</h2>
            <p className="text-[#a47fba] uppercase tracking-widest text-xs font-black">{t.planSelectionSub}</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-24">
            {plans.map((plan) => (
              <div key={plan.id} className={`flex flex-col bg-white p-8 md:p-12 rounded-[2.5rem] border-2 transition-all duration-700 hover:-translate-y-2 relative ${plan.id === PlanType.PREMIUM ? 'border-[#a47fba] shadow-2xl scale-[1.05] z-10' : 'border-gray-100 shadow-xl'}`}>
                {plan.id === PlanType.PREMIUM && <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#a47fba] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">{t.bestSeller}</div>}
                {plan.id === PlanType.INFINITY && <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#30302e] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Crown size={12} className="text-[#67cbf1]" /> {t.mostExclusive}</div>}
                <h3 className="text-2xl font-black text-[#30302e] mb-4 uppercase">{plan.name}</h3>
                <div className="mb-8">
                  <span className="text-4xl font-black text-[#30302e] tracking-tighter">{plan.price}</span>
                  <span className="text-gray-400 text-xs font-bold ml-2">/ ÚNICO</span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-500 text-sm font-medium">
                      <CheckCircle2 size={16} className="text-[#a47fba] flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleSelect(plan.id)} className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${plan.id === PlanType.PREMIUM ? 'bg-[#a47fba] text-white hover:bg-[#8e6aa3]' : 'bg-gray-100 text-[#a47fba] hover:bg-gray-200'}`}>
                  {t.startNow}
                </button>
              </div>
            ))}
          </div>

          {/* Segurança Total Banner */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-[3rem] p-8 md:p-16 text-[#30302e] flex flex-col md:flex-row items-center gap-12 shadow-2xl border-2 border-dashed border-[#a47fba33] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#a47fba0a] rounded-full blur-3xl"></div>
              <ShieldCheck size={64} className="text-[#a47fba] flex-shrink-0" />
              <div className="text-center md:text-left space-y-4">
                <span className="inline-block bg-[#a47fba11] text-[#a47fba] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{t.securityTag}</span>
                <h3 className="text-3xl md:text-5xl font-elegant font-bold">{t.refundTitle}</h3>
                <p className="text-[#a47fba] font-bold text-xl">{t.refundSubtitle}</p>
                <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">{t.refundDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
