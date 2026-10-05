import React from 'react';
import { ScreenName } from '../types';

interface TopHeaderProps {
  currentScreen: ScreenName;
  selectedDistrict: string;
  onNavigate: (screen: ScreenName) => void;
  onGoBack: () => void;
  onOpenDistrictPicker: () => void;
  onOpenProfile: () => void;
  userAvatar: string;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentScreen,
  selectedDistrict,
  onNavigate,
  onGoBack,
  onOpenDistrictPicker,
  onOpenProfile,
  userAvatar
}) => {
  const isTabScreen = ['home', 'map', 'ai-rec', 'community', 'passport'].includes(currentScreen);
  const isAuthScreen = ['welcome', 'signin', 'signup', 'verify-code'].includes(currentScreen);

  if (isAuthScreen) {
    if (currentScreen === 'welcome') return null;

    let authTitle = 'Sign In';
    if (currentScreen === 'signup') authTitle = 'Create Account';
    if (currentScreen === 'verify-code') authTitle = 'Verify Code';

    return (
      <header className="sticky top-0 inset-x-0 z-40 bg-[#fdf9f3]/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(62,39,35,0.05)] transition-all">
        <div className="h-14 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoBack}
              aria-label="Go back"
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#271310] hover:bg-[#f1ede7] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <div className="w-7 h-7 rounded-lg bg-[#3e2723] flex items-center justify-center text-[#ffca98] shadow-xs">
              <span className="material-symbols-outlined text-[16px]">coffee</span>
            </div>
            <span className="font-headline-sm font-semibold text-[#271310]">{authTitle}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#271310] text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[17px]">person</span>
          </div>
        </div>
      </header>
    );
  }

  // Titles for subpages
  let screenTitle = '';
  if (currentScreen === 'cafe-detail') screenTitle = 'Cafe Detail';
  else if (currentScreen === 'districts') screenTitle = 'Neighborhood & Coffee Districts';
  else if (currentScreen === 'log-visit') screenTitle = 'Log Visit & Cupping';
  else if (currentScreen === 'profile') screenTitle = 'User Profile & Settings';
  else if (currentScreen === 'voucher') screenTitle = 'Claim Deal & Perk';
  else if (currentScreen === 'achievements') screenTitle = 'All Achievements';
  else if (currentScreen === 'bean-story') screenTitle = 'Daily Staff Pick • Bean Story';
  else if (currentScreen === 'counter-session') screenTitle = 'Active Counter Session';

  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-[#fdf9f3]/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(62,39,35,0.05)] transition-all">
      <div className="h-14 px-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {!isTabScreen ? (
            <button
              onClick={onGoBack}
              aria-label="Go back"
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#271310] hover:bg-[#f1ede7] active:scale-95 transition-all shrink-0"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
            </button>
          ) : null}

          {/* Logo Brand Emblem */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 rounded-lg bg-[#3e2723] flex items-center justify-center text-[#ffca98] shadow-xs">
              <span className="material-symbols-outlined text-[16px]">coffee</span>
            </div>
          </div>

          {/* If subscreen has title, show title. Else show Location dropdown */}
          {screenTitle ? (
            <h1 className="font-headline-sm font-semibold text-[#271310] truncate max-w-[190px]">
              {screenTitle}
            </h1>
          ) : (
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-[#7d562d] uppercase tracking-wider leading-none">
                Location
              </span>
              <button
                onClick={onOpenDistrictPicker}
                className="flex items-center gap-0.5 text-left min-w-0 group hover:opacity-85 transition-opacity"
              >
                <span className="font-semibold text-sm text-[#271310] truncate max-w-[140px] leading-tight">
                  {selectedDistrict}
                </span>
                <span className="material-symbols-outlined text-[18px] text-[#504442] group-hover:text-[#271310] transition-colors shrink-0">
                  expand_more
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1 shrink-0">
          {!isTabScreen && (
            <button
              aria-label="Share"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: 'KopiFinder Jakarta', url: window.location.href }).catch(() => {});
                } else {
                  alert('Copied cafe link to clipboard!');
                }
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#271310] hover:bg-[#f1ede7] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
          )}

          {/* Profile Button with Notification Indicator */}
          <div className="relative flex items-center">
            <button
              onClick={onOpenProfile}
              aria-label="Open User Profile"
              className="w-9 h-9 rounded-full flex items-center justify-center p-0.5 focus:outline-none focus:ring-2 focus:ring-[#7d562d]/40 transition-transform active:scale-95"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover shadow-[0_2px_8px_rgba(62,39,35,0.12)]"
                src={userAvatar}
              />
            </button>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-[#fdf9f3]"></span>
          </div>
        </div>
      </div>
    </header>
  );
};
