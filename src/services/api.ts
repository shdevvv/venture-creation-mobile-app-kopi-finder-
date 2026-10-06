import { Cafe, UserProfile } from '../types';

const API_BASE = '/api';

export const api = {
  // 1. Health check
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  // 2. Cafes list with filtering
  async getCafes(params?: {
    search?: string;
    district?: string;
    price?: string;
    minRating?: number;
    feature?: string;
    sortBy?: string;
  }): Promise<Cafe[]> {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.district && params.district !== 'all') query.append('district', params.district);
    if (params?.price && params.price !== 'all') query.append('price', params.price);
    if (params?.minRating) query.append('minRating', params.minRating.toString());
    if (params?.feature) query.append('feature', params.feature);
    if (params?.sortBy) query.append('sortBy', params.sortBy);

    const res = await fetch(`${API_BASE}/cafes?${query.toString()}`);
    const json = await res.json();
    return json.data || [];
  },

  // 3. Single cafe detail
  async getCafeById(id: string): Promise<Cafe | null> {
    const res = await fetch(`${API_BASE}/cafes/${id}`);
    const json = await res.json();
    return json.data || null;
  },

  // 4. User profile & stats
  async getUser(): Promise<UserProfile | null> {
    const res = await fetch(`${API_BASE}/user`);
    const json = await res.json();
    return json.data || null;
  },

  // 5. Toggle bookmark
  async toggleBookmark(cafeId: string): Promise<{ isSaved: boolean }> {
    const res = await fetch(`${API_BASE}/user/bookmark`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cafeId }),
    });
    return res.json();
  },

  // 6. Claim passport stamp
  async claimStamp(cafeId: string, cafeName: string) {
    const res = await fetch(`${API_BASE}/stamps`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cafeId, cafeName }),
    });
    return res.json();
  },

  // 7. Submit cupping review
  async submitReview(data: {
    cafeId: string;
    cafeName: string;
    beanName: string;
    brewMethod: string;
    tastingNotes: string[];
    content: string;
    coffeeRating: number;
    ambienceRating: number;
    wifiRating: number;
  }) {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // 8. AI matchmaker
  async matchAI(preferences: {
    mood: string;
    budget: string;
    amenities: string[];
    brewMethod: string;
  }) {
    const res = await fetch(`${API_BASE}/ai/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferences),
    });
    return res.json();
  },
};
