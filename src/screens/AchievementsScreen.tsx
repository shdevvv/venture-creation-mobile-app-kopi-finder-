import React, { useState } from 'react';
import { BadgeItem, ScreenName } from '../types';

interface AchievementsScreenProps {
  badges: BadgeItem[];
  onNavigate: (screen: ScreenName) => void;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ badges, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);

  const categories = [
    { id: 'All', label: 'All (24)' },
    { id: 'origins', label: 'Origins (6)' },
    { id: 'craft', label: 'Brew Craft (6)' },
    { id: 'community', label: 'Community (6)' },
    { id: 'roasteries', label: 'Roasteries (6)' }
  ];

  const filteredBadges = badges.filter((b) => {
    if (selectedCategory === 'All') return true;
    return b.category === selectedCategory;
  });

  const originsBadges = filteredBadges.filter((b) => b.category === 'origins');
  const craftBadges = filteredBadges.filter((b) => b.category === 'craft');
  const communityBadges = filteredBadges.filter((b) => b.category === 'community');
  const roasteryBadges = filteredBadges.filter((b) => b.category === 'roasteries');

  return (
    <div className="flex flex-col w-full px-4 pt-1 pb-28 bg-[#fdf9f3] gap-4">
      {/* Sub-header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={() => onNavigate('passport')}
            className="w-9 h-9 rounded-full bg-[#f1ede7] flex items-center justify-center text-[#271310] active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[#271310] tracking-tight truncate">
              All Achievements
            </span>
            <span className="text-[10px] text-[#7d562d] uppercase tracking-wider font-semibold">
              Coffee Passport • Vol. 1
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center gap-1 px-2.5 py-1 bg-[#ffca98]/50 text-[#2c1600] rounded-full shadow-xs">
            <span className="material-symbols-outlined text-[14px] text-[#7d562d]">military_tech</span>
            <span className="text-xs font-bold whitespace-nowrap">Cupper Lvl 4</span>
          </div>
        </div>
      </div>

      {/* Hero Summary Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#3e2723] text-white p-4 shadow-lg flex flex-col gap-3">
        <div className="relative z-10 flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#ffdcbd]">auto_awesome</span>
              <span className="text-[10px] text-[#ffdcbd] tracking-wide uppercase font-bold">
                Tasting Milestones
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">11 of 24 Badges</h2>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <span className="text-[10px] text-[#ae8d87]">Brew Rewards</span>
            <div className="flex items-center gap-1 text-[#ffdcbd] font-bold text-sm">
              <span className="material-symbols-outlined text-[17px]">local_cafe</span>
              <span>1,450 pts</span>
            </div>
          </div>
        </div>

        {/* Progress Track */}
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex justify-between items-center text-xs text-[#e6e2dc]">
            <span>Curator Journey</span>
            <span className="font-bold text-[#ffdcbd]">45% Completed</span>
          </div>
          <div className="w-full h-2 bg-[#271310]/80 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#7d562d] to-[#ffca98] rounded-full transition-all duration-700"
              style={{ width: '45%' }}
            ></div>
          </div>
        </div>

        {/* Current Flair */}
        <div className="relative z-10 flex items-center justify-between pt-0.5 text-white">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#add461] shrink-0"></span>
            <span className="text-xs text-[#dddad4]">Active Flair:</span>
            <span className="text-xs font-bold text-[#ffdcbd] truncate">Acidity Adventurer</span>
          </div>
          <button
            onClick={() => alert('Flair changed to: Single Origin Scholar!')}
            className="text-xs font-semibold text-[#ae8d87] hover:text-white transition-colors shrink-0 underline underline-offset-2"
          >
            Change
          </button>
        </div>
      </div>

      {/* Filter Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
        {categories.map((c) => {
          const isActive = selectedCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#3e2723] text-white shadow-xs'
                  : 'bg-[#f7f3ed] text-[#504442] hover:bg-[#ebe8e2]'
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Interactive Hint Callout */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-[#f7f3ed] text-[#504442] border border-[#e6e2dc]">
        <span className="material-symbols-outlined text-[18px] text-[#7d562d] shrink-0">touch_app</span>
        <p className="text-xs leading-tight">
          Tap any badge to inspect cupping notes, unlocks, and participating specialty cafes.
        </p>
      </div>

      {/* Category 1: Origins Explored */}
      {originsBadges.length > 0 && (
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px] text-[#7d562d]">public</span>
              <h3 className="text-xs sm:text-sm font-bold text-[#271310]">Origins Explored</h3>
            </div>
            <span className="text-[10px] text-[#504442] font-semibold">2 / 6 Unlocked</span>
          </div>

          <div className="flex flex-col gap-2">
            {originsBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} onSelect={setSelectedBadge} />
            ))}
          </div>
        </section>
      )}

      {/* Category 2: Brew Methods & Craft */}
      {craftBadges.length > 0 && (
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px] text-[#7d562d]">coffee_maker</span>
              <h3 className="text-xs sm:text-sm font-bold text-[#271310]">Brew Methods & Craft</h3>
            </div>
            <span className="text-[10px] text-[#504442] font-semibold">2 / 6 Unlocked</span>
          </div>

          <div className="flex flex-col gap-2">
            {craftBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} onSelect={setSelectedBadge} />
            ))}
          </div>
        </section>
      )}

      {/* Category 3: Social & Community */}
      {communityBadges.length > 0 && (
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px] text-[#7d562d]">forum</span>
              <h3 className="text-xs sm:text-sm font-bold text-[#271310]">Social & Community</h3>
            </div>
            <span className="text-[10px] text-[#504442] font-semibold">1 / 6 Unlocked</span>
          </div>

          <div className="flex flex-col gap-2">
            {communityBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} onSelect={setSelectedBadge} />
            ))}
          </div>
        </section>
      )}

      {/* Detail Bottom Sheet Modal */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#271310]/50 backdrop-blur-xs transition-opacity"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="w-full max-w-md bg-[#fdf9f3] rounded-t-3xl p-5 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div className="w-10 h-1 bg-[#d3c3c0] rounded-full mx-auto -mt-2 mb-1"></div>

            <div className="flex items-start gap-3">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  selectedBadge.isUnlocked
                    ? 'bg-[#ffdcbd] text-[#7d562d]'
                    : 'bg-[#e6e2dc] text-[#827472]'
                }`}
              >
                <span className="material-symbols-outlined text-[32px]">
                  {selectedBadge.icon}
                </span>
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold text-[#7d562d] uppercase tracking-wider">
                    {selectedBadge.rarity} Badge
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#ffca98] text-[#2c1600]">
                    {selectedBadge.points}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#271310] truncate mt-0.5">
                  {selectedBadge.title}
                </h3>
                <span className="text-xs text-[#7d562d] font-medium">{selectedBadge.status}</span>
              </div>
            </div>

            {/* Description & Lore */}
            <div className="p-3.5 bg-white rounded-2xl flex flex-col gap-1 border border-[#e6e2dc]">
              <span className="text-[10px] font-bold text-[#7d562d] uppercase tracking-wider">
                Criteria & Sensory Lore
              </span>
              <p className="text-xs text-[#1c1c18] leading-relaxed">
                {selectedBadge.lore || selectedBadge.description}
              </p>
            </div>

            {/* Participating Cafes */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-[#504442] uppercase tracking-wider">
                Eligible Cafes Nearby
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e6e2dc] text-xs font-semibold text-[#1c1c18] shrink-0">
                  <span className="material-symbols-outlined text-[15px] text-[#7d562d]">verified</span>
                  <span>Anomali Coffee (Senopati)</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e6e2dc] text-xs font-semibold text-[#1c1c18] shrink-0">
                  <span className="material-symbols-outlined text-[15px] text-[#7d562d]">verified</span>
                  <span>Tanamera Specialty</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#f1ede7] text-[#1c1c18] text-xs font-bold active:scale-95 transition-transform"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  alert(`Badge ${selectedBadge.title} shared to your Coffee Circle!`);
                  setSelectedBadge(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#3e2723] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[17px]">share</span>
                <span>Share Badge</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BadgeCard: React.FC<{
  badge: BadgeItem;
  onSelect: (b: BadgeItem) => void;
}> = ({ badge, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(badge)}
      className={`p-3.5 rounded-2xl flex gap-3 items-start cursor-pointer active:scale-[0.99] transition-all border ${
        badge.isUnlocked
          ? 'bg-white shadow-xs border-[#e6e2dc] hover:border-[#d3c3c0]'
          : 'bg-[#f7f3ed] border-[#e6e2dc]/60 opacity-85'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
          badge.isUnlocked ? 'bg-[#ffdcbd]/50 text-[#7d562d]' : 'bg-[#e6e2dc] text-[#827472]'
        }`}
      >
        <span className="material-symbols-outlined text-[26px]">
          {badge.icon}
        </span>
      </div>

      <div className="flex flex-col flex-1 min-w-0 gap-1">
        <div className="flex items-center justify-between gap-1">
          <h4 className="text-xs sm:text-sm font-bold text-[#271310] truncate">{badge.title}</h4>
          <span
            className={`px-2 py-0.2 rounded-full text-[9px] font-bold shrink-0 ${
              badge.rarity === 'Rare'
                ? 'bg-[#ffdcbd] text-[#2c1600]'
                : badge.rarity === 'Epic'
                ? 'bg-[#ffca98] text-[#2c1600]'
                : 'bg-[#ebe8e2] text-[#504442]'
            }`}
          >
            {badge.rarity}
          </span>
        </div>

        <p className="text-xs text-[#504442] line-clamp-2 leading-snug">{badge.description}</p>

        {badge.isUnlocked ? (
          <div className="flex items-center justify-between pt-0.5 text-[10px] text-[#7d562d] font-semibold">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">check_circle</span>
              {badge.earnedDate}
            </span>
            <span className="text-[#504442]">{badge.points}</span>
          </div>
        ) : badge.progressPercent ? (
          <div className="flex flex-col gap-1 pt-0.5">
            <div className="flex justify-between text-[10px] font-bold text-[#7d562d]">
              <span>Progress: {badge.progressText}</span>
              <span>{badge.progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#e6e2dc] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7d562d] rounded-full"
                style={{ width: `${badge.progressPercent}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[10px] text-[#827472] pt-0.5">
            <span className="material-symbols-outlined text-[13px]">lock</span>
            <span>Tap to see how to unlock</span>
          </div>
        )}
      </div>
    </article>
  );
};
