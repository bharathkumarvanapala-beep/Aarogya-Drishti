export interface AnatomicalPin {
  id: string;
  number: number;
  label: string;
  latinName: string;
  position: [number, number, number]; // 3D local coordinate in model space
  description: string;
  bloodSupply: string;
  innervation: string;
  clinicalSignificance: string;
  oncologyFocus?: string;
  riskCategory?: 'A' | 'B' | 'C' | 'D';
}

export interface SectionSliceInfo {
  plane: 'sagittal' | 'coronal' | 'transverse';
  label: string;
  internalStructuresRevealed: string[];
  histologicalInsight: string;
}

export interface WatercolourLayer {
  name: string;
  colorHex: string;
  description: string;
  cellularFeatures: string;
}

export interface WatercolourPlateData {
  title: string;
  latinName: string;
  plateNumber: string;
  magnification: string;
  stainType: string;
  historicalContext: string;
  tissueType: string;
  description: string;
  layers: WatercolourLayer[];
  cytologyHighlights: string[];
  dysplasiaMarkers: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  clinicalScenario: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  clinicalPearl: string;
}

export interface AISimulationCase {
  id: string;
  name: string;
  category: 'A' | 'B' | 'C' | 'D';
  categoryTitle: string;
  riskScore: number; // 0.0 to 1.0
  confidence: number;
  tissueDescription: string;
  aiFindings: string[];
  biomarkers: { name: string; value: string; status: 'normal' | 'concerning' | 'critical' }[];
  clinicalTriage: string;
  recommendedAction: string;
}

export interface OrganData {
  id: string;
  name: string;
  latinName: string;
  teluguName: string;
  hindiName: string;
  subheading: string;
  category: string;
  dimensions: string;
  weight: string;
  curatorNotes: string;
  plinthPlaque: string;
  colorPalette: {
    primary: string;
    secondary: string;
    highlight: string;
    shadow: string;
    wireframe: string;
  };
  pins: AnatomicalPin[];
  sections: SectionSliceInfo[];
  watercolourPlate: WatercolourPlateData;
  quiz: QuizQuestion[];
  aiSimulations: AISimulationCase[];
}

export const NINE_ORGANS: OrganData[] = [
  {
    id: 'oral-cavity',
    name: 'Oral Cavity & Lingual Complex',
    latinName: 'Cavitas Oris et Lingua',
    teluguName: 'నోటి కుహరం మరియు నాలుక',
    hindiName: 'मुख गुहा और जिह्वा',
    subheading: 'Primary Screening Epicenter • Mucosal Epithelium & Papillae',
    category: 'Stomatognathic & Digestive',
    dimensions: 'Approx. 8.5 cm length × 5.0 cm breadth',
    weight: 'Approx. 70g (musculature & salivary tissues)',
    curatorNotes: 'Etched after Vesalius (Fabrica Lib. VII) and modern Indian Public Health oncology surveys. The lateral tongue borders and floor of mouth represent the highest-yield clinical zones for early premalignant detection.',
    plinthPlaque: 'CAVITAS ORIS • APPARATUS GUSTATORIUS',
    colorPalette: {
      primary: '#d65d64',
      secondary: '#b8424a',
      highlight: '#fce4e6',
      shadow: '#661f25',
      wireframe: '#4a1519'
    },
    pins: [
      {
        id: 'pin-oc-1',
        number: 1,
        label: 'Tongue Dorsum & Papillae',
        latinName: 'Dorsum Linguae',
        position: [0, 0.45, 0.2],
        description: 'Convex superior surface covered by keratinized filiform and non-keratinized fungiform papillae housing sensory taste buds.',
        bloodSupply: 'Lingual artery (branch of external carotid)',
        innervation: 'Lingual nerve (V3 sensory), Chorda tympani (VII taste)',
        clinicalSignificance: 'Inspection for geographic tongue, hairy leukoplakia, and candidal overgrowths.',
        oncologyFocus: 'Atrophic glossitis predisposes to increased mucosal carcinogen permeability.',
        riskCategory: 'A'
      },
      {
        id: 'pin-oc-2',
        number: 2,
        label: 'Lateral Tongue Border (High-Risk Zone)',
        latinName: 'Margo Lateralis Linguae',
        position: [0.75, 0.2, 0.05],
        description: 'The junction between dorsal and ventral tongue mucosa; subjected to chronic dental friction and prolonged carcinogen pooling.',
        bloodSupply: 'Profunda linguae artery',
        innervation: 'Lingual nerve (CN V3), Hypoglossal nerve (CN XII motor)',
        clinicalSignificance: 'Site responsible for over 40% of all oral squamous cell carcinomas (OSCC) in the Indian subcontinent.',
        oncologyFocus: 'Primary screening target: firm non-healing indurations, leukoplakia, and erythroplakia.',
        riskCategory: 'D'
      },
      {
        id: 'pin-oc-3',
        number: 3,
        label: 'Circumvallate Papillae & Sulcus Terminalis',
        latinName: 'Papillae Vallatae',
        position: [0, 0.55, -0.6],
        description: 'V-shaped boundary line of 8–12 large round papillae demarcating the anterior two-thirds from posterior third of the tongue.',
        bloodSupply: 'Dorsal lingual arteries',
        innervation: 'Glossopharyngeal nerve (CN IX sensory & taste)',
        clinicalSignificance: 'Often mistaken by patients as abnormal masses; must be distinguished from lymphoid hyperplasia.',
        riskCategory: 'A'
      },
      {
        id: 'pin-oc-4',
        number: 4,
        label: 'Buccal Mucosa & Chewing Sulcus',
        latinName: 'Tunica Mucosa Buccae',
        position: [-0.95, 0.15, -0.2],
        description: 'Inner lining of cheeks extending to retromolar trigone; direct contact area for betel quid (paan/gutkha) placement.',
        bloodSupply: 'Buccal branch of maxillary artery',
        innervation: 'Long buccal nerve (CN V3)',
        clinicalSignificance: 'Pathognomonic site for Oral Submucous Fibrosis (OSF) with blanching, fibrous bands, and trismus.',
        oncologyFocus: 'Malignant transformation rate of untreated OSF approaches 7.6% over a 10-year span.',
        riskCategory: 'B'
      },
      {
        id: 'pin-oc-5',
        number: 5,
        label: 'Palatine Uvula & Soft Palate',
        latinName: 'Uvula Palatina',
        position: [0, 0.9, -0.85],
        description: 'Conical projection hanging from posterior free margin of the soft palate aiding velopharyngeal closure during swallowing.',
        bloodSupply: 'Ascending palatine & lesser palatine arteries',
        innervation: 'Pharyngeal plexus (CN X via cranial accessory CN XI)',
        clinicalSignificance: 'Assessment for symmetry, HPV-associated oropharyngeal papillomas, and mucosal erythema.',
        riskCategory: 'A'
      },
      {
        id: 'pin-oc-6',
        number: 6,
        label: 'Sublingual Salivary Gland & Plica',
        latinName: 'Glandula Sublingualis',
        position: [0.35, -0.3, 0.4],
        description: 'Smallest of major salivary glands situated in the sublingual fossa of the anterior mandible beneath oral floor mucosa.',
        bloodSupply: 'Sublingual & submental arteries',
        innervation: 'Parasympathetic secretomotor from CN VII via chorda tympani & submandibular ganglion',
        clinicalSignificance: 'Site for salivary ranulas, ductal calculi, and adenoid cystic carcinoma.',
        riskCategory: 'B'
      }
    ],
    sections: [
      {
        plane: 'sagittal',
        label: 'Median Sagittal Lingual Section',
        internalStructuresRevealed: [
          'Genioglossus muscle fan-shaped intrinsic core',
          'Hyoglossus & Styloglossus muscular anchorage',
          'Lingual septum dividing symmetrical halves',
          'Deep lingual venous plexus'
        ],
        histologicalInsight: 'Demonstrates deep muscular invasion depth (DOI) > 5mm, a critical staging metric in TNM-8 staging for tongue carcinoma.'
      },
      {
        plane: 'coronal',
        label: 'Coronal Section Through Molar Region',
        internalStructuresRevealed: [
          'Mandibular alveolar bone trabeculae',
          'Gingival attachment & periodontal ligament',
          'Buccinator muscle fibers interdigitating with orbicularis oris',
          'Submandibular duct (Wharton duct) course'
        ],
        histologicalInsight: 'Reveals clear surgical margin distances from periosteal invasion in advanced alveolar carcinoma.'
      }
    ],
    watercolourPlate: {
      title: 'Stratified Squamous Epithelium of the Oral Mucosa',
      latinName: 'Epithelium Stratificatum Squamosum Mucosae Oris',
      plateNumber: 'Plate I • Ex Tabula Anatomica',
      magnification: '400× High-Power Microscopic Field',
      stainType: 'Hematoxylin & Eosin (H&E) with Carmine Counterstain',
      historicalContext: 'Rendered in the classical 19th-century watercolor histological style of Camillo Golgi & Santiago Ramón y Cajal, showing cellular polarity and basal laminations.',
      tissueType: 'Non-keratinized to Parakeratinized Stratified Squamous Mucosal Lining',
      description: 'The architectural integrity of the oral stratified squamous epithelium acts as the frontline defense barrier against mechanical abrasion and dietary carcinogens. The basal stem cell layer constantly replenishes desquamating superficial cells.',
      layers: [
        {
          name: 'Stratum Basale (Basal Stem Cell Layer)',
          colorHex: '#3b2260',
          description: 'Single layer of columnar/cuboidal progenitor cells anchored to the basement membrane by hemidesmosomes.',
          cellularFeatures: 'High nuclear-to-cytoplasmic (N:C) ratio, active mitoses, basophilic dark hematoxylin uptake.'
        },
        {
          name: 'Stratum Spinosum (Prickle Cell Layer)',
          colorHex: '#d8667c',
          description: 'Multilayered polyhedral cells featuring prominent intercellular desmosomal bridges giving a spiked spine appearance.',
          cellularFeatures: 'Rich in cytokeratin tonofilaments, glycogen vacuoles, providing tensile strength.'
        },
        {
          name: 'Stratum Superficiale (Desquamating Surface)',
          colorHex: '#f3a9b7',
          description: 'Flattened squamous cells retaining pyknotic flattened nuclei, gradually shedding into oral saliva.',
          cellularFeatures: 'Parakeratinized in masticatory zones (gingiva/hard palate), non-keratinized in lining mucosa.'
        },
        {
          name: 'Lamina Propria & Dermal Papillae',
          colorHex: '#e8c29e',
          description: 'Vascularized loose-to-dense collagenous connective tissue interdigitating with epithelial rete pegs.',
          cellularFeatures: 'Capillary loops, fibroblasts, mast cells, and mucosal nerve endings.'
        }
      ],
      cytologyHighlights: [
        'Well-defined basophilic basement membrane without micro-invasion',
        'Orderly progressive maturation from basal to superficial strata',
        'Intact desmosomal intercellular junctions without acantholysis'
      ],
      dysplasiaMarkers: [
        'Drop-shaped rete ridges extending deep into lamina propria',
        'Loss of basal polarity and architectural stratification',
        'Abnormal keratin pearls situated within the spinous or basal compartments',
        'Pleomorphic, hyperchromatic nuclei with enlarged nucleoli'
      ]
    },
    quiz: [
      {
        id: 'quiz-oc-1',
        question: 'Which anatomical zone of the oral cavity exhibits the highest incidence of oral squamous cell carcinoma (OSCC) in India?',
        clinicalScenario: 'A 52-year-old farm worker with a 25-year history of chewing gutkha presents with a painless ulcerated plaque persisting for 6 weeks.',
        options: [
          'Dorsal surface of anterior tongue',
          'Lateral border of the tongue and floor of mouth',
          'Anterior hard palate rugae',
          'Labial mucosa of the upper lip'
        ],
        correctAnswerIndex: 1,
        explanation: 'The lateral border of the tongue and the contiguous floor of the mouth account for over 40% of intraoral cancers due to prolonged carcinogen pooling in saliva and thin, vulnerable epithelial barriers.',
        clinicalPearl: 'Any solitary ulcer on the lateral tongue border persisting > 14 days mandates urgent biopsy referral.'
      },
      {
        id: 'quiz-oc-2',
        question: 'What is the characteristic clinical hallmark of advanced Oral Submucous Fibrosis (OSF)?',
        clinicalScenario: 'A 28-year-old student reports progressive burning sensation to spicy food and difficulty opening the mouth beyond two finger breadths.',
        options: [
          'Bilateral salivary gland swelling with purulence',
          'Blanched marble-like mucosa with palpable fibrous bands and progressive trismus',
          'Sudden-onset widespread purpuric petechiae on the soft palate',
          'Deep fissured cobblestone tongue with migratory glossitis'
        ],
        correctAnswerIndex: 1,
        explanation: 'OSF is a chronic progressive fibrotic disorder linked to areca nut alkaloids (arecoline), inducing collagen deposition, mucosal blanching, loss of elasticity, and restricted inter-incisal mouth opening (trismus).',
        clinicalPearl: 'OSF carries an estimated 7.6% lifetime transformation risk into malignancy.'
      },
      {
        id: 'quiz-oc-3',
        question: 'Which cranial nerve is responsible for general somatic sensation (pain/touch) to the anterior two-thirds of the tongue?',
        clinicalScenario: 'During deep tissue palpation of a sublingual induration, a patient perceives sharp discomfort along the mandibular nerve distribution.',
        options: [
          'Hypoglossal nerve (CN XII)',
          'Lingual nerve (branch of mandibular division of Trigeminal, CN V3)',
          'Glossopharyngeal nerve (CN IX)',
          'Facial nerve (CN VII)'
        ],
        correctAnswerIndex: 1,
        explanation: 'General sensation to the anterior 2/3 of the tongue is carried by the Lingual nerve (V3). Taste sensation from this same area travels via the Chorda Tympani (CN VII).',
        clinicalPearl: 'Tumor perineural invasion of the lingual nerve manifests clinically as unprovoked tongue numbness or paresthesia.'
      },
      {
        id: 'quiz-oc-4',
        question: 'Under Aarogya Drishti clinical triage guidelines, how should a persistent non-scrapable red-and-white patch (erythroleukoplakia) exceeding 14 days be classified?',
        clinicalScenario: 'A community dental camp identifies a 1.2 cm speckled velvety red patch on the right buccal mucosa of a betel quid chewer.',
        options: [
          'Category A (No suspicious feature; routine hygiene follow-up)',
          'Category B (Low-grade visible abnormality; review at 3 months)',
          'Category C (Inconclusive; repeat photo with flash)',
          'Category D (Urgent clinical review & histopathological biopsy recommended)'
        ],
        correctAnswerIndex: 3,
        explanation: 'Erythroplakia and erythroleukoplakia harbor high rates of severe dysplasia or invasive carcinoma (>80% on histopathology) and satisfy Category D referral criteria for immediate specialist biopsy within 7–14 days.',
        clinicalPearl: 'Erythroplakia has the highest malignant transformation potential among all oral potentially malignant disorders.'
      }
    ],
    aiSimulations: [
      {
        id: 'sim-oc-normal',
        name: 'Normal Healthy Buccal Mucosa',
        category: 'A',
        categoryTitle: 'Category A: Physiological Tissue Architecture',
        riskScore: 0.08,
        confidence: 0.96,
        tissueDescription: 'Uniform pink mucosal surface with intact stippling, clear Fordyce granules, and no indurated margin.',
        aiFindings: [
          'Homogeneous spectral reflectance across mucosal vascular beds',
          'Keratin maturation index within normal 95th percentile baseline',
          'Zero suspicious contour step-offs or ulcer margins detected'
        ],
        biomarkers: [
          { name: 'Dysplasia Risk Index', value: '0.04 (Negligible)', status: 'normal' },
          { name: 'Vascular Pattern', value: 'Fine capillary loops', status: 'normal' },
          { name: 'Keratin Index', value: 'Physiological', status: 'normal' }
        ],
        clinicalTriage: 'Category A: Standard preventive oral hygiene. Re-screen at routine annual interval.',
        recommendedAction: 'Continue healthy habits. No active specialist intervention required.'
      },
      {
        id: 'sim-oc-dysplasia',
        name: 'Suspicious Homogeneous Leukoplakia (Right Lateral Tongue)',
        category: 'B',
        categoryTitle: 'Category B: Potentially Malignant Abnormality Detected',
        riskScore: 0.62,
        confidence: 0.89,
        tissueDescription: 'Well-demarcated non-scrapable opaque white plaque measuring 12mm × 7mm on lateral lingual border.',
        aiFindings: [
          'Hyperkeratotic surface profile with focal acoustic shadowing on optical coherence modeling',
          'Slight architectural contour elevation (+0.8mm step-off)',
          'Duration > 21 days with positive tobacco/areca nut exposure'
        ],
        biomarkers: [
          { name: 'Dysplasia Risk Index', value: '0.58 (Elevated)', status: 'concerning' },
          { name: 'Epithelial Thickness', value: '+42% above baseline', status: 'concerning' },
          { name: 'Parietal Margins', value: 'Distinct, non-infiltrative', status: 'normal' }
        ],
        clinicalTriage: 'Category B: Professional evaluation recommended within 2 weeks. Mandatory tobacco cessation counseling.',
        recommendedAction: 'Refer to dental surgeon or District Hospital for vital toluidine blue staining and potential punch biopsy.'
      },
      {
        id: 'sim-oc-malignant',
        name: 'Ulcerated Endophytic Lesion (High Risk Malignancy)',
        category: 'D',
        categoryTitle: 'Category D: Urgent Clinical Oncological Review Required',
        riskScore: 0.94,
        confidence: 0.97,
        tissueDescription: 'Irregular central ulcer bed with rolled, everted indurated borders and surrounding fiery erythematous halo.',
        aiFindings: [
          'Deep architectural disruption exceeding 4.2mm depth-of-invasion signature',
          'Atypical neo-vascularization with corkscrew tortuous capillary loops',
          'Loss of epithelial basement plane acoustic integrity'
        ],
        biomarkers: [
          { name: 'Dysplasia Risk Index', value: '0.94 (Critical)', status: 'critical' },
          { name: 'Atypical Neo-vasculature', value: 'Severe / Micro-aneurysms', status: 'critical' },
          { name: 'Induration Margin Depth', value: '> 4.0 mm', status: 'critical' }
        ],
        clinicalTriage: 'Category D: Immediate fast-track head & neck oncology referral within 72 hours for tissue biopsy and staging CT/MRI.',
        recommendedAction: 'Expedited referral to Regional Cancer Centre (RCC) or Govt. Dental College. Fast-track histopathology.'
      }
    ]
  },
  {
    id: 'larynx-pharynx',
    name: 'Larynx & Vocal Complex',
    latinName: 'Larynx et Cartilagines Laryngeales',
    teluguName: 'స్వరపేటిక మరియు గొంతు',
    hindiName: 'कंठ और स्वरयंत्र',
    subheading: 'Phonatory Valve • Glottic Slit & Cartilaginous Shield',
    category: 'Respiratory & Phonatory',
    dimensions: 'Approx. 5.0 cm height × 4.0 cm width',
    weight: 'Approx. 28g (cartilages, ligaments & intrinsic muscles)',
    curatorNotes: 'Sculpted with prominence given to the thyroid cartilage notch (Pomum Adami) and the delicate true vocal folds (chordae vocales), highlighting tobacco and HPV-induced glottic neoplasms.',
    plinthPlaque: 'LARYNX HUMANUS • APPARATUS VOCALIS',
    colorPalette: {
      primary: '#5d8aa8',
      secondary: '#416788',
      highlight: '#dbe9f4',
      shadow: '#223c52',
      wireframe: '#1a2c3a'
    },
    pins: [
      {
        id: 'pin-lx-1',
        number: 1,
        label: 'Thyroid Cartilage & Laryngeal Prominence',
        latinName: 'Cartilago Thyroidea & Prominentia Laryngea',
        position: [0, 0.5, 0.45],
        description: 'Largest laryngeal cartilage formed by two quadrangular laminae fusing anteriorly at an acute angle to create the "Adam\'s apple".',
        bloodSupply: 'Superior laryngeal artery (from superior thyroid)',
        innervation: 'External laryngeal nerve (to cricothyroid muscle)',
        clinicalSignificance: 'Shields internal glottic vocal apparatus; invaded in advanced T4 laryngeal cancers.',
        riskCategory: 'A'
      },
      {
        id: 'pin-lx-2',
        number: 2,
        label: 'True Vocal Folds & Glottic Aperture',
        latinName: 'Plicae Vocales & Rima Glottidis',
        position: [0, 0.05, 0.0],
        description: 'Pearly-white pearlescent ligamentous bands that vibrate under expired air to produce vocal phonation.',
        bloodSupply: 'Superior and inferior laryngeal arteries',
        innervation: 'Recurrent laryngeal nerve (all intrinsic laryngeal muscles except cricothyroid)',
        clinicalSignificance: 'Site for smoker\'s vocal cord polyps, singer\'s nodules, and glottic squamous cell carcinoma.',
        oncologyFocus: 'Presents early with persistent progressive hoarseness of voice exceeding 3 weeks.',
        riskCategory: 'D'
      },
      {
        id: 'pin-lx-3',
        number: 3,
        label: 'Epiglottis (Leaf-shaped Cartilage)',
        latinName: 'Epiglottis',
        position: [0, 0.95, -0.2],
        description: 'Elastic fibrocartilage leaf guarding the laryngeal inlet during deglutition, deflecting food boluses laterally into the piriform fossae.',
        bloodSupply: 'Superior laryngeal artery',
        innervation: 'Internal laryngeal nerve (sensory)',
        clinicalSignificance: 'Target for acute life-threatening epiglottitis and supraglottic carcinomas.',
        riskCategory: 'B'
      },
      {
        id: 'pin-lx-4',
        number: 4,
        label: 'Cricoid Cartilage Ring',
        latinName: 'Cartilago Cricoidea',
        position: [0, -0.55, 0.25],
        description: 'Signet ring-shaped hyaline cartilage forming the only complete rigid circumferential skeletal ring of the airway.',
        bloodSupply: 'Inferior laryngeal artery',
        innervation: 'Recurrent laryngeal nerve',
        clinicalSignificance: 'Site for emergency cricothyroidotomy during acute upper airway obstruction.',
        riskCategory: 'A'
      },
      {
        id: 'pin-lx-5',
        number: 5,
        label: 'Piriform Fossa (Hypopharyngeal Recess)',
        latinName: 'Recessus Piriformis',
        position: [0.65, 0.2, -0.3],
        description: 'Deep teardrop-shaped gutter on either side of the laryngeal inlet through which food passes into the esophagus.',
        bloodSupply: 'Inferior thyroid artery',
        innervation: 'Internal branch of superior laryngeal nerve',
        clinicalSignificance: 'Infamous "silent" area where carcinomas grow to substantial size before causing symptoms; presents with referred otalgia.',
        riskCategory: 'D'
      }
    ],
    sections: [
      {
        plane: 'coronal',
        label: 'Coronal Laryngeal Cut Through Ventricle',
        internalStructuresRevealed: [
          'Vestibular fold (false vocal cord) superiorly',
          'Laryngeal sinus / ventricle of Morgagni',
          'True vocal fold with vocal ligament and vocalis muscle',
          'Infraglottic space continuing into trachea'
        ],
        histologicalInsight: 'Delineates transglottic tumor extension crossing the ventricle into supraglottic and subglottic compartments.'
      }
    ],
    watercolourPlate: {
      title: 'Vocal Cord Lamina Propria & Reinke’s Space',
      latinName: 'Stratum Laminae Propriae Plicae Vocalis',
      plateNumber: 'Plate II • Apparatus Phonatorius',
      magnification: '200× Microscopic Section',
      stainType: 'Masson’s Trichrome (Collagen Green, Keratin/Muscle Red)',
      historicalContext: 'Rendered in fine Prussian blue and cochineal watercolor tones showing the vibratory extracellular matrix designed by Friedrich Reinke.',
      tissueType: 'Non-keratinized Stratified Squamous with Elastic Fibrous Stroma',
      description: 'The vocal fold features a specialized multi-layered architecture: non-keratinized stratified squamous epithelium overlying Reinke’s superficial loose gelatinous lamina propria, which vibrates at 100–300 Hz during human speech.',
      layers: [
        {
          name: 'Superficial Squamous Epithelium',
          colorHex: '#e07a5f',
          description: 'Thin 5–10 cell layer maintaining aerodynamic smoothness over vocal impact.',
          cellularFeatures: 'Desmosomal micro-bridges resisting high-frequency shearing impact.'
        },
        {
          name: 'Superficial Lamina Propria (Reinke’s Space)',
          colorHex: '#f4f1de',
          description: 'Acellular gelatinous matrix composed of hyaluronic acid and fibronectin, enabling wave mucosal ripple.',
          cellularFeatures: 'Sparse fibroblasts, amorphously distributed collagen III.'
        },
        {
          name: 'Vocal Ligament (Intermediate & Deep Strata)',
          colorHex: '#81b29a',
          description: 'Dense bundle of parallel elastin cords merging into heavy type I collagen fibers anchored to arytenoid vocal process.',
          cellularFeatures: 'High tensile elastance acting as a biological acoustic spring.'
        },
        {
          name: 'Vocalis Muscle (Thyroarytenoid Muscle Core)',
          colorHex: '#3d405b',
          description: 'Striated skeletal muscle fascicles providing isometric active vocal fold tensioning.',
          cellularFeatures: 'Rapid-twitch fatigue-resistant striated muscle fibers with peripheral nuclei.'
        }
      ],
      cytologyHighlights: [
        'Free mobility of Reinke’s space over the underlying vocal ligament during phonation',
        'Absence of subepithelial blood vessel tortuosity or telangiectasia'
      ],
      dysplasiaMarkers: [
        'Epithelial hyperkeratosis appearing as clinical white vocal cord plaque (leukoplakia)',
        'Obliteration of Reinke’s clear gelatinous zone by invasive neoplastic cell nests'
      ]
    },
    quiz: [
      {
        id: 'quiz-lx-1',
        question: 'A 58-year-old heavy bidi smoker complains of hoarseness lasting 6 weeks. Which region of the larynx is most commonly the primary origin for malignant lesions?',
        clinicalScenario: 'Direct fiberoptic laryngoscopy reveals a rough exophytic plaque on the anterior third of the true vocal cord.',
        options: [
          'Glottic larynx (true vocal cords)',
          'Epiglottic free edge',
          'Subglottic trachea',
          'Posterior pharyngeal wall'
        ],
        correctAnswerIndex: 0,
        explanation: 'Glottic carcinoma accounts for approximately 65% of all laryngeal cancers. Because tumors on the vibrating vocal cords disrupt speech early, they often present at a curable T1 stage with hoarseness.',
        clinicalPearl: 'Any adult smoker with unexplained dysphonia or hoarseness persisting beyond 3 weeks must undergo laryngeal visualization.'
      },
      {
        id: 'quiz-lx-2',
        question: 'Injury to the Recurrent Laryngeal Nerve during thyroid surgery typically causes which clinical sign?',
        clinicalScenario: 'Following a total thyroidectomy for papillary cancer, a patient awakens with a breathy, hoarse voice and aspiration of liquids.',
        options: [
          'Complete loss of tongue sensation',
          'Ipsilateral vocal cord paralysis in a paramedian resting position',
          'Paralysis of the soft palate uvula',
          'Loss of taste sensation on posterior tongue'
        ],
        correctAnswerIndex: 1,
        explanation: 'The recurrent laryngeal nerve innervates all intrinsic laryngeal muscles except the cricothyroid. Unilateral damage paralyzes the ipsilateral cord, preventing complete glottic closure.',
        clinicalPearl: 'Bilateral recurrent laryngeal nerve palsy causes critical airway obstruction requiring emergency tracheostomy.'
      }
    ],
    aiSimulations: [
      {
        id: 'sim-lx-normal',
        name: 'Normal Pearly White Vocal Cord',
        category: 'A',
        categoryTitle: 'Category A: Normal Phonation Tissue',
        riskScore: 0.05,
        confidence: 0.95,
        tissueDescription: 'Symmetrical, smooth, glistening pearly white vocal folds with full glottic excursion and complete closure during phonation.',
        aiFindings: [
          'Regular mucosal wave traveling uninterrupted across both cords',
          'Zero vascular ectasia or mucosal erythema along anterior commissure',
          'Subglottic airway lumen widely patent'
        ],
        biomarkers: [
          { name: 'Mucosal Wave Velocity', value: 'Normal symmetrical', status: 'normal' },
          { name: 'Vocal Margin Smoothness', value: 'Uniform 100%', status: 'normal' }
        ],
        clinicalTriage: 'Category A: Physiological health. Vocal hygiene preservation.',
        recommendedAction: 'No intervention required.'
      },
      {
        id: 'sim-lx-cancer',
        name: 'Glottic Leukoplakia / Early Carcinoma in Situ',
        category: 'D',
        categoryTitle: 'Category D: Urgent Laryngology Referral Required',
        riskScore: 0.91,
        confidence: 0.93,
        tissueDescription: 'Irregular granular hyperkeratotic plaque involving the anterior two-thirds of the left true vocal cord with focal mucosal wave damping.',
        aiFindings: [
          'Loss of mucosal wave ripple on high-speed optical stroboscopy modeling',
          'Vascular micro-looping typical of high-grade intraepithelial neoplasia',
          'Persistent hoarseness reported > 45 days in tobacco-exposed subject'
        ],
        biomarkers: [
          { name: 'Glottic Wave Impairment', value: 'Severe / Fixed cord edge', status: 'critical' },
          { name: 'Malignancy Predictor', value: '0.91 (High Suspicion)', status: 'critical' }
        ],
        clinicalTriage: 'Category D: Immediate microlaryngoscopy and excisional biopsy under general anesthesia.',
        recommendedAction: 'Refer to ENT/Head & Neck Oncology at Medical College Hospital for rigid direct laryngoscopy.'
      }
    ]
  },
  {
    id: 'heart',
    name: 'Human Heart & Great Vessels',
    latinName: 'Cor Humanum et Vasa Sanguinea',
    teluguName: 'గుండె మరియు ప్రధాన రక్తనాళాలు',
    hindiName: 'मानव हृदय और प्रमुख रक्त वाहिकाएं',
    subheading: 'Muscular Pump • Chambers, Valves & Coronary Vasculature',
    category: 'Cardiovascular',
    dimensions: 'Approx. 12.0 cm length × 8.5 cm width',
    weight: 'Approx. 300g (adult male average)',
    curatorNotes: 'Modeled after Leonardo da Vinci’s Windsor anatomical folios (c. 1511–1513) on cardiac vortex hemodynamics and aortic root sinuses of Valsalva.',
    plinthPlaque: 'COR HUMANUM • VITA ET MOTUS',
    colorPalette: {
      primary: '#9e2a2b',
      secondary: '#540b0e',
      highlight: '#f3c68f',
      shadow: '#335c67',
      wireframe: '#2b1b17'
    },
    pins: [
      {
        id: 'pin-ht-1',
        number: 1,
        label: 'Ascending Aorta & Aortic Arch',
        latinName: 'Aorta Ascendens & Arcus Aortae',
        position: [0.1, 0.9, -0.1],
        description: 'Primary systemic arterial trunk originating from the left ventricle, curving superiorly to branch into brachiocephalic, carotid, and subclavian arteries.',
        bloodSupply: 'Supplies systemic circulation',
        innervation: 'Cardiac autonomic plexus & aortic baroreceptors',
        clinicalSignificance: 'Aortic aneurysm, dissection (Stanford Type A), and calcific stenosis.',
        riskCategory: 'A'
      },
      {
        id: 'pin-ht-2',
        number: 2,
        label: 'Left Ventricle & Cardiac Apex',
        latinName: 'Ventriculus Sinister & Apex Cordis',
        position: [-0.65, -0.65, 0.45],
        description: 'Thick-walled high-pressure muscular pumping chamber responsible for generating systemic mean arterial pressure.',
        bloodSupply: 'Left anterior descending (LAD) & circumflex coronary arteries',
        innervation: 'Deep cardiac plexus (sympathetic T1–T4 accelerator)',
        clinicalSignificance: 'Apex beat palpable at 5th left intercostal space in midclavicular line; primary chamber affected in hypertensive hypertrophy and myocardial infarction.',
        riskCategory: 'B'
      },
      {
        id: 'pin-ht-3',
        number: 3,
        label: 'Anterior Interventricular Sulcus (LAD Groove)',
        latinName: 'Sulcus Interventricularis Anterior',
        position: [-0.15, -0.1, 0.65],
        description: 'Surface furrow marking internal septum dividing ventricles, cradling the Left Anterior Descending (LAD) coronary artery ("widow-maker").',
        bloodSupply: 'Left Anterior Descending (LAD) artery',
        innervation: 'Subepicardial nervous plexus',
        clinicalSignificance: 'Most frequent site of fatal atheromatous plaque rupture causing anterior wall STEMI.',
        riskCategory: 'D'
      },
      {
        id: 'pin-ht-4',
        number: 4,
        label: 'Right Atrium & Vena Cava Junction',
        latinName: 'Atrium Dextrum',
        position: [0.75, 0.35, 0.15],
        description: 'Receives deoxygenated systemic venous return via superior and inferior venae cavae; houses the Sinoatrial (SA) pacemaker node.',
        bloodSupply: 'Right coronary artery (RCA nodal branch in 60%)',
        innervation: 'Vagus nerve (CN X, parasympathetic cardiodepressor)',
        clinicalSignificance: 'Site for central venous line catheterization, SA nodal sick sinus syndrome, and atrial fibrillation triggers.',
        riskCategory: 'A'
      },
      {
        id: 'pin-ht-5',
        number: 5,
        label: 'Pulmonary Trunk Bifurcation',
        latinName: 'Truncus Pulmonalis',
        position: [-0.25, 0.65, 0.3],
        description: 'Emerges from right ventricular infundibulum, bifurcating beneath aortic arch into right and left pulmonary arteries.',
        bloodSupply: 'Deoxygenated blood to pulmonary capillary beds',
        innervation: 'Cardiac plexus',
        clinicalSignificance: 'Site of fatal saddle pulmonary embolism originating from deep vein thrombosis (DVT).',
        riskCategory: 'D'
      }
    ],
    sections: [
      {
        plane: 'coronal',
        label: 'Four-Chamber Coronal Cut (Cardiac Plane)',
        internalStructuresRevealed: [
          'Interventricular and interatrial septa',
          'Mitral (bicuspid) and tricuspid atrioventricular valves',
          'Chordae tendineae and papillary muscle anchors',
          'Aortic root and semilunar cusps'
        ],
        histologicalInsight: 'Demonstrates 3:1 left-to-right ventricular free wall thickness ratio required to overcome systemic vs pulmonary vascular resistance.'
      }
    ],
    watercolourPlate: {
      title: 'Ventricular Myocardium & Intercalated Discs',
      latinName: 'Textus Muscularis Striatus Cardiacus',
      plateNumber: 'Plate III • Circulatio Sanguinis',
      magnification: '400× High-Power Micrograph',
      stainType: 'Heidenhain’s Iron Hematoxylin with Eosin',
      historicalContext: 'Rendered in rich Venetian red and sepia tones depicting the branching syncytium of cardiac muscle fibers first outlined by Purkinje and Kölliker.',
      tissueType: 'Involuntary Striated Cardiac Muscle with Fascia Adherens',
      description: 'Cardiac myocytes are branched, uninucleated cylindrical cells joined end-to-end by specialized junctional complexes termed intercalated discs, ensuring mechanical cohesion and electrophysiological syncytial coupling.',
      layers: [
        {
          name: 'Endocardium (Endothelial Lining)',
          colorHex: '#f3c68f',
          description: 'Smooth simple squamous endothelium resting on a thin layer of loose fibroelastic tissue.',
          cellularFeatures: 'Continuous with vascular intima, non-thrombogenic surface.'
        },
        {
          name: 'Myocardium (Branching Muscle Syncytium)',
          colorHex: '#9e2a2b',
          description: 'Dense spiral layers of striated muscle cells containing high concentrations of mitochondria (40% cell volume).',
          cellularFeatures: 'Central oval nuclei, cross-striations of actin and myosin, high myoglobin density.'
        },
        {
          name: 'Intercalated Discs (Junctional Plates)',
          colorHex: '#540b0e',
          description: 'Step-like transverse junctions crossing myofibrils: fascia adherens and gap junctions.',
          cellularFeatures: 'Low-resistance electrical pathways (connexin-43) facilitating instantaneous action potential conduction.'
        },
        {
          name: 'Epicardium & Subepicardial Fat',
          colorHex: '#ffe8d6',
          description: 'Visceral layer of serous pericardium supporting main coronary arteries and autonomic nerves.',
          cellularFeatures: 'Adipocytes, mesothelial cells, lymphatic channels.'
        }
      ],
      cytologyHighlights: [
        'Central blunt-ended single nuclei surrounded by clear glycogen-rich perinuclear halos',
        'Visible scalariform step-ladder intercalated discs coupling adjacent myocytes'
      ],
      dysplasiaMarkers: [
        'Wavy myofibers and hypereosinophilia indicating early acute myocardial ischemia (2–4 hours)',
        'Contraction band necrosis and dense neutrophilic infiltration after acute coronary occlusion'
      ]
    },
    quiz: [
      {
        id: 'quiz-ht-1',
        question: 'Which coronary artery branch is colloquially called the "widow-maker" due to high mortality when occluded?',
        clinicalScenario: 'A 50-year-old executive collapses with crushing substernal chest pain radiating to the left arm; ECG shows massive ST elevation in leads V1–V4.',
        options: [
          'Right Marginal Artery',
          'Left Anterior Descending (LAD) Artery',
          'Posterior Descending Artery (PDA)',
          'Right Coronary Artery (RCA)'
        ],
        correctAnswerIndex: 1,
        explanation: 'The Left Anterior Descending (LAD) artery runs in the anterior interventricular groove, supplying 45–55% of left ventricular myocardium including the septum and apex. Occlusion triggers catastrophic pump failure or ventricular fibrillation.',
        clinicalPearl: 'Every minute of delay in primary coronary intervention (PCI) increases myocardial necrosis fraction.'
      },
      {
        id: 'quiz-ht-2',
        question: 'Where is the normal physiological pacemaker of the human heart located?',
        clinicalScenario: 'An electrocardiogram shows normal upright P waves in leads I and II with a regular rate of 72 beats per minute.',
        options: [
          'At the junction of superior vena cava and right atrium (SA Node)',
          'In the lower membranous portion of the interatrial septum (AV Node)',
          'Along the apex of the left ventricle',
          'Within the muscular pulmonary valve cusp'
        ],
        correctAnswerIndex: 0,
        explanation: 'The Sinoatrial (SA) node sits in the subepicardium at the superior end of the sulcus terminalis, just inferior to the entrance of the superior vena cava into the right atrium.',
        clinicalPearl: 'SA node intrinsic firing rate of 60–100 bpm is dynamically modulated by vagal and sympathetic tone.'
      }
    ],
    aiSimulations: [
      {
        id: 'sim-ht-normal',
        name: 'Normal Epicardial Coronary Perfusion',
        category: 'A',
        categoryTitle: 'Category A: Normal Myocardial Vascularity',
        riskScore: 0.04,
        confidence: 0.98,
        tissueDescription: 'Smooth epicardium with clear translucent coronary arborization; no subepicardial ecchymosis or ischemic discoloration.',
        aiFindings: [
          'Coronary luminal calibers uniformly tapered without segmental stenosis',
          'Left ventricular wall motion simulation demonstrates normal fractional shortening (64%)'
        ],
        biomarkers: [
          { name: 'Ischemia Index', value: '0.02 (Basal)', status: 'normal' },
          { name: 'Perfusion Symmetry', value: 'Symmetrical 100%', status: 'normal' }
        ],
        clinicalTriage: 'Category A: Physiological health. Routine wellness check.',
        recommendedAction: 'Maintain aerobic cardiovascular fitness and low-atherogenic diet.'
      },
      {
        id: 'sim-ht-ischemia',
        name: 'Critical Anterior Wall Ischemia (LAD Plaque Rupture)',
        category: 'D',
        categoryTitle: 'Category D: Critical Emergency Medical Triage',
        riskScore: 0.96,
        confidence: 0.99,
        tissueDescription: 'Mottled cyanotic pallor across anterior left ventricular free wall and apex consistent with acute severe transmural ischemia.',
        aiFindings: [
          'Acute focal hypokinesis of the anterior septum and apex',
          'Calculated coronary flow reserve deficit exceeding 85% in LAD territory',
          'Simulated ST-segment vector: Hyperacute anterior injury'
        ],
        biomarkers: [
          { name: 'Ischemic Myocardial Threat', value: 'Critical (0.96)', status: 'critical' },
          { name: 'Regional Hypokinesis', value: 'Severe Transmural', status: 'critical' }
        ],
        clinicalTriage: 'Category D: Immediate emergency catheterization lab activation for primary PCI within 90 minutes.',
        recommendedAction: 'Administer emergency antiplatelet therapy and transfer immediately to nearest cardiac intervention facility.'
      }
    ]
  },
  {
    id: 'lungs',
    name: 'Pulmonary System & Bronchial Tree',
    latinName: 'Pulmones et Arbor Bronchialis',
    teluguName: 'ఊపిరితిత్తులు మరియు శ్వాసనాళాలు',
    hindiName: 'फेफड़े और श्वसन तंत्र',
    subheading: 'Gas Exchange Sieve • Lobes, Fissures & Alveolar Septa',
    category: 'Respiratory',
    dimensions: 'Approx. 25.0 cm height × 15.0 cm breadth each',
    weight: 'Approx. 1100g combined (right 600g, left 500g)',
    curatorNotes: 'Depicting the asymmetrical tri-lobed right lung and bi-lobed left lung with its cardiac impression, framed by the cartilaginous tracheal bifurcating carina.',
    plinthPlaque: 'PULMONES • RESPIRATIO ET SPIRITUS',
    colorPalette: {
      primary: '#e07a5f',
      secondary: '#b25d45',
      highlight: '#f8dcd4',
      shadow: '#3d405b',
      wireframe: '#262938'
    },
    pins: [
      {
        id: 'pin-lg-1',
        number: 1,
        label: 'Trachea & Carina Bifurcation',
        latinName: 'Trachea & Carina Trachealis',
        position: [0, 0.95, -0.1],
        description: 'Fibrocartilaginous tube kept patent by 16–20 C-shaped hyaline cartilage rings; bifurcates at sternal angle of Louis (T4/T5) into main bronchi.',
        bloodSupply: 'Inferior thyroid & bronchial arteries',
        innervation: 'Recurrent laryngeal nerve & pulmonary plexus',
        clinicalSignificance: 'Carina is intensely sensitive to foreign body cough reflex; widened in subcarinal sub-bronchial lymphadenopathy.',
        riskCategory: 'A'
      },
      {
        id: 'pin-lg-2',
        number: 2,
        label: 'Right Lung - Superior, Middle & Inferior Lobes',
        latinName: 'Pulmo Dexter (Lobi Superior, Medius, Inferior)',
        position: [0.75, 0.05, 0.2],
        description: 'Larger, heavier lung divided by horizontal and oblique fissures into three distinct functional lobes.',
        bloodSupply: 'Right bronchial artery (from 3rd posterior intercostal)',
        innervation: 'Right anterior & posterior pulmonary plexuses',
        clinicalSignificance: 'Right main bronchus is wider, shorter, and more vertical, making it the most frequent landing site for aspirated foreign objects.',
        riskCategory: 'B'
      },
      {
        id: 'pin-lg-3',
        number: 3,
        label: 'Left Lung & Cardiac Notch',
        latinName: 'Pulmo Sinister & Incisura Cardiaca',
        position: [-0.75, -0.1, 0.2],
        description: 'Divided into superior and inferior lobes by a single oblique fissure; features a deep anterior notch accommodating the cardiac apex.',
        bloodSupply: 'Two left bronchial arteries (directly from descending thoracic aorta)',
        innervation: 'Left pulmonary autonomic plexus',
        clinicalSignificance: 'Inferior tip of the upper lobe anteriorly forms the lingula (homologue of the right middle lobe).',
        riskCategory: 'A'
      },
      {
        id: 'pin-lg-4',
        number: 4,
        label: 'Pulmonary Hilum & Root',
        latinName: 'Hilum Pulmonis',
        position: [0.15, 0.15, -0.3],
        description: 'Medial wedge-shaped depression transmitting pulmonary veins (anterior/inferior), pulmonary artery, main bronchus (posterior), and lymph nodes.',
        bloodSupply: 'Pulmonary circulation (deoxygenated) & Bronchial circulation (nutritive)',
        innervation: 'Vagal & sympathetic pulmonary plexus',
        clinicalSignificance: 'Crucial landmark in staging central bronchogenic squamous cell carcinomas and hilar lymphadenopathy (sarcoidosis/TB).',
        riskCategory: 'D'
      }
    ],
    sections: [
      {
        plane: 'coronal',
        label: 'Coronal Section Showing Bronchial Branching',
        internalStructuresRevealed: [
          'Secondary lobar bronchi (3 right, 2 left)',
          'Tertiary segmental bronchi (10 right, 8 left bronchopulmonary segments)',
          'Pulmonary arterial branch distribution',
          'Interlobular septa and subpleural lymphatics'
        ],
        histologicalInsight: 'Illustrates how segmental anatomy permits targeted surgical segmentectomy for early stage peripheral adenocarcinoma without whole pneumonectomy.'
      }
    ],
    watercolourPlate: {
      title: 'Pulmonary Alveoli & Blood-Air Diffusion Barrier',
      latinName: 'Alveoli Pulmonales et Claustrum Aëreum',
      plateNumber: 'Plate IV • Systema Respiratorium',
      magnification: '600× Ultra-High Power Field',
      stainType: 'Gomori’s Aldehyde Fuchsin with Fast Green Counterstain',
      historicalContext: 'Painted in translucent cerulean blue and rose tones showing the gossamer-thin capillary meshwork mapped by Marcello Malpighi in 1661.',
      tissueType: 'Simple Squamous Alveolar Epithelium & Capillary Endothelium',
      description: 'The human lung contains roughly 300 to 500 million alveoli presenting a vast 100-square-meter surface area. Gas diffusion across the blood-air barrier occurs through a minimal thickness of only 0.2 to 0.5 micrometers.',
      layers: [
        {
          name: 'Type I Alveolar Pneumocytes',
          colorHex: '#81b29a',
          description: 'Extremely attenuated simple squamous cells covering 95% of alveolar surface area dedicated to oxygen-CO2 diffusion.',
          cellularFeatures: 'Organelle-poor cytoplasm stretched paper-thin over basal lamina.'
        },
        {
          name: 'Type II Pneumocytes (Surfactant Synthesizers)',
          colorHex: '#e07a5f',
          description: 'Cuboidal cells with apical microvilli containing lamellar bodies rich in dipalmitoylphosphatidylcholine (DPPC surfactant).',
          cellularFeatures: 'Lowers alveolar surface tension to prevent end-expiratory atelectasis; stem cell source for type I repair.'
        },
        {
          name: 'Alveolar Capillary Endothelium',
          colorHex: '#3d405b',
          description: 'Continuous non-fenestrated capillary endothelial cells sharing a fused basement membrane with type I pneumocytes.',
          cellularFeatures: 'Houses angiotensin-converting enzyme (ACE) on luminal surface converting Angiotensin I to II.'
        },
        {
          name: 'Alveolar Macrophages (Dust Cells)',
          colorHex: '#f2cc8f',
          description: 'Resident phagocytes cruising alveolar luminal fluid scavenging inhaled particulate matter, silica, and smoker’s anthracotic pigment.',
          cellularFeatures: 'Lysosome-rich, golden-brown hemosiderin or carbon-laden inclusions.'
        }
      ],
      cytologyHighlights: [
        'Fused ultra-thin basement membrane between pneumocyte and capillary endothelia',
        'Patent alveolar lumen devoid of proteinaceous transudate or hyaline membranes'
      ],
      dysplasiaMarkers: [
        'Atypical adenomatous hyperplasia (AAH) of type II pneumocytes lining thickened alveolar septa (lepidic growth pattern)',
        'Presence of malignant keratin pearls or mucin vacuoles within alveolar airspace nests'
      ]
    },
    quiz: [
      {
        id: 'quiz-lg-1',
        question: 'Why are inhaled foreign bodies substantially more likely to lodge in the Right Main Bronchus compared to the Left?',
        clinicalScenario: 'A 4-year-old child accidentally inhales a peanut while playing; chest auscultation reveals unilateral decreased breath sounds.',
        options: [
          'The right main bronchus is wider, shorter, and runs more vertically than the left',
          'The right bronchus is positioned more horizontally across the midline',
          'The left main bronchus has no cartilage rings',
          'The right bronchus branches directly from the cricoid ring'
        ],
        correctAnswerIndex: 0,
        explanation: 'The right main bronchus is wider (~15mm vs ~12mm), shorter (~2.5cm vs ~5cm), and forms a more direct vertical angle (~25° vs ~45°) with the trachea, directly channeling descending objects.',
        clinicalPearl: 'Rigid bronchoscopy is the gold standard for therapeutic retrieval of foreign bodies.'
      }
    ],
    aiSimulations: [
      {
        id: 'sim-lg-normal',
        name: 'Normal Aerated Pulmonary Parenchyma',
        category: 'A',
        categoryTitle: 'Category A: Clear Lung Fields',
        riskScore: 0.06,
        confidence: 0.97,
        tissueDescription: 'Salmon-pink, soft, spongy, crepitant lung parenchyma with smooth, glistening visceral pleura.',
        aiFindings: [
          'Normal broncho-vascular taper to pleural perimeter',
          'Absence of solitary pulmonary nodules or hilar lymph node enlargement'
        ],
        biomarkers: [
          { name: 'Parenchymal Attenuation', value: 'Normal -850 HU', status: 'normal' },
          { name: 'Pleural Smoothness', value: 'Intact / Gliding', status: 'normal' }
        ],
        clinicalTriage: 'Category A: Physiological respiratory health. Annual chest wellness.',
        recommendedAction: 'Continue avoidance of tobacco and second-hand smoke.'
      },
      {
        id: 'sim-lg-nodule',
        name: 'Spiculated Right Upper Lobe Nodule (Suspected Bronchogenic Carcinoma)',
        category: 'D',
        categoryTitle: 'Category D: Urgent Pulmonology / Oncology Triage',
        riskScore: 0.93,
        confidence: 0.94,
        tissueDescription: 'Solid 2.4cm mass in the posterior segment of right upper lobe displaying corona radiata spiculation and pleural retraction.',
        aiFindings: [
          'High CT density attenuation with irregular micro-lobulated borders',
          'Pleural tail sign causing visceral pleural tethering',
          'Calculated Brock University malignancy probability: 93%'
        ],
        biomarkers: [
          { name: 'Spiculation Index', value: 'Severe Corona Radiata', status: 'critical' },
          { name: 'Nodule Size', value: '24 mm Solid', status: 'critical' }
        ],
        clinicalTriage: 'Category D: Urgent CT-guided core biopsy and whole-body PET-CT staging within 7 days.',
        recommendedAction: 'Expedited multi-disciplinary thoracic oncology team evaluation for surgical resection candidacy.'
      }
    ]
  },
  {
    id: 'brain',
    name: 'Human Brain & Cerebellum',
    latinName: 'Encephalon & Cerebellum',
    teluguName: 'మానవ మెదడు మరియు చిన్న మెదడు',
    hindiName: 'मानव मस्तिष्क और अनुमस्तिष्क',
    subheading: 'Neural Command Central • Hemispheres, Gyri & Brainstem',
    category: 'Nervous System',
    dimensions: 'Approx. 16.7 cm length × 14.0 cm width',
    weight: 'Approx. 1350g–1400g (adult)',
    curatorNotes: 'Rendered with anatomical precision recalling Thomas Willis’s Cerebri Anatome (1664) with the famous arterial Circle of Willis and cerebellar folia folds.',
    plinthPlaque: 'ENCEPHALON • MENS ET COGNITIO',
    colorPalette: {
      primary: '#9b72cf',
      secondary: '#6c49b8',
      highlight: '#f0e6ff',
      shadow: '#2a1a4a',
      wireframe: '#1b0f33'
    },
    pins: [
      {
        id: 'pin-br-1',
        number: 1,
        label: 'Frontal Lobe & Precentral Gyrus',
        latinName: 'Lobus Frontalis & Gyrus Precentralis',
        position: [0.45, 0.45, 0.55],
        description: 'Seat of executive function, personality, expressive speech (Broca’s area), and primary voluntary motor execution (Brodmann Area 4 motor homunculus).',
        bloodSupply: 'Anterior & middle cerebral arteries (ACA & MCA)',
        innervation: 'Cortical associative & corticospinal tract origins',
        clinicalSignificance: 'Lesions yield contralateral hemiparesis, behavioral disinhibition, and Broca’s expressive motor aphasia.',
        riskCategory: 'B'
      },
      {
        id: 'pin-br-2',
        number: 2,
        label: 'Temporal Lobe & Lateral Sulcus',
        latinName: 'Lobus Temporalis & Sulcus Lateralis (Sylvian Fissure)',
        position: [0.85, -0.1, 0.15],
        description: 'Processes auditory perception, verbal memory (dominant hippocampus), and language comprehension (Wernicke’s Area).',
        bloodSupply: 'Middle cerebral artery (M2/M3 branches)',
        innervation: 'Auditory radiation and medial temporal limbic circuitry',
        clinicalSignificance: 'Frequent epicenter for mesial temporal lobe epilepsy and glioblastoma multiforme (GBM).',
        riskCategory: 'B'
      },
      {
        id: 'pin-br-3',
        number: 3,
        label: 'Cerebellum & Foliated Vermis',
        latinName: 'Cerebellum & Vermis Cerebelli',
        position: [0, -0.65, -0.55],
        description: '"Little brain" featuring 80% of total brain neurons despite occupying only 10% volume; refines motor coordination, equilibrium, and precision timing.',
        bloodSupply: 'SCA, AICA, and PICA (Posterior Inferior Cerebellar Artery)',
        innervation: 'Purkinje cell inhibitory outflow to deep cerebellar nuclei',
        clinicalSignificance: 'Cerebellar strokes produce ipsilateral intention tremor, dysmetria, dysdiadochokinesia, and wide-based ataxic gait.',
        riskCategory: 'A'
      },
      {
        id: 'pin-br-4',
        number: 4,
        label: 'Brainstem (Pons & Medulla Oblongata)',
        latinName: 'Truncus Encephali (Pons & Medulla)',
        position: [0, -0.85, -0.15],
        description: 'Vital conduit linking cerebrum to spinal cord; houses respiratory/cardiac centers and nuclei for cranial nerves III through XII.',
        bloodSupply: 'Basilar artery and vertebral arteries',
        innervation: 'Reticular activating system (maintains wakefulness)',
        clinicalSignificance: 'Brainstem herniation through foramen magnum causes irreversible cardiorespiratory collapse and brain death.',
        riskCategory: 'D'
      }
    ],
    sections: [
      {
        plane: 'sagittal',
        label: 'Midsagittal Encephalic Cut',
        internalStructuresRevealed: [
          'Corpus callosum (genu, body, splenium)',
          'Third ventricle and cerebral aqueduct of Sylvius',
          'Thalamus and hypothalamus neuroendocrine hub',
          'Arbor vitae ("tree of life") white matter of the cerebellum'
        ],
        histologicalInsight: 'Demonstrates the pathway of cerebrospinal fluid (CSF) flow from lateral ventricles through aqueduct into the fourth ventricle.'
      }
    ],
    watercolourPlate: {
      title: 'Cerebellar Cortex & Purkinje Cells',
      latinName: 'Cortex Cerebelli et Neurona Purkinjensia',
      plateNumber: 'Plate V • Neuro-Histologia',
      magnification: '400× High-Power Field',
      stainType: 'Cajal’s Silver Nitrate Impregnation (Neurofibril Stain)',
      historicalContext: 'Rendered in antique sepia, amber, and indigo ink watercolor echoing Santiago Ramón y Cajal’s Nobel Prize-winning drawings of the intricate Purkinje dendritic arbor.',
      tissueType: 'Trilaminar Cerebellar Cortical Neuropil',
      description: 'The cerebellar cortex exhibits a rigid three-layered structure designed to perform high-speed motor error corrections: the outer molecular layer, the middle monolayer of massive Purkinje cells, and the dense inner granule cell layer.',
      layers: [
        {
          name: 'Molecular Layer (Superficial Neuropil)',
          colorHex: '#e8dff5',
          description: 'Paucicellular synaptic zone containing parallel fibers of granule cells, stellate cells, and basket cells.',
          cellularFeatures: 'Dense dendritic arbors of Purkinje cells branching perpendicular to parallel fibers.'
        },
        {
          name: 'Purkinje Cell Layer (Single Giant Cell Row)',
          colorHex: '#9b72cf',
          description: 'Sole output neurons of the cerebellar cortex; large pyriform cell bodies (~50–80 μm) projecting GABAergic inhibitory axons.',
          cellularFeatures: 'Massive apical dendritic tree fan with thousands of dendritic spines.'
        },
        {
          name: 'Granular Layer (Deep Densely Packed Layer)',
          colorHex: '#6c49b8',
          description: 'Contains roughly 50 billion tiny granule cells (the most numerous neurons in the entire human brain) and Golgi type II interneurons.',
          cellularFeatures: 'Tightly packed tiny round nuclei with heterochromatin clumped like lymphocytes.'
        },
        {
          name: 'Medullary White Matter (Arbor Vitae)',
          colorHex: '#fcfaf7',
          description: 'Myelinated afferent mossy fibers and climbing fibers, plus efferent Purkinje axons heading to deep cerebellar nuclei.',
          cellularFeatures: 'Oligodendrocytes, astrocytic foot processes, myelin sheaths.'
        }
      ],
      cytologyHighlights: [
        'Exquisite fan-shaped planar dendritic tree branching into the molecular layer',
        'Distinct GABAergic Nissl-rich perikarya with pale vesicular nuclei'
      ],
      dysplasiaMarkers: [
        'Nuclear atypia, hyperchromatism, and gemistocytic cytoplasm in high-grade diffuse astrocytoma / glioblastoma',
        'Pseudopalisading necrosis around microvascular glomeruoid proliferations'
      ]
    },
    quiz: [
      {
        id: 'quiz-br-1',
        question: 'Which cortical Brodmann area is situated in the inferior frontal gyrus of the dominant hemisphere and governs speech production?',
        clinicalScenario: 'A 64-year-old stroke patient understands spoken commands perfectly but struggles to articulate sentences, speaking in slow, non-fluent telegraphic phrases.',
        options: [
          'Broca’s Area (Brodmann Areas 44 & 45)',
          'Wernicke’s Area (Brodmann Area 22)',
          'Primary Visual Cortex (Brodmann Area 17)',
          'Primary Auditory Cortex (Brodmann Areas 41 & 42)'
        ],
        correctAnswerIndex: 0,
        explanation: 'Broca’s area (BA 44/45 in posterior inferior frontal gyrus) plans motor phonation sequences. Damage causes expressive (motor) aphasia with preserved comprehension.',
        clinicalPearl: 'Contrasts with Wernicke’s aphasia, where speech is fluent but devoid of meaningful semantic content.'
      }
    ],
    aiSimulations: [
      {
        id: 'sim-br-normal',
        name: 'Normal Symmetric Cortical Symmetrical Gyri',
        category: 'A',
        categoryTitle: 'Category A: Normal Cerebral Morphology',
        riskScore: 0.03,
        confidence: 0.99,
        tissueDescription: 'Intact cortical mantle with age-appropriate sulcal depth; midline falx cerebri perfectly centered without deviation.',
        aiFindings: [
          'Ventricular symmetry with preserved periventricular white matter',
          'Zero restricted diffusion (DWI) or perfusion deficits across vascular territories'
        ],
        biomarkers: [
          { name: 'Midline Shift', value: '0.0 mm (None)', status: 'normal' },
          { name: 'Cortical Thickness', value: '3.2 mm (Normal)', status: 'normal' }
        ],
        clinicalTriage: 'Category A: Normal brain architecture. Routine neurological health.',
        recommendedAction: 'Maintain cognitive engagement, aerobic fitness, and cardiovascular risk factor control.'
      },
      {
        id: 'sim-br-stroke',
        name: 'Acute Middle Cerebral Artery (MCA) Ischemic Stroke',
        category: 'D',
        categoryTitle: 'Category D: Acute Neurological Emergency',
        riskScore: 0.98,
        confidence: 0.99,
        tissueDescription: 'Loss of gray-white differentiation along the insular ribbon and effacement of cortical sulci in right fronto-parietal cortex.',
        aiFindings: [
          'Hyperdense MCA sign indicating acute thromboembolic occlusion',
          'Ischemic core volume estimated at 38 mL with large salvageable penumbra',
          'Time from last known well: 110 minutes (within IV-thrombolysis window)'
        ],
        biomarkers: [
          { name: 'Ischemic Core', value: '38 mL', status: 'critical' },
          { name: 'Penumbra Ratio', value: '3.4 (Salvageable)', status: 'concerning' },
          { name: 'ASPECTS Score', value: '7 / 10', status: 'concerning' }
        ],
        clinicalTriage: 'Category D: Code Stroke activation for immediate IV tPA / Tenecteplase and endovascular thrombectomy.',
        recommendedAction: 'Emergency mechanical thrombectomy within comprehensive stroke center protocol.'
      }
    ]
  },
  {
    id: 'stomach',
    name: 'Stomach & Gastric Rugae',
    latinName: 'Ventriculus seu Gaster',
    teluguName: 'జీర్ణాశయం మరియు గ్యాస్ట్రిక్ శ్లేష్మం',
    hindiName: 'आमाशय और जठर श्लेष्मल',
    subheading: 'Acid Reservoir • Cardia, Fundus, Pylorus & Mucosal Folds',
    category: 'Digestive',
    dimensions: 'Approx. 25.0 cm length × 12.0 cm width',
    weight: 'Approx. 150g (empty muscular organ)',
    curatorNotes: 'Emphasizing the dramatic undulating folds of the internal gastric rugae (plicae gastricae) and the acid-producing parietal oxyntic cell architecture.',
    plinthPlaque: 'VENTRICULUS • CHYMUS ET DIGESTIO',
    colorPalette: {
      primary: '#c97a63',
      secondary: '#8c4835',
      highlight: '#fcebe6',
      shadow: '#4a2016',
      wireframe: '#2b120c'
    },
    pins: [
      {
        id: 'pin-st-1',
        number: 1,
        label: 'Gastric Fundus (Gas Cap Dome)',
        latinName: 'Fundus Gastricus',
        position: [-0.55, 0.75, 0.1],
        description: 'Dome-shaped upper portion projecting superiorly above the cardiac orifice, usually filled with swallowed air (stomach bubble on chest X-ray).',
        bloodSupply: 'Short gastric arteries (branches of splenic artery)',
        innervation: 'Anterior & posterior vagal trunks',
        clinicalSignificance: 'Site for fundic gland polyps and gastric varices in portal hypertension.',
        riskCategory: 'A'
      },
      {
        id: 'pin-st-2',
        number: 2,
        label: 'Gastric Body & Internal Rugae',
        latinName: 'Corpus Gastricum & Plicae Gastricae',
        position: [-0.2, 0.05, 0.35],
        description: 'Largest middle reservoir segment whose inner mucosal lining forms longitudinal corrugated rugal folds that flatten as the stomach distends with food.',
        bloodSupply: 'Left gastric artery (from celiac trunk) & right gastroepiploic artery',
        innervation: 'Vagus nerve (secretomotor to parietal cells)',
        clinicalSignificance: 'Home to acid-producing oxyntic glands; susceptible to NSAID and Helicobacter pylori ulcerations.',
        riskCategory: 'B'
      },
      {
        id: 'pin-st-3',
        number: 3,
        label: 'Pyloric Antrum & Sphincter',
        latinName: 'Antrum Pyloricum & Musculus Sphincter Pyloricus',
        position: [0.75, -0.45, 0.15],
        description: 'Heavily muscled funnel-like exit ring metering the passage of acidified chyme into the duodenal bulb.',
        bloodSupply: 'Right gastric artery & gastroduodenal artery',
        innervation: 'Vagus nerve & sympathetic celiac ganglion fibers',
        clinicalSignificance: 'Most frequent site for H. pylori peptic ulcers and intestinal-type gastric adenocarcinoma.',
        oncologyFocus: 'Presents with early satiety, postprandial vomiting, and iron-deficiency anemia.',
        riskCategory: 'D'
      },
      {
        id: 'pin-st-4',
        number: 4,
        label: 'Lesser Curvature & Incisura Angularis',
        latinName: 'Curvatura Gastrica Minor',
        position: [0.15, 0.35, -0.1],
        description: 'Shorter right border connecting esophagus to pylorus; suspension site for the hepatogastric ligament (lesser omentum).',
        bloodSupply: 'Anastomosis of left and right gastric arteries',
        innervation: 'Nerve of Latarjet (anterior vagal branch)',
        clinicalSignificance: 'Angular notch (incisura angularis) is a frequent site for chronic benign and malignant ulcers.',
        riskCategory: 'B'
      }
    ],
    sections: [
      {
        plane: 'coronal',
        label: 'Coronal Gastric Window (Bivalve Opening)',
        internalStructuresRevealed: [
          'Thick muscularis externa (inner oblique, middle circular, outer longitudinal)',
          'Longitudinal gastric rugae lining the corpus',
          'Smooth pyloric canal and thickened circular muscular sphincter',
          'Duodenal transition zone with Brunner’s glands'
        ],
        histologicalInsight: 'Reveals early gastric cancer limited to mucosa/submucosa (T1) vs advanced muscularis propria invasion (T2).'
      }
    ],
    watercolourPlate: {
      title: 'Gastric Mucosa & Oxyntic Parietal Glands',
      latinName: 'Glandulae Gastricae Oxynthicae',
      plateNumber: 'Plate VI • Systema Digestorium',
      magnification: '400× High-Power Micrograph',
      stainType: 'Periodic Acid-Schiff (PAS) with Alcian Blue & Hematoxylin',
      historicalContext: 'Rendered in warm terracotta and burnt umber watercolors depicting the glandular pits and deep intracellular secretory canaliculi of parietal cells.',
      tissueType: 'Simple Columnar Glandular Epithelium',
      description: 'The gastric mucosa produces approximately 2 to 3 liters of gastric juice daily containing hydrochloric acid (pH 1.5–2.0), pepsinogen, and intrinsic factor (essential for vitamin B12 absorption in the terminal ileum).',
      layers: [
        {
          name: 'Surface Mucous Foveolar Cells',
          colorHex: '#fcebe6',
          description: 'Simple columnar cells with apical mucin granules secreting an alkaline, bicarbonate-rich protective mucus gel.',
          cellularFeatures: 'PAS-positive neutral mucins guarding mucosa against auto-digestion.'
        },
        {
          name: 'Parietal (Oxyntic) Cells',
          colorHex: '#e07a5f',
          description: 'Large pyramid-shaped eosinophilic cells packed with mitochondria, secreting HCl and Intrinsic Factor.',
          cellularFeatures: 'Intracellular canaliculi with microvilli containing H+/K+ ATPase proton pumps.'
        },
        {
          name: 'Chief (Zymogenic) Cells',
          colorHex: '#3d405b',
          description: 'Basophilic cells located at the base of gastric glands secreting pepsinogen proenzymes.',
          cellularFeatures: 'Extensive rough endoplasmic reticulum, apical zymogen granules.'
        },
        {
          name: 'Enteroendocrine (G & ECL) Cells',
          colorHex: '#81b29a',
          description: 'Neuroendocrine cells releasing gastrin (G cells in antrum) and histamine (ECL cells) to stimulate acid output.',
          cellularFeatures: 'Basal secretory granules discharging into capillary bloodstream.'
        }
      ],
      cytologyHighlights: [
        'Continuous protective bicarbonate-rich mucous layer capping foveolar pits',
        'Abundant brightly eosinophilic parietal cells with central round nuclei'
      ],
      dysplasiaMarkers: [
        'Intestinal metaplasia featuring Alcian blue-positive goblet cells replacing normal gastric foveolar lining',
        'Signet ring cell carcinoma: intracellular mucin droplets pushing hyperchromatic nuclei to the cell periphery'
      ]
    },
    quiz: [
      {
        id: 'quiz-st-1',
        question: 'Which gastric cell type secretes Intrinsic Factor, essential for vitamin B12 absorption?',
        clinicalScenario: 'A 56-year-old patient with autoimmune atrophic gastritis develops macrocytic anemia and peripheral glove-and-stocking neuropathy.',
        options: [
          'Chief (zymogenic) cells',
          'Parietal (oxyntic) cells',
          'Surface mucous foveolar cells',
          'Enterochromaffin-like (ECL) cells'
        ],
        correctAnswerIndex: 1,
        explanation: 'Parietal cells secrete both Hydrochloric Acid (HCl) and Intrinsic Factor. Autoimmune destruction of parietal cells causes pernicious anemia due to failure of terminal ileal vitamin B12 absorption.',
        clinicalPearl: 'Macrocytic megaloblastic anemia with hypersegmented neutrophils is the hematological signature of B12 deficiency.'
      }
    ],
    aiSimulations: [
      {
        id: 'sim-st-normal',
        name: 'Normal Gastric Mucosal Folds (Rugae)',
        category: 'A',
        categoryTitle: 'Category A: Healthy Gastric Mucosa',
        riskScore: 0.05,
        confidence: 0.96,
        tissueDescription: 'Uniform velvety orange-pink gastric mucosa with supple, distensible rugal folds and clear glistening mucus cap.',
        aiFindings: [
          'Normal microvascular mucosal pit pattern (Type I regular circular)',
          'No mucosal erosions, petechiae, or indurated ulcer edges'
        ],
        biomarkers: [
          { name: 'Rugal Suppleness', value: '100% Distensible', status: 'normal' },
          { name: 'Gastric Acidity', value: 'pH 1.8 (Normal)', status: 'normal' }
        ],
        clinicalTriage: 'Category A: Normal digestive architecture. Standard preventive dietary lifestyle.',
        recommendedAction: 'Maintain balanced dietary fiber and moderate spice/alcohol intake.'
      },
      {
        id: 'sim-st-ulcer',
        name: 'Antral Ulcer with Irregular Margins (Malignancy Suspicion)',
        category: 'D',
        categoryTitle: 'Category D: Urgent Endoscopic Biopsy Required',
        riskScore: 0.92,
        confidence: 0.95,
        tissueDescription: 'Excavated 18mm crater-like ulcer in the gastric prepyloric antrum with nodular, everted, non-distensible rolled borders.',
        aiFindings: [
          'Abrupt disruption of converging mucosal rugal folds at ulcer border',
          'Atypical neoangiogenesis with micro-hemorrhagic stigmata',
          'High correlation with Borrmann Type II ulcerated gastric carcinoma'
        ],
        biomarkers: [
          { name: 'Ulcer Border Nodularity', value: 'Severe Everted', status: 'critical' },
          { name: 'Malignancy Predictor', value: '0.92 (High)', status: 'critical' }
        ],
        clinicalTriage: 'Category D: Urgent Esophagogastroduodenoscopy (EGD) with at least 6–8 targeted mucosal biopsies.',
        recommendedAction: 'Expedited gastroenterology referral for endoscopic biopsy and rapid urease test for H. pylori.'
      }
    ]
  },
  {
    id: 'liver',
    name: 'Liver & Biliary Apparatus',
    latinName: 'Hepar et Vesica Biliaris',
    teluguName: 'కాలేయం మరియు పిత్తాశయం',
    hindiName: 'यकृत और पित्ताशय',
    subheading: 'Metabolic Engine • Hepatic Lobules, Portal Triads & Gallbladder',
    category: 'Digestive & Metabolic',
    dimensions: 'Approx. 28.0 cm width × 16.0 cm height',
    weight: 'Approx. 1500g (largest internal organ)',
    curatorNotes: 'Etched with reverence for Albrecht von Haller’s vascular anatomical descriptions, detailing the dual blood supply (hepatic artery & portal vein) and the biliary arborization.',
    plinthPlaque: 'HEPAR • METABOLISMO ET VITA',
    colorPalette: {
      primary: '#7a3b34',
      secondary: '#4d1e19',
      highlight: '#d48c84',
      shadow: '#2b100d',
      wireframe: '#1a0a08'
    },
    pins: [
      {
        id: 'pin-lv-1',
        number: 1,
        label: 'Right Hepatic Lobe',
        latinName: 'Lobus Hepatis Dexter',
        position: [0.65, 0.1, 0.1],
        description: 'Largest lobe comprising roughly five-sixths of total hepatic volume; subdivided into segments V, VI, VII, and VIII in the Couinaud classification.',
        bloodSupply: 'Right hepatic artery & right portal vein branch',
        innervation: 'Hepatic autonomic plexus (celiac plexus & vagus)',
        clinicalSignificance: 'Most frequent site for amebic liver abscesses, hydatid cysts, and colorectal cancer metastases.',
        riskCategory: 'B'
      },
      {
        id: 'pin-lv-2',
        number: 2,
        label: 'Gallbladder & Cystic Duct',
        latinName: 'Vesica Biliaris & Ductus Cysticus',
        position: [0.35, -0.55, 0.35],
        description: 'Pear-shaped reservoir nestled on the inferior visceral surface between right and quadrate lobes; concentrates hepatic bile 5- to 10-fold.',
        bloodSupply: 'Cystic artery (usually from right hepatic artery in Calot’s triangle)',
        innervation: 'Celiac plexus, vagus nerve, and right phrenic nerve (referred shoulder pain)',
        clinicalSignificance: 'Cholelithiasis (gallstones), acute calculous cholecystitis (positive Murphy’s sign), and gallbladder adenocarcinoma.',
        riskCategory: 'B'
      },
      {
        id: 'pin-lv-3',
        number: 3,
        label: 'Falciform Ligament & Ligamentum Teres',
        latinName: 'Ligamentum Falciforme Hepatis & Ligamentum Teres',
        position: [-0.05, 0.35, 0.45],
        description: 'Sickle-shaped peritoneal fold connecting anterior liver surface to ventral abdominal wall; free lower edge contains the obliterated umbilical vein.',
        bloodSupply: 'Accessory phrenic & epigastric arterial twigs',
        innervation: 'Peritoneal sensory branches',
        clinicalSignificance: 'Obliterated umbilical vein recanalizes in portal hypertension, giving rise to "caput medusae" periumbilical venous collaterals.',
        riskCategory: 'A'
      },
      {
        id: 'pin-lv-4',
        number: 4,
        label: 'Porta Hepatis (Hepatic Hilum)',
        latinName: 'Porta Hepatis',
        position: [0.05, -0.3, -0.2],
        description: 'Deep transverse fissure on visceral surface transmitting the portal triad: Portal Vein (posterior), Hepatic Artery Proper (anterior left), Common Bile Duct (anterior right).',
        bloodSupply: 'Supplies 75% of liver flow via portal vein and 25% via hepatic artery',
        innervation: 'Hepatic plexus',
        clinicalSignificance: 'Target site for the Pringle maneuver (cross-clamping hepatoduodenal ligament) to arrest catastrophic liver hemorrhage.',
        riskCategory: 'D'
      }
    ],
    sections: [
      {
        plane: 'transverse',
        label: 'Transverse Section Across Couinaud Segments',
        internalStructuresRevealed: [
          'Three major hepatic veins (Right, Middle, Left) draining into the IVC',
          'Bifurcation of the portal vein and hepatic arterial branches',
          'Central vein drainage of classic hepatic lobules',
          'Interlobular connective tissue septa'
        ],
        histologicalInsight: 'Demonstrates functional anatomical independence of each of the 8 Couinaud liver segments, permitting anatomical subsegmentectomy.'
      }
    ],
    watercolourPlate: {
      title: 'Classical Hepatic Lobule & Portal Triad',
      latinName: 'Lobulus Hepaticus Classicus et Trias Portalis',
      plateNumber: 'Plate VII • Systema Hepatobiliarium',
      magnification: '200× Microscopic Overview',
      stainType: 'Hematoxylin & Eosin (H&E) with Reticulin Silver Impregnation',
      historicalContext: 'Rendered in raw umber and verdigris watercolor tones echoing early 20th-century histological plates of the functional hepatic acinus of Rappaport.',
      tissueType: 'Epithelial Parenchyma with Fenestrated Sinusoidal Capillaries',
      description: 'The classic hepatic lobule is a hexagonal prism centered on a Central Terminal Hepatic Venule, with Portal Triads situated at the peripheral vertices. Hepatocyte plates radiate outward like spokes of a wheel.',
      layers: [
        {
          name: 'Hepatocyte Plates & Cords',
          colorHex: '#7a3b34',
          description: 'Polyhedral parenchymal cells with central round nuclei (frequently binucleate), performing protein synthesis, bile formation, and detoxification.',
          cellularFeatures: 'Abundant mitochondria, peroxisomes, and smooth endoplasmic reticulum.'
        },
        {
          name: 'Fenestrated Hepatic Sinusoids',
          colorHex: '#d48c84',
          description: 'Specialized low-pressure capillary channels lined by discontinuous endothelial cells lacking a continuous basement membrane.',
          cellularFeatures: 'Permits direct macromolecular transit between blood and hepatocytes via Space of Disse.'
        },
        {
          name: 'Kupffer Cells (Stellate Macrophages)',
          colorHex: '#4d1e19',
          description: 'Resident mononuclear phagocytes anchored within sinusoidal lumen destroying gut-derived bacteria and aged red blood cells.',
          cellularFeatures: 'Phagocytose particulate matter, foreign antigens, and senescent erythrocytes.'
        },
        {
          name: 'Portal Triad Elements',
          colorHex: '#2a5a3b',
          description: 'Interlobular bile ductule (cuboidal epithelium), portal venule branch (wide thin-walled lumen), and hepatic arteriole branch.',
          cellularFeatures: 'Surrounded by Glisson’s fibrous capsule connective tissue sheath.'
        }
      ],
      cytologyHighlights: [
        'Organized radiating cords of hepatocytes separated by wide fenestrated sinusoidal spaces',
        'Normal Space of Disse containing quiescent vitamin A-storing Ito (hepatic stellate) cells'
      ],
      dysplasiaMarkers: [
        'Bridge-like fibrous septa dissecting lobules and regenerating nodule formation in micronodular cirrhosis',
        'Atypical thick hepatocyte trabeculae (> 3 cells wide) with prominent nucleoli in Hepatocellular Carcinoma (HCC)'
      ]
    },
    quiz: [
      {
        id: 'quiz-lv-1',
        question: 'Which vessel provides approximately 75% of total blood flow to the liver parenchyma?',
        clinicalScenario: 'During trauma surgery for hepatic laceration, a surgeon evaluates vascular inflow into the liver.',
        options: [
          'Hepatic Artery Proper',
          'Hepatic Portal Vein',
          'Inferior Vena Cava',
          'Splenic Artery'
        ],
        correctAnswerIndex: 1,
        explanation: 'The Hepatic Portal Vein provides about 75% of total hepatic blood flow (rich in absorbed nutrients and pancreatic hormones, though partially deoxygenated). The Hepatic Artery provides the remaining 25% (oxygen-rich).',
        clinicalPearl: 'Hepatocellular Carcinoma preferentially recruits arterial neo-vascularization, causing characteristic arterial-phase hyperenhancement on CT.'
      }
    ],
    aiSimulations: [
      {
        id: 'sim-lv-normal',
        name: 'Normal Smooth Hepatic Parenchyma',
        category: 'A',
        categoryTitle: 'Category A: Normal Liver Architecture',
        riskScore: 0.05,
        confidence: 0.97,
        tissueDescription: 'Uniform mahogany-brown liver with sharp, smooth inferior margins and glistening transparent Glisson’s capsule.',
        aiFindings: [
          'Homogeneous acoustic liver-spleen attenuation index',
          'Normal caliber portal vein (11 mm) and clear non-dilated intrahepatic bile ducts'
        ],
        biomarkers: [
          { name: 'Liver Stiffness (Elastography)', value: '4.8 kPa (Normal)', status: 'normal' },
          { name: 'Portal Vein Caliber', value: '11 mm (Normal)', status: 'normal' }
        ],
        clinicalTriage: 'Category A: Normal metabolic organ health. Annual routine preventive check.',
        recommendedAction: 'Maintain balanced metabolic health and avoid hepatotoxic medications.'
      },
      {
        id: 'sim-lv-hcc',
        name: 'Arterially Enhancing Mass in Segment VIII (Suspected HCC)',
        category: 'D',
        categoryTitle: 'Category D: Urgent Liver Tumor Board Review',
        riskScore: 0.95,
        confidence: 0.96,
        tissueDescription: 'Solitary 3.8 cm hypervascular nodular lesion in Couinaud Segment VIII with rapid contrast washout in the venous phase on dynamic scan.',
        aiFindings: [
          'Classic LI-RADS 5 observation: arterial phase hyper-enhancement with late washout and peripheral pseudocapsule',
          'Serum Alpha-fetoprotein (AFP) elevated at 480 ng/mL'
        ],
        biomarkers: [
          { name: 'LI-RADS Classification', value: 'LR-5 (Definite HCC)', status: 'critical' },
          { name: 'Serum Alpha-Fetoprotein', value: '480 ng/mL (Critical)', status: 'critical' }
        ],
        clinicalTriage: 'Category D: Expedited multi-disciplinary hepatobiliary oncology referral for resection vs ablation candidacy.',
        recommendedAction: 'Immediate tertiary cancer center review for surgical resection, microwave ablation, or TACE evaluation.'
      }
    ]
  },
  {
    id: 'kidney',
    name: 'Renal Unit & Adrenal Gland',
    latinName: 'Ren et Glandula Suprarenalis',
    teluguName: 'మూత్రపిండం మరియు అడ్రినల్ గ్రంధి',
    hindiName: 'गुर्दा (वृक्क) और अधिवृक्क ग्रंथि',
    subheading: 'Filtration Apparatus • Glomeruli, Medullary Pyramids & Pelvis',
    category: 'Urinary & Endocrine',
    dimensions: 'Approx. 11.0 cm length × 6.0 cm width × 3.0 cm thickness',
    weight: 'Approx. 140g–150g each',
    curatorNotes: 'Illuminated in the style of Ruysch and William Cheselden, exposing the renal calyces, the arcuate arterial arches, and the golden pyramid-shaped adrenal gland cap.',
    plinthPlaque: 'REN HUMANUS • FILTRATIO ET REGULATIO',
    colorPalette: {
      primary: '#9c4146',
      secondary: '#662226',
      highlight: '#f7d6d8',
      shadow: '#381113',
      wireframe: '#240a0b'
    },
    pins: [
      {
        id: 'pin-kd-1',
        number: 1,
        label: 'Renal Cortex & Glomerular Zone',
        latinName: 'Cortex Renis',
        position: [0.6, 0.25, 0.15],
        description: 'Outer granular band (approx. 1 cm thick) containing over 1 million microscopic nephron glomeruli and convoluted tubules.',
        bloodSupply: 'Interlobular & afferent arterioles',
        innervation: 'Renal plexus (sympathetic T10–L1 vasoconstrictor)',
        clinicalSignificance: 'Target of autoimmune glomerulonephritis, diabetic glomerulosclerosis, and malignant renal cell carcinoma (RCC).',
        riskCategory: 'B'
      },
      {
        id: 'pin-kd-2',
        number: 2,
        label: 'Renal Medullary Pyramids & Papillae',
        latinName: 'Pyramides Renales & Papillae',
        position: [0.2, 0.1, 0.2],
        description: '8–12 striated conical segments containing the loops of Henle and collecting ducts, culminating in papillae discharging urine into minor calyces.',
        bloodSupply: 'Vasa recta (from efferent arterioles of juxtamedullary nephrons)',
        innervation: 'Renal autonomic plexus',
        clinicalSignificance: 'Subject to renal papillary necrosis in diabetic microangiopathy and analgesic nephropathy.',
        riskCategory: 'B'
      },
      {
        id: 'pin-kd-3',
        number: 3,
        label: 'Renal Pelvis & Pelviureteric Junction (PUJ)',
        latinName: 'Pelvis Renalis & Junctio Ureteropelvica',
        position: [-0.45, -0.3, 0.05],
        description: 'Funnel-shaped urine collector formed by confluence of major calyces, tapering inferiorly into the ureter.',
        bloodSupply: 'Renal artery branches',
        innervation: 'Intrinsic pacemaker peristaltic contractions',
        clinicalSignificance: 'Common site of congenital PUJ obstruction and obstructive staghorn calculus nephrolithiasis.',
        riskCategory: 'D'
      },
      {
        id: 'pin-kd-4',
        number: 4,
        label: 'Suprarenal (Adrenal) Gland',
        latinName: 'Glandula Suprarenalis',
        position: [0.15, 0.85, 0.1],
        description: 'Crescent-shaped endocrine cap perched on superior renal pole, divided into an outer steroidogenic cortex and inner catecholamine-secreting medulla.',
        bloodSupply: 'Superior, middle, and inferior suprarenal arteries',
        innervation: 'Direct preganglionic sympathetic fibers from greater splanchnic nerve',
        clinicalSignificance: 'Site for pheochromocytoma, Cushing syndrome adenomas, and Addison disease failure.',
        riskCategory: 'A'
      }
    ],
    sections: [
      {
        plane: 'coronal',
        label: 'Coronal Bisection of the Kidney',
        internalStructuresRevealed: [
          'Outer granular cortex and cortical columns of Bertin',
          '8–12 medullary pyramids with radiating medullary rays',
          'Minor and major calyces funneling into the renal pelvis',
          'Renal sinus fat and arcuate vascular arcades'
        ],
        histologicalInsight: 'Clearly distinguishes corticomedullary differentiation, the primary ultrasound indicator of chronic kidney disease (CKD).'
      }
    ],
    watercolourPlate: {
      title: 'Nephron Glomerulus & Bowman’s Filtration Capsule',
      latinName: 'Corpusculum Renale et Capsula Glomeruli',
      plateNumber: 'Plate VIII • Systema Urogenitale',
      magnification: '600× Oil-Immersion Micrograph',
      stainType: 'Jones’ Methenamine Silver (JMS) with Periodic Acid Counterstain',
      historicalContext: 'Painted in subtle silver-black, rose, and aquamarine watercolors detailing the fenestrated capillary tufts discovered by Marcello Malpighi in 1666.',
      tissueType: 'Specialized Microvascular Filtration Barrier with Podocytes',
      description: 'The renal corpuscle filters roughly 180 liters of primary ultrafiltrate daily. The filtration barrier excludes albumin and circulating blood cells while allowing water, electrolytes, glucose, and urea to pass freely.',
      layers: [
        {
          name: 'Fenestrated Glomerular Capillary Endothelium',
          colorHex: '#9c4146',
          description: 'Lined with round 70–100 nm pores that prevent passage of red blood cells while presenting low resistance to water.',
          cellularFeatures: 'Covered with negatively charged sialoglycoproteins repelling anionic serum proteins.'
        },
        {
          name: 'Glomerular Basement Membrane (GBM)',
          colorHex: '#381113',
          description: 'Thick (300 nm) trilaminar mesh composed of Type IV collagen, laminin, and heparan sulfate proteoglycans.',
          cellularFeatures: 'Lamina rara interna, lamina densa, and lamina rara externa.'
        },
        {
          name: 'Visceral Podocytes & Slit Diaphragms',
          colorHex: '#81b29a',
          description: 'Octopus-like epithelial cells with interdigitating foot processes (pedicels) wrapping around capillary loops.',
          cellularFeatures: 'Slit diaphragms composed of nephrin and podocin spanning 30–40 nm gaps.'
        },
        {
          name: 'Mesangial Cells & Matrix',
          colorHex: '#e07a5f',
          description: 'Contractile support cells nestled between capillary loops providing structural scaffolding and phagocytosing trapped immune complexes.',
          cellularFeatures: 'Receptor-mediated contraction in response to angiotensin II regulating filtration surface area.'
        }
      ],
      cytologyHighlights: [
        'Delicate lace-like patent glomerular capillary loops without wire-loop thickening',
        'Intact podocyte foot processes with uniform slit diaphragm spacing'
      ],
      dysplasiaMarkers: [
        'Diffuse podocyte effacement (foot process fusion) in nephrotic syndrome / minimal change disease',
        'Clear cell nests with lipid and glycogen-rich clear cytoplasm in Clear Cell Renal Cell Carcinoma (ccRCC)'
      ]
    },
    quiz: [
      {
        id: 'quiz-kd-1',
        question: 'Which molecular component of the podocyte slit diaphragm is mutated in congenital nephrotic syndrome of the Finnish type?',
        clinicalScenario: 'A newborn presents with severe generalized anasarca, massive proteinuria, and hypoalbuminemia within the first week of life.',
        options: [
          'Nephrin (NPHS1 gene)',
          'Podocin (NPHS2 gene)',
          'Type IV Collagen (COL4A5)',
          'Uromodulin'
        ],
        correctAnswerIndex: 0,
        explanation: 'Mutations in the NPHS1 gene encoding the slit diaphragm protein Nephrin cause Finnish-type congenital nephrotic syndrome, characterized by immediate loss of the charge and size-selective glomerular filtration barrier.',
        clinicalPearl: 'Nephrin serves as the structural zipper holding adjacent podocyte pedicels together.'
      }
    ],
    aiSimulations: [
      {
        id: 'sim-kd-normal',
        name: 'Normal Renal Corticomedullary Architecture',
        category: 'A',
        categoryTitle: 'Category A: Normal Renal Architecture',
        riskScore: 0.04,
        confidence: 0.98,
        tissueDescription: 'Smooth bean-shaped kidney with crisp corticomedullary differentiation, normal cortical thickness (15 mm), and empty non-dilated collecting calyces.',
        aiFindings: [
          'Estimated Glomerular Filtration Rate (eGFR) calculated at 104 mL/min/1.73m²',
          'Absence of hydronephrosis, calculus shadowing, or solid parenchymal masses'
        ],
        biomarkers: [
          { name: 'Estimated GFR', value: '104 mL/min (Optimal)', status: 'normal' },
          { name: 'Cortical Thickness', value: '15 mm (Normal)', status: 'normal' }
        ],
        clinicalTriage: 'Category A: Optimal renal function. Routine annual health maintenance.',
        recommendedAction: 'Maintain adequate hydration and routine blood pressure monitoring.'
      },
      {
        id: 'sim-kd-mass',
        name: 'Exophytic Upper Pole Renal Mass (Suspected Renal Cell Carcinoma)',
        category: 'D',
        categoryTitle: 'Category D: Urgent Urologic Oncology Referral',
        riskScore: 0.94,
        confidence: 0.95,
        tissueDescription: 'Well-circumscribed heterogeneous 4.5 cm solid mass arising from the upper pole renal cortex displaying hypervascularity and central necrosis.',
        aiFindings: [
          'Bosniak Category IV solid enhancing renal lesion',
          'Renal vein lumen clear without tumor thrombus extension',
          'Clinical triad suspicion: Microscopic hematuria flagged on urinalysis'
        ],
        biomarkers: [
          { name: 'Bosniak Category', value: 'IV (Solid Enhancing)', status: 'critical' },
          { name: 'Mass Diameter', value: '45 mm (T1b)', status: 'critical' }
        ],
        clinicalTriage: 'Category D: Urgent referral to urologic oncology for robotic partial vs radical nephrectomy.',
        recommendedAction: 'Expedited triple-phase contrast CT abdomen/pelvis and chest staging.'
      }
    ]
  },
  {
    id: 'eye',
    name: 'Visual Apparatus & Optic Tract',
    latinName: 'Bulbus Oculi et Nervus Opticus',
    teluguName: 'కన్ను మరియు ఆప్టిక్ నాడి',
    hindiName: 'नेत्र गोलक और दृष्टि तंत्रिका',
    subheading: 'Optical Biosensor • Cornea, Lens, Retina & Optic Disc',
    category: 'Sensory',
    dimensions: 'Approx. 24.0 mm anteroposterior diameter',
    weight: 'Approx. 7.5g (globe alone)',
    curatorNotes: 'Rendered with inspiration from Alhazen’s Book of Optics and Santiago Ramón y Cajal’s retinal neuronal circuitry diagrams showing rod and cone phototransduction.',
    plinthPlaque: 'BULBUS OCULI • LUX ET VISIO',
    colorPalette: {
      primary: '#2b6cb0',
      secondary: '#1a365d',
      highlight: '#bee3f8',
      shadow: '#0d1b2a',
      wireframe: '#08111a'
    },
    pins: [
      {
        id: 'pin-ey-1',
        number: 1,
        label: 'Transparent Cornea & Anterior Chamber',
        latinName: 'Cornea & Camera Anterior Bulbi',
        position: [0, 0.1, 0.85],
        description: 'Avascular transparent crystal window providing roughly two-thirds (approx. 43 diopters) of the total refractive power of the human eye.',
        bloodSupply: 'Avascular (nourished by atmospheric oxygen & aqueous humor)',
        innervation: 'Long ciliary nerves (ophthalmic branch of trigeminal, CN V1)',
        clinicalSignificance: 'Rich in free nerve endings (intensely painful if abraded); vulnerable to keratoconus, corneal ulcers, and pterygium.',
        riskCategory: 'B'
      },
      {
        id: 'pin-ey-2',
        number: 2,
        label: 'Iris Diaphragm & Pupil',
        latinName: 'Iris & Pupilla',
        position: [0, 0.1, 0.65],
        description: 'Pigmented contractile curtain regulating intraocular light entry through pupillary aperture via sphincter and dilator muscles.',
        bloodSupply: 'Major arterial circle of the iris (from anterior & long posterior ciliary arteries)',
        innervation: 'Parasympathetic CN III (constriction / miosis) & Sympathetic T1 (dilation / mydriasis)',
        clinicalSignificance: 'Target of anterior uveitis, rubeosis iridis (diabetic neovascularization), and angle-closure glaucoma.',
        riskCategory: 'A'
      },
      {
        id: 'pin-ey-3',
        number: 3,
        label: 'Crystalline Biconvex Lens',
        latinName: 'Lens Crystallina',
        position: [0, 0.1, 0.45],
        description: 'Flexible transparent biconvex optical element suspended by zonular fibers behind the iris, adjusting focal distance for near vision (accommodation).',
        bloodSupply: 'Avascular (nourished by aqueous and vitreous humors)',
        innervation: 'No sensory nerve fibers',
        clinicalSignificance: 'Progressive clouding forms cataracts (leading cause of curable blindness worldwide); loss of elasticity causes presbyopia.',
        riskCategory: 'B'
      },
      {
        id: 'pin-ey-4',
        number: 4,
        label: 'Retina, Macula Lutea & Fovea Centralis',
        latinName: 'Retina, Macula Lutea & Fovea Centralis',
        position: [0.15, -0.15, -0.75],
        description: 'Ten-layered light-sensitive neurosensory tunic lining inner globe; macula lutea contains the fovea centralis responsible for sharp 20/20 daylight color acuity.',
        bloodSupply: 'Central retinal artery (branch of ophthalmic artery) & choroidal choriocapillaris',
        innervation: 'Optic nerve fibers (axons of retinal ganglion cells)',
        clinicalSignificance: 'Vulnerable to diabetic retinopathy, age-related macular degeneration (AMD), and rhegmatogenous retinal detachment.',
        riskCategory: 'D'
      },
      {
        id: 'pin-ey-5',
        number: 5,
        label: 'Optic Nerve & Optic Disc (Blind Spot)',
        latinName: 'Nervus Opticus (CN II) & Discus Nervi Optici',
        position: [-0.35, 0.05, -0.9],
        description: 'Composed of roughly 1.2 million myelinated ganglion cell axons transmitting visual signals to the lateral geniculate nucleus and visual cortex.',
        bloodSupply: 'Short posterior ciliary arteries & central retinal artery',
        innervation: 'Special somatic sensory (Vision, Cranial Nerve II)',
        clinicalSignificance: 'Cupping in open-angle glaucoma; bilateral swelling (papilledema) indicates elevated intracranial pressure.',
        riskCategory: 'D'
      }
    ],
    sections: [
      {
        plane: 'sagittal',
        label: 'Horizontal Meridio-Sagittal Eye Cut',
        internalStructuresRevealed: [
          'Anterior chamber, trabecular meshwork, and canal of Schlemm',
          'Posterior chamber and ciliary body processes',
          'Vitreous humor gel chamber (hyaloid canal)',
          'Sclera, choroid vascular coat, and neurosensory retina'
        ],
        histologicalInsight: 'Demonstrates the aqueous humor circulation pathway: produced by ciliary processes, passing through pupil into anterior chamber, draining via trabecular meshwork.'
      }
    ],
    watercolourPlate: {
      title: 'Ten-Layered Neurosensory Retina & Photoreceptors',
      latinName: 'Retina: Stratum Pigmentosum et Neuroepithelium',
      plateNumber: 'Plate IX • Organa Sensuum',
      magnification: '600× Microscopic Section',
      stainType: 'Heidenhain’s Azan Stain (Blue Collagen, Red Photoreceptors)',
      historicalContext: 'Rendered in luminous ultramarine, saffron, and madder lake watercolors detailing the retinal neuron wiring decoded by Ramón y Cajal in 1892.',
      tissueType: 'Inverted Ten-Layered Neurosensory Retina',
      description: 'The retina is an outgrowth of the embryological diencephalon. Light must travel through all nine inner neural layers before striking the photopigment discs in the outer segments of rods (rhodopsin) and cones (iodopsin).',
      layers: [
        {
          name: 'Retinal Pigment Epithelium (RPE)',
          colorHex: '#1a365d',
          description: 'Single layer of melanin-pigmented cuboidal cells absorbing stray light and phagocytosing shed photoreceptor outer segments.',
          cellularFeatures: 'Forms outer blood-retinal barrier with tight zonula occludens.'
        },
        {
          name: 'Photoreceptor Layer (Rods & Cones)',
          colorHex: '#e07a5f',
          description: '120 million rods (scotopic night vision) and 6 million cones (photopic daylight color vision).',
          cellularFeatures: 'Outer segments packed with membranous stacks of photopigment discs.'
        },
        {
          name: 'Outer Nuclear Layer (ONL)',
          colorHex: '#9c4146',
          description: 'Densely packed nuclei of the rod and cone photoreceptors.',
          cellularFeatures: 'Intense basophilic staining with granular chromatin.'
        },
        {
          name: 'Inner Nuclear Layer (INL) & Bipolar Cells',
          colorHex: '#81b29a',
          description: 'Cell bodies of bipolar cells, horizontal cells, amacrine cells, and radial Müller glial support cells.',
          cellularFeatures: 'Second-order interneurons relaying signals to ganglion cells.'
        },
        {
          name: 'Ganglion Cell Layer (GCL) & Nerve Fiber Layer',
          colorHex: '#2b6cb0',
          description: 'Large multipolar neurons whose unmyelinated axons course across inner surface to converge at optic disc.',
          cellularFeatures: 'Acquire myelin sheaths only upon piercing the lamina cribrosa.'
        }
      ],
      cytologyHighlights: [
        'Precise laminar architectural alignment without intraretinal exudates or drusen',
        'Intact attachment of photoreceptor outer segments to microvilli of retinal pigment epithelium'
      ],
      dysplasiaMarkers: [
        'Flexner-Wintersteiner rosettes: circular tumor cell clusters with lumen in Retinoblastoma',
        'Subretinal lipid exudates, microaneurysms, and cotton wool spots in diabetic retinopathy'
      ]
    },
    quiz: [
      {
        id: 'quiz-ey-1',
        question: 'Which anatomical area of the retina provides the sharpest daylight visual acuity and lacks blood vessels?',
        clinicalScenario: 'An optometrist examines a patient’s fundus and notes an intact foveal light reflex without drusen.',
        options: [
          'Optic Disc (Papilla)',
          'Fovea Centralis (within Macula Lutea)',
          'Ora Serrata',
          'Equatorial Peripheral Retina'
        ],
        correctAnswerIndex: 1,
        explanation: 'The Fovea Centralis (approx. 1.5mm diameter) has the highest cone density and zero rods. Inner retinal layers and retinal vessels are displaced laterally, allowing light to strike cones directly without scattering.',
        clinicalPearl: 'The foveal avascular zone (FAZ) is fed exclusively by diffusion from the underlying choroidal choriocapillaris.'
      }
    ],
    aiSimulations: [
      {
        id: 'sim-ey-normal',
        name: 'Normal Fundus & Optic Nerve Head',
        category: 'A',
        categoryTitle: 'Category A: Normal Retinal Microvasculature',
        riskScore: 0.04,
        confidence: 0.98,
        tissueDescription: 'Healthy orange-red retinal fundus with distinct optic disc margins, normal cup-to-disc ratio (0.3), and crisp foveal reflex.',
        aiFindings: [
          'Arteriovenous caliber ratio normal (2:3) without arteriolar narrowing',
          'Zero microaneurysms, blot hemorrhages, or hard exudates'
        ],
        biomarkers: [
          { name: 'Cup-to-Disc Ratio', value: '0.30 (Physiological)', status: 'normal' },
          { name: 'Macular Reflex', value: 'Crisp / Intact', status: 'normal' }
        ],
        clinicalTriage: 'Category A: Optimal ocular health. Routine biennial eye examination.',
        recommendedAction: 'Continue protective UV sunglasses and routine vision checkups.'
      },
      {
        id: 'sim-ey-glaucoma',
        name: 'Severe Glaucomatous Optic Neuropathy',
        category: 'D',
        categoryTitle: 'Category D: Urgent Ophthalmology Glaucoma Triage',
        riskScore: 0.93,
        confidence: 0.96,
        tissueDescription: 'Marked optic disc cupping with cup-to-disc ratio enlarged to 0.85, inferior neuroretinal rim notching, and bayoneting of retinal vessels.',
        aiFindings: [
          'Violation of ISNT rule (Inferior > Superior > Nasal > Temporal rim thickness)',
          'Peripapillary retinal nerve fiber layer (RNFL) thinning on OCT modeling',
          'Intraocular pressure elevated at 32 mmHg'
        ],
        biomarkers: [
          { name: 'Cup-to-Disc Ratio', value: '0.85 (Critical Cupping)', status: 'critical' },
          { name: 'Intraocular Pressure', value: '32 mmHg (Elevated)', status: 'critical' }
        ],
        clinicalTriage: 'Category D: Urgent ophthalmology evaluation for IOP-lowering topical prostaglandin / beta-blocker therapy or trabeculectomy.',
        recommendedAction: 'Immediate visual field Humphrey perimeter testing and retinal nerve fiber layer OCT.'
      }
    ]
  }
];
