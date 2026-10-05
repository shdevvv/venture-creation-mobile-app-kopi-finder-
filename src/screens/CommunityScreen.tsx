import React, { useState } from 'react';
import { CuppingNote, ScreenName } from '../types';

interface CommunityScreenProps {
  posts: CuppingNote[];
  userAvatar: string;
  onNavigate: (screen: ScreenName) => void;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({
  posts,
  userAvatar,
  onNavigate
}) => {
  const [feedPosts, setFeedPosts] = useState<CuppingNote[]>(posts);
  const [activeSegment, setActiveSegment] = useState('Trending');
  const [rsvpState, setRsvpState] = useState(false);

  const segments = ['Trending', 'Cupping Notes', 'Barista Corner', 'Nearby Check-ins'];

  const handleLike = (postId: string) => {
    setFeedPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const userLiked = !post.userLiked;
          return {
            ...post,
            userLiked,
            likes: userLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  const handleSaveToPassport = (postId: string) => {
    setFeedPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            savedToPassport: !post.savedToPassport
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="flex flex-col w-full pb-28 bg-[#fdf9f3]">
      {/* Community Context Header & Live Stats */}
      <section className="px-4 pt-3 pb-1 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="font-headline-lg text-xl sm:text-2xl font-bold text-[#271310] tracking-tight">
              Coffee Circle
            </h1>
            <p className="text-xs text-[#504442]">Stories, cupping notes & roaster check-ins</p>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffca98]/40 text-[#2c1600] text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#7ca034] animate-ping"></span>
            <span>142 Roasters Active</span>
          </div>
        </div>

        {/* Segmented Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 -mx-4 px-4 no-scrollbar">
          {segments.map((seg) => {
            const isActive = activeSegment === seg;
            return (
              <button
                key={seg}
                onClick={() => setActiveSegment(seg)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 shadow-xs transition-all flex items-center gap-1 ${
                  isActive
                    ? 'bg-[#3e2723] text-white'
                    : 'bg-[#ebe8e2] text-[#1c1c18] hover:bg-[#e6e2dc]'
                }`}
              >
                {seg === 'Trending' && (
                  <span className="material-symbols-outlined text-[15px] text-[#ffdcbd]">
                    local_fire_department
                  </span>
                )}
                <span>{seg}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Quick Share / Cupping Note Log Action Bar */}
      <section className="px-4 my-2">
        <div className="p-3 bg-white rounded-2xl shadow-sm border border-[#e6e2dc] flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              alt="My Avatar"
              className="w-10 h-10 rounded-full object-cover shadow-xs"
              src={userAvatar}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#7ca034] rounded-full ring-2 ring-white"></span>
          </div>

          <button
            onClick={() => onNavigate('log-visit')}
            className="flex-1 bg-[#f7f3ed] hover:bg-[#ebe8e2] text-left px-3.5 py-2 rounded-full text-[#504442] text-xs font-medium transition-colors flex items-center justify-between"
          >
            <span className="truncate">Brewed something special? Log notes...</span>
            <span className="material-symbols-outlined text-[#7d562d] text-[18px]">stylus_note</span>
          </button>

          <button
            onClick={() => onNavigate('log-visit')}
            aria-label="Take cupping snapshot"
            className="w-10 h-10 rounded-full bg-[#3e2723] text-white flex items-center justify-center shrink-0 shadow-xs active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
          </button>
        </div>
      </section>

      {/* Weekly Community Roaster Challenge Banner */}
      <section className="px-4 my-1">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#3e2723] via-[#271310] to-[#3e2723] text-white p-4 shadow-sm border border-[#5b403c]">
          <div className="absolute -right-4 -bottom-6 opacity-10 text-white pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">science</span>
          </div>

          <div className="relative z-10 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#ffdcbd] text-[10px] font-bold tracking-wider uppercase">
                <span className="material-symbols-outlined text-[15px] text-[#ffdcbd]">workspace_premium</span>
                July Origin Challenge
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/15 text-[10px] font-bold">11 Days Left</span>
            </div>

            <p className="font-headline-sm text-sm sm:text-base font-bold leading-snug">
              Taste 3 Anaerobic Beans This Month
            </p>
            <p className="text-xs text-[#ae8d87] leading-relaxed">
              Log 3 anaerobic lots to unlock the exclusive <strong className="text-[#ffdcbd] font-semibold">Fermentation Alchemist</strong> badge & get 15% off Tanamera Roasters!
            </p>

            {/* Progress */}
            <div className="mt-1 flex flex-col gap-1">
              <div className="flex justify-between text-[11px] font-bold text-[#ffdcbd]">
                <span>Progress: 1 of 3 cupped</span>
                <span>33%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full bg-[#ffdcbd] rounded-full transition-all duration-500" style={{ width: '33.3%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feed Posts */}
      <div className="flex flex-col gap-4 px-4 mt-2">
        {feedPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-2xl shadow-sm border border-[#e6e2dc] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 pb-2 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    alt={post.authorName}
                    src={post.authorAvatar}
                  />
                  {post.isVerified && (
                    <span className="material-symbols-outlined absolute -bottom-1 -right-1 text-[#add461] bg-[#213200] rounded-full text-[13px] p-0.5">
                      verified
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-[#271310]">{post.authorName}</span>
                    <span className="text-[11px] text-[#504442]">{post.authorHandle}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap mt-0.5">
                    <span className="px-2 py-0.2 rounded-full bg-[#ffca98]/40 text-[#7a532a] text-[10px] font-bold">
                      {post.authorBadge}
                    </span>
                    <span className="text-[10px] text-[#827472]">• {post.timeAgo}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert(`Share post by ${post.authorName}`)}
                aria-label="Options"
                className="text-[#827472] hover:text-[#271310] p-1"
              >
                <span className="material-symbols-outlined text-[18px]">more_horiz</span>
              </button>
            </div>

            {/* Check-in location */}
            <div className="px-4 py-0.5 flex items-center gap-1 text-[#7d562d] text-xs">
              <span className="material-symbols-outlined text-[15px]">pin_drop</span>
              <span>
                Checked in at <strong className="font-semibold text-[#271310]">{post.cafeName}</strong>, {post.cafeLocation}
              </span>
            </div>

            {/* Narrative text */}
            <div className="px-4 py-2">
              <p className="text-xs sm:text-sm text-[#1c1c18] leading-relaxed">{post.content}</p>
            </div>

            {/* Brew recipe if present */}
            {post.brewRecipe && (
              <div className="mx-4 mb-2 p-2.5 rounded-xl bg-[#f7f3ed] grid grid-cols-4 gap-2 text-center border border-[#e6e2dc]/60">
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#827472] uppercase font-bold tracking-wider">Method</span>
                  <span className="text-xs font-bold text-[#271310]">{post.brewRecipe.method}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#827472] uppercase font-bold tracking-wider">Dose</span>
                  <span className="text-xs font-bold text-[#271310]">{post.brewRecipe.dose}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#827472] uppercase font-bold tracking-wider">Temp</span>
                  <span className="text-xs font-bold text-[#271310]">{post.brewRecipe.temp}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#827472] uppercase font-bold tracking-wider">Time</span>
                  <span className="text-xs font-bold text-[#271310]">{post.brewRecipe.time}</span>
                </div>
              </div>
            )}

            {/* Sensory Cupping Scores if present */}
            {post.sensoryScores && (
              <div className="mx-4 my-1 p-3 rounded-xl bg-[#f1ede7] flex flex-col gap-2 border border-[#e6e2dc]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#271310] text-xs font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[15px] text-[#7d562d]">donut_small</span>
                    Cupping Flavor Profile
                  </div>
                  <span className="text-xs font-bold text-[#7d562d]">SCA Score: {post.scaScore}</span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#504442]">Acidity</span>
                    <div className="flex items-center gap-1 font-bold text-[#271310]">
                      <span>{post.sensoryScores.acidity}/5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#504442]">Sweetness</span>
                    <div className="flex items-center gap-1 font-bold text-[#271310]">
                      <span>{post.sensoryScores.sweetness}/5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#504442]">Body</span>
                    <div className="flex items-center gap-1 font-bold text-[#271310]">
                      <span>{post.sensoryScores.body}/5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#504442]">Aroma</span>
                    <div className="flex items-center gap-1 font-bold text-[#271310]">
                      <span>{post.sensoryScores.aroma}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Work stats if present */}
            {post.workStats && (
              <div className="mx-4 my-2 p-3 rounded-xl bg-[#f7f3ed] flex flex-col gap-2 border border-[#e6e2dc]/60">
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-1 text-xs font-bold text-[#271310]">
                    <span className="material-symbols-outlined text-[#7ca034] text-[16px]">verified</span>
                    Crowd-Verified Work Cafe
                  </div>
                  <span className="px-2 py-0.2 rounded-full bg-[#c8f17a] text-[#131f00] text-[9px] font-bold">
                    Optimal WFH
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-lg bg-white flex flex-col items-center text-center shadow-xs">
                    <span className="text-xs font-bold text-[#271310]">
                      {post.workStats.downloadMbps}
                    </span>
                    <span className="text-[9px] text-[#827472]">Mbps Down</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white flex flex-col items-center text-center shadow-xs">
                    <span className="text-xs font-bold text-[#271310]">
                      {post.workStats.noiseDb} dB
                    </span>
                    <span className="text-[9px] text-[#827472]">{post.workStats.noiseLabel}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white flex flex-col items-center text-center shadow-xs">
                    <span className="text-xs font-bold text-[#271310]">
                      {post.workStats.socketRatio}
                    </span>
                    <span className="text-[9px] text-[#827472]">Sockets</span>
                  </div>
                </div>
              </div>
            )}

            {/* Attached Photo */}
            {post.image && (
              <div className="relative w-full h-52 overflow-hidden bg-[#ebe8e2]">
                <img
                  className="w-full h-full object-cover"
                  alt={post.imageBadge || 'Cupping'}
                  src={post.image}
                />
                {post.imageBadge && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#3e2723]/85 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[13px] text-[#ffdcbd]">eco</span>
                    {post.imageBadge}
                  </div>
                )}
              </div>
            )}

            {/* Hashtags */}
            <div className="p-3 pb-1 flex flex-wrap gap-1.5">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="text-[#7d562d] text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>

            {/* Interaction Bar */}
            <div className="px-4 py-3 bg-white flex items-center justify-between border-t border-[#f1ede7]">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 text-xs font-bold active:scale-90 transition-transform ${
                    post.userLiked ? 'text-[#7d562d]' : 'text-[#271310]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={post.userLiked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    coffee
                  </span>
                  <span>{post.likes}</span>
                </button>

                <button
                  onClick={() => alert(`View ${post.comments} cupping discussion comments`)}
                  className="flex items-center gap-1 text-xs text-[#504442] hover:text-[#271310] active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[18px]">chat_bubble_outline</span>
                  <span>{post.comments}</span>
                </button>

                <button
                  onClick={() => alert('Post link copied to clipboard!')}
                  aria-label="Share"
                  className="flex items-center text-[#504442] hover:text-[#271310] active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[18px]">ios_share</span>
                </button>
              </div>

              <button
                onClick={() => handleSaveToPassport(post.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors active:scale-95 ${
                  post.savedToPassport
                    ? 'bg-[#ffca98] text-[#2c1600]'
                    : 'bg-[#ffca98]/30 hover:bg-[#ffca98]/60 text-[#7a532a]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  {post.savedToPassport ? 'bookmark_added' : 'bookmark_add'}
                </span>
                <span>{post.savedToPassport ? 'In Passport' : 'Save to Passport'}</span>
              </button>
            </div>
          </article>
        ))}

        {/* Barista Highlight Mini-Card */}
        <article className="p-3.5 rounded-2xl bg-[#f7f3ed] border border-[#e6e2dc] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ffca98] flex items-center justify-center text-[#2c1600] shrink-0">
              <span className="material-symbols-outlined text-[20px]">local_cafe</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-[#271310]">Guest Roaster Friday</span>
              <span className="text-[11px] text-[#504442]">Three Folks Roastery takeover at Senopati Bar</span>
            </div>
          </div>

          <button
            onClick={() => setRsvpState(!rsvpState)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold active:scale-95 transition-all shrink-0 ${
              rsvpState
                ? 'bg-[#c8f17a] text-[#131f00]'
                : 'bg-[#271310] text-white'
            }`}
          >
            {rsvpState ? 'RSVP Confirmed ✓' : 'RSVP Free'}
          </button>
        </article>
      </div>
    </div>
  );
};
