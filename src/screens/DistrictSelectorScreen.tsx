import React, { useState } from 'react';
import { CoffeeDistrict, ScreenName } from '../types';

interface DistrictSelectorScreenProps {
  districts: CoffeeDistrict[];
  selectedDistrict: string;
  onSelectDistrict: (districtName: string) => void;
  onNavigate: (screen: ScreenName) => void;
}

export const DistrictSelectorScreen: React.FC<DistrictSelectorScreenProps> = ({
  districts,
  selectedDistrict,
  onSelectDistrict,
  onNavigate
}) => {
  const [currentSelected, setCurrentSelected] = useState<string>(selectedDistrict);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState('South Jakarta');
  const [isUpdating, setIsUpdating] = useState(false);

  const regions = [
    'South Jakarta',
    'Central Jakarta',
    'West Jakarta',
    'North / PIK',
    'Bandung & Bali'
  ];

  const filteredDistricts = districts.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRegion =
      activeRegion === 'South Jakarta'
        ? d.region === 'South Jakarta'
        : d.region === activeRegion;
    return matchesSearch && (searchQuery ? true : matchesRegion);
  });

  const activeDistrictObj =
    districts.find((d) => d.name === currentSelected) || districts[0];

  const handleConfirm = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      onSelectDistrict(currentSelected);
      onNavigate('home');
    }, 450);
  };

  return (
    <div className="flex flex-col w-full pb-28 bg-[#fdf9f3]">
      {/* Search & Filter Header Section */}
      <div className="px-4 pt-3 pb-2 flex flex-col gap-3">
        {/* Search Bar */}
        <div className="relative w-full">
          <div className="h-12 w-full bg-[#f7f3ed] rounded-xl px-3.5 flex items-center gap-2 shadow-xs border border-[#e6e2dc]/60">
            <span className="material-symbols-outlined text-[#827472] text-[22px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search neighborhood, MRT station, or area..."
              className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-[#1c1c18] placeholder:text-[#827472]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#827472] hover:text-[#1c1c18] p-1"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* GPS Auto-Detect Location Card */}
        <div className="w-full bg-white rounded-2xl p-3.5 shadow-sm border border-[#e6e2dc] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-11 h-11 rounded-xl bg-[#ffca98]/40 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#7d562d] text-[22px]">near_me</span>
              <span className="absolute inset-0 rounded-xl bg-[#7d562d]/15 animate-ping opacity-75"></span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-xs sm:text-sm font-bold text-[#271310] truncate">Use Current GPS</h2>
                <span className="bg-[#add461]/40 text-[#364e00] px-1.5 py-0.2 rounded-full text-[9px] font-bold">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] text-[#504442] truncate">Detects nearby cafes in 3km radius</p>
            </div>
          </div>
          <button
            onClick={() => {
              setCurrentSelected('Senopati & Gunawarman');
              alert('GPS centered at Senopati (350m to Tanamera)');
            }}
            className="shrink-0 px-3 py-1.5 rounded-xl bg-[#ebe8e2] text-[#271310] text-xs font-bold hover:bg-[#ffca98]/60 active:scale-95 transition-all flex items-center gap-1"
          >
            <span>Locate</span>
            <span className="material-symbols-outlined text-[15px]">my_location</span>
          </button>
        </div>

        {/* Region Category Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
          {regions.map((reg) => {
            const isActive = activeRegion === reg;
            return (
              <button
                key={reg}
                onClick={() => setActiveRegion(reg)}
                className={`shrink-0 h-8 px-3.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-[#271310] text-white shadow-xs'
                    : 'bg-[#f7f3ed] text-[#504442] hover:bg-[#ebe8e2]'
                }`}
              >
                <span>{reg}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#ffdcbd]"></span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* District Cards List */}
      <div className="px-4 flex flex-col gap-3.5">
        {filteredDistricts.map((district) => {
          const isSelected = currentSelected.toLowerCase().includes(district.id);
          return (
            <div
              key={district.id}
              onClick={() => setCurrentSelected(district.name)}
              className={`relative w-full rounded-2xl p-3.5 cursor-pointer transition-all border active:scale-[0.99] ${
                isSelected
                  ? 'bg-white shadow-[0_4px_20px_rgba(62,39,35,0.12)] border-[#7d562d] ring-1 ring-[#7d562d]'
                  : 'bg-white shadow-xs border-[#e6e2dc] hover:border-[#d3c3c0]'
              }`}
            >
              {/* Header inside card */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-[#271310] truncate">{district.name}</h3>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#271310] flex items-center justify-center text-white shrink-0">
                        <span className="material-symbols-outlined text-[12px]">check</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[#504442] mt-0.5">
                    <span className="material-symbols-outlined text-[15px] text-[#7d562d] shrink-0">
                      local_cafe
                    </span>
                    <p className="text-[11px] truncate">
                      {district.cafeCount} Specialty Roasters • {district.partnerCount} Passport Partners
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#f7f3ed] text-[#271310] text-[10px] font-bold shrink-0">
                  <span className="material-symbols-outlined text-[13px] text-[#7d562d]">directions_walk</span>
                  <span>{district.distance}</span>
                </div>
              </div>

              {/* Cover Image with Banner Scrim */}
              <div className="w-full h-24 rounded-xl overflow-hidden mb-2.5 relative bg-[#e6e2dc]">
                <img
                  className="w-full h-full object-cover"
                  alt={district.name}
                  src={district.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#271310]/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-white text-[10px] font-bold tracking-wide flex items-center gap-1">
                  {district.badge && (
                    <span className="material-symbols-outlined text-[13px]">verified</span>
                  )}
                  <span>{district.bannerText}</span>
                </div>
              </div>

              {/* Tag Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {district.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      idx === 0
                        ? 'bg-[#ffca98]/40 text-[#7a532a]'
                        : 'bg-[#f1ede7] text-[#504442]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Persistent Floating Confirmation Footer */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#fdf9f3]/95 backdrop-blur-xl pb-safe shadow-[0_-6px_24px_rgba(62,39,35,0.08)] border-t border-[#f1ede7]">
        <div className="px-4 py-3 flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-[#827472] uppercase tracking-wider">
              Exploring District
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#271310] truncate">
              {activeDistrictObj.name}
            </p>
            <span className="text-[11px] text-[#7d562d] font-semibold">
              {activeDistrictObj.cafeCount} Cafes Available
            </span>
          </div>

          <button
            onClick={handleConfirm}
            className="shrink-0 h-11 px-5 rounded-xl bg-[#271310] text-white text-xs font-bold shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span>{isUpdating ? 'Updating...' : 'Confirm'}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
