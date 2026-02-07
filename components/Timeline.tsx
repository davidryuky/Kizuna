
import React from 'react';
import { Milestone } from '../types';
import { Heart } from 'lucide-react';

export const Timeline: React.FC<{ milestones: Milestone[], colorClass?: string }> = ({ milestones, colorClass = "text-rose-500" }) => {
  if (milestones.length === 0) return null;

  return (
    <div className="mt-20 w-full max-w-lg mx-auto">
      <div className="relative border-l-2 border-rose-100 ml-4 space-y-12 pb-4">
        {milestones.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((m) => (
          <div key={m.id} className="relative pl-10">
            <div className={`absolute -left-[11px] top-1 w-5 h-5 bg-white rounded-full border-2 border-rose-300 flex items-center justify-center shadow-sm`}>
              <Heart size={10} className={colorClass} fill="currentColor" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-300 mb-1">
              {new Date(m.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <h4 className={`text-xl font-bold ${colorClass.includes('rose') ? 'text-gray-800' : colorClass}`}>{m.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
