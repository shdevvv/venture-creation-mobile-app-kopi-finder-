import React, { useState } from 'react';
import { Cafe, ScreenName } from '../types';
import { MOCK_CAFES } from '../data/mockData';

interface AIMatchmakerScreenProps {
  cafes?: Cafe[];
  onNavigate: (screen: ScreenName) => void;
  onSelectCafe: (cafeId: string) => void;
}

export const AIMatchmakerScreen: React.FC<AIMatchmakerScreenProps> = ({
  cafes = MOCK_CAFES,
  onNavigate,
  onSelectCafe
}) => {
  const [mood, setMood] = useState('Work & Deep Focus');
  const [budget, setBudget] = useState('35k-50k');
  const [amenities, setAmenities] = useState<string[]>([
    'Fast Wi-Fi (>80 Mbps)',
    'Plentiful Outlets',
    'Quiet Decibel (<55dB)',
    'Specialty Pastries'
  ]);
  const [brewMethod, setBrewMethod] = useState<'v60' | 'espresso' | 'cold-drip'>('v60');
  const [isMatching, setIsMatching] = useState(false);
  const [matchScore, setMatchScore] = useState(98);
  const [matchedCafeId, setMatchedCafeId] = useState<string>(cafes[0]?.id || 'tanamera');

  const moods = [
    'Work & Deep Focus',
    'Casual Date',
    'Book Reading',
    'Group Brainstorm',
    'Espresso Tasting'
  ];

  const amenityOptions = [
    { id: 'wifi', label: 'Fast Wi-Fi (>80 Mbps)', icon: 'bolt' },
    { id: 'outlets', label: 'Plentiful Outlets', icon: 'power' },
    { id: 'quiet', label: 'Quiet Decibel (<55dB)', icon: 'volume_off' },
    { id: 'garden', label: 'Outdoor / Garden', icon: 'potted_plant' },
    { id: 'pastry', label: 'Specialty Pastries', icon: 'bakery_dining' }
  ];

  const toggleAmenity = (label: string) => {
    if (amenities.includes(label)) {
      setAmenities(amenities.filter((a) => a !== label));
    } else {
      setAmenities([...amenities, label]);
    }
  };

  const handleRunMatch = () => {
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);

      // Dynamic intelligent recommendation matching
      let bestCafe = cafes[0];
      let highestScore = -1;

      cafes.forEach((c) => {
        let score = 50;

        // Mood affinity
        if (mood === 'Work & Deep Focus') {
          if (parseInt(c.aspectRatings.wifiSpeed) >= 80) score += 20;
          if (c.aspectRatings.plugs.toLowerCase().includes('abundant') || c.aspectRatings.plugs.toLowerCase().includes('100%')) score += 15;
          if (parseInt(c.keySpecs.noiseDb) <= 55) score += 10;
        } else if (mood === 'Casual Date') {
          if (c.aspectRatings.vibe >= 4.8) score += 25;
          if (c.aspectRatings.coffee >= 4.8) score += 15;
        } else if (mood === 'Book Reading') {
          if (parseInt(c.keySpecs.noiseDb) <= 53) score += 30;
          score += c.aspectRatings.vibe * 4;
        } else if (mood === 'Espresso Tasting') {
          if (c.features.some((f) => f.toLowerCase().includes('roast'))) score += 30;
          score += c.aspectRatings.coffee * 5;
        } else {
          score += c.aspectRatings.vibe * 4 + c.aspectRatings.coffee * 4;
        }

        // Amenities match
        amenities.forEach((a) => {
          if (a.includes('Wi-Fi') && parseInt(c.aspectRatings.wifiSpeed) >= 70) score += 6;
          if (a.includes('Outlets') && !c.aspectRatings.plugs.toLowerCase().includes('few')) score += 6;
          if (a.includes('Quiet') && parseInt(c.keySpecs.noiseDb) <= 56) score += 6;
          if (a.includes('Garden') && c.features.some((f) => f.toLowerCase().includes('pet') || f.toLowerCase().includes('outdoor'))) score += 6;
        });

        // Price range affinity
        if (budget === '<35k' && (c.priceRange.includes('$ •') || c.keySpecs.priceAvg.includes('25k'))) score += 15;
        if (budget === '35k-50k' && c.priceRange.includes('$$')) score += 15;
        if (budget === '>80k' && c.priceRange.includes('$$$')) score += 15;

        if (score > highestScore) {
          highestScore = score;
          bestCafe = c;
        }
      });

      setMatchedCafeId(bestCafe.id);
      setMatchScore(94 + Math.floor(Math.random() * 5));
    }, 600);
  };

  const matchedCafe = cafes.find((c) => c.id === matchedCafeId) || cafes[0];

  // Dynamic recommended pour based on brewMethod
  const recommendedPour =
    matchedCafe.menu.find((m) => {
      if (brewMethod === 'v60') return m.category === 'manual-brew' || m.name.toLowerCase().includes('v60');
      if (brewMethod === 'espresso') return m.category === 'coffee' || m.name.toLowerCase().includes('white') || m.name.toLowerCase().includes('espresso');
      if (brewMethod === 'cold-drip') return m.name.toLowerCase().includes('cold') || m.category === 'manual-brew';
      return true;
    }) || matchedCafe.menu[0];

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-28 bg-[#fdf9f3] gap-4">
      {/* AI Intro Header */}
      <div className="flex flex-col gap-1 mt-1">
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#ffca98]/40 text-[#2c1600]">
          <span className="material-symbols-outlined text-[16px] text-[#7d562d]" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
          <span className="text-[10px] uppercase tracking-wider font-bold">
            Smart Barista Engine
          </span>
        </div>

        <h1 className="font-display-lg text-2xl sm:text-3xl font-bold text-[#271310] tracking-tight">
          AI Coffee Matchmaker
        </h1>
        <p className="text-xs sm:text-sm text-[#504442] leading-relaxed">
          Tell us your vibe and work needs — our model pairs you with the perfect coffee sanctuary.
        </p>
      </div>

      {/* Interactive Configuration Form */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e6e2dc] flex flex-col gap-4">
        {/* Mood / Purpose Selector */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#271310] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#7d562d]">psychology</span>
              Today's Mood & Purpose
            </label>
            <span className="text-[10px] text-[#504442]">Step 1 of 4</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {moods.map((m) => {
              const active = mood === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#271310] text-white shadow-xs'
                      : 'bg-[#f1ede7] text-[#504442] hover:bg-[#ebe8e2]'
                  }`}
                >
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffdcbd] animate-pulse"></span>
                  )}
                  <span>{m}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget Limit Segments */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#271310] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#7d562d]">payments</span>
              Budget Range per Cup
            </label>
            <span className="text-[10px] font-bold text-[#7d562d]">
              Selected: {budget === '35k-50k' ? 'IDR 35k - 50k' : budget}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: '<35k', title: '< IDR 35k', sub: 'Daily Daily' },
              { id: '35k-50k', title: 'IDR 35k - 50k', sub: 'Sweet Spot', featured: true },
              { id: '50k-80k', title: 'IDR 50k - 80k', sub: 'Specialty Origin' },
              { id: '>80k', title: '> IDR 80k', sub: 'Geisha / Cup of Exc.' }
            ].map((b) => {
              const active = budget === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBudget(b.id)}
                  className={`relative flex flex-col items-center justify-center p-2 rounded-xl text-center transition-all ${
                    active
                      ? 'bg-[#ffca98] text-[#2c1600] font-bold border border-[#7d562d]'
                      : 'bg-[#f7f3ed] text-[#504442] border border-[#e6e2dc]'
                  }`}
                >
                  <span className="text-xs font-bold">{b.title}</span>
                  <span className="text-[10px] opacity-75">{b.sub}</span>
                  {active && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#7d562d]"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Required Amenities Multi-Select */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#271310] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#7d562d]">tune</span>
              Essential Remote Amenities
            </label>
            <span className="text-[10px] font-bold text-[#7ca034]">
              {amenities.length} active filters
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {amenityOptions.map((opt) => {
              const isSelected = amenities.includes(opt.label);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleAmenity(opt.label)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#c8f17a]/40 text-[#131f00] border border-[#7ca034]'
                      : 'bg-[#f1ede7] text-[#504442] border border-[#e6e2dc]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] text-[#7ca034]">
                    {opt.icon}
                  </span>
                  <span>{opt.label}</span>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[15px] text-[#7ca034]">
                      check_circle
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferred Brew Method */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#271310] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#7d562d]">coffee_maker</span>
            Preferred Extraction Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'v60', title: 'Manual V60', icon: 'filter_alt' },
              { id: 'espresso', title: 'Espresso', icon: 'local_cafe' },
              { id: 'cold-drip', title: 'Cold Drip', icon: 'water_drop' }
            ].map((m) => {
              const active = brewMethod === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setBrewMethod(m.id as any)}
                  className={`p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all ${
                    active
                      ? 'bg-[#3e2723] text-white shadow-xs'
                      : 'bg-[#f7f3ed] text-[#504442] border border-[#e6e2dc] hover:bg-[#ebe8e2]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[20px] ${
                    active ? 'text-[#ffdcbd]' : 'text-[#7d562d]'
                  }`}>
                    {m.icon}
                  </span>
                  <span className="text-xs font-bold">{m.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Trigger Button */}
        <button
          type="button"
          onClick={handleRunMatch}
          className="w-full h-12 rounded-xl bg-[#ffca98] text-[#2c1600] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(212,163,115,0.35)] hover:opacity-95 active:scale-[0.98] transition-all"
        >
          <span className={`material-symbols-outlined text-[20px] text-[#7d562d] ${
            isMatching ? 'animate-spin' : ''
          }`}>
            auto_awesome
          </span>
          <span>{isMatching ? 'Calculating Palate Vector...' : 'Find My Perfect Coffee Match'}</span>
        </button>
      </div>

      {/* AI Recommendation Output Section */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-[#271310] uppercase tracking-wider">
            Top Verified Recommendation
          </span>
          <span className="text-[10px] text-[#7d562d] flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-[14px]">history</span>
            Refreshed just now
          </span>
        </div>

        {/* Match Result Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(62,39,35,0.1)] border border-[#e6e2dc] flex flex-col">
          {/* Match Banner */}
          <div className="px-4 py-2.5 bg-gradient-to-r from-[#3e2723] via-[#271310] to-[#3e2723] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffdcbd] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ffca98]"></span>
              </span>
              <span className="text-xs font-bold tracking-wide">
                {matchScore}% Match for your {mood.toLowerCase()}
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7d562d] text-white">
              Best Match
            </span>
          </div>

          {/* Cafe Visual Showcase */}
          <div className="relative w-full h-40 bg-[#ebe8e2]">
            <img
              className="w-full h-full object-cover"
              alt={matchedCafe.name}
              src={matchedCafe.images[0]}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#271310]/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-2.5 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#add461] text-[#131f00] uppercase tracking-wider">
                  {matchedCafe.features[0] || 'Third-Wave Roastery'}
                </span>
                <h2 className="font-headline-lg text-lg font-bold mt-1 text-white">
                  {matchedCafe.name}
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[#271310] text-xs font-bold flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[15px] text-[#7d562d]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                {matchedCafe.rating}
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 flex flex-col gap-3">
            {/* Why You'll Love It */}
            <div className="p-3 rounded-xl bg-[#f7f3ed] flex items-start gap-2.5 border border-[#e6e2dc]/50">
              <span className="material-symbols-outlined text-[#7d562d] text-[20px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                neurology
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase text-[#7d562d]">Why you'll love it</span>
                <p className="text-xs text-[#504442] mt-0.5 leading-snug">
                  Cocok untuk {mood.toLowerCase()}: Wi-Fi kencang ({matchedCafe.keySpecs.wifiSpeed}), colokan {matchedCafe.aspectRatings.plugs.toLowerCase()}, suasana {matchedCafe.keySpecs.noiseLabel.toLowerCase()} ({matchedCafe.keySpecs.noiseDb}), dan harga rata-rata {matchedCafe.keySpecs.priceAvg}.
                </p>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-xl bg-[#f1ede7] flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-[18px] text-[#7d562d]">electrical_services</span>
                <span className="text-[11px] font-bold text-[#271310] mt-0.5 truncate w-full">{matchedCafe.aspectRatings.plugs}</span>
                <span className="text-[9px] text-[#504442]">Colokan Listrik</span>
              </div>

              <div className="p-2 rounded-xl bg-[#f1ede7] flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-[18px] text-[#7ca034]">speed</span>
                <span className="text-[11px] font-bold text-[#271310] mt-0.5">{matchedCafe.keySpecs.wifiSpeed}</span>
                <span className="text-[9px] text-[#504442]">{matchedCafe.keySpecs.wifiLabel}</span>
              </div>

              <div className="p-2 rounded-xl bg-[#f1ede7] flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-[18px] text-[#7d562d]">near_me</span>
                <span className="text-[11px] font-bold text-[#271310] mt-0.5">{matchedCafe.distance}</span>
                <span className="text-[9px] text-[#504442]">{matchedCafe.neighborhood}</span>
              </div>
            </div>

            {/* Single Origin Spotlight */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#ffca98]/20 border border-[#ffca98]/40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ffca98] flex items-center justify-center text-[#7a532a] shrink-0">
                  <span className="material-symbols-outlined text-[17px]">grain</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#271310] truncate">Menu Rekomendasi: {recommendedPour.name}</span>
                  <span className="text-[10px] text-[#504442] truncate">
                    {recommendedPour.tastingNotes ? recommendedPour.tastingNotes.join(' • ') : recommendedPour.description} • {recommendedPour.price}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#7d562d] bg-white px-2 py-0.5 rounded-full shadow-xs shrink-0">
                {recommendedPour.category === 'manual-brew' ? 'Filter Ready' : 'Espresso'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onSelectCafe(matchedCafe.id)}
                className="flex-1 h-11 rounded-xl bg-[#271310] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform cursor-pointer"
              >
                <span>Lihat Profil {matchedCafe.name.split(' ')[0]}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>

              <button
                onClick={() => alert(`Membuka rute jalan kaki menuju ${matchedCafe.name} (${matchedCafe.distance})...`)}
                className="w-11 h-11 rounded-xl bg-[#f1ede7] text-[#7d562d] flex items-center justify-center hover:bg-[#ebe8e2] active:scale-95 transition-all shadow-xs cursor-pointer"
                title="Directions"
              >
                <span className="material-symbols-outlined text-[20px]">directions</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
