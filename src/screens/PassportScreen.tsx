import React, { useState } from 'react';
import { UserProfile, ScreenName } from '../types';
import { INITIAL_PASSPORT_STAMPS } from '../data/mockData';

interface PassportScreenProps {
  user: UserProfile;
  stamps: string[];
  onNavigate: (screen: ScreenName) => void;
}

export const PassportScreen: React.FC<PassportScreenProps> = ({ user, stamps, onNavigate }) => {
  const [redeemState, setRedeemState] = useState<'idle' | 'loading' | 'ready'>('idle');

  const handleRedeemPass = () => {
    setRedeemState('loading');
    setTimeout(() => {
      setRedeemState('ready');
      setTimeout(() => setRedeemState('idle'), 3000);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-28 bg-[#fdf9f3] gap-4">
      {/* User Profile Header & Gamification Bar */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#e6e2dc] relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#ffca98]/20 blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-3 mb-3">
          <div className="relative shrink-0">
            <img
              className="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-[#ffca98]/60"
              alt={user.name}
              src={user.avatar}
            />
            <div className="absolute -bottom-1 -right-1 bg-[#271310] text-[#ffca98] p-0.5 rounded-full flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-headline-md text-base sm:text-lg font-bold text-[#271310] truncate">
                {user.name}
              </h1>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-[#ffdcbd] text-[#2c1600] uppercase tracking-wider">
                Lvl {user.level}
              </span>
            </div>
            <p className="text-xs text-[#7d562d] font-medium truncate mt-0.5">{user.levelTitle}</p>
            <div className="flex items-center gap-1 text-[#504442] text-[11px] font-medium mt-0.5">
              <span className="material-symbols-outlined text-[13px] text-[#7d562d]">military_tech</span>
              <span>Top 5% Explorer in Jakarta</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-1 bg-[#f7f3ed] p-2.5 rounded-xl mb-3 text-center border border-[#e6e2dc]/50">
          <div className="flex flex-col items-center justify-center p-1">
            <span className="text-base font-bold text-[#271310]">{user.cafesVisited}</span>
            <span className="text-[9px] font-bold text-[#504442] uppercase tracking-wider mt-0.5">
              Cafes Visited
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-1 border-x border-[#e6e2dc]">
            <span className="text-base font-bold text-[#7d562d]">{user.roasterStamps + stamps.length}</span>
            <span className="text-[9px] font-bold text-[#504442] uppercase tracking-wider mt-0.5">
              Roaster Stamps
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-1">
            <span className="text-base font-bold text-[#271310]">{user.reviewsLogged}</span>
            <span className="text-[9px] font-bold text-[#504442] uppercase tracking-wider mt-0.5">
              Reviews Logged
            </span>
          </div>
        </div>

        {/* XP & Rank Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#504442] flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#7d562d]">local_fire_department</span>
              Next: <strong className="text-[#271310] font-bold">{user.nextRankName}</strong>
            </span>
            <span className="text-[#7d562d] font-bold">24 / 30 Cafes (80%)</span>
          </div>

          <div className="w-full h-2 bg-[#f1ede7] rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-[#7d562d] rounded-full transition-all duration-700" style={{ width: '80%' }}></div>
          </div>
          <p className="text-[11px] text-[#504442]">
            Only 6 more single-origin checks to unlock early roaster tastings.
          </p>
        </div>
      </section>

      {/* Digital Stamp Grid Card (Vintage Craft Aesthetic) */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#e6e2dc] relative overflow-hidden">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdcbd]/50 text-[#7d562d] text-[10px] font-bold uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-[13px]">workspace_premium</span>
              <span>Official Route Passport</span>
            </div>
            <h2 className="font-headline-sm text-base font-bold text-[#271310]">
              Artisanal Coffee Passport
            </h2>
            <p className="text-xs text-[#504442] mt-0.5">
              South Jakarta Edition • Collect 5 to earn rewards
            </p>
          </div>

          <button
            onClick={() => alert('Collect 5 roaster stamps to unlock free signature pour-over vouchers at participating cafes!')}
            aria-label="Rules"
            className="w-8 h-8 rounded-full bg-[#f1ede7] flex items-center justify-center text-[#271310] hover:bg-[#ebe8e2] active:scale-95"
          >
            <span className="material-symbols-outlined text-[17px]">info</span>
          </button>
        </div>

        {/* The 6-Slot Stamp Card */}
        <div className="bg-[#f7f3ed] rounded-2xl p-3 border border-[#e6e2dc]/60">
          <div className="grid grid-cols-3 gap-2">
            {/* Dynamic Initial Stamps */}
            {INITIAL_PASSPORT_STAMPS.map((st) => (
              <div
                key={st.id}
                className="flex flex-col items-center bg-white p-2.5 rounded-xl shadow-xs border border-[#e6e2dc] cursor-pointer active:scale-95 transition-transform"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center relative my-0.5 shadow-xs"
                  style={{ backgroundColor: `${st.themeColor}15` }}
                >
                  <svg
                    className="absolute inset-0 w-full h-full"
                    style={{ color: st.themeColor }}
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" fill="none" opacity="0.85" r="46" stroke="currentColor" strokeDasharray="6, 3" strokeWidth="2.5" />
                    <circle cx="50" cy="50" fill="none" opacity="0.6" r="41" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  <div className="flex flex-col items-center justify-center" style={{ color: st.themeColor }}>
                    <span className="material-symbols-outlined text-[20px]">{st.icon}</span>
                    <span className="text-[7px] uppercase font-extrabold tracking-tighter">VALIDATED</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#271310] mt-1 truncate w-full text-center">{st.cafeName}</span>
                <span className="text-[9px] text-[#504442]">{st.date}</span>
              </div>
            ))}

            {/* Slot 5: Real collected stamp or button to add */}
            {stamps.length > 0 ? (
              <div className="flex flex-col items-center bg-white p-2.5 rounded-xl shadow-xs border border-[#e6e2dc] cursor-pointer active:scale-95 transition-transform animate-in zoom-in">
                <div className="w-14 h-14 rounded-full bg-[#ffca98]/40 flex items-center justify-center relative my-0.5 shadow-xs">
                  <svg className="absolute inset-0 w-full h-full text-[#7d562d]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="none" opacity="0.9" r="46" stroke="currentColor" strokeDasharray="5, 3" strokeWidth="2.5" />
                  </svg>
                  <div className="flex flex-col items-center justify-center text-[#7d562d]">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                    <span className="text-[7px] uppercase font-extrabold tracking-tighter">VALIDATED</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#271310] mt-1 truncate w-full text-center">
                  {stamps[0].split(' ')[0]}
                </span>
                <span className="text-[9px] text-[#7ca034] font-bold">Collected!</span>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('log-visit')}
                className="flex flex-col items-center bg-white p-2.5 rounded-xl shadow-xs border border-[#e6e2dc] active:scale-95 transition-transform hover:shadow-sm cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#ebe8e2] flex items-center justify-center relative my-0.5">
                  <svg className="absolute inset-0 w-full h-full text-[#7d562d]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="none" opacity="0.85" r="45" stroke="currentColor" strokeDasharray="6, 4" strokeWidth="2" />
                  </svg>
                  <span className="material-symbols-outlined text-[24px] text-[#7d562d]">add_circle</span>
                </div>
                <span className="text-xs font-bold text-[#7d562d] mt-1 truncate w-full text-center">1 Cafe Left!</span>
                <span className="text-[9px] text-[#ba1a1a] font-bold truncate w-full text-center">Unlocks Free V60</span>
              </button>
            )}

            {/* Slot 6: Second collected stamp or locked bonus slot */}
            {stamps.length > 1 ? (
              <div className="flex flex-col items-center bg-white p-2.5 rounded-xl shadow-xs border border-[#e6e2dc] cursor-pointer active:scale-95 transition-transform animate-in zoom-in">
                <div className="w-14 h-14 rounded-full bg-[#c8f17a]/30 flex items-center justify-center relative my-0.5 shadow-xs">
                  <svg className="absolute inset-0 w-full h-full text-[#7ca034]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="none" opacity="0.9" r="46" stroke="currentColor" strokeDasharray="4, 2" strokeWidth="2.5" />
                  </svg>
                  <div className="flex flex-col items-center justify-center text-[#7ca034]">
                    <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                    <span className="text-[7px] uppercase font-extrabold tracking-tighter">BONUS</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#271310] mt-1 truncate w-full text-center">
                  {stamps[1].split(' ')[0]}
                </span>
                <span className="text-[9px] text-[#7ca034] font-bold">Master Perk!</span>
              </div>
            ) : (
              <div className="flex flex-col items-center bg-white/60 p-2.5 rounded-xl border border-[#e6e2dc] opacity-60">
                <div className="w-14 h-14 rounded-full bg-[#f1ede7] flex items-center justify-center my-0.5">
                  <span className="material-symbols-outlined text-[22px] text-[#827472]">lock</span>
                </div>
                <span className="text-xs font-semibold text-[#504442] mt-1 truncate w-full text-center">Bonus Slot</span>
                <span className="text-[9px] text-[#827472]">Secret Perk</span>
              </div>
            )}
          </div>

          {/* Discovery Route Micro Action */}
          <div className="mt-3 pt-2 border-t border-[#e6e2dc] flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-[#504442]">
              <span className="material-symbols-outlined text-[15px] text-[#7d562d]">my_location</span>
              <span>Nearby: <strong className="font-semibold text-[#271310]">First Crack Coffee (0.4 km)</strong></span>
            </div>
            <button
              onClick={() => onNavigate('map')}
              className="font-bold text-[#7d562d] flex items-center gap-0.5 hover:underline"
            >
              <span>Find Roaster</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Perk Reward Voucher Card (Golden Roast Theme) */}
      <section className="bg-[#271310] text-white rounded-2xl p-4 shadow-[0_8px_24px_rgba(62,39,35,0.14)] relative overflow-hidden">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#7d562d] text-white text-[10px] font-bold">
              <span className="material-symbols-outlined text-[12px]">celebration</span>
              <span>Reward Ready</span>
            </span>
            <h3 className="font-headline-sm text-sm sm:text-base font-bold text-[#ffdad4]">
              Free Single-Origin V60 Pour-over
            </h3>
            <p className="text-xs text-[#d3c3c0]">
              Redeemable at any partnered specialty roastery in Jakarta.
            </p>
          </div>

          <div className="w-11 h-11 rounded-xl bg-[#3e2723] flex items-center justify-center shrink-0 text-[#ffca98] shadow-inner">
            <span className="material-symbols-outlined text-[24px]">redeem</span>
          </div>
        </div>

        {/* Perforated coupon divider */}
        <div className="relative my-3 flex items-center">
          <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#fdf9f3]"></div>
          <div className="w-full h-px border-t border-dashed border-[#d3c3c0]/40"></div>
          <div className="absolute -right-6 w-5 h-5 rounded-full bg-[#fdf9f3]"></div>
        </div>

        {/* Barcode */}
        <div className="bg-white text-[#1c1c18] rounded-xl p-3 flex flex-col items-center gap-1 shadow-inner">
          <div className="w-full flex items-center justify-center gap-1 py-1 h-10">
            <span className="w-1 h-8 bg-[#271310] rounded-full"></span>
            <span className="w-2 h-8 bg-[#271310] rounded-full"></span>
            <span className="w-0.5 h-8 bg-[#271310] rounded-full"></span>
            <span className="w-1.5 h-8 bg-[#271310] rounded-full"></span>
            <span className="w-3 h-8 bg-[#271310] rounded-full"></span>
            <span className="w-0.5 h-8 bg-[#271310] rounded-full"></span>
            <span className="w-2 h-8 bg-[#271310] rounded-full"></span>
            <span className="w-1 h-8 bg-[#271310] rounded-full"></span>
            <span className="w-2.5 h-8 bg-[#271310] rounded-full"></span>
            <span className="w-0.5 h-8 bg-[#271310] rounded-full"></span>
            <span className="w-1 h-8 bg-[#271310] rounded-full"></span>
            <span className="w-3 h-8 bg-[#271310] rounded-full"></span>
            <span className="w-1.5 h-8 bg-[#271310] rounded-full"></span>
          </div>
          <span className="text-[11px] font-mono tracking-widest text-[#504442] font-bold">
            #KP-V60-9842-JKT
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="text-[11px] text-[#d3c3c0] leading-tight">
            Valid until <strong className="text-[#ffdad4]">July 31, 2026</strong><br />
            Show barcode to barista on order
          </div>

          <button
            onClick={handleRedeemPass}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all ${
              redeemState === 'ready'
                ? 'bg-[#c8f17a] text-[#131f00]'
                : 'bg-[#ffca98] text-[#2c1600] hover:opacity-95'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">
              {redeemState === 'loading'
                ? 'sync'
                : redeemState === 'ready'
                ? 'check_circle'
                : 'qr_code_scanner'}
            </span>
            <span>
              {redeemState === 'loading'
                ? 'Verifying...'
                : redeemState === 'ready'
                ? 'Pass Ready!'
                : 'Redeem in Store'}
            </span>
          </button>
        </div>
      </section>

      {/* Collectible Badges Section */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#271310]">Unlocked Achievements</h2>
            <p className="text-xs text-[#504442]">4 of 16 Collector Badges Acquired</p>
          </div>
          <button
            onClick={() => onNavigate('achievements')}
            className="text-xs font-bold text-[#7d562d] hover:underline"
          >
            View All
          </button>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Badge 1: Matcha Hunter */}
          <div
            onClick={() => onNavigate('achievements')}
            className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#e6e2dc] flex flex-col justify-between gap-2 cursor-pointer active:scale-98 transition-transform"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#c8f17a]/30 flex items-center justify-center text-[#7ca034] ring-2 ring-[#c8f17a]">
                <span className="material-symbols-outlined text-[22px]">emoji_food_beverage</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#c8f17a] text-[#131f00]">
                UNLOCKED
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#271310]">Matcha Hunter</h4>
              <p className="text-[11px] text-[#504442] mt-0.5 line-clamp-2">
                Tried 5 authentic ceremonial matcha drinks across roasteries.
              </p>
            </div>
            <div className="text-[10px] text-[#7ca034] font-semibold flex items-center gap-1 pt-1">
              <span className="material-symbols-outlined text-[13px]">done_all</span>
              <span>Earned Jun 2025</span>
            </div>
          </div>

          {/* Badge 2: Sprint Roaster */}
          <div
            onClick={() => onNavigate('achievements')}
            className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#e6e2dc] flex flex-col justify-between gap-2 cursor-pointer active:scale-98 transition-transform"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#ffdcbd]/50 flex items-center justify-center text-[#7d562d] ring-2 ring-[#ffdcbd]">
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  military_tech
                </span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#ffdcbd] text-[#2c1600]">
                UNLOCKED
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#271310]">Sprint Roaster</h4>
              <p className="text-[11px] text-[#504442] mt-0.5 line-clamp-2">
                Explored 5 distinct roasteries in a single calendar week.
              </p>
            </div>
            <div className="text-[10px] text-[#7d562d] font-semibold flex items-center gap-1 pt-1">
              <span className="material-symbols-outlined text-[13px]">done_all</span>
              <span>Earned May 2025</span>
            </div>
          </div>

          {/* Badge 3: Night Owl */}
          <div
            onClick={() => onNavigate('achievements')}
            className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#e6e2dc] flex flex-col justify-between gap-2 cursor-pointer active:scale-98 transition-transform"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#ffdad4]/40 flex items-center justify-center text-[#271310] ring-2 ring-[#ffdad4]">
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  bedtime
                </span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#ffdad4] text-[#2b1613]">
                UNLOCKED
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#271310]">Night Owl</h4>
              <p className="text-[11px] text-[#504442] mt-0.5 line-clamp-2">
                Checked in after 8 PM with verified &gt;50 Mbps cafe Wi-Fi.
              </p>
            </div>
            <div className="text-[10px] text-[#271310] font-semibold flex items-center gap-1 pt-1">
              <span className="material-symbols-outlined text-[13px]">wifi</span>
              <span>Earned Apr 2025</span>
            </div>
          </div>

          {/* Badge 4: Origin Master (Locked) */}
          <div
            onClick={() => onNavigate('achievements')}
            className="bg-[#f7f3ed] p-3.5 rounded-2xl border border-[#e6e2dc] flex flex-col justify-between gap-2 opacity-80 cursor-pointer active:scale-98 transition-transform"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#ebe8e2] flex items-center justify-center text-[#827472]">
                <span className="material-symbols-outlined text-[22px]">public</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#ebe8e2] text-[#504442] flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[11px]">lock</span>
                LOCKED
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#504442]">Origin Master</h4>
              <p className="text-[11px] text-[#827472] mt-0.5 line-clamp-2">
                Taste 10 different Indonesian single origins.
              </p>
            </div>
            <div className="pt-1">
              <div className="flex justify-between items-center text-[9px] text-[#827472] font-bold mb-1">
                <span>PROGRESS</span>
                <span>6 / 10 Origins</span>
              </div>
              <div className="w-full h-1.5 bg-[#e6e2dc] rounded-full overflow-hidden">
                <div className="h-full bg-[#827472] rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
