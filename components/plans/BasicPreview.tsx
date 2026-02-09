
import React from 'react';
import { CoupleData } from '../../types';
import { Heart } from 'lucide-react';

interface PlanProps {
  data: CoupleData;
  t: any;
  counter: any;
  activeTheme: any;
}

const BasicPreview: React.FC<PlanProps> = ({ data, t, counter, activeTheme }) => {
  return (
    <div className={`max-w-2xl w-full ${activeTheme.card} rounded-[3rem] shadow-xl p-8 md:p-12 relative z-10 border border-white/10`}>
      <header className="text-center mb-12">
        <Heart className="w-10 h-10 text-rose-500 mx-auto mb-4 animate-pulse fill-current" />
        <h2 className={`text-4xl md:text-6xl font-elegant ${activeTheme.text} mb-2`}>
          {data.partner1 || 'P1'} & {data.partner2 || 'P2'}
        </h2>
        <p className="text-gray-400 text-xs uppercase tracking-widest">{t.togetherForever}</p>
      </header>

      <div className="aspect-square rounded-2xl overflow-hidden shadow-lg mb-12 border-4 border-white">
        {data.images[0] ? (
          <img src={data.images[0]} className="w-full h-full object-cover" alt="Nossa Foto" />
        ) : (
          <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-200">
            <Heart size={48} />
          </div>
        )}
      </div>

      {counter && (
        <div className="grid grid-cols-4 gap-2 text-center">
          {Object.entries(counter).map(([k, v]) => (
            <div key={k} className="bg-white/50 p-3 rounded-xl border border-white">
              <span className={`block text-xl font-black ${activeTheme.text}`}>{v as any}</span>
              <span className="text-[8px] uppercase font-bold text-gray-400">{(t as any)[k]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BasicPreview;
