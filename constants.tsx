
import { PlanType, Plan, Language, PageTheme, PhotoFrame, PageEffect, CoupleFont } from './types';

export const getPlans = (lang: Language): Plan[] => [
  {
    id: PlanType.PREMIUM,
    name: lang === 'pt' ? 'Plano Amor Máximo' : '永遠の絆プラン',
    price: lang === 'pt' ? 'R$ 49,90' : '¥ 1400',
    features: lang === 'pt' ? [
      'Temas Premium Exclusivos',
      'Molduras Artísticas Personalizadas',
      'Música de Fundo (YouTube)',
      'Linha do Tempo "Nossos Marcos"',
      'Slideshow Automático de Fotos',
      'Link Personalizado (Slug)',
      'Efeitos de Partículas Avançados'
    ] : [
      '限定プレミアムテーマ',
      'カスタムアーティスティックフレーム',
      'BGM設定（YouTube）',
      '二人の軌跡（タイムライン）',
      '思い出のフォトギャラリー',
      'カスタムURL設定',
      '高度な粒子エフェクト'
    ],
    imageLimit: 4,
    hasMusic: true,
    premiumEffects: true,
    premiumThemes: true
  },
  {
    id: PlanType.BASIC,
    name: lang === 'pt' ? 'Plano Essencial' : 'ベーシックプラン',
    price: lang === 'pt' ? 'R$ 29,90' : '¥ 800',
    features: lang === 'pt' ? [
      'Página Online 24/7',
      'Contador de Tempo Real',
      'Foto Especial',
      'Escolha de Fontes',
      'Efeito de Corações',
      'Design Minimalista'
    ] : [
      '24時間365日オンライン',
      '経過時間カウンター',
      '大切な写真',
      'フォントの選択',
      'ハートのエフェクト',
      'ミニマルデザイン'
    ],
    imageLimit: 1,
    hasMusic: false,
    premiumEffects: false,
    premiumThemes: false
  }
];

export const THEMES = [
  { 
    id: PageTheme.ROMANTIC, 
    name: 'Romantic Pink', 
    colors: 'bg-[#fff5f6]', 
    card: 'bg-white/80',
    text: 'text-rose-500',
    accent: 'bg-rose-500'
  },
  { 
    id: PageTheme.CLASSIC, 
    name: 'Classic Gold', 
    colors: 'bg-[#faf9f6]', 
    card: 'bg-white/90',
    text: 'text-amber-700',
    accent: 'bg-amber-600'
  },
  { 
    id: PageTheme.MIDNIGHT, 
    name: 'Midnight Loft', 
    colors: 'bg-[#0f172a]', 
    card: 'bg-slate-900/80',
    text: 'text-slate-200',
    accent: 'bg-indigo-500'
  },
];

export const FRAMES = [
  { id: PhotoFrame.NONE, name: 'Sem Moldura' },
  { id: PhotoFrame.POLAROID, name: 'Polaroid Retro' },
  { id: PhotoFrame.GOLD, name: 'Royal Gold' },
  { id: PhotoFrame.ORGANIC, name: 'Borda Suave' },
];

export const FONTS = [
  { id: CoupleFont.ROMANTIC, name: 'Romântica' },
  { id: CoupleFont.MODERN, name: 'Moderna' },
  { id: CoupleFont.ELEGANT, name: 'Elegante' },
  { id: CoupleFont.MINIMALIST, name: 'Minimalista' },
];

export const EFFECTS = (lang: Language) => [
  { id: PageEffect.NONE, name: lang === 'pt' ? 'Nenhum' : 'なし', premium: false },
  { id: PageEffect.HEARTS, name: lang === 'pt' ? 'Corações' : 'ハート', premium: false },
  { id: PageEffect.SPARKLES, name: lang === 'pt' ? 'Estrelas' : '星空', premium: true },
  { id: PageEffect.FLOWER_PETALS, name: lang === 'pt' ? 'Pétalas' : '桜', premium: true },
  { id: PageEffect.FIREFLIES, name: lang === 'pt' ? 'Vagalumes' : '蛍', premium: true },
];
