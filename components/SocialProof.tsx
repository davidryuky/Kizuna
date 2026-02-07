
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const COUPLENAMES = [
  "Ana & Carlos", "Beatriz & Gabriel", "Yumi & Kenji", "Maria & João",
  "Julia & Pedro", "Lucas & Mariana", "Sophia & Theo", "Elena & Damón"
];

const LOCATIONS = [
  "São Paulo", "Tokyo", "Lisboa", "Rio de Janeiro", "Kyoto", "New York", "Paris"
];

export const SocialProof: React.FC<{ t: any }> = ({ t }) => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showInterval = setInterval(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
      setCurrent(prev => (prev + 1) % COUPLENAMES.length);
    }, 15000);

    return () => clearInterval(showInterval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-8 z-[60] animate-in slide-in-from-left-10 fade-in duration-700">
      <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-rose-100 flex items-center gap-4 max-w-xs">
        <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white flex-shrink-0 animate-pulse">
          <Heart size={20} fill="currentColor" />
        </div>
        <div>
          <p className="text-xs font-bold text-gray-900 leading-tight">
            {COUPLENAMES[current]} {t.socialProofSuffix}
          </p>
          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-black">
            📍 {LOCATIONS[current % LOCATIONS.length]}
          </p>
        </div>
      </div>
    </div>
  );
};
