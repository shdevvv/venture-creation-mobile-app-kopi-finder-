export type ScreenName = 
  | 'welcome'
  | 'signin'
  | 'signup'
  | 'verify-code'
  | 'home'
  | 'map'
  | 'cafe-detail'
  | 'log-visit'
  | 'districts'
  | 'ai-rec'
  | 'community'
  | 'passport'
  | 'achievements'
  | 'profile'
  | 'voucher'
  | 'bean-story'
  | 'counter-session';

export type TabName = 'home' | 'map' | 'ai-rec' | 'community' | 'passport';

export type DeviceMode = 'ios' | 'android' | 'responsive';

export interface CafeAspectRating {
  coffee: number;
  vibe: number;
  wifiSpeed: string;
  plugs: string;
  service: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'manual-brew' | 'non-coffee' | 'light-bites';
  badge?: string;
  badgeType?: 'best-seller' | 'staff-pick';
  description: string;
  price: string;
  tastingNotes: string[];
}

export interface Cafe {
  id: string;
  name: string;
  verified: boolean;
  address: string;
  neighborhood: string;
  distance: string;
  priceRange: string;
  hours: string;
  isOpen: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  keySpecs: {
    priceAvg: string;
    wifiSpeed: string;
    wifiLabel: string;
    noiseDb: string;
    noiseLabel: string;
  };
  features: string[];
  aspectRatings: CafeAspectRating;
  ratingBreakdown: {
    coffee: { score: number; percent: number };
    ambience: { score: number; percent: number };
    barista: { score: number; percent: number };
    wifi: { score: number; percent: number };
    value: { score: number; percent: number };
  };
  menu: MenuItem[];
  lat: number;
  lng: number;
}

export interface CuppingNote {
  id: string;
  authorName: string;
  authorHandle: string;
  authorBadge: string;
  authorAvatar: string;
  timeAgo: string;
  isVerified: boolean;
  cafeName: string;
  cafeLocation: string;
  content: string;
  brewRecipe?: {
    method: string;
    dose: string;
    temp: string;
    time: string;
  };
  scaScore?: number;
  sensoryScores?: {
    acidity: number;
    sweetness: number;
    body: number;
    aroma: number;
  };
  workStats?: {
    downloadMbps: number;
    noiseDb: number;
    noiseLabel: string;
    socketRatio: string;
  };
  image?: string;
  imageBadge?: string;
  tags: string[];
  likes: number;
  comments: number;
  userLiked?: boolean;
  savedToPassport?: boolean;
}

export interface BadgeItem {
  id: string;
  title: string;
  category: 'origins' | 'craft' | 'community' | 'roasteries';
  description: string;
  status: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic';
  points: string;
  icon: string;
  isUnlocked: boolean;
  progressText?: string;
  progressPercent?: number;
  earnedDate?: string;
  participatingCafes?: string[];
  lore?: string;
}

export interface CoffeeDistrict {
  id: string;
  name: string;
  cafeCount: number;
  partnerCount: number;
  distance: string;
  badge?: string;
  image: string;
  bannerText: string;
  tags: string[];
  region: 'South Jakarta' | 'Central Jakarta' | 'West Jakarta' | 'North / PIK' | 'Bandung & Bali';
}

export interface UserProfile {
  name: string;
  handle: string;
  level: number;
  levelTitle: string;
  avatar: string;
  cafesVisited: number;
  roasterStamps: number;
  perkPoints: number;
  reviewsLogged: number;
  nextRankTarget: number;
  nextRankName: string;
  activeFlair: string;
  roastPreference: string;
  preferredBrewMethods: string[];
  signatureFlavorNotes: string[];
  passActive: boolean;
  passExpiry: string;
  offlineMapDownloaded: boolean;
  notificationsEnabled: boolean;
  dietaryPreference: string;
  visualAtmosphere: string;
}
