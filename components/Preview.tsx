
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
  
  const musicVideoId = useMemo(() => data.musicUrl ? getYoutubeId(data.musicUrl) : null, [data.musicUrl]);
  const activeTheme = useMemo(() => THEMES.find(th => th.id === data.theme) || THEMES[0], [data.theme]);
  const isPremium = data.plan === PlanType.PREMIUM || data.plan === PlanType.INFINITY;
  const isInfinity = data.plan === PlanType.INFINITY;
  const isInfinityTheme = data.theme === PageTheme.INFINITY;

  const capsuleUnlocked = useMemo(() => {
    if (!data.capsuleOpenDate) return false;
    const now = new Date().getTime();
    const unlockTime = new Date(data.capsuleOpenDate).getTime();
    return now >= unlockTime;
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
    [PhotoFrame.NONE]: "rounded-[2.5rem]",
    [PhotoFrame.POLAROID]: "p-4 pb-20 bg-white shadow-2xl rounded-sm rotate-1 border border-gray-100",
    [PhotoFrame.GOLD]: "p-6 bg-gradient-to-br from-[#d4af37] via-[#f9f295] to-[#b8860b] shadow-2xl rounded-sm border-2 border-[#f9f295]",
    [PhotoFrame.ORGANIC]: "rounded-[5rem] border-[15px] border-white shadow-inner"
  };

  const pageUrl = isInfinity && data.requestedDomain ? `https://www.${data.requestedDomain}` : `https://kizuna.love/${data.slug || 'nosso-amor'}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(pageUrl)}&color=050505&bgcolor=ffffff`;

  const selectedFontClass = data.fontFamily || 'font-inter';

  return (
    <div className={`relative min-h-screen flex flex-col items-center p-6 overflow-x-hidden ${activeTheme.colors} transition-all duration-1000`}>
      {/* Efeitos de Fundo */}
      {data.effect === PageEffect.HEARTS && <HeartEffect />}
      {data.effect === PageEffect.SPARKLES && <StarEffect />}
      
      {/* Decoração Especial Tema Infinity */}
      {isInfinityTheme && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#67cbf1]/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#a47fba]/10 rounded-full blur-[120px]"></div>
        </div>
      )}

      {/* Navegação Superior */}
      <div className="fixed top-6 left-0 right-0 z-[100] flex justify-between px-6 pointer-events-none">
        <button onClick={() => navigate('/editar')} className="pointer-events-auto bg-white/90 backdrop-blur shadow-xl px-6 py-3 rounded-full text-gray-900 border border-white/50 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 active:scale-95"><ArrowLeft size={16} /> {t.backEditor}</button>
        <button onClick={() => navigate('/checkout')} className="pointer-events-auto bg-rose-500 text-white shadow-xl px-8 py-3 rounded-full flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all transform hover:scale-105 active:scale-95">{t.finishPage} <CheckCircle size={16} /></button>
      </div>

      {/* Background Music Iframe (Only for Premium/Infinity) */}
      {isPremium && musicVideoId && (
        <div className="fixed -top-[2000px] pointer-events-none">
          <iframe 
            width="1" 
            height="1" 
            src={`https://www.youtube.com/embed/${musicVideoId}?autoplay=${isMusicPlaying ? '1' : '0'}&mute=0&loop=1&playlist=${musicVideoId}&enablejsapi=1`} 
            allow="autoplay" 
            title="Kizuna Background Music"
          ></iframe>
        </div>
      )}

      {/* Conteúdo Principal */}
      <div className={`max-w-4xl w-full ${activeTheme.card} rounded-[4rem] shadow-2xl p-8 md:p-20 relative z-10 animate-in fade-in zoom-in duration-1000 mt-28 border border-white/10 overflow-hidden`}>
        
        {/* Glow animado para Tema Infinity */}
        {isInfinityTheme && (
          <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-[#67cbf111] via-transparent to-[#a47fba11] animate-spin-slow opacity-30"></div>
        )}

        <header className="text-center mb-20 relative z-10">
          <div className="flex flex-col items-center justify-center gap-6 mb-10">
            <div className={`p-5 rounded-full ${isInfinityTheme ? 'bg-[#67cbf1]/20 shadow-[0_0_40px_rgba(103,203,241,0.3)]' : 'bg-rose-50'}`}>
              <Heart className={`w-14 h-14 ${isInfinityTheme ? 'text-[#67cbf1]' : 'text-rose-500'} fill-current animate-pulse`} />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
              <h2 className={`text-6xl md:text-9xl ${selectedFontClass} ${activeTheme.text} drop-shadow-2xl`}>{data.partner1 || 'Você'}</h2>
              <span className={`text-2xl font-elegant italic ${isInfinityTheme ? 'text-gray-500' : 'text-gray-300'}`}>&</span>
              <h2 className={`text-6xl md:text-9xl ${selectedFontClass} ${activeTheme.text} drop-shadow-2xl`}>{data.partner2 || 'Seu Amor'}</h2>
            </div>
          </div>
          <p className={`${isInfinityTheme ? 'text-[#67cbf1]' : 'text-gray-400'} font-elegant italic tracking-[0.5em] text-[12px] uppercase opacity-80`}>{t.togetherForever}</p>
        </header>

        {/* Galeria Grid (Infinito) ou Slider (Outros) */}
        <section className="mb-20 relative z-10">
          {isInfinity ? (
            <div className="columns-2 md:columns-3 gap-6 space-y-6">
              {data.images.map((img, idx) => (
                <div key={idx} className={`${frameClasses[data.frame]} overflow-hidden shadow-2xl transition-all hover:scale-[1.05] group cursor-zoom-in`}>
                  <img src={img} className="w-full h-auto object-cover" alt="Memória" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`relative mx-auto max-w-md ${frameClasses[data.frame]} overflow-hidden shadow-2xl group`}>
              <div className="aspect-[4/5] relative">
                {data.images.length > 0 ? (
                  data.images.map((img, idx) => (
                    <img key={idx} src={img} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`} alt="Memória" />
                  ))
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center"><Heart size={64} className="text-gray-200" /></div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Contador Cronológico */}
        {counter && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 relative z-10">
            {Object.entries(counter).map(([k, v]) => (
              <div key={k} className={`${isInfinityTheme ? 'bg-white/5 border-white/10' : 'bg-white/40 border-white/40'} backdrop-blur-md p-6 md:p-8 rounded-[2rem] text-center border shadow-xl`}>
                <span className={`block text-4xl md:text-5xl font-black ${activeTheme.text} tracking-tighter tabular-nums`}>{v as any}</span>
                <span className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] mt-2 block">{(t as any)[k] || k}</span>
              </div>
            ))}
          </div>
        )}

        {/* Vídeos das Memórias (Funcional) */}
        {isInfinity && (data.videos || []).length > 0 && (
          <section className="mb-20 space-y-12 relative z-10">
            <div className="text-center">
              <h3 className={`text-4xl ${selectedFontClass} ${activeTheme.text} mb-4`}>{t.videosLabel}</h3>
              <div className={`w-20 h-1.5 ${activeTheme.accent} mx-auto rounded-full opacity-30`}></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {data.videos.map((url, idx) => {
                const vid = getYoutubeId(url);
                if (!vid) return null;
                return (
                  <div key={idx} className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border-4 border-white/10 group relative">
                    <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${vid}?modestbranding=1&rel=0`}
                      title="Nossas Memórias"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Cápsula do Tempo (Funcional com Bloqueio) */}
        {isInfinity && data.capsuleOpenDate && (
          <section className={`mb-20 p-10 md:p-20 rounded-[4rem] text-center shadow-2xl relative overflow-hidden ${isInfinityTheme ? 'bg-white/5 border border-white/10' : 'bg-gray-900'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#67cbf111] to-[#a47fba11] opacity-50"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              {capsuleUnlocked ? (
                <div className="animate-in zoom-in duration-1000 space-y-8">
                  <div className="w-24 h-24 bg-[#67cbf1] rounded-full flex items-center justify-center text-white mx-auto shadow-[0_0_40px_rgba(103,203,241,0.5)]">
                    <Gift size={48} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-elegant text-white">A Cápsula foi Aberta!</h3>
                    <div className="w-16 h-1 bg-[#67cbf1]/30 mx-auto rounded-full"></div>
                  </div>
                  <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-inner max-w-2xl mx-auto">
                    <p className={`text-2xl md:text-3xl italic text-white leading-relaxed ${selectedFontClass}`}>
                      "{data.capsuleMessage}"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-10">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-[#67cbf1] mx-auto border border-white/10 animate-pulse">
                    <Lock size={44} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl font-elegant text-white">{t.capsuleTitle} Selada</h3>
                    <p className="text-[#67cbf1] text-xs md:text-sm uppercase tracking-[0.4em] font-black">{t.capsuleDate}: {new Date(data.capsuleOpenDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center justify-center gap-6 px-8 py-5 bg-white/5 rounded-full border border-white/10 max-w-xs mx-auto">
                    <Clock className="text-[#67cbf1] animate-spin-slow" size={24} />
                    <span className="text-white font-black text-xs uppercase tracking-widest">O futuro espera...</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Mensagem Principal */}
        {data.message && (
          <div className={`text-center italic ${selectedFontClass} text-2xl md:text-4xl leading-relaxed mb-24 px-10 opacity-90 ${activeTheme.text} relative z-10`}>
            "{data.message}"
          </div>
        )}

        <Timeline milestones={data.milestones} colorClass={activeTheme.text} />
      </div>

      <div className="mt-20 mb-40 text-center relative z-10">
         <button onClick={() => setShowShareModal(true)} className={`${isInfinityTheme ? 'bg-[#67cbf1] text-white shadow-[#67cbf133]' : 'bg-white text-rose-500 shadow-rose-100'} backdrop-blur shadow-2xl px-16 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-5 mx-auto hover:scale-105 transition-all transform active:scale-95`}>
           <Share2 size={24} /> {t.shareBtn}
         </button>
      </div>

      {isPremium && musicVideoId && (
        <button onClick={() => setIsMusicPlaying(!isMusicPlaying)} className="fixed bottom-10 right-10 z-[100] bg-white/95 backdrop-blur shadow-2xl p-6 rounded-full flex items-center gap-5 border border-white/50 hover:scale-110 transition-all group">
           <div className={`w-14 h-14 ${isMusicPlaying ? (isInfinityTheme ? 'bg-[#67cbf1]' : 'bg-rose-500') + ' animate-spin-slow shadow-lg' : 'bg-gray-200'} rounded-full flex items-center justify-center text-white transition-all`}>
             <Music size={24} fill={isMusicPlaying ? "white" : "none"} />
           </div>
           {isMusicPlaying && <span className={`text-[11px] font-black uppercase tracking-widest pr-2 animate-pulse ${isInfinityTheme ? 'text-[#67cbf1]' : 'text-rose-500'}`}>Em Sintonia</span>}
        </button>
      )}

      {showShareModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500">
           <div className="bg-white rounded-[4rem] p-12 max-w-md w-full shadow-[0_0_100px_rgba(0,0,0,0.5)] relative animate-in zoom-in duration-500 text-center border-t-8 border-rose-500">
              <button onClick={() => setShowShareModal(false)} className="absolute top-8 right-8 text-gray-400 hover:text-rose-500 p-2"><X size={32} /></button>
              <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-8 transform rotate-3"><QrCode size={40} /></div>
              <h4 className="font-elegant font-bold text-gray-900 mb-4 text-3xl">Nosso Legado</h4>
              <p className="text-sm text-gray-500 mb-10 leading-relaxed">Compartilhe este link ou QR Code com quem você ama para revelar esta surpresa digital.</p>
              <div className="bg-gray-50 p-8 rounded-[3rem] border-2 border-dashed border-rose-100 mb-10 flex justify-center"><img src={qrUrl} alt="QR Code" className="w-48 h-48 mix-blend-multiply" /></div>
              <div className="flex flex-col gap-4">
                 <button onClick={() => { navigator.clipboard.writeText(pageUrl); alert('Link copiado!'); }} className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all">Copiar Link Direto</button>
                 <a href={qrUrl} download="kizuna-qrcode.png" className="w-full bg-rose-500 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-rose-600 transition-all"><Download size={20} /> Baixar QR Code</a>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Preview;
