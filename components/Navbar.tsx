
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, HelpCircle, Mail } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  t: any;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, t }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLangs, setShowLangs] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById('plans');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('plans');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  const currentFlag = lang === 'pt' ? '🇧🇷' : '🇯🇵';

  return (
    <>
      <nav className="sticky top-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-[#f0eef2] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
            <img 
              src="https://younextweb.com/kizuna/logo.png" 
              alt="KIZUNA Logo" 
              className="h-9 md:h-12 w-auto object-contain"
            />
          </Link>
          
          <div className="flex gap-3 md:gap-8 items-center">
            {/* Menu Desktop */}
            <div className="hidden md:flex items-center gap-8 mr-4">
              <Link to="/duvidas" className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-[#a47fba] transition-colors">
                {t.faq}
              </Link>
              <Link to="/contato" className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-[#a47fba] transition-colors">
                {t.contact}
              </Link>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => { setShowLangs(!showLangs); }}
                className="flex items-center gap-1.5 bg-[#f4f0f7] border border-[#e8e1f0] px-3 py-1.5 md:px-4 md:py-2 rounded-full hover:bg-[#e8e1f0] transition-all shadow-sm group"
              >
                <span className="text-base md:text-lg leading-none">{currentFlag}</span>
                <ChevronDown size={12} className={`text-[#a47fba] transition-transform duration-300 ${showLangs ? 'rotate-180' : ''}`} />
              </button>
              
              {showLangs && (
                <div className="absolute right-0 mt-3 w-40 bg-white rounded-2xl shadow-2xl border border-[#f0eef2] overflow-hidden animate-in fade-in zoom-in slide-in-from-top-2 duration-300 z-[110]">
                  <button 
                    onClick={() => { setLang('pt'); setShowLangs(false); }}
                    className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-[#f4f0f7] text-sm font-semibold transition-colors ${lang === 'pt' ? 'text-[#a47fba] bg-[#f4f0f7]/50' : 'text-gray-500'}`}
                  >
                    <span className="text-lg">🇧🇷</span> Português
                  </button>
                  <button 
                    onClick={() => { setLang('jp'); setShowLangs(false); }}
                    className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-[#f4f0f7] text-sm font-semibold transition-colors ${lang === 'jp' ? 'text-[#a47fba] bg-[#f4f0f7]/50' : 'text-gray-500'}`}
                  >
                    <span className="text-lg">🇯🇵</span> 日本語
                  </button>
                </div>
              )}
            </div>

            {/* CTA Desktop */}
            <button 
              onClick={handleCtaClick}
              className="hidden md:block bg-[#a47fba] text-white px-8 py-3 rounded-full hover:bg-[#8e6aa3] transition-all shadow-lg shadow-[#a47fba22] hover:shadow-[#a47fba44] transform hover:-translate-y-0.5 font-black text-xs uppercase tracking-widest"
            >
              {t.createBtn}
            </button>

            {/* Botão Hambúrguer Mobile */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-[#a47fba] transition-colors z-[120]"
              aria-label="Abrir menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Mobile Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[90] md:hidden animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col p-8 pt-32 gap-6">
            <Link 
              to="/duvidas" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between text-2xl font-elegant font-bold text-[#30302e] border-b border-gray-50 pb-6"
            >
              <span>{t.faq}</span>
              <HelpCircle className="text-[#a47fba]" size={24} />
            </Link>
            <Link 
              to="/contato" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between text-2xl font-elegant font-bold text-[#30302e] border-b border-gray-50 pb-6"
            >
              <span>{t.contact}</span>
              <Mail className="text-[#a47fba]" size={24} />
            </Link>
            
            <div className="mt-6">
              <button 
                onClick={handleCtaClick}
                className="w-full bg-[#a47fba] text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl shadow-[#a47fba22] active:scale-95 transition-transform"
              >
                {t.createBtn}
              </button>
            </div>
            
            <div className="mt-auto text-center pb-12">
              <p className="text-gray-300 text-[10px] font-black uppercase tracking-[0.3em] italic">KIZUNA - Eternizando Histórias</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;