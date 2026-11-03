import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { NINE_ORGANS, OrganData, AnatomicalPin, AISimulationCase } from '../data/anatomyData';
import { AnatomyCanvas } from '../components/anatomy/AnatomyCanvas';
import { WatercolourTissuePlate } from '../components/anatomy/WatercolourTissuePlate';
import { OrganQuiz } from '../components/anatomy/OrganQuiz';
import { AtlasAIChecker } from '../components/anatomy/AtlasAIChecker';
import { PinDetailCard } from '../components/anatomy/PinDetailCard';
import {
  Sparkles,
  RotateCw,
  Eye,
  Scissors,
  PenTool,
  Cpu,
  Layers,
  BookOpen,
  HelpCircle,
  Microscope,
  ChevronRight,
  ChevronLeft,
  Volume2,
  ShieldCheck,
  Award
} from 'lucide-react';

interface AnatomyAtlasPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const AnatomyAtlasPage: React.FC<AnatomyAtlasPageProps> = ({ onNavigate, language }) => {
  // Current active organ
  const [selectedOrganIndex, setSelectedOrganIndex] = useState<number>(0);
  const activeOrgan: OrganData = NINE_ORGANS[selectedOrganIndex];

  // Active view tab
  const [activeTab, setActiveTab] = useState<'3d' | 'plate' | 'quiz' | 'ai'>('3d');

  // Selected Pin & AI Case state
  const [activePin, setActivePin] = useState<AnatomicalPin | null>(null);
  const [activeSimulation, setActiveSimulation] = useState<AISimulationCase | null>(activeOrgan.aiSimulations[0]);

  // Handle switching organs
  const handleSelectOrgan = (index: number) => {
    setSelectedOrganIndex(index);
    setActivePin(null);
    setActiveSimulation(NINE_ORGANS[index].aiSimulations[0]);
  };

  const handleNextOrgan = () => {
    handleSelectOrgan((selectedOrganIndex + 1) % NINE_ORGANS.length);
  };

  const handlePrevOrgan = () => {
    handleSelectOrgan((selectedOrganIndex - 1 + NINE_ORGANS.length) % NINE_ORGANS.length);
  };

  // Multilingual Subtitle
  const getMultilingualSub = () => {
    if (language === 'te') return 'డిజిటల్ అనాటమీ అట్లాస్ • 3D శిల్పం & ప్రత్యక్ష AI స్క్రీనింగ్';
    if (language === 'hi') return 'डिजिटल शरीर रचना एटलस • 3D मॉडल और लाइव AI स्क्रीनिंग';
    return 'Digital Anatomical Atlas • 3D Code Sculptures & Live AI Diagnostic Scanner';
  };

  return (
    <div className="min-h-screen bg-[#F5FAFA] text-[#18313B] font-sans pb-16">

      {/* Antique Botanical Heritage Masthead */}
      <div className="bg-[#18242b] text-white border-b-4 border-[#8c7853] pt-8 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle background radial glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#087F8C]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-[#8c7853]/40 text-amber-200 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-[#8c7853]/60 tracking-wider uppercase">
                  Ex Tabulis Anatomicis • Hand-Drawn 3D Atlas
                </span>
                <span className="bg-emerald-950/80 text-emerald-300 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live AI Enabled
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white">
                Aarogya Drishti Anatomical Atlas
              </h1>
              <p className="text-amber-200/90 font-serif italic text-sm sm:text-base mt-1">
                {getMultilingualSub()}
              </p>
            </div>

            {/* Quick Link to AI Oral Screening */}
            <button
              onClick={() => onNavigate('screening')}
              className="bg-[#087F8C] hover:bg-[#075B66] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2 border border-[#b8e7d0]/30 shrink-0"
            >
              <ShieldCheck className="w-4 h-4 text-[#b8e7d0]" />
              <span>Launch Clinical AI Screening</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            Nine essential organs sculpted in procedural WebGL code and turned upon an antique pedestal plinth.
            Inspect interactive anatomical callout pins, cross-section slicing planes, hand-drawn ink-sketch
            renderings, fine art watercolor tissue plates, organ quizzes, and a live AI diagnostic probe.
          </p>
        </div>
      </div>

      {/* Nine Organs Horizontal Selector Dock */}
      <div className="bg-white border-b border-[#dce8e9] sticky top-18 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-2">

            <button
              onClick={handlePrevOrgan}
              className="p-2 text-[#647681] hover:text-[#18313B] hover:bg-[#F5FAFA] rounded-lg transition-colors shrink-0"
              title="Previous Organ"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* 9 Organ Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none no-scrollbar flex-1 justify-start md:justify-center">
              {NINE_ORGANS.map((org, index) => {
                const isSelected = index === selectedOrganIndex;
                return (
                  <button
                    key={org.id}
                    onClick={() => handleSelectOrgan(index)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border ${isSelected
                        ? 'bg-[#18242b] text-white border-[#18242b] shadow-md ring-2 ring-[#087F8C]'
                        : 'bg-[#F5FAFA] text-[#415560] border-[#dce8e9] hover:bg-white hover:text-[#18313B]'
                      }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: org.colorPalette.primary }}
                    />
                    <div className="text-left">
                      <span className="block font-sans text-xs leading-none">
                        {org.name.split('&')[0].split('(')[0].trim()}
                      </span>
                      <span className={`block text-[10px] italic font-serif leading-none mt-0.5 ${isSelected ? 'text-amber-200/80' : 'text-[#8b9ba5]'}`}>
                        {org.latinName.split('&')[0].trim()}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNextOrgan}
              className="p-2 text-[#647681] hover:text-[#18313B] hover:bg-[#F5FAFA] rounded-lg transition-colors shrink-0"
              title="Next Organ"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-[#dce8e9] pb-3">
          <button
            onClick={() => setActiveTab('3d')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === '3d'
                ? 'bg-[#087F8C] text-white shadow-md'
                : 'bg-white text-[#415560] border border-[#dce8e9] hover:bg-[#F5FAFA]'
              }`}
          >
            <RotateCw className="w-4 h-4" />
            <span>3D Sculpted Plinth & Canvas</span>
          </button>

          <button
            onClick={() => setActiveTab('plate')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'plate'
                ? 'bg-[#8c7853] text-white shadow-md font-serif'
                : 'bg-white text-[#415560] border border-[#dce8e9] hover:bg-[#F5FAFA]'
              }`}
          >
            <Microscope className="w-4 h-4" />
            <span>Watercolour Tissue Plate</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'quiz'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-[#415560] border border-[#dce8e9] hover:bg-[#F5FAFA]'
              }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Clinical Knowledge Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'ai'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white text-[#415560] border border-[#dce8e9] hover:bg-[#F5FAFA]'
              }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Live AI Diagnostic Telemetry</span>
          </button>
        </div>

        {/* Tab 1: 3D Sculpted Canvas on Plinth */}
        {activeTab === '3d' && (
          <div className="space-y-6">

            {/* 3D WebGL Canvas */}
            <div className="relative">
              <AnatomyCanvas
                organ={activeOrgan}
                activePin={activePin}
                onSelectPin={setActivePin}
                activeSimulation={activeSimulation}
                onSelectSimulation={setActiveSimulation}
              />

              {/* Floating Pin Detail Card Overlay when clicked */}
              {activePin && (
                <div className="absolute top-20 right-20 z-20">
                  <PinDetailCard
                    pin={activePin}
                    onClose={() => setActivePin(null)}
                  />
                </div>
              )}
            </div>

            {/* Quick Anatomical Pins Grid */}
            <div className="bg-white rounded-2xl border border-[#dce8e9] p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-black text-sm text-[#18313B] uppercase tracking-wider flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#087F8C]" />
                  Interactive Anatomical Pins ({activeOrgan.pins.length} Landmarks)
                </h3>
                <span className="text-xs text-[#647681]">Click any pin to inspect histology & clinical risk</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeOrgan.pins.map((pin) => (
                  <button
                    key={pin.id}
                    onClick={() => setActivePin(pin)}
                    className={`text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${activePin?.id === pin.id
                        ? 'bg-[#F5FAFA] border-[#087F8C] ring-2 ring-[#087F8C]/30 shadow-xs'
                        : 'bg-white hover:bg-[#fafdfd] border-[#e2ebee]'
                      }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#087F8C] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {pin.number}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#18313B]">
                        {pin.label}
                      </div>
                      <div className="text-[11px] italic font-serif text-[#647681]">
                        {pin.latinName}
                      </div>
                      <p className="text-[11px] text-[#415560] line-clamp-2 mt-1">
                        {pin.clinicalSignificance}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Curatorial & Functional Specs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-[#dce8e9] shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#647681] block mb-1">
                  Organ Dimensions & Mass
                </span>
                <p className="font-bold text-sm text-[#18313B]">
                  {activeOrgan.dimensions}
                </p>
                <p className="text-xs text-[#647681] mt-0.5">
                  Weight: {activeOrgan.weight}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-[#dce8e9] shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#647681] block mb-1">
                  Curatorial Folio Note
                </span>
                <p className="text-xs text-[#415560] italic leading-relaxed">
                  "{activeOrgan.curatorNotes}"
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-[#dce8e9] shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#647681] block mb-1">
                  Cross-Section Internal Anatomy
                </span>
                <p className="text-xs text-[#415560] leading-relaxed">
                  Active Slices: {activeOrgan.sections.map(s => s.label).join(' • ')}
                </p>
                <button
                  onClick={() => setActiveTab('plate')}
                  className="mt-2 text-xs font-bold text-[#087F8C] hover:underline flex items-center gap-1"
                >
                  <span>Examine Watercolor Tissue Plate</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Embedded AI Diagnostic Copilot */}
            <AtlasAIChecker
              organ={activeOrgan}
              activeSimulation={activeSimulation}
              onSelectSimulation={setActiveSimulation}
              activePin={activePin}
              onNavigateToScreening={() => onNavigate('screening')}
            />

          </div>
        )}

        {/* Tab 2: Watercolour Tissue Plate */}
        {activeTab === 'plate' && (
          <WatercolourTissuePlate organ={activeOrgan} />
        )}

        {/* Tab 3: Clinical Anatomical Quiz */}
        {activeTab === 'quiz' && (
          <OrganQuiz organ={activeOrgan} />
        )}

        {/* Tab 4: Live AI Diagnostic Telemetry */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            <AtlasAIChecker
              organ={activeOrgan}
              activeSimulation={activeSimulation}
              onSelectSimulation={setActiveSimulation}
              activePin={activePin}
              onNavigateToScreening={() => onNavigate('screening')}
            />

            {/* 3D Model Quick Canvas preview */}
            <div className="mt-6">
              <h3 className="font-heading font-black text-base text-[#18313B] mb-3">
                Live 3D Organ Visualization
              </h3>
              <AnatomyCanvas
                organ={activeOrgan}
                activePin={activePin}
                onSelectPin={setActivePin}
                activeSimulation={activeSimulation}
                onSelectSimulation={setActiveSimulation}
              />
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
