import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Moon, Zap, ShieldCheck } from 'lucide-react';

interface CreativeFlashlightHeroProps {
  isPasswordFocused: boolean;
  isEmailFocused: boolean;
  showPasswordText: boolean;
  theme: 'sunny' | 'clinical';
  onToggleTheme: () => void;
}

export const CreativeFlashlightHero: React.FC<CreativeFlashlightHeroProps> = ({
  isPasswordFocused,
  isEmailFocused,
  showPasswordText,
  theme,
  onToggleTheme
}) => {
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Soft cursor follow for character eyes & torch angle
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMouseOffset({ x, y });
  };

  const isIlluminating = isPasswordFocused || isEmailFocused || showPasswordText;

  // Colorful sparks emitting from the flashlight/torch matching the reel
  const sparks = [
    { tx: '70px', ty: '-60px', rot: '35deg', color: '#3b82f6', delay: '0s', size: '12px' },
    { tx: '95px', ty: '-40px', rot: '65deg', color: '#ef4444', delay: '0.2s', size: '16px' },
    { tx: '80px', ty: '-10px', rot: '90deg', color: '#10b981', delay: '0.4s', size: '14px' },
    { tx: '60px', ty: '-85px', rot: '15deg', color: '#8b5cf6', delay: '0.15s', size: '10px' },
    { tx: '110px', ty: '-70px', rot: '50deg', color: '#f59e0b', delay: '0.35s', size: '18px' },
    { tx: '85px', ty: '15px', rot: '115deg', color: '#06b6d4', delay: '0.5s', size: '13px' },
    { tx: '45px', ty: '-100px', rot: '-5deg', color: '#ec4899', delay: '0.25s', size: '11px' },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden transition-colors duration-500 flex flex-col items-center justify-center select-none shadow-md border ${theme === 'sunny'
          ? 'bg-[#FFD000] border-[#ECC000]'
          : 'bg-[#18242b] border-[#223540]'
        }`}
    >
      {/* Decorative Title Banner */}
      <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${theme === 'sunny' ? 'bg-[#18313B]' : 'bg-[#10b981]'} animate-ping`} />
          <span className={`font-serif text-xs font-black tracking-widest uppercase ${theme === 'sunny' ? 'text-[#18313B]' : 'text-amber-200'
            }`}>
            Creative Login • Interactive Beam
          </span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className={`p-1.5 rounded-full transition-colors flex items-center gap-1.5 text-xs font-bold px-3 shadow-xs ${theme === 'sunny'
              ? 'bg-[#18313B] text-white hover:bg-black'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
          title="Toggle between Sunny Yellow & Clinical Navy Studio"
        >
          {theme === 'sunny' ? <Moon className="w-3.5 h-3.5 text-amber-300" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
          <span>{theme === 'sunny' ? 'Dark Glow' : 'Sunny Reel'}</span>
        </button>
      </div>

      {/* Dynamic Ambient Glow Behind Torch */}
      {isIlluminating && (
        <div
          className="absolute pointer-events-none transition-all duration-500 rounded-full blur-3xl opacity-70"
          style={{
            width: '280px',
            height: '280px',
            top: '40px',
            right: '25%',
            background: theme === 'sunny'
              ? 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,214,10,0.4) 60%, transparent 100%)'
              : 'radial-gradient(circle, rgba(16,185,129,0.7) 0%, rgba(8,127,140,0.3) 60%, transparent 100%)'
          }}
        />
      )}

      {/* Main Vector Animated Character Illustration (Boy with Torch/Lamp) */}
      <div className="relative animate-character z-10 scale-110 sm:scale-125">

        {/* Character SVG Body */}
        <svg
          width="180"
          height="180"
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Character Head */}
          <ellipse cx="65" cy="40" rx="18" ry="19" fill="#F7D3A6" />

          {/* Dark Messy Hair */}
          <path
            d="M48 38C47 24 57 18 68 18C79 18 87 23 85 36C82 28 75 22 66 23C58 24 52 30 48 38Z"
            fill="#2B2118"
          />
          <path
            d="M46 36C45 42 46 48 48 50C48 46 48 40 50 36C48 36 47 36 46 36Z"
            fill="#2B2118"
          />

          {/* Eye with pupil tracking */}
          <circle cx={72 + mouseOffset.x * 0.15} cy={38 + mouseOffset.y * 0.15} r="3" fill="#1C1814" />
          <circle cx={73 + mouseOffset.x * 0.15} cy={37 + mouseOffset.y * 0.15} r="1" fill="#FFFFFF" />

          {/* Cute Smile / Focus Expression */}
          <path
            d={isPasswordFocused ? "M69 46Q72 50 76 46" : "M68 46Q71 49 75 46"}
            stroke="#995E35"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Ear */}
          <ellipse cx="50" cy="42" rx="3.5" ry="5" fill="#E8B88B" />

          {/* Neck */}
          <rect x="62" y="56" width="9" height="7" fill="#F7D3A6" />

          {/* White T-shirt Torso */}
          <path
            d="M52 63C52 63 60 62 67 62C74 62 82 63 82 63L85 89H49L52 63Z"
            fill="#FFFFFF"
            stroke="#DCD2C6"
            strokeWidth="1.5"
          />
          <path d="M60 62C61 65 67 66 73 62" stroke="#DCD2C6" strokeWidth="1.5" fill="none" />

          {/* Left Arm by side */}
          <path d="M52 64L44 82L48 84L54 68" fill="#F7D3A6" />
          <path d="M50 63L45 74" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />

          {/* Dark Shorts */}
          <path d="M49 88H85L83 104H70L68 96L65 104H52L49 88Z" fill="#1F2937" />

          {/* Legs & White Socks / Shoes */}
          <rect x="54" y="104" width="7" height="15" fill="#F7D3A6" />
          <rect x="73" y="104" width="7" height="15" fill="#F7D3A6" />
          {/* Socks */}
          <rect x="54" y="115" width="7" height="5" fill="#FFFFFF" />
          <rect x="73" y="115" width="7" height="5" fill="#FFFFFF" />
          {/* Dark Shoes */}
          <ellipse cx="56" cy="122" rx="6" ry="3" fill="#111827" />
          <ellipse cx="78" cy="122" rx="6" ry="3" fill="#111827" />

          {/* Raised Right Arm holding the Torch / Projector Bucket */}
          {/* Arm sleeve */}
          <path d="M78 64L94 56L96 61L82 70" fill="#FFFFFF" />
          {/* Forearm angled up */}
          <path
            d="M93 57L108 42L113 46L98 62"
            fill="#F7D3A6"
            className="transition-transform duration-300 origin-[93px_57px]"
            style={{
              transform: isPasswordFocused ? 'rotate(-6deg)' : (isEmailFocused ? 'rotate(5deg)' : 'rotate(0deg)')
            }}
          />
          {/* Hand holding bucket/torch */}
          <circle cx="111" cy="42" r="5" fill="#F7D3A6" />

          {/* The Flashlight / Torch Barrel */}
          <g
            className="transition-transform duration-300 origin-[111px_42px]"
            style={{
              transform: isPasswordFocused ? 'rotate(-10deg)' : 'rotate(0deg)'
            }}
          >
            {/* Dark Metallic Cylinder Lamp */}
            <path
              d="M107 43L120 30L129 39L115 51L107 43Z"
              fill="#374151"
              stroke="#1F2937"
              strokeWidth="1.5"
            />
            {/* Lamp Head Rim */}
            <ellipse cx="125" cy="34" rx="7" ry="11" fill="#4B5563" transform="rotate(-40 125 34)" />
            {/* Golden Reflector Inside */}
            <ellipse cx="126" cy="33" rx="5" ry="8" fill="#FDE047" transform="rotate(-40 126 33)" />
          </g>

          {/* Conical Light Beam Spraying Outward to Upper Right */}
          {isIlluminating && (
            <polygon
              points="128,31 220,-20 240,45 132,41"
              fill="url(#torchBeamGradient)"
              opacity="0.8"
              className="animate-torch"
            />
          )}

          <defs>
            <linearGradient id="torchBeamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#FEF08A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dynamic Colorful Particle Sparks Bursting from Torch (As seen in the screenshot reel!) */}
        {isIlluminating && (
          <div className="absolute top-[28px] left-[132px] pointer-events-none">
            {sparks.map((spark, idx) => (
              <div
                key={idx}
                className="absolute animate-spark rounded-full shadow-md"
                style={{
                  width: spark.size,
                  height: spark.size,
                  backgroundColor: spark.color,
                  animationDelay: spark.delay,
                  // @ts-ignore
                  '--tx': spark.tx,
                  '--ty': spark.ty,
                  '--rot': spark.rot
                }}
              />
            ))}
          </div>
        )}

      </div>

      {/* Dynamic Status Text Caption under character */}
      <div className="mt-3 text-center z-10">
        <p className={`font-black text-sm tracking-wide ${theme === 'sunny' ? 'text-[#18313B]' : 'text-white'}`}>
          {isPasswordFocused
            ? '🔦 Beam Active! Illuminating Protected Field'
            : (isEmailFocused
              ? '✨ Targeting User Identity Verification'
              : 'Interactive Flashlight • Focus an input to illuminate')}
        </p>
        <p className={`text-[11px] font-medium mt-0.5 ${theme === 'sunny' ? 'text-[#475569]' : 'text-gray-300'}`}>
          Engineered beside the 3D Anatomical Atlas & AI screening platform
        </p>
      </div>

    </div>
  );
};
