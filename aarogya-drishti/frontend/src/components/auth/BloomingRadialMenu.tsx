import React, { useState } from 'react';
import { PageId } from '../../types';
import {
  Home,
  RotateCw,
  ShieldCheck,
  Search,
  Video,
  FlaskConical,
  Plus,
  X,
  Compass
} from 'lucide-react';

interface BloomingRadialMenuProps {
  onNavigate: (page: PageId) => void;
}

export const BloomingRadialMenu: React.FC<BloomingRadialMenuProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuItems = [
    { id: 'home' as PageId, label: 'Home', icon: <Home className="w-4 h-4 text-white" />, bg: '#087F8C' },
    { id: 'anatomy-atlas' as PageId, label: '3D Atlas', icon: <RotateCw className="w-4 h-4 text-white" />, bg: '#d97706' },
    { id: 'screening' as PageId, label: 'AI Triage', icon: <ShieldCheck className="w-4 h-4 text-white" />, bg: '#10b981' },
    { id: 'find-specialist' as PageId, label: 'Doctors', icon: <Search className="w-4 h-4 text-white" />, bg: '#3b82f6' },
    { id: 'video-consult' as PageId, label: 'Consult', icon: <Video className="w-4 h-4 text-white" />, bg: '#8b5cf6' },
    { id: 'lab-tests' as PageId, label: 'Labs', icon: <FlaskConical className="w-4 h-4 text-white" />, bg: '#ec4899' },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center select-none font-sans">

      {/* Blooming Radial Container matching the user's code snippet */}
      <div className={`blooming-nav ${isOpen ? 'active' : ''} flex items-center justify-center`}>

        {/* Radiating Blooming Items */}
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => {
              onNavigate(item.id);
              setIsOpen(false);
            }}
            style={{ backgroundColor: item.bg }}
            className={`blooming-item text-white cursor-pointer hover:scale-110 active:scale-95 transition-transform ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0 scale-50'
              }`}
            title={item.label}
          >
            {item.icon}
          </button>
        ))}

        {/* Center Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-30 ${isOpen
              ? 'bg-[#18313B] text-white rotate-45 scale-95 ring-4 ring-amber-400'
              : 'bg-[#FFD000] text-[#18313B] hover:scale-105 active:scale-95 ring-4 ring-[#18313B]/20'
            }`}
          aria-label="Toggle blooming navigation menu"
          title="Blooming Navigation Wheel (as seen in reel)"
        >
          <Plus className="w-6 h-6 stroke-[3]" />
        </button>

      </div>

      <span className="text-[10px] font-black uppercase tracking-wider text-[#647681] mt-2 block">
        {isOpen ? 'Tap to Close Menu' : 'Blooming Quick Nav'}
      </span>
    </div>
  );
};
