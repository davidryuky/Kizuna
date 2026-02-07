
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoupleData, PlanType, PageEffect, Language, PageTheme, PhotoFrame, Milestone, CoupleFont } from '../types';
import { Camera, Calendar, Sparkles, User, ArrowRight, ArrowLeft, Youtube, Palette, Frame, Plus, Trash2, Link as LinkIcon, Zap, Type, Music, Eye, Edit3 } from 'lucide-react';
import { THEMES, FRAMES, EFFECTS, FONTS } from '../constants';
import Preview from './Preview';

interface EditorProps {
  data: CoupleData;
  plan: PlanType;
  onUpdate: (data: Partial<CoupleData>) => void;
  lang: Language;
  t: any;
}

const Editor: React.FC<EditorProps> = ({ data, plan, onUpdate, lang, t }) => {
  const navigate = useNavigate();
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
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

  const inputClasses = "w-full px-5 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-50 outline-none transition-all font-medium text-gray-800 shadow-sm placeholder:text-gray-400 text-sm";

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8 md:py-12 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Coluna do Formulário */}
        <div className={`flex-1 w-full space-y-8 ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-3 text-rose-500 font-black text-xs uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft size={16} /> {lang === 'pt' ? 'Mudar Plano' : 'プラン変更'}
          </button>

          <div className="bg-white rounded-[2rem] shadow-xl p-6 md:p-10 border border-gray-50 space-y-10">
            <header className="border-b border-gray-50 pb-6 flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-3xl font-elegant font-bold text-gray-900">{lang === 'pt' ? 'Sua História' : 'カスタマイズ'}</h2>
                <p className="text-gray-400 mt-1 text-sm font-light">{lang === 'pt' ? 'Personalize seu santuário digital.' : '細部までこだわって作りましょう。'}</p>
              </div>
              <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-rose-100">
                <Sparkles size={12} /> {isPremium ? t.premiumPlan : t.basicPlan}
              </div>
            </header>

            {/* Grid de Inputs */}
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><User size={12} /> {lang === 'pt' ? 'Seu Nome' : 'お名前1'}</label>
                  <input type="text" value={data.partner1} onChange={e => onUpdate({ partner1: e.target.value })} className={inputClasses} placeholder="Ex: Lucas" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><User size={12} /> {lang === 'pt' ? 'Nome do Amor' : 'お名前2'}</label>
                  <input type="text" value={data.partner2} onChange={e => onUpdate({ partner2: e.target.value })} className={inputClasses} placeholder="Ex: Júlia" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><LinkIcon size={12} /> {t.customUrl}</label>
                  <div className="flex items-center gap-2 bg-gray-50/50 px-4 py-3 rounded-xl border-2 border-gray-100 focus-within:border-rose-400 transition-all shadow-sm">
                    <span className="text-gray-400 text-xs font-bold">kizuna.love/</span>
                    <input type="text" value={data.slug} onChange={e => onUpdate({ slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} placeholder={t.slugPlaceholder} className="bg-transparent outline-none flex-grow font-bold text-rose-500 text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Type size={12} /> {t.fonts}</label>
                  <select value={data.fontFamily} onChange={e => onUpdate({ fontFamily: e.target.value as CoupleFont })} className={inputClasses}>
                    {FONTS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Zap size={12} /> {t.effects}</label>
                  <select value={data.effect} onChange={e => {
                    const selected = EFFECTS(lang).find(eff => eff.id === e.target.value);
                    if (!isPremium && selected?.premium) return;
                    onUpdate({ effect: e.target.value as PageEffect });
                  }} className={inputClasses}>
                    {EFFECTS(lang).map(eff => (
                      <option key={eff.id} value={eff.id} disabled={!isPremium && eff.premium}>
                        {eff.name} {!isPremium && eff.premium ? `(🔒 ${t.premiumOnly})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Palette size={12} /> {t.themes}</label>
                  <select value={data.theme} disabled={!isPremium} onChange={e => onUpdate({ theme: e.target.value as PageTheme })} className={`${inputClasses} ${!isPremium ? 'opacity-50' : ''}`}>
                    {THEMES.map(th => <option key={th.id} value={th.id}>{th.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                  <Music size={12} /> {lang === 'pt' ? 'Música de Fundo' : 'BGM'} (YouTube URL) {!isPremium && <span className="text-rose-400 ml-1">🔒</span>}
                </label>
                <input type="text" disabled={!isPremium} value={data.musicUrl} onChange={e => onUpdate({ musicUrl: e.target.value })} className={`${inputClasses} ${!isPremium ? 'opacity-50' : ''}`} placeholder="https://www.youtube.com/watch?v=..." />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Calendar size={12} /> {lang === 'pt' ? 'Data Inicial' : '記念日'}</label>
                  <input type="date" value={data.startDate} onChange={e => onUpdate({ startDate: e.target.value })} className={inputClasses} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Camera size={12} /> {lang === 'pt' ? 'Fotos' : '写真'} ({data.images.length}/{isPremium ? 4 : 1})</label>
                  <div className="relative group">
                    <input type="file" multiple={isPremium} accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="w-full px-5 py-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 flex items-center gap-3">
                      <Camera size={16} className="text-gray-400" />
                      <span className="text-xs font-medium text-gray-400">{lang === 'pt' ? 'Enviar fotos' : '選択'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Mensagem</label>
                <textarea rows={3} value={data.message} onChange={e => onUpdate({ message: e.target.value })} className={`${inputClasses} resize-none`} placeholder="..." />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button onClick={() => navigate('/checkout')} className="flex-1 bg-rose-500 text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-rose-100 flex items-center justify-center gap-2 hover:bg-rose-600 transition-all">
                {t.finalize} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Coluna da Prévia (Sticky) */}
        <div className={`lg:sticky lg:top-24 w-full lg:w-[380px] flex flex-col items-center ${mobileView === 'edit' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="text-center mb-6 hidden lg:block">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">{lang === 'pt' ? 'Prévia em Tempo Real' : 'リアルタイムプレビュー'}</h3>
          </div>
          
          <div className="phone-mockup">
            <div className="phone-speaker"></div>
            <div className="absolute inset-0 pt-8 pb-4 bg-white overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto preview-scroll">
                <Preview data={data} lang={lang} t={t} isEmbedded={true} />
              </div>
            </div>
          </div>
          
          <p className="mt-6 text-[10px] font-medium text-gray-400 italic text-center px-8 lg:block hidden leading-relaxed">
            {lang === 'pt' ? '*Esta é uma simulação de como sua página aparecerá em dispositivos móveis.' : '*これはモバイルデバイスでの表示シミュレーションです。'}
          </p>
        </div>

        {/* Botão Flutuante Mobile para Alternar */}
        <button 
          onClick={() => setMobileView(mobileView === 'edit' ? 'preview' : 'edit')}
          className="fixed bottom-6 right-6 z-[200] lg:hidden bg-gray-900 text-white p-5 rounded-full shadow-2xl flex items-center gap-3 transition-transform active:scale-95 border border-white/10"
        >
          {mobileView === 'edit' ? (
            <><Eye size={20} /> <span className="font-black text-[10px] uppercase tracking-widest pr-1">Ver Prévia</span></>
          ) : (
            <><Edit3 size={20} /> <span className="font-black text-[10px] uppercase tracking-widest pr-1">Voltar Editar</span></>
          )}
        </button>

      </div>
    </div>
  );
};

export default Editor;
