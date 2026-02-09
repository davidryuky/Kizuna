
import React, { useState, useEffect } from 'react';
import { CoupleData, PhotoFrame, PlanType } from '../types';
import { Heart, Video, Lock, Clock, Gift, Star } from 'lucide-react';
import { Timeline } from './Timeline';

interface UnifiedPreviewProps {
  data: CoupleData;
  t: any;
  counter: any;
  activeTheme: any;
  selectedFont: string;
}

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[1].length === 11) ? match[1] : null;
};

const UnifiedPreview: React.FC<UnifiedPreviewProps> = ({ data, t, counter, activeTheme, selectedFont }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isInfinity = data.plan === PlanType.INFINITY;
  const isPremium = data.plan === PlanType.PREMIUM || isInfinity;
  const capsuleUnlocked = data.capsuleOpenDate ? new Date().getTime() >= new Date(data.capsuleOpenDate).getTime() : false;

  useEffect(() => {
    if (!isInfinity && data.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % data.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInfinity, data.images.length]);

  const frameClasses = {
    [PhotoFrame.NONE]: "rounded-[2.5rem]",
    [PhotoFrame.POLAROID]: "p-4 pb-16 bg-white shadow-2xl rounded-sm rotate-1 border border-gray-100",
    [PhotoFrame.GOLD]: "p-5 bg-gradient-to-br from-[#d4af37] via-[#f9f295] to-[#b8860b] shadow-2xl rounded-sm border-2 border-[#f9f295]",
    [PhotoFrame.ORGANIC]: "rounded-[4rem] border-[10px] border-white shadow-inner"
  };

  return (
    <div className={`max-w-5xl w-full ${activeTheme.card} rounded-[4rem] shadow-2xl p-8 md:p-20 relative z-10 border overflow-hidden animate-in fade-in duration-1000`}>
      
      {/* Decoração de Fundo Genérica Baseada no Tema */}
      <div className={`absolute -top-[20%] -left-[20%] w-[60%] h-[60%] ${activeTheme.isDark ? 'bg-white/5' : 'bg-black/5'} rounded-full blur-[100px] pointer-events-none`}></div>
      <div className={`absolute -bottom-[20%] -right-[20%] w-[60%] h-[60%] ${activeTheme.accent} opacity-10 rounded-full blur-[100px] pointer-events-none`}></div>

      {/* Header Padronizado */}
      <header className="text-center mb-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-8">
          <h2 className={`text-6xl md:text-8xl lg:text-9xl ${selectedFont} ${activeTheme.text} drop-shadow-2xl`}>
            {data.partner1 || 'P1'}
          </h2>
          <div className="relative">
             <Heart className="text-rose-500 animate-pulse fill-current" size={isInfinity ? 48 : 32} />
             {isInfinity && <Star className="absolute -top-4 -right-4 text-sky-400 animate-spin-slow" size={20} />}
          </div>
          <h2 className={`text-6xl md:text-8xl lg:text-9xl ${selectedFont} ${activeTheme.text} drop-shadow-2xl`}>
            {data.partner2 || 'P2'}
          </h2>
        </div>
        <p className={`${activeTheme.muted} font-black text-[10px] md:text-xs uppercase tracking-[0.5em] italic`}>
          {t.togetherForever}
        </p>
      </header>

      {/* Contador de Tempo Real Padronizado */}
      {counter && (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20 relative z-10">
          {Object.entries(counter).map(([k, v]) => (
            <div key={k} className={`bg-white/20 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] text-center border ${activeTheme.isDark ? 'border-white/10' : 'border-white/60'} shadow-sm`}>
              <span className={`block text-4xl md:text-5xl font-black ${activeTheme.text} tracking-tighter tabular-nums`}>{v as any}</span>
              <span className={`text-[10px] uppercase font-black ${activeTheme.muted} tracking-widest mt-2 block`}>{(t as any)[k]}</span>
            </div>
          ))}
        </section>
      )}

      {/* Galeria de Fotos */}
      <section className="mb-20 relative z-10">
        {isInfinity ? (
          <div className="columns-2 md:columns-3 gap-6 space-y-6">
            {data.images.map((img, idx) => (
              <div key={idx} className={`${frameClasses[data.frame]} overflow-hidden shadow-2xl transition-all hover:scale-[1.02] relative group`}>
                <img src={img} className="w-full h-auto object-cover" alt="Memória" />
                <div className={`absolute inset-0 ${activeTheme.isDark ? 'bg-black/20' : 'bg-white/10'} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`relative mx-auto max-w-md ${frameClasses[data.frame]} overflow-hidden shadow-2xl`}>
            <div className="aspect-[4/5] relative bg-gray-50/5">
              {data.images.length > 0 ? (
                data.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`} 
                    alt="Memória" 
                  />
                ))
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-200">
                  <Heart size={64} />
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Mensagem do Casal */}
      {data.message && (
        <div className={`text-center italic ${selectedFont} text-2xl md:text-4xl leading-relaxed mb-20 px-6 md:px-12 opacity-90 ${activeTheme.text} relative z-10`}>
          "{data.message}"
        </div>
      )}

      {/* Seções Adicionais Condicionais (Planos Premium/Infinity) */}
      {isPremium && (
        <>
          {/* Vídeos */}
          {(data.videos || []).length > 0 && (
            <section className="mb-20 space-y-12 relative z-10">
              <div className="text-center">
                <h3 className={`text-3xl md:text-4xl ${selectedFont} ${activeTheme.text} mb-4`}>{t.videosLabel}</h3>
                <div className={`w-20 h-1 ${activeTheme.accent} mx-auto rounded-full opacity-30`}></div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {data.videos.map((url, idx) => {
                  const vid = getYoutubeId(url);
                  if (!vid) return null;
                  return (
                    <div key={idx} className={`aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border-4 ${activeTheme.isDark ? 'border-white/10' : 'border-white/40'} relative group`}>
                      <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${vid}?modestbranding=1&rel=0`} title="Vídeo" allowFullScreen></iframe>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Cápsula do Tempo (Somente Infinity) */}
          {isInfinity && data.capsuleOpenDate && (
            <section className={`mb-20 p-10 md:p-20 rounded-[3.5rem] text-center shadow-2xl border relative overflow-hidden z-10 ${activeTheme.isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'}`}>
              <div className="relative z-10 flex flex-col items-center">
                {capsuleUnlocked ? (
                  <div className="space-y-8 animate-in zoom-in duration-1000">
                    <Gift className={`w-16 h-16 ${activeTheme.text} mx-auto animate-bounce`} />
                    <h3 className={`text-3xl font-elegant ${activeTheme.text}`}>Cápsula Aberta</h3>
                    <p className={`text-xl md:text-2xl italic leading-relaxed ${selectedFont} ${activeTheme.text}`}>"{data.capsuleMessage}"</p>
                  </div>
                ) : (
                  <div className="space-y-10">
                    <Lock className={`w-16 h-16 ${activeTheme.muted} mx-auto animate-pulse`} />
                    <h3 className={`text-2xl md:text-3xl font-elegant ${activeTheme.text}`}>{t.capsuleTitle}</h3>
                    <div className={`flex items-center gap-4 ${activeTheme.isDark ? 'bg-white/10' : 'bg-black/5'} px-6 py-3 rounded-full`}>
                       <Clock className={activeTheme.text} size={18} />
                       <span className={`${activeTheme.text} font-black text-[10px] uppercase tracking-widest`}>{new Date(data.capsuleOpenDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Linha do Tempo */}
          {data.milestones.length > 0 && (
            <div className="relative z-10">
               <div className="text-center mb-16">
                  <h3 className={`text-3xl md:text-4xl ${selectedFont} ${activeTheme.text} mb-2`}>{t.milestones}</h3>
                  <div className={`w-16 h-1 ${activeTheme.accent} mx-auto rounded-full opacity-30`}></div>
               </div>
               <Timeline milestones={data.milestones} colorClass={activeTheme.text} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UnifiedPreview;
