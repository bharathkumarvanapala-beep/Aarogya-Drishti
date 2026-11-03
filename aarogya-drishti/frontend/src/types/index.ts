export type Language = 'en' | 'te' | 'hi';

export type PageId =
  | 'home'
  | 'surgeries'
  | 'medicines'
  | 'lab-tests'
  | 'video-consult'
  | 'how-it-works'
  | 'screening'
  | 'education'
  | 'warning-signs'
  | 'find-specialist'
  | 'anatomy-atlas'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'contact'
  | 'signin'
  | 'register'
  | 'patient-dashboard'
  | 'clinician-dashboard'
  | 'admin-dashboard';

export type UserRole = 'patient' | 'clinician' | 'admin';

export type ResultCategory = 'A' | 'B' | 'C' | 'D';

export type MouthZoneId =
  | 'full_open_mouth'
  | 'left_inner_cheek'
  | 'right_inner_cheek'
  | 'top_of_tongue'
  | 'tongue_lateral_sides'
  | 'underneath_tongue'
  | 'upper_gums'
  | 'lower_gums'
  | 'suspicious_area';

export interface MouthZonePhoto {
  zoneId: MouthZoneId;
  title: string;
  instructions: string;
  imageUrl?: string;
  capturedAt?: string;
  qualityPassed: boolean;
  blurScore?: number;
  notes?: string;
}

export interface PatientInfo {
  patientReferenceId: string;
  ageRange: string;
  age?: number | string;
  reportLanguage: Language;
  symptoms: string[];
  durationOfSymptoms: string;
  affectedMouthArea?: string[];
  painSeverity?: number;
  tobaccoUse?: 'non_user' | 'cigarettes_bidi' | 'betel_nut_gutkha' | 'former_user';
  medicalHistory?: string[];
  previousEvaluation: 'none' | 'dentist' | 'general_physician' | 'specialist';
  consentAcknowledged: boolean;
}

export interface ImageQualityCheck {
  lightingOk: boolean;
  blurOk: boolean;
  coverageOk: boolean;
  glareOk: boolean;
  formatOk: boolean;
  sizeOk: boolean;
  overallPassed: boolean;
  reasons: string[];
}

export interface AIVisualObservations {
  whitePatches: string;
  redPatches: string;
  ulcerLesions: string;
  visibleSwelling: string;
  surfaceChanges: string;
  possibleIrritation: string;
  imageQualityAssessment: string;
  areasNotAdequatelyPhotographed: string[];
}

export interface AIScreeningResult {
  screeningRef: string;
  timestamp: string;
  modelVersion: string;
  isDemonstrationMode: boolean;
  category: ResultCategory;
  categoryTitle: string;
  categoryDescription: string;
  findings: string[];
  uncertaintyEstimate?: string;
  imageQualityScore?: string;
  observations?: AIVisualObservations;
  limitations: string[];
  recommendedNextSteps: string[];
  clinicalReviewStatus: 'Pending Review' | 'Reviewed' | 'Escalated';
  clinicianNotes?: string;
  reviewedBy?: string;
  biopsyOrdered?: boolean;
  confirmedStage?: string;
}

export interface DoctorSpecialist {
  id: string;
  name: string;
  title: string;
  qualification: string;
  hospital: string;
  city: string;
  state: string;
  experienceYears: number;
  speciality: string;
  languages: string[];
  consultationType: 'In-person' | 'Tele-consultation' | 'Both';
  phone: string;
}

export interface ScreeningRecord {
  id: string;
  patientRef: string;
  date: string;
  category: ResultCategory;
  symptomSummary: string;
  imageThumbnail: string;
  clinicalStatus: 'Pending Review' | 'Reviewed' | 'Escalated' | 'Biopsy Scheduled';
  reviewedBy?: string;
  notes?: string;
  urgency: 'Routine' | 'Moderate' | 'Urgent' | 'Indeterminate';
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  ipAddress: string;
  status: 'SUCCESS' | 'FLAGGED' | 'VERIFIED';
}
