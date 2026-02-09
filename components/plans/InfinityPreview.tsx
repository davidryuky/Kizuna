
import React from 'react';
import { CoupleData, PhotoFrame } from '../../types';
import { Heart, Video, Lock, Clock, Gift, Crown, Star } from 'lucide-react';
import { Timeline } from '../Timeline';

interface PlanProps {
  data: CoupleData;
  t: any;
  counter: any;
  activeTheme: any;
  selectedFont: string;
}

const getYoutubeId = (url: string) => {
  const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[1].length === 11) ? match[1] : null;
};

const InfinityPreview: React.FC<PlanProps> = ({ data, t, counter, activeTheme, selectedFont }) => {
  const capsuleUnlocked = data.capsuleOpenDate ? new Date().getTime() >= new Date(data.capsuleOpenDate).getTime() : false;

  const frameClasses = {
    [PhotoFrame.NONE]: "rounded-[2rem]",
    [PhotoFrame.POLAROID]: "p-3 pb-12 bg-white shadow-2xl rounded-sm rotate-1",
    [PhotoFrame.GOLD]: "p-4 bg-gradient-to-br from-[#d4af37] via-[#f9f295] to-[#b8860b] shadow-2xl rounded-sm",
    [PhotoFrame.ORGANIC]: "rounded-[3rem] border-[8px] border-white shadow-inner"
  };

  return (
    <div className={`max-w-5xl w-full ${activeTheme.card} rounded-[5rem] shadow-[0_0_100px_rgba(103,203,241,0.15)] p-8 md:p-24 relative z-10 border border-[#67cbf1]/20 overflow-hidden`}>
      
      {/* Decoração de Fundo exclusiva Infinity */}
      <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-[#67cbf1]/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute -bottom-[20%] -right-[20%] w-[60%] h-[60%] bg-[#a47fba]/10 rounded-full blur-[120px]"></div>

      <header className="text-center mb-24 relative">
        <div className="inline-flex items-center gap-2 bg-[#67cbf1]/10 px-6 py-2 rounded-full mb-8 border border-[#67cbf1]/20">
          <Crown size={14} className="text-[#67cbf1]" />
          <span className="text-[10px] font-black text-[#67cbf1] uppercase tracking-[0.3em]">Luminous Infinity</span>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-8">
          <h2 className={`text-6xl md:text-9xl ${selectedFont} ${activeTheme.text} drop-shadow-2xl`}>{data.partner1}</h2>
          <div className="relative">
             <Heart className="text-rose-500 animate-pulse fill-current" size={48} />
             <Star className="absolute -top-4 -right-4 text-[#67cbf1] animate-spin-slow" size={20} />
          </div>
          <h2 className={`text-6xl md:text-9xl ${selectedFont} ${activeTheme.text} drop-shadow-2xl`}>{data.partner2}</h2>
        </div>
        <p className="text-[#67cbf1] font-black text-xs uppercase tracking-[0.5em] opacity-80">{t.togetherForever}</p>
      </header>

      {/* Contador em destaque Infinity */}
      {counter && (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 relative">
          {Object.entries(counter).map(([k, v]) => (
            <div key={k} className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] text-center border border-white/10 shadow-2xl transform hover:scale-105 transition-transform">
              <span className="block text-5xl font-black text-white tracking-tighter tabular-nums">{v as any}</span>
              <span className="text-[10px] uppercase font-black text-[#67cbf1] tracking-widest mt-2 block">{(t as any)[k]}</span>
            </div>
          ))}
        </section>
      )}

      {/* Galeria Masonry */}
      <section className="mb-24">
        <div className="columns-2 md:columns-3 gap-6 space-y-6">
          {data.images.map((img, idx) => (
            <div key={idx} className={`${frameClasses[data.frame]} overflow-hidden shadow-2xl transition-all hover:translate-y-[-10px] hover:shadow-[#67cbf133] group cursor-pointer`}>
              <img src={img} className="w-full h-auto object-cover" alt="Memória" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#67cbf1]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Vídeos */}
      {data.videos.length > 0 && (
        <section className="mb-24 space-y-12">
          <div className="text-center">
            <h3 className={`text-4xl ${selectedFont} text-white mb-4`}>{t.videosLabel}</h3>
            <div className="w-20 h-1 bg-[#67cbf1] mx-auto rounded-full shadow-[0_0_10px_#67cbf1]"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {data.videos.map((url, idx) => {
              const vid = getYoutubeId(url);
              if (!vid) return null;
              return (
                <div key={idx} className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border-4 border-white/5 relative group">
                  <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${vid}`} title="Vídeo" allowFullScreen></iframe>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Cápsula do Tempo */}
      {data.capsuleOpenDate && (
        <section className="mb-24 p-12 md:p-24 rounded-[4rem] text-center shadow-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]"></div>
          <div className="relative z-10 flex flex-col items-center">
            {capsuleUnlocked ? (
              <div className="space-y-8 animate-in zoom-in duration-1000">
                <Gift className="w-20 h-20 text-[#67cbf1] mx-auto animate-bounce" />
                <h3 className="text-4xl font-elegant text-white">A Cápsula foi Revelada</h3>
                <p className={`text-2xl md:text-4xl italic text-white/90 leading-relaxed ${selectedFont}`}>"{data.capsuleMessage}"</p>
              </div>
            ) : (
              <div className="space-y-10">
                <Lock className="w-20 h-20 text-[#67cbf1]/30 mx-auto animate-pulse" />
                <h3 className="text-3xl font-elegant text-white">{t.capsuleTitle} Selada</h3>
                <div className="flex items-center gap-4 bg-white/5 px-8 py-4 rounded-full border border-white/10">
                   <Clock className="text-[#67cbf1]" size={20} />
                   <span className="text-white font-black text-xs uppercase tracking-widest">{new Date(data.capsuleOpenDate).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Linha do Tempo */}
      <div className="relative">
         <div className="text-center mb-16">
            <h3 className={`text-4xl ${selectedFont} text-white`}>{t.milestones}</h3>
         </div>
         <Timeline milestones={data.milestones} colorClass="text-[#67cbf1]" />
      </div>
    </div>
  );
};

export default InfinityPreview;
