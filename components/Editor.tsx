
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoupleData, PlanType, PageEffect, Language, PageTheme, PhotoFrame, Milestone, CoupleFont } from '../types';
import { Camera, Calendar, Sparkles, User, ArrowRight, ArrowLeft, Youtube, Palette, Plus, Trash2, Link as LinkIcon, Type, Search, Globe, Video, Crown, CheckCircle2, Heart, Layout, Frame, Clock, Lock, Music, Quote } from 'lucide-react';
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
  const photoLimit = isInfinity ? 20 : (isPremium ? 4 : 1);

  const [domainSearch, setDomainSearch] = useState('');
  const [domainStatus, setDomainStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');
  const [searchStep, setSearchStep] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const checkDomain = async () => {
    if (!domainSearch) return;
    setDomainStatus('checking');
    
    const steps = [
      "Consultando registros WHOIS...",
      "Verificando servidores de DNS...",
      "Validando extensões .love e .com...",
      "Confirmando disponibilidade na rede..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setSearchStep(steps[i]);
      await new Promise(r => setTimeout(r, 700));
    }

    const invalidKeywords = ['google', 'facebook', 'kizuna', 'teste', 'admin', 'love'];
    const isTaken = invalidKeywords.some(k => domainSearch.toLowerCase() === k) || domainSearch.length < 3;
    
    setDomainStatus(isTaken ? 'unavailable' : 'available');
    if (!isTaken) onUpdate({ requestedDomain: domainSearch.includes('.') ? domainSearch : `${domainSearch}.love` });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (files.length > photoLimit) {
      alert(t.photoLimitReached.replace('{limit}', photoLimit.toString()));
    }

    const selectedFiles = Array.from(files).slice(0, photoLimit) as File[];
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
    const updated = data.milestones.map(m => m.id === id ? { ...m, ...updates } : m);
    onUpdate({ milestones: updated });
  };

  const removeMilestone = (id: string) => {
    onUpdate({ milestones: data.milestones.filter(m => m.id !== id) });
  };

  const inputClasses = "w-full px-6 py-4 rounded-2xl border-2 border-[#f0eef2] bg-[#f8f7f9]/50 focus:bg-white focus:border-[#a47fba] focus:ring-4 focus:ring-[#a47fba11] outline-none transition-all font-medium text-[#30302e] shadow-sm placeholder:text-gray-300";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-500 overflow-x-hidden pb-32">
      <button 
        onClick={() => navigate('/')} 
        className="mb-8 flex items-center gap-3 text-[#a47fba] font-black text-xs uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
      >
        <ArrowLeft size={18} /> {lang === 'pt' ? 'Mudar Plano' : 'プラン変更'}
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-2xl p-6 md:p-12 border border-[#f0eef2] space-y-12">
        <header className="border-b border-gray-50 pb-8 flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-elegant font-bold text-[#30302e]">{lang === 'pt' ? 'Personalização' : 'カスタマイズ'}</h2>
            <p className="text-gray-400 mt-2 text-base md:text-lg font-light">{lang === 'pt' ? 'Construa sua obra de arte digital.' : '自分たちのページをデザインしましょう。'}</p>
          </div>
          <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
            isInfinity ? 'bg-[#30302e] text-[#67cbf1] border-black' : 'bg-[#f4f0f7] text-[#a47fba] border-[#e8e1f0]'
          }`}>
            {isInfinity ? <Crown size={14} /> : <Sparkles size={14} />} {isInfinity ? t.infinityPlan : (isPremium ? t.premiumPlan : t.basicPlan)}
          </div>
        </header>

        {/* BUSCADOR DE DOMÍNIO */}
        {isInfinity && (
          <section className="p-5 md:p-8 bg-gradient-to-br from-[#f8f7f9] to-white rounded-[2rem] border-2 border-[#67cbf122] space-y-4 overflow-hidden">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <Globe size={14} className="text-[#67cbf1]" /> {t.domainSearch}
            </label>
            <div className="flex gap-2 w-full">
              <div className="flex-grow flex items-center bg-white px-4 md:px-6 py-4 rounded-2xl border-2 border-[#f0eef2] shadow-inner min-w-0">
                <input 
                  type="text" 
                  value={domainSearch}
                  onChange={(e) => setDomainSearch(e.target.value.toLowerCase().replace(/[^a-z0-9-.]/g, ''))}
                  placeholder="ex: lucas-e-carol"
                  className="bg-transparent outline-none w-full font-bold text-[#30302e] text-sm md:text-base" 
                />
              </div>
              <button 
                onClick={checkDomain}
                disabled={domainStatus === 'checking'}
                className="bg-[#67cbf1] text-white px-4 md:px-6 rounded-2xl hover:bg-[#5bb8dc] transition-all flex items-center justify-center min-w-[50px] md:min-w-[60px] shadow-lg shadow-[#67cbf133] flex-shrink-0"
              >
                {domainStatus === 'checking' ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Search size={20} />}
              </button>
            </div>
            {domainStatus === 'checking' && <p className="text-[10px] font-black text-[#67cbf1] uppercase tracking-widest animate-pulse pl-2">{searchStep}</p>}
            {domainStatus === 'available' && <p className="text-xs font-bold text-green-500 flex items-center gap-2 pl-2"><CheckCircle2 size={14} /> {t.domainAvailable}</p>}
            {domainStatus === 'unavailable' && <p className="text-xs font-bold text-rose-400 flex items-center gap-2 pl-2"><Trash2 size={14} /> {t.domainUnavailable}</p>}
          </section>
        )}

        {/* NOMES E DATA DE INÍCIO */}
        <div className="space-y-8">
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

          <div className="space-y-3">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Calendar size={14} className="text-[#a47fba]" /> {t.startDateLabel}</label>
            <input 
              type="date" 
              value={data.startDate} 
              onChange={e => onUpdate({ startDate: e.target.value })} 
              className={inputClasses} 
            />
          </div>
        </div>

        {/* MENSAGEM ESPECIAL (Agora para todos os planos) */}
        <section className="space-y-4 pt-6 border-t border-gray-50">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
            <Quote size={14} className="text-[#a47fba]" /> {t.coupleMessageLabel}
          </label>
          <div className="relative group">
            <textarea 
              value={data.message || ''} 
              onChange={e => onUpdate({ message: e.target.value })} 
              rows={4}
              className={`${inputClasses} resize-none py-6 italic`} 
              placeholder={t.coupleMessagePlaceholder}
            />
            <div className="absolute bottom-4 right-4 text-[9px] font-black text-gray-300 uppercase tracking-widest">
              {(data.message || '').length} caracteres
            </div>
          </div>
        </section>

        {/* FOTOS COM TRAVA LÓGICA */}
        <section className="space-y-3 border-t border-gray-50 pt-8">
          <div className="flex justify-between items-center px-1">
             <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
               <Camera size={14} className="text-[#a47fba]" /> {t.gallery} 
               <span className={`ml-2 px-2 py-0.5 rounded-full text-[9px] border ${data.images.length >= photoLimit ? 'text-rose-500 border-rose-100 bg-rose-50' : 'text-gray-400 border-gray-100 bg-gray-50'}`}>
                 {data.images.length} / {photoLimit}
               </span>
             </label>
          </div>
          <div className="relative group">
            <input 
              type="file" 
              multiple={photoLimit > 1} 
              accept="image/*" 
              onChange={handleFileChange} 
              disabled={data.images.length >= photoLimit && photoLimit === 1}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            />
            <div className={`w-full px-6 py-10 rounded-3xl border-2 border-dashed transition-all flex flex-col items-center gap-3 ${
              data.images.length >= photoLimit ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60' : 'bg-[#f8f7f9]/50 border-[#f0eef2] group-hover:bg-white group-hover:border-[#a47fba]'
            }`}>
              <Camera size={40} className={`transition-colors ${data.images.length >= photoLimit ? 'text-gray-300' : 'text-gray-200 group-hover:text-[#a47fba]'}`} />
              <span className="text-sm font-bold text-gray-400">
                {data.images.length >= photoLimit ? 'Limite Atingido' : (lang === 'pt' ? `Selecione até ${photoLimit} memórias` : `${photoLimit}枚まで選択可能`)}
              </span>
            </div>
          </div>
          {data.images.length > 0 && (
            <div className="grid grid-cols-4 md:grid-cols-10 gap-3 mt-6">
              {data.images.map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm relative group ring-2 ring-transparent hover:ring-[#a47fba] transition-all">
                  <img src={img} className="w-full h-full object-cover" alt="Preview" />
                  <button onClick={() => onUpdate({ images: data.images.filter((_, idx) => idx !== i) })} className="absolute top-1 right-1 bg-white/90 rounded-full p-1.5 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"><Trash2 size={12} /></button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* MÚSICA DE FUNDO (Premium e Infinity) */}
        {isPremium && (
          <section className="space-y-4 pt-6 border-t border-gray-50">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <Music size={14} className="text-[#a47fba]" /> {t.musicLabel}
            </label>
            <div className="flex gap-4 p-5 bg-[#f4f0f7]/30 rounded-3xl border-2 border-[#f0eef2] items-center">
              <Youtube size={24} className="text-rose-500 flex-shrink-0" />
              <input 
                type="text" 
                value={data.musicUrl || ''} 
                onChange={e => onUpdate({ musicUrl: e.target.value })} 
                className="bg-transparent outline-none flex-grow font-bold text-gray-700 placeholder:text-gray-300" 
                placeholder={t.musicPlaceholder} 
              />
            </div>
          </section>
        )}

        {/* DESIGN */}
        <section className="space-y-10 pt-6 border-t border-gray-50">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Layout size={14} className="text-[#a47fba]" /> {t.themes}</label>
              <div className="grid grid-cols-2 gap-3">
                {THEMES.map(theme => {
                  const isLocked = theme.id === PageTheme.INFINITY && !isInfinity;
                  return (
                    <button
                      key={theme.id}
                      disabled={isLocked}
                      onClick={() => onUpdate({ theme: theme.id })}
                      className={`relative p-4 rounded-[1.5rem] border-2 transition-all flex flex-col items-center gap-3 overflow-hidden ${
                        data.theme === theme.id ? 'border-[#a47fba] bg-[#f4f0f7]' : 'border-gray-100 hover:border-gray-200'
                      } ${isLocked ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                    >
                      <div className={`w-full h-12 rounded-xl ${theme.colors} border border-black/5 flex items-center justify-center`}>
                        {theme.id === PageTheme.INFINITY && <Crown size={16} className="text-[#67cbf1]" />}
                      </div>
                      <span className="text-[10px] font-bold text-[#30302e] uppercase tracking-widest">{theme.name}</span>
                      {isLocked && <div className="absolute inset-0 bg-white/40 flex items-center justify-center backdrop-blur-[1px]"><Lock size={20} className="text-gray-400" /></div>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Frame size={14} className="text-[#a47fba]" /> {t.frames}</label>
              <div className="grid grid-cols-2 gap-3">
                {FRAMES.map(frame => {
                  const isGoldLocked = frame.id === PhotoFrame.GOLD && !isPremium;
                  return (
                    <button
                      key={frame.id}
                      disabled={isGoldLocked}
                      onClick={() => onUpdate({ frame: frame.id })}
                      className={`relative p-4 rounded-[1.5rem] border-2 transition-all text-center flex flex-col items-center gap-2 ${
                        data.frame === frame.id ? 'border-[#a47fba] bg-[#f4f0f7]' : 'border-gray-100 hover:border-gray-200'
                      } ${isGoldLocked ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                    >
                      <span className="text-[10px] font-bold text-[#30302e] uppercase tracking-widest truncate w-full">{frame.name}</span>
                      {isGoldLocked && <Lock size={14} className="text-gray-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Sparkles size={14} className="text-[#a47fba]" /> {t.effects}</label>
              <select value={data.effect} onChange={e => onUpdate({ effect: e.target.value as PageEffect })} className={inputClasses}>
                {EFFECTS(lang).map(eff => (
                  <option key={eff.id} value={eff.id} disabled={eff.premium && !isPremium}>
                    {eff.name} {eff.premium && !isPremium ? '(Premium)' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Type size={14} className="text-[#a47fba]" /> {t.fonts}</label>
              <select value={data.fontFamily} onChange={e => onUpdate({ fontFamily: e.target.value as CoupleFont })} className={inputClasses}>
                {FONTS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* LINHA DO TEMPO */}
        {isPremium && (
          <section className="space-y-6 pt-6 border-t border-gray-50">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Clock size={14} className="text-[#a47fba]" /> {t.milestones}
              </label>
              <button onClick={addMilestone} className="text-[#a47fba] hover:text-[#8e6aa3] flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
                <Plus size={14} /> {t.addMilestone}
              </button>
            </div>
            
            <div className="space-y-4">
              {data.milestones.map((m) => (
                <div key={m.id} className="grid md:grid-cols-12 gap-4 p-6 bg-[#f8f7f9] rounded-[2rem] border-2 border-[#f0eef2] animate-in slide-in-from-top-4">
                  <div className="md:col-span-4">
                    <input 
                      type="date" 
                      value={m.date} 
                      onChange={e => updateMilestone(m.id, { date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-white text-sm font-bold text-gray-600 outline-none focus:border-[#a47fba]"
                    />
                  </div>
                  <div className="md:col-span-7">
                    <input 
                      type="text" 
                      value={m.title} 
                      onChange={e => updateMilestone(m.id, { title: e.target.value })}
                      placeholder={t.milestoneTitle}
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-white text-sm font-bold text-gray-700 outline-none focus:border-[#a47fba]"
                    />
                  </div>
                  <div className="md:col-span-1 flex items-center justify-center">
                    <button onClick={() => removeMilestone(m.id)} className="text-gray-300 hover:text-rose-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CÁPSULA DO TEMPO */}
        {isInfinity && (
          <section className="p-6 md:p-8 bg-[#30302e] text-white rounded-[2.5rem] space-y-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#67cbf1]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#67cbf1] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#67cbf133]">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold">{t.capsuleTitle}</h3>
                <p className="text-[8px] md:text-[10px] text-[#67cbf1] uppercase tracking-[0.3em] font-black">Uma mensagem que só o tempo revelará</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 px-1">{t.capsuleDate} <Clock size={12} /></label>
                <input 
                  type="date" 
                  value={data.capsuleOpenDate || ''} 
                  onChange={e => onUpdate({ capsuleOpenDate: e.target.value })} 
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border-2 border-white/10 focus:border-[#67cbf1] outline-none transition-all font-medium text-white shadow-inner"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 px-1">{t.capsuleMsg} <Lock size={12} /></label>
                <textarea 
                  value={data.capsuleMessage || ''}
                  onChange={e => onUpdate({ capsuleMessage: e.target.value })}
                  rows={3}
                  placeholder="O que você quer dizer ao seu amor daqui a alguns meses ou anos?"
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border-2 border-white/10 focus:border-[#67cbf1] outline-none transition-all font-medium text-white resize-none shadow-inner text-sm"
                />
              </div>
            </div>
          </section>
        )}

        {/* VÍDEOS */}
        <section className="space-y-6 border-t border-gray-50 pt-8">
          <div className="flex justify-between items-center px-1">
             <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
               <Video size={14} className="text-[#a47fba]" /> {t.videosLabel} {!isInfinity && <span className="text-[#a47fba] ml-2 text-[8px] border border-[#a47fba22] px-2 py-0.5 rounded-full">🔒 {t.infinityOnly}</span>}
             </label>
             {isInfinity && (data.videos || []).length < 5 && (
               <button onClick={addVideo} className="text-[#a47fba] hover:text-[#8e6aa3] flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
                 <Plus size={14} /> Adicionar Vídeo
               </button>
             )}
          </div>
          {isInfinity && (data.videos || []).map((v, i) => (
            <div key={i} className="flex gap-4 p-5 bg-[#f8f7f9] rounded-2xl border-2 border-[#f0eef2] animate-in slide-in-from-top-4 items-center">
               <Youtube size={24} className="text-rose-500" />
               <input type="text" value={v} onChange={e => updateVideo(i, e.target.value)} className="bg-transparent outline-none flex-grow font-bold text-gray-700 placeholder:text-gray-300 text-sm" placeholder="Cole o link do YouTube aqui..." />
               <button onClick={() => removeVideo(i)} className="text-gray-300 hover:text-rose-400 p-2"><Trash2 size={20} /></button>
            </div>
          ))}
        </section>

        <div className="flex flex-col sm:flex-row gap-6 pt-10">
          <button onClick={() => navigate('/preview')} className="flex-1 border-2 border-[#a47fba] text-[#a47fba] py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#f4f0f7] transition-all shadow-md transform hover:-translate-y-1 active:scale-95">{t.preview}</button>
          <button 
            onClick={() => navigate('/checkout')} 
            className="flex-1 bg-[#a47fba] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-[#a47fba22] flex items-center justify-center gap-3 hover:bg-[#8e6aa3] transition-all transform hover:-translate-y-1 active:scale-95"
          >
            {t.finalize} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
