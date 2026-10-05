import React, { useState } from 'react';
import { ScreenName } from '../types';

interface SignUpScreenProps {
  onNavigate: (screen: ScreenName) => void;
  onSignUpSuccess: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onNavigate, onSignUpSuccess }) => {
  const [name, setName] = useState('Alya Danubrata');
  const [email, setEmail] = useState('alya@kopifinder.id');
  const [password, setPassword] = useState('PourOver@2025');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedBrew, setSelectedBrew] = useState<'v60' | 'espresso' | 'coldbrew'>('v60');
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [inviteApplied, setInviteApplied] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(true);

  // Live password strength
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength();
  const strengthLabels = ['Enter Password', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor =
    strength <= 1 ? 'text-[#ba1a1a]' : strength <= 2 ? 'text-[#7d562d]' : 'text-[#7ca034]';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed) {
      alert('Please agree to the Community Terms of Service.');
      return;
    }
    onSignUpSuccess();
  };

  return (
    <div className="flex flex-col w-full px-5 py-4 min-h-screen bg-[#fdf9f3]">
      {/* Progress Header & Stepper */}
      <div className="pt-1 pb-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d562d]">
            Coffee Passport
          </span>
          <span className="text-xs font-semibold text-[#504442]">Step 1 of 2</span>
        </div>
        <div className="w-full h-1.5 bg-[#f1ede7] rounded-full overflow-hidden flex">
          <div className="w-1/2 h-full bg-[#271310] rounded-full transition-all duration-300"></div>
          <div className="w-1/2 h-full bg-transparent"></div>
        </div>
      </div>

      {/* Editorial Hero */}
      <div className="py-2 flex flex-col gap-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffca98]/40 w-fit">
          <span className="material-symbols-outlined text-[14px] text-[#7a532a]">local_cafe</span>
          <span className="text-[10px] font-bold text-[#7a532a] tracking-tight">SPECIALTY COMMUNITY</span>
        </div>
        <h1 className="font-headline-lg text-2xl font-bold text-[#271310] tracking-tight">
          Join the Coffee Circle
        </h1>
        <p className="text-xs text-[#504442]">
          Start your digital coffee passport across 120+ specialty roasters in Jakarta.
        </p>
      </div>

      {/* Main Sign-Up Form */}
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-[#1c1c18]" htmlFor="fullName">
            Full Name
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#827472] pointer-events-none">
              badge
            </span>
            <input
              id="fullName"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alya Danubrata"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white text-sm text-[#1c1c18] placeholder:text-[#827472]/70 focus:outline-none focus:ring-2 focus:ring-[#7d562d]/40 shadow-xs border border-[#e6e2dc]"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-[#1c1c18]" htmlFor="email">
            Email Address
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#827472] pointer-events-none">
              mail
            </span>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white text-sm text-[#1c1c18] placeholder:text-[#827472]/70 focus:outline-none focus:ring-2 focus:ring-[#7d562d]/40 shadow-xs border border-[#e6e2dc]"
            />
          </div>
        </div>

        {/* Password & Security Meter */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#1c1c18]" htmlFor="password">
              Password
            </label>
            <span className="text-[#7d562d] text-[10px] font-bold">8+ chars required</span>
          </div>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#827472] pointer-events-none">
              lock
            </span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a secure passphrase"
              className="w-full h-12 pl-11 pr-11 rounded-xl bg-white text-sm text-[#1c1c18] placeholder:text-[#827472]/70 focus:outline-none focus:ring-2 focus:ring-[#7d562d]/40 shadow-xs border border-[#e6e2dc]"
            />
            <button
              type="button"
              aria-label="Toggle password"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-[#827472] hover:text-[#271310] p-1"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>

          {/* Strength Bar */}
          <div className="mt-1 flex flex-col gap-1 p-2 rounded-lg bg-[#f7f3ed]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#504442] flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[13px] text-[#7d562d]">verified_user</span>
                Security Level
              </span>
              <span className={`text-[10px] font-bold ${strengthColor}`}>
                {strengthLabels[strength]}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
              <div className={`h-full rounded-full ${strength >= 1 ? 'bg-[#7d562d]' : 'bg-[#e6e2dc]'}`} />
              <div className={`h-full rounded-full ${strength >= 2 ? 'bg-[#7d562d]' : 'bg-[#e6e2dc]'}`} />
              <div className={`h-full rounded-full ${strength >= 3 ? 'bg-[#7d562d]' : 'bg-[#e6e2dc]'}`} />
              <div className={`h-full rounded-full ${strength >= 4 ? 'bg-[#7ca034]' : 'bg-[#e6e2dc]'}`} />
            </div>
            <span className="text-[9px] text-[#504442]/80">Visual security strength: 8+ chars, numbers, symbols</span>
          </div>
        </div>

        {/* Go-To Brew Style */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#1c1c18] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#7d562d]">coffee_maker</span>
              Your Go-To Brew Style
            </label>
            <span className="text-[10px] text-[#827472]">Tailors your radar</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedBrew('v60')}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold transition-all ${
                selectedBrew === 'v60'
                  ? 'bg-[#271310] text-white shadow-xs'
                  : 'bg-[#f1ede7] text-[#1c1c18] hover:bg-[#ebe8e2]'
              }`}
            >
              <span>Filter & V60</span>
              <span>☕</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedBrew('espresso')}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold transition-all ${
                selectedBrew === 'espresso'
                  ? 'bg-[#271310] text-white shadow-xs'
                  : 'bg-[#f1ede7] text-[#1c1c18] hover:bg-[#ebe8e2]'
              }`}
            >
              <span>Espresso & Flat</span>
              <span>🥛</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedBrew('coldbrew')}
              className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold transition-all ${
                selectedBrew === 'coldbrew'
                  ? 'bg-[#271310] text-white shadow-xs'
                  : 'bg-[#f1ede7] text-[#1c1c18] hover:bg-[#ebe8e2]'
              }`}
            >
              <span>Cold Brew & Tonic</span>
              <span>🧊</span>
            </button>
          </div>
        </div>

        {/* Expandable Barista Invite Accordion */}
        <div className="rounded-xl bg-white border border-[#e6e2dc] shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => setInviteOpen(!inviteOpen)}
            className="w-full py-3 px-4 flex items-center justify-between text-left text-xs font-bold text-[#1c1c18] hover:bg-[#f7f3ed]"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#7d562d]">card_giftcard</span>
              <span>Have a Barista Invite Code?</span>
            </div>
            <span
              className={`material-symbols-outlined text-[18px] text-[#827472] transition-transform ${
                inviteOpen ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {inviteOpen && (
            <div className="px-4 pb-3 pt-1 border-t border-[#f1ede7] flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="e.g. SENOPATI-108"
                  className="flex-1 h-9 px-3 uppercase tracking-wider rounded-lg bg-[#f7f3ed] text-xs font-mono text-[#1c1c18] border border-[#e6e2dc] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (inviteCode) setInviteApplied(true);
                  }}
                  className="h-9 px-3.5 rounded-lg bg-[#ffdcbd] text-[#2c1600] text-xs font-bold uppercase hover:opacity-90 active:scale-95"
                >
                  {inviteApplied ? 'Applied ✓' : 'Apply'}
                </button>
              </div>
              <p className="text-[10px] text-[#504442]">
                Unlocks an initial cupping badge & 1 complimentary filter shot.
              </p>
            </div>
          )}
        </div>

        {/* Terms Agreement Checkbox */}
        <label className="flex items-start gap-2.5 select-none cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={termsAgreed}
            onChange={(e) => setTermsAgreed(e.target.checked)}
            className="sr-only peer"
          />
          <div
            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
              termsAgreed ? 'bg-[#271310] text-white' : 'bg-[#e6e2dc]'
            }`}
          >
            {termsAgreed && (
              <span className="material-symbols-outlined text-[14px]">check</span>
            )}
          </div>
          <span className="text-xs text-[#504442] leading-snug">
            I agree to the <span className="text-[#271310] font-bold underline">Terms of Service</span> and Jakarta <span className="text-[#271310] font-bold underline">Cupping Community Guidelines</span>.
          </span>
        </label>

        {/* CTA */}
        <button
          type="submit"
          className="w-full h-12 rounded-xl bg-[#271310] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(39,19,16,0.22)] active:scale-[0.98] transition-all hover:opacity-95"
        >
          <span>Create My Passport & Continue</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </form>

      {/* Visual Divider */}
      <div className="my-5 relative flex items-center justify-center">
        <div className="w-full h-px bg-[#e6e2dc]"></div>
        <span className="absolute px-3 py-0.5 rounded-full bg-[#fdf9f3] text-[10px] font-bold uppercase tracking-widest text-[#827472]">
          or fast track with
        </span>
      </div>

      {/* Social Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onSignUpSuccess}
          className="h-11 rounded-xl bg-white text-[#1c1c18] text-xs font-bold flex items-center justify-center gap-2 border border-[#e6e2dc] shadow-xs active:bg-[#f7f3ed]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" fill="#EA4335"></path>
            <path d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" fill="#4285F4"></path>
            <path d="M5.6 14.8c-.2-.7-.4-1.4-.4-2.2s.2-1.5.4-2.2L1.9 7.5C.7 9.8 0 12.4 0 15.2s.7 5.4 1.9 7.7l3.7-2.9z" fill="#FBBC05"></path>
            <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" fill="#34A853"></path>
          </svg>
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={onSignUpSuccess}
          className="h-11 rounded-xl bg-white text-[#1c1c18] text-xs font-bold flex items-center justify-center gap-2 border border-[#e6e2dc] shadow-xs active:bg-[#f7f3ed]"
        >
          <svg className="w-4 h-4 fill-current text-[#271310]" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.86-10.45-12.2-22.37-16-35.77-3.8-13.4-5.7-25.96-5.7-37.68 0-14.16 3.58-25.75 10.74-34.77 7.16-9.03 16.03-13.65 26.6-13.88 4.58 0 9.8 1.25 15.66 3.75 5.86 2.5 9.74 3.75 11.64 3.75 1.52 0 5.48-1.25 11.89-3.75 6.41-2.5 11.51-3.64 15.3-3.41 11.52.44 20.73 4.3 27.64 11.59-10.01 6.09-14.9 14.58-14.67 25.48.22 8.49 3.42 15.68 9.61 21.57 6.19 5.89 13.53 9.24 22.02 10.05-2.18 6.53-4.74 13.06-7.69 19.59zM119.22 31.84c0-7.39 2.67-14.34 8.01-20.85 5.34-6.52 11.96-10.54 19.86-12.06.33 1.52.49 2.93.49 4.24 0 7.39-2.73 14.5-8.19 21.33-5.46 6.83-12.24 10.79-20.34 11.87-.22-1.3-.33-2.8-.33-4.53z"></path>
          </svg>
          <span>Apple</span>
        </button>
      </div>

      {/* Redirect */}
      <div className="mt-5 text-center pb-6">
        <p className="text-xs text-[#504442]">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('signin')}
            className="font-bold text-[#271310] underline underline-offset-4 ml-1"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};
