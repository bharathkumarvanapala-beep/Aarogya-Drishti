import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Grid, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Lock, 
  Languages, 
  Terminal, 
  TrendingUp, 
  Layers, 
  Share2, 
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { PageId } from '../types';

interface PresentationDeckPageProps {
  onNavigate: (page: PageId) => void;
}

interface SlideItem {
  id: number;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  category: string;
  content: React.ReactNode;
}

export const PresentationDeckPage: React.FC<PresentationDeckPageProps> = ({ onNavigate }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'slide' | 'grid'>('slide');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keyboard navigation for presentation mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'slide') return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Home') {
        setCurrentSlideIndex(0);
      } else if (e.key === 'End') {
        setCurrentSlideIndex(slides.length - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const slides: SlideItem[] = [
    // Slide 1: Title
    {
      id: 1,
      badge: 'Introduction',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
      category: 'Brand & Vision',
      title: 'AAROGYA DRISHTI',
      subtitle: 'ఆరోగ్య దృష్టి  |  आरोग्य दृष्टि',
      content: (
        <div className="flex flex-col items-center justify-center text-center py-6 sm:py-12 space-y-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#087F8C] text-white flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <div className="space-y-2 max-w-2xl px-2">
            <h3 className="text-xl sm:text-3xl font-black text-[#18313B] tracking-tight font-heading">
              AI-Assisted Digital Oral Screening, Triage & Connected Healthcare Platform
            </h3>
            <p className="text-base sm:text-lg italic text-[#087F8C] font-semibold">
              "Early Detection. Informed Decisions. Better Oral Health."
            </p>
          </div>
          <div className="w-full max-w-xl p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-wrap justify-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
            <span className="px-3 py-1 bg-slate-100 rounded-md">⚛️ React 18 + Vite</span>
            <span className="px-3 py-1 bg-slate-100 rounded-md">🐍 Python FastAPI</span>
            <span className="px-3 py-1 bg-slate-100 rounded-md">🧠 PyTorch / ONNX</span>
            <span className="px-3 py-1 bg-slate-100 rounded-md">🛡️ DPDP Act 2023 Compliant</span>
          </div>
        </div>
      )
    },

    // Slide 2: Problem Statement
    {
      id: 2,
      badge: 'Public Health Problem',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      category: 'The Challenge & Solution',
      title: 'Executive Summary & Problem Statement',
      subtitle: 'Addressing the critical oral abnormality diagnostic gap in India',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 py-2 sm:py-6">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-rose-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-base sm:text-lg">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h4>The Healthcare Crisis</h4>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>1/3 Global Burden:</strong> India accounts for nearly one-third of the global oral cancer incidence.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>70%+ Late Presentation:</strong> Over 70% of cases are diagnosed at Stage III or IV, drastically reducing survival.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Severe Rural Deficit:</strong> Critical shortage of oral oncologists and biopsy infrastructure in agency and community clinics.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-teal-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-teal-700 font-bold text-base sm:text-lg">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <h4>The Aarogya Drishti Solution</h4>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span><strong>Standardized Digital Triage:</strong> Photographic preliminary screening with calibrated confidence tiers (A, B, C, D).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span><strong>Clinician Decision Support:</strong> Review portals for dentists with biopsy tracking and cryptographically signed PDF reports.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span><strong>Connected Care Pathways:</strong> Direct linkage to doctor appointments, video consultations, and diagnostic tests.</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 3: Objectives & Vision
    {
      id: 3,
      badge: 'Strategic Vision',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
      category: 'Strategic Objectives',
      title: 'Strategic Objectives & Impact Metrics',
      subtitle: 'Engineering accessible, privacy-first preventative oncology triage',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 sm:py-4">
          {[
            { num: '01', title: 'Early Abnormality Detection', desc: 'Screen suspicious mucosal lesions within 60 seconds before progression into malignancy.' },
            { num: '02', title: 'Zero Delay Referral Linkage', desc: 'Direct digital referral handoffs from primary rural clinics to regional cancer centers (RCCs).' },
            { num: '03', title: 'Multilingual Inclusivity', desc: 'Complete localization in Telugu, Hindi, and English with culturally sensitive terms.' },
            { num: '04', title: 'DPDP 2023 Compliant Vault', desc: 'Zero public image URLs with encrypted object storage conforming to Indian data privacy laws.' }
          ].map((item) => (
            <div key={item.num} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
              <span className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 font-black text-sm flex items-center justify-center shrink-0 border border-sky-200">
                {item.num}
              </span>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-slate-800">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },

    // Slide 4: 12-Page Healthcare Ecosystem
    {
      id: 4,
      badge: 'Platform Modules',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      category: 'Ecosystem & Features',
      title: 'Comprehensive 12-Page Healthcare Ecosystem',
      subtitle: 'Complete end-to-end oral healthcare triage, diagnostics, and consultation',
      content: (
        <div className="space-y-4 py-2 sm:py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'AI Screening', desc: 'Guided camera intake & abnormality scoring', icon: Activity, page: 'screening' },
              { name: 'Find Specialists', desc: 'Directory of verified oncologists & MDS', icon: ShieldCheck, page: 'find-specialist' },
              { name: 'Video Consult', desc: 'Instant 60-sec tele-consultation', icon: Smartphone, page: 'video-consult' },
              { name: 'Surgeries', desc: 'Biopsy excision & reconstructive care', icon: Layers, page: 'surgeries' },
              { name: 'Lab Tests', desc: 'Histopathology and biopsy routing', icon: Cpu, page: 'lab-tests' },
              { name: '3D Anatomy Atlas', desc: 'Interactive 9-organ oral mapping', icon: Sparkles, page: 'anatomy-atlas' }
            ].map((m) => {
              const Icon = m.icon;
              return (
                <div 
                  key={m.name} 
                  onClick={() => onNavigate(m.page as PageId)}
                  className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-[#087F8C] shadow-xs cursor-pointer transition-all group flex flex-col justify-between"
                >
                  <Icon className="w-5 h-5 text-[#087F8C] group-hover:scale-110 transition-transform mb-2" />
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#087F8C]">{m.name}</h5>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">{m.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-600">
            <strong>Dedicated Portals:</strong> Patient Vault | Clinician Biopsy Reviewer | Public Health Administration Console
          </div>
        </div>
      )
    },

    // Slide 5: Standardized 6-Step Workflow
    {
      id: 5,
      badge: 'Clinical Protocol',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      category: 'Screening Workflow',
      title: 'The 6-Step Standardized Screening Workflow',
      subtitle: 'From patient intake to cryptographically signed clinician documentation',
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 py-2 sm:py-6">
          {[
            { step: 'Step 1', title: 'Intake & Consent', desc: 'Non-identifying data, symptom duration, tobacco use & explicit consent.' },
            { step: 'Step 2', title: 'Guided Capture', desc: 'Pre-flight focal sharpness, lighting & mucosal coverage checks.' },
            { step: 'Step 3', title: 'AI Inference', desc: 'Quarantined deep learning model evaluates mucosal feature vectors.' },
            { step: 'Step 4', title: 'Standard Tiers', desc: 'Calibrated categorization into Tiers A, B, C, or D.' },
            { step: 'Step 5', title: 'Clinician Review', desc: 'Dentist palpation notes, histopathology status, and staging records.' },
            { step: 'Step 6', title: 'Signed Report', desc: 'Cryptographically signed clinical PDF report with unique screening ID.' }
          ].map((st) => (
            <div key={st.step} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="inline-block px-2 py-0.5 bg-[#087F8C] text-white font-bold text-[10px] rounded-md mb-2">
                  {st.step}
                </span>
                <h5 className="font-bold text-xs sm:text-sm text-slate-800">{st.title}</h5>
                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },

    // Slide 6: Triage Categories
    {
      id: 6,
      badge: 'Classification Matrix',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      category: 'Triage Categories',
      title: 'Standardized Triage Classification (Categories A - D)',
      subtitle: 'Calibrated clinical risk pathways and recommended patient follow-ups',
      content: (
        <div className="space-y-3 py-2 sm:py-4">
          {[
            {
              tier: 'A',
              color: 'bg-emerald-600 text-white',
              border: 'border-emerald-200',
              title: 'Category A: Low Risk / Healthy Mucosa',
              desc: 'No suspicious feature detected in the submitted image. Recommended action: Standard 6-month preventive dental checkup and routine monthly oral self-examination.'
            },
            {
              tier: 'B',
              color: 'bg-sky-600 text-white',
              border: 'border-sky-200',
              title: 'Category B: Visible Abnormality Detected',
              desc: 'Benign-appearing mucosal feature detected (e.g. aphthous ulcer, traumatic keratosis). Recommended action: 14-day monitoring; seek clinical review if lesion persists.'
            },
            {
              tier: 'C',
              color: 'bg-amber-500 text-white',
              border: 'border-amber-200',
              title: 'Category C: Image Inconclusive',
              desc: 'Image quality insufficient (excessive blur, motion artifact, glare, or unexposed mucosa). Recommended action: Repeat photo capture with guided lighting.'
            },
            {
              tier: 'D',
              color: 'bg-rose-600 text-white',
              border: 'border-rose-200',
              title: 'Category D: Urgent Clinical Review Indicated',
              desc: 'High suspicion features (erythroplakia, non-homogeneous leukoplakia, indurated ulcer > 14 days). Recommended action: Immediate specialist referral & tissue biopsy.'
            }
          ].map((cat) => (
            <div key={cat.tier} className={`bg-white p-3.5 sm:p-4 rounded-xl border ${cat.border} shadow-xs flex items-start gap-3 sm:gap-4`}>
              <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl ${cat.color} font-black text-lg sm:text-xl flex items-center justify-center shrink-0`}>
                {cat.tier}
              </div>
              <div>
                <h5 className="font-bold text-xs sm:text-base text-slate-800">{cat.title}</h5>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },

    // Slide 7: System Architecture
    {
      id: 7,
      badge: 'Technology Topology',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      category: 'System Architecture',
      title: 'Decoupled Topology & Technology Stack',
      subtitle: 'High-availability microservices architecture with isolated inference API',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 sm:py-6">
          {[
            {
              tier: 'Frontend Web Tier',
              port: 'Port: 5173',
              tech: 'React 18 + Vite + Tailwind CSS',
              items: ['12 fully responsive pages', 'Multilingual i18n switcher', 'Client-side photo quality pre-flight checks', 'Mobile touch & desktop support']
            },
            {
              tier: 'Backend API Gateway',
              port: 'Port: 8000',
              tech: 'Python + FastAPI / SQLite',
              items: ['Role-Based Access Control (RBAC)', 'Audit logging & rate limiting', 'Cryptographically signed PDF reports', 'Resilient offline fallback API']
            },
            {
              tier: 'Quarantined AI Engine',
              port: 'Port: 8001',
              tech: 'PyTorch / ONNX Runtime Microservice',
              items: ['Air-gapped inference API', 'Uncertainty calibration (A-D tiers)', 'Independent model audit trail', 'Sub-second inference turnaround']
            }
          ].map((block) => (
            <div key={block.tier} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm sm:text-base text-slate-800">{block.tier}</h5>
                  <span className="px-2 py-0.5 bg-slate-100 text-[#087F8C] font-mono text-[11px] font-bold rounded">
                    {block.port}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#199FD9] mt-1">{block.tech}</p>
                <ul className="mt-3 space-y-2 text-xs text-slate-600">
                  {block.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#087F8C] font-bold">•</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )
    },

    // Slide 8: Privacy & DPDP Compliance
    {
      id: 8,
      badge: 'Data Protection',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      category: 'Security & Compliance',
      title: 'Privacy by Design & DPDP Act 2023 Compliance',
      subtitle: 'Rigorous compliance with Indias DPDP Act and DISHA health guidelines',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 sm:py-6">
          {[
            {
              title: 'Zero Public Image Exposure',
              desc: 'Oral photographs are strictly inaccessible via public static URLs. Access is governed via time-limited, signed cryptographic tokens only for verified clinicians.'
            },
            {
              title: 'Pseudonymous Patient IDs',
              desc: 'Every screening generates an anonymous reference ID (AD-YYYY-XXXXXX). Personal demographic data is strictly segregated from photographic vaults.'
            },
            {
              title: 'AES-256 Encryption at Rest & In-Flight',
              desc: 'TLS 1.3 encryption across all network calls. Data encrypted at rest using AES-256 within Indian sovereign cloud servers (ap-south-1 Mumbai region).'
            },
            {
              title: 'Consent Logging & Right to Erasure',
              desc: 'Granular consent logging with timestamped audit trails. Patients retain full DPDP 2023 statutory rights to data correction, withdrawal, and permanent erasure.'
            }
          ].map((sec) => (
            <div key={sec.title} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
              <Lock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs sm:text-base text-slate-800">{sec.title}</h5>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">{sec.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },

    // Slide 9: Multilingual Inclusivity
    {
      id: 9,
      badge: 'Localization',
      badgeColor: 'bg-pink-100 text-pink-800 border-pink-300',
      category: 'Multilingual Inclusivity',
      title: 'Multilingual Inclusivity & Regional Accessibility',
      subtitle: 'Native linguistic support across the primary spoken languages of India',
      content: (
        <div className="space-y-3.5 py-2 sm:py-6">
          {[
            {
              lang: 'English',
              sample: 'Early Detection. Informed Decisions. Better Oral Health.',
              desc: 'Universal terminology for national oncology and tertiary hospital networks across India.'
            },
            {
              lang: 'Telugu (తెలుగు)',
              sample: 'ముందస్తు గుర్తింపు. సరైన నిర్ణయం. మెరుగైన నోటి ఆరోగ్యం.',
              desc: 'Tailored for Andhra Pradesh & Telangana public health networks and Agency rural outreach.'
            },
            {
              lang: 'Hindi (हिन्दी)',
              sample: 'शीघ्र पहचान। सही निर्णय। बेहतर मौखिक स्वास्थ्य।',
              desc: 'National language coverage for community health centres across northern & central states.'
            }
          ].map((l) => (
            <div key={l.lang} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6">
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-[#199FD9] font-bold text-xs rounded-full border border-blue-200">
                  {l.lang}
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-800">{l.sample}</p>
              </div>
              <p className="text-xs text-slate-500 max-w-sm sm:text-right">{l.desc}</p>
            </div>
          ))}
        </div>
      )
    },

    // Slide 10: Deployment Setup & 1-Click Startup
    {
      id: 10,
      badge: 'Operations',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      category: 'Deployment Guide',
      title: 'Deployment Setup & 1-Click Startup Guide',
      subtitle: 'Isolated ports and single-click automated desktop launcher',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 py-2 sm:py-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#087F8C] font-bold text-base">
              <Terminal className="w-5 h-5 shrink-0" />
              <h4>1-Click Automated Launcher</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Created <strong>start-aarogya.bat</strong> in the project root. Double-clicking it automatically navigates to the frontend folder, starts Vite, and launches the browser!
            </p>
            <div className="p-3 bg-slate-900 rounded-xl text-teal-400 font-mono text-xs overflow-x-auto">
              <code>start-aarogya.bat</code>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
              <Cpu className="w-5 h-5 shrink-0" />
              <h4>Port Allocation & Isolation</h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li><strong>Frontend:</strong> <code>http://localhost:5173</code> (Default port)</li>
              <li><strong>Backend API:</strong> <code>http://localhost:8000/api/v1</code></li>
              <li><strong>AI Service:</strong> <code>http://localhost:8001/api/v1</code></li>
              <li><strong>Wi-Fi Mobile Testing:</strong> <code>http://192.168.1.41:5173</code></li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 11: Roadmap & Future Scale
    {
      id: 11,
      badge: 'Vision 2026+',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      category: 'Future Roadmap',
      title: 'Strategic Roadmap & Future Impact',
      subtitle: 'Scaling connected oral healthcare across rural and urban India',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 sm:py-6">
          {[
            {
              phase: 'Phase 1 (Current)',
              title: 'Web Platform & Triage',
              desc: '12-page web portal, Category A-D triage engine, multilingual support, and clinician review.'
            },
            {
              phase: 'Phase 2 (Upcoming)',
              title: 'Offline-First Mobile App',
              desc: 'Android APK with on-device ONNX inference for offline screening in tribal and rural areas.'
            },
            {
              phase: 'Phase 3 (Scale)',
              title: 'ABDM & EHR Integration',
              desc: 'Linkage with Ayushman Bharat Digital Mission (ABDM) and automated government hospital referrals.'
            }
          ].map((rm) => (
            <div key={rm.phase} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
                {rm.phase}
              </span>
              <h5 className="font-bold text-sm sm:text-base text-slate-800">{rm.title}</h5>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{rm.desc}</p>
            </div>
          ))}
        </div>
      )
    }
  ];

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="min-h-screen bg-[#F5FAFA] font-sans pb-16">
      {/* Top Controls Bar */}
      <div className="sticky top-18 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Presentation Branding & Status */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#18313B]">
                Aarogya Drishti Presentation Deck
              </h2>
              <p className="text-[11px] text-slate-500">
                Slide {currentSlideIndex + 1} of {slides.length} • Fully Responsive Web Deck
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* View Mode Switcher */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setViewMode('slide')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  viewMode === 'slide' ? 'bg-white shadow-xs text-[#087F8C]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Slide View
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-[#087F8C]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>All Slides</span>
              </button>
            </div>

            {/* Download PPTX File */}
            <a
              href="/Aarogya_Drishti_Presentation.pptx"
              download="Aarogya_Drishti_Presentation.pptx"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#087F8C] hover:bg-[#075B66] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download .PPTX</span>
              <span className="sm:hidden">PPTX</span>
            </a>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide / Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {viewMode === 'slide' ? (
          /* Single Slide View */
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 min-h-[500px] flex flex-col justify-between transition-all">
              {/* Slide Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${currentSlide.badgeColor}`}>
                    {currentSlide.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {currentSlideIndex + 1} / {slides.length}
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl font-black text-[#18313B] font-heading">
                  {currentSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* Slide Body */}
              <div className="flex-1 my-4">
                {currentSlide.content}
              </div>

              {/* Slide Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Aarogya Drishti • Confidential & Medical Triage Spec</span>
                <span className="hidden sm:inline">Use Arrow keys or buttons below to navigate</span>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between gap-4 py-2">
              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))}
                disabled={currentSlideIndex === 0}
                className="px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl font-bold text-xs text-slate-700 shadow-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Slide</span>
              </button>

              {/* Dots Progress */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-none py-1">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentSlideIndex === idx ? 'w-6 bg-[#087F8C]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    title={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1))}
                disabled={currentSlideIndex === slides.length - 1}
                className="px-4 py-2.5 bg-[#087F8C] hover:bg-[#075B66] text-white rounded-xl font-bold text-xs shadow-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all"
              >
                <span>Next Slide</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* All Slides Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                onClick={() => {
                  setCurrentSlideIndex(idx);
                  setViewMode('slide');
                }}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#087F8C] shadow-xs hover:shadow-md p-5 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${slide.badgeColor}`}>
                      {slide.badge}
                    </span>
                    <span className="font-bold text-slate-400">Slide {slide.id}</span>
                  </div>
                  <h4 className="font-bold text-base text-slate-800 group-hover:text-[#087F8C] transition-colors">
                    {slide.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {slide.subtitle}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#087F8C]">
                  <span>Open Slide</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

