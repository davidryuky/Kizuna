
import React, { useState, useEffect } from 'react';
import { CoupleData, PhotoFrame } from '../../types';
import { Heart } from 'lucide-react';
import { Timeline } from '../Timeline';

interface PlanProps {
  data: CoupleData;
  t: any;
  counter: any;
  activeTheme: any;
  selectedFont: string;
}

const PremiumPreview: React.FC<PlanProps> = ({ data, t, counter, activeTheme, selectedFont }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (data.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % data.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [data.images.length]);

  const frameClasses = {
    [PhotoFrame.NONE]: "rounded-[2.5rem]",
    [PhotoFrame.POLAROID]: "p-4 pb-16 bg-white shadow-2xl rounded-sm rotate-1 border border-gray-100",
    [PhotoFrame.GOLD]: "p-5 bg-gradient-to-br from-[#d4af37] via-[#f9f295] to-[#b8860b] shadow-2xl rounded-sm border-2 border-[#f9f295]",
    [PhotoFrame.ORGANIC]: "rounded-[4rem] border-[10px] border-white shadow-inner"
  };

  return (
    <div className={`max-w-4xl w-full ${activeTheme.card} rounded-[4rem] shadow-2xl p-8 md:p-16 relative z-10 border border-white/30`}>
      <header className="text-center mb-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
          <h2 className={`text-5xl md:text-8xl ${selectedFont} ${activeTheme.text} drop-shadow-lg`}>{data.partner1 || 'P1'}</h2>
          <Heart className="text-rose-500 animate-pulse fill-current" size={32} />
          <h2 className={`text-5xl md:text-8xl ${selectedFont} ${activeTheme.text} drop-shadow-lg`}>{data.partner2 || 'P2'}</h2>
        </div>
        <p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.4em] opacity-80">{t.togetherForever}</p>
      </header>

      <section className="mb-16">
        <div className={`relative mx-auto max-w-sm ${frameClasses[data.frame]} overflow-hidden`}>
          <div className="aspect-[4/5] relative bg-gray-50">
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
      </section>

      {counter && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {Object.entries(counter).map(([k, v]) => (
            <div key={k} className="bg-white/50 backdrop-blur-md p-6 rounded-3xl text-center border border-white/60 shadow-sm">
              <span className={`block text-3xl font-black ${activeTheme.text} tracking-tighter`}>{v as any}</span>
              <span className="text-[10px] uppercase font-black text-gray-500 tracking-widest mt-1 block">{(t as any)[k]}</span>
            </div>
          ))}
        </div>
      )}

      {data.message && (
        <blockquote className={`text-center italic text-xl md:text-3xl ${selectedFont} mb-16 opacity-90 px-6 ${activeTheme.text}`}>
          "{data.message}"
        </blockquote>
      )}

      <Timeline milestones={data.milestones} colorClass={activeTheme.text} />
    </div>
  );
};

export default PremiumPreview;
