
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoupleData, PageEffect, PageTheme, PhotoFrame, PlanType, CoupleFont } from '../types';
import { Heart, ChevronLeft, ChevronRight, ArrowLeft, Music, CheckCircle, QrCode, Share2, X, Download, Star } from 'lucide-react';
import { Timeline } from './Timeline';
import { THEMES } from '../constants';

const HeartEffect = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(15)].map((_, i) => (
      <div key={i} className="heart text-rose-400 opacity-30" style={{ left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 8 + 6}s`, animationDelay: `${Math.random() * 5}s`, fontSize: `${Math.random() * 20 + 10}px` }}>
        <Heart fill="currentColor" />
      </div>
    ))}
  </div>
);

const StarEffect = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#020617]/20">
    {[...Array(40)].map((_, i) => (
      <div key={i} className="absolute animate-pulse text-yellow-200" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 3 + 1}s`, opacity: Math.random() }}>
        <Star size={Math.random() * 10 + 4} fill="currentColor" />
      </div>
    ))}
  </div>
);

const PetalEffect = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(20)].map((_, i) => (
      <div key={i} className="heart text-rose-200 opacity-40" style={{ left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 10 + 10}s`, animationDelay: `${Math.random() * 10}s` }}>
        <div className="w-4 h-5 bg-rose-200 rounded-full rotate-45" style={{ borderRadius: '100% 0% 100% 0%' }}></div>
      </div>
    ))}
  </div>
);

const FirefliesEffect = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(25)].map((_, i) => (
      <div key={i} className="absolute bg-yellow-400/60 rounded-full blur-[2px] animate-pulse" 
        style={{ 
          left: `${Math.random() * 100}%`, 
          top: `${Math.random() * 100}%`, 
          width: `${Math.random() * 4 + 2}px`, 
          height: `${Math.random() * 4 + 2}px`,
          animationDuration: `${Math.random() * 4 + 2}s`,
          animationDelay: `${Math.random() * 5}s`
        }} 
      />
    ))}
  </div>
);

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
  const [counter, setCounter] = useState<any>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  const videoId = useMemo(() => data.musicUrl ? getYoutubeId(data.musicUrl) : null, [data.musicUrl]);
  const activeTheme = useMemo(() => THEMES.find(th => th.id === data.theme) || THEMES[0], [data.theme]);
  const isPremium = data.plan === PlanType.PREMIUM;

  // SEO DINÂMICO
  useEffect(() => {
    const title = `${data.partner1 || 'Você'} & ${data.partner2 || 'Eu'} | KIZUNA`;
    document.title = title;
    
    // Update Meta Tags (simulated for client-side)
    const updateMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', `Veja a história de amor de ${data.partner1} e ${data.partner2} no KIZUNA.`);
    updateMeta('og:title', title);
    updateMeta('og:description', data.message || 'Um laço eterno celebrado no KIZUNA.');
    if (data.images.length > 0) updateMeta('og:image', data.images[0]);
  }, [data.partner1, data.partner2, data.message, data.images]);

  useEffect(() => {
    if (isPremium && data.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % data.images.length);
      }, 3000);
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
    [PhotoFrame.NONE]: "rounded-2xl",
    [PhotoFrame.POLAROID]: "p-3 pb-16 bg-white shadow-xl rounded-sm rotate-1",
    [PhotoFrame.GOLD]: "p-4 bg-gradient-to-br from-amber-600 via-amber-200 to-amber-700 shadow-2xl rounded-sm",
    [PhotoFrame.ORGANIC]: "rounded-3xl border-4 border-white/50 shadow-inner"
  };

  const pageUrl = `https://kizuna.love/${data.slug || 'nosso-amor'}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(pageUrl)}&color=e11d48&bgcolor=ffffff`;

  const handleShareClick = async () => {
    setIsSharing(true);
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const file = new File([blob], 'kizuna-qrcode.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `KIZUNA - ${data.partner1} & ${data.partner2}`,
          text: t.nativeShareMsg,
          url: pageUrl,
          files: [file]
        });
      } else if (navigator.share) {
        await navigator.share({
          title: `KIZUNA - ${data.partner1} & ${data.partner2}`,
          text: t.nativeShareMsg,
          url: pageUrl
        });
      } else {
        setShowShareModal(true);
      }
    } catch (err) {
      console.error('Erro ao compartilhar:', err);
      setShowShareModal(true);
    } finally {
      setIsSharing(false);
    }
  };

  const selectedFontClass = data.fontFamily || 'font-inter';

  return (
    <div className={`relative min-h-screen flex flex-col items-center p-6 overflow-x-hidden ${activeTheme.colors} transition-colors duration-1000`}>
      {data.effect === PageEffect.HEARTS && <HeartEffect />}
      {data.effect === PageEffect.SPARKLES && <StarEffect />}
      {data.effect === PageEffect.FLOWER_PETALS && <PetalEffect />}
      {data.effect === PageEffect.FIREFLIES && <FirefliesEffect />}
      
      <div className="fixed top-6 left-0 right-0 z-[100] flex justify-between px-6 pointer-events-none">
        <button onClick={() => navigate('/editar')} className="pointer-events-auto bg-white/95 shadow-lg px-5 py-2 rounded-lg text-gray-900 border border-gray-100 flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-colors"><ArrowLeft size={14} /> {t.backEditor}</button>
        <button onClick={() => navigate('/checkout')} className="pointer-events-auto bg-rose-500 text-white shadow-lg px-6 py-2 rounded-lg flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-colors">{t.finishPage} <CheckCircle size={14} /></button>
      </div>

      {videoId && isMusicPlaying && (
        <div className="fixed -top-[2000px]"><iframe width="100" height="100" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&enablejsapi=1`} allow="autoplay" title="Music"></iframe></div>
      )}

      <div className={`max-w-2xl w-full ${activeTheme.card} backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 relative z-10 animate-in fade-in duration-1000 mt-28 border border-white/20`}>
        <header className="text-center mb-16">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-4">
            <h2 className={`text-5xl md:text-7xl ${selectedFontClass} animate-in slide-in-from-bottom-4 duration-1000 ${activeTheme.text}`}>{data.partner1 || 'Você'}</h2>
            <div className="relative">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
            </div>
            <h2 className={`text-5xl md:text-7xl ${selectedFontClass} animate-in slide-in-from-bottom-4 duration-1000 delay-150 ${activeTheme.text}`}>{data.partner2 || 'Eu'}</h2>
          </div>
          <p className="text-gray-400 font-elegant italic tracking-[0.2em] text-[10px] uppercase">{t.togetherForever}</p>
        </header>

        <div className={`relative mx-auto max-w-sm ${frameClasses[data.frame]} overflow-hidden mb-12 group transition-all duration-500 shadow-xl bg-gray-50/50`}>
          {data.images.length > 0 ? (
            <div className="aspect-square relative overflow-hidden">
               {data.images.map((img, idx) => (
                 <img 
                    key={idx} 
                    src={img} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} 
                    alt="Memória de Amor" 
                  />
               ))}
            </div>
          ) : (
            <div className="aspect-square flex items-center justify-center text-rose-100 bg-gray-100"><Heart size={64} fill="currentColor" className="opacity-10" /></div>
          )}
          
          {data.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {data.images.map((_, idx) => (
                <div key={idx} className={`h-1 rounded-full transition-all duration-500 ${currentSlide === idx ? 'w-6 bg-white shadow-sm' : 'w-2 bg-white/40'}`} />
              ))}
            </div>
          )}

          {data.images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <button onClick={() => setCurrentSlide(p => p === 0 ? data.images.length - 1 : p - 1)} className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"><ChevronLeft size={20} className="text-rose-500" /></button>
              <button onClick={() => setCurrentSlide(p => p === data.images.length - 1 ? 0 : p + 1)} className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"><ChevronRight size={20} className="text-rose-500" /></button>
            </div>
          )}
        </div>

        {counter && (
          <div className="grid grid-cols-4 gap-3 mb-12">
            {Object.entries(counter).map(([k, v]) => (
              <div key={k} className="bg-white/40 p-4 rounded-xl text-center border border-white/30 shadow-sm transition-transform hover:-translate-y-1">
                <span className={`block text-2xl font-black ${activeTheme.text}`}>{v}</span>
                <span className="text-[8px] uppercase font-black text-gray-400 tracking-widest">{t[k] || k}</span>
              </div>
            ))}
          </div>
        )}

        <div className={`text-center italic ${selectedFontClass} text-lg leading-relaxed mb-12 px-6 opacity-80 ${activeTheme.text.includes('slate') ? 'text-slate-300' : 'text-gray-600'}`}>
          "{data.message || "Sua mensagem especial aqui..."}"
        </div>

        <Timeline milestones={data.milestones} colorClass={activeTheme.text} />
      </div>

      <div className="max-w-sm w-full mt-12 mb-32 text-center relative z-10">
         <button 
           onClick={handleShareClick}
           disabled={isSharing}
           className="bg-white shadow-xl px-10 py-4 rounded-xl border-2 border-rose-100 text-rose-500 font-bold flex items-center justify-center gap-3 mx-auto hover:bg-rose-50 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
         >
           {isSharing ? (
             <div className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
           ) : (
             <>
               <Share2 size={20} />
               {t.shareBtn}
             </>
           )}
         </button>

         {showShareModal && (
           <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-rose-900/40 backdrop-blur-sm animate-in fade-in duration-300">
             <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative animate-in zoom-in duration-300">
                <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-rose-500 transition-colors p-2"><X size={20} /></button>
                
                <div className="text-center mb-8">
                  <h4 className="font-bold text-gray-900 mb-2 text-xl flex items-center justify-center gap-2">
                    <QrCode size={20} className="text-rose-500" /> {t.giftCardTitle}
                  </h4>
                  <p className="text-xs text-gray-500 px-2 leading-relaxed">{t.giftCardDesc}</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-2xl border-2 border-rose-50 inline-block mb-8 shadow-inner transform transition-transform hover:scale-105">
                   <img src={qrUrl} alt="QR Code" className="w-32 h-32 mix-blend-multiply" />
                </div>

                <div className="space-y-4">
                  <div className="bg-rose-50 py-3 px-4 rounded-xl border border-rose-100 overflow-hidden">
                     <p className="text-rose-600 font-bold text-[11px] select-all cursor-pointer tracking-widest truncate">{pageUrl}</p>
                  </div>
                  <a href={qrUrl} download="kizuna-qrcode.png" className="w-full bg-rose-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-rose-600 transition-colors">
                    <Download size={18} /> Baixar QR Code
                  </a>
                  <button onClick={() => setShowShareModal(false)} className="w-full text-xs font-black uppercase text-gray-400 tracking-widest hover:text-rose-500 transition-colors">Fechar</button>
                </div>
             </div>
           </div>
         )}
      </div>

      {videoId && (
        <button onClick={() => setIsMusicPlaying(!isMusicPlaying)} className="fixed bottom-10 right-10 z-[100] bg-white shadow-xl p-4 rounded-full flex items-center gap-3 border border-rose-50 hover:scale-105 transition-all">
           <div className={`w-10 h-10 ${isMusicPlaying ? 'bg-rose-500 animate-spin-slow shadow-lg shadow-rose-200' : 'bg-gray-200'} rounded-full flex items-center justify-center text-white transition-colors duration-500`}>
             <Music size={18} fill={isMusicPlaying ? "white" : "none"} />
           </div>
           {isMusicPlaying && <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest pr-2">Tocando</span>}
        </button>
      )}
    </div>
  );
};

export default Preview;
