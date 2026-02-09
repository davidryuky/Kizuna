
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { PlanType, CoupleData, PageEffect, Language, PageTheme, PhotoFrame, CoupleFont } from './types';
import LandingPage from './components/LandingPage';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Checkout from './components/Checkout';
import Navbar from './components/Navbar';
import FAQ from './components/FAQ';
import Privacy from './components/Privacy';
import Contact from './components/Contact';
import Tokutei from './components/Tokutei';
import { translations } from './translations';
import { Instagram, Twitter, Facebook, Youtube, Heart } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const INITIAL_DATA: CoupleData = {
  partner1: '', partner2: '',
  startDate: '', images: [],
  videos: [],
  musicUrl: '',
  message: '', effect: PageEffect.NONE,
  theme: PageTheme.ROMANTIC,
  frame: PhotoFrame.NONE,
  fontFamily: CoupleFont.ROMANTIC,
  milestones: [],
  plan: PlanType.BASIC,
  slug: '',
  capsuleMessage: '',
  capsuleOpenDate: ''
};

const AppContent: React.FC<{
  lang: Language;
  setLang: (l: Language) => void;
  selectedPlan: PlanType | null;
  setSelectedPlan: (p: PlanType) => void;
  coupleData: CoupleData;
  updateCoupleData: (data: Partial<CoupleData>) => void;
}> = ({ lang, setLang, selectedPlan, setSelectedPlan, coupleData, updateCoupleData }) => {
  const location = useLocation();
  const t = translations[lang];
  const isPreview = location.pathname === '/preview';

  const handleSelectPlan = (p: PlanType) => {
    setSelectedPlan(p);
    updateCoupleData({ plan: p });
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#fdfcfc] ${lang === 'jp' ? 'font-jp' : ''}`}>
      <ScrollToTop />
      {!isPreview && <Navbar lang={lang} setLang={setLang} t={t} />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage onSelectPlan={handleSelectPlan} lang={lang} t={t} />} />
          <Route path="/editar" element={<Editor data={coupleData} plan={selectedPlan || coupleData.plan} onUpdate={updateCoupleData} lang={lang} t={t} />} />
          <Route path="/preview" element={<Preview data={coupleData} lang={lang} t={t} />} />
          <Route path="/checkout" element={<Checkout data={coupleData} lang={lang} t={t} />} />
          <Route path="/duvidas" element={<FAQ lang={lang} t={t} />} />
          <Route path="/faq" element={<Navigate to="/duvidas" replace />} />
          <Route path="/privacidade" element={<Privacy lang={lang} t={t} />} />
          <Route path="/contato" element={<Contact lang={lang} t={t} />} />
          <Route path="/tokutei" element={<Tokutei lang={lang} t={t} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      {!isPreview && (
        <footer className="bg-white py-16 border-t border-gray-100 mt-auto">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
            <Link to="/" className="mb-8 transition-transform hover:scale-105">
              <img 
                src="https://younextweb.com/kizuna/logo.png" 
                alt="KIZUNA Logo" 
                className="h-14 md:h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm font-medium mb-10 max-w-lg leading-relaxed">{t.footerDesc}</p>
            <div className="flex gap-8 mb-12 text-gray-300">
              <a href="#" className="hover:text-[#a47fba] transition-colors"><Instagram size={22} /></a>
              <a href="#" className="hover:text-[#a47fba] transition-colors"><Twitter size={22} /></a>
              <a href="#" className="hover:text-[#a47fba] transition-colors"><Facebook size={22} /></a>
              <a href="#" className="hover:text-[#a47fba] transition-colors"><Youtube size={22} /></a>
              <a href="#" className="hover:text-[#a47fba] transition-colors"><Heart size={22} /></a>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12 text-[11px] font-black uppercase tracking-widest text-gray-400">
              <Link to="/duvidas" className="hover:text-[#a47fba] transition-colors">{t.faq}</Link>
              <Link to="/privacidade" className="hover:text-[#a47fba] transition-colors">{t.privacy}</Link>
              <Link to="/tokutei" className="hover:text-[#a47fba] transition-colors">{t.tokutei}</Link>
              <Link to="/contato" className="hover:text-[#a47fba] transition-colors">{t.contact}</Link>
            </div>
            <p className="text-gray-300 text-[10px] font-black uppercase tracking-[0.3em]">{lang === 'pt' ? 'Desenvolvido com ❤️ para Casais Apaixonados' : '愛するカップルのために❤️で作られました'}</p>
          </div>
        </footer>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('kizuna_lang') as Language) || 'pt');
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(() => (localStorage.getItem('kizuna_plan') as PlanType) || null);
  const [coupleData, setCoupleData] = useState<CoupleData>(() => {
    const saved = localStorage.getItem('kizuna_data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  useEffect(() => { localStorage.setItem('kizuna_lang', lang); }, [lang]);
  useEffect(() => { 
    localStorage.setItem('kizuna_data', JSON.stringify(coupleData));
    if (coupleData.plan) {
      setSelectedPlan(coupleData.plan);
      localStorage.setItem('kizuna_plan', coupleData.plan);
    }
  }, [coupleData]);

  const updateCoupleData = (data: Partial<CoupleData>) => setCoupleData(prev => ({ ...prev, ...data }));

  return (
    <HashRouter>
      <AppContent 
        lang={lang} 
        setLang={setLang} 
        selectedPlan={selectedPlan} 
        setSelectedPlan={setSelectedPlan} 
        coupleData={coupleData} 
        updateCoupleData={updateCoupleData} 
      />
    </HashRouter>
  );
};

export default App;
