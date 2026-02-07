
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface FAQProps {
  lang: Language;
  t: any;
}

const FAQ: React.FC<FAQProps> = ({ lang, t }) => {
  const faqs = [
    { q: t.faqQ1, a: t.faqA1 },
    { q: t.faqQ2, a: t.faqA2 },
    { q: t.faqQ3, a: t.faqA3 },
    { q: t.faqQ4, a: t.faqA4 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <div className="inline-flex p-3 bg-rose-50 text-rose-500 rounded-2xl mb-4">
          <HelpCircle size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-elegant font-bold text-gray-900">{t.faq}</h1>
      </div>
      
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-rose-50 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.q}</h3>
            <p className="text-gray-500 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
