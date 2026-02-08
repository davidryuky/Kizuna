
import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Language } from '../types';

interface FAQProps {
  lang: Language;
  t: any;
}

const FAQItem: React.FC<{ q: string; a: string; isOpen: boolean; onClick: () => void }> = ({ q, a, isOpen, onClick }) => {
  return (
    <div className="border-b border-[#f4f0f7] last:border-none">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left group transition-all"
        aria-expanded={isOpen}
      >
        <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-[#a47fba]' : 'text-[#30302e] group-hover:text-[#a47fba]'}`}>
          {q}
        </span>
        <ChevronDown 
          size={20} 
          className={`text-[#e8e1f0] transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#a47fba]' : ''}`} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-400 leading-relaxed text-base md:text-lg font-light">
          {a}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC<FAQProps> = ({ lang, t }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in duration-700">
      <div className="text-center mb-20">
        <div className="inline-flex p-4 bg-[#f4f0f7] text-[#a47fba] rounded-3xl mb-6 shadow-sm">
          <HelpCircle size={32} />
        </div>
        <h1 className="text-5xl md:text-6xl font-elegant font-bold text-[#30302e] mb-4">{t.faq}</h1>
        <div className="w-24 h-1 bg-[#a47fba] mx-auto rounded-full opacity-20"></div>
      </div>
      
      <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-[#f0eef2] shadow-xl shadow-[#f4f0f7]/50">
        <div className="space-y-2">
          {t.faqItems.map((item: any, i: number) => (
            <FAQItem 
              key={i} 
              q={item.q} 
              a={item.a} 
              isOpen={openIndex === i} 
              onClick={() => setOpenIndex(openIndex === i ? null : i)} 
            />
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
        <p className="text-gray-300 text-sm font-medium italic">
          {lang === 'pt' 
            ? "Ainda tem dúvidas? Estamos aqui para ajudar através de nossos canais oficiais." 
            : "ご不明な点がございましたら、公式チャンネルからお気軽にお問い合わせください。"}
        </p>
      </div>
    </div>
  );
};

export default FAQ;