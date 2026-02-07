
export enum PlanType {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM'
}

export enum PageEffect {
  NONE = 'none',
  HEARTS = 'hearts',
  SPARKLES = 'sparkles',
  FLOWER_PETALS = 'petals',
  FIREFLIES = 'fireflies'
}

export enum PageTheme {
  ROMANTIC = 'romantic',
  CLASSIC = 'classic',
  MIDNIGHT = 'midnight'
}

export enum PhotoFrame {
  NONE = 'none',
  POLAROID = 'polaroid',
  GOLD = 'gold',
  ORGANIC = 'organic'
}

export enum CoupleFont {
  ROMANTIC = 'font-romance',
  MODERN = 'font-inter',
  ELEGANT = 'font-elegant',
  MINIMALIST = 'font-jp'
}

export interface Milestone {
  id: string;
  date: string;
  title: string;
}

export type Language = 'pt' | 'jp';

export interface CoupleData {
  partner1: string;
  partner2: string;
  startDate: string;
  images: string[];
  musicUrl?: string;
  message: string;
  effect: PageEffect;
  theme: PageTheme;
  frame: PhotoFrame;
  fontFamily: CoupleFont;
  milestones: Milestone[];
  plan: PlanType;
  slug?: string;
}

export interface Plan {
  id: PlanType;
  name: string;
  price: string;
  features: string[];
  imageLimit: number;
  hasMusic: boolean;
  premiumEffects: boolean;
  premiumThemes: boolean;
}
