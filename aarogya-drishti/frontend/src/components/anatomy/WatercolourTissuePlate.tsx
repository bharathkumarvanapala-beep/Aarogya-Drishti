import React, { useRef, useEffect, useState } from 'react';
import { OrganData, WatercolourLayer } from '../../data/anatomyData';
import { 
  Sparkles, 
  ZoomIn, 
  Layers, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Microscope,
  Info
} from 'lucide-react';

interface WatercolourTissuePlateProps {
  organ: OrganData;
}

export const WatercolourTissuePlate: React.FC<WatercolourTissuePlateProps> = ({ organ }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const plate = organ.watercolourPlate;
  const [selectedLayer, setSelectedLayer] = useState<WatercolourLayer | null>(plate.layers[0]);
  const [zoomLevel, setZoomLevel] = useState<'40x' | '200x' | '600x'>('200x');
  const [showDysplasiaOverlay, setShowDysplasiaOverlay] = useState<boolean>(false);

  // Procedural Hand-Painted Watercolor Canvas Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // 1. Antique Parchment Paper Background with fibrous wash
    ctx.fillStyle = '#faf6ed';
    ctx.fillRect(0, 0, width, height);

    // Subtle paper grain washes
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = `rgba(210, 185, 150, ${Math.random() * 0.08})`;
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 8 + 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Tissue Section Geometry based on Organ
    const centerY = height * 0.48;

    if (organ.id === 'oral-cavity') {
      // Stratified Squamous Epithelium watercolor wash
      // Lamina Propria connective tissue layer (pinkish beige base)
      const lpGrad = ctx.createLinearGradient(0, centerY, 0, height);
      lpGrad.addColorStop(0, '#f2d5c4');
      lpGrad.addColorStop(1, '#e3bda8');
      ctx.fillStyle = lpGrad;
      ctx.fillRect(40, centerY, width - 80, height - centerY - 40);

      // Wavy Rete Pegs interdigitating downwards
      ctx.fillStyle = '#d67588';
      ctx.beginPath();
      ctx.moveTo(40, centerY - 80);
      for (let x = 40; x < width - 80; x += 35) {
        ctx.quadraticCurveTo(x + 15, centerY + 55, x + 35, centerY);
      }
      ctx.lineTo(width - 40, centerY - 140);
      ctx.lineTo(40, centerY - 140);
      ctx.closePath();
      ctx.fill();

      // Basal cell layer (dark hematoxylin purple nuclei)
      for (let x = 50; x < width - 70; x += 12) {
        ctx.fillStyle = '#4a2569';
        ctx.beginPath();
        const yOffset = Math.sin(x * 0.12) * 20;
        ctx.ellipse(x, centerY + yOffset + 15, 4.5, 7, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Spinous prickle cells
      for (let y = centerY - 110; y < centerY; y += 18) {
        for (let x = 55; x < width - 75; x += 22) {
          ctx.fillStyle = 'rgba(195, 75, 105, 0.7)';
          ctx.beginPath();
          ctx.ellipse(x + (Math.random() * 6), y + (Math.random() * 6), 5, 5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Keratinized / Parakeratinized superficial wave at top
      ctx.strokeStyle = '#e29578';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(40, centerY - 140);
      for (let x = 40; x < width - 80; x += 20) {
        ctx.lineTo(x, centerY - 140 + Math.sin(x * 0.05) * 5);
      }
      ctx.stroke();

      // If Dysplasia Overlay active: draw abnormal keratin pearl & pleomorphic nuclei
      if (showDysplasiaOverlay) {
        ctx.fillStyle = 'rgba(180, 20, 40, 0.85)';
        ctx.beginPath();
        ctx.arc(width * 0.45, centerY - 30, 28, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('Atypical Keratin Pearl', width * 0.45 - 55, centerY - 65);
      }

    } else if (organ.id === 'heart') {
      // Branching cardiac myocytes with intercalated discs
      for (let row = 0; row < 6; row++) {
        const y = 80 + row * 65;
        ctx.fillStyle = 'rgba(168, 45, 52, 0.8)';
        ctx.fillRect(50, y, width - 100, 42);

        // Intercalated step-ladder discs
        for (let x = 120; x < width - 100; x += 90) {
          ctx.strokeStyle = '#420b10';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + 20);
          ctx.lineTo(x + 10, y + 20);
          ctx.lineTo(x + 10, y + 42);
          ctx.stroke();
        }

        // Oval nuclei with perinuclear pale halo
        for (let x = 80; x < width - 100; x += 90) {
          ctx.fillStyle = 'rgba(255, 230, 215, 0.9)';
          ctx.beginPath();
          ctx.ellipse(x, y + 21, 14, 9, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#2b090c';
          ctx.beginPath();
          ctx.ellipse(x, y + 21, 8, 5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

    } else if (organ.id === 'brain') {
      // Purkinje Cell Arborization in Cerebellar Cortex
      // Molecular layer wash top
      ctx.fillStyle = 'rgba(225, 215, 240, 0.7)';
      ctx.fillRect(40, 40, width - 80, centerY - 40);

      // Granular layer bottom
      ctx.fillStyle = 'rgba(95, 60, 150, 0.85)';
      ctx.fillRect(40, centerY + 30, width - 80, height - centerY - 70);

      // Large Purkinje pyriform cell body
      ctx.fillStyle = '#4a2569';
      ctx.beginPath();
      ctx.arc(width * 0.5, centerY + 20, 22, 0, Math.PI * 2);
      ctx.fill();

      // Branching dendritic fan reaching into molecular layer
      ctx.strokeStyle = '#4a2569';
      ctx.lineWidth = 3.5;
      const drawBranch = (startX: number, startY: number, length: number, angle: number, depth: number) => {
        if (depth === 0) return;
        const endX = startX + Math.cos(angle) * length;
        const endY = startY + Math.sin(angle) * length;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        drawBranch(endX, endY, length * 0.72, angle - 0.45, depth - 1);
        drawBranch(endX, endY, length * 0.72, angle + 0.45, depth - 1);
      };
      drawBranch(width * 0.5, centerY - 2, 55, -Math.PI / 2, 5);

    } else {
      // General histological micro-structure watercolor field
      for (let i = 0; i < 35; i++) {
        const x = 70 + (i % 7) * 90;
        const y = 80 + Math.floor(i / 7) * 75;
        ctx.fillStyle = 'rgba(180, 85, 75, 0.35)';
        ctx.beginPath();
        ctx.arc(x, y, 28, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#2b1b17';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Vintage botanical plate border and plate label inscription
    ctx.strokeStyle = '#8c7853';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(20, 20, width - 40, height - 40);
    ctx.strokeRect(24, 24, width - 48, height - 48);

  }, [organ, zoomLevel, showDysplasiaOverlay]);

  // Download high-resolution plate
  const downloadPlate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `watercolour-plate-${organ.id}.png`;
    a.click();
  };

  return (
    <div className="bg-[#faf6ed] text-[#2c221a] rounded-2xl border border-[#d6c7b2] p-6 sm:p-8 shadow-xl font-serif">
      
      {/* Plate Header in Engraved Typographic Style */}
      <div className="border-b-2 border-[#8c7853]/40 pb-5 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8c7853] font-bold block mb-1">
            {plate.plateNumber}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#382216] tracking-tight">
            {plate.title}
          </h2>
          <p className="text-sm italic text-[#6e5847] mt-0.5">
            {plate.latinName}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Magnification Switcher */}
          <div className="bg-white/80 border border-[#8c7853]/30 rounded-xl p-1 flex items-center gap-1 text-xs font-sans font-bold">
            {(['40x', '200x', '600x'] as const).map((mag) => (
              <button
                key={mag}
                onClick={() => setZoomLevel(mag)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  zoomLevel === mag ? 'bg-[#087F8C] text-white shadow-xs' : 'text-[#6e5847] hover:bg-[#ebdcc9]'
                }`}
              >
                {mag}
              </button>
            ))}
          </div>

          {/* Toggle Dysplasia Lesion Simulation */}
          <button
            onClick={() => setShowDysplasiaOverlay(!showDysplasiaOverlay)}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-sans font-bold flex items-center gap-1.5 transition-all ${
              showDysplasiaOverlay 
                ? 'bg-rose-700 text-white border-rose-600 shadow-xs' 
                : 'bg-white/80 text-[#6e5847] border-[#8c7853]/30 hover:bg-[#ebdcc9]'
            }`}
          >
            <Microscope className="w-3.5 h-3.5" />
            <span>{showDysplasiaOverlay ? 'Dysplasia: Marked' : 'Show Pathology Marker'}</span>
          </button>

          {/* Download Watercolor Plate */}
          <button
            onClick={downloadPlate}
            className="p-2 bg-white/80 hover:bg-[#ebdcc9] text-[#6e5847] border border-[#8c7853]/30 rounded-xl transition-colors"
            title="Download high-resolution watercolor plate"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Watercolor Canvas & Cellular Layer Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Fine Art Watercolor Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md border-4 border-[#e8dccb] bg-[#faf6ed]">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />

            {/* Antique Plate Stamp in Corner */}
            <div className="absolute bottom-4 right-4 bg-[#faf6ed]/90 border border-[#8c7853]/40 px-3 py-1.5 rounded text-[10px] text-[#5c4434] tracking-widest font-mono uppercase shadow-xs">
              Stain: {plate.stainType.split('(')[0]}
            </div>
          </div>

          {/* Plate Historical Note */}
          <p className="text-xs text-[#705e4f] italic text-center mt-3 max-w-lg leading-relaxed">
            "{plate.historicalContext}"
          </p>
        </div>

        {/* Right: Histological Strata Explorer & Cytology Notes */}
        <div className="lg:col-span-5 flex flex-col gap-4 font-sans">
          
          <div className="bg-white/90 rounded-xl p-4 border border-[#d6c7b2] shadow-xs">
            <h3 className="font-serif font-black text-base text-[#382216] flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-[#087F8C]" />
              Tissue Architecture & Strata
            </h3>
            <p className="text-xs text-[#6e5847] mb-3 leading-relaxed">
              {plate.description}
            </p>

            <div className="flex flex-col gap-2">
              {plate.layers.map((layer, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedLayer(layer)}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    selectedLayer?.name === layer.name
                      ? 'bg-[#f4ebe1] border-[#8c7853] shadow-xs'
                      : 'bg-white hover:bg-[#faf6ed] border-[#e8dccb]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0" 
                      style={{ backgroundColor: layer.colorHex }} 
                    />
                    <span className="font-bold text-xs text-[#2c221a]">
                      {layer.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6e5847] mt-1 pl-5">
                    {layer.description}
                  </p>
                  <p className="text-[10px] text-[#8c7853] italic pl-5 mt-0.5">
                    Microscopy: {layer.cellularFeatures}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Normal Cytology vs Dysplasia Diagnostic Highlights */}
          <div className="bg-white/90 rounded-xl p-4 border border-[#d6c7b2] shadow-xs">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#382216] mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Normal Cytological Hallmarks
            </h4>
            <ul className="text-xs text-[#524133] space-y-1 mb-4 list-disc pl-4">
              {plate.cytologyHighlights.map((hl, i) => (
                <li key={i}>{hl}</li>
              ))}
            </ul>

            <h4 className="font-bold text-xs uppercase tracking-wider text-[#9e2a2b] mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
              Oncological Dysplasia Markers
            </h4>
            <ul className="text-xs text-rose-900 space-y-1 list-disc pl-4">
              {plate.dysplasiaMarkers.map((dm, i) => (
                <li key={i}>{dm}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
