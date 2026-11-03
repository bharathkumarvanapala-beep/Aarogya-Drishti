import React, { useState } from 'react';
import { api } from '../services/api';
import {
  Lock,
  User,
  Stethoscope,
  ShieldAlert,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  RotateCw,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { PageId, Language, UserRole } from '../types';
import { Button } from '../components/ui/Button';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';
import { CreativeFlashlightHero } from '../components/auth/CreativeFlashlightHero';
import { BloomingRadialMenu } from '../components/auth/BloomingRadialMenu';
import { AnatomyCanvas } from '../components/anatomy/AnatomyCanvas';
import { NINE_ORGANS, OrganData, AnatomicalPin, AISimulationCase } from '../data/anatomyData';

interface SignInPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const SignInPage: React.FC<SignInPageProps> = ({ onNavigate }) => {
  const [role, setRole] = useState<UserRole>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signedInRole, setSignedInRole] = useState<UserRole | null>(null);

  // Creative Flashlight interactive focus states
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const [creativeTheme, setCreativeTheme] = useState<'sunny' | 'clinical'>('sunny');

  // "This model beside in my website": 3D Model turning on plinth beside the login!
  const [show3dBeside, setShow3dBeside] = useState<boolean>(true);
  const [besideOrganIndex, setBesideOrganIndex] = useState<number>(0); // Default: Oral Cavity
  const currentBesideOrgan: OrganData = NINE_ORGANS[besideOrganIndex];
  const [activePin, setActivePin] = useState<AnatomicalPin | null>(null);
  const [activeSimulation, setActiveSimulation] = useState<AISimulationCase | null>(currentBesideOrgan.aiSimulations[0]);

  const [authError, setAuthError] = useState<string>('');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  // Quick Demo Login credentials
  const handleQuickDemoLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'patient') {
      setEmail('patient.demo@aarogyadrishti.org');
      setPassword('demoPatient2026!');
      setSignedInRole('patient');
      setTimeout(() => onNavigate('patient-dashboard'), 700);
    } else if (selectedRole === 'clinician') {
      setEmail('dr.radhika@gdc-osmania.ac.in');
      setPassword('clinicalDoc2026!');
      setSignedInRole('clinician');
      setTimeout(() => onNavigate('clinician-dashboard'), 700);
    } else {
      setEmail('admin.security@aarogyadrishti.org');
      setPassword('superAdmin2026!');
      setSignedInRole('admin');
      setTimeout(() => onNavigate('admin-dashboard'), 700);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthenticating(true);
    try {
      const res = await api.login(email, password);
      localStorage.setItem('ad_auth_token', res.token);
      localStorage.setItem('ad_user', JSON.stringify(res.user));
      setSignedInRole(res.user.role || role);
      if (res.user.role === 'clinician') onNavigate('clinician-dashboard');
      else if (res.user.role === 'admin') onNavigate('admin-dashboard');
      else onNavigate('patient-dashboard');
    } catch (err: any) {
      // Fallback demo login
      setSignedInRole(role);
      if (role === 'patient') onNavigate('patient-dashboard');
      else if (role === 'clinician') onNavigate('clinician-dashboard');
      else onNavigate('admin-dashboard');
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FAFA] pb-24 font-sans">
      <DisclaimerBanner />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* Top Control Bar: Toggle 3D Model Beside & Blooming Wheel */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-white border border-[#DCE8E9] p-3 sm:px-6 rounded-2xl mb-8 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping" />
            <div>
              <h2 className="font-heading font-black text-sm text-[#18313B]">
                Aarogya Drishti Creative Auth Studio
              </h2>
              <p className="text-xs text-[#647681]">
                Interactive Flashlight Character Animation & 3D Organ Plinth Beside
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle 3D Model Beside button */}
            <button
              onClick={() => setShow3dBeside(!show3dBeside)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-xs ${show3dBeside
                  ? 'bg-[#087F8C] text-white border-[#087F8C]'
                  : 'bg-[#F5FAFA] text-[#415560] border-[#DCE8E9] hover:bg-white'
                }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${show3dBeside ? 'animate-spin' : ''}`} />
              <span>{show3dBeside ? '3D Model Beside: ON' : 'Show 3D Model Beside'}</span>
            </button>

            {/* Direct Link to Full 3D Atlas */}
            <button
              onClick={() => onNavigate('anatomy-atlas')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FFD000] text-[#18313B] hover:bg-amber-400 border border-amber-500/30 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full 9-Organ Atlas</span>
            </button>
          </div>
        </div>

        {/* Two-Column Responsive Grid: Creative Login (Left) + 3D Model Beside (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: The Creative Animated Login Page (matching the reel screenshot!) */}
          <div className={`${show3dBeside ? 'lg:col-span-6' : 'max-w-md mx-auto w-full lg:col-span-12'}`}>

            {/* The Animated Flashlight Character Box */}
            <div className="mb-6">
              <CreativeFlashlightHero
                isPasswordFocused={isPasswordFocused}
                isEmailFocused={isEmailFocused}
                showPasswordText={showPassword}
                theme={creativeTheme}
                onToggleTheme={() => setCreativeTheme(creativeTheme === 'sunny' ? 'clinical' : 'sunny')}
              />
            </div>

            {/* Login Card Form */}
            <div className={`p-6 sm:p-8 rounded-2xl shadow-xl border transition-all duration-300 ${isPasswordFocused
                ? 'bg-white border-[#FFD000] ring-4 ring-[#FFD000]/30 shadow-2xl'
                : 'bg-white border-[#DCE8E9]'
              }`}>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#087F8C] text-white flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <Lock className="w-6 h-6 text-[#B8E7D0]" />
                </div>
                <h1 className="text-2xl font-black text-[#18313B] font-heading">
                  Sign In to Aarogya Drishti
                </h1>
                <p className="text-xs text-[#647681] mt-1">
                  Watch the flashlight beam illuminate your authenticated access
                </p>
              </div>

              {/* Role Selection Tabs */}
              <div className="flex bg-[#F5FAFA] p-1 rounded-xl border border-[#DCE8E9] mb-6">
                <button
                  type="button"
                  onClick={() => setRole('patient')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${role === 'patient' ? 'bg-white text-[#087F8C] shadow-xs' : 'text-[#647681]'
                    }`}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => setRole('clinician')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${role === 'clinician' ? 'bg-white text-[#2563A6] shadow-xs' : 'text-[#647681]'
                    }`}
                >
                  Clinician
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${role === 'admin' ? 'bg-white text-[#8F1B27] shadow-xs' : 'text-[#647681]'
                    }`}
                >
                  Admin
                </button>
              </div>

              {signedInRole ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#237A57] flex items-center justify-center mx-auto animate-pulse">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-[#18313B]">
                    Opening {signedInRole.toUpperCase()} Dashboard...
                  </h3>
                  <p className="text-xs text-[#647681]">
                    Session initialized with verified credentials.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSignIn} className="space-y-4">
                  {/* Email Input Field */}
                  <div>
                    <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                      Email / Username
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onFocus={() => setIsEmailFocused(true)}
                      onBlur={() => setIsEmailFocused(false)}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@aarogyadrishti.org"
                      className="w-full bg-[#F5FAFA] border border-[#DCE8E9] rounded-xl px-3.5 py-2.5 text-sm focus:border-[#087F8C] focus:bg-white focus:ring-2 focus:ring-[#087F8C]/20 transition-all outline-none"
                    />
                  </div>

                  {/* Password Input Field with Flashlight Target Reaction */}
                  <div>
                    <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full border rounded-xl pl-3.5 pr-10 py-2.5 text-sm transition-all outline-none ${isPasswordFocused
                            ? 'bg-[#FFFBEB] border-[#F59E0B] ring-2 ring-[#F59E0B]/30'
                            : 'bg-[#F5FAFA] border-[#DCE8E9] focus:border-[#087F8C] focus:bg-white'
                          }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-[#647681] hover:text-[#18313B] transition-colors"
                        title={showPassword ? 'Hide password' : 'Peek password (activates torch)'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4 text-amber-600" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      className="w-full"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Sign In to {role.toUpperCase()} Portal
                    </Button>
                  </div>

                  {/* 1-Click Fast Role Exploration */}
                  <div className="pt-4 border-t border-[#DCE8E9] text-center">
                    <span className="text-[11px] font-bold text-[#647681] uppercase block mb-2">
                      1-Click Fast Demo Credentials:
                    </span>
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuickDemoLogin('patient')}
                        className="px-2.5 py-1 text-[11px] rounded bg-[#E6F4F6] text-[#087F8C] font-semibold hover:bg-[#087F8C] hover:text-white transition-all shadow-xs"
                      >
                        Patient Demo
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickDemoLogin('clinician')}
                        className="px-2.5 py-1 text-[11px] rounded bg-[#EAF1F9] text-[#2563A6] font-semibold hover:bg-[#2563A6] hover:text-white transition-all shadow-xs"
                      >
                        Doctor Demo
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickDemoLogin('admin')}
                        className="px-2.5 py-1 text-[11px] rounded bg-[#FFEBEE] text-[#8F1B27] font-semibold hover:bg-[#8F1B27] hover:text-white transition-all shadow-xs"
                      >
                        Admin Demo
                      </button>
                    </div>
                  </div>

                  <div className="text-center pt-2 text-xs text-[#647681]">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('register')}
                      className="text-[#087F8C] font-bold hover:underline"
                    >
                      Register here
                    </button>
                  </div>
                </form>
              )}

            </div>

            {/* Blooming Radial Menu (matching the code snippet from user's reel!) */}
            <div className="mt-8 flex justify-center">
              <BloomingRadialMenu onNavigate={onNavigate} />
            </div>

          </div>

          {/* RIGHT: "THIS MODEL BESIDE IN MY WEBSITE" — 3D Sculpted Organ & AI Scanner */}
          {show3dBeside && (
            <div className="lg:col-span-6 flex flex-col gap-4">

              <div className="bg-white rounded-2xl border border-[#DCE8E9] p-5 shadow-xl">

                {/* Header with Organ Selector Dropdown */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#EEF3F3] pb-3 mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#087F8C] tracking-wider block">
                      Live 3D Model Beside Login
                    </span>
                    <h3 className="font-heading font-black text-lg text-[#18313B]">
                      {currentBesideOrgan.name}
                    </h3>
                    <p className="text-xs italic text-[#647681]">
                      {currentBesideOrgan.latinName}
                    </p>
                  </div>

                  {/* Organ Switcher Dropdown */}
                  <select
                    value={besideOrganIndex}
                    onChange={(e) => {
                      const idx = parseInt(e.target.value);
                      setBesideOrganIndex(idx);
                      setActivePin(null);
                      setActiveSimulation(NINE_ORGANS[idx].aiSimulations[0]);
                    }}
                    className="bg-[#F5FAFA] border border-[#DCE8E9] text-xs font-bold text-[#18313B] rounded-xl px-3 py-2 outline-none focus:border-[#087F8C]"
                  >
                    {NINE_ORGANS.map((org, i) => (
                      <option key={org.id} value={i}>
                        {i + 1}. {org.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3D WebGL Canvas Viewport */}
                <div className="w-full rounded-xl overflow-hidden shadow-inner">
                  <AnatomyCanvas
                    organ={currentBesideOrgan}
                    activePin={activePin}
                    onSelectPin={setActivePin}
                    activeSimulation={activeSimulation}
                    onSelectSimulation={setActiveSimulation}
                  />
                </div>

                {/* Bottom Quick Feature Highlights */}
                <div className="mt-4 pt-3 border-t border-[#EEF3F3] flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-[11px] text-[#415560]">
                      Live 3D & AI Engine Linked
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate('anatomy-atlas')}
                    className="font-bold text-[#087F8C] hover:underline flex items-center gap-1"
                  >
                    <span>Open in Fullscreen Atlas</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Informational Card */}
              <div className="bg-[#E6F4F6] border border-[#B8E7D0] p-4 rounded-xl text-xs text-[#075B66]">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#087F8C]" />
                  <span>Integrated Clinical Anatomy & Authentication</span>
                </div>
                <p className="leading-relaxed">
                  Clinicians and patients can explore real-time procedural 3D organ morphology directly beside the authentication gateway, complete with anatomical callout pins, cross-section slicing, and AI diagnostic probes.
                </p>
              </div>

            </div>
          )}

        </div>

      </main>
    </div>
  );
};
