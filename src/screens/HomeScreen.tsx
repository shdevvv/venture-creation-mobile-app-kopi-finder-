import React, { useState } from 'react';
import { Cafe, ScreenName } from '../types';

interface HomeScreenProps {
  cafes: Cafe[];
  savedCafeIds: string[];
  selectedDistrict?: string;
  onToggleSaveCafe: (cafeId: string) => void;
  onSelectCafe: (cafeId: string) => void;
  onNavigate: (screen: ScreenName) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  cafes,
  savedCafeIds,
  selectedDistrict,
  onToggleSaveCafe,
  onSelectCafe,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChip, setSelectedChip] = useState('All Cafes');
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  // Advanced Filter States
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'distance'>('recommended');

  const chips = [
    { id: 'all', label: 'All Cafes' },
    { id: 'work', label: 'Study & Work', icon: 'laptop' },
    { id: 'date', label: 'Date Spot', icon: 'favorite' },
    { id: 'read', label: 'Chill & Read', icon: 'menu_book' },
    { id: 'photo', label: 'Photoshoot', icon: 'photo_camera' },
    { id: 'roaster', label: 'Artisan Roaster', icon: 'local_cafe' },
    { id: 'pets', label: 'Pet Friendly', icon: 'pets' }
  ];

  const activeFiltersCount = 
    (selectedPrice !== 'all' ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    selectedFeatures.length +
    (sortBy !== 'recommended' ? 1 : 0);

  const resetFilters = () => {
    setSelectedPrice('all');
    setMinRating(0);
    setSelectedFeatures([]);
    setSortBy('recommended');
  };

  const toggleFeature = (feat: string) => {
    setSelectedFeatures((prev) => 
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const filteredCafes = cafes
    .filter((cafe) => {
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQuery =
          cafe.name.toLowerCase().includes(query) ||
          cafe.neighborhood.toLowerCase().includes(query) ||
          cafe.features.some((f) => f.toLowerCase().includes(query)) ||
          cafe.address.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Quick Chips Filter
      if (selectedChip !== 'All Cafes') {
        const query = selectedChip.toLowerCase();
        const matchesChip =
          cafe.features.some((f) => f.toLowerCase().includes(query)) ||
          (selectedChip === 'Study & Work' && (cafe.aspectRatings.wifiSpeed.includes('M') || cafe.aspectRatings.plugs.toLowerCase().includes('abundant') || cafe.aspectRatings.plugs.toLowerCase().includes('every'))) ||
          (selectedChip === 'Artisan Roaster' && (cafe.features.some((f) => f.toLowerCase().includes('roast')) || cafe.name.toLowerCase().includes('roaster'))) ||
          (selectedChip === 'Chill & Read' && (cafe.aspectRatings.vibe >= 4.5 || parseInt(cafe.keySpecs.noiseDb) <= 55)) ||
          (selectedChip === 'Pet Friendly' && cafe.features.some((f) => f.toLowerCase().includes('pet')));
        if (!matchesChip) return false;
      }

      // Price Filter
      if (selectedPrice !== 'all') {
        if (selectedPrice === '$' && !cafe.priceRange.includes('$ •') && !cafe.keySpecs.priceAvg.includes('25k')) return false;
        if (selectedPrice === '$$' && !cafe.priceRange.startsWith('$$')) return false;
        if (selectedPrice === '$$$' && !cafe.priceRange.startsWith('$$$')) return false;
      }

      // Minimum Rating Filter
      if (minRating > 0 && cafe.rating < minRating) {
        return false;
      }

      // Features / Amenities Filter
      if (selectedFeatures.length > 0) {
        for (const feat of selectedFeatures) {
          if (feat === 'wifi' && parseInt(cafe.aspectRatings.wifiSpeed) < 50) return false;
          if (feat === 'plugs' && !cafe.aspectRatings.plugs.toLowerCase().includes('abundant') && !cafe.aspectRatings.plugs.toLowerCase().includes('every') && !cafe.aspectRatings.plugs.toLowerCase().includes('many')) return false;
          if (feat === 'roaster' && !cafe.features.some((f) => f.toLowerCase().includes('roast')) && !cafe.name.toLowerCase().includes('roast')) return false;
          if (feat === 'pet' && !cafe.features.some((f) => f.toLowerCase().includes('pet'))) return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
      return 0;
    });

  return (
    <div className="flex flex-col w-full pb-28 bg-[#fdf9f3] relative">
      {/* Search & Filter Bar */}
      <section className="px-4 pt-2 pb-1 flex items-center gap-2">
        <div className="flex-1 flex items-center bg-[#f7f3ed] rounded-full px-4 h-12 shadow-xs transition-all focus-within:shadow-sm focus-within:bg-white border border-transparent focus-within:border-[#e6e2dc]">
          <span className="material-symbols-outlined text-[#504442] text-[22px] mr-2 shrink-0">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search artisanal beans, quiet cafes, manual brew..."
            className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-[#271310] placeholder:text-[#504442]/70 min-w-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-[#827472] hover:text-[#1c1c18]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            onClick={() => alert('Listening for coffee queries: e.g. "Find quiet V60 cafe with fast Wi-Fi"')}
            aria-label="Voice search"
            className="shrink-0 text-[#504442] hover:text-[#271310] transition-colors ml-1 p-1"
          >
            <span className="material-symbols-outlined text-[20px]">mic</span>
          </button>
        </div>

        <button
          onClick={() => setFilterModalOpen(true)}
          aria-label="Filter options"
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(62,39,35,0.08)] active:scale-95 transition-all shrink-0 border relative cursor-pointer ${
            activeFiltersCount > 0
              ? 'bg-[#3e2723] text-[#ffdcbd] border-[#3e2723]'
              : 'bg-white text-[#271310] border-[#e6e2dc] hover:bg-[#f7f3ed]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">tune</span>
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#c8f17a] text-[#131f00] rounded-full text-[10px] font-black flex items-center justify-center shadow-xs">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </section>

      {/* Mood & Purpose Filter Chips Carousel */}
      <section className="w-full py-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 px-4 whitespace-nowrap">
          {chips.map((chip) => {
            const isSelected = selectedChip === chip.label;
            return (
              <button
                key={chip.id}
                onClick={() => setSelectedChip(chip.label)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs active:scale-95 transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-[#3e2723] text-white'
                    : 'bg-white text-[#1c1c18] border border-[#e6e2dc] hover:bg-[#f7f3ed]'
                }`}
              >
                {isSelected && (
                  <span className="material-symbols-outlined text-[15px] text-[#ffdcbd]">check</span>
                )}
                {!isSelected && chip.icon && (
                  <span className="material-symbols-outlined text-[15px] text-[#7d562d]">{chip.icon}</span>
                )}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* B2B Promotional / Sponsored Banner */}
      <section className="px-4 my-1">
        <div className="relative overflow-hidden rounded-2xl bg-[#ebe8e2] p-4 shadow-[0_4px_20px_rgba(62,39,35,0.08)] flex items-center justify-between gap-3 border border-[#d3c3c0]/50">
          <div className="flex-1 min-w-0 z-10">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffca98] text-[#7a532a] text-[10px] font-bold uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-[12px]">verified</span>
              <span>Sponsored Perk</span>
            </div>
            <h2 className="font-headline-sm text-sm sm:text-base font-bold text-[#271310] leading-snug truncate">
              Two Roasters • B1G1 Manual Brew
            </h2>
            <p className="text-xs text-[#504442] mt-0.5 line-clamp-1">
              Flash deal today for KopiFinder members only
            </p>
            <button
              onClick={() => onNavigate('voucher')}
              className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#271310] text-white text-xs font-bold shadow-xs active:scale-95 transition-transform hover:opacity-90"
            >
              <span>Claim Deal</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>

          <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 shadow-inner">
            <img
              className="w-full h-full object-cover"
              alt="Artisanal pour over coffee filtered through V60"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGanJrqx648dAo9BkyFso6xcTE_nZKumHfLfekYFiUYV-LfaVtBxTbmjpvLBM6zKiMfpCvphA26tzgcjOJGLPI3dfVYW6CPfswZGh-3nZsTVokBoLbCdsb70aBBKhbsDPTrwEQKQspvlvnVpnalKC6fSlB9w6Eo7RRotfu3nB_3QUeOIHQbsaRMB_E4a5kFkik6eZJ0HmUzaJuANh36yBfN9qlotY92eOYxBElZohF-90fvKQGyRq11A"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3e2723]/30 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Trending Near You Header */}
      <section className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-base sm:text-lg font-bold text-[#271310]">
            Trending in {selectedDistrict ? selectedDistrict.split(',')[0] : 'Jakarta'}
          </h1>
          <p className="text-xs text-[#504442]">Selected by local roasters & remote workers</p>
        </div>
        <button
          onClick={() => onNavigate('districts')}
          className="text-xs font-bold text-[#7d562d] flex items-center gap-0.5 hover:underline cursor-pointer"
          title="Ganti Wilayah"
        >
          <span>Ganti Wilayah</span>
          <span className="material-symbols-outlined text-[15px]">location_city</span>
        </button>
      </section>

      {/* Feed Cards List */}
      <section className="px-4 flex flex-col gap-4">
        {filteredCafes.map((cafe) => {
          const isSaved = savedCafeIds.includes(cafe.id);
          return (
            <article
              key={cafe.id}
              onClick={() => onSelectCafe(cafe.id)}
              className="w-full bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(62,39,35,0.08)] flex flex-col transition-all cursor-pointer border border-[#f1ede7] active:scale-[0.99]"
            >
              {/* Cover Photo */}
              <div className="relative w-full h-44 overflow-hidden bg-[#e6e2dc]">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  alt={cafe.name}
                  src={cafe.images[0]}
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#271310] text-[11px] font-bold flex items-center gap-1 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#add461]"></span>
                    {cafe.hours}
                  </span>
                  {cafe.rating >= 4.9 && (
                    <span className="px-2.5 py-1 rounded-full bg-[#ffca98]/95 backdrop-blur-md text-[#7a532a] text-[11px] font-bold shadow-xs">
                      Staff Choice
                    </span>
                  )}
                  {cafe.verified && cafe.rating < 4.9 && (
                    <span className="px-2.5 py-1 rounded-full bg-[#213200]/90 backdrop-blur-md text-[#c8f17a] text-[11px] font-bold shadow-xs">
                      Top Roaster
                    </span>
                  )}
                </div>

                {/* Bookmark Button */}
                <button
                  aria-label="Save to passport"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSaveCafe(cafe.id);
                  }}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm active:scale-90 transition-transform ${
                    isSaved ? 'text-[#7d562d]' : 'text-[#504442]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {isSaved ? 'bookmark' : 'bookmark_border'}
                  </span>
                </button>

                {/* Bottom Scrim Badge */}
                <div className="absolute bottom-2.5 left-3 text-white">
                  <span className="px-2 py-0.5 rounded bg-[#3e2723]/85 backdrop-blur-sm text-[10px] font-bold">
                    {cafe.distance} • {cafe.neighborhood}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-headline-sm text-sm sm:text-base font-bold text-[#271310] truncate leading-tight">
                      {cafe.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="material-symbols-outlined text-[15px] text-[#7d562d]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="text-xs font-bold text-[#271310]">{cafe.rating}</span>
                      <span className="text-xs text-[#504442]">({cafe.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-[#f7f3ed] text-[#7d562d] text-[10px] font-bold shrink-0">
                    {cafe.priceRange}
                  </span>
                </div>

                {/* 5-Aspect Scores Grid */}
                <div className="grid grid-cols-5 gap-1 py-2 px-2.5 rounded-xl bg-[#f7f3ed] text-center border border-[#e6e2dc]/50">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-[#504442]">Coffee</span>
                    <div className="flex items-center gap-0.5 text-xs text-[#271310] font-bold mt-0.5">
                      <span>{cafe.aspectRatings.coffee}</span>
                      <span className="material-symbols-outlined text-[11px] text-[#7d562d]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-[#504442]">Vibe</span>
                    <div className="flex items-center gap-0.5 text-xs text-[#271310] font-bold mt-0.5">
                      <span>{cafe.aspectRatings.vibe}</span>
                      <span className="material-symbols-outlined text-[11px] text-[#7d562d]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-[#504442]">Wi-Fi</span>
                    <div className="flex items-center gap-0.5 text-[11px] text-[#7ca034] font-bold mt-0.5">
                      <span className="material-symbols-outlined text-[12px]">wifi</span>
                      <span>{cafe.aspectRatings.wifiSpeed}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-[#504442]">Plugs</span>
                    <div className="flex items-center gap-0.5 text-[11px] text-[#271310] font-bold mt-0.5 truncate max-w-[50px]">
                      <span className="material-symbols-outlined text-[12px] text-[#7d562d]">power</span>
                      <span className="truncate">{cafe.aspectRatings.plugs}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-[#504442]">Service</span>
                    <div className="flex items-center gap-0.5 text-xs text-[#271310] font-bold mt-0.5">
                      <span>{cafe.aspectRatings.service}</span>
                      <span className="material-symbols-outlined text-[11px] text-[#7d562d]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                  </div>
                </div>

                {/* Features Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  {cafe.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                        idx === 0
                          ? 'bg-[#ffdcbd]/50 text-[#2c1600]'
                          : 'bg-[#f1ede7] text-[#504442]'
                      }`}
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Daily Curated Staff Pick Mini-Banner */}
      <section className="px-4 my-4">
        <div
          onClick={() => onNavigate('bean-story')}
          className="relative overflow-hidden rounded-2xl bg-[#f1ede7] p-3.5 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-[#ebe8e2] transition-colors border border-[#e6e2dc]"
        >
          <div className="w-12 h-12 rounded-full bg-[#ffca98] flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[24px] text-[#7d562d]">local_fire_department</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-[#7d562d] text-[10px] font-bold uppercase tracking-wider">
              <span>Daily Curated Staff Pick</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-[#271310] truncate leading-tight">
              Try Flores Bajawa anaerobic natural
            </h4>
            <p className="text-[11px] text-[#504442] line-clamp-1">
              Notes of ripe plum, cacao nibs & wildflower honey
            </p>
          </div>
          <button
            aria-label="Explore bean profile"
            className="w-9 h-9 rounded-full bg-white text-[#271310] flex items-center justify-center shrink-0 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* FILTER BOTTOM SHEET / MODAL                             */}
      {/* ======================================================== */}
      {filterModalOpen && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          {/* Backdrop click to close */}
          <div 
            className="flex-1"
            onClick={() => setFilterModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="bg-[#fdf9f3] rounded-t-3xl p-5 shadow-2xl max-h-[85%] overflow-y-auto space-y-5 border-t border-[#e6e2dc] animate-in slide-in-from-bottom duration-300">
            {/* Modal Handle & Header */}
            <div>
              <div className="w-12 h-1 bg-[#d3c3c0] rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-headline-md text-base font-bold text-[#271310]">
                    Filter & Preferensi Kafe
                  </h3>
                  <p className="text-xs text-[#504442]">Sesuaikan dengan kebutuhan ngopi atau kerja Anda</p>
                </div>
                <button
                  onClick={() => setFilterModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#f1ede7] text-[#504442] hover:text-[#271310] flex items-center justify-center cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="text-xs font-bold text-[#271310] block mb-2">
                Urutkan Berdasarkan
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'recommended', label: 'Rekomendasi' },
                  { id: 'rating', label: 'Rating Tertinggi' },
                  { id: 'distance', label: 'Terdekat' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSortBy(item.id as any)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                      sortBy === item.id
                        ? 'bg-[#3e2723] text-white shadow-xs'
                        : 'bg-white text-[#504442] border border-[#e6e2dc] hover:bg-[#f7f3ed]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-xs font-bold text-[#271310] block mb-2">
                Kisaran Harga
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'all', label: 'Semua' },
                  { id: '$', label: '$ (Hemat)' },
                  { id: '$$', label: '$$ (Sedang)' },
                  { id: '$$$', label: '$$$ (Premium)' },
                ].map((price) => (
                  <button
                    key={price.id}
                    onClick={() => setSelectedPrice(price.id)}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                      selectedPrice === price.id
                        ? 'bg-[#3e2723] text-white shadow-xs'
                        : 'bg-white text-[#504442] border border-[#e6e2dc] hover:bg-[#f7f3ed]'
                    }`}
                  >
                    {price.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="text-xs font-bold text-[#271310] block mb-2">
                Rating Minimal
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 0, label: 'Semua' },
                  { value: 4.5, label: '⭐ 4.5+' },
                  { value: 4.8, label: '⭐ 4.8+' },
                ].map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setMinRating(r.value)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                      minRating === r.value
                        ? 'bg-[#3e2723] text-white shadow-xs'
                        : 'bg-white text-[#504442] border border-[#e6e2dc] hover:bg-[#f7f3ed]'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities & Features */}
            <div>
              <label className="text-xs font-bold text-[#271310] block mb-2">
                Fasilitas & Karakteristik
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'wifi', label: '⚡ Wi-Fi Kencang (>50M)' },
                  { id: 'plugs', label: '🔌 Banyak Colokan' },
                  { id: 'roaster', label: '☕ In-house Roastery' },
                  { id: 'pet', label: '🐾 Pet Friendly' },
                ].map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-2.5 rounded-xl text-xs font-medium text-left transition-all flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? 'bg-[#ffdcbd]/70 text-[#2c1600] font-bold border border-[#7d562d]/40'
                          : 'bg-white text-[#504442] border border-[#e6e2dc] hover:bg-[#f7f3ed]'
                      }`}
                    >
                      <span>{feat.label}</span>
                      <span className="material-symbols-outlined text-[16px]">
                        {isChecked ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#f1ede7] text-[#504442] font-bold text-xs hover:bg-[#ebe8e2] transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setFilterModalOpen(false)}
                className="flex-[2] py-3 px-4 rounded-2xl bg-[#3e2723] text-[#ffdcbd] font-bold text-xs shadow-md hover:bg-[#271310] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Terapkan Filter</span>
                <span className="px-2 py-0.5 rounded-full bg-[#c8f17a] text-[#131f00] text-[10px] font-black">
                  {filteredCafes.length} Kafe
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
