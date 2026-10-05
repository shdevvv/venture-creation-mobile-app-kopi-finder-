import React, { useState, useEffect } from 'react';
import { ScreenName } from '../types';

interface CounterSessionScreenProps {
  onNavigate: (screen: ScreenName) => void;
  onStampCollected: () => void;
}

export const CounterSessionScreen: React.FC<CounterSessionScreenProps> = ({
  onNavigate,
  onStampCollected
}) => {
  const [totalSeconds, setTotalSeconds] = useState(585); // 9m 45s
  const [currentTime, setCurrentTime] = useState('14:32:05');
  const [copiedCode, setCopiedCode] = useState(false);
  const [baristaVerified, setBaristaVerified] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      const now = new Date();
      setCurrentTime(now.toTimeString().split(' ')[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = () => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('TF-B1G1-8921-JKT');
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleBaristaVerify = () => {
    setBaristaVerified(true);
    onStampCollected();
  };

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-24 bg-[#fdf9f3] gap-4">
      {/* Top Modal Status Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-[#f7f3ed] px-3 py-1.5 rounded-full shadow-xs border border-[#e6e2dc]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7d562d] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7d562d]"></span>
          </span>
          <span className="text-[10px] font-bold text-[#7d562d] uppercase tracking-wider">
            Active Counter Session
          </span>
        </div>

        <button
          aria-label="Close session"
          onClick={() => onNavigate('voucher')}
          className="w-8 h-8 rounded-full bg-[#f1ede7] flex items-center justify-center text-[#271310] hover:bg-[#ebe8e2] transition-transform active:scale-95 shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      {/* Security & Live Dynamic Countdown Bar */}
      <div className="relative overflow-hidden rounded-2xl bg-[#3e2723] text-white p-3.5 shadow-md border border-[#5b403c]">
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#ffca98] text-[20px]">timer</span>
            </div>
            <div>
              <div className="text-[9px] font-bold text-[#ffca98] tracking-wider uppercase">
                Auto-Expiring Session
              </div>
              <div className="text-lg font-bold tracking-tight text-white font-mono">
                {formatCountdown()}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[9px] text-[#ae8d87] uppercase font-semibold">Security Watermark</div>
            <div className="text-[11px] text-[#ffca98] font-mono tracking-wider font-bold">
              SEC-8921 • {currentTime}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Redemption Voucher Ticket */}
      <div className="relative rounded-3xl bg-white shadow-xl overflow-hidden border border-[#e6e2dc]">
        {/* Top Ticket Header */}
        <div className="bg-[#271310] text-white px-4 py-3 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-bold text-[#ffca98] uppercase tracking-widest block">
              KopiFinder Verified Perk
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white">Buy 1 Get 1 Manual Brew</h2>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-[#ffdcbd]">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_cafe
            </span>
          </div>
        </div>

        {/* Scannable Artifacts Container */}
        <div className="p-4 flex flex-col items-center text-center">
          <span className="text-xs font-semibold text-[#504442] mb-3">
            Present directly to Barista Scanner
          </span>

          {/* High-Contrast QR Code Element */}
          <div className="relative p-3 bg-white rounded-2xl shadow-sm border border-[#e6e2dc] flex items-center justify-center">
            <svg className="w-44 h-44 sm:w-48 sm:h-48" fill="none" viewBox="0 0 160 160">
              <rect fill="#FFFFFF" height="160" width="160" />
              {/* Corner Finder 1 */}
              <rect fill="#271310" height="40" width="40" x="12" y="12" />
              <rect fill="#FFFFFF" height="24" width="24" x="20" y="20" />
              <rect fill="#271310" height="12" width="12" x="26" y="26" />
              {/* Corner Finder 2 */}
              <rect fill="#271310" height="40" width="40" x="108" y="12" />
              <rect fill="#FFFFFF" height="24" width="24" x="116" y="20" />
              <rect fill="#271310" height="12" width="12" x="122" y="26" />
              {/* Corner Finder 3 */}
              <rect fill="#271310" height="40" width="40" x="12" y="108" />
              <rect fill="#FFFFFF" height="24" width="24" x="20" y="116" />
              <rect fill="#271310" height="12" width="12" x="26" y="122" />
              {/* Dots */}
              <rect fill="#271310" height="8" width="8" x="60" y="16" />
              <rect fill="#271310" height="8" width="12" x="76" y="16" />
              <rect fill="#271310" height="8" width="16" x="64" y="32" />
              <rect fill="#271310" height="16" width="8" x="88" y="28" />
              <rect fill="#271310" height="8" width="16" x="16" y="64" />
              <rect fill="#271310" height="16" width="8" x="24" y="80" />
              <rect fill="#271310" height="8" width="8" x="40" y="68" />
              <rect fill="#271310" height="16" width="16" x="60" y="56" />
              <rect fill="#271310" height="8" width="16" x="84" y="56" />
              <rect fill="#271310" height="16" width="8" x="72" y="80" />
              <rect fill="#271310" height="16" width="16" x="88" y="72" />
              <rect fill="#271310" height="24" width="8" x="112" y="64" />
              <rect fill="#271310" height="8" width="16" x="128" y="60" />
              <rect fill="#271310" height="12" width="12" x="136" y="76" />
              <rect fill="#271310" height="8" width="12" x="60" y="108" />
              <rect fill="#271310" height="8" width="16" x="80" y="116" />
              <rect fill="#271310" height="16" width="8" x="64" y="128" />
              <rect fill="#271310" height="8" width="16" x="108" y="108" />
              <rect fill="#271310" height="16" width="12" x="132" y="112" />
              <rect fill="#271310" height="12" width="28" x="116" y="132" />
              {/* Center Seal */}
              <rect fill="#7D562D" height="28" rx="6" width="28" x="66" y="66" />
              <circle cx="80" cy="80" fill="#FFDCBD" r="8" />
            </svg>
          </div>

          {/* Barcode Fallback */}
          <div className="mt-3 w-full max-w-[240px] flex flex-col items-center">
            <svg className="w-full h-10" fill="none" viewBox="0 0 240 44">
              <rect fill="#FFFFFF" height="44" width="240" />
              <path d="M8 0h3v44H8zM14 0h2v44h-2zM18 0h5v44h-5zM26 0h2v44h-2zM32 0h4v44h-4zM40 0h1v44h-1zM44 0h6v44h-6zM54 0h2v44h-2zM60 0h3v44h-3zM67 0h2v44h-2zM73 0h5v44h-5zM82 0h2v44h-2zM88 0h4v44h-4zM96 0h2v44h-2zM102 0h6v44h-6zM112 0h1v44h-1zM116 0h3v44h-3zM123 0h4v44h-4zM130 0h2v44h-2zM136 0h5v44h-5zM145 0h2v44h-2zM151 0h3v44h-3zM158 0h6v44h-6zM168 0h1v44h-1zM172 0h4v44h-4zM180 0h2v44h-2zM186 0h5v44h-5zM195 0h2v44h-2zM200 0h4v44h-4zM208 0h2v44h-2zM214 0h6v44h-6zM224 0h2v44h-2zM230 0h3v44h-3z" fill="#271310"></path>
            </svg>
            <span className="text-[10px] text-[#504442] tracking-widest font-mono mt-0.5 font-bold">
              8921 7710 4402 991
            </span>
          </div>

          {/* Punch-hole Ticket Separator Cutouts */}
          <div className="w-full relative flex items-center justify-between my-3">
            <div className="w-4 h-8 bg-[#fdf9f3] rounded-r-full -ml-4 border-r border-[#e6e2dc]"></div>
            <div className="flex-1 border-t-2 border-dashed border-[#d3c3c0]/60 mx-2"></div>
            <div className="w-4 h-8 bg-[#fdf9f3] rounded-l-full -mr-4 border-l border-[#e6e2dc]"></div>
          </div>

          {/* Alpha-Numeric Code */}
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between bg-[#f7f3ed] px-3.5 py-2.5 rounded-xl border border-[#e6e2dc]">
              <div className="text-left">
                <span className="text-[9px] font-bold text-[#504442] uppercase">
                  Voucher Code (Manual Entry)
                </span>
                <div className="text-xs sm:text-sm font-bold text-[#271310] font-mono tracking-wider">
                  #TF-B1G1-8921-JKT
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="h-9 px-3 rounded-lg bg-[#ebe8e2] text-[#271310] text-xs font-bold flex items-center gap-1 hover:bg-[#e6e2dc] active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[15px]">
                  {copiedCode ? 'check' : 'content_copy'}
                </span>
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* POS Cashier Override PIN */}
            <div className="flex items-center justify-between bg-[#ffdcbd]/40 px-3.5 py-2 rounded-xl border border-[#ffdcbd]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#7d562d] text-[18px]">pin</span>
                <span className="text-xs font-bold text-[#7a532a]">POS Staff Override PIN</span>
              </div>
              <span className="text-sm font-mono font-bold text-[#2c1600] tracking-widest">8921</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verification & Cafe Details Summary Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e6e2dc] flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] font-bold text-[#7d562d] uppercase tracking-wider">
              Redeeming At
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-[#271310]">Two Roasters — Senopati</h3>
            <p className="text-[11px] text-[#504442]">Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan</p>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#c8f17a] text-[#131f00] text-[9px] font-bold uppercase shrink-0">
            Open Now
          </span>
        </div>

        <div className="bg-[#f7f3ed] rounded-xl p-2.5 flex flex-col gap-1 text-xs border border-[#e6e2dc]/50">
          <div className="flex items-center gap-1.5 text-[#1c1c18] font-semibold">
            <span className="material-symbols-outlined text-[#7d562d] text-[16px]">verified</span>
            <span>Dine-in only • Single Origin Tier</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#504442]">
            <span className="material-symbols-outlined text-[16px] text-[#827472]">coffee_maker</span>
            <span>V60 / Kalita Wave Brew Bar</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#504442]">
            <span className="material-symbols-outlined text-[16px] text-[#827472]">psychiatry</span>
            <span>Eligible: Ethiopian Sidama Natural or Gayo Anaerobic</span>
          </div>
        </div>
      </div>

      {/* Barista Stamp & In-Counter Action Box */}
      <div className="bg-[#f1ede7] rounded-2xl p-4 shadow-sm border border-[#e6e2dc] flex flex-col gap-3">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#271310] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[16px]">pan_tool</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#271310]">Barista Checkout Instructions</h4>
            <p className="text-[11px] text-[#504442]">Present this screen to the counter staff before payment is processed.</p>
          </div>
        </div>

        {/* Barista Tap Button */}
        <button
          type="button"
          onClick={handleBaristaVerify}
          className={`w-full min-h-[46px] rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all ${
            baristaVerified
              ? 'bg-[#c8f17a] text-[#131f00]'
              : 'bg-[#271310] text-white hover:opacity-95 active:scale-[0.98]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {baristaVerified ? 'check_circle' : 'assignment_turned_in'}
          </span>
          <span>
            {baristaVerified
              ? 'Verified by Counter Cashier (POS-01)'
              : 'Barista: Tap to Confirm Stamp & Applied Discount'}
          </span>
        </button>

        {baristaVerified && (
          <div className="p-3 bg-[#ffdcbd]/50 rounded-xl flex items-center gap-2 border border-[#ffdcbd] animate-in fade-in">
            <div className="w-6 h-6 rounded-full bg-[#7d562d] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[15px]">check</span>
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#2c1600]">Stamp Recorded Successfully!</div>
              <div className="text-[10px] text-[#623f18]">Added +1 visit credit to your Two Roasters Passport.</div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Controls */}
      <div className="flex flex-col items-center gap-2 pt-1 pb-4">
        <button
          type="button"
          onClick={() => onNavigate('passport')}
          className="w-full h-11 rounded-xl bg-[#ebe8e2] text-[#271310] text-xs font-bold hover:bg-[#e6e2dc] transition-all active:scale-[0.98]"
        >
          Done / Return to Passport
        </button>

        <button
          type="button"
          onClick={() => alert('KopiFinder Support: If barista POS cannot scan, please request the shift manager to enter PIN override: 8921 or contact WhatsApp hotline: +62 812-9900-KOPI.')}
          className="flex items-center gap-1 text-[11px] text-[#7d562d] hover:text-[#271310] transition-colors py-1"
        >
          <span className="material-symbols-outlined text-[16px]">help_center</span>
          <span>Need help or cashier issue? Tap for staff support</span>
        </button>
      </div>
    </div>
  );
};
