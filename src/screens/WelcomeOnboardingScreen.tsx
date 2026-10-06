import React from 'react';
import { ScreenName } from '../types';

interface WelcomeOnboardingScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export const WelcomeOnboardingScreen: React.FC<WelcomeOnboardingScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full px-5 py-4 min-w-0 bg-[#fdf9f3] min-h-screen">
      {/* Minimal Top Header Bar */}
      <header className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#3e2723] flex items-center justify-center p-1.5 shadow-sm text-[#ffca98]">
            <span className="material-symbols-outlined text-[20px]">coffee</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-base text-[#271310] font-bold tracking-tight">KopiFinder</span>
            <span className="text-[10px] text-[#7d562d] uppercase tracking-widest font-semibold -mt-0.5">Jakarta Edition</span>
          </div>
        </div>

        {/* Language & Region Selector */}
        <button
          onClick={() => alert('Language set to Indonesian / English')}
          aria-label="Select Language or Currency"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f1ede7] text-[#1c1c18] shadow-xs active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[16px] text-[#7d562d]">translate</span>
          <span className="text-xs font-semibold">ID / EN</span>
          <span className="material-symbols-outlined text-[14px] text-[#827472]">expand_more</span>
        </button>
      </header>

      {/* Atmospheric Hero Collage */}
      <section className="relative w-full rounded-2xl bg-[#ebe8e2] overflow-hidden p-3 shadow-sm mb-6">
        <div className="relative w-full h-52 rounded-xl overflow-hidden shadow-inner">
          <img
            className="w-full h-full object-cover"
            alt="Artisanal pour over coffee in ceramic cup with notebook"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr_gGlWY4O6PHUK2SzS3uipNu-Yc15nuil4uoD-e5SNVVSTySI75eJhaulfxegaxTlVMEQpjxoHK39sArNqlY6FgrTidnkjj00xm6VSJF16GX6xXjz84t8zV6w-7QFW-WoKVLrreoOMRiogUcD3bSMHifNkLDhAeFCU-dgHEHJCgwsR3ISzs9yGuFELavopCz9AOXXme77gzWwE10YoxhMWPgc7LlA8EOuM2BfbTM3icYyenlnpk_hqg"
          />
          {/* Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#271310]/85 via-[#271310]/20 to-transparent"></div>

          {/* Roasters Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#fdf9f3]/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
            <span className="material-symbols-outlined text-[#7d562d] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span className="text-xs font-bold text-[#271310]">120+ Verified Roasters</span>
          </div>

          {/* Live Cupping Badge Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-[#fdf9f3]/95 backdrop-blur-sm p-2.5 rounded-xl shadow-md">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#ffca98] flex items-center justify-center text-[#7a532a] shrink-0">
                <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#271310] truncate">Artisanal Passport Badge</span>
                <span className="text-[11px] text-[#504442] truncate">Jaksel • Jakpus • Jakbar • Jakut • Jaktim</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-[#213200]/10 px-2 py-1 rounded-full shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#7ca034] animate-pulse"></span>
              <span className="text-[10px] font-bold text-[#7ca034]">Fresh Drops</span>
            </div>
          </div>
        </div>
      </section>

      {/* Typography & Storytelling */}
      <section className="flex flex-col gap-2 mb-6 text-left">
        <div className="inline-flex items-center gap-1.5 text-[#7d562d]">
          <span className="material-symbols-outlined text-[18px]">local_cafe</span>
          <span className="text-xs font-bold tracking-wider uppercase">Craft Specialty Index</span>
        </div>
        <h1 className="font-display-lg text-[28px] leading-tight text-[#271310] font-bold tracking-tight">
          Every Cup Tells a Story.
        </h1>
        <p className="text-sm text-[#504442] leading-relaxed">
          Explore hidden artisanal roasteries, log cupping flavor notes, collect digital passport stamps, and unlock exclusive barista perks across Jakarta.
        </p>
      </section>

      {/* Key Value Pillars */}
      <section className="flex flex-col gap-2.5 mb-6">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f7f3ed] shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#ffca98]/40 flex items-center justify-center text-[#7d562d] shrink-0">
            <span className="material-symbols-outlined text-[20px]">explore</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[#271310]">Single Origin Radar</span>
            <span className="text-xs text-[#504442]">Live filter beans by terroir, wash process, and altitude</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f7f3ed] shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#ffdad4]/50 flex items-center justify-center text-[#271310] shrink-0">
            <span className="material-symbols-outlined text-[20px]">menu_book</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[#271310]">Digital Passport Stamps</span>
            <span className="text-xs text-[#504442]">Check in at indie cafes to unlock secret pour-overs & treats</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f7f3ed] shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#c8f17a]/40 flex items-center justify-center text-[#111c00] shrink-0">
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[#271310]">AI Cupping Matchmaker</span>
            <span className="text-xs text-[#504442]">Personalized flavor profiles matched to your unique palate</span>
          </div>
        </div>
      </section>

      {/* Community Micro-Proof */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="flex -space-x-2">
          <img
            className="w-7 h-7 rounded-full object-cover ring-2 ring-[#fdf9f3]"
            alt="User 1"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYQ-fAqItvACZ7Ckcm6LBAVHsRsjtfzv_JicNbshEwHy1Ly9pO13LzkLMKrpsbFCuebpVtUy4zQ4slqFJBK6AB3fmmCmROokDZ0aWtia64Sc57L8OPjNUpC1SElwVmJgUzVQURQQN8MCyiOMTLbPpAaeufGjMb0GMLQmwP6iomkYpgrhEvpVcLx9s981JCrAFN5mYFZRTa50wOHpYr4EQa8-GfwzKqmudGXYaI74hWiY5NfmGqKQ-zaw"
          />
          <img
            className="w-7 h-7 rounded-full object-cover ring-2 ring-[#fdf9f3]"
            alt="User 2"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Wis8nmOnxraV1pW1iRZ1mQxRY4N40oEIx5NnXXlO-bnINkl6yDsU9s5zb7otZR5fWLQVpCcQc6CrbFv_sicvifSwPct06FJMTxIJC2OZ8QBPIQb56nNyWl0EH-_atkcvs-szcjIslS5c9RV38-VZ2RWyOkKQWBrK1bJ7VBjzmZlteXjRTl9Qf-neI_z-trzjInqWHLPxX30nqnCK-3DtSE0ixuA6306nRzvjpYojn-c767nB9wfUAQ"
          />
          <img
            className="w-7 h-7 rounded-full object-cover ring-2 ring-[#fdf9f3]"
            alt="User 3"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9KW_XfDY8DU8PESl9KZQ-rjCYLp3ezA34y5wZwl9Fx4xgpR-PFi9GNrR4WIslfjpFvrxZuRVwJbIZ6wObYEmt6kkfT2VTEoZ5I7G8t8_yChn1IFLkMs7I8TtgKIiy-btm2ntPDOJRR5dX4He3s9IXRUtsjudS-R9q-PX7tunKL9y9Jje9z9C8bAoCDsQtd5yRbo5bYqCe2KOXsf2vH4FadO3y5dLQRu291JPG3CHoBYtS4DZDiTNHg"
          />
        </div>
        <span className="text-xs text-[#504442]">
          Joined by <strong className="text-[#271310] font-bold">14,000+</strong> coffee seekers
        </span>
      </div>

      {/* Primary & Secondary Action CTAs */}
      <footer className="flex flex-col gap-3 w-full pb-4 mt-auto">
        <button
          onClick={() => onNavigate('signup')}
          className="w-full h-12 rounded-xl bg-[#271310] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all hover:opacity-95"
        >
          <span>Get Started & Create Passport</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        <button
          onClick={() => onNavigate('signin')}
          className="w-full h-12 rounded-xl bg-[#f1ede7] text-[#271310] font-semibold text-sm flex items-center justify-center shadow-xs active:scale-[0.98] transition-all hover:bg-[#ebe8e2]"
        >
          I Already Have an Account (Sign In)
        </button>

        <button
          onClick={() => onNavigate('home')}
          className="w-full py-2 text-center text-[#504442] text-xs font-semibold hover:text-[#271310] transition-colors"
        >
          Explore Cafes as Guest →
        </button>
      </footer>
    </div>
  );
};
