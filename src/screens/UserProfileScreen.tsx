import React, { useState } from 'react';
import { UserProfile, ScreenName } from '../types';

interface UserProfileScreenProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onNavigate: (screen: ScreenName) => void;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({
  user,
  onUpdateUser,
  onNavigate
}) => {
  const [offlineMap, setOfflineMap] = useState(user.offlineMapDownloaded);
  const [notifs, setNotifs] = useState(user.notificationsEnabled);
  const [showQRModal, setShowQRModal] = useState(false);

  const toggleOfflineMap = () => {
    const nextVal = !offlineMap;
    setOfflineMap(nextVal);
    onUpdateUser({ offlineMapDownloaded: nextVal });
  };

  const toggleNotifs = () => {
    const nextVal = !notifs;
    setNotifs(nextVal);
    onUpdateUser({ notificationsEnabled: nextVal });
  };

  return (
    <div className="flex flex-col w-full px-4 pt-1 pb-24 bg-[#fdf9f3] gap-4">
      {/* Profile Header Hero Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e6e2dc] relative overflow-hidden">
        {/* Steam svg */}
        <div className="absolute -right-6 -top-6 w-28 h-28 opacity-10 pointer-events-none text-[#271310]">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
            <path d="M30,80 Q20,50 35,30 T40,5 C40,5 30,25 25,45 T30,80 Z" />
            <path d="M50,85 Q65,60 50,35 T55,10 C55,10 40,30 45,55 T50,85 Z" />
            <path d="M70,80 Q60,55 75,35 T78,15 C78,15 65,30 65,55 T70,80 Z" />
          </svg>
        </div>

        <div className="flex items-start gap-3 relative z-10">
          {/* Avatar with photo edit badge */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-[#f1ede7] shadow-xs ring-2 ring-[#ffca98]/40">
              <img
                alt="Alya Danubrata"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida/AEtjO1Wh7AgTlkA4DtGlzk2ViSnPNNpfPx8c0w2p2me8aZ4JT6kDCvQl0_p9gyDMFrLr6pxnlLJ0KPMfjZ1KYpxTdT0e4_1SIowNWKnVxxfufe3S1KSjc8H3BPin_5RIUBFxFgjjTXaFgUpDPUVtgYE3Ftpg6DOOpIwxTI00SYYkNqb2zLlIQ_eby2gTxsQ45aC4WDc9sekDaK4xzPFkY1cSMj1KwEE3FHRAD2uSFG2SdkB08YbgClF0QY6yarfg"
              />
            </div>
            <button
              onClick={() => alert('Change profile avatar')}
              aria-label="Change photo"
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#271310] text-white flex items-center justify-center shadow-xs active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[13px]">photo_camera</span>
            </button>
          </div>

          {/* Identity info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h2 className="text-base font-bold text-[#271310] truncate">Alya Danubrata</h2>
              <span className="material-symbols-outlined text-[#7d562d] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
            </div>

            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdcbd] text-[#2c1600] mb-1">
              <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_cafe
              </span>
              <span className="text-[10px] font-bold">Cupper Lvl 4 • Acidity Adventurer</span>
            </div>

            <p className="text-[11px] text-[#504442] truncate">
              @alyabrews • Member since Jan 2024
            </p>
          </div>
        </div>

        {/* Quick Metrics Ribbon */}
        <div className="grid grid-cols-4 gap-1 mt-3 pt-3 bg-[#f7f3ed] rounded-xl p-2 text-center border border-[#e6e2dc]/50">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#271310]">42</span>
            <span className="text-[9px] text-[#504442] font-semibold">Cafes Logged</span>
          </div>
          <div className="flex flex-col border-l border-[#e6e2dc]">
            <span className="text-sm font-bold text-[#271310]">18</span>
            <span className="text-[9px] text-[#504442] font-semibold">Stamps</span>
          </div>
          <div className="flex flex-col border-l border-[#e6e2dc]">
            <span className="text-sm font-bold text-[#7d562d]">1,450</span>
            <span className="text-[9px] text-[#504442] font-semibold">Perk Pts</span>
          </div>
          <div className="flex flex-col border-l border-[#e6e2dc]">
            <span className="text-sm font-bold text-[#271310]">8</span>
            <span className="text-[9px] text-[#504442] font-semibold">Reviews</span>
          </div>
        </div>
      </div>

      {/* Section 1: Sensory & Coffee Palate Profile */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#7d562d] text-[18px]">science</span>
            <h3 className="text-xs sm:text-sm font-bold text-[#271310]">Palate & Sensory Dial</h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#c8f17a] text-[#131f00] tracking-wider">
            CALIBRATED
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e6e2dc] flex flex-col gap-3">
          {/* Roast Preference */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="text-[#504442] font-semibold">Roast Depth Profile</span>
              <span className="text-[#271310] font-bold">{user.roastPreference}</span>
            </div>
            <div className="h-2 w-full bg-[#ebe8e2] rounded-full overflow-hidden flex p-0.5">
              <div className="h-full w-2/5 bg-[#7d562d] rounded-full"></div>
            </div>
            <div className="flex justify-between text-[10px] text-[#504442] mt-1 font-medium">
              <span>Nordic Light</span>
              <span>Medium-Light</span>
              <span>Dark Espresso</span>
            </div>
          </div>

          {/* Brew Methods */}
          <div>
            <span className="block text-xs font-semibold text-[#504442] mb-1.5">Preferred Brew Methods</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#271310] text-white text-xs font-semibold">
                <span className="material-symbols-outlined text-[13px]">filter_alt</span> V60 Dripper
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#271310] text-white text-xs font-semibold">
                <span className="material-symbols-outlined text-[13px]">coffee</span> Aeropress
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#271310] text-white text-xs font-semibold">
                <span className="material-symbols-outlined text-[13px]">water_drop</span> Japanese Cold Drip
              </span>
              <button
                type="button"
                onClick={() => alert('Add additional brewing method preference')}
                className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full bg-[#f1ede7] text-[#504442] text-xs font-bold active:scale-95"
              >
                <span className="material-symbols-outlined text-[13px]">add</span> Add
              </button>
            </div>
          </div>

          {/* Tasting Notes */}
          <div>
            <span className="block text-xs font-semibold text-[#504442] mb-1.5">Signature Flavor Notes</span>
            <div className="flex flex-wrap gap-1.5">
              {user.signatureFlavorNotes.map((note, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#f7f3ed] text-[#1c1c18] text-xs font-medium border border-[#e6e2dc]/50">
                  {note}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('ai-rec')}
            className="w-full py-2.5 rounded-xl bg-[#f7f3ed] text-[#271310] text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#ebe8e2] transition-colors active:scale-98"
          >
            <span>Edit Taste Preferences</span>
            <span className="material-symbols-outlined text-[17px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Section 2: Coffee Passport & Membership */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#7d562d] text-[18px]">badge</span>
          <h3 className="text-xs sm:text-sm font-bold text-[#271310]">Passport & City Perks</h3>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e6e2dc] flex flex-col gap-3">
          {/* Active Pass Banner */}
          <div className="p-3 rounded-xl bg-[#f7f3ed] flex items-center justify-between border border-[#e6e2dc]/60">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#ffca98] flex items-center justify-center text-[#7a532a]">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  workspace_premium
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#271310]">Jakarta Specialty Pass</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-[#7ca034] animate-pulse"></span>
                </div>
                <p className="text-[11px] text-[#504442]">Active • Valid until Dec 2026</p>
              </div>
            </div>

            <button
              onClick={() => setShowQRModal(true)}
              className="px-3 py-1.5 rounded-full bg-[#271310] text-white text-xs font-bold active:scale-95 transition-transform"
            >
              View QR
            </button>
          </div>

          {/* Offline Map Download */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-start gap-2.5 min-w-0 pr-2">
              <div className="w-8 h-8 rounded-full bg-[#f1ede7] flex items-center justify-center text-[#271310] shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[17px]">map</span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#271310] block">Offline Curated Cafe Map</span>
                <span className="text-[11px] text-[#504442] block">Senopati, Menteng & BSD (34 MB)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleOfflineMap}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                offlineMap ? 'bg-[#271310]' : 'bg-[#e6e2dc]'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                  offlineMap ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: App & Account Settings */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#7d562d] text-[18px]">tune</span>
          <h3 className="text-xs sm:text-sm font-bold text-[#271310]">App & Account Settings</h3>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#e6e2dc] divide-y divide-[#f1ede7] overflow-hidden">
          {/* Notifications Toggle */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#f1ede7] flex items-center justify-center text-[#271310]">
                <span className="material-symbols-outlined text-[17px]">notifications_active</span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#271310] block">Roaster Drops & Stamp Alerts</span>
                <span className="text-[10px] text-[#504442] block">Weekly beans, stamp events</span>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleNotifs}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                notifs ? 'bg-[#271310]' : 'bg-[#e6e2dc]'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                  notifs ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Milk & Dietary */}
          <button
            type="button"
            onClick={() => alert('Dietary Preferences: Oat Milk set by default (Minor Figures / Oatside)')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#f7f3ed] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#f1ede7] flex items-center justify-center text-[#271310]">
                <span className="material-symbols-outlined text-[17px]">water_bottle</span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#271310] block">Dietary & Milk Preference</span>
                <span className="text-[10px] text-[#7d562d] font-semibold block">{user.dietaryPreference}</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#827472] text-[18px]">chevron_right</span>
          </button>

          {/* Theme */}
          <button
            type="button"
            onClick={() => alert('Theme: Light Warm Mode calibrated to specialty parchment aesthetic.')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#f7f3ed] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#f1ede7] flex items-center justify-center text-[#271310]">
                <span className="material-symbols-outlined text-[17px]">palette</span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#271310] block">Visual Atmosphere</span>
                <span className="text-[10px] text-[#504442] block">{user.visualAtmosphere}</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#827472] text-[18px]">chevron_right</span>
          </button>

          {/* Security & Logins */}
          <button
            type="button"
            onClick={() => alert('Linked Logins: Google (Connected), Apple ID (Connected)')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#f7f3ed] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#f1ede7] flex items-center justify-center text-[#271310]">
                <span className="material-symbols-outlined text-[17px]">shield</span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#271310] block">Security & Linked Logins</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#f1ede7] text-[#504442]">Google</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#f1ede7] text-[#504442]">Apple ID</span>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#827472] text-[18px]">chevron_right</span>
          </button>

          {/* Guidelines */}
          <button
            type="button"
            onClick={() => alert('Cupping Code: 1. Maintain neutrality 2. Note brew extraction temperature 3. Respect roaster origin.')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#f7f3ed] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#f1ede7] flex items-center justify-center text-[#271310]">
                <span className="material-symbols-outlined text-[17px]">menu_book</span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#271310] block">Guidelines & Cupping Code</span>
                <span className="text-[10px] text-[#504442] block">Specialty coffee review ethics</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#827472] text-[18px]">chevron_right</span>
          </button>

          {/* Feedback */}
          <button
            type="button"
            onClick={() => alert('Thank you! Send roastery tips to: barista@kopifinder.id')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#f7f3ed] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#f1ede7] flex items-center justify-center text-[#271310]">
                <span className="material-symbols-outlined text-[17px]">rate_review</span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#271310] block">Send Barista Feedback</span>
                <span className="text-[10px] text-[#504442] block">Suggest beans, report cafes</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#827472] text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Logout & App Info */}
      <div className="mt-4 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => onNavigate('welcome')}
          className="w-full py-3 rounded-xl bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-transform hover:opacity-90"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Sign Out of KopiFinder</span>
        </button>

        <div className="text-center px-4">
          <p className="text-xs font-bold text-[#504442]">KopiFinder v2.4.0 (Build 384)</p>
          <p className="text-[10px] text-[#827472] mt-0.5">
            Crafted with passion for Indonesian Specialty Coffee ☕
          </p>
        </div>
      </div>

      {/* QR Code Modal Dialog */}
      {showQRModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#271310]/60 backdrop-blur-xs p-4 animate-in fade-in"
          onClick={() => setShowQRModal(false)}
        >
          <div
            className="w-full max-w-xs bg-white rounded-3xl p-5 flex flex-col items-center text-center shadow-2xl border border-[#e6e2dc]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-[#ffca98] flex items-center justify-center text-[#7a532a] mb-2">
              <span className="material-symbols-outlined text-[24px]">qr_code_2</span>
            </div>
            <h3 className="text-sm font-bold text-[#271310]">Jakarta Specialty Pass</h3>
            <p className="text-[11px] text-[#504442] mt-0.5 mb-3">Member ID: #KP-4098-ALYA</p>

            {/* Mock QR SVG */}
            <div className="p-3 bg-[#f7f3ed] rounded-2xl border border-[#e6e2dc] mb-3">
              <svg className="w-40 h-40 text-[#271310]" fill="currentColor" viewBox="0 0 100 100">
                <rect x="10" y="10" width="24" height="24" rx="4" />
                <rect x="14" y="14" width="16" height="16" fill="white" rx="2" />
                <rect x="18" y="18" width="8" height="8" rx="1" />
                
                <rect x="66" y="10" width="24" height="24" rx="4" />
                <rect x="70" y="14" width="16" height="16" fill="white" rx="2" />
                <rect x="74" y="18" width="8" height="8" rx="1" />

                <rect x="10" y="66" width="24" height="24" rx="4" />
                <rect x="14" y="70" width="16" height="16" fill="white" rx="2" />
                <rect x="18" y="74" width="8" height="8" rx="1" />

                <rect x="42" y="15" width="16" height="6" />
                <rect x="42" y="28" width="8" height="12" />
                <rect x="56" y="28" width="18" height="6" />
                <rect x="15" y="42" width="12" height="8" />
                <rect x="36" y="45" width="28" height="10" />
                <rect x="70" y="42" width="20" height="8" />
                <rect x="45" y="64" width="10" height="26" />
                <rect x="62" y="64" width="28" height="8" />
                <rect x="75" y="78" width="15" height="12" />
              </svg>
            </div>

            <p className="text-[10px] text-[#504442] mb-3">Show to barista at counter for roaster stamp validation</p>

            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#271310] text-white text-xs font-bold shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
