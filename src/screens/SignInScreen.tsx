import React, { useState } from 'react';
import { ScreenName } from '../types';

interface SignInScreenProps {
  onNavigate: (screen: ScreenName) => void;
  onLoginSuccess: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('alya@kopifinder.id');
  const [password, setPassword] = useState('EspressoPourOver#2024');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isBiometricActive, setIsBiometricActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  const handleBiometric = () => {
    setIsBiometricActive(true);
    setTimeout(() => {
      setIsBiometricActive(false);
      onLoginSuccess();
    }, 700);
  };

  return (
    <div className="flex flex-col w-full px-5 py-4 min-h-screen bg-[#fdf9f3]">
      {/* Brand Header Card */}
      <div className="flex flex-col items-center text-center mt-2 mb-6">
        <div className="relative mb-3 p-3 rounded-2xl bg-[#f7f3ed] shadow-xs flex items-center justify-center">
          <div className="w-14 h-14 rounded-xl bg-[#3e2723] flex items-center justify-center text-[#ffca98] shadow-sm">
            <span className="material-symbols-outlined text-[32px]">coffee</span>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-[#ffca98] text-[#7a532a] px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[12px]">local_cafe</span>
            <span>Specialty</span>
          </div>
        </div>

        <h1 className="font-headline-lg text-2xl font-bold text-[#271310] tracking-tight">
          Welcome Back, Cupper
        </h1>
        <p className="text-sm text-[#504442] max-w-[290px] mt-1.5 leading-relaxed">
          Log in to track your cafe stamps, cupping notes, and local perk vouchers.
        </p>
      </div>

      {/* Sign In Form Container */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-5 rounded-2xl shadow-[0_4px_24px_rgba(62,39,35,0.07)] border border-[#f1ede7]"
      >
        {/* Identifier Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#271310] flex items-center justify-between" htmlFor="cupperId">
            <span>Email or Cupper ID</span>
            <span className="text-[11px] text-[#7d562d] font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Verified Member</span>
            </span>
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-[#827472] text-[20px] pointer-events-none">
              mail
            </span>
            <input
              id="cupperId"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 pl-11 pr-4 bg-[#f7f3ed] text-[#1c1c18] text-sm rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7d562d]/40 transition-all placeholder:text-[#827472]"
              placeholder="e.g. alya@kopifinder.id"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#271310]" htmlFor="cupperSecret">
              Password
            </label>
            <button
              type="button"
              onClick={() => onNavigate('verify-code')}
              className="text-xs font-semibold text-[#7d562d] hover:underline transition-all"
            >
              Forgot Password?
            </button>
          </div>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-[#827472] text-[20px] pointer-events-none">
              lock
            </span>
            <input
              id="cupperSecret"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 pl-11 pr-11 bg-[#f7f3ed] text-[#1c1c18] text-sm rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7d562d]/40 transition-all placeholder:text-[#827472]"
              placeholder="••••••••••••"
              required
            />
            <button
              type="button"
              aria-label="Toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 w-8 h-8 rounded-full flex items-center justify-center text-[#504442] hover:bg-[#f1ede7] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        {/* Utilities: Remember Me & Biometrics */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="sr-only peer"
            />
            <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
              rememberMe ? 'bg-[#271310] text-white' : 'bg-[#ebe8e2]'
            }`}>
              {rememberMe && (
                <span className="material-symbols-outlined text-[14px]">check</span>
              )}
            </div>
            <span className="text-xs text-[#504442] font-medium">Remember me</span>
          </label>

          <button
            type="button"
            onClick={handleBiometric}
            className={`h-9 px-3 rounded-lg flex items-center gap-1.5 transition-all ${
              isBiometricActive
                ? 'bg-[#c8f17a] text-[#111c00] scale-95'
                : 'bg-[#f1ede7] text-[#7d562d] hover:bg-[#ebe8e2] active:scale-95'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">fingerprint</span>
            <span className="text-xs font-bold">
              {isBiometricActive ? 'Verifying...' : 'Biometric'}
            </span>
          </button>
        </div>

        {/* Primary Action Button */}
        <button
          type="submit"
          className="relative overflow-hidden w-full h-12 mt-1 rounded-xl bg-[#271310] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_6px_18px_rgba(39,19,16,0.22)] active:scale-[0.98] transition-transform hover:opacity-95"
        >
          <span className="material-symbols-outlined text-[20px]">coffee</span>
          <span>Sign In to KopiFinder</span>
        </button>
      </form>

      {/* Visual Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-[1px] bg-[#e6e2dc]"></div>
        <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-[#827472]">
          or continue with
        </span>
        <div className="flex-1 h-[1px] bg-[#e6e2dc]"></div>
      </div>

      {/* Social Auth Options */}
      <div className="grid grid-cols-3 gap-2.5">
        <button
          type="button"
          onClick={onLoginSuccess}
          className="h-12 rounded-xl bg-white text-[#271310] flex items-center justify-center gap-1 border border-[#e6e2dc] shadow-xs active:scale-95 transition-all hover:bg-[#f7f3ed]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4"></path>
            <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"></path>
            <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z" fill="#FBBC05"></path>
            <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
          </svg>
          <span className="text-xs font-bold ml-1">Google</span>
        </button>

        <button
          type="button"
          onClick={onLoginSuccess}
          className="h-12 rounded-xl bg-white text-[#271310] flex items-center justify-center gap-1 border border-[#e6e2dc] shadow-xs active:scale-95 transition-all hover:bg-[#f7f3ed]"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.41-6.08-3.69-3.06-7.7-7.91-12.04-14.54-6.3-9.58-11.23-20.48-14.78-32.69-3.55-12.21-5.33-23.47-5.33-33.8 0-14.42 3.64-26.39 10.92-35.91 7.28-9.52 16.27-14.38 26.96-14.59 4.36 0 9.25 1.13 14.67 3.39 5.42 2.26 9.17 3.44 11.25 3.55 1.83 0 5.66-1.22 11.51-3.66 5.84-2.44 10.88-3.52 15.1-3.23 11.45.65 20.73 4.96 27.84 12.94-9.9 6.01-14.74 14.43-14.52 25.26.22 8.49 3.42 15.7 9.61 21.64 6.19 5.94 13.53 9.4 22.03 10.37-2.14 6.47-4.7 12.63-7.69 18.49zM119.22 33.56c0-6.78 2.45-13.25 7.34-19.41 4.9-6.16 11.08-10.45 18.55-12.87.22 1.3.33 2.53.33 3.69 0 6.67-2.61 13.26-7.83 19.78-5.22 6.52-11.45 10.74-18.69 12.65-.21-1.24-.32-2.38-.32-3.41z"></path>
          </svg>
          <span className="text-xs font-bold ml-1">Apple</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('verify-code')}
          className="h-12 rounded-xl bg-white text-[#271310] flex items-center justify-center gap-1 border border-[#e6e2dc] shadow-xs active:scale-95 transition-all hover:bg-[#f7f3ed]"
        >
          <span className="material-symbols-outlined text-[18px] text-[#213200]">chat</span>
          <span className="text-xs font-bold ml-1">OTP</span>
        </button>
      </div>

      {/* Footers & Alternate Navigation */}
      <div className="mt-8 flex flex-col items-center gap-3 text-center pb-6">
        <div className="text-xs text-[#504442]">
          <span>New to KopiFinder? </span>
          <button
            type="button"
            onClick={() => onNavigate('signup')}
            className="font-bold text-[#7d562d] hover:underline underline-offset-4"
          >
            Create an account
          </button>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 py-2 px-4 rounded-full bg-[#f1ede7] text-[#271310] text-xs font-bold hover:bg-[#ebe8e2] transition-colors"
        >
          <span>Explore cafes as guest</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
