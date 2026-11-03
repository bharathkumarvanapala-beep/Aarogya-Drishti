import React, { useState } from 'react';
import { OrganData, AISimulationCase, AnatomicalPin } from '../../data/anatomyData';
import { 
  Cpu, 
  Activity, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Send, 
  TrendingUp,
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';

interface AtlasAICheckerProps {
  organ: OrganData;
  activeSimulation: AISimulationCase | null;
  onSelectSimulation: (sim: AISimulationCase) => void;
  activePin: AnatomicalPin | null;
  onNavigateToScreening?: () => void;
}

export const AtlasAIChecker: React.FC<AtlasAICheckerProps> = ({
  organ,
  activeSimulation,
  onSelectSimulation,
  activePin,
  onNavigateToScreening
}) => {
  const currentSim = activeSimulation || organ.aiSimulations[0];
  const [dossierExported, setDossierExported] = useState<boolean>(false);

  const getCategoryBadgeClass = (category: 'A' | 'B' | 'C' | 'D') => {
    switch (category) {
      case 'A': return 'clinical-badge-a';
      case 'B': return 'clinical-badge-b';
      case 'C': return 'clinical-badge-c';
      case 'D': return 'clinical-badge-d';
      default: return 'clinical-badge-c';
    }
  };

  const handleExportDossier = () => {
    setDossierExported(true);
    setTimeout(() => setDossierExported(false), 4000);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#dce8e9] p-6 shadow-md font-sans">
      
      {/* Copilot Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#eef3f3] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-emerald-600 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-black text-lg text-[#18313B]">
                Live 3D AI Clinical Diagnostic Copilot
              </h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                ACTIVE INFERENCE
              </span>
            </div>
            <p className="text-xs text-[#647681]">
              Simulating AD-OralNet v2.4.1 neural optical segmentation & dysplasia triage
            </p>
          </div>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-[#f5fafa] p-1 rounded-xl border border-[#dce8e9] text-xs font-bold">
          {organ.aiSimulations.map((sim) => (
            <button
              key={sim.id}
              onClick={() => onSelectSimulation(sim)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currentSim.id === sim.id
                  ? 'bg-white text-[#18313B] shadow-xs border border-[#dce8e9]'
                  : 'text-[#647681] hover:text-[#18313B]'
              }`}
            >
              {sim.category}: {sim.name.split('(')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Diagnostic Telemetry Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live Classification & Findings */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Category Banner */}
          <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${getCategoryBadgeClass(currentSim.category)}`}>
            {currentSim.category === 'A' ? (
              <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
            ) : currentSim.category === 'D' ? (
              <ShieldAlert className="w-6 h-6 text-rose-700 shrink-0 mt-0.5 animate-pulse" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
            )}
            <div>
              <h4 className="font-black text-sm tracking-tight">
                {currentSim.categoryTitle}
              </h4>
              <p className="text-xs mt-1 leading-relaxed opacity-90">
                {currentSim.tissueDescription}
              </p>
            </div>
          </div>

          {/* AI Findings List */}
          <div className="bg-[#f8fbfb] rounded-xl p-4 border border-[#e3eded]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#087F8C] block mb-2">
              Neural Optical Findings & Biometric Profile
            </span>
            <ul className="space-y-1.5 text-xs text-[#2c404a]">
              {currentSim.aiFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#087F8C] mt-1.5 shrink-0" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Action Recommendation */}
          <div className="bg-white rounded-xl p-4 border border-[#dce8e9]">
            <h5 className="font-bold text-xs text-[#18313B] uppercase tracking-wider mb-1">
              Standardized Clinical Action
            </h5>
            <p className="text-xs text-[#415560] leading-relaxed mb-3">
              {currentSim.recommendedAction}
            </p>
            <div className="text-[11px] font-medium text-[#647681] bg-[#f5fafa] p-2 rounded-lg border border-[#e3eded]">
              <strong>Public Health Triage Protocol:</strong> {currentSim.clinicalTriage}
            </div>
          </div>

        </div>

        {/* Right Column: Quantitative Telemetry Metrics */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          <div className="bg-[#f5fafa] rounded-xl p-4 border border-[#dce8e9]">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#18313B] mb-3 flex items-center justify-between">
              <span>Risk & Confidence Telemetry</span>
              <Activity className="w-4 h-4 text-[#087F8C]" />
            </h4>

            {/* Risk Score Meter */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold text-[#415560]">Dysplasia / Malignancy Index</span>
                <span className="font-mono font-bold text-[#18313B]">
                  {(currentSim.riskScore * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    currentSim.riskScore > 0.7 
                      ? 'bg-rose-600' 
                      : (currentSim.riskScore > 0.3 ? 'bg-amber-500' : 'bg-emerald-600')
                  }`}
                  style={{ width: `${currentSim.riskScore * 100}%` }}
                />
              </div>
            </div>

            {/* Calibrated Model Confidence */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold text-[#415560]">Optical Model Confidence</span>
                <span className="font-mono font-bold text-[#18313B]">
                  {(currentSim.confidence * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#087F8C] transition-all duration-500"
                  style={{ width: `${currentSim.confidence * 100}%` }}
                />
              </div>
            </div>

            {/* Biomarker Key-Value Matrix */}
            <div className="space-y-2 pt-1 border-t border-gray-200">
              {currentSim.biomarkers.map((bm, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <span className="text-[#647681]">{bm.name}</span>
                  <span className={`font-mono font-semibold px-2 py-0.5 rounded text-[11px] ${
                    bm.status === 'critical' 
                      ? 'bg-rose-100 text-rose-800' 
                      : (bm.status === 'concerning' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800')
                  }`}>
                    {bm.value}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Export Action Card */}
          <div className="bg-white rounded-xl p-4 border border-[#dce8e9] flex flex-col gap-2">
            <button
              onClick={handleExportDossier}
              className="w-full py-2.5 px-4 bg-[#087F8C] hover:bg-[#075B66] text-white rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>{dossierExported ? 'Saved to Screening Dossier!' : 'Export Finding to Clinical Dossier'}</span>
            </button>

            {onNavigateToScreening && (
              <button
                onClick={onNavigateToScreening}
                className="w-full py-2 px-3 border border-[#087F8C]/40 text-[#087F8C] hover:bg-[#F5FAFA] rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>Launch Full Patient Screening Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
