import React, { useState } from 'react';
import { Cafe, ScreenName } from '../types';

interface HomeScreenProps {
  cafes: Cafe[];
  savedCafeIds: string[];
  onToggleSaveCafe: (cafeId: string) => void;
  onSelectCafe: (cafeId: string) => void;
  onNavigate: (screen: ScreenName) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  cafes,
  savedCafeIds,
  onToggleSaveCafe,
  onSelectCafe,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChip, setSelectedChip] = useState('Study & Work');
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const chips = [
    { id: 'all', label: 'All Cafes' },
    { id: 'work', label: 'Study & Work', icon: 'check' },
    { id: 'date', label: 'Date Spot', icon: 'favorite' },
    { id: 'read', label: 'Chill & Read', icon: 'menu_book' },
    { id: 'photo', label: 'Photoshoot', icon: 'photo_camera' },
    { id: 'roaster', label: 'Artisan Roaster', icon: 'local_cafe' },
    { id: 'pets', label: 'Pet Friendly', icon: 'pets' }
  ];

  const filteredCafes = cafes.filter((cafe) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      cafe.name.toLowerCase().includes(query) ||
      cafe.neighborhood.toLowerCase().includes(query) ||
      cafe.features.some((f) => f.toLowerCase().includes(query)) ||
      cafe.address.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col w-full pb-28 bg-[#fdf9f3]">
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
          onClick={() => setFilterModalOpen(!filterModalOpen)}
          aria-label="Filter options"
          className="w-12 h-12 rounded-full bg-white text-[#271310] flex items-center justify-center shadow-[0_4px_20px_rgba(62,39,35,0.08)] active:scale-95 transition-transform shrink-0 border border-[#e6e2dc]"
        >
          <span className="material-symbols-outlined text-[22px]">tune</span>
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
            Trending Near You
          </h1>
          <p className="text-xs text-[#504442]">Selected by local roasters & remote workers</p>
        </div>
        <button
          onClick={() => onNavigate('map')}
          className="text-xs font-bold text-[#7d562d] flex items-center gap-0.5 hover:underline"
        >
          <span>Map View</span>
          <span className="material-symbols-outlined text-[17px]">map</span>
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
                  {cafe.id === 'tanamera' && (
                    <span className="px-2.5 py-1 rounded-full bg-[#ffca98]/95 backdrop-blur-md text-[#7a532a] text-[11px] font-bold shadow-xs">
                      Staff Choice
                    </span>
                  )}
                  {cafe.id === 'giyanti' && (
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
    </div>
  );
};
