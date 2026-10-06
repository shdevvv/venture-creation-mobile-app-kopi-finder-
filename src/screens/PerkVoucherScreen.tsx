import React, { useState, useEffect } from 'react';
import { ScreenName } from '../types';
import { MOCK_VOUCHERS } from '../data/mockData';

interface PerkVoucherScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export const PerkVoucherScreen: React.FC<PerkVoucherScreenProps> = ({ onNavigate }) => {
  const voucher = MOCK_VOUCHERS[0];
  const [totalSeconds, setTotalSeconds] = useState(voucher.expiresHours * 3600);
  const [isSaved, setIsSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pinDigits, setPinDigits] = useState(['', '', '', '']);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = () => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(voucher.code);
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePinChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const nextPin = [...pinDigits];
    nextPin[index] = val;
    setPinDigits(nextPin);
    if (val && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleConfirmRedeem = () => {
    setIsModalOpen(false);
    setIsRedeemed(true);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-1 pb-24 bg-[#fdf9f3]">
      {/* Exclusive Partner Banner */}
      <div className="mt-2 mb-3 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffca98] text-[#2c1600] shadow-xs">
          <span className="material-symbols-outlined text-[15px] text-[#7d562d]" style={{ fontVariationSettings: "'FILL' 1" }}>
            stars
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {voucher.bannerText}
          </span>
        </div>

        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#504442] bg-[#f1ede7] px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7ca034] animate-pulse"></span>
          {voucher.discountBadge}
        </span>
      </div>

      {/* Header Title */}
      <div className="mb-4">
        <h2 className="font-headline-lg text-xl sm:text-2xl font-bold text-[#271310] tracking-tight">
          {voucher.title}
        </h2>
        <p className="text-xs text-[#504442] mt-0.5 flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px] text-[#7d562d]">storefront</span>
          Valid today only at {voucher.partnerCafe} • {voucher.branch}
        </p>
      </div>

      {/* Perforated Voucher Ticket Container */}
      <div className="relative w-full rounded-3xl bg-white shadow-xl overflow-hidden mb-5 border border-[#e6e2dc]">
        {/* Top Ticket Section */}
        <div className="p-4 bg-[#f7f3ed] relative border-b border-[#e6e2dc]/50">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#3e2723] flex items-center justify-center text-[#ffdcbd] shadow-sm">
                <span className="material-symbols-outlined text-[24px]">local_cafe</span>
              </div>
              <div>
                <div className="text-sm font-bold text-[#271310]">{voucher.title}</div>
                <div className="text-[11px] text-[#504442]">{voucher.subtitle}</div>
              </div>
            </div>
          </div>

          {/* Live Expiry Badge */}
          <div className="mt-3.5 flex items-center justify-between">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#271310] text-white shadow-xs">
              <span className="material-symbols-outlined text-[14px] text-[#ffdcbd]">bolt</span>
              <span className="text-[10px] font-bold tracking-wide">
                Expires in {formatTimer()}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[#7ca034] bg-white px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[#e6e2dc]">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              Verified Perk
            </div>
          </div>
        </div>

        {/* Perforation Line with Side Notches */}
        <div className="relative w-full h-6 bg-white flex items-center justify-between overflow-hidden">
          {/* Left Notch */}
          <div className="w-4 h-6 -ml-2 rounded-r-full bg-[#fdf9f3] border-r border-[#e6e2dc]"></div>
          {/* Dashed line */}
          <div className="flex-1 border-b-2 border-dashed border-[#d3c3c0]/60 mx-2"></div>
          {/* Right Notch */}
          <div className="w-4 h-6 -mr-2 rounded-l-full bg-[#fdf9f3] border-l border-[#e6e2dc]"></div>
        </div>

        {/* Ticket Content: Barcode & Digital Pass Details */}
        <div className="px-5 pb-5 pt-1 bg-white flex flex-col items-center text-center">
          <div className="w-full bg-[#f7f3ed] rounded-2xl p-3 flex flex-col items-center border border-[#e6e2dc]/60">
            {/* Barcode Mock SVG */}
            <div className="w-full max-w-[260px] h-14 flex items-center justify-center">
              <svg className="w-full h-12 text-[#271310]" fill="currentColor" viewBox="0 0 280 60">
                <rect x="0" y="0" width="4" height="60" />
                <rect x="8" y="0" width="2" height="60" />
                <rect x="14" y="0" width="6" height="60" />
                <rect x="24" y="0" width="3" height="60" />
                <rect x="30" y="0" width="1" height="60" />
                <rect x="34" y="0" width="5" height="60" />
                <rect x="42" y="0" width="2" height="60" />
                <rect x="48" y="0" width="7" height="60" />
                <rect x="58" y="0" width="3" height="60" />
                <rect x="64" y="0" width="2" height="60" />
                <rect x="70" y="0" width="5" height="60" />
                <rect x="78" y="0" width="2" height="60" />
                <rect x="83" y="0" width="4" height="60" />
                <rect x="91" y="0" width="6" height="60" />
                <rect x="100" y="0" width="2" height="60" />
                <rect x="105" y="0" width="4" height="60" />
                <rect x="113" y="0" width="3" height="60" />
                <rect x="120" y="0" width="6" height="60" />
                <rect x="130" y="0" width="2" height="60" />
                <rect x="136" y="0" width="4" height="60" />
                <rect x="144" y="0" width="8" height="60" />
                <rect x="156" y="0" width="3" height="60" />
                <rect x="162" y="0" width="2" height="60" />
                <rect x="168" y="0" width="5" height="60" />
                <rect x="176" y="0" width="3" height="60" />
                <rect x="182" y="0" width="1" height="60" />
                <rect x="186" y="0" width="6" height="60" />
                <rect x="196" y="0" width="2" height="60" />
                <rect x="202" y="0" width="4" height="60" />
                <rect x="210" y="0" width="7" height="60" />
                <rect x="221" y="0" width="3" height="60" />
                <rect x="228" y="0" width="5" height="60" />
                <rect x="236" y="0" width="2" height="60" />
                <rect x="242" y="0" width="4" height="60" />
                <rect x="250" y="0" width="6" height="60" />
                <rect x="260" y="0" width="2" height="60" />
                <rect x="266" y="0" width="4" height="60" />
                <rect x="274" y="0" width="6" height="60" />
              </svg>
            </div>

            {/* Voucher Code */}
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-xs sm:text-sm tracking-widest text-[#271310] font-mono font-bold select-all">
                #{voucher.code}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="text-[#7d562d] hover:text-[#271310] p-1"
                aria-label="Copy voucher code"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copiedCode ? 'check' : 'content_copy'}
                </span>
              </button>
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-[#504442] text-[10px]">
              <span className="material-symbols-outlined text-[14px] text-[#7d562d]">zoom_in</span>
              <span>Tap barcode to enlarge for barista scan</span>
            </div>
          </div>

          {/* Quick Terms Pills */}
          <div className="mt-3 w-full flex flex-wrap justify-center gap-1">
            {voucher.terms.map((term: string, idx: number) => (
              <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#f1ede7] text-[#504442] text-[10px] font-semibold">
                <span className="material-symbols-outlined text-[13px] text-[#7d562d]">check_circle</span> {term}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* How to Redeem Stepper */}
      <div className="bg-[#f7f3ed] rounded-2xl p-4 shadow-xs mb-4 border border-[#e6e2dc]">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-[#7d562d] text-[20px]">checklist</span>
          <h3 className="text-xs sm:text-sm font-bold text-[#271310]">How to Redeem</h3>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#ffca98] text-[#2c1600] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
              1
            </div>
            <p className="text-xs text-[#1c1c18] leading-tight">
              <strong className="font-bold text-[#271310]">Show this voucher</strong> on your phone to the cashier barista before ordering.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#ffca98] text-[#2c1600] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
              2
            </div>
            <p className="text-xs text-[#1c1c18] leading-tight">
              <strong className="font-bold text-[#271310]">Order any two manual brews</strong>. The complimentary pour-over applies to the equal or lower priced coffee.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#ffca98] text-[#2c1600] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
              3
            </div>
            <p className="text-xs text-[#1c1c18] leading-tight">
              <strong className="font-bold text-[#271310]">Barista scans barcode</strong> or keys in the 4-digit terminal cashier passcode. Enjoy your brews!
            </p>
          </div>
        </div>
      </div>

      {/* Location Card */}
      <div className="bg-white rounded-2xl p-3.5 shadow-xs mb-5 flex flex-col gap-2.5 border border-[#e6e2dc]">
        <div className="flex items-center gap-3">
          <img
            className="w-14 h-14 rounded-xl object-cover shadow-xs shrink-0"
            alt="Two Roasters"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFBW7FmY2qDWduQZ_MpCmtx8ghSwVVb_5RGMaB4GedMrtRvP0Ii1XRuLHvM2wuApEEudemrTfKWUKVVWjSvkdyWnuwTzataw7V0vEyCfn6SoaiW-9PJBbPzIdazMiiWSrHIFM8lgygj5yI2HwZiA9REXpnm-on7L2tsY69eAz1ziKpKqOw1flHqlMb6lJFJAilYHXcwuv4k4RdW6L5f_3ARELyccFgFam_L7IRUGv-as1YyyQ2v1FBUQ"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h4 className="text-xs sm:text-sm font-bold text-[#271310] truncate">Two Roasters Senopati</h4>
              <span className="material-symbols-outlined text-[15px] text-[#7d562d]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] text-[#7ca034] font-bold bg-[#c8f17a]/30 px-1.5 py-0.2 rounded">
                Open • Until 9:00 PM
              </span>
              <span className="text-[10px] text-[#504442]">• 400m away</span>
            </div>
            <p className="text-[11px] text-[#504442] truncate mt-0.5">Jl. Senopati No. 42, Kebayoran Baru</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-[#f1ede7]">
          <button
            onClick={() => alert('Opening navigation route to Two Roasters (400m walk)')}
            className="flex-1 h-9 rounded-xl bg-[#f7f3ed] hover:bg-[#ebe8e2] flex items-center justify-center gap-1 text-[#271310] text-xs font-bold transition-colors active:scale-98"
          >
            <span className="material-symbols-outlined text-[17px] text-[#7d562d]">near_me</span>
            Get Directions
          </button>

          <button
            onClick={() => alert('Calling Two Roasters Senopati: +62 21 5790 8221')}
            className="h-9 px-3 rounded-xl bg-[#f7f3ed] hover:bg-[#ebe8e2] flex items-center justify-center gap-1 text-[#271310] text-xs font-bold transition-colors active:scale-98"
          >
            <span className="material-symbols-outlined text-[17px] text-[#7d562d]">call</span>
            Call
          </button>
        </div>
      </div>

      {/* Bottom CTA Actions */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => onNavigate('counter-session')}
          className={`w-full h-12 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
            isRedeemed
              ? 'bg-[#213200] text-[#c8f17a] cursor-default'
              : 'bg-[#271310] text-white hover:opacity-95 active:scale-[0.98]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isRedeemed ? 'check_circle' : 'qr_code_scanner'}
          </span>
          <span>{isRedeemed ? '✓ Voucher Redeemed in Store' : 'Redeem Now at Counter (Live QR)'}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsSaved(!isSaved)}
          className={`w-full h-11 py-2.5 px-4 rounded-xl text-xs font-bold active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 border border-[#e6e2dc] ${
            isSaved
              ? 'bg-[#ffca98] text-[#2c1600]'
              : 'bg-[#f1ede7] text-[#271310] hover:bg-[#ebe8e2]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[18px] text-[#7d562d]"
            style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            {isSaved ? 'bookmark' : 'bookmark_border'}
          </span>
          <span>{isSaved ? 'Saved in Passport Vouchers' : 'Save to My Passport Vouchers'}</span>
        </button>
      </div>

      {/* Barista Terminal Confirmation Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#271310]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-xs bg-white rounded-3xl p-5 shadow-2xl flex flex-col items-center text-center border border-[#e6e2dc]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-[#ffca98] text-[#2c1600] flex items-center justify-center mb-2 shadow-inner">
              <span className="material-symbols-outlined text-[26px]">coffee_maker</span>
            </div>

            <h3 className="text-sm font-bold text-[#271310]">Barista Confirmation</h3>
            <p className="text-xs text-[#504442] mt-1 leading-snug">
              Please hand your device to the barista at Two Roasters Senopati to confirm redemption.
            </p>

            <div className="w-full bg-[#f7f3ed] p-3 rounded-2xl mt-3 border border-[#e6e2dc]">
              <label className="text-[10px] font-bold text-[#504442] uppercase tracking-wider block">
                Staff 4-Digit Passcode
              </label>
              <div className="flex justify-center gap-2 mt-2">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    id={`pin-${idx}`}
                    type="password"
                    maxLength={1}
                    value={pinDigits[idx]}
                    onChange={(e) => handlePinChange(idx, e.target.value)}
                    className="w-9 h-11 rounded-lg bg-white text-center font-bold text-base text-[#271310] border border-[#e6e2dc] focus:ring-2 focus:ring-[#7d562d] focus:outline-none shadow-xs"
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2 w-full mt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#f1ede7] text-[#1c1c18] text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRedeem}
                className="flex-1 py-2.5 rounded-xl bg-[#271310] text-white text-xs font-bold shadow-sm"
              >
                Verify & Brew
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
