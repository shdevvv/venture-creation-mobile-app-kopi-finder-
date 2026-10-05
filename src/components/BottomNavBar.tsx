import React from 'react';
import { TabName } from '../types';

interface BottomNavBarProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabName; label: string; icon: string; badge?: boolean }[] = [
    { id: 'home', label: 'Home', icon: 'explore' },
    { id: 'map', label: 'Map', icon: 'location_on' },
    { id: 'ai-rec', label: 'AI Rec', icon: 'auto_awesome', badge: true },
    { id: 'community', label: 'Community', icon: 'forum' },
    { id: 'passport', label: 'Passport', icon: 'verified' }
  ];

  return (
    <nav className="sticky bottom-0 inset-x-0 z-40 bg-[#ffffff] backdrop-blur-xl shadow-[0_-6px_24px_rgba(62,39,35,0.08)] border-t border-[#f1ede7] rounded-t-2xl shrink-0 py-1.5 px-1 select-none">
      <div className="flex justify-around items-center h-14 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[46px] py-0.5 transition-all relative ${
                isActive
                  ? 'text-[#271310] font-bold scale-105'
                  : 'text-[#504442] hover:text-[#271310] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={`material-symbols-outlined text-[24px] transition-transform ${
                    isActive ? 'text-[#3e2723]' : 'text-[#504442]'
                  }`}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>

                {tab.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ffca98] shadow-[0_0_8px_rgba(212,163,115,0.9)] animate-pulse" />
                )}
              </div>

              <span
                className={`text-[10px] mt-0.5 tracking-tight ${
                  isActive ? 'font-bold text-[#271310]' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>

              {/* Active amber indicator dot */}
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#7d562d] mt-0.5 animate-in fade-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
