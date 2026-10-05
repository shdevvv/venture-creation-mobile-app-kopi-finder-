import React, { useState, useEffect } from 'react';
import { ScreenName } from '../types';

interface VerifyCodeScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export const VerifyCodeScreen: React.FC<VerifyCodeScreenProps> = ({ onNavigate }) => {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [inputValue, setInputValue] = useState('alya.danubrata@kopifinder.id');
  const [code, setCode] = useState(['7', '3', '9', '', '', '']);
  const [countdown, setCountdown] = useState(46);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const switchMethod = (newMethod: 'email' | 'phone') => {
    setMethod(newMethod);
    if (newMethod === 'phone') {
      setInputValue('+62 812-4920-7718');
    } else {
      setInputValue('alya.danubrata@kopifinder.id');
    }
  };

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);

    // auto focus next input if applicable
    if (val && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      setTimeout(() => {
        onNavigate('signin');
      }, 1200);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full px-5 py-4 min-h-screen bg-[#fdf9f3]">
      {/* Artisanal Lock & Coffee Bean Emblem Badge */}
      <div className="flex flex-col items-center text-center mt-3 mb-6">
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-[#ffca98]/50 shadow-[0_4px_20px_rgba(62,39,35,0.08)] mb-3">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[#271310] text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              lock_reset
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#271310] flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-white text-[15px]">local_cafe</span>
          </div>
        </div>

        <h1 className="font-headline-lg text-2xl font-bold text-[#271310] mb-1">Reset Your Password</h1>
        <p className="text-xs text-[#504442] max-w-[320px] leading-relaxed">
          Enter your registered email address or phone number. We'll send a 6-digit verification code to recover your coffee passport.
        </p>
      </div>

      {/* Recovery Method Segmented Control */}
      <div className="w-full bg-[#ebe8e2] rounded-full p-1 flex mb-5 shadow-inner">
        <button
          type="button"
          onClick={() => switchMethod('email')}
          className={`flex-1 py-2 rounded-full flex items-center justify-center gap-1.5 text-xs font-bold transition-all duration-200 ${
            method === 'email'
              ? 'bg-[#271310] text-white shadow-sm'
              : 'text-[#504442] hover:text-[#271310]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">mail</span>
          <span>Email Address</span>
        </button>

        <button
          type="button"
          onClick={() => switchMethod('phone')}
          className={`flex-1 py-2 rounded-full flex items-center justify-center gap-1.5 text-xs font-bold transition-all duration-200 ${
            method === 'phone'
              ? 'bg-[#271310] text-white shadow-sm'
              : 'text-[#504442] hover:text-[#271310]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">chat</span>
          <span>Phone / WhatsApp</span>
        </button>
      </div>

      {/* Dynamic Input Field Card */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-[#e6e2dc] mb-5">
        <label className="block text-[10px] font-bold text-[#7d562d] uppercase mb-1.5 tracking-wider">
          {method === 'email' ? 'Registered Email' : 'Phone Number (WhatsApp)'}
        </label>
        <div className="relative flex items-center">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-[#7d562d]">
            <span className="material-symbols-outlined text-[20px]">
              {method === 'email' ? 'alternate_email' : 'call'}
            </span>
          </div>
          <input
            type={method === 'email' ? 'email' : 'tel'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-12 pl-11 pr-11 bg-[#f7f3ed] rounded-xl text-sm font-medium text-[#1c1c18] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7d562d]/40 transition-colors"
          />
          <div className="absolute right-3 flex items-center text-[#7ca034] bg-[#c8f17a]/50 rounded-full p-1">
            <span className="material-symbols-outlined text-[15px]">check</span>
          </div>
        </div>
        <p className="text-[11px] text-[#504442] mt-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px] text-[#7d562d]">verified_user</span>
          Connected to Bean Passport #KP-4098
        </p>
      </div>

      {/* 6-Digit Code Verification Section */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-[#e6e2dc] mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-[#271310]">Security Code</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#7ca034] bg-[#c8f17a]/30 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7ca034] animate-pulse"></span>
            Sent via Inbox
          </span>
        </div>

        {/* 6-Digit Input Visual Matrix */}
        <div className="grid grid-cols-6 gap-2 mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`digit-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              className={`h-12 rounded-xl text-center font-bold text-lg focus:outline-none transition-all ${
                digit
                  ? 'bg-[#ebe8e2] text-[#271310] border-2 border-[#7d562d]/40'
                  : 'bg-[#f7f3ed] text-[#827472] border border-[#e6e2dc] focus:border-[#271310]'
              }`}
            />
          ))}
        </div>

        {/* Resend Countdown */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1 text-xs text-[#504442]">
            <span className="material-symbols-outlined text-[16px] text-[#7d562d]">schedule</span>
            <span>
              Resend code in <strong className="text-[#271310] font-bold">{countdown > 0 ? `${countdown}s` : 'Now'}</strong>
            </span>
          </div>

          <button
            type="button"
            disabled={countdown > 0}
            onClick={() => setCountdown(60)}
            className="text-xs font-bold text-[#7d562d] hover:text-[#271310] transition-colors disabled:opacity-40"
          >
            Resend Code
          </button>
        </div>
      </div>

      {/* Primary CTA */}
      <button
        type="button"
        onClick={handleVerify}
        className="w-full h-12 rounded-xl bg-[#271310] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(39,19,16,0.25)] hover:opacity-95 active:scale-[0.98] transition-all mb-4"
      >
        <span className="material-symbols-outlined text-[20px]">
          {verifiedSuccess ? 'check_circle' : 'mark_email_read'}
        </span>
        <span>
          {isVerifying ? 'Verifying Code...' : verifiedSuccess ? 'Verified! Redirecting...' : 'Send Verification Code'}
        </span>
      </button>

      {/* Helpful Reassurance Card */}
      <div className="w-full bg-[#ffca98]/20 rounded-2xl p-4 flex gap-3 items-start mb-6 border border-[#ffca98]/40">
        <div className="w-8 h-8 rounded-full bg-[#ffca98] shrink-0 flex items-center justify-center text-[#7a532a]">
          <span className="material-symbols-outlined text-[18px]">lightbulb</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xs font-bold text-[#7a532a] mb-0.5">Can't access your inbox?</h2>
          <p className="text-xs text-[#504442] leading-relaxed">
            You can also verify identity via your linked <span className="font-bold text-[#271310]">Google Account</span> or physical <span className="font-bold text-[#271310]">Passport Card ID</span> at any participating roastery bar.
          </p>
        </div>
      </div>

      {/* Return Footnote */}
      <div className="flex flex-col items-center text-center gap-1 pb-6 mt-auto">
        <p className="text-xs text-[#504442]">Remembered your credentials?</p>
        <button
          onClick={() => onNavigate('signin')}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#7d562d] hover:text-[#271310] transition-colors py-1"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Back to Sign In</span>
        </button>
      </div>
    </div>
  );
};
