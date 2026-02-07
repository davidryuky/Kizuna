
import React, { useState, useEffect, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoupleData, PageEffect, PageTheme, PhotoFrame, PlanType, CoupleFont } from '../types';
import { Heart, ChevronLeft, ChevronRight, ArrowLeft, Music, CheckCircle, QrCode, Share2, X, Download, Star } from 'lucide-react';
import { Timeline } from './Timeline';
import { THEMES } from '../constants';

interface CounterState {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

interface PreviewProps {
  data: CoupleData;
  lang: any;
  t: any;
  isEmbedded?: boolean;
}

const HeartEffect = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(15)].map((_, i) => (
      <div key={i} className="heart text-rose-400 opacity-20" style={{ left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 8 + 6}s`, animationDelay: `${Math.random() * 5}s`, fontSize: `${Math.random() * 16 + 8}px` }}>
        <Heart fill="currentColor" />
      </div>
    ))}
  </div>
));

const StarEffect = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(30)].map((_, i) => (
      <div key={i} className="absolute animate-pulse text-yellow-200" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 3 + 1}s`, opacity: Math.random() }}>
        <Star size={Math.random() * 6 + 2} fill="currentColor" />
      </div>
    ))}
  </div>
));

const PetalEffect = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(15)].map((_, i) => (
      <div key={i} className="heart text-rose-200 opacity-30" style={{ left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 12 + 8}s`, animationDelay: `${Math.random() * 10}s` }}>
        <div className="w-3 h-4 bg-rose-100 rounded-full rotate-45 shadow-sm" style={{ borderRadius: '100% 10% 100% 10%' }}></div>
      </div>
    ))}
  </div>
));

const FirefliesEffect = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(20)].map((_, i) => (
      <div key={i} className="absolute bg-yellow-300/40 rounded-full blur-[2px] animate-pulse" 
        style={{ 
          left: `${Math.random() * 100}%`, 
          top: `${Math.random() * 100}%`, 
          width: `${Math.random() * 4 + 2}px`, 
          height: `${Math.random() * 4 + 2}px`,
          animationDuration: `${Math.random() * 5 + 2}s`,
          animationDelay: `${Math.random() * 5}s`
        }} 
      />
    ))}
  </div>
));

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[1].length === 11) ? match[1] : null;
};

const Preview: React.FC<PreviewProps> = ({ data, lang, t, isEmbedded = false }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [counter, setCounter] = useState<CounterState | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  const videoId = useMemo(() => data.musicUrl ? getYoutubeId(data.musicUrl) : null, [data.musicUrl]);
  const activeTheme = useMemo(() => THEMES.find(th => th.id === data.theme) || THEMES[0], [data.theme]);
  const isPremium = data.plan === PlanType.PREMIUM;

  useEffect(() => {
    if (isPremium && data.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % data.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPremium, data.images.length]);

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

  const frameClasses = {
    [PhotoFrame.NONE]: "rounded-[1.5rem]",
    [PhotoFrame.POLAROID]: "p-3 pb-12 bg-white shadow-xl rounded-sm rotate-1 border border-gray-100",
    [PhotoFrame.GOLD]: "p-4 bg-gradient-to-br from-amber-600 via-amber-100 to-amber-700 shadow-xl rounded-sm",
    [PhotoFrame.ORGANIC]: "rounded-[2.5rem] border-4 border-white shadow-inner"
  };

  const selectedFontClass = data.fontFamily || 'font-inter';

  return (
    <div className={`relative min-h-full w-full flex flex-col items-center p-4 overflow-hidden ${activeTheme.colors} transition-colors duration-1000 ${isEmbedded ? '' : 'min-h-screen p-6'}`}>
      {data.effect === PageEffect.HEARTS && <HeartEffect />}
      {data.effect === PageEffect.SPARKLES && <StarEffect />}
      {data.effect === PageEffect.FLOWER_PETALS && <PetalEffect />}
      {data.effect === PageEffect.FIREFLIES && <FirefliesEffect />}
      
      {!isEmbedded && (
        <div className="fixed top-6 left-0 right-0 z-[100] flex justify-between px-6 pointer-events-none">
          <button onClick={() => navigate('/editar')} className="pointer-events-auto bg-white/90 backdrop-blur shadow-xl px-5 py-2.5 rounded-full text-gray-900 border border-white/50 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 active:scale-95"><ArrowLeft size={14} /> {t.backEditor}</button>
          <button onClick={() => navigate('/checkout')} className="pointer-events-auto bg-rose-500 text-white shadow-xl px-6 py-2.5 rounded-full flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all transform hover:scale-105 active:scale-95">{t.finishPage} <CheckCircle size={14} /></button>
        </div>
      )}

      {videoId && isMusicPlaying && !isEmbedded && (
        <div className="fixed -top-[2000px]"><iframe width="100" height="100" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&enablejsapi=1`} allow="autoplay" title="Music"></iframe></div>
      )}

      {/* Card Principal */}
      <div className={`w-full ${activeTheme.card} backdrop-blur-xl rounded-[2rem] shadow-xl p-6 md:p-8 relative z-10 animate-in fade-in zoom-in duration-700 ${isEmbedded ? 'mt-4' : 'mt-28 max-w-2xl p-16'} border border-white/30`}>
        
        <header className="text-center mb-8">
          <div className="flex flex-col items-center justify-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
            <div className="flex flex-wrap items-center justify-center gap-2">
              <h2 className={`text-3xl md:text-5xl ${selectedFontClass} ${activeTheme.text}`}>{data.partner1 || 'Amor'}</h2>
              <span className="text-xl font-elegant italic text-gray-300">&</span>
              <h2 className={`text-3xl md:text-5xl ${selectedFontClass} ${activeTheme.text}`}>{data.partner2 || 'Eterno'}</h2>
            </div>
          </div>
          <p className="text-gray-400 font-elegant italic tracking-[0.2em] text-[9px] uppercase opacity-80">{t.togetherForever}</p>
        </header>

        {/* Galeria */}
        <div className={`relative mx-auto max-w-[240px] ${frameClasses[data.frame]} overflow-hidden mb-8 shadow-lg bg-gray-50/20`}>
          {data.images.length > 0 ? (
            <div className="aspect-square relative overflow-hidden">
               {data.images.map((img, idx) => (
                 <img 
                    key={idx} 
                    src={img} 
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`} 
                    alt="Memória" 
                  />
               ))}
            </div>
          ) : (
            <div className="aspect-square flex items-center justify-center text-rose-100 bg-gray-50"><Heart size={40} fill="currentColor" className="opacity-10" /></div>
          )}
        </div>

        {/* Contador */}
        {counter && (
          <div className="grid grid-cols-4 gap-2 mb-8">
            {Object.entries(counter).map(([k, v]) => (
              <div key={k} className="bg-white/30 backdrop-blur-sm p-3 rounded-2xl text-center border border-white/40 shadow-sm">
                <span className={`block text-xl font-black ${activeTheme.text} tracking-tighter`}>{v as React.ReactNode}</span>
                <span className="text-[7px] uppercase font-black text-gray-400 tracking-widest mt-0.5 block">{(t as any)[k] || k}</span>
              </div>
            ))}
          </div>
        )}

        {/* Mensagem */}
        <div className={`text-center italic ${selectedFontClass} text-sm leading-relaxed mb-8 px-2 opacity-90 ${activeTheme.text.includes('slate') ? 'text-slate-300' : 'text-gray-700'}`}>
          "{data.message || "Escreva aqui as palavras que definem o seu amor..."}"
        </div>

        {/* Timeline */}
        <Timeline milestones={data.milestones} colorClass={activeTheme.text} />
      </div>

      {!isEmbedded && (
        <div className="max-w-sm w-full mt-10 mb-20 text-center relative z-10">
           <button 
             onClick={() => setShowShareModal(true)}
             className="bg-white/90 backdrop-blur shadow-xl px-10 py-4 rounded-xl border border-white/50 text-rose-500 font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 mx-auto"
           >
             <Share2 size={18} /> {t.shareBtn}
           </button>
        </div>
      )}
    </div>
  );
};

export default Preview;
