
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoupleData, PlanType, PageEffect, Language, PageTheme, PhotoFrame, Milestone, CoupleFont } from '../types';
import { Camera, Calendar, Sparkles, User, ArrowRight, ArrowLeft, Youtube, Palette, Frame, Plus, Trash2, Link as LinkIcon, Zap, Type, Crown } from 'lucide-react';
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

  const inputClasses = "w-full px-6 py-4 rounded-xl border-2 border-gray-400 bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none transition-all font-medium text-gray-800 shadow-sm placeholder:text-gray-400";

  return (
    <div className={`max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-500`}>
      <button onClick={() => navigate('/')} className="mb-8 flex items-center gap-3 bg-white text-rose-500 border-2 border-rose-500 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-rose-50 transition-all shadow-md group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1" /> {lang === 'pt' ? 'Mudar Plano' : 'プラン変更'}
      </button>

      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 space-y-10">
        <header className="border-b border-gray-100 pb-8 flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-3xl font-elegant font-bold text-gray-900">{lang === 'pt' ? 'Personalize seu Amor' : 'カスタマイズ'}</h2>
            <p className="text-gray-500 mt-1 text-sm">{lang === 'pt' ? 'Cada detalhe importa na sua história eterna.' : '細部までこだわって作りましょう。'}</p>
          </div>
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-100">
            <Sparkles size={12} /> {isPremium ? t.premiumPlan : t.basicPlan}
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] flex items-center gap-2 px-1"><User size={12} /> {lang === 'pt' ? 'Seu Nome' : 'お名前1'}</label>
            <input type="text" value={data.partner1} onChange={e => onUpdate({ partner1: e.target.value })} className={inputClasses} placeholder="Ex: Lucas" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] flex items-center gap-2 px-1"><User size={12} /> {lang === 'pt' ? 'Nome do Par' : 'お名前2'}</label>
            <input type="text" value={data.partner2} onChange={e => onUpdate({ partner2: e.target.value })} className={inputClasses} placeholder="Ex: Júlia" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] flex items-center gap-2 px-1"><LinkIcon size={12} /> {t.customUrl}</label>
            <div className="flex items-center gap-2 bg-gray-50 px-6 py-4 rounded-xl border-2 border-gray-400 focus-within:border-rose-500 focus-within:ring-4 focus-within:ring-rose-100 transition-all shadow-sm">
               <span className="text-gray-500 text-sm font-bold">kizuna.love/</span>
               <input type="text" value={data.slug} onChange={e => onUpdate({ slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} placeholder={t.slugPlaceholder} className="bg-transparent outline-none flex-grow font-bold text-rose-600" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] flex items-center gap-2 px-1"><Type size={12} /> {t.fonts}</label>
            <select value={data.fontFamily} onChange={e => onUpdate({ fontFamily: e.target.value as CoupleFont })} className={inputClasses}>
              {FONTS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
           <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] flex items-center gap-2 px-1"><Zap size={12} /> {t.effects}</label>
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
            {!isPremium && <p className="text-[9px] text-rose-400 font-bold px-1 flex items-center gap-1"><Crown size={10} /> Algumas opções exigem plano Premium</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] flex items-center gap-2 px-1"><Palette size={12} /> {t.themes}</label>
            <select value={data.theme} disabled={!isPremium} onChange={e => onUpdate({ theme: e.target.value as PageTheme })} className={`${inputClasses} ${!isPremium ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}>
              {THEMES.map(th => <option key={th.id} value={th.id}>{th.name}</option>)}
            </select>
            {!isPremium && <p className="text-[9px] text-gray-400 font-bold px-1">Tema Padrão no Plano Básico</p>}
          </div>
        </div>

        {isPremium && (
          <div className="grid md:grid-cols-1 gap-6 p-6 bg-rose-50/20 rounded-2xl border border-rose-100">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] flex items-center gap-2 px-1"><Frame size={12} /> {t.frames}</label>
              <select value={data.frame} onChange={e => onUpdate({ frame: e.target.value as PhotoFrame })} className={inputClasses}>
                {FRAMES.map(fr => <option key={fr.id} value={fr.id}>{fr.name}</option>)}
              </select>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] flex items-center gap-2 px-1"><Calendar size={12} /> {lang === 'pt' ? 'Quando tudo começou?' : '記念日'}</label>
            <input type="date" value={data.startDate} onChange={e => onUpdate({ startDate: e.target.value })} className={inputClasses} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] flex items-center gap-2 px-1"><Camera size={12} /> {lang === 'pt' ? 'Memórias (Fotos)' : '写真'} ({data.images.length}/{isPremium ? 4 : 1})</label>
            <div className="relative group">
              <input type="file" multiple={isPremium} accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="w-full px-6 py-4 rounded-xl border-2 border-dashed border-gray-400 bg-gray-50 group-hover:bg-white group-hover:border-rose-500 transition-all flex items-center gap-3">
                <Camera size={18} className="text-gray-400 group-hover:text-rose-500" />
                <span className="text-sm font-medium text-gray-500">{lang === 'pt' ? 'Selecionar Imagens' : '画像を選択'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] flex items-center gap-2 px-1"><Youtube size={12} /> {lang === 'pt' ? 'Trilha Sonora (Link YouTube)' : 'BGM (YouTube)'}</label>
          <input 
            type="text" 
            value={data.musicUrl} 
            onChange={e => onUpdate({ musicUrl: e.target.value })} 
            className={`${inputClasses} ${!isPremium ? 'bg-gray-100 cursor-not-allowed border-gray-300 opacity-60' : ''}`} 
            disabled={!isPremium}
            placeholder={isPremium ? "https://www.youtube.com/watch?v=..." : "Disponível no Plano Premium"} 
          />
        </div>

        <div className="space-y-4">
          <div className="px-1">
             <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em]">Mensagem de Amor</label>
          </div>
          <textarea 
            rows={4}
            value={data.message} 
            onChange={e => onUpdate({ message: e.target.value })} 
            className={`${inputClasses} resize-none`} 
            placeholder="Escreva algo que venha do coração..."
          />
        </div>

        {isPremium && (
          <div className="space-y-6 pt-4">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] flex items-center gap-2"><Sparkles size={12} /> {t.milestones}</label>
              <button onClick={addMilestone} className="text-rose-500 font-bold text-xs flex items-center gap-1 hover:underline">
                <Plus size={14} /> {t.addMilestone}
              </button>
            </div>
            <div className="space-y-4">
              {data.milestones.map((m) => (
                <div key={m.id} className="flex flex-col md:flex-row gap-4 bg-gray-50 p-5 rounded-xl border-2 border-gray-300">
                  <input type="date" value={m.date} onChange={e => updateMilestone(m.id, { date: e.target.value })} className="px-4 py-2 rounded-lg border-2 border-gray-400 outline-none focus:border-rose-500 bg-white" />
                  <input type="text" value={m.title} onChange={e => updateMilestone(m.id, { title: e.target.value })} placeholder={t.milestoneTitle} className="flex-grow px-4 py-2 rounded-lg border-2 border-gray-400 outline-none focus:border-rose-500 bg-white" />
                  <button onClick={() => removeMilestone(m.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button onClick={() => navigate('/preview')} className="flex-1 border-2 border-rose-500 text-rose-500 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-rose-50 transition-all">{t.preview}</button>
          <button onClick={() => navigate('/checkout')} className="flex-1 bg-rose-500 text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-rose-200 flex items-center justify-center gap-2 hover:bg-rose-600 transition-all">{t.finalize} <ArrowRight size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
