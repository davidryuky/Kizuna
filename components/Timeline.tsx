
import React from 'react';
import { Milestone } from '../types';
import { Heart } from 'lucide-react';

export const Timeline: React.FC<{ milestones: Milestone[], colorClass?: string }> = ({ milestones, colorClass = "text-rose-500" }) => {
  if (milestones.length === 0) return null;

  return (
    <div className="mt-20 w-full max-w-xl mx-auto px-4">
      <div className={`relative border-l-2 border-current ml-4 space-y-12 pb-4 opacity-70 ${colorClass}`}>
        {milestones.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((m) => (
          <div key={m.id} className="relative pl-10">
            <div className={`absolute -left-[11px] top-1 w-5 h-5 bg-white rounded-full border-2 border-current flex items-center justify-center shadow-sm`}>
              <Heart size={10} className="fill-current" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-60">
              {new Date(m.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <h4 className="text-xl md:text-2xl font-bold leading-tight">{m.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
