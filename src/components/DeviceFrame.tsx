import React from 'react';
import { DeviceMode, ScreenName } from '../types';

interface DeviceFrameProps {
  deviceMode: DeviceMode;
  onDeviceChange: (mode: DeviceMode) => void;
  currentScreen: ScreenName;
  onScreenChange: (screen: ScreenName) => void;
  onOpenCodeModal: () => void;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  deviceMode,
  onDeviceChange,
  currentScreen,
  onScreenChange,
  onOpenCodeModal,
  children
}) => {
  const screensList: { id: ScreenName; label: string }[] = [
    { id: 'home', label: '1. Home Discovery' },
    { id: 'map', label: '2. Interactive Map' },
    { id: 'cafe-detail', label: '3. Cafe Detail (Tanamera)' },
    { id: 'districts', label: '4. District Selector' },
    { id: 'log-visit', label: '5. Log Cupping & Review' },
    { id: 'ai-rec', label: '6. AI Coffee Matchmaker' },
    { id: 'community', label: '7. Coffee Circle (Feed)' },
    { id: 'passport', label: '8. Artisanal Passport' },
    { id: 'achievements', label: '9. All Achievements' },
    { id: 'voucher', label: '10. B1G1 Deal Voucher' },
    { id: 'profile', label: '11. Profile & Settings' },
    { id: 'welcome', label: '12. Welcome Onboarding' },
    { id: 'signin', label: '13. Sign In' },
    { id: 'signup', label: '14. Create Account' },
    { id: 'verify-code', label: '15. Verify Code (Password)' },
    { id: 'bean-story', label: '16. Daily Staff Pick • Bean Story' },
    { id: 'counter-session', label: '17. Active Counter Session (Live QR)' },
  ];

  return (
    <div className="min-h-screen bg-[#221c1a] flex flex-col items-center justify-start text-[#1c1c18]">
      {/* Top Universal Preview Bar */}
      <div className="w-full bg-[#181312] border-b border-[#3e2723] px-3 py-2 flex flex-wrap items-center justify-between gap-2 z-50 text-xs text-white">
        {/* Left: Brand & Screen Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 font-bold text-[#ffca98]">
            <span className="material-symbols-outlined text-[18px]">coffee</span>
            <span>KopiFinder</span>
          </div>

          <div className="h-4 w-px bg-[#3e2723] hidden sm:block"></div>

          {/* Quick Jump Selector */}
          <div className="flex items-center gap-1 bg-[#271310] px-2 py-1 rounded-lg border border-[#3e2723]">
            <span className="text-[10px] text-[#ae8d87] uppercase font-bold">Screen:</span>
            <select
              value={currentScreen}
              onChange={(e) => onScreenChange(e.target.value as ScreenName)}
              className="bg-transparent text-white font-bold text-xs outline-none cursor-pointer"
            >
              {screensList.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#271310] text-white">
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Device Switcher & Code Viewer */}
        <div className="flex items-center gap-2">
          {/* Device Segmented Toggle */}
          <div className="flex items-center bg-[#271310] p-0.5 rounded-lg border border-[#3e2723]">
            <button
              onClick={() => onDeviceChange('ios')}
              title="iOS iPhone Preview"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                deviceMode === 'ios'
                  ? 'bg-[#ffca98] text-[#2c1600]'
                  : 'text-[#d3c3c0] hover:text-white'
              }`}
            >
              <span>📱 iOS</span>
            </button>

            <button
              onClick={() => onDeviceChange('android')}
              title="Android Pixel Preview"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                deviceMode === 'android'
                  ? 'bg-[#ffca98] text-[#2c1600]'
                  : 'text-[#d3c3c0] hover:text-white'
              }`}
            >
              <span>🤖 Android</span>
            </button>

            <button
              onClick={() => onDeviceChange('responsive')}
              title="Full Responsive Mobile"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                deviceMode === 'responsive'
                  ? 'bg-[#ffca98] text-[#2c1600]'
                  : 'text-[#d3c3c0] hover:text-white'
              }`}
            >
              <span>🖥️ Full View</span>
            </button>
          </div>

          {/* Download All Code (.zip) Button */}
          <button
            onClick={onOpenCodeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c8f17a] hover:bg-[#b5e065] text-[#131f00] text-[11px] font-extrabold shadow-md active:scale-95 transition-all cursor-pointer"
            title="Download seluruh source code project (.zip)"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Download Code (.zip)</span>
          </button>

          {/* React Native Code Button */}
          <button
            onClick={onOpenCodeModal}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#3e2723] hover:bg-[#5b403c] text-[#ffdcbd] text-[11px] font-bold border border-[#7d562d] active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">code</span>
            <span className="hidden sm:inline">Lihat Code</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 w-full flex items-center justify-center p-0 sm:py-6">
        {deviceMode === 'responsive' ? (
          /* Full Viewport / Native responsive */
          <div className="w-full max-w-md min-h-[90vh] bg-[#fdf9f3] sm:rounded-3xl overflow-hidden shadow-2xl relative flex flex-col border border-[#3e2723]/30">
            {children}
          </div>
        ) : deviceMode === 'ios' ? (
          /* Realistic iPhone 16 Pro Frame */
          <div className="relative w-[390px] h-[844px] bg-[#000000] rounded-[52px] p-[10px] shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_0_2px_#3e2723] flex flex-col shrink-0 animate-in fade-in">
            {/* Outer phone metal rim */}
            <div className="relative w-full h-full bg-[#fdf9f3] rounded-[42px] overflow-hidden flex flex-col">
              {/* iOS Status Bar with Dynamic Island */}
              <div className="w-full h-11 px-6 flex items-center justify-between bg-[#fdf9f3] shrink-0 z-50 select-none">
                <span className="text-[14px] font-semibold text-[#1c1c18] font-sans">9:41</span>
                {/* Dynamic Island Pill */}
                <div className="w-28 h-6 bg-[#000000] rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1c1c18] ml-auto mr-2"></div>
                </div>
                {/* Icons */}
                <div className="flex items-center gap-1 text-[#1c1c18]">
                  <span className="material-symbols-outlined text-[15px]">signal_cellular_alt</span>
                  <span className="material-symbols-outlined text-[15px]">wifi</span>
                  <span className="material-symbols-outlined text-[18px]">battery_full</span>
                </div>
              </div>

              {/* Screen Body */}
              <div className="flex-1 w-full overflow-hidden relative flex flex-col">
                {children}
              </div>

              {/* iOS Home Indicator Bar */}
              <div className="w-full h-4 bg-white flex items-center justify-center pointer-events-none z-50 shrink-0">
                <div className="w-32 h-1 bg-[#1c1c18]/60 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          /* Realistic Android Google Pixel Frame */
          <div className="relative w-[392px] h-[840px] bg-[#1a1817] rounded-[44px] p-[8px] shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_0_2px_#3e2723] flex flex-col shrink-0 animate-in fade-in">
            <div className="relative w-full h-full bg-[#fdf9f3] rounded-[36px] overflow-hidden flex flex-col">
              {/* Android Status Bar with Center Punch Hole */}
              <div className="w-full h-9 px-5 flex items-center justify-between bg-[#fdf9f3] shrink-0 z-50 select-none">
                <span className="text-xs font-bold text-[#1c1c18]">9:41</span>
                {/* Punch Hole Camera */}
                <div className="w-3.5 h-3.5 bg-[#000000] rounded-full"></div>
                {/* Icons */}
                <div className="flex items-center gap-1 text-[#1c1c18]">
                  <span className="material-symbols-outlined text-[14px]">wifi</span>
                  <span className="text-[10px] font-bold">98%</span>
                  <span className="material-symbols-outlined text-[16px]">battery_5_bar</span>
                </div>
              </div>

              {/* Screen Body */}
              <div className="flex-1 w-full overflow-hidden relative flex flex-col">
                {children}
              </div>

              {/* Android Gesture Navigation Bar */}
              <div className="w-full h-3 bg-white flex items-center justify-center pointer-events-none z-50 shrink-0">
                <div className="w-20 h-1 bg-[#1c1c18]/70 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
