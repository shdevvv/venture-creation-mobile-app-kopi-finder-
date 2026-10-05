import { Cafe, CoffeeDistrict, CuppingNote, BadgeItem, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'Maya Putri',
  handle: '@mayabrews',
  level: 5,
  levelTitle: 'Jakarta Coffee Explorer',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjR_jacB8avppC-reNMEI-NrcnSYzg0jlPhii2IUYwBnKbPqbkrTb-ZEGjZkUl2zcNVSovz2IsM49HJbDo8UnWMQgiWWKPrpDpWRSWjif0YNdRdmym6tJTIlQ4cr9pggcmZXL_ybjzqrkSEyw5wbFDPbG-uRfYvkXNQOuSSYYlin_ZbCNUTI9_eSZqfTOJiNaU_aqgHxsI82WmE-2NgNGI785ErZo41snrIP5Urh7VvHuqZiIZrS0znQ',
  cafesVisited: 24,
  roasterStamps: 8,
  perkPoints: 1450,
  reviewsLogged: 14,
  nextRankTarget: 30,
  nextRankName: 'Master Roaster',
  activeFlair: 'Acidity Adventurer',
  roastPreference: 'Medium-Light (Filter)',
  preferredBrewMethods: ['V60 Dripper', 'Aeropress', 'Japanese Cold Drip'],
  signatureFlavorNotes: ['🌸 Jasmine', '🍋 Bergamot', '🍑 Stone Fruit', '🍯 Honeycomb'],
  passActive: true,
  passExpiry: 'Dec 2026',
  offlineMapDownloaded: true,
  notificationsEnabled: true,
  dietaryPreference: 'Oat Milk preferred • No Dairy',
  visualAtmosphere: 'Light Warm Mode (Cozy Coffee Hue)'
};

export const MOCK_CAFES: Cafe[] = [
  {
    id: 'tanamera',
    name: 'Tanamera Specialty Roastery',
    verified: true,
    address: 'Jl. Senopati No. 84, South Jakarta',
    neighborhood: 'Senopati',
    distance: '350m',
    priceRange: '$$ • Moderate',
    hours: 'Open until 10 PM',
    isOpen: true,
    rating: 4.9,
    reviewCount: 342,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAnsiSNdcWHKAHxZl-L1AtJPhQzwdS-dsxkLsZycNIgHoofI--fWcgeqLHknZcQ41B6LZvvY8FilR_MJmDvTKxWMY-mRTzDGWIOdTS4YRfGjHVYqAQeh_Kmi24mUrQT1kKX9zYWGHq_jYYeNP_6Kf37aTsGa8m4NCVeIwvSagN1-QNKTgYITw4f5IxXKAgG5HcOJOPMrHKPiqHQUm7yenbnhEqZmK81osZoA9_lJslRUXGX7phon5pVpQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDwPui2FBqgW1Omfhn4P1w4OWQjtgSRZEe9IpfZgGMRI94vtrZFHucGa8I-mSI5JILTX8MezJ_3R-41i7bkuxYNsRiJNiyM-hyipRa9Ag-RigdK1SPtci4OXtAR8ikkGmdU9u805nu5XBGxjh0qy58al611CDdowTsYzMNqVRIF-0QYeR_eQSvumrMjOh3S6nMBder6UOhxypItaCC6oTR7O0EOkwcOrN1FJQ30Whbj8c2hhCmxQjchPQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAwXnzXHV_dGwnlfp-AUiI-4GTC9tAaiww8SgGluWZksOmn2PgL6Q2c4WkmtTLuuYsUfDLHZCRbz_eYYy8nFmKJWvbCTV2Nrlr7yPwsv-FBDLSBQFooPMSE-PPITk4MFJDzedPCa9Z_LDk8XCZ3jKk5j4qyq6ZXeth--rmwaHVKfSwy5jFhA9M0QtYz6c7CHhiWhhiykYheDApOYaDdHiQx1zG28bt6O8ICx2la4nt2QoqvTOROWHer1A'
    ],
    keySpecs: {
      priceAvg: '35k - 65k',
      wifiSpeed: '110 Mbps',
      wifiLabel: 'Dedicated Fiber',
      noiseDb: '54 dB',
      noiseLabel: 'Moderate Chill'
    },
    features: ['Micro-batch Roasting', 'Plugs Everywhere', 'Pet Friendly'],
    aspectRatings: {
      coffee: 4.9,
      vibe: 4.8,
      wifiSpeed: '95M',
      plugs: 'Abundant',
      service: 4.7
    },
    ratingBreakdown: {
      coffee: { score: 4.9, percent: 98 },
      ambience: { score: 4.9, percent: 96 },
      barista: { score: 4.6, percent: 92 },
      wifi: { score: 4.8, percent: 95 },
      value: { score: 4.3, percent: 86 }
    },
    lat: -6.2305,
    lng: 106.8095,
    menu: [
      {
        id: 'm1',
        name: 'Aceh Gayo Triple-Pick Anaerobic V60',
        category: 'manual-brew',
        badge: 'Signature / Best Seller',
        badgeType: 'best-seller',
        description: 'Light roast processed with 72h oxygen-free fermentation. Crisp, tea-like finish.',
        price: 'IDR 48k',
        tastingNotes: ['Jasmine Florals', 'Red Apple', 'Dark Honey']
      },
      {
        id: 'm2',
        name: 'Cold Drip Reserve (18h steep)',
        category: 'manual-brew',
        badge: 'Staff Pick',
        badgeType: 'staff-pick',
        description: 'Single-origin Flores Bajawa slow-extracted drop-by-drop over iced volcanic water.',
        price: 'IDR 45k',
        tastingNotes: ['Dark Cacao', 'Blackcurrant', 'Bourbon Vanilla']
      },
      {
        id: 'm3',
        name: 'Flat White with Oat Milk',
        category: 'coffee',
        description: 'House espresso blend paired with silky steamed Minor Figures oat milk.',
        price: 'IDR 42k',
        tastingNotes: ['Caramel Fudge', 'Toasted Hazelnut']
      },
      {
        id: 'm4',
        name: 'Kerinci Natural Slow Pourover',
        category: 'manual-brew',
        description: 'Mount Kerinci high-altitude lot with sun-dried natural sweetness.',
        price: 'IDR 46k',
        tastingNotes: ['Ripe Peach', 'Mango', 'Brown Sugar']
      },
      {
        id: 'm5',
        name: 'Artisan Butter Croissant',
        category: 'light-bites',
        description: 'Twice-baked French butter croissant with flaky golden honeycomb interior.',
        price: 'IDR 34k',
        tastingNotes: ['French Butter', 'Toasted Wheat']
      }
    ]
  },
  {
    id: 'giyanti',
    name: 'Giyanti Coffee Roastery',
    verified: true,
    address: 'Jl. Surabaya No. 20, Menteng, Central Jakarta',
    neighborhood: 'Menteng',
    distance: '1.2km',
    priceRange: '$$$ • Artisanal',
    hours: 'Open until 8 PM',
    isOpen: true,
    rating: 4.8,
    reviewCount: 518,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-r6NrO6H5tTWD5LG6BIh6be1kKKcLXUSDQW-HdC21NUrXNvFWr19Y_J9MH97lS8R1lv42mZb4sgs0EVB3CHaJ-6iOrGJ7d3z8JcpVQK7je-e94tURB0xgc6lCa3tvVJQCfIgzWZdbariUAiFxjnWLkcsIP_VKWAJGtZjTIpzRCzCBWYSBUH22q85dZDKacPVqy3-QYFMZV-DK7oxzim9GOTjXrxW3fuP2Rlryh_ZiRC67Fbg0LZ-67w',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7pt5g8wkxS6GcYSfRnavEgpQunrlhLehyvMDOogG98_KVHxsNhlzRDwIAhjJa_sJYJcRSXr0_6qxszwzraMxpZiO7K3LVHAI8i9rdiFSTJSp4wmm5diJPYEekJSFhuEFxxi0POwKvyiegUgdDHrU1xTIkAeJCls4Muo02gn9rHzqy_eUnHpvU1oVrp5eyowB68TiEJP4Wuxfid0lRx14gMr1TL2OWYoFvjvoowbAT-6knPqpT3mWrRQ'
    ],
    keySpecs: {
      priceAvg: '45k - 85k',
      wifiSpeed: '70 Mbps',
      wifiLabel: 'Stable Wi-Fi',
      noiseDb: '48 dB',
      noiseLabel: 'Quiet Patio'
    },
    features: ['Specialty V60', 'Garden Patio', 'Artisan Bakery'],
    aspectRatings: {
      coffee: 5.0,
      vibe: 4.9,
      wifiSpeed: '70M',
      plugs: 'Patio',
      service: 4.8
    },
    ratingBreakdown: {
      coffee: { score: 5.0, percent: 100 },
      ambience: { score: 4.9, percent: 97 },
      barista: { score: 4.8, percent: 94 },
      wifi: { score: 4.2, percent: 84 },
      value: { score: 4.4, percent: 88 }
    },
    lat: -6.1985,
    lng: 106.8402,
    menu: [
      {
        id: 'g1',
        name: 'Giyanti Roast Padang Solok',
        category: 'manual-brew',
        badge: 'Roaster Heritage',
        description: 'West Sumatra high plateau bean roasted light-medium for stone-fruit sweetness.',
        price: 'IDR 52k',
        tastingNotes: ['Apricot', 'Cinnamon', 'Cane Sugar']
      }
    ]
  },
  {
    id: 'anomali',
    name: 'Anomali Coffee Roastery',
    verified: true,
    address: 'Jl. Senopati No. 19, Kebayoran Baru, South Jakarta',
    neighborhood: 'Senopati',
    distance: '800m',
    priceRange: '$$ • Standard',
    hours: 'Open until 11 PM',
    isOpen: true,
    rating: 4.7,
    reviewCount: 289,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPwyWU9n7KuM7Z1cTKXVSy9UvLXkJU7YGCNMGhzbNBoCwFX2DWJqnGKQ4yQyE24VbutJoPqZcMboEfgt_JeEtXkYHPSneLZMZQT4V_jkuyjRQHjZGfrdmjYX5XU6yEL7bIkJjyK9aXGnCZj9d9yDEWLXq-Nw0nl9u66Ask5wx_C7cON3ofOnOKIhp6xNnlOm4DiAzCDGOegciG12NVVb7DigVAZ6a4JyvmJg7dMIl5dz7HvIHdJrSI6A'
    ],
    keySpecs: {
      priceAvg: '35k - 60k',
      wifiSpeed: '120 Mbps',
      wifiLabel: 'Ultra Fast',
      noiseDb: '58 dB',
      noiseLabel: 'Vibrant Buzz'
    },
    features: ['Toraja Kalosi', 'Silent Room', 'Meeting Table'],
    aspectRatings: {
      coffee: 4.8,
      vibe: 4.6,
      wifiSpeed: '120M',
      plugs: 'Every desk',
      service: 4.6
    },
    ratingBreakdown: {
      coffee: { score: 4.8, percent: 96 },
      ambience: { score: 4.6, percent: 91 },
      barista: { score: 4.6, percent: 92 },
      wifi: { score: 4.9, percent: 98 },
      value: { score: 4.7, percent: 94 }
    },
    lat: -6.233,
    lng: 106.812,
    menu: [
      {
        id: 'a1',
        name: 'Toraja Sapan Single Origin',
        category: 'manual-brew',
        badge: 'Classic Single Origin',
        description: 'Sulawesi heritage lot with full syrupy body and herbal sweet cedar finish.',
        price: 'IDR 44k',
        tastingNotes: ['Herbal Cedar', 'Dark Chocolate', 'Ripe Lime']
      }
    ]
  },
  {
    id: 'kroma',
    name: 'Kroma Studio & Roastery',
    verified: true,
    address: 'Jl. Senopati Mezzanine No. 12, South Jakarta',
    neighborhood: 'Senopati',
    distance: '450m',
    priceRange: '$$ • Moderate',
    hours: 'Open until 9 PM',
    isOpen: true,
    rating: 4.9,
    reviewCount: 215,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqrNeL8DX5mFTL4NXDVsO5uUnasQxILGvjagIyVg35WOLip9Jfb2A2KDSG62iSo9u-OEkjQ0PjehMb6Ve5JAb6pWmJHfK-RcpZSi4aPQNgMvJtylAX7z8OFFMlzdzT7XN_SajLdT4ZIjgTAplm_BsuSmhyyMgex_5fJKfjUzBDjf7oM70jooa0z2gyaqB3xv6wF3sKYhB8LVYORSGNgJ2duDGnLbjrLTbi6sffmPkp0oSvIFJ0IaA2tg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZMy-uN_84UHpwIXJi6-FozARcETZak4Hq4gF3Y8AXZ-6gPVIXp_25sV3RYA-scAXhxQD8jzAPZpmdzh9SNkaPAADRlkRtBZvsizCA9uRsjuqTeZ8UKyR4FprN_TfA1ijptL3KZ5y3NxvJSdYlt2TSXENCF7tIbMNV7tmMdIp46XYVPL8SW88ESntvXJe4hAUXfB2ku2mROXvVMJkBjsW3bfltyFgtCzg9J6wk_Q8AlJYQwwcSIeF-4Q'
    ],
    keySpecs: {
      priceAvg: '38k - 58k',
      wifiSpeed: '118 Mbps',
      wifiLabel: 'Low Latency',
      noiseDb: '51 dB',
      noiseLabel: 'Whisper Quiet'
    },
    features: ['Universal Outlets', 'Quiet Focus Zone', 'Specialty Pastries'],
    aspectRatings: {
      coffee: 4.9,
      vibe: 5.0,
      wifiSpeed: '118M',
      plugs: '100% Sockets',
      service: 4.8
    },
    ratingBreakdown: {
      coffee: { score: 4.9, percent: 98 },
      ambience: { score: 5.0, percent: 100 },
      barista: { score: 4.7, percent: 93 },
      wifi: { score: 4.9, percent: 98 },
      value: { score: 4.5, percent: 90 }
    },
    lat: -6.236,
    lng: 106.808,
    menu: [
      {
        id: 'k1',
        name: 'Kerinci Honey Pour-over',
        category: 'manual-brew',
        badge: 'Recommended Pour',
        description: 'Peach, jasmine, and cane sugar sweetness extracted at 92°C.',
        price: 'IDR 45k',
        tastingNotes: ['Peach', 'Jasmine', 'Cane Sugar']
      }
    ]
  },
  {
    id: 'two-roasters',
    name: 'Two Roasters Senopati',
    verified: true,
    address: 'Jl. Senopati No. 42, Kebayoran Baru, South Jakarta',
    neighborhood: 'Senopati',
    distance: '400m',
    priceRange: '$$ • Moderate',
    hours: 'Open until 9 PM',
    isOpen: true,
    rating: 4.8,
    reviewCount: 198,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBFBW7FmY2qDWduQZ_MpCmtx8ghSwVVb_5RGMaB4GedMrtRvP0Ii1XRuLHvM2wuApEEudemrTfKWUKVVWjSvkdyWnuwTzataw7V0vEyCfn6SoaiW-9PJBbPzIdazMiiWSrHIFM8lgygj5yI2HwZiA9REXpnm-on7L2tsY69eAz1ziKpKqOw1flHqlMb6lJFJAilYHXcwuv4k4RdW6L5f_3ARELyccFgFam_L7IRUGv-as1YyyQ2v1FBUQ'
    ],
    keySpecs: {
      priceAvg: '35k - 60k',
      wifiSpeed: '105 Mbps',
      wifiLabel: 'High Speed',
      noiseDb: '53 dB',
      noiseLabel: 'Cozy Atmosphere'
    },
    features: ['B1G1 Voucher Partner', 'Kalita Wave', 'Micro-lots'],
    aspectRatings: {
      coffee: 4.9,
      vibe: 4.7,
      wifiSpeed: '105M',
      plugs: 'Every table',
      service: 4.8
    },
    ratingBreakdown: {
      coffee: { score: 4.9, percent: 97 },
      ambience: { score: 4.7, percent: 94 },
      barista: { score: 4.8, percent: 96 },
      wifi: { score: 4.8, percent: 95 },
      value: { score: 4.6, percent: 92 }
    },
    lat: -6.231,
    lng: 106.81,
    menu: [
      {
        id: 'tr1',
        name: 'Ethiopia Yirgacheffe Washed',
        category: 'manual-brew',
        badge: 'Voucher Eligible',
        description: 'Floral jasmine tea with bright bergamot and lemon curd finish.',
        price: 'IDR 48k',
        tastingNotes: ['Bergamot', 'Jasmine', 'Lemon Peel']
      }
    ]
  }
];

export const MOCK_DISTRICTS: CoffeeDistrict[] = [
  {
    id: 'senopati',
    name: 'Senopati & Gunawarman',
    cafeCount: 28,
    partnerCount: 4,
    distance: '1.2 km',
    badge: 'COFFEE DISTRICT OF THE MONTH',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDFACTEaiIXGenV2dLKhK1rIvVqNdInqguOC2LM5l-oZGNRG1dE0lJl2K_BDL81dZijwMRyCLCX-ltpARPm9YeAzfefsv2Sv2PPgRHFqRoP9atxNT8yVqS_M6YYQgRuhza5dV9PSRdrz6JbnEFX9q35IA37xQi_1ZGvKc1rl86--9HoGZFQ61LvK7rL79SZgP_lolFen_xSnl0MqYegBUyVz9kLNNHCzoWwogRde1seb7jn1g7VlmW7Q',
    bannerText: 'COFFEE DISTRICT OF THE MONTH',
    tags: ['#ThirdWave', '#Vibrant', '#PourOverHub'],
    region: 'South Jakarta'
  },
  {
    id: 'scbd',
    name: 'SCBD & Senayan',
    cafeCount: 19,
    partnerCount: 3,
    distance: '1.8 km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyTEQynfSQZtVYtBZsBVWwNtJlWkZUQUUuyH439zJHsTXybDl5m_V_rvZzkPj3jkcKQrxqOibCW7Aui2cpvVKmOSnaW3bajykTqcWKOicYK7cQFoq617FS0kDmTXVU7OMAos5Jdk5V3uMMTj-8-3muDvKM3PM_Bwx6lRxC0NXXabc-L74N9Awg7jhIc7EVSSJUvuIy28jJMLeunnEbcoC_WlE7uXm_Fos7odZIa1Bp6UirypZT1_4_xg',
    bannerText: '98% cafes verified with >100Mbps',
    tags: ['#Workspace', '#SpecialtyEspresso', '#PowerOutlets'],
    region: 'South Jakarta'
  },
  {
    id: 'melawai',
    name: 'Panglima Polim & Melawai',
    cafeCount: 24,
    partnerCount: 5,
    distance: '2.4 km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABpOp4we4I45W2xwg5WAxMhjVY5RweFDsj-F65ql-VYmv6WCo79bI--f3LRuysyL6R1IBJxrXft9k4v1jNqbjq7PxB2om3BCvi39msqJPLSCcdnezIQa82aXMux7W-dAfD_5djHElmPeRYUq4hX8SBaJ3ku4m7phi7P0qnPRmmqK3DbYKlnxJ5LrSgCRazYK6GsCZHARAa5SRMPZKTlWSLskGEa4iObpL60ybq13cqbU_PomF62dSH3Q',
    bannerText: 'Quiet Slow-Bar Scene',
    tags: ['#SlowBar', '#JapaneseVibe', '#OrigamiDripper'],
    region: 'South Jakarta'
  },
  {
    id: 'kemang',
    name: 'Kemang & Bangka',
    cafeCount: 22,
    partnerCount: 3,
    distance: '3.1 km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3EFcwtAJwB6LV4vqnHPrcEaUO7BqhfD80yZE6GNJMocoJhbdSfa2kZkk4UDVqqLkCimKDmyGbjvYGYudhTdemnzYDAc7-DNU5MjGYgoGqyN5Jc5-WSGNJI9j4RwtCV8D3GofO5s0rrLcLm73hvOiFsYJ9WyE5iJ8vW9i7D1WU0xsb1pX83c2F0QETIcr0obSTMjz8pRGZ5x3SzYm6lqeKZ7yM2Qp4PL6TUZclFT4UPazZ8oaAETC9JA',
    bannerText: 'Greenery & Outdoor Seating',
    tags: ['#GardenCafe', '#PetFriendly', '#ColdBrewSpecialists'],
    region: 'South Jakarta'
  },
  {
    id: 'cipete',
    name: 'Cipete & Fatmawati',
    cafeCount: 31,
    partnerCount: 6,
    distance: '4.5 km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRuSMIGdeKAyambW4wfxshWciYxD4BWn7jDew2LFtI5g86Cux69nD6ApftGWFzfN2N7gPtcXsr3rRNX2Kemzp9Yundw_QS9L9t4tKtyyOy-U5bJuaNJ7f4EDvvIKOemf_ysYsLPWJJg0Apee3dnVweHmLy0H0XXPxByESeMeH1WCfr1NpFF9Efxo62AGla_Ce2Esx5wgCQXLExlQp0JSLMClh_MJbZkfmbK-vKWyLK4iIPefmJb3SBkA',
    bannerText: 'Famous 2km Coffee Corridor',
    tags: ['#CoffeeStrip', '#SingleOrigin', '#Affordable'],
    region: 'South Jakarta'
  },
  {
    id: 'menteng',
    name: 'Menteng & Cikini',
    cafeCount: 16,
    partnerCount: 2,
    distance: '5.2 km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIqtmvN2dnkXiLU-qnoFkS7fBewnEZndAQYalNL0Kv65eSlN-TjiDU_8ZtX8kqJHZ1a6ABrw8Od3rOmVf_NGcO1nimt-MeBHLQbL_5ZSAiMxpZdYp-6O3BsPhA-iB22c9HHcV-49PA0MwLTT6t1l6FF9eqcKZ2EQVSHQC5ily5L1KPhTHbEtroCTonZAweggPV-43jP5e_t3YRsAPDBVm7hrGOsd68ueZIH8V_zS5z86JM3i_oh1UH5g',
    bannerText: 'Architectural Preservation',
    tags: ['#Heritage', '#ClassicKopi', '#VintageVibe'],
    region: 'Central Jakarta'
  }
];

export const MOCK_CUPPING_POSTS: CuppingNote[] = [
  {
    id: 'post-1',
    authorName: 'Budi Santoso',
    authorHandle: '@budibrews',
    authorBadge: 'Q-Grader Apprentice',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnFpjnN_yYEShDEjcvk5EQtdgVzykuO-EzGI38eVj68LiVC_P6lIYjDPwvxPQCkepyV9Vi1b9-2bcWXnVmTcPaVpencA95pmmNq6xsNuYU6SbtRgknBzkG2Px0FXT5qdO04O5ReQts0ltqRcSENXhb1AmEA5r6nOZCvF8IFEWOnF5wDXnVEO2rokm1IalRl--wW6rezZayHyMo5qfijYjzC1D9r30s43jxTo9s_0A8sZs6ShMusngoqg',
    timeAgo: '25m ago',
    isVerified: true,
    cafeName: 'Tanamera Roastery',
    cafeLocation: 'Senopati',
    content: 'Dialed in this Aceh Gayo Anaerobic V60! 72h fermentation brings out explosive notes of red apple and jasmine honey. 22g in, 330g out, 2m45s brew time on Hario Switch. ☕️✨',
    brewRecipe: {
      method: 'Switch V60',
      dose: '22g : 330ml',
      temp: '92°C',
      time: '2m 45s'
    },
    scaScore: 87.5,
    sensoryScores: {
      acidity: 4,
      sweetness: 5,
      body: 3,
      aroma: 5
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLNatpW4IubB51Xf7paa-GpsAF3iOm5xYNy7BjO6RXmxBeNpX7P3kuiKGgqq9ahuwxI2XbiImf0hJqu_mPX0-_MkT9kRrHbCGyYfJ7tz05Kqpc72vHoDvIVzDMZO_TSQJdrMBucEzWnOxQIidIPDHvswuN95ifqasWOVTlt8OmxKjbmHPuE3Qfv9N1-KODWtcE07SIxXAkrwTjq1FbaBZMV64ZH3DMX_GAiQJRxEPxgjKj_pyr2UgeBw',
    imageBadge: 'Aceh Gayo Anaerobic',
    tags: ['#SingleOrigin', '#V60Brews', '#JakartaCoffee', '#TanameraRoastery'],
    likes: 42,
    comments: 8,
    userLiked: false,
    savedToPassport: false
  },
  {
    id: 'post-2',
    authorName: 'Rina Wijaya',
    authorHandle: '@rinacodes',
    authorBadge: 'Remote Roaster',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC7UJjonSo2hauXXMpOiyZh0oZ--NMv9y9hDnWyxSz-tYs7BJhL3vaP0tQffABhQHXEPlbXC3z0d-5jgUU7Pl338LzKJdobKCUv_nhwiaaNp_KDD979TAW_Khf9YjNQIX_KohbkMtvH5acL4BebenM3_y7_dSxNRgJbuNAEjYDD-qD2qteqUHSHe9RM7LXCyVwHO0Y60hopbT7Qst43CUSU7QkUhuQ1insnBAlnrIyD_hhujC3kk8Akw',
    timeAgo: '1h ago',
    isVerified: true,
    cafeName: 'Kroma Studio',
    cafeLocation: 'Senopati Mezzanine',
    content: "If you need to crank out deep work in Senopati, Kroma's upstairs mezzanine is unmatched today. Speedtest: 118 Mbps down, silent lo-fi beats, plenty of sockets. Oat flat white is top notch too. 🎧💻",
    workStats: {
      downloadMbps: 118,
      noiseDb: 51,
      noiseLabel: 'Whisper',
      socketRatio: '100%'
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZMy-uN_84UHpwIXJi6-FozARcETZak4Hq4gF3Y8AXZ-6gPVIXp_25sV3RYA-scAXhxQD8jzAPZpmdzh9SNkaPAADRlkRtBZvsizCA9uRsjuqTeZ8UKyR4FprN_TfA1ijptL3KZ5y3NxvJSdYlt2TSXENCF7tIbMNV7tmMdIp46XYVPL8SW88ESntvXJe4hAUXfB2ku2mROXvVMJkBjsW3bfltyFgtCzg9J6wk_Q8AlJYQwwcSIeF-4Q',
    imageBadge: 'Quiet Work Zone (Level 2)',
    tags: ['#RemoteWork', '#SpeedtestVerified', '#OatFlatWhite'],
    likes: 29,
    comments: 5,
    userLiked: false,
    savedToPassport: false
  }
];

export const MOCK_BADGES: BadgeItem[] = [
  {
    id: 'b1',
    title: 'Archipelago Explorer',
    category: 'origins',
    description: 'Tasted single-origins from 5 Indonesian islands (Sumatra, Java, Bali, Flores, Sulawesi).',
    status: 'Earned Oct 12, 2024',
    rarity: 'Rare',
    points: '+150 Pts',
    icon: 'explore',
    isUnlocked: true,
    earnedDate: 'Oct 12, 2024',
    lore: 'Indonesia harbors over 300 distinctive volcanic micro-climates. Having sampled lots across five primary islands, you possess a refined sensory benchmark for Indonesian terroir.'
  },
  {
    id: 'b2',
    title: 'African Highs',
    category: 'origins',
    description: 'Sampled 3 Ethiopian or Kenyan washed lots at partner roasters.',
    status: 'Earned Nov 04, 2024',
    rarity: 'Uncommon',
    points: '+120 Pts',
    icon: 'landscape',
    isUnlocked: true,
    earnedDate: 'Nov 04, 2024',
    lore: 'High-elevation East African coffees bring sparkling phosphoric acidity and bergamot florals that challenge conventional dark espresso palates.'
  },
  {
    id: 'b3',
    title: 'Anaerobic Alchemist',
    category: 'origins',
    description: 'Log 5 experimental carbonic maceration or anaerobic lots.',
    status: 'In Progress (3/5)',
    rarity: 'Rare',
    points: '+250 Pts',
    icon: 'science',
    isUnlocked: false,
    progressText: '3/5 logged',
    progressPercent: 60,
    lore: 'Anaerobic fermentation seals whole cherries in oxygen-deprived pressurized tanks, yielding explosive notes of bubblegum, dried dates, and dark plum.'
  },
  {
    id: 'b4',
    title: 'Geisha Connoisseur',
    category: 'origins',
    description: 'Taste any Panama or Colombian Geisha variety registered in the regional library.',
    status: 'Locked',
    rarity: 'Epic',
    points: '+400 Pts',
    icon: 'lock',
    isUnlocked: false,
    lore: 'Known as the champagne of specialty coffee, Geisha is legendary for delicate jasmine jasmine blossom aroma and crystalline tea-like mouthfeel.'
  },
  {
    id: 'b5',
    title: 'V60 Virtuoso',
    category: 'craft',
    description: 'Ordered or logged 10 manual V60 filter extractions with varied grind recipes.',
    status: 'Earned Sep 28, 2024',
    rarity: 'Common',
    points: '+100 Pts',
    icon: 'filter_vintage',
    isUnlocked: true,
    earnedDate: 'Sep 28, 2024',
    lore: 'The 60-degree cone and spiral ribs demand disciplined water pouring cadence and steady flow rate.'
  },
  {
    id: 'b6',
    title: 'AeroPress Pilot',
    category: 'craft',
    description: 'Log 3 inverted or championship standard AeroPress brews.',
    status: 'Earned Aug 15, 2024',
    rarity: 'Uncommon',
    points: '+90 Pts',
    icon: 'air',
    isUnlocked: true,
    earnedDate: 'Aug 15, 2024',
    lore: 'Fast immersion meets air-pressure filtration, unlocking clean sweetness with zero sediment.'
  },
  {
    id: 'b7',
    title: 'Syphon Alchemist',
    category: 'craft',
    description: 'Witness and taste a theatrical vacuum syphon brew.',
    status: 'Locked',
    rarity: 'Rare',
    points: '+200 Pts',
    icon: 'lock',
    isUnlocked: false,
    lore: 'Vapor pressure pushes boiling water into the upper chamber where coffee steeps in full immersion, creating exceptionally aromatic extractions.'
  },
  {
    id: 'b8',
    title: 'First Cupping Note',
    category: 'community',
    description: 'Wrote your first community sensory review with SCA score points.',
    status: 'Earned Jul 02, 2024',
    rarity: 'Common',
    points: '+50 Pts',
    icon: 'rate_review',
    isUnlocked: true,
    earnedDate: 'Jul 02, 2024',
    lore: 'Sharing sensory notes helps fellow coffee lovers locate the exact cup suited to their palate.'
  },
  {
    id: 'b9',
    title: 'Palate Twin',
    category: 'community',
    description: 'Get 10 agreements on your sensory tasting notes from fellow cuppers.',
    status: 'In Progress (7/10)',
    rarity: 'Uncommon',
    points: '+150 Pts',
    icon: 'handshake',
    isUnlocked: false,
    progressText: '7/10 agreements',
    progressPercent: 70,
    lore: 'Calibration between tasters is the gold standard of coffee cupping.'
  },
  {
    id: 'b10',
    title: 'Matcha Hunter',
    category: 'craft',
    description: 'Tried 5 authentic ceremonial matcha drinks across partner roasteries.',
    status: 'Earned Jun 2025',
    rarity: 'Uncommon',
    points: '+80 Pts',
    icon: 'emoji_food_beverage',
    isUnlocked: true,
    earnedDate: 'Jun 2025',
    lore: 'Ceremonial grade tencha leaves stone-ground into vibrant green umami nectar.'
  },
  {
    id: 'b11',
    title: 'Sprint Roaster',
    category: 'roasteries',
    description: 'Explored 5 distinct roasteries in a single calendar week.',
    status: 'Earned May 2025',
    rarity: 'Rare',
    points: '+160 Pts',
    icon: 'military_tech',
    isUnlocked: true,
    earnedDate: 'May 2025',
    lore: 'A true pilgrimage through Jakarta coffee strips.'
  },
  {
    id: 'b12',
    title: 'Night Owl Worker',
    category: 'community',
    description: 'Checked in after 8 PM with verified >50 Mbps cafe Wi-Fi.',
    status: 'Earned Apr 2025',
    rarity: 'Common',
    points: '+70 Pts',
    icon: 'bedtime',
    isUnlocked: true,
    earnedDate: 'Apr 2025',
    lore: 'Deep focus sessions fueled by cold brew and late evening jazz.'
  }
];
