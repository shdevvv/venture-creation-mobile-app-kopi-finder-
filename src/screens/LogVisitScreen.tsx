import React, { useState } from 'react';
import { ScreenName } from '../types';

interface LogVisitScreenProps {
  onNavigate: (screen: ScreenName) => void;
  onSubmitLog: (stampName: string) => void;
}

export const LogVisitScreen: React.FC<LogVisitScreenProps> = ({ onNavigate, onSubmitLog }) => {
  const [selectedBean, setSelectedBean] = useState('Aceh Gayo Natural');
  const [selectedMethod, setSelectedMethod] = useState('v60');
  const [tempMode, setTempMode] = useState<'hot' | 'iced'>('hot');
  const [selectedNotes, setSelectedNotes] = useState<string[]>([
    'Floral Jasmine',
    'Ripe Stone Fruit',
    'Brown Sugar'
  ]);
  const [ratings, setRatings] = useState({
    coffee: 5,
    ambience: 5,
    barista: 5,
    wifi: 4,
    value: 4
  });
  const [notesText, setNotesText] = useState(
    'Incredible jasmine aroma on first bloom, delicate peach finish as it cooled down. Barista Dimas dialed the grinder spot on.'
  );
  const [publishToFeed, setPublishToFeed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const flavorOptions = [
    { id: 'jasmine', label: '🌸 Floral Jasmine' },
    { id: 'citrus', label: '🍋 Yellow Citrus' },
    { id: 'stonefruit', label: '🍑 Ripe Stone Fruit' },
    { id: 'sugar', label: '🍯 Brown Sugar' },
    { id: 'cocoa', label: '🍫 Dark Cocoa' },
    { id: 'cedar', label: '🌱 Earthy Cedar' },
    { id: 'cherry', label: '🍒 Bergamot Cherry' }
  ];

  const toggleNote = (label: string) => {
    const raw = label.replace(/[^\w\s]/gi, '').trim();
    if (selectedNotes.includes(raw)) {
      setSelectedNotes(selectedNotes.filter((n) => n !== raw));
    } else {
      setSelectedNotes([...selectedNotes, raw]);
    }
  };

  const handleStarClick = (aspect: keyof typeof ratings, score: number) => {
    setRatings({ ...ratings, [aspect]: score });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      onSubmitLog('Tanamera Specialty Roastery');
      setTimeout(() => {
        onNavigate('passport');
      }, 1200);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-24 bg-[#fdf9f3] gap-4">
      {/* Cafe Location Verification Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e6e2dc] relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-[#f1ede7] shrink-0 overflow-hidden shadow-xs">
              <img
                className="w-full h-full object-cover"
                alt="Tanamera Coffee"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8SF03sWTDQIVnT91x2wdbwfXOWhE_FvXsueCu2Pa2KiSndh1EgRSF73vXBuN0iPxQFXIZUs5aawnkX3Lg2s4wA9FYhE65oOButNjva_nXhfuxCYwEU-i2xxCGnN6uCOQltp8n3kwXS8qc_xOrC-lIXlt9NJwfe2kZQ6dj3p0C-shLYr1NKPvDzIrN_MqK4A49V299o1Wv_P8J0er7U1VaWaEdGiq4PPcDqGg-HW1zLimoy9nBRL_pYw"
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-[#271310] truncate">Tanamera Specialty Roastery</h2>
              <p className="text-xs text-[#504442] truncate">Senopati, South Jakarta</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 bg-[#c8f17a] text-[#131f00] px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0">
            <span className="material-symbols-outlined text-[13px]">verified</span>
            Verified
          </span>
        </div>

        <div className="mt-3 pt-2 border-t border-[#f1ede7] flex items-center justify-between text-[#7d562d] bg-[#f7f3ed] rounded-xl px-3 py-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="material-symbols-outlined text-[16px] text-[#7d562d] shrink-0">my_location</span>
            <span className="text-xs font-semibold text-[#1c1c18] truncate">25m from brew counter</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 text-xs font-bold text-[#7d562d]">
            <span className="material-symbols-outlined text-[15px]">loyalty</span>
            <span>+1 Stamp • 50 Pts</span>
          </div>
        </div>
      </div>

      {/* Aspect Ratings Bento Section */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e6e2dc] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#7d562d] uppercase tracking-wider">
              Cupping Scorecard
            </span>
            <h3 className="text-sm font-bold text-[#271310]">Multi-Aspect Rating</h3>
          </div>
          <div className="flex items-center gap-1 bg-[#271310] text-white px-3 py-1 rounded-full shadow-xs">
            <span className="material-symbols-outlined text-[14px] text-[#ffdcbd]" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span className="text-xs font-bold">4.8</span>
            <span className="text-[10px] text-[#e3beb8] ml-0.5">Exceptional</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 pt-1">
          {/* Aspect 1 */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[17px] text-[#7d562d]">coffee</span>
              <span className="text-xs text-[#1c1c18] font-medium truncate">Coffee Extraction Quality</span>
            </div>
            <div className="flex items-center gap-0.5 shrink-0 text-[#7d562d]">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => handleStarClick('coffee', star)}>
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: ratings.coffee >= star ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    star
                  </span>
                </button>
              ))}
              <span className="text-xs font-bold text-[#271310] ml-1 w-5 text-right">{ratings.coffee}.0</span>
            </div>
          </div>

          {/* Aspect 2 */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[17px] text-[#7d562d]">palette</span>
              <span className="text-xs text-[#1c1c18] font-medium truncate">Ambience & Soundscape</span>
            </div>
            <div className="flex items-center gap-0.5 shrink-0 text-[#7d562d]">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => handleStarClick('ambience', star)}>
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: ratings.ambience >= star ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    star
                  </span>
                </button>
              ))}
              <span className="text-xs font-bold text-[#271310] ml-1 w-5 text-right">{ratings.ambience}.0</span>
            </div>
          </div>

          {/* Aspect 3 */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[17px] text-[#7d562d]">handshake</span>
              <span className="text-xs text-[#1c1c18] font-medium truncate">Barista Craft & Hospitality</span>
            </div>
            <div className="flex items-center gap-0.5 shrink-0 text-[#7d562d]">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => handleStarClick('barista', star)}>
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: ratings.barista >= star ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    star
                  </span>
                </button>
              ))}
              <span className="text-xs font-bold text-[#271310] ml-1 w-5 text-right">{ratings.barista}.0</span>
            </div>
          </div>

          {/* Aspect 4 */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[17px] text-[#7d562d]">wifi</span>
              <span className="text-xs text-[#1c1c18] font-medium truncate">Work-Friendliness & Wi-Fi</span>
            </div>
            <div className="flex items-center gap-0.5 shrink-0 text-[#7d562d]">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => handleStarClick('wifi', star)}>
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: ratings.wifi >= star ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    star
                  </span>
                </button>
              ))}
              <span className="text-xs font-bold text-[#271310] ml-1 w-5 text-right">{ratings.wifi}.0</span>
            </div>
          </div>

          {/* Aspect 5 */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[17px] text-[#7d562d]">payments</span>
              <span className="text-xs text-[#1c1c18] font-medium truncate">Value for Craft</span>
            </div>
            <div className="flex items-center gap-0.5 shrink-0 text-[#7d562d]">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => handleStarClick('value', star)}>
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: ratings.value >= star ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    star
                  </span>
                </button>
              ))}
              <span className="text-xs font-bold text-[#271310] ml-1 w-5 text-right">{ratings.value}.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cup Diagnostics */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e6e2dc] flex flex-col gap-3">
        <div>
          <span className="text-[10px] font-bold text-[#7d562d] uppercase tracking-wider">
            Cup Diagnostics
          </span>
          <h3 className="text-sm font-bold text-[#271310]">What Did You Brew Today?</h3>
        </div>

        {/* Bean Variety */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#504442]">Bean Variety & Origin</label>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
            {['Aceh Gayo Natural', 'Kerinci Honey Process', 'Panama Geisha (Guest)'].map((bean) => (
              <button
                key={bean}
                type="button"
                onClick={() => setSelectedBean(bean)}
                className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 transition-all ${
                  selectedBean === bean
                    ? 'bg-[#271310] text-white shadow-xs'
                    : 'bg-[#f1ede7] text-[#1c1c18] hover:bg-[#ebe8e2]'
                }`}
              >
                {selectedBean === bean && (
                  <span className="material-symbols-outlined text-[15px]">check</span>
                )}
                {bean}
              </button>
            ))}
          </div>
        </div>

        {/* Extraction Method */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#504442]">Extraction Method</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'v60', title: 'V60 Pour-Over', subtitle: 'Dialed: 2:45 min', icon: 'filter_alt' },
              { id: 'flatwhite', title: 'Flat White', subtitle: 'Double Ristretto', icon: 'local_cafe' },
              { id: 'aeropress', title: 'Aeropress', subtitle: 'Inverted Method', icon: 'compress' },
              { id: 'tonic', title: 'Espresso Tonic', subtitle: 'Citrus Infusion', icon: 'liquor' }
            ].map((m) => {
              const active = selectedMethod === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id)}
                  className={`p-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
                    active
                      ? 'bg-[#271310] text-white shadow-sm'
                      : 'bg-[#f7f3ed] text-[#1c1c18] hover:bg-[#ebe8e2]'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    active ? 'bg-[#3e2723] text-[#ffdcbd]' : 'bg-[#ebe8e2] text-[#7d562d]'
                  }`}>
                    <span className="material-symbols-outlined text-[17px]">{m.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate">{m.title}</p>
                    <p className={`text-[10px] truncate ${active ? 'text-[#e3beb8]' : 'text-[#504442]'}`}>
                      {m.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brew Temperature */}
        <div className="flex items-center justify-between bg-[#f7f3ed] rounded-xl p-1.5 border border-[#e6e2dc]/50">
          <span className="text-xs font-semibold text-[#504442] ml-2">Brew Temperature</span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setTempMode('hot')}
              className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 transition-all ${
                tempMode === 'hot'
                  ? 'bg-[#271310] text-white shadow-xs'
                  : 'text-[#504442] hover:bg-[#ebe8e2]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
              Hot (92°C)
            </button>
            <button
              type="button"
              onClick={() => setTempMode('iced')}
              className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 transition-all ${
                tempMode === 'iced'
                  ? 'bg-[#271310] text-white shadow-xs'
                  : 'text-[#504442] hover:bg-[#ebe8e2]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">ac_unit</span>
              Iced Chilled
            </button>
          </div>
        </div>
      </div>

      {/* Sensory Descriptors */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e6e2dc] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#7d562d] uppercase tracking-wider">
              Tasting Notes
            </span>
            <h3 className="text-sm font-bold text-[#271310]">Sensory Descriptors</h3>
          </div>
          <span className="text-[10px] font-bold bg-[#ffdcbd] text-[#2c1600] px-2 py-0.5 rounded-full">
            {selectedNotes.length} Selected
          </span>
        </div>

        {/* Flavor Chips */}
        <div className="flex flex-wrap gap-1.5">
          {flavorOptions.map((opt) => {
            const raw = opt.label.replace(/[^\w\s]/gi, '').trim();
            const isSelected = selectedNotes.some((n) => opt.label.includes(n));
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleNote(opt.label)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 transition-all ${
                  isSelected
                    ? 'bg-[#271310] text-white shadow-xs'
                    : 'bg-[#f1ede7] text-[#1c1c18] hover:bg-[#ebe8e2]'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <span className="material-symbols-outlined text-[14px]">check</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tactile Sliders */}
        <div className="bg-[#f7f3ed] rounded-xl p-3 flex flex-col gap-3 border border-[#e6e2dc]/50">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#1c1c18]">Acidity Scale</span>
              <span className="text-[10px] font-bold text-[#7d562d]">Bright & Juicy (4/5)</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5 h-2">
              <div className="bg-[#7d562d] rounded-full"></div>
              <div className="bg-[#7d562d] rounded-full"></div>
              <div className="bg-[#7d562d] rounded-full"></div>
              <div className="bg-[#7d562d] rounded-full"></div>
              <div className="bg-[#e6e2dc] rounded-full"></div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#1c1c18]">Body & Texture</span>
              <span className="text-[10px] font-bold text-[#7d562d]">Silky Tea-Like (3/5)</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5 h-2">
              <div className="bg-[#7d562d] rounded-full"></div>
              <div className="bg-[#7d562d] rounded-full"></div>
              <div className="bg-[#7d562d] rounded-full"></div>
              <div className="bg-[#e6e2dc] rounded-full"></div>
              <div className="bg-[#e6e2dc] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Cupping Notes & Media Attachment */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e6e2dc] flex flex-col gap-3">
        <div>
          <span className="text-[10px] font-bold text-[#7d562d] uppercase tracking-wider">
            Barista Observation
          </span>
          <h3 className="text-sm font-bold text-[#271310]">Personal Tasting Notes</h3>
        </div>

        <div className="relative">
          <textarea
            rows={3}
            value={notesText}
            onChange={(e) => setNotesText(e.target.value)}
            className="w-full bg-[#f7f3ed] rounded-xl p-3 text-xs sm:text-sm text-[#1c1c18] placeholder:text-[#504442] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7d562d]/40 transition-all resize-none border border-[#e6e2dc]"
          />
          <span className="absolute bottom-2.5 right-2.5 text-[10px] text-[#504442]">
            {notesText.length} chars
          </span>
        </div>

        {/* Media Photo Attachment Strip */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#504442]">
            Add Photos (Cup, Gear, Receipt)
          </label>
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-xs border border-[#e6e2dc]">
              <img
                className="w-full h-full object-cover"
                alt="Cupping photo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5EvLAq_SMSJndbAqgM5Que7o93FF5HbtF7v115p9-VC71Q2Ro3gXD9kIpNmyzbXB-sJiA9RGo6YjnJftH4Wb-Dp_LVL1lrIU-eju6rhZHTH_5LwIGjC3D1ff4n2Po8Xyu9I2MBFPkmnjAgYJx4afAXo-UrVZQWknMU_L07FtKqSA7rGxu4y6YUgl48ob9wIOjPwMSpVHxT1rCLa8D9jN1g-MkakIIG8uaaeOA4jc2mAZ30clHqKccng"
              />
            </div>

            <button
              type="button"
              onClick={() => alert('Camera photo snapshot simulated!')}
              className="w-16 h-16 rounded-xl bg-[#f7f3ed] hover:bg-[#ebe8e2] border border-[#e6e2dc] flex flex-col items-center justify-center gap-0.5 text-[#7d562d] transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
              <span className="text-[10px] text-[#504442] font-semibold">Snap</span>
            </button>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#1c1c18]">1 photo attached</p>
              <p className="text-[11px] text-[#504442] leading-tight">Adds authenticity badge to review.</p>
            </div>
          </div>
        </div>

        {/* Publish Privacy Switch */}
        <div className="flex items-center justify-between pt-2 border-t border-[#f1ede7]">
          <div className="flex flex-col min-w-0 pr-2">
            <span className="text-xs font-bold text-[#271310]">Publish to Community Feed</span>
            <span className="text-[10px] text-[#504442]">Visible to fellow Jakarta coffee hunters</span>
          </div>

          <button
            type="button"
            onClick={() => setPublishToFeed(!publishToFeed)}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              publishToFeed ? 'bg-[#7d562d]' : 'bg-[#e6e2dc]'
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                publishToFeed ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Submission CTA Button */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full h-13 py-3.5 bg-[#271310] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(62,39,35,0.18)] active:scale-[0.98] transition-all hover:opacity-95"
        >
          <span className="material-symbols-outlined text-[20px]">
            {submitSuccess ? 'check_circle' : 'coffee_maker'}
          </span>
          <span>
            {isSubmitting
              ? 'Recording Cupping Note...'
              : submitSuccess
              ? 'Stamp Collected! ✓'
              : 'Submit Cupping Log & Collect Stamp'}
          </span>
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[#504442]">
          <span className="material-symbols-outlined text-[14px]">shield</span>
          <span className="text-[10px] font-semibold">Stamp logged permanently to KopiFinder Passport</span>
        </div>
      </div>
    </div>
  );
};
