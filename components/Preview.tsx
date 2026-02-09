
import React, { useState, useEffect, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoupleData, PageEffect, PageTheme, PhotoFrame, PlanType, CoupleFont } from '../types';
import { Heart, ChevronLeft, ChevronRight, ArrowLeft, Music, CheckCircle, QrCode, Share2, X, Download, Star, Video, Play, Lock, Clock, Gift } from 'lucide-react';
import { Timeline } from './Timeline';
import { THEMES } from '../constants';

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

const InfinityEffect = memo(() => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <svg className="absolute w-full h-full opacity-20" viewBox="0 0 1000 1000">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {[...Array(8)].map((_, i) => (
        <path 
          key={i}
          d="M 250,500 C 250,250 750,750 750,500 C 750,250 250,750 250,500" 
          fill="none" 
          stroke={i % 2 === 0 ? "#67cbf1" : "#a47fba"} 
          strokeWidth="2"
          strokeDasharray="10 1000"
          filter="url(#glow)"
        >
          <animate 
            attributeName="stroke-dashoffset" 
            from="1010" 
            to="0" 
            dur={`${5 + i * 2}s`} 
            repeatCount="indefinite" 
          />
        </path>
      ))}
    </svg>
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [counter, setCounter] = useState<CounterState | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const videoId = useMemo(() => data.musicUrl ? getYoutubeId(data.musicUrl) : null, [data.musicUrl]);
  const activeTheme = useMemo(() => THEMES.find(th => th.id === data.theme) || THEMES[0], [data.theme]);
  const isPremium = data.plan === PlanType.PREMIUM || data.plan === PlanType.INFINITY;
  const isInfinity = data.plan === PlanType.INFINITY;

  const capsuleUnlocked = useMemo(() => {
    if (!data.capsuleOpenDate) return false;
    return new Date().getTime() >= new Date(data.capsuleOpenDate).getTime();
  }, [data.capsuleOpenDate]);

  useEffect(() => {
    if (isPremium && data.images.length > 1 && !isInfinity) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % data.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPremium, data.images.length, isInfinity]);

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
    [PhotoFrame.NONE]: "rounded-[2rem]",
    [PhotoFrame.POLAROID]: "p-4 pb-16 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm rotate-1 border border-gray-100",
    [PhotoFrame.GOLD]: "p-6 bg-gradient-to-br from-[#d4af37] via-[#f9f295] to-[#b8860b] shadow-[0_30px_60px_-12px_rgba(184,134,11,0.3)] rounded-sm border-2 border-[#f9f295]",
    [PhotoFrame.ORGANIC]: "rounded-[4rem] border-[12px] border-white shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]"
  };

  const pageUrl = isInfinity && data.requestedDomain ? `https://www.${data.requestedDomain}` : `https://kizuna.love/${data.slug || 'nosso-amor'}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(pageUrl)}&color=e11d48&bgcolor=ffffff`;

  const selectedFontClass = data.fontFamily || 'font-inter';

  return (
    <div className={`relative min-h-screen flex flex-col items-center p-6 overflow-x-hidden ${activeTheme.colors} transition-colors duration-1000`}>
      {data.effect === PageEffect.HEARTS && <HeartEffect />}
      {data.effect === PageEffect.SPARKLES && <StarEffect />}
      {data.effect === PageEffect.INFINITY && <InfinityEffect />}
      
      {/* Barra Superior */}
      <div className="fixed top-6 left-0 right-0 z-[100] flex justify-between px-6 pointer-events-none">
        <button onClick={() => navigate('/editar')} className="pointer-events-auto bg-white/90 backdrop-blur shadow-xl px-5 py-2.5 rounded-full text-gray-900 border border-white/50 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105"><ArrowLeft size={14} /> {t.backEditor}</button>
        <button onClick={() => navigate('/checkout')} className="pointer-events-auto bg-rose-500 text-white shadow-xl px-6 py-2.5 rounded-full flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all transform hover:scale-105">{t.finishPage} <CheckCircle size={14} /></button>
      </div>

      {videoId && isMusicPlaying && (
        <div className="fixed -top-[2000px]"><iframe width="100" height="100" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&enablejsapi=1`} allow="autoplay" title="Music"></iframe></div>
      )}

      {/* Card Principal */}
      <div className={`max-w-4xl w-full ${activeTheme.card} backdrop-blur-xl rounded-[3rem] shadow-2xl p-8 md:p-16 relative z-10 animate-in fade-in zoom-in duration-1000 mt-28 border border-white/30 overflow-hidden`}>
        
        <header className="text-center mb-16">
          <div className="flex flex-col items-center justify-center gap-4 mb-8">
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500 animate-pulse" />
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              <h2 className={`text-5xl md:text-8xl ${selectedFontClass} ${activeTheme.text} drop-shadow-sm`}>{data.partner1 || 'Você'}</h2>
              <span className="text-2xl font-elegant italic text-gray-300">&</span>
              <h2 className={`text-5xl md:text-8xl ${selectedFontClass} ${activeTheme.text} drop-shadow-sm`}>{data.partner2 || 'Seu Amor'}</h2>
            </div>
          </div>
          <p className="text-gray-400 font-elegant italic tracking-[0.4em] text-[11px] uppercase opacity-80">{t.togetherForever}</p>
        </header>

        {/* Galeria */}
        <section className="mb-16">
          {isInfinity ? (
            <div className="columns-2 md:columns-3 gap-6 space-y-6">
              {data.images.map((img, idx) => (
                <div key={idx} className={`${frameClasses[data.frame]} overflow-hidden shadow-xl transition-all hover:scale-[1.03] group relative`}>
                  <img src={img} className="w-full h-auto object-cover" alt="Memória" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`relative mx-auto max-w-sm ${frameClasses[data.frame]} overflow-hidden shadow-2xl bg-gray-50/20`}>
              <div className="aspect-square relative">
                {data.images.length > 0 ? (
                  data.images.map((img, idx) => (
                    <img key={idx} src={img} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`} alt="Memória" />
                  ))
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-rose-100"><Heart size={64} fill="currentColor" className="opacity-10" /></div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Contador */}
        {counter && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {Object.entries(counter).map(([k, v]) => (
              <div key={k} className="bg-white/30 backdrop-blur-sm p-4 md:p-6 rounded-3xl text-center border border-white/40 shadow-sm">
                <span className={`block text-3xl md:text-4xl font-black ${activeTheme.text} tracking-tighter`}>{v as any}</span>
                <span className="text-[9px] uppercase font-black text-gray-400 tracking-widest mt-1 block">{(t as any)[k] || k}</span>
              </div>
            ))}
          </div>
        )}

        {/* Vídeos (Plano Infinito - FUNCIONAL) */}
        {isInfinity && (data.videos || []).length > 0 && (
          <section className="mb-16 space-y-8">
            <div className="text-center">
              <h3 className={`text-3xl ${selectedFontClass} ${activeTheme.text} mb-2`}>{t.videosLabel}</h3>
              <div className="w-12 h-1 bg-rose-400/20 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {data.videos.map((url, idx) => {
                const vid = getYoutubeId(url);
                if (!vid) return null;
                return (
                  <div key={idx} className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border-4 border-white/20">
                    <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${vid}?modestbranding=1&rel=0`}
                      title="Memória em Vídeo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Cápsula do Tempo (FUNCIONAL) */}
        {isInfinity && data.capsuleOpenDate && (
          <section className="mb-16 p-8 md:p-12 bg-gray-900 rounded-[3rem] text-center shadow-2xl border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#67cbf111] to-[#a47fba11] opacity-50"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              {capsuleUnlocked ? (
                <div className="animate-in zoom-in duration-1000">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-green-500/20">
                    <Gift size={32} />
                  </div>
                  <h3 className="text-3xl font-elegant text-white mb-4">A Cápsula foi Aberta!</h3>
                  <div className="p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <p className={`text-xl md:text-2xl italic text-white leading-relaxed ${selectedFontClass}`}>
                      "{data.capsuleMessage}"
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-[#67cbf1] mb-6 animate-pulse">
                    <Lock size={32} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-elegant text-white mb-2">Cápsula do Tempo</h3>
                  <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest font-black">Será aberta em: {new Date(data.capsuleOpenDate).toLocaleDateString()}</p>
                  <div className="flex gap-4">
                    <Clock className="text-[#67cbf1] animate-spin-slow" />
                    <span className="text-white/60 font-medium">O tempo está passando...</span>
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* Mensagem Principal */}
        {data.message && (
          <div className={`text-center italic ${selectedFontClass} text-xl md:text-2xl leading-relaxed mb-16 px-6 opacity-90 ${activeTheme.text}`}>
            "{data.message}"
          </div>
        )}

        <Timeline milestones={data.milestones} colorClass={activeTheme.text} />
      </div>

      <div className="mt-16 mb-32 text-center relative z-10">
         <button onClick={() => setShowShareModal(true)} className="bg-white/90 backdrop-blur shadow-2xl px-12 py-5 rounded-2xl border border-white/50 text-rose-500 font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-4 mx-auto hover:bg-white transition-all transform hover:-translate-y-1 active:scale-95">
           <Share2 size={20} /> {t.shareBtn}
         </button>
      </div>

      {videoId && (
        <button onClick={() => setIsMusicPlaying(!isMusicPlaying)} className="fixed bottom-10 right-10 z-[100] bg-white/90 backdrop-blur shadow-2xl p-5 rounded-full flex items-center gap-4 border border-white/50 hover:scale-110 transition-all group">
           <div className={`w-12 h-12 ${isMusicPlaying ? 'bg-rose-500 animate-spin-slow' : 'bg-gray-200'} rounded-full flex items-center justify-center text-white transition-all`}>
             <Music size={20} fill={isMusicPlaying ? "white" : "none"} />
           </div>
           {isMusicPlaying && <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest pr-2 animate-pulse">Tocando</span>}
        </button>
      )}

      {showShareModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-rose-900/60 backdrop-blur-md animate-in fade-in duration-500">
           <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-2xl relative animate-in zoom-in slide-in-from-bottom-8 duration-500 text-center">
              <button onClick={() => setShowShareModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-rose-500 p-2"><X size={24} /></button>
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6"><QrCode size={32} /></div>
              <h4 className="font-bold text-gray-900 mb-2 text-2xl">{t.giftCardTitle}</h4>
              <p className="text-sm text-gray-500 mb-8">{t.giftCardDesc}</p>
              <div className="bg-white p-6 rounded-[2rem] border-2 border-rose-50 mb-8 flex justify-center"><img src={qrUrl} alt="QR Code" className="w-40 h-40 mix-blend-multiply" /></div>
              <a href={qrUrl} download="kizuna-qrcode.png" className="w-full bg-rose-500 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3"><Download size={18} /> Baixar QR Code</a>
           </div>
        </div>
      )}
    </div>
  );
};

export default Preview;
