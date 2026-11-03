import React from 'react';
import { AnatomicalPin } from '../../data/anatomyData';
import { 
  X, 
  MapPin, 
  Activity, 
  Zap, 
  AlertCircle, 
  ShieldAlert, 
  Volume2, 
  BookOpen,
  Sparkles
} from 'lucide-react';

interface PinDetailCardProps {
  pin: AnatomicalPin;
  onClose: () => void;
  onSpeak?: (text: string) => void;
}

export const PinDetailCard: React.FC<PinDetailCardProps> = ({ pin, onClose, onSpeak }) => {
  const handlePronounce = () => {
    if (onSpeak) {
      onSpeak(`${pin.label}. Latin: ${pin.latinName}. Clinical note: ${pin.clinicalSignificance}`);
    } else if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(`${pin.label}. ${pin.latinName}`);
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="bg-[#faf6ed] text-[#2c221a] rounded-2xl border-2 border-[#8c7853] p-5 shadow-2xl font-serif max-w-md w-full animate-fadeIn relative">
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 text-[#8c7853] hover:text-[#2c221a] hover:bg-[#ebdcc9] rounded-lg transition-colors font-sans"
        aria-label="Close pin details"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="flex items-start gap-3 mb-3 pr-6">
        <div className="w-8 h-8 rounded-full bg-[#087F8C] text-white flex items-center justify-center font-sans font-bold text-sm shrink-0 shadow-xs">
          {pin.number}
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8c7853] font-bold block">
            Anatomical Pin #{pin.number}
          </span>
          <h3 className="text-lg font-black text-[#382216] leading-tight">
            {pin.label}
          </h3>
          <p className="text-xs italic text-[#6e5847] mt-0.5">
            {pin.latinName}
          </p>
        </div>
      </div>

      {/* Audio Pronunciation Button */}
      <button
        onClick={handlePronounce}
        className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 hover:bg-white text-xs font-sans font-bold text-[#6e5847] rounded-lg border border-[#8c7853]/30 transition-all shadow-xs"
      >
        <Volume2 className="w-3.5 h-3.5 text-[#087F8C]" />
        <span>Pronounce Latin Term</span>
      </button>

      {/* Description */}
      <p className="text-xs text-[#4a3b30] leading-relaxed mb-4 pb-3 border-b border-[#e8dccb] font-sans">
        {pin.description}
      </p>

      {/* Neurovascular Supply */}
      <div className="space-y-2 mb-4 font-sans text-xs">
        <div className="flex items-start gap-2">
          <Activity className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#382216]">Arterial Supply: </strong>
            <span className="text-[#645041]">{pin.bloodSupply}</span>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#382216]">Innervation: </strong>
            <span className="text-[#645041]">{pin.innervation}</span>
          </div>
        </div>
      </div>

      {/* Clinical & Oncology Significance Box */}
      <div className="bg-white/90 rounded-xl p-3 border border-[#8c7853]/40 font-sans text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#087F8C] uppercase text-[10px] tracking-wider mb-1">
          <BookOpen className="w-3.5 h-3.5" />
          Clinical Significance
        </div>
        <p className="text-[#3a2c22] leading-relaxed mb-2">
          {pin.clinicalSignificance}
        </p>

        {pin.oncologyFocus && (
          <div className="pt-2 border-t border-rose-100 flex items-start gap-1.5 text-rose-900 bg-rose-50/60 p-2 rounded-lg">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="text-[11px] leading-tight">
              <strong>Oncological Screening Focus:</strong> {pin.oncologyFocus}
            </span>
          </div>
        )}
      </div>

    </div>
  );
};
