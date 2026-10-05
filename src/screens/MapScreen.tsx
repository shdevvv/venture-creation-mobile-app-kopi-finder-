import React, { useState } from 'react';
import { Cafe, ScreenName } from '../types';

interface MapScreenProps {
  cafes: Cafe[];
  savedCafeIds: string[];
  onToggleSaveCafe: (cafeId: string) => void;
  onSelectCafe: (cafeId: string) => void;
  onNavigate: (screen: ScreenName) => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({
  cafes,
  savedCafeIds,
  onToggleSaveCafe,
  onSelectCafe,
  onNavigate
}) => {
  const [selectedPinId, setSelectedPinId] = useState<string>('tanamera');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('wifi');
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2000);
  };

  const selectedCafe = cafes.find((c) => c.id === selectedPinId) || cafes[0];
  const isSaved = savedCafeIds.includes(selectedCafe.id);

  return (
    <div className="flex flex-col w-full relative h-[calc(100vh-3.5rem)] overflow-hidden select-none bg-[#f7f3ed]">
      {/* Toast Alert */}
      {showToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#271310] text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in">
          <span className="material-symbols-outlined text-[16px] text-[#ffca98]">check_circle</span>
          <span>{showToast}</span>
        </div>
      )}

      {/* Vector SVG Map Canvas Background */}
      <div className="absolute inset-0 w-full h-full bg-[#f7f3ed] overflow-hidden">
        <svg
          className="w-full h-full object-cover"
          fill="none"
          viewBox="0 0 400 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="#F7F3ED" height="800" width="400" />
          
          {/* Urban Parks / Senayan Greenery Area */}
          <path d="M-20,40 C60,40 120,70 140,140 C150,190 90,260 20,290 C-30,310 -60,240 -60,120 Z" fill="#E6EBD6" opacity="0.65" />
          <path d="M280,360 C330,340 390,370 420,410 C440,450 410,520 360,540 C310,550 270,500 270,440 Z" fill="#E6EBD6" opacity="0.5" />
          <path d="M30,680 C80,670 150,710 160,770 C160,820 90,850 40,840 C-10,830 -20,760 0,700 Z" fill="#E6EBD6" opacity="0.4" />

          {/* Secondary Arterials (Gunawarman, Cikajang, Senopati grids) */}
          <g stroke="#EFE9E0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12">
            <path d="M-10,180 L420,230" />
            <path d="M40,0 L70,820" />
            <path d="M220,-20 L190,820" />
            <path d="M-30,490 L420,460" />
            <path d="M-20,640 L430,660" />
            <path d="M310,80 L350,820" />
          </g>

          {/* Main Roads / Avenues */}
          <g stroke="#E4DCD0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6">
            <path d="M-20,260 C120,280 200,320 420,330" />
            <path d="M120,-30 C130,220 180,410 140,820" />
            <path d="M-10,410 C140,390 280,430 420,410" />
            <path d="M270,120 C250,340 310,560 290,820" />
            <path d="M30,580 C180,560 260,620 420,600" />
          </g>

          {/* Tertiary Connecting Alleys */}
          <g stroke="#DCD3C5" strokeDasharray="4 3" strokeWidth="2.5">
            <path d="M120,280 L220,210" />
            <path d="M140,400 L270,360" />
            <path d="M160,570 L260,500" />
            <path d="M60,350 L140,340" />
          </g>

          {/* Area Labels */}
          <text fill="#B2A89C" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="9" fontWeight="700" letterSpacing="0.18em" x="145" y="195">
            SENOPATI
          </text>
          <text fill="#B2A89C" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="9" fontWeight="700" letterSpacing="0.18em" x="215" y="380">
            GUNAWARMAN
          </text>
          <text fill="#B2A89C" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="9" fontWeight="700" letterSpacing="0.18em" x="80" y="525">
            CIKAJANG
          </text>
          <text fill="#A8B490" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="9" fontWeight="700" letterSpacing="0.15em" x="28" y="110">
            SCBD PARK
          </text>

          {/* Current GPS Radar Pulse */}
          <g transform="translate(145, 410)">
            <circle cx="0" cy="0" r="22" fill="#D4A373" fillOpacity="0.2">
              <animate attributeName="r" dur="2.8s" repeatCount="indefinite" values="14;28;14" />
              <animate attributeName="opacity" dur="2.8s" repeatCount="indefinite" values="0.6;0.1;0.6" />
            </circle>
            <circle cx="0" cy="0" r="7" fill="#7D562D" />
            <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
            {/* Heading Cone */}
            <path d="M0,-8 L5,-18 L-5,-18 Z" fill="#7D562D" opacity="0.85" />
          </g>
        </svg>

        {/* Custom Interactive Pins */}
        {/* PIN 1: Anomali Coffee */}
        <button
          onClick={() => setSelectedPinId('anomali')}
          className={`absolute top-[210px] left-[75px] -translate-x-1/2 -translate-y-full flex flex-col items-center group transition-transform active:scale-95 focus:outline-none z-10`}
        >
          <div
            className={`px-2 py-1 rounded-full shadow-[0_4px_16px_rgba(62,39,35,0.14)] flex items-center gap-1 transition-all ${
              selectedPinId === 'anomali'
                ? 'bg-[#3e2723] text-white scale-105'
                : 'bg-white text-[#271310] hover:bg-[#f1ede7]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7d562d]"></span>
            <span className="text-[10px] font-bold">Anomali</span>
            <span className="text-[10px] text-[#7d562d] font-bold">4.7★</span>
          </div>
          <div className="w-2 h-2 bg-white rotate-45 -mt-1 shadow-xs"></div>
        </button>

        {/* PIN 2: Giyanti Coffee Roastery */}
        <button
          onClick={() => setSelectedPinId('giyanti')}
          className="absolute top-[175px] right-[45px] -translate-x-1/2 -translate-y-full flex flex-col items-center group transition-transform active:scale-95 focus:outline-none z-10"
        >
          <div
            className={`px-2.5 py-1 rounded-full shadow-[0_4px_16px_rgba(62,39,35,0.14)] flex items-center gap-1.5 transition-all ${
              selectedPinId === 'giyanti'
                ? 'bg-[#3e2723] text-white scale-105'
                : 'bg-white text-[#271310] hover:bg-[#f1ede7]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#7ca034] animate-pulse"></span>
            <span className="text-[10px] font-bold">Giyanti</span>
            <span className="text-[10px] text-[#7d562d] font-bold">4.8★</span>
          </div>
          <div className="w-2 h-2 bg-white rotate-45 -mt-1 shadow-xs"></div>
        </button>

        {/* PIN 3: ACTIVE PIN - Tanamera Specialty Roastery */}
        <div
          onClick={() => setSelectedPinId('tanamera')}
          className="absolute top-[320px] left-[185px] -translate-x-1/2 -translate-y-full flex flex-col items-center z-20 cursor-pointer"
        >
          {/* Pulsing Aura Halo */}
          <div className="absolute -top-1 w-14 h-14 rounded-full bg-[#ffca98]/40 -translate-y-1/2 animate-ping pointer-events-none"></div>

          {/* Popover Label */}
          <div
            className={`relative px-3 py-1.5 rounded-2xl shadow-[0_8px_24px_rgba(62,39,35,0.3)] flex items-center gap-2 transition-transform ${
              selectedPinId === 'tanamera'
                ? 'bg-[#3e2723] text-white scale-105'
                : 'bg-white text-[#271310]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-[#ffca98]" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_cafe
            </span>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold leading-tight">Tanamera Roastery</span>
                <span className="bg-[#7d562d] text-white text-[8px] font-bold px-1 rounded">4.9★</span>
              </div>
              <span className="text-[9px] text-[#ae8d87] leading-none">IDR 35k+ • 110M Wi-Fi</span>
            </div>
          </div>

          {/* Stem & Shadow */}
          <div className="w-3 h-3 bg-[#3e2723] rotate-45 -mt-1.5 rounded-xs shadow-xs"></div>
          <div className="w-3 h-1.5 bg-[#271310]/20 rounded-full blur-[1px] mt-0.5"></div>
        </div>

        {/* PIN 4: Kroma Studio */}
        <button
          onClick={() => setSelectedPinId('kroma')}
          className="absolute top-[480px] left-[95px] -translate-x-1/2 -translate-y-full flex flex-col items-center group transition-transform active:scale-95 focus:outline-none z-10"
        >
          <div
            className={`px-2.5 py-1 rounded-full shadow-[0_4px_16px_rgba(62,39,35,0.12)] flex items-center gap-1.5 transition-all ${
              selectedPinId === 'kroma'
                ? 'bg-[#3e2723] text-white scale-105'
                : 'bg-white text-[#271310] hover:bg-[#f1ede7]'
            }`}
          >
            <span className="material-symbols-outlined text-[13px] text-[#7d562d]">laptop_mac</span>
            <span className="text-[10px] font-bold">Kroma Studio</span>
            <span className="bg-[#ebe8e2] text-[#504442] text-[9px] px-1 rounded font-bold">4.9★</span>
          </div>
          <div className="w-2 h-2 bg-white rotate-45 -mt-1 shadow-xs"></div>
        </button>

        {/* PIN 5: First Crack Coffee */}
        <button
          onClick={() => triggerToast('First Crack Coffee • Cikajang selected')}
          className="absolute top-[520px] right-[80px] -translate-x-1/2 -translate-y-full flex flex-col items-center group transition-transform active:scale-95 focus:outline-none z-10"
        >
          <div className="bg-white text-[#271310] px-2 py-1 rounded-full shadow-[0_4px_16px_rgba(62,39,35,0.12)] flex items-center gap-1 hover:bg-[#f1ede7] transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7d562d]"></span>
            <span className="text-[10px] font-bold">First Crack</span>
            <span className="text-[10px] text-[#7d562d] font-bold">4.6★</span>
          </div>
          <div className="w-2 h-2 bg-white rotate-45 -mt-1"></div>
        </button>
      </div>

      {/* Floating Top Bar: Search & Quick Amenities Filter */}
      <div className="relative z-30 pt-3 px-4 flex flex-col gap-2 pointer-events-none">
        {/* Search Bar */}
        <div className="pointer-events-auto w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_6px_22px_rgba(62,39,35,0.1)] p-1.5 flex items-center gap-2 border border-[#e6e2dc]/60">
          <div className="w-9 h-9 rounded-xl bg-[#ffdcbd]/50 flex items-center justify-center text-[#271310] shrink-0">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              coffee
            </span>
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cafes in Senopati, beans, wi-fi..."
              className="w-full bg-transparent border-none text-[#271310] placeholder-[#504442] text-xs sm:text-sm font-medium focus:outline-none truncate"
            />
          </div>
          <button
            onClick={() => triggerToast('Recalibrating GPS location...')}
            aria-label="Locate me"
            className="w-9 h-9 rounded-xl text-[#504442] hover:text-[#271310] hover:bg-[#f7f3ed] flex items-center justify-center transition-colors active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">near_me</span>
          </button>
        </div>

        {/* Filter Pills Carousel */}
        <div className="pointer-events-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
          <button
            onClick={() => setActiveFilter(activeFilter === 'wifi' ? '' : 'wifi')}
            className={`shrink-0 h-8 px-3 rounded-full flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 text-xs font-semibold ${
              activeFilter === 'wifi'
                ? 'bg-[#3e2723] text-white'
                : 'bg-white/90 text-[#1c1c18] border border-[#e6e2dc]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] text-[#ffca98]">wifi</span>
            <span>&gt;80 Mbps</span>
            <span className="w-4 h-4 rounded-full bg-[#7d562d] text-white text-[9px] font-bold flex items-center justify-center ml-0.5">
              8
            </span>
          </button>

          <button
            onClick={() => setActiveFilter(activeFilter === 'plugs' ? '' : 'plugs')}
            className={`shrink-0 h-8 px-3 rounded-full flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 text-xs font-semibold ${
              activeFilter === 'plugs'
                ? 'bg-[#3e2723] text-white'
                : 'bg-white/90 text-[#1c1c18] border border-[#e6e2dc]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] text-[#ffca98]">power</span>
            <span>Plugs Plenty</span>
          </button>

          <button
            onClick={() => setActiveFilter(activeFilter === 'quiet' ? '' : 'quiet')}
            className={`shrink-0 h-8 px-3 rounded-full flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 text-xs font-semibold ${
              activeFilter === 'quiet'
                ? 'bg-[#3e2723] text-white'
                : 'bg-white/90 text-[#1c1c18] border border-[#e6e2dc]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] text-[#7d562d]">volume_off</span>
            <span>&lt;55 dB Quiet</span>
          </button>

          <button
            onClick={() => setActiveFilter(activeFilter === 'open' ? '' : 'open')}
            className="shrink-0 h-8 px-3 rounded-full bg-white/90 backdrop-blur-md text-[#1c1c18] border border-[#e6e2dc] flex items-center gap-1.5 shadow-xs text-xs font-semibold hover:bg-[#f1ede7]"
          >
            <span className="w-2 h-2 rounded-full bg-[#7ca034]"></span>
            <span>Open Now</span>
          </button>

          <button
            onClick={() => setActiveFilter(activeFilter === 'roasters' ? '' : 'roasters')}
            className="shrink-0 h-8 px-3 rounded-full bg-white/90 backdrop-blur-md text-[#1c1c18] border border-[#e6e2dc] flex items-center gap-1.5 shadow-xs text-xs font-semibold hover:bg-[#f1ede7]"
          >
            <span className="material-symbols-outlined text-[15px] text-[#7d562d]">workspace_premium</span>
            <span>Top Roasters</span>
          </button>
        </div>
      </div>

      {/* Floating Map Utility Controls (Right Stack) */}
      <div className="absolute right-4 top-36 z-30 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={() => triggerToast('Recentered to current GPS')}
          className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md text-[#271310] shadow-[0_4px_16px_rgba(62,39,35,0.12)] flex items-center justify-center hover:bg-[#f1ede7] active:scale-95 transition-all border border-[#e6e2dc]"
          title="Recenter"
        >
          <span className="material-symbols-outlined text-[20px] text-[#7d562d]">my_location</span>
        </button>

        <button
          onClick={() => triggerToast('Seat occupancy heatmap enabled')}
          className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md text-[#504442] shadow-[0_4px_16px_rgba(62,39,35,0.12)] flex items-center justify-center hover:text-[#271310] hover:bg-[#f1ede7] active:scale-95 transition-all border border-[#e6e2dc]"
          title="Heatmap layers"
        >
          <span className="material-symbols-outlined text-[20px]">layers</span>
        </button>

        <button
          onClick={() => onNavigate('home')}
          className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md text-[#504442] shadow-[0_4px_16px_rgba(62,39,35,0.12)] flex items-center justify-center hover:text-[#271310] hover:bg-[#f1ede7] active:scale-95 transition-all border border-[#e6e2dc]"
          title="Toggle List View"
        >
          <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
        </button>
      </div>

      {/* Bottom Floating Carousel of Cafe Cards */}
      <div className="mt-auto z-30 pb-20 pointer-events-none">
        <div className="flex items-end gap-3 overflow-x-auto px-4 no-scrollbar pointer-events-auto pt-4">
          {/* Card 1: Selected Active Cafe (Tanamera or selected) */}
          <div className="w-[310px] shrink-0 bg-white rounded-2xl shadow-[0_8px_30px_rgba(62,39,35,0.16)] p-3.5 flex flex-col gap-3 transition-transform border border-[#f1ede7]">
            <div className="flex gap-3">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#f1ede7]">
                <img
                  className="w-full h-full object-cover"
                  alt={selectedCafe.name}
                  src={selectedCafe.images[0]}
                />
                <div className="absolute bottom-1 left-1 bg-[#3e2723]/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {selectedCafe.distance}
                </div>
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="font-bold text-sm text-[#271310] truncate leading-tight">
                        {selectedCafe.name}
                      </span>
                      <span className="material-symbols-outlined text-[15px] text-[#7ca034] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSaveCafe(selectedCafe.id);
                      }}
                      className={`active:scale-90 transition-transform ${
                        isSaved ? 'text-[#ba1a1a]' : 'text-[#504442] hover:text-[#ba1a1a]'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        {isSaved ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>
                  </div>
                  <p className="text-xs text-[#504442] truncate mt-0.5">
                    {selectedCafe.address} • {selectedCafe.hours}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-0.5 text-[#7d562d] text-xs font-bold">
                    <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    {selectedCafe.rating}
                    <span className="text-[#504442] font-normal text-[10px]">({selectedCafe.reviewCount})</span>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#d3c3c0]"></span>
                  <span className="text-[10px] text-[#7ca034] bg-[#c8f17a]/30 px-1.5 py-0.5 rounded font-bold">
                    Single Origin
                  </span>
                </div>
              </div>
            </div>

            {/* Micro-specs */}
            <div className="grid grid-cols-3 gap-1.5 bg-[#f7f3ed] p-2 rounded-xl text-center">
              <div className="flex flex-col items-center">
                <span className="flex items-center gap-1 text-[#7ca034] text-xs font-bold">
                  <span className="material-symbols-outlined text-[13px]">speed</span>
                  {selectedCafe.keySpecs.wifiSpeed}
                </span>
                <span className="text-[9px] text-[#504442] uppercase tracking-wider font-semibold">
                  Fast Wi-Fi
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="flex items-center gap-1 text-[#271310] text-xs font-bold">
                  <span className="material-symbols-outlined text-[13px] text-[#7d562d]">power</span>
                  Plenty
                </span>
                <span className="text-[9px] text-[#504442] uppercase tracking-wider font-semibold">
                  Desk Plugs
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="flex items-center gap-1 text-[#271310] text-xs font-bold">
                  <span className="material-symbols-outlined text-[13px] text-[#7d562d]">volume_down</span>
                  {selectedCafe.keySpecs.noiseDb}
                </span>
                <span className="text-[9px] text-[#504442] uppercase tracking-wider font-semibold">
                  Moderate
                </span>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerToast(`Routing directions to ${selectedCafe.name}...`)}
                className="flex-1 h-9 rounded-xl bg-[#3e2723] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform hover:opacity-95"
              >
                <span className="material-symbols-outlined text-[16px]">directions</span>
                Directions
              </button>

              <button
                onClick={() => onSelectCafe(selectedCafe.id)}
                className="px-3.5 h-9 rounded-xl bg-[#ffca98]/40 text-[#271310] text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#ffca98]/70 active:scale-95 transition-all"
              >
                <span>Details</span>
                <span className="material-symbols-outlined text-[15px]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Card 2: Peeking Card (Giyanti) */}
          <div
            onClick={() => setSelectedPinId('giyanti')}
            className="w-[280px] shrink-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_4px_20px_rgba(62,39,35,0.1)] p-3.5 flex flex-col justify-between cursor-pointer border border-[#f1ede7] opacity-95 hover:opacity-100"
          >
            <div className="flex gap-2.5">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#f1ede7]">
                <img
                  className="w-full h-full object-cover"
                  alt="Giyanti Roastery"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7pt5g8wkxS6GcYSfRnavEgpQunrlhLehyvMDOogG98_KVHxsNhlzRDwIAhjJa_sJYJcRSXr0_6qxszwzraMxpZiO7K3LVHAI8i9rdiFSTJSp4wmm5diJPYEekJSFhuEFxxi0POwKvyiegUgdDHrU1xTIkAeJCls4Muo02gn9rHzqy_eUnHpvU1oVrp5eyowB68TiEJP4Wuxfid0lRx14gMr1TL2OWYoFvjvoowbAT-6knPqpT3mWrRQ"
                />
                <div className="absolute bottom-1 left-1 bg-[#271310]/80 text-white text-[8px] font-bold px-1 rounded">
                  1.2 km
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#271310] truncate">Giyanti Roastery</span>
                  <span className="text-[#7d562d] text-xs font-bold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    4.8
                  </span>
                </div>
                <p className="text-[11px] text-[#504442] truncate mt-0.5">Gunawarman • Artisan Batch</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[9px] text-[#7ca034] bg-[#c8f17a]/30 px-1.5 py-0.2 rounded font-bold">
                    95 Mbps
                  </span>
                  <span className="text-[9px] text-[#7d562d] bg-[#ffdcbd]/50 px-1.5 py-0.2 rounded font-bold">
                    Silent Patio
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-[#f1ede7] flex items-center justify-between">
              <span className="text-xs text-[#271310] font-bold">Avg IDR 48k</span>
              <span className="text-[#7d562d] text-xs font-bold flex items-center gap-0.5">
                View Bar →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
