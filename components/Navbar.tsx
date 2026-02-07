
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, ChevronDown } from 'lucide-react';
import { Language, PlanType } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  t: any;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, t }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLangs, setShowLangs] = useState(false);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const element = document.getElementById('plano-premium');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('plano-premium');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  const currentFlag = lang === 'pt' ? '🇧🇷' : '🇯🇵';

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-rose-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Heart className="w-10 h-10 text-rose-500 fill-rose-500 group-hover:scale-110 transition-transform duration-500" />
            <Heart className="absolute inset-0 w-10 h-10 text-rose-300 fill-rose-300 animate-ping opacity-20" />
          </div>
          <span className="text-3xl font-romance font-bold text-rose-600 tracking-tighter">KIZUNA</span>
        </Link>
        
        <div className="flex gap-6 items-center">
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => { setShowLangs(!showLangs); }}
              className="flex items-center gap-2 bg-rose-50/50 border border-rose-100 px-4 py-2 rounded-full hover:bg-rose-50 transition-all shadow-sm group"
            >
              <span className="text-xl leading-none">{currentFlag}</span>
              <ChevronDown size={14} className={`text-rose-300 transition-transform duration-300 ${showLangs ? 'rotate-180' : ''}`} />
            </button>
            
            {showLangs && (
              <div className="absolute right-0 mt-3 w-40 bg-white rounded-2xl shadow-2xl border border-rose-50 overflow-hidden animate-in fade-in zoom-in slide-in-from-top-2 duration-300 z-[100]">
                <button 
                  onClick={() => { setLang('pt'); setShowLangs(false); }}
                  className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-rose-50 text-sm font-semibold transition-colors ${lang === 'pt' ? 'text-rose-600 bg-rose-50/50' : 'text-gray-500'}`}
                >
                  <span className="text-lg">🇧🇷</span> Português
                </button>
                <button 
                  onClick={() => { setLang('jp'); setShowLangs(false); }}
                  className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-rose-50 text-sm font-semibold transition-colors ${lang === 'jp' ? 'text-rose-600 bg-rose-50/50' : 'text-gray-500'}`}
                >
                  <span className="text-lg">🇯🇵</span> 日本語
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={handleCtaClick}
            className="bg-rose-500 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 hover:shadow-rose-300 transform hover:-translate-y-0.5 font-black text-sm uppercase tracking-widest hidden sm:block"
          >
            {t.createBtn}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
