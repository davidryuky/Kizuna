
import { PlanType, Plan, Language, PageTheme, PhotoFrame, PageEffect, CoupleFont } from './types';

export const getPlans = (lang: Language): Plan[] => [
  {
    id: PlanType.BASIC,
    name: lang === 'pt' ? 'Plano Essencial' : 'ベーシックプラン',
    price: lang === 'pt' ? 'R$ 29,90' : '¥ 800',
    features: lang === 'pt' ? [
      'Página Online 24/7',
      'Contador de Tempo Real',
      'Foto Especial',
      'Escolha de Fontes',
      'Efeito de Partículas Padrão',
      'Design Minimalista'
    ] : [
      '24時間365日オンライン',
      '経過時間カウンター',
      '大切な写真',
      'フォントの選択',
      '標準的なエフェクト',
      'ミニマルデザイン'
    ],
    imageLimit: 1,
    videoLimit: 0,
    hasMusic: false,
    premiumEffects: false,
    premiumThemes: false,
    hasDomain: false
  },
  {
    id: PlanType.PREMIUM,
    name: lang === 'pt' ? 'Plano Amor Máximo' : '永遠の絆プラン',
    price: lang === 'pt' ? 'R$ 49,90' : '¥ 1400',
    features: lang === 'pt' ? [
      'Temas Premium Exclusivos',
      'Molduras Artísticas Personalizadas',
      'Música de Fundo (YouTube)',
      'Linha do Tempo "Nossos Marcos"',
      'Galeria com 4 Fotos',
      'Link Personalizado (Slug)',
      'Efeitos de Partículas Avançados'
    ] : [
      '限定プレミアムテーマ',
      'カスタムアーティスティックフレーム',
      'BGM設定（YouTube）',
      '二人の軌跡（タイムライン）',
      '4枚の思い出ギャラリー',
      'カスタムURL設定',
      '高度な粒子エフェクト'
    ],
    imageLimit: 4,
    videoLimit: 0,
    hasMusic: true,
    premiumEffects: true,
    premiumThemes: true,
    hasDomain: false
  },
  {
    id: PlanType.INFINITY,
    name: lang === 'pt' ? 'Plano Infinito' : 'インフィニティプラン',
    price: lang === 'pt' ? 'R$ 89,90' : '¥ 2500',
    features: lang === 'pt' ? [
      'Tudo do Plano Amor Máximo',
      'Tema Exclusivo "Luminous Infinity"',
      'Domínio Próprio (.love ou .com)',
      'Galeria Estendida (20 fotos)',
      'Suporte a 5 Vídeos (YouTube)',
      'Cápsula do Tempo Digital',
      'Suporte Prioritário 24h'
    ] : [
      '永遠の絆プランの全機能',
      '特別テーマ「Luminous Infinity」',
      '独自ドメイン (.love または .com)',
      '最大20枚のフォトギャラリー',
      '5つのビデオサポート',
      'デジタルタイムカプセル',
      '24時間優先サポート'
    ],
    imageLimit: 20,
    videoLimit: 5,
    hasMusic: true,
    premiumEffects: true,
    premiumThemes: true,
    hasDomain: true
  }
];

export const THEMES = [
  { 
    id: PageTheme.ROMANTIC, 
    name: 'Kizuna Lavender', 
    colors: 'bg-[#fdfaff]', 
    card: 'bg-white/80 backdrop-blur-md border-white/40',
    text: 'text-purple-950',
    muted: 'text-purple-900/50',
    accent: 'bg-purple-400',
    isDark: false
  },
  { 
    id: PageTheme.CLASSIC, 
    name: 'Kizuna Azure', 
    colors: 'bg-[#f0f9ff]', 
    card: 'bg-white/70 backdrop-blur-md border-white/60',
    text: 'text-sky-950', 
    muted: 'text-sky-900/50',
    accent: 'bg-sky-500',
    isDark: false
  },
  { 
    id: PageTheme.MIDNIGHT, 
    name: 'Kizuna Graphite', 
    colors: 'bg-[#121212]', 
    card: 'bg-[#1e1e1e]/90 backdrop-blur-md border-white/5',
    text: 'text-slate-100',
    muted: 'text-slate-400',
    accent: 'bg-purple-500',
    isDark: true
  },
  { 
    id: PageTheme.INFINITY, 
    name: 'Luminous Infinity', 
    colors: 'bg-[#020617]', 
    card: 'bg-black/60 backdrop-blur-3xl border-cyan-500/20 shadow-[0_0_40px_rgba(34,211,238,0.1)]',
    text: 'text-white',
    muted: 'text-cyan-400/50',
    accent: 'bg-cyan-400',
    isDark: true
  },
];

export const FRAMES = [
  { id: PhotoFrame.NONE, name: 'Sem Moldura' },
  { id: PhotoFrame.POLAROID, name: 'Polaroid Retro' },
  { id: PhotoFrame.GOLD, name: 'Borda Artística' },
  { id: PhotoFrame.ORGANIC, name: 'Minimalista' },
];

export const FONTS = [
  { id: CoupleFont.ROMANTIC, name: 'Romântica' },
  { id: CoupleFont.MODERN, name: 'Moderna' },
  { id: CoupleFont.ELEGANT, name: 'Elegante' },
  { id: CoupleFont.MINIMALIST, name: 'Minimalista' },
];

export const EFFECTS = (lang: Language) => [
  { id: PageEffect.NONE, name: lang === 'pt' ? 'Nenhum' : 'なし', premium: false },
  { id: PageEffect.HEARTS, name: lang === 'pt' ? 'Corações Púrpura' : 'パープルハート', premium: false },
  { id: PageEffect.SPARKLES, name: lang === 'pt' ? 'Brilho Celeste' : 'アズールブライト', premium: true },
  { id: PageEffect.FLOWER_PETALS, name: lang === 'pt' ? 'Pétalas de Cerejeira' : '桜', premium: true },
  { id: PageEffect.FIREFLIES, name: lang === 'pt' ? 'Vagalumes Mágicos' : '蛍', premium: true },
];
