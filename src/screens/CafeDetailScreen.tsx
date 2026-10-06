import React, { useState } from 'react';
import { Cafe, ScreenName } from '../types';

interface CafeDetailScreenProps {
  cafe: Cafe;
  isSaved: boolean;
  onToggleSave: () => void;
  onNavigate: (screen: ScreenName) => void;
}

export const CafeDetailScreen: React.FC<CafeDetailScreenProps> = ({
  cafe,
  isSaved,
  onToggleSave,
  onNavigate
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('coffee');
  const [showToast, setShowToast] = useState<string | null>(null);

  const menuCategories = [
    { id: 'all', label: 'All' },
    { id: 'coffee', label: 'Coffee' },
    { id: 'manual-brew', label: 'Manual Brew' },
    { id: 'non-coffee', label: 'Non-Coffee' },
    { id: 'light-bites', label: 'Light Bites' }
  ];

  const filteredMenu = cafe.menu.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2000);
  };

  return (
    <div className="flex flex-col w-full pb-28 bg-[#fdf9f3]">
      {/* Toast Alert */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#271310] text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in">
          <span className="material-symbols-outlined text-[16px] text-[#ffca98]">check_circle</span>
          <span>{showToast}</span>
        </div>
      )}

      {/* 1. Hero Media Carousel */}
      <div className="relative w-full overflow-hidden bg-[#ebe8e2]">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            key={activeImageIndex}
            className="w-full h-full object-cover transition-all duration-300"
            alt={cafe.name}
            src={cafe.images[activeImageIndex] || cafe.images[0]}
          />

          {/* Scrim Gradients */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#271310]/50 to-transparent pointer-events-none"></div>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#271310]/80 via-[#271310]/30 to-transparent pointer-events-none"></div>

          {/* Status & Badges Overlays */}
          <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-1 bg-[#c8f17a]/90 backdrop-blur-md px-3 py-1 rounded-full shadow-xs">
              <span className="material-symbols-outlined text-[14px] text-[#364e00]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span className="text-[10px] font-bold text-[#364e00] tracking-wider uppercase">
                Verified Roaster
              </span>
            </div>

            <button
              onClick={onToggleSave}
              className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md active:scale-90 transition-transform ${
                isSaved ? 'text-[#7d562d]' : 'text-[#271310]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                bookmark
              </span>
            </button>
          </div>

          {/* Bottom Carousel Badges & Indicators */}
          <div className="absolute bottom-3 inset-x-4 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#7ca034] animate-pulse"></span>
              <span className="text-xs font-bold text-[#271310]">Open Now</span>
              <span className="text-[#d3c3c0] text-xs">•</span>
              <span className="text-xs font-medium text-[#504442]">Closes 10:00 PM</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#271310]/70 backdrop-blur-md rounded-full pointer-events-auto">
              {cafe.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`rounded-full transition-all ${
                    activeImageIndex === idx
                      ? 'w-3 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col gap-5 px-4 pt-4">
        {/* 2. Title & Key Specs Ribbon */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <h1 className="font-headline-lg text-xl sm:text-2xl font-bold text-[#271310] tracking-tight">
                {cafe.name}
              </h1>
              <div className="flex items-center gap-1 mt-1 text-[#504442] flex-wrap">
                <span className="material-symbols-outlined text-[16px] text-[#7d562d]">location_on</span>
                <span className="text-xs">{cafe.address}</span>
                <span className="text-[10px] font-bold bg-[#ffdcbd] text-[#2c1600] px-2 py-0.5 rounded-full ml-1">
                  400m
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Pill Row */}
          <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar">
            {cafe.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 bg-[#f1ede7] px-3 py-1.5 rounded-full shrink-0"
              >
                <span className="material-symbols-outlined text-[16px] text-[#7d562d]">
                  {idx === 0 ? 'local_cafe' : idx === 1 ? 'power' : 'pets'}
                </span>
                <span className="text-xs font-semibold text-[#271310]">{feat}</span>
              </div>
            ))}
          </div>

          {/* Key Specs Ribbon (3 Cards) */}
          <div className="grid grid-cols-3 gap-2 mt-1">
            <div className="flex flex-col p-3 rounded-xl bg-[#f7f3ed] shadow-xs border border-[#e6e2dc]/50">
              <div className="flex items-center gap-1 text-[#7d562d] mb-1">
                <span className="material-symbols-outlined text-[17px]">payments</span>
                <span className="text-[10px] font-bold uppercase">Price</span>
              </div>
              <span className="text-xs font-bold text-[#271310] truncate">{cafe.keySpecs.priceAvg}</span>
              <span className="text-[10px] text-[#504442] truncate">IDR / cup avg</span>
            </div>

            <div className="flex flex-col p-3 rounded-xl bg-[#f7f3ed] shadow-xs border border-[#e6e2dc]/50">
              <div className="flex items-center gap-1 text-[#7d562d] mb-1">
                <span className="material-symbols-outlined text-[17px]">wifi</span>
                <span className="text-[10px] font-bold uppercase">Wi-Fi</span>
              </div>
              <span className="text-xs font-bold text-[#271310] truncate">{cafe.keySpecs.wifiSpeed}</span>
              <span className="text-[10px] text-[#504442] truncate">{cafe.keySpecs.wifiLabel}</span>
            </div>

            <div className="flex flex-col p-3 rounded-xl bg-[#f7f3ed] shadow-xs border border-[#e6e2dc]/50">
              <div className="flex items-center gap-1 text-[#7d562d] mb-1">
                <span className="material-symbols-outlined text-[17px]">volume_down</span>
                <span className="text-[10px] font-bold uppercase">Noise</span>
              </div>
              <span className="text-xs font-bold text-[#271310] truncate">{cafe.keySpecs.noiseDb}</span>
              <span className="text-[10px] text-[#504442] truncate">{cafe.keySpecs.noiseLabel}</span>
            </div>
          </div>
        </div>

        {/* 3. Multi-Aspect Rating Dashboard */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(62,39,35,0.06)] flex flex-col gap-4 border border-[#f1ede7]">
          {/* Top Score Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#f1ede7]">
            <div className="flex items-center gap-3">
              <div className="w-13 h-13 p-2 rounded-xl bg-[#3e2723] text-white flex flex-col items-center justify-center shadow-sm">
                <div className="flex items-center leading-none">
                  <span className="text-base font-bold">4.8</span>
                  <span className="material-symbols-outlined text-[14px] text-[#ffdcbd] ml-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                </div>
                <span className="text-[9px] text-[#e3beb8] uppercase tracking-wider font-bold mt-0.5">Score</span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#271310]">Master Grade Cafe</span>
                <div className="flex items-center gap-1 text-[#504442]">
                  <span className="text-xs">Based on {cafe.reviewCount} verified bean lovers</span>
                  <span className="material-symbols-outlined text-[14px] text-[#7ca034]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified_user
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Star Meter Breakdowns with Progress Bars */}
          <div className="flex flex-col gap-2.5">
            {/* Metric 1 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#271310]">
                  <span>☕</span>
                  <span>Coffee Quality & Roast Profile</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-[#271310]">
                  <span>4.9</span>
                  <span className="text-[#504442] font-normal text-[11px]">(98%)</span>
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-[#f1ede7] overflow-hidden">
                <div className="h-full rounded-full bg-[#271310]" style={{ width: '98%' }}></div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#271310]">
                  <span>🪴</span>
                  <span>Ambience & Seating Comfort</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-[#271310]">
                  <span>4.9</span>
                  <span className="text-[#504442] font-normal text-[11px]">(96%)</span>
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-[#f1ede7] overflow-hidden">
                <div className="h-full rounded-full bg-[#7d562d]" style={{ width: '96%' }}></div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#271310]">
                  <span>🤝</span>
                  <span>Barista Craft & Hospitality</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-[#271310]">
                  <span>4.6</span>
                  <span className="text-[#504442] font-normal text-[11px]">(92%)</span>
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-[#f1ede7] overflow-hidden">
                <div className="h-full rounded-full bg-[#f0bd8b]" style={{ width: '92%' }}></div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#271310]">
                  <span>📶</span>
                  <span>Wi-Fi & Work Productivity</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-[#271310]">
                  <span>4.8</span>
                  <span className="text-[#504442] font-normal text-[11px]">(95%)</span>
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-[#f1ede7] overflow-hidden">
                <div className="h-full rounded-full bg-[#271310]" style={{ width: '95%' }}></div>
              </div>
            </div>

            {/* Metric 5 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#271310]">
                  <span>🏷️</span>
                  <span>Value for Price</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-[#271310]">
                  <span>4.3</span>
                  <span className="text-[#504442] font-normal text-[11px]">(86%)</span>
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-[#f1ede7] overflow-hidden">
                <div className="h-full rounded-full bg-[#d3c3c0]" style={{ width: '86%' }}></div>
              </div>
            </div>
          </div>

          {/* Verified Review Prompt Box */}
          <div className="mt-1 flex items-center justify-between p-3 rounded-xl bg-[#f7f3ed] border border-[#e6e2dc]/50">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[20px] text-[#7d562d] shrink-0">
                rate_review
              </span>
              <span className="text-xs text-[#271310] truncate font-medium">
                Brewed here recently? Share cupping notes.
              </span>
            </div>
            <button
              onClick={() => onNavigate('log-visit')}
              className="shrink-0 text-xs font-bold text-[#7d562d] bg-white px-3 py-1.5 rounded-full shadow-xs active:scale-95 transition-transform"
            >
              Write Cupping
            </button>
          </div>
        </div>

        {/* 4. Interactive Menu Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-[#271310]">menu_book</span>
              <h2 className="font-headline-sm text-base font-bold text-[#271310]">Craft Brews & Bites</h2>
            </div>
            <span className="text-[10px] font-bold text-[#504442] uppercase tracking-wider">
              Curated Fresh
            </span>
          </div>

          {/* Menu Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#271310] text-white shadow-xs'
                    : 'bg-[#f1ede7] text-[#504442] hover:text-[#271310]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Items Card Stack */}
          <div className="flex flex-col gap-3">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-white shadow-[0_4px_20px_rgba(62,39,35,0.06)] flex flex-col gap-2 border border-[#f1ede7]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-xs sm:text-sm font-bold text-[#271310]">{item.name}</h3>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            item.badgeType === 'staff-pick'
                              ? 'bg-[#ffca98] text-[#2c1600]'
                              : 'bg-[#c8f17a] text-[#131f00]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#504442]">{item.description}</p>
                  </div>
                  <span className="font-bold text-sm text-[#271310] shrink-0">{item.price}</span>
                </div>

                {/* Tasting Notes Pill Container */}
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  {item.tastingNotes.map((note, nIdx) => (
                    <span
                      key={nIdx}
                      className="text-[10px] font-semibold text-[#2c1600] bg-[#ffdcbd]/50 px-2 py-0.5 rounded-full flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7d562d]"></span>
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Spatial Vibe */}
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#271310]">Location & Spatial Vibe</h3>
            <button
              onClick={() => triggerToast('Opening Senopati street guide')}
              className="text-xs font-bold text-[#7d562d]"
            >
              View Street Guide
            </button>
          </div>
          <div
            className="w-full h-36 bg-cover bg-center rounded-xl relative overflow-hidden shadow-xs flex items-end p-3"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCscyUvNYwHdJq7hm6VoSsyydf2lzeduDtkjxrRZTeLXdzj0PAdCzI1CwOMpetig5XeHTNDh0E74o0BdGeKTBdgRWwy5eCxaM63ICPsfDZNCHIdSddL5r_q30cX0XpyQN2EedV2fwBEYdXxkVP8BQ9FAs4bZmiSgWI9KjUvB6T5ODuFANoj_d5v0NjuZV7R3tGh0N_a4M1PJdwZZ6HTVcaHkeswXxdpoTUGZshPcDTJL5LtgZxKNiCVUA')`
            }}
          >
            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[17px] text-[#7d562d]">explore</span>
              <span className="text-xs font-bold text-[#271310]">Corner of Jl. Senopati & Cikatomas</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Floating Action Footer CTA Bar */}
      <div className="sticky bottom-0 inset-x-0 z-30 bg-[#fdf9f3]/95 backdrop-blur-xl shadow-[0_-8px_24px_rgba(62,39,35,0.12)] px-4 py-3 pb-safe border-t border-[#f1ede7] mt-4">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          {/* Directions */}
          <button
            onClick={() => triggerToast('Routing walking directions (4 min walk)...')}
            className="flex-1 h-12 rounded-xl bg-[#f1ede7] text-[#271310] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-xs hover:bg-[#ebe8e2]"
          >
            <span className="material-symbols-outlined text-[18px] text-[#7d562d]">near_me</span>
            <span>Directions</span>
          </button>

          {/* Log Visit / Rate */}
          <button
            onClick={() => onNavigate('log-visit')}
            className="flex-1 h-12 rounded-xl bg-[#3e2723] text-[#ffdcbd] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-md hover:opacity-95"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ffdcbd]" style={{ fontVariationSettings: "'FILL' 1" }}>
              add_location_alt
            </span>
            <span>Log Visit / Rate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
