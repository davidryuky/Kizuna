
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoupleData, PlanType, PageEffect, Language, PageTheme, PhotoFrame, Milestone, CoupleFont } from '../types';
import { Camera, Calendar, Sparkles, User, ArrowRight, ArrowLeft, Youtube, Palette, Frame, Plus, Trash2, Link as LinkIcon, Zap, Type, Music } from 'lucide-react';
import { THEMES, FRAMES, EFFECTS, FONTS } from '../constants';

interface EditorProps {
  data: CoupleData;
  plan: PlanType;
  onUpdate: (data: Partial<CoupleData>) => void;
  lang: Language;
  t: any;
}

const Editor: React.FC<EditorProps> = ({ data, plan, onUpdate, lang, t }) => {
  const navigate = useNavigate();
  const isPremium = plan === PlanType.PREMIUM;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const limit = isPremium ? 4 : 1;
    const selectedFiles = Array.from(files).slice(0, limit) as File[];
    const promises = selectedFiles.map(file => new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    }));
    Promise.all(promises).then(images => onUpdate({ images }));
  };

  const addMilestone = () => {
    const newMilestone: Milestone = { id: crypto.randomUUID(), date: '', title: '' };
    onUpdate({ milestones: [...data.milestones, newMilestone] });
  };

  const updateMilestone = (id: string, updates: Partial<Milestone>) => {
    onUpdate({ milestones: data.milestones.map(m => m.id === id ? { ...m, ...updates } : m) });
  };

  const removeMilestone = (id: string) => {
    onUpdate({ milestones: data.milestones.filter(m => m.id !== id) });
  };

  const inputClasses = "w-full px-6 py-4 rounded-2xl border-2 border-[#f0eef2] bg-[#f8f7f9]/50 focus:bg-white focus:border-[#a47fba] focus:ring-4 focus:ring-[#a47fba11] outline-none transition-all font-medium text-[#30302e] shadow-sm placeholder:text-gray-300";

  return (
    <div className={`max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-500`}>
      <button 
        onClick={() => navigate('/')} 
        className="mb-8 flex items-center gap-3 text-[#a47fba] font-black text-xs uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
      >
        <ArrowLeft size={18} /> {lang === 'pt' ? 'Mudar Plano' : 'プラン変更'}
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-[#f0eef2] space-y-12">
        <header className="border-b border-gray-50 pb-8 flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-4xl font-elegant font-bold text-[#30302e]">{lang === 'pt' ? 'Sua História de Amor' : 'カスタマイズ'}</h2>
            <p className="text-gray-400 mt-2 text-lg font-light">{lang === 'pt' ? 'Personalize cada detalhe do seu santuário digital.' : '細部までこだわって作りましょう。'}</p>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#f4f0f7] text-[#a47fba] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#e8e1f0] shadow-sm">
            <Sparkles size={14} /> {isPremium ? t.premiumPlan : t.basicPlan}
          </div>
        </header>

        {/* Nomes */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><User size={14} className="text-[#a47fba]" /> {lang === 'pt' ? 'Seu Nome' : 'お名前1'}</label>
            <input type="text" value={data.partner1} onChange={e => onUpdate({ partner1: e.target.value })} className={inputClasses} placeholder="Ex: Lucas" />
          </div>
          <div className="space-y-3">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><User size={14} className="text-[#a47fba]" /> {lang === 'pt' ? 'Nome do Amor' : 'お名前2'}</label>
            <input type="text" value={data.partner2} onChange={e => onUpdate({ partner2: e.target.value })} className={inputClasses} placeholder="Ex: Júlia" />
          </div>
        </div>

        {/* Link e Fonte */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><LinkIcon size={14} className="text-[#a47fba]" /> {t.customUrl}</label>
            <div className="flex items-center gap-2 bg-[#f8f7f9]/50 px-6 py-4 rounded-2xl border-2 border-[#f0eef2] focus-within:border-[#a47fba] transition-all shadow-sm">
               <span className="text-gray-400 text-sm font-bold">kizuna.love/</span>
               <input type="text" value={data.slug} onChange={e => onUpdate({ slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} placeholder={t.slugPlaceholder} className="bg-transparent outline-none flex-grow font-bold text-[#a47fba]" />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Type size={14} className="text-[#a47fba]" /> {t.fonts}</label>
            <select value={data.fontFamily} onChange={e => onUpdate({ fontFamily: e.target.value as CoupleFont })} className={inputClasses}>
              {FONTS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>
        </div>

        {/* Efeitos e Temas */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
           <div className="space-y-3">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Zap size={14} className="text-[#a47fba]" /> {t.effects}</label>
            <select 
              value={data.effect} 
              onChange={e => {
                const selected = EFFECTS(lang).find(eff => eff.id === e.target.value);
                if (!isPremium && selected?.premium) return;
                onUpdate({ effect: e.target.value as PageEffect });
              }} 
              className={inputClasses}
            >
              {EFFECTS(lang).map(eff => (
                <option key={eff.id} value={eff.id} disabled={!isPremium && eff.premium}>
                  {eff.name} {!isPremium && eff.premium ? `(🔒 ${t.premiumOnly})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Palette size={14} className="text-[#a47fba]" /> {t.themes}</label>
            <select value={data.theme} disabled={!isPremium} onChange={e => onUpdate({ theme: e.target.value as PageTheme })} className={`${inputClasses} ${!isPremium ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {THEMES.map(th => <option key={th.id} value={th.id}>{th.name}</option>)}
            </select>
          </div>
        </div>

        {/* Música (Premium) */}
        <div className="space-y-3">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
            <Music size={14} className="text-[#a47fba]" /> Música de Fundo (YouTube URL) {!isPremium && <span className="text-[#a47fba] ml-2">🔒 {t.premiumOnly}</span>}
          </label>
          <input 
            type="text" 
            disabled={!isPremium}
            value={data.musicUrl} 
            onChange={e => onUpdate({ musicUrl: e.target.value })} 
            className={`${inputClasses} ${!isPremium ? 'opacity-50 cursor-not-allowed' : ''}`} 
            placeholder="Ex: https://www.youtube.com/watch?v=..." 
          />
        </div>

        {/* Data e Fotos */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Calendar size={14} className="text-[#a47fba]" /> {lang === 'pt' ? 'O início de tudo' : '記念日'}</label>
            <input type="date" value={data.startDate} onChange={e => onUpdate({ startDate: e.target.value })} className={inputClasses} />
          </div>
          <div className="space-y-3">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Camera size={14} className="text-[#a47fba]" /> {lang === 'pt' ? 'Fotos das memórias' : '写真'} ({data.images.length}/{isPremium ? 4 : 1})</label>
            <div className="relative group">
              <input type="file" multiple={isPremium} accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="w-full px-6 py-4 rounded-2xl border-2 border-dashed border-[#f0eef2] bg-[#f8f7f9]/50 group-hover:bg-white group-hover:border-[#a47fba] transition-all flex items-center gap-3">
                <Camera size={18} className="text-gray-300 group-hover:text-[#a47fba]" />
                <span className="text-sm font-medium text-gray-400">{lang === 'pt' ? 'Clique para enviar fotos' : '画像を選択'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha do Tempo (Premium) */}
        <div className="space-y-6">
           <div className="flex justify-between items-center">
             <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Calendar size={14} className="text-[#a47fba]" /> {t.milestones} {!isPremium && <span className="text-[#a47fba] ml-2">🔒 {t.premiumOnly}</span>}</label>
             {isPremium && (
               <button onClick={addMilestone} className="text-[#a47fba] hover:text-[#8e6aa3] flex items-center gap-1 text-xs font-black uppercase tracking-widest">
                 <Plus size={16} /> {t.addMilestone}
               </button>
             )}
           </div>
           
           {isPremium && data.milestones.map((m) => (
             <div key={m.id} className="flex flex-col md:flex-row gap-4 p-6 bg-[#f8f7f9] rounded-2xl border border-[#f0eef2] animate-in slide-in-from-top-4 duration-300">
                <input type="date" value={m.date} onChange={e => updateMilestone(m.id, { date: e.target.value })} className={`${inputClasses} md:w-48`} />
                <input type="text" value={m.title} onChange={e => updateMilestone(m.id, { title: e.target.value })} className={inputClasses} placeholder={t.milestoneTitle} />
                <button onClick={() => removeMilestone(m.id)} className="text-gray-300 hover:text-[#a47fba] p-2"><Trash2 size={20} /></button>
             </div>
           ))}
        </div>

        {/* Mensagem */}
        <div className="space-y-3">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Mensagem de Amor</label>
          <textarea 
            rows={4}
            value={data.message} 
            onChange={e => onUpdate({ message: e.target.value })} 
            className={`${inputClasses} resize-none`} 
            placeholder="Escreva algo que venha do coração..."
          />
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-6 pt-10">
          <button 
            onClick={() => navigate('/preview')} 
            className="flex-1 border-2 border-[#a47fba] text-[#a47fba] py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#f4f0f7] transition-all shadow-md"
          >
            {t.preview}
          </button>
          <button 
            onClick={() => navigate('/checkout')} 
            className="flex-1 bg-[#a47fba] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-[#a47fba22] flex items-center justify-center gap-3 hover:bg-[#8e6aa3] transition-all transform hover:-translate-y-1"
          >
            {t.finalize} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;