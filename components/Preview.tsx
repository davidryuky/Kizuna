
import React, { useState, useEffect, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoupleData, PageEffect, PlanType } from '../types';
import { ArrowLeft, CheckCircle, QrCode, Share2, X, Download, Star, Music, Heart } from 'lucide-react';
import { THEMES } from '../constants';
import UnifiedPreview from './UnifiedPreview';

interface CounterState {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

const HeartEffect = memo(() => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(20)].map((_, i) => (
      <div key={i} className="heart-particle" style={{ left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 8 + 6}s`, animationDelay: `${Math.random() * 5}s`, fontSize: `${Math.random() * 24 + 12}px` }}>
        <Heart fill="currentColor" />
      </div>
    ))}
  </div>
));

const StarEffect = memo(() => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(50)].map((_, i) => (
      <div key={i} className="absolute animate-pulse text-yellow-200" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 3 + 1}s`, opacity: Math.random() }}>
        <Star size={Math.random() * 8 + 2} fill="currentColor" />
      </div>
    ))}
  </div>
));

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[1].length === 11) ? match[1] : null;
};

const Preview: React.FC<{ data: CoupleData, lang: any, t: any }> = ({ data, lang, t }) => {
  const navigate = useNavigate();
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [counter, setCounter] = useState<CounterState | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const musicVideoId = useMemo(() => data.musicUrl ? getYoutubeId(data.musicUrl) : null, [data.musicUrl]);
  const activeTheme = useMemo(() => THEMES.find(th => th.id === data.theme) || THEMES[0], [data.theme]);
  const isPremium = data.plan === PlanType.PREMIUM || data.plan === PlanType.INFINITY;
  const isInfinity = data.plan === PlanType.INFINITY;

  useEffect(() => {
    const timer = setInterval(() => {
      if (data.startDate) {
        const diff = new Date().getTime() - new Date(data.startDate).getTime();
        setCounter({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [data.startDate]);

  const pageUrl = isInfinity && data.requestedDomain ? `https://www.${data.requestedDomain}` : `https://kizuna.love/${data.slug || 'nosso-amor'}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(pageUrl)}&color=050505&bgcolor=ffffff`;

  return (
    <div className={`relative min-h-screen flex flex-col items-center p-6 overflow-x-hidden ${activeTheme.colors} transition-all duration-1000`}>
      {data.effect === PageEffect.HEARTS && <HeartEffect />}
      {data.effect === PageEffect.SPARKLES && <StarEffect />}
      
      {/* Botões de Navegação da Prévia */}
      <div className="fixed top-6 left-0 right-0 z-[100] flex justify-between px-6 pointer-events-none">
        <button onClick={() => navigate('/editar')} className="pointer-events-auto bg-white/90 backdrop-blur shadow-xl px-6 py-3 rounded-full text-gray-900 border border-white/50 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-black/5"><ArrowLeft size={16} /> {t.backEditor}</button>
        <button onClick={() => navigate('/checkout')} className="pointer-events-auto bg-rose-500 text-white shadow-xl px-8 py-3 rounded-full flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all transform hover:scale-105 active:scale-95 shadow-rose-200">{t.finishPage} <CheckCircle size={16} /></button>
      </div>

      {/* Áudio em Background */}
      {isPremium && musicVideoId && (
        <div className="fixed -top-[2000px] pointer-events-none">
          <iframe width="1" height="1" src={`https://www.youtube.com/embed/${musicVideoId}?autoplay=${isMusicPlaying ? '1' : '0'}&loop=1&playlist=${musicVideoId}`} allow="autoplay" title="Audio"></iframe>
        </div>
      )}

      {/* Unified Preview - Template Igual para Todos os Planos */}
      <div className="mt-28 w-full flex justify-center">
        <UnifiedPreview 
          data={data} 
          t={t} 
          counter={counter} 
          activeTheme={activeTheme} 
          selectedFont={data.fontFamily} 
        />
      </div>

      {/* Botão de Compartilhamento */}
      <div className="mt-20 mb-40 text-center relative z-10">
         <button onClick={() => setShowShareModal(true)} className={`${activeTheme.card} ${activeTheme.text} shadow-xl px-16 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-5 mx-auto hover:scale-105 transition-all transform active:scale-95 border`}>
           <Share2 size={24} /> {t.shareBtn}
         </button>
      </div>

      {/* Floating Audio Toggle */}
      {isPremium && musicVideoId && (
        <button onClick={() => setIsMusicPlaying(!isMusicPlaying)} className={`${activeTheme.card} fixed bottom-10 right-10 z-[100] shadow-2xl p-6 rounded-full flex items-center gap-5 border hover:scale-110 transition-all group`}>
           <div className={`w-14 h-14 ${isMusicPlaying ? 'bg-rose-500 animate-spin-slow' : 'bg-gray-200'} rounded-full flex items-center justify-center text-white transition-all`}>
             <Music size={24} fill={isMusicPlaying ? "white" : "none"} />
           </div>
           {isMusicPlaying && <span className={`text-[11px] font-black uppercase tracking-widest pr-2 animate-pulse ${activeTheme.text}`}>Em Sintonia</span>}
        </button>
      )}

      {/* Modal Share */}
      {showShareModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in">
           <div className="bg-white rounded-[4rem] p-12 max-w-md w-full shadow-2xl relative text-center border-t-8 border-rose-500">
              <button onClick={() => setShowShareModal(false)} className="absolute top-8 right-8 text-gray-400 hover:text-rose-500 p-2"><X size={32} /></button>
              <QrCode size={40} className="mx-auto mb-8 text-rose-500" />
              <h4 className="font-elegant font-bold text-gray-900 mb-4 text-3xl">Nosso Legado</h4>
              <p className="text-sm text-gray-500 mb-10 leading-relaxed">Revele esta surpresa enviando o link ou QR Code.</p>
              <div className="bg-gray-50 p-8 rounded-[3rem] border-2 border-dashed border-rose-100 mb-10 flex justify-center">
                <img src={qrUrl} alt="QR Code" className="w-48 h-48 mix-blend-multiply" />
              </div>
              <div className="flex flex-col gap-4">
                 <button onClick={() => { navigator.clipboard.writeText(pageUrl); alert('Copiado!'); }} className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest">Copiar Link</button>
                 <a href={qrUrl} download="kizuna.png" className="w-full bg-rose-500 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3"><Download size={20} /> Baixar QR</a>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Preview;
