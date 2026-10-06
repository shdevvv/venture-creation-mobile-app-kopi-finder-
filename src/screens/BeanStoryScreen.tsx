import React, { useState } from 'react';
import { ScreenName } from '../types';
import { MOCK_BEAN_STORY } from '../data/mockData';

interface BeanStoryScreenProps {
  onNavigate: (screen: ScreenName) => void;
  onSelectCafe: (cafeId: string) => void;
}

export const BeanStoryScreen: React.FC<BeanStoryScreenProps> = ({
  onNavigate,
  onSelectCafe
}) => {
  const story = MOCK_BEAN_STORY;
  const [isSaved, setIsSaved] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isRouting, setIsRouting] = useState(false);

  const handleVisit = () => {
    setIsRouting(true);
    setTimeout(() => {
      setIsRouting(false);
      onSelectCafe(story.roasteryId);
    }, 600);
  };

  return (
    <div className="flex flex-col w-full pb-24 bg-[#fdf9f3]">
      {/* Subtle Top Decorative Banner & Micro Header */}
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#7d562d] animate-pulse"></span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d562d]">
            {story.edition}
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffca98]/60 text-[#2c1600]">
          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
          <span className="text-[10px] font-bold">{story.lotCode}</span>
        </div>
      </div>

      {/* Editorial Headline Section */}
      <div className="px-4 mt-1 mb-3">
        <h2 className="font-display-lg text-2xl sm:text-3xl font-bold text-[#271310] tracking-tight leading-tight mb-1">
          {story.beanName}
        </h2>
        <p className="text-xs text-[#504442] flex items-center gap-1.5 flex-wrap">
          <span>Roasted by</span>
          <span className="font-bold text-[#271310]">{story.roasteryName}</span>
          <span className="inline-block w-1 h-1 rounded-full bg-[#d3c3c0]"></span>
          <span className="text-[#7d562d] font-semibold">{story.roasteryLocation}</span>
        </p>

        {/* Curator Endorsement Tag */}
        <div className="mt-3 p-2.5 rounded-2xl bg-[#f7f3ed] shadow-xs flex items-center justify-between border border-[#e6e2dc]/60">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                className="w-10 h-10 rounded-full object-cover shadow-xs"
                alt="Mikael J."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4mNT-FsAPtvHI-LvV03f-PNWEPP4-yx5YAMBl4hSWAX04gJwIEo1wc6SKvEUo5dsN69YCpu2N-0mekmPYEc0grJei3Vg6ARIhVt6A91CpOkakpBH0ZZqQQzfyHE10GLsBNL6hepusMq21yMlZFfVWkMef22_68HZKeHRmWbc0dDvt7kZfZGeRTbqEr-BYZbS12S-y70Q0OCofubRjAEFkpwAdXXOvGs5Iua4d3ED2Z9fE1H0R3q4zYA"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#271310] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_cafe
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-[#271310]">Curated by Mikael J.</p>
                <span className="material-symbols-outlined text-[13px] text-[#7d562d]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </div>
              <p className="text-[10px] text-[#504442]">Head Q-Grader & Sensory Judge</p>
            </div>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('sensory-profile-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3 py-1 rounded-full bg-[#ebe8e2] text-[#271310] text-[11px] font-bold active:scale-95 transition-transform flex items-center gap-0.5"
          >
            <span>Tasting Notes</span>
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
        </div>
      </div>

      {/* Visual Hero Story & Tasting Capsule */}
      <div className="px-4 mb-4">
        <div className="relative rounded-2xl overflow-hidden shadow-sm bg-[#f7f3ed] border border-[#e6e2dc]">
          <div
            className="bg-cover bg-center w-full h-52 relative flex flex-col justify-between p-3.5"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCnkqcO3vh8YbiZNcDHGY02P3436fpLxOl3svY-1uRZKeeBG8bYF7UM4naHwXvLw5aOIKLaOA_qNdha3AGE8sjIzfh1swxDElCI58QAlxANa74w0B-8deXR18nJvQsb7-4MM10b7PlIJSjjzE1ukVne73CXkO1rQva1nMrOzNR4sT7aae6hkX8okPhzgrpcy921yOlEpugC1ctI5yj9Jrwj5YYakwbVRShsMEDLCwUarxp4eAjebjDqgA')`
            }}
          >
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-1 rounded-full bg-[#271310]/80 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#ffca98]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  eco
                </span>
                Single Origin Micro-Lot
              </span>

              <button
                onClick={() => setIsSaved(!isSaved)}
                aria-label="Bookmark"
                className={`w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm active:scale-90 transition-transform ${
                  isSaved ? 'text-[#7d562d]' : 'text-[#271310]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {isSaved ? 'bookmark' : 'bookmark_border'}
                </span>
              </button>
            </div>

            <div className="bg-gradient-to-t from-[#271310]/95 via-[#271310]/60 to-transparent -mx-3.5 -mb-3.5 p-3.5 pt-6 text-white">
              <div className="flex items-center gap-1.5 text-white/90 text-[10px] font-semibold mb-0.5">
                <span className="material-symbols-outlined text-[13px]">filter_drama</span>
                <span>Bajawa Highlands, Flores • 1,520m</span>
              </div>
              <p className="font-headline-sm text-sm sm:text-base font-bold text-white">
                Light-Medium Filter Roast
              </p>
            </div>
          </div>

          {/* Tasting Profile Chips */}
          <div id="sensory-profile-section" className="p-3.5 bg-white">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#827472] mb-2">
              Prominent Tasting Notes
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="px-2.5 py-1 rounded-full bg-[#ffca98]/40 text-[#2c1600] text-xs font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7d562d]"></span>
                Ripe Dark Plum
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#f1ede7] text-[#271310] text-xs font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3e2723]"></span>
                Raw Cacao Nibs
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#ebe8e2] text-[#1c1c18] text-xs font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f0bd8b]"></span>
                Wild Forest Honey
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#f1ede7] text-[#504442] text-xs font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7d562d]"></span>
                Tamarind Glaze
              </span>
            </div>

            {/* Sensory Flavor Bars */}
            <div className="space-y-2 pt-1">
              <div>
                <div className="flex justify-between items-center mb-0.5 text-xs">
                  <span className="font-semibold text-[#271310]">Acidity</span>
                  <span className="text-[11px] text-[#504442]">
                    3.5 / 5 <span className="text-[#7d562d] font-bold">• Crisp stone fruit</span>
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f1ede7] overflow-hidden">
                  <div className="h-full rounded-full bg-[#7d562d]" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-0.5 text-xs">
                  <span className="font-semibold text-[#271310]">Sweetness</span>
                  <span className="text-[11px] text-[#504442]">
                    4.5 / 5 <span className="text-[#7d562d] font-bold">• Brown sugar syrup</span>
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f1ede7] overflow-hidden">
                  <div className="h-full rounded-full bg-[#3e2723]" style={{ width: '90%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-0.5 text-xs">
                  <span className="font-semibold text-[#271310]">Body & Mouthfeel</span>
                  <span className="text-[11px] text-[#504442]">
                    4.0 / 5 <span className="text-[#7d562d] font-bold">• Silky & round</span>
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f1ede7] overflow-hidden">
                  <div className="h-full rounded-full bg-[#7d562d]" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terroir & Craft Details Card */}
      <div className="px-4 mb-4">
        <div className="p-4 rounded-2xl bg-[#f7f3ed] shadow-xs border border-[#e6e2dc]">
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="material-symbols-outlined text-[18px] text-[#7d562d]">terrain</span>
            <h3 className="text-sm font-bold text-[#271310]">Terroir & Craft Details</h3>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="p-2.5 rounded-xl bg-white border border-[#e6e2dc]/60">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#827472] mb-0.5">
                Region & Altitude
              </p>
              <p className="text-xs font-bold text-[#271310]">Bajawa, Flores</p>
              <p className="text-[10px] text-[#504442]">1,400 – 1,550m MASL</p>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-[#e6e2dc]/60">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#827472] mb-0.5">
                Varietal
              </p>
              <p className="text-xs font-bold text-[#271310]">Kartika & S-795</p>
              <p className="text-[10px] text-[#504442]">Heritage volcanic soil</p>
            </div>

            <div className="col-span-2 p-2.5 rounded-xl bg-white border border-[#e6e2dc]/60 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#827472] mb-0.5">
                  Post-Harvest Processing
                </p>
                <p className="text-xs font-bold text-[#271310]">72-Hour Anaerobic Slow Dry Natural</p>
                <p className="text-[10px] text-[#504442]">Sealed steel barrels + African raised beds</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#ffca98]/40 flex items-center justify-center text-[#7d562d] shrink-0 ml-2">
                <span className="material-symbols-outlined text-[20px]">science</span>
              </div>
            </div>
          </div>

          {/* Editorial Story Body */}
          <div className="space-y-2 text-xs text-[#1c1c18] leading-relaxed">
            <p>
              Grown under the mist-capped shadows of Mount Inerie, this micro-lot stands as an exceptional showcase of East Nusa Tenggara’s potential. Farmers ferment whole ripe cherries inside oxygen-depleted barrels for 72 hours, concentrating the natural fruit saccharides into deeply layered stone fruit aromatics.
            </p>
            <p className="text-[#504442] italic">
              “What captured our sensory panel was the remarkably clean tamarind brightness lingering behind the cocoa warmth. It drinks like mulled plum wine on a cold mountain morning — utterly silky without losing its vibrant Indonesian soul.”
            </p>
          </div>
        </div>
      </div>

      {/* Barista's Brew Recommendation Component */}
      <div className="px-4 mb-4">
        <div className="p-4 rounded-2xl bg-[#271310] text-white shadow-md relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-[#ffca98]/20 blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between mb-2 relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#ffdcbd]">coffee_maker</span>
              <h3 className="text-xs font-bold text-white">Barista's Dialed Recipe</h3>
            </div>
            <span className="px-2 py-0.2 rounded-full bg-[#3e2723] text-[#ffdcbd] text-[10px] font-bold">
              Hot V60
            </span>
          </div>

          <p className="text-xs text-white/90 mb-3 relative z-10 leading-snug">
            “Pour with deliberate pulses to highlight the vibrant plum sweetness and round off the cacao finish.”
          </p>

          <div className="grid grid-cols-3 gap-2 relative z-10">
            <div className="p-2 rounded-xl bg-white/10 text-center">
              <span className="text-[9px] uppercase font-bold text-[#ae8d87] block mb-0.5">Dose Ratio</span>
              <span className="text-sm font-bold text-white">1 : 15</span>
              <span className="text-[9px] text-white/70 block mt-0.5">15g to 225g</span>
            </div>

            <div className="p-2 rounded-xl bg-white/10 text-center">
              <span className="text-[9px] uppercase font-bold text-[#ae8d87] block mb-0.5">Water Temp</span>
              <span className="text-sm font-bold text-white">92°C</span>
              <span className="text-[9px] text-white/70 block mt-0.5">Soft spring</span>
            </div>

            <div className="p-2 rounded-xl bg-white/10 text-center">
              <span className="text-[9px] uppercase font-bold text-[#ae8d87] block mb-0.5">Target Time</span>
              <span className="text-sm font-bold text-white">2m 45s</span>
              <span className="text-[9px] text-white/70 block mt-0.5">Medium coarse</span>
            </div>
          </div>
        </div>
      </div>

      {/* Where to Taste Today */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs sm:text-sm font-bold text-[#271310]">Where to Taste Today</h3>
          <span className="flex items-center gap-1 text-[10px] font-bold text-[#7d562d]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7d562d] animate-pulse"></span>
            Pour-over Bar Active
          </span>
        </div>
        <p className="text-[11px] text-[#504442] mb-2">Currently dialed in by skilled baristas at:</p>

        <div className="rounded-2xl bg-white shadow-xs p-3.5 flex flex-col gap-2.5 border border-[#e6e2dc]">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <img
                className="w-12 h-12 rounded-xl object-cover shadow-xs"
                alt="Anomali Coffee"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp7mZQV7m9mQ5_lOrHHAsJVQdmRI3A9leyYBHDuoMXSpy1Q5hLS9i1R64-dBCVkiImAdZftW1xpBvR9bgDsdXZ-EMaBZmwNHrVt9sh0ZCZ6YU3U-LQ26GzsCUdiTYoYb6cHjSHxX5Wlw_6ys3g5LV1FZLnIodlTqUhghksrrACPeZYFH104c1KMk0Gz_-QrMSy9AzY8C1xcYtNpdn-2gnvCuVHXUFmuWYqHKu_o3SqJw0SUMoVQ6ObEA"
              />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#271310]">Anomali Coffee Roastery</h4>
                <p className="text-[11px] text-[#504442] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-[#7d562d]">near_me</span>
                  <span>Senopati • 800m away</span>
                </p>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-full bg-[#ffca98]/40 text-[#2c1600] text-[10px] font-bold">
              Open till 21:00
            </span>
          </div>

          {/* Stock Badges */}
          <div className="p-2 rounded-xl bg-[#f7f3ed] flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#7d562d]" style={{ fontVariationSettings: "'FILL' 1" }}>
                inventory_2
              </span>
              <span className="text-[11px] text-[#1c1c18]">250g Retail Whole Bean Bags</span>
            </div>
            <span className="text-[10px] text-[#271310] font-bold">4 bags left</span>
          </div>

          <div className="p-2 rounded-xl bg-[#f1ede7] flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#271310]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_cafe
              </span>
              <span className="text-[11px] text-[#1c1c18]">Single Cup Filter at Bar</span>
            </div>
            <span className="text-xs text-[#271310] font-bold">IDR 48K</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-0 inset-x-0 bg-[#fdf9f3]/95 backdrop-blur-md pt-2 pb-3 px-4 shadow-[0_-8px_24px_rgba(62,39,35,0.08)] flex items-center gap-2 z-40 border-t border-[#f1ede7]">
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`h-11 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all border border-[#e6e2dc] ${
            isWishlisted
              ? 'bg-[#ffca98] text-[#2c1600]'
              : 'bg-white text-[#271310] hover:bg-[#f7f3ed]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            {isWishlisted ? 'favorite' : 'favorite_border'}
          </span>
          <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
        </button>

        <button
          onClick={handleVisit}
          className="h-11 flex-1 rounded-xl bg-[#271310] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-98 hover:opacity-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isRouting ? 'sync' : 'directions'}
          </span>
          <span>{isRouting ? 'Opening Cafe Route...' : 'Visit Cafe & Taste'}</span>
        </button>
      </div>
    </div>
  );
};
