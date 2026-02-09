
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoupleData, PlanType, PageEffect, Language, PageTheme, PhotoFrame, Milestone, CoupleFont } from '../types';
import { Camera, Calendar, Sparkles, User, ArrowRight, ArrowLeft, Youtube, Palette, Plus, Trash2, Link as LinkIcon, Type, Search, Globe, Video, Crown, CheckCircle2, Heart, Layout, Frame, Clock, Lock } from 'lucide-react';
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
  const isPremium = plan === PlanType.PREMIUM || plan === PlanType.INFINITY;
  const isInfinity = plan === PlanType.INFINITY;

  const [domainSearch, setDomainSearch] = useState('');
  const [domainStatus, setDomainStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');
  const [searchStep, setSearchStep] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const checkDomain = () => {
    if (!domainSearch) return;
    setDomainStatus('checking');
    
    const steps = [
      "Consultando registros WHOIS...",
      "Verificando servidores de DNS...",
      "Validando extensões .love e .com...",
      "Confirmando disponibilidade..."
    ];

    let i = 0;
    const interval = setInterval(() => {
      setSearchStep(steps[i]);
      i++;
      if (i === steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          // Lógica de simulação realista
          const takenKeywords = ['love', 'google', 'casal', 'amor', 'kizuna', 'teste'];
          const isTaken = takenKeywords.some(k => domainSearch.toLowerCase().includes(k)) && domainSearch.length < 10;
          setDomainStatus(isTaken ? 'unavailable' : 'available');
          if (!isTaken) onUpdate({ requestedDomain: domainSearch.includes('.') ? domainSearch : `${domainSearch}.love` });
        }, 1000);
      }
    }, 800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const limit = isInfinity ? 20 : (isPremium ? 4 : 1);
    const selectedFiles = Array.from(files).slice(0, limit) as File[];
    const promises = selectedFiles.map(file => new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    }));
    Promise.all(promises).then(images => onUpdate({ images }));
  };

  const addVideo = () => {
    if ((data.videos || []).length >= 5) return;
    onUpdate({ videos: [...(data.videos || []), ''] });
  };

  const updateVideo = (index: number, val: string) => {
    const updated = [...(data.videos || [])];
    updated[index] = val;
    onUpdate({ videos: updated });
  };

  const removeVideo = (index: number) => {
    onUpdate({ videos: (data.videos || []).filter((_, i) => i !== index) });
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
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-500">
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
          <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
            isInfinity ? 'bg-[#30302e] text-[#67cbf1] border-black' : 'bg-[#f4f0f7] text-[#a47fba] border-[#e8e1f0]'
          }`}>
            {isInfinity ? <Crown size={14} /> : <Sparkles size={14} />} {isInfinity ? t.infinityPlan : (isPremium ? t.premiumPlan : t.basicPlan)}
          </div>
        </header>

        {/* DOMÍNIO (Plano Infinito) */}
        {isInfinity && (
          <section className="p-8 bg-gradient-to-br from-[#f8f7f9] to-white rounded-[2rem] border-2 border-[#67cbf122] space-y-4">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <Globe size={14} className="text-[#67cbf1]" /> {t.domainSearch}
            </label>
            <div className="flex gap-2">
              <div className="flex-grow flex items-center bg-white px-6 py-4 rounded-2xl border-2 border-[#f0eef2] shadow-inner">
                <input 
                  type="text" 
                  value={domainSearch}
                  onChange={(e) => setDomainSearch(e.target.value.toLowerCase().replace(/[^a-z0-9-.]/g, ''))}
                  placeholder="ex: joao-e-maria.love"
                  className="bg-transparent outline-none flex-grow font-bold text-[#30302e]" 
                />
              </div>
              <button 
                onClick={checkDomain}
                disabled={domainStatus === 'checking'}
                className="bg-[#67cbf1] text-white px-6 rounded-2xl hover:bg-[#5bb8dc] transition-all flex items-center justify-center min-w-[60px]"
              >
                {domainStatus === 'checking' ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Search size={20} />}
              </button>
            </div>
            {domainStatus === 'checking' && <p className="text-[10px] font-black text-[#67cbf1] uppercase tracking-widest animate-pulse pl-2">{searchStep}</p>}
            {domainStatus === 'available' && <p className="text-xs font-bold text-green-500 flex items-center gap-2 pl-2"><CheckCircle2 size={14} /> {t.domainAvailable}</p>}
            {domainStatus === 'unavailable' && <p className="text-xs font-bold text-rose-400 flex items-center gap-2 pl-2"><Trash2 size={14} /> {t.domainUnavailable}</p>}
            <p className="text-[10px] text-gray-400 italic">Domínios disponíveis: .love, .com, .site, .life, .me</p>
          </section>
        )}

        {/* NOMES E DATA */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><User size={14} className="text-[#a47fba]" /> {lang === 'pt' ? 'Seu Nome' : 'お名前1'}</label>
            <input type="text" value={data.partner1} onChange={e => onUpdate({ partner1: e.target.value })} className={inputClasses} placeholder="Ex: Lucas" />
          </div>
          <div className="space-y-3">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><User size={14} className="text-[#a47fba]" /> {lang === 'pt' ? 'Nome do Amor' : 'お名前2'}</label>
            <input type="text" value={data.partner2} onChange={e => onUpdate({ partner2: e.target.value })} className={inputClasses} placeholder="Ex: Júlia" />
          </div>
          <div className="md:col-span-2 space-y-3">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Calendar size={14} className="text-[#a47fba]" /> {lang === 'pt' ? 'Quando tudo começou?' : '記念日'}</label>
            <input type="date" value={data.startDate} onChange={e => onUpdate({ startDate: e.target.value })} className={inputClasses} />
          </div>
        </div>

        {/* FOTOS */}
        <section className="space-y-3">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
            <Camera size={14} className="text-[#a47fba]" /> {lang === 'pt' ? 'Galeria de Fotos' : '写真'} ({data.images.length}/{isInfinity ? 20 : (isPremium ? 4 : 1)})
          </label>
          <div className="relative group">
            <input type="file" multiple={isPremium} accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div className="w-full px-6 py-8 rounded-3xl border-2 border-dashed border-[#f0eef2] bg-[#f8f7f9]/50 group-hover:bg-white group-hover:border-[#a47fba] transition-all flex flex-col items-center gap-3">
              <Camera size={32} className="text-gray-200 group-hover:text-[#a47fba]" />
              <span className="text-sm font-bold text-gray-400">{lang === 'pt' ? 'Clique para selecionar as fotos' : '画像を選択'}</span>
            </div>
          </div>
          {data.images.length > 0 && (
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mt-4">
              {data.images.map((img, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden border border-gray-100 shadow-sm relative group">
                  <img src={img} className="w-full h-full object-cover" alt="Preview" />
                  <button onClick={() => onUpdate({ images: data.images.filter((_, idx) => idx !== i) })} className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* VÍDEOS (Plano Infinito) */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
             <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
               <Video size={14} className="text-[#a47fba]" /> {t.videosLabel} {!isInfinity && <span className="text-[#a47fba] ml-2 text-[8px] border border-[#a47fba22] px-2 py-0.5 rounded-full">🔒 {t.infinityOnly}</span>}
             </label>
             {isInfinity && (data.videos || []).length < 5 && (
               <button onClick={addVideo} className="text-[#a47fba] hover:text-[#8e6aa3] flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
                 <Plus size={14} /> {lang === 'pt' ? 'Novo Vídeo' : '追加'}
               </button>
             )}
          </div>
          {isInfinity && (data.videos || []).map((v, i) => (
            <div key={i} className="flex gap-4 p-4 bg-[#f8f7f9] rounded-2xl border border-[#f0eef2] animate-in slide-in-from-top-4 duration-300">
               <Youtube size={20} className="text-[#a47fba] mt-3" />
               <input type="text" value={v} onChange={e => updateVideo(i, e.target.value)} className={inputClasses} placeholder="Link do YouTube (ex: https://youtu.be/abc)" />
               <button onClick={() => removeVideo(i)} className="text-gray-300 hover:text-rose-400 p-2"><Trash2 size={20} /></button>
            </div>
          ))}
        </section>

        {/* CÁPSULA DO TEMPO (Plano Infinito) */}
        {isInfinity && (
          <section className="p-8 bg-[#30302e] text-white rounded-[2rem] space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#67cbf1] rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">{lang === 'pt' ? 'Cápsula do Tempo' : 'タイムカプセル'}</h3>
                <p className="text-[10px] text-[#67cbf1] uppercase tracking-widest font-black">Presenteie o futuro do seu amor</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Data de Abertura</label>
                <input 
                  type="date" 
                  value={data.capsuleOpenDate} 
                  onChange={e => onUpdate({ capsuleOpenDate: e.target.value })} 
                  className="w-full px-6 py-4 rounded-xl bg-white/10 border-2 border-white/10 focus:border-[#67cbf1] outline-none transition-all font-medium text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mensagem Secreta</label>
                <textarea 
                  value={data.capsuleMessage}
                  onChange={e => onUpdate({ capsuleMessage: e.target.value })}
                  rows={3}
                  placeholder="Escreva algo para ser lido apenas no futuro..."
                  className="w-full px-6 py-4 rounded-xl bg-white/10 border-2 border-white/10 focus:border-[#67cbf1] outline-none transition-all font-medium text-white resize-none"
                />
              </div>
            </div>
          </section>
        )}

        {/* DESIGN (TEMAS, MOLDURAS, FONTES) */}
        <section className="space-y-8 pt-6 border-t border-gray-50">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Layout size={14} className="text-[#a47fba]" /> {t.themes}</label>
              <div className="grid grid-cols-3 gap-2">
                {THEMES.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => onUpdate({ theme: theme.id })}
                    className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${data.theme === theme.id ? 'border-[#a47fba] bg-[#f4f0f7]' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className={`w-full h-8 rounded-lg ${theme.colors} border border-black/5`}></div>
                    <span className="text-[10px] font-bold text-[#30302e] truncate w-full text-center">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Frame size={14} className="text-[#a47fba]" /> {t.frames}</label>
              <div className="grid grid-cols-2 gap-2">
                {FRAMES.map(frame => (
                  <button
                    key={frame.id}
                    onClick={() => onUpdate({ frame: frame.id })}
                    className={`px-4 py-3 rounded-2xl border-2 transition-all text-left ${data.frame === frame.id ? 'border-[#a47fba] bg-[#f4f0f7]' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <span className="text-[10px] font-bold text-[#30302e]">{frame.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Type size={14} className="text-[#a47fba]" /> {t.fonts}</label>
              <select value={data.fontFamily} onChange={e => onUpdate({ fontFamily: e.target.value as CoupleFont })} className={inputClasses}>
                {FONTS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Sparkles size={14} className="text-[#a47fba]" /> {t.effects}</label>
              <select value={data.effect} onChange={e => onUpdate({ effect: e.target.value as PageEffect })} className={inputClasses}>
                {EFFECTS(lang).map(eff => (
                  <option key={eff.id} value={eff.id} disabled={eff.premium && !isPremium}>
                    {eff.name} {eff.premium && !isPremium ? '(Premium)' : ''}
                    {eff.id === PageEffect.INFINITY ? ' (Exclusivo ∞)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* MARCOS DA HISTÓRIA */}
        {isPremium && (
          <section className="space-y-6 pt-6 border-t border-gray-50">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Heart size={14} className="text-rose-400" /> {t.milestones}</label>
              <button onClick={addMilestone} className="text-[#a47fba] hover:text-[#8e6aa3] flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
                <Plus size={14} /> {t.addMilestone}
              </button>
            </div>
            <div className="space-y-4">
              {data.milestones.map((m) => (
                <div key={m.id} className="grid grid-cols-12 gap-4 p-5 bg-[#f8f7f9] rounded-3xl border border-[#f0eef2]">
                  <input type="date" value={m.date} onChange={e => updateMilestone(m.id, { date: e.target.value })} className="col-span-4 bg-white px-4 py-2 rounded-xl text-sm outline-none border border-gray-100" />
                  <input type="text" value={m.title} onChange={e => updateMilestone(m.id, { title: e.target.value })} className="col-span-7 bg-white px-4 py-2 rounded-xl text-sm outline-none border border-gray-100" placeholder={t.milestoneTitle} />
                  <button onClick={() => removeMilestone(m.id)} className="col-span-1 text-gray-300 hover:text-rose-400 flex items-center justify-center"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col sm:flex-row gap-6 pt-10">
          <button onClick={() => navigate('/preview')} className="flex-1 border-2 border-[#a47fba] text-[#a47fba] py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#f4f0f7] transition-all shadow-md">{t.preview}</button>
          <button onClick={() => navigate('/checkout')} className="flex-1 bg-[#a47fba] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-[#a47fba22] flex items-center justify-center gap-3 hover:bg-[#8e6aa3] transition-all transform hover:-translate-y-1">{t.finalize} <ArrowRight size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
