import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrganData, AnatomicalPin, AISimulationCase } from '../../data/anatomyData';
import { 
  RotateCw, 
  Eye, 
  Scissors, 
  PenTool, 
  Cpu, 
  Compass, 
  ZoomIn, 
  ZoomOut, 
  RefreshCw, 
  Layers, 
  Sparkles,
  Volume2,
  VolumeX,
  Camera,
  AlertTriangle,
  CheckCircle2,
  Info
} from 'lucide-react';

interface AnatomyCanvasProps {
  organ: OrganData;
  activePin: AnatomicalPin | null;
  onSelectPin: (pin: AnatomicalPin | null) => void;
  activeSimulation: AISimulationCase | null;
  onSelectSimulation: (sim: AISimulationCase) => void;
}

export type ShadingMode = 'wax' | 'ink' | 'sepia';
export type SectionPlane = 'none' | 'sagittal' | 'coronal' | 'transverse';

export const AnatomyCanvas: React.FC<AnatomyCanvasProps> = ({
  organ,
  activePin,
  onSelectPin,
  activeSimulation,
  onSelectSimulation
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sketchCanvasRef = useRef<HTMLCanvasElement>(null);

  // Interactive controls state
  const [shadingMode, setShadingMode] = useState<ShadingMode>('wax');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.008);
  const [sectionPlane, setSectionPlane] = useState<SectionPlane>('none');
  const [sectionDepth, setSectionDepth] = useState<number>(0);
  const [isIsolateMode, setIsIsolateMode] = useState<boolean>(false);
  const [showPins, setShowPins] = useState<boolean>(true);
  
  // Ink Sketch Annotation Tool state
  const [isSketchMode, setIsSketchMode] = useState<boolean>(false);
  const [inkColor, setInkColor] = useState<string>('#661f25'); // Sepia carmine
  const [inkWidth, setInkWidth] = useState<number>(3);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Live AI Scanner Probe state
  const [isAiScannerActive, setIsAiScannerActive] = useState<boolean>(false);
  const [scannerProbePoint, setScannerProbePoint] = useState<[number, number, number] | null>(null);
  const [probeStatusText, setProbeStatusText] = useState<string>('AI Engine Ready • Click organ to scan');
  const [isSpeechActive, setIsSpeechActive] = useState<boolean>(false);

  // Refs for Three.js instance
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const organGroupRef = useRef<THREE.Group | null>(null);
  const plinthGroupRef = useRef<THREE.Group | null>(null);
  const pinsGroupRef = useRef<THREE.Group | null>(null);
  const aiProbeMeshRef = useRef<THREE.Mesh | null>(null);
  const clipPlaneRef = useRef<THREE.Plane | null>(null);
  const animFrameIdRef = useRef<number>(0);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const prevMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Voice narration of Latin and clinical notes using Web Speech API
  const speakAnnotation = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (!isSpeechActive) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Build the 3D Procedural Sculpted Organ
  const buildOrganMesh = (organId: string, mode: ShadingMode, isGhosted: boolean): THREE.Group => {
    const group = new THREE.Group();
    group.name = 'OrganRoot';

    // Shading material helper
    const getMaterial = (baseColor: string, wireColor: string, opacity: number = 1.0, isSpecial: boolean = false) => {
      if (mode === 'ink') {
        return new THREE.MeshStandardMaterial({
          color: new THREE.Color('#faf7f0'),
          roughness: 0.9,
          metalness: 0.1,
          wireframe: false,
          transparent: isGhosted || opacity < 1.0,
          opacity: isGhosted ? 0.25 : opacity,
          clippingPlanes: clipPlaneRef.current ? [clipPlaneRef.current] : []
        });
      } else if (mode === 'sepia') {
        return new THREE.MeshStandardMaterial({
          color: new THREE.Color('#d9b38c'),
          roughness: 0.85,
          metalness: 0.1,
          transparent: isGhosted || opacity < 1.0,
          opacity: isGhosted ? 0.25 : opacity,
          clippingPlanes: clipPlaneRef.current ? [clipPlaneRef.current] : []
        });
      } else {
        // Wax anatomical museum model
        return new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(baseColor),
          roughness: isSpecial ? 0.2 : 0.45,
          metalness: 0.08,
          clearcoat: 0.35,
          clearcoatRoughness: 0.2,
          transmission: isSpecial ? 0.4 : 0.05,
          transparent: isGhosted || opacity < 1.0,
          opacity: isGhosted ? 0.25 : opacity,
          clippingPlanes: clipPlaneRef.current ? [clipPlaneRef.current] : []
        });
      }
    };

    switch (organId) {
      case 'oral-cavity': {
        // 1. Mandibular Arch (Horseshoe bone)
        const mandibleCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-1.1, -0.1, -0.6),
          new THREE.Vector3(-0.95, -0.15, 0.2),
          new THREE.Vector3(0, -0.2, 0.7),
          new THREE.Vector3(0.95, -0.15, 0.2),
          new THREE.Vector3(1.1, -0.1, -0.6),
        ]);
        const mandibleGeo = new THREE.TubeGeometry(mandibleCurve, 40, 0.18, 16, false);
        const mandibleMat = getMaterial('#e8e2d5', '#555');
        const mandibleMesh = new THREE.Mesh(mandibleGeo, mandibleMat);
        group.add(mandibleMesh);

        // 2. Tongue Body (Parametric sculpted ellipsoid with dorsal groove)
        const tongueGeo = new THREE.SphereGeometry(0.85, 36, 28);
        tongueGeo.scale(0.85, 0.5, 1.25);
        // Perturb vertices to create natural lingual curvature and tip
        const pos = tongueGeo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const z = pos.getZ(i);
          const y = pos.getY(i);
          const x = pos.getX(i);
          // Taper toward tip
          if (z > 0.4) {
            pos.setY(i, y * 0.7 - (z - 0.4) * 0.15);
            pos.setX(i, x * (1 - (z - 0.4) * 0.4));
          }
          // Midline lingual sulcus depression on dorsum
          if (y > 0.15 && Math.abs(x) < 0.15) {
            pos.setY(i, y - 0.05 * (1 - Math.abs(x) / 0.15));
          }
        }
        tongueGeo.computeVertexNormals();
        const tongueMat = getMaterial('#d65d64', '#4a1519');
        const tongueMesh = new THREE.Mesh(tongueGeo, tongueMat);
        tongueMesh.position.set(0, 0.1, 0.05);
        group.add(tongueMesh);

        // 3. Circumvallate Papillae Ridge (V-shaped V-line)
        const vRidgeCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.45, 0.25, -0.4),
          new THREE.Vector3(0, 0.32, -0.6),
          new THREE.Vector3(0.45, 0.25, -0.4),
        ]);
        const vRidgeGeo = new THREE.TubeGeometry(vRidgeCurve, 20, 0.04, 12, false);
        const vRidgeMat = getMaterial('#b8424a', '#333');
        const vRidgeMesh = new THREE.Mesh(vRidgeGeo, vRidgeMat);
        group.add(vRidgeMesh);

        // 4. Palatine Uvula (Soft palate hanging pendant)
        const uvulaGeo = new THREE.ConeGeometry(0.12, 0.45, 16);
        uvulaGeo.rotateX(Math.PI);
        const uvulaMat = getMaterial('#e67e84', '#444');
        const uvulaMesh = new THREE.Mesh(uvulaGeo, uvulaMat);
        uvulaMesh.position.set(0, 0.65, -0.85);
        group.add(uvulaMesh);

        // 5. Sublingual Glands (Floor of mouth)
        const glandLeftGeo = new THREE.SphereGeometry(0.2, 16, 12);
        glandLeftGeo.scale(1.5, 0.7, 0.8);
        const glandMat = getMaterial('#e2a39b', '#444');
        const glandLeft = new THREE.Mesh(glandLeftGeo, glandMat);
        glandLeft.position.set(-0.35, -0.15, 0.35);
        const glandRight = glandLeft.clone();
        glandRight.position.set(0.35, -0.15, 0.35);
        group.add(glandLeft);
        group.add(glandRight);
        break;
      }

      case 'heart': {
        // 1. Ventricular Core Cone
        const ventGeo = new THREE.ConeGeometry(0.85, 1.4, 32, 16);
        ventGeo.rotateX(Math.PI);
        ventGeo.scale(0.9, 1.0, 0.75);
        const ventMat = getMaterial('#9e2a2b', '#2b1b17');
        const ventMesh = new THREE.Mesh(ventGeo, ventMat);
        ventMesh.position.set(-0.15, -0.3, 0.1);
        ventMesh.rotation.z = -0.22;
        group.add(ventMesh);

        // 2. Right Atrium & Auricle
        const raGeo = new THREE.SphereGeometry(0.48, 24, 20);
        raGeo.scale(0.8, 1.0, 0.8);
        const raMat = getMaterial('#802025', '#222');
        const raMesh = new THREE.Mesh(raGeo, raMat);
        raMesh.position.set(0.55, 0.35, 0.1);
        group.add(raMesh);

        // 3. Left Atrium & Auricle
        const laGeo = new THREE.SphereGeometry(0.42, 24, 20);
        laGeo.scale(0.8, 0.9, 0.8);
        const laMesh = new THREE.Mesh(laGeo, raMat);
        laMesh.position.set(-0.5, 0.4, -0.1);
        group.add(laMesh);

        // 4. Ascending Aorta & Arch
        const aortaCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.05, 0.2, 0.1),
          new THREE.Vector3(0.05, 0.7, 0.15),
          new THREE.Vector3(0.1, 1.05, 0.0),
          new THREE.Vector3(-0.2, 1.15, -0.15),
          new THREE.Vector3(-0.35, 0.6, -0.3)
        ]);
        const aortaGeo = new THREE.TubeGeometry(aortaCurve, 32, 0.22, 16, false);
        const aortaMat = getMaterial('#c43a3d', '#333');
        const aortaMesh = new THREE.Mesh(aortaGeo, aortaMat);
        group.add(aortaMesh);

        // 3 Aortic Arch Branches (Brachiocephalic, Carotid, Subclavian)
        const branchGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.35, 12);
        const b1 = new THREE.Mesh(branchGeo, aortaMat);
        b1.position.set(0.05, 1.25, 0.0);
        b1.rotation.z = -0.2;
        const b2 = new THREE.Mesh(branchGeo, aortaMat);
        b2.position.set(-0.08, 1.28, -0.05);
        const b3 = new THREE.Mesh(branchGeo, aortaMat);
        b3.position.set(-0.2, 1.25, -0.1);
        b3.rotation.z = 0.2;
        group.add(b1, b2, b3);

        // 5. Pulmonary Trunk & Bifurcation
        const ptCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0.15, 0.1, 0.35),
          new THREE.Vector3(-0.1, 0.55, 0.3),
          new THREE.Vector3(-0.25, 0.8, 0.1)
        ]);
        const ptGeo = new THREE.TubeGeometry(ptCurve, 20, 0.19, 16, false);
        const ptMat = getMaterial('#416788', '#222');
        const ptMesh = new THREE.Mesh(ptGeo, ptMat);
        group.add(ptMesh);

        // 6. Anterior Interventricular Artery (LAD branch in groove)
        const ladCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.05, 0.3, 0.4),
          new THREE.Vector3(-0.1, -0.1, 0.5),
          new THREE.Vector3(-0.25, -0.6, 0.35),
          new THREE.Vector3(-0.38, -0.95, 0.2)
        ]);
        const ladGeo = new THREE.TubeGeometry(ladCurve, 24, 0.045, 10, false);
        const ladMat = getMaterial('#e63946', '#111');
        const ladMesh = new THREE.Mesh(ladGeo, ladMat);
        group.add(ladMesh);
        break;
      }

      case 'larynx-pharynx': {
        // 1. Thyroid Cartilage (V-shaped laryngeal shield)
        const thyroidGeo = new THREE.CylinderGeometry(0.7, 0.55, 1.0, 16, 1, true, -Math.PI * 0.65, Math.PI * 1.3);
        const thyroidMat = getMaterial('#5d8aa8', '#1a2c3a');
        const thyroidMesh = new THREE.Mesh(thyroidGeo, thyroidMat);
        thyroidMesh.position.set(0, 0.3, 0.1);
        group.add(thyroidMesh);

        // Adam's Apple Prominence notch
        const notchGeo = new THREE.SphereGeometry(0.2, 16, 12);
        notchGeo.scale(0.8, 1.2, 1.4);
        const notchMesh = new THREE.Mesh(notchGeo, thyroidMat);
        notchMesh.position.set(0, 0.55, 0.5);
        group.add(notchMesh);

        // 2. Epiglottis (Leaf-shaped elastic cartilage)
        const epiglottisGeo = new THREE.CylinderGeometry(0.35, 0.1, 0.85, 16, 1, false);
        epiglottisGeo.scale(1.2, 1.0, 0.2);
        const epiglottisMat = getMaterial('#f4a261', '#444');
        const epiglottisMesh = new THREE.Mesh(epiglottisGeo, epiglottisMat);
        epiglottisMesh.position.set(0, 0.95, -0.15);
        epiglottisMesh.rotation.x = -0.3;
        group.add(epiglottisMesh);

        // 3. True Vocal Cords (Pearly white internal bands)
        const cordMat = getMaterial('#faf0ca', '#555');
        const cordLeftCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.3, 0.4),
          new THREE.Vector3(-0.25, 0.28, -0.1),
        ]);
        const cordRightCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.3, 0.4),
          new THREE.Vector3(0.25, 0.28, -0.1),
        ]);
        const cordLeftMesh = new THREE.Mesh(new THREE.TubeGeometry(cordLeftCurve, 12, 0.05, 8, false), cordMat);
        const cordRightMesh = new THREE.Mesh(new THREE.TubeGeometry(cordRightCurve, 12, 0.05, 8, false), cordMat);
        group.add(cordLeftMesh, cordRightMesh);

        // 4. Cricoid Ring & Upper Tracheal Rings
        const cricoidGeo = new THREE.TorusGeometry(0.48, 0.15, 12, 24);
        cricoidGeo.rotateX(Math.PI / 2);
        const cricoidMat = getMaterial('#416788', '#222');
        const cricoidMesh = new THREE.Mesh(cricoidGeo, cricoidMat);
        cricoidMesh.position.set(0, -0.35, 0.05);
        group.add(cricoidMesh);

        // Tracheal Rings below
        for (let i = 1; i <= 3; i++) {
          const ringMesh = new THREE.Mesh(cricoidGeo, cricoidMat);
          ringMesh.position.set(0, -0.35 - i * 0.22, 0.05);
          ringMesh.scale.set(0.9, 0.9, 0.8);
          group.add(ringMesh);
        }
        break;
      }

      case 'lungs': {
        // 1. Trachea & Ribbed Rings
        const tracheaCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 1.25, -0.05),
          new THREE.Vector3(0, 0.6, -0.05),
          new THREE.Vector3(0, 0.25, -0.05)
        ]);
        const tracheaGeo = new THREE.TubeGeometry(tracheaCurve, 20, 0.14, 16, false);
        const tracheaMat = getMaterial('#e8e2d5', '#333');
        const tracheaMesh = new THREE.Mesh(tracheaGeo, tracheaMat);
        group.add(tracheaMesh);

        // Primary Bronchi Bifurcation
        const rBronchusCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.25, -0.05),
          new THREE.Vector3(0.35, -0.05, 0.0),
          new THREE.Vector3(0.55, -0.3, 0.05)
        ]);
        const lBronchusCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.25, -0.05),
          new THREE.Vector3(-0.4, 0.0, 0.0),
          new THREE.Vector3(-0.65, -0.25, 0.05)
        ]);
        group.add(new THREE.Mesh(new THREE.TubeGeometry(rBronchusCurve, 16, 0.1, 12, false), tracheaMat));
        group.add(new THREE.Mesh(new THREE.TubeGeometry(lBronchusCurve, 16, 0.09, 12, false), tracheaMat));

        // 2. Right Lung (3 Lobes: Superior, Middle, Inferior)
        const lungMat = getMaterial('#e07a5f', '#262938');
        const rSupGeo = new THREE.SphereGeometry(0.55, 24, 20);
        rSupGeo.scale(0.85, 1.1, 0.7);
        const rSupMesh = new THREE.Mesh(rSupGeo, lungMat);
        rSupMesh.position.set(0.7, 0.35, 0.1);
        
        const rMidGeo = new THREE.SphereGeometry(0.48, 24, 20);
        rMidGeo.scale(0.85, 0.7, 0.65);
        const rMidMesh = new THREE.Mesh(rMidGeo, lungMat);
        rMidMesh.position.set(0.75, -0.15, 0.15);

        const rInfGeo = new THREE.SphereGeometry(0.65, 24, 20);
        rInfGeo.scale(0.9, 1.0, 0.8);
        const rInfMesh = new THREE.Mesh(rInfGeo, lungMat);
        rInfMesh.position.set(0.68, -0.55, 0.05);

        group.add(rSupMesh, rMidMesh, rInfMesh);

        // 3. Left Lung (2 Lobes with cardiac impression)
        const lSupGeo = new THREE.SphereGeometry(0.58, 24, 20);
        lSupGeo.scale(0.85, 1.25, 0.7);
        const lSupMesh = new THREE.Mesh(lSupGeo, lungMat);
        lSupMesh.position.set(-0.72, 0.3, 0.05);

        const lInfGeo = new THREE.SphereGeometry(0.68, 24, 20);
        lInfGeo.scale(0.85, 1.1, 0.75);
        const lInfMesh = new THREE.Mesh(lInfGeo, lungMat);
        lInfMesh.position.set(-0.7, -0.45, 0.0);

        group.add(lSupMesh, lInfMesh);
        break;
      }

      case 'brain': {
        // Sculpted twin cerebral hemispheres with gyri convolution
        const brainMat = getMaterial('#9b72cf', '#1b0f33');

        // Helper to deform sphere into cerebral hemisphere with gyri ripples
        const createHemisphere = (isLeft: boolean) => {
          const geo = new THREE.SphereGeometry(0.8, 48, 36);
          geo.scale(0.8, 0.9, 1.2);
          const pos = geo.attributes.position;
          for (let i = 0; i < pos.count; i++) {
            let x = pos.getX(i);
            let y = pos.getY(i);
            let z = pos.getZ(i);

            // Gyri frequency modulation
            const wave = Math.sin(x * 9) * Math.cos(y * 8) * Math.sin(z * 7) * 0.055;
            x += (x / 0.8) * wave;
            y += (y / 0.9) * wave;
            z += (z / 1.2) * wave;

            // Flatten medial interhemispheric surface
            if ((isLeft && x > 0) || (!isLeft && x < 0)) {
              x *= 0.15;
            }

            pos.setXYZ(i, x, y, z);
          }
          geo.computeVertexNormals();
          const mesh = new THREE.Mesh(geo, brainMat);
          mesh.position.set(isLeft ? -0.38 : 0.38, 0.25, 0.05);
          return mesh;
        };

        group.add(createHemisphere(true));
        group.add(createHemisphere(false));

        // Cerebellum (Posterior with transverse folia)
        const cerebMat = getMaterial('#7b52bf', '#222');
        const cerebGeo = new THREE.SphereGeometry(0.5, 32, 24);
        cerebGeo.scale(1.2, 0.65, 0.8);
        const cerebMesh = new THREE.Mesh(cerebGeo, cerebMat);
        cerebMesh.position.set(0, -0.45, -0.45);
        group.add(cerebMesh);

        // Brainstem (Pons & Medulla tube)
        const stemMat = getMaterial('#c4b5fd', '#333');
        const stemCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, -0.15, -0.15),
          new THREE.Vector3(0, -0.5, -0.15),
          new THREE.Vector3(0, -0.95, -0.1)
        ]);
        const stemGeo = new THREE.TubeGeometry(stemCurve, 16, 0.2, 16, false);
        const stemMesh = new THREE.Mesh(stemGeo, stemMat);
        group.add(stemMesh);
        break;
      }

      case 'stomach': {
        // J-shaped stomach sweep with bulging fundus
        const stomachMat = getMaterial('#c97a63', '#2b120c');
        const stomachCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.25, 0.75, 0.0), // Esophagus entry (Cardia)
          new THREE.Vector3(-0.65, 0.7, 0.1),  // Bulging Fundus
          new THREE.Vector3(-0.75, 0.1, 0.2),  // Body upper
          new THREE.Vector3(-0.4, -0.5, 0.25), // Greater curvature sweep
          new THREE.Vector3(0.2, -0.6, 0.1),   // Pyloric antrum
          new THREE.Vector3(0.7, -0.35, 0.0)   // Pyloric canal to duodenum
        ]);
        const stomachGeo = new THREE.TubeGeometry(stomachCurve, 40, 0.35, 20, false);
        // Vary radius along length to form fundus and pylorus
        const pos = stomachGeo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const y = pos.getY(i);
          const x = pos.getX(i);
          // Expand fundus and body
          if (x < -0.2 && y > -0.2) {
            pos.setX(i, x * 1.35);
            pos.setZ(i, pos.getZ(i) * 1.3);
          }
        }
        stomachGeo.computeVertexNormals();
        const stomachMesh = new THREE.Mesh(stomachGeo, stomachMat);
        group.add(stomachMesh);
        break;
      }

      case 'liver': {
        // Large wedge-shaped hepatic parenchyma
        const liverMat = getMaterial('#7a3b34', '#1a0a08');
        const liverGeo = new THREE.SphereGeometry(0.95, 36, 28);
        liverGeo.scale(1.4, 0.75, 0.9);
        const pos = liverGeo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          let x = pos.getX(i);
          let y = pos.getY(i);
          let z = pos.getZ(i);
          // Wedge taper to left edge and inferior margin
          if (x < 0) {
            y *= (1 + x * 0.45);
            z *= (1 + x * 0.3);
          }
          if (y < 0) {
            y *= 0.7; // Flat visceral surface
          }
          pos.setXYZ(i, x, y, z);
        }
        liverGeo.computeVertexNormals();
        const liverMesh = new THREE.Mesh(liverGeo, liverMat);
        liverMesh.position.set(0.1, 0.1, 0.0);
        group.add(liverMesh);

        // Gallbladder (Pear-shaped green reservoir underneath)
        const gbMat = getMaterial('#40916c', '#1b4332');
        const gbGeo = new THREE.SphereGeometry(0.25, 20, 16);
        gbGeo.scale(0.8, 1.6, 0.8);
        const gbMesh = new THREE.Mesh(gbGeo, gbMat);
        gbMesh.position.set(0.35, -0.42, 0.35);
        gbMesh.rotation.z = -0.4;
        gbMesh.rotation.x = 0.3;
        group.add(gbMesh);

        // Falciform Ligament dividing groove
        const falcCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.05, 0.55, 0.4),
          new THREE.Vector3(-0.08, 0.1, 0.6),
          new THREE.Vector3(-0.1, -0.3, 0.5)
        ]);
        const falcGeo = new THREE.TubeGeometry(falcCurve, 16, 0.035, 8, false);
        const falcMat = getMaterial('#e9d8a6', '#444');
        group.add(new THREE.Mesh(falcGeo, falcMat));
        break;
      }

      case 'kidney': {
        // Bean-shaped renal organ with medial hilum
        const kidneyMat = getMaterial('#9c4146', '#240a0b');
        const kidneyGeo = new THREE.SphereGeometry(0.75, 36, 28);
        kidneyGeo.scale(0.75, 1.35, 0.65);
        const pos = kidneyGeo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          let x = pos.getX(i);
          let y = pos.getY(i);
          let z = pos.getZ(i);
          // Medial hilum concavity
          if (x < 0 && Math.abs(y) < 0.45) {
            x += (0.45 - Math.abs(y)) * 0.55;
          }
          pos.setXYZ(i, x, y, z);
        }
        kidneyGeo.computeVertexNormals();
        const kidneyMesh = new THREE.Mesh(kidneyGeo, kidneyMat);
        group.add(kidneyMesh);

        // Golden Suprarenal (Adrenal) Gland Cap on top
        const adrenalMat = getMaterial('#e9c46a', '#333');
        const adrenalGeo = new THREE.ConeGeometry(0.35, 0.4, 16);
        adrenalGeo.scale(1.2, 0.8, 0.6);
        const adrenalMesh = new THREE.Mesh(adrenalGeo, adrenalMat);
        adrenalMesh.position.set(0.12, 0.88, 0.05);
        adrenalMesh.rotation.z = -0.25;
        group.add(adrenalMesh);

        // Renal Hilum Vessels: Artery (Red), Vein (Blue), Ureter (Yellow/White)
        const arteryMat = getMaterial('#e63946', '#111');
        const veinMat = getMaterial('#1d3557', '#111');
        const ureterMat = getMaterial('#f4f1de', '#111');

        const arteryMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.5, 12), arteryMat);
        arteryMesh.position.set(-0.45, 0.05, 0.05);
        arteryMesh.rotation.z = Math.PI / 2;

        const veinMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.55, 12), veinMat);
        veinMesh.position.set(-0.45, 0.18, 0.1);
        veinMesh.rotation.z = Math.PI / 2;

        const ureterCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.25, -0.15, -0.05),
          new THREE.Vector3(-0.45, -0.4, -0.05),
          new THREE.Vector3(-0.5, -0.95, -0.05)
        ]);
        const ureterMesh = new THREE.Mesh(new THREE.TubeGeometry(ureterCurve, 16, 0.065, 12, false), ureterMat);

        group.add(arteryMesh, veinMesh, ureterMesh);
        break;
      }

      case 'eye': {
        // Spherical Scleral Globe
        const scleraMat = getMaterial('#f8f9fa', '#08111a');
        const scleraGeo = new THREE.SphereGeometry(0.85, 36, 32);
        const scleraMesh = new THREE.Mesh(scleraGeo, scleraMat);
        group.add(scleraMesh);

        // Transparent Protruding Cornea Dome
        const corneaGeo = new THREE.SphereGeometry(0.42, 24, 20, 0, Math.PI * 2, 0, Math.PI * 0.45);
        const corneaMat = getMaterial('#bee3f8', '#2b6cb0', 0.6, true);
        const corneaMesh = new THREE.Mesh(corneaGeo, corneaMat);
        corneaMesh.position.set(0, 0, 0.72);
        group.add(corneaMesh);

        // Iris & Pupil Disc
        const irisMat = getMaterial('#2b6cb0', '#0d1b2a');
        const irisGeo = new THREE.RingGeometry(0.14, 0.38, 32);
        const irisMesh = new THREE.Mesh(irisGeo, irisMat);
        irisMesh.position.set(0, 0, 0.75);
        group.add(irisMesh);

        // Pupil Aperture (Dark inner disc)
        const pupilMat = getMaterial('#111111', '#000');
        const pupilGeo = new THREE.CircleGeometry(0.14, 24);
        const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
        pupilMesh.position.set(0, 0, 0.751);
        group.add(pupilMesh);

        // Posterior Optic Nerve Stem exiting back
        const nerveCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0, -0.85),
          new THREE.Vector3(-0.15, -0.05, -1.25),
          new THREE.Vector3(-0.3, -0.1, -1.65)
        ]);
        const nerveMat = getMaterial('#e9d8a6', '#222');
        const nerveMesh = new THREE.Mesh(new THREE.TubeGeometry(nerveCurve, 16, 0.16, 16, false), nerveMat);
        group.add(nerveMesh);
        break;
      }

      default:
        break;
    }

    return group;
  };

  // Build the Museum Plinth & Turntable Base
  const buildPlinth = (plinthText: string): THREE.Group => {
    const plinth = new THREE.Group();
    plinth.name = 'Plinth';

    // 1. Tiered Cylindrical Walnut Wooden Pedestal
    const baseGeo = new THREE.CylinderGeometry(1.65, 1.8, 0.35, 48);
    const woodMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#382216'),
      roughness: 0.65,
      metalness: 0.15
    });
    const baseMesh = new THREE.Mesh(baseGeo, woodMat);
    baseMesh.position.y = -1.35;
    plinth.add(baseMesh);

    // 2. Antique Brass Accent Ring
    const brassRingGeo = new THREE.TorusGeometry(1.66, 0.05, 16, 48);
    brassRingGeo.rotateX(Math.PI / 2);
    const brassMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d4af37'),
      roughness: 0.3,
      metalness: 0.85
    });
    const brassRing = new THREE.Mesh(brassRingGeo, brassMat);
    brassRing.position.y = -1.2;
    plinth.add(brassRing);

    // 3. Top Turntable Rotating Disc
    const topDiscGeo = new THREE.CylinderGeometry(1.48, 1.55, 0.15, 48);
    const topDiscMesh = new THREE.Mesh(topDiscGeo, woodMat);
    topDiscMesh.position.y = -1.1;
    plinth.add(topDiscMesh);

    // 4. Brass Engraved Nameplate Plaque
    const plaqueGeo = new THREE.BoxGeometry(1.4, 0.22, 0.05);
    const plaqueMesh = new THREE.Mesh(plaqueGeo, brassMat);
    plaqueMesh.position.set(0, -1.35, 1.72);
    plinth.add(plaqueMesh);

    return plinth;
  };

  // Build Interactive 3D Anatomical Pins
  const buildPins = (pins: AnatomicalPin[], activePinId: string | null): THREE.Group => {
    const pinsGroup = new THREE.Group();
    pinsGroup.name = 'PinsGroup';

    pins.forEach((pin) => {
      const pinObj = new THREE.Group();
      pinObj.position.set(pin.position[0], pin.position[1], pin.position[2]);
      pinObj.userData = { pinId: pin.id, pinData: pin };

      const isSelected = activePinId === pin.id;

      // Pin Needle (Slender metallic stem pointing into tissue)
      const needleGeo = new THREE.CylinderGeometry(0.015, 0.005, 0.35, 8);
      const needleMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#e0e0e0'),
        metalness: 0.9,
        roughness: 0.2
      });
      const needleMesh = new THREE.Mesh(needleGeo, needleMat);
      needleMesh.position.y = 0.175;
      pinObj.add(needleMesh);

      // Pin Head (Spherical gemstone / amber head)
      const headColor = pin.riskCategory === 'D' ? '#dc2626' : (pin.riskCategory === 'B' ? '#d97706' : '#087F8C');
      const headGeo = new THREE.SphereGeometry(isSelected ? 0.09 : 0.065, 16, 16);
      const headMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(isSelected ? '#f59e0b' : headColor),
        emissive: new THREE.Color(isSelected ? '#f59e0b' : headColor),
        emissiveIntensity: isSelected ? 0.6 : 0.2,
        roughness: 0.2,
        metalness: 0.4
      });
      const headMesh = new THREE.Mesh(headGeo, headMat);
      headMesh.position.y = 0.35;
      pinObj.add(headMesh);

      // Number badge ring
      const ringGeo = new THREE.RingGeometry(0.09, 0.12, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#ffffff'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.y = 0.35;
      ringMesh.lookAt(0, 0, 5);
      pinObj.add(ringMesh);

      pinsGroup.add(pinObj);
    });

    return pinsGroup;
  };

  // Section clipping plane setup
  useEffect(() => {
    if (sectionPlane === 'none') {
      clipPlaneRef.current = null;
    } else if (sectionPlane === 'sagittal') {
      clipPlaneRef.current = new THREE.Plane(new THREE.Vector3(-1, 0, 0), sectionDepth);
    } else if (sectionPlane === 'coronal') {
      clipPlaneRef.current = new THREE.Plane(new THREE.Vector3(0, 0, -1), sectionDepth);
    } else if (sectionPlane === 'transverse') {
      clipPlaneRef.current = new THREE.Plane(new THREE.Vector3(0, -1, 0), sectionDepth);
    }

    if (rendererRef.current) {
      rendererRef.current.clippingPlanes = clipPlaneRef.current ? [clipPlaneRef.current] : [];
    }
  }, [sectionPlane, sectionDepth]);

  // Main Three.js Scene Initialization and Re-renders
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Dimensions
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Background color based on shading mode
    const bgColor = shadingMode === 'ink' ? 0xfbf8f1 : (shadingMode === 'sepia' ? 0xf4ece1 : 0x18242b);
    scene.background = new THREE.Color(bgColor);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 4.2);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.localClippingEnabled = true;
    rendererRef.current = renderer;

    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    // Lighting (Warm botanical museum studio lighting)
    const ambientLight = new THREE.AmbientLight(0xfff6eb, shadingMode === 'wax' ? 1.2 : 1.8);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffeedd, 1.8);
    mainKeyLight.position.set(3, 4, 3);
    mainKeyLight.castShadow = true;
    scene.add(mainKeyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.8);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffd166, 0.6);
    rimLight.position.set(0, -3, 2);
    scene.add(rimLight);

    // Root Turntable Parent
    const plinthGroup = buildPlinth(organ.plinthPlaque);
    plinthGroupRef.current = plinthGroup;
    scene.add(plinthGroup);

    // Organ Mesh
    const organMeshGroup = buildOrganMesh(organ.id, shadingMode, isIsolateMode && activePin !== null);
    organGroupRef.current = organMeshGroup;
    plinthGroup.add(organMeshGroup);

    // Pins Group
    if (showPins) {
      const pinsGroup = buildPins(organ.pins, activePin?.id || null);
      pinsGroupRef.current = pinsGroup;
      organMeshGroup.add(pinsGroup);
    }

    // AI Probe Laser Mesh (holographic scanner ring)
    const probeGeo = new THREE.RingGeometry(0.08, 0.14, 32);
    const probeMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });
    const probeMesh = new THREE.Mesh(probeGeo, probeMat);
    probeMesh.visible = false;
    scene.add(probeMesh);
    aiProbeMeshRef.current = probeMesh;

    // Handle Window Resize
    const handleResize = () => {
      if (!mount || !renderer || !camera) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Plinth Turntable Rotation
      if (isRotating && plinthGroup) {
        plinthGroup.rotation.y += rotationSpeed;
      }

      // Pulse active pin or AI probe
      if (aiProbeMeshRef.current && aiProbeMeshRef.current.visible) {
        const time = clock.getElapsedTime();
        const scale = 1 + Math.sin(time * 6) * 0.25;
        aiProbeMeshRef.current.scale.set(scale, scale, scale);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
    };
  }, [organ, shadingMode, showPins, isIsolateMode, activePin?.id]);

  // Mouse & Touch Orbit Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isSketchMode) return;
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isSketchMode) {
      if (!isDrawing) return;
      drawSketch(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      return;
    }

    if (!isDraggingRef.current || !plinthGroupRef.current) return;
    const deltaX = e.clientX - prevMousePosRef.current.x;
    const deltaY = e.clientY - prevMousePosRef.current.y;

    plinthGroupRef.current.rotation.y += deltaX * 0.008;
    plinthGroupRef.current.rotation.x = Math.max(-0.4, Math.min(0.4, plinthGroupRef.current.rotation.x + deltaY * 0.005));

    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    if (isSketchMode) {
      setIsDrawing(false);
    }
  };

  // Raycasting for clicking 3D pins and AI probe scanner
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSketchMode) return;
    if (!mountRef.current || !cameraRef.current || !sceneRef.current) return;

    const rect = mountRef.current.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);

    // 1. Check if user clicked an anatomical Pin
    if (pinsGroupRef.current && showPins) {
      const pinIntersects = raycaster.intersectObjects(pinsGroupRef.current.children, true);
      if (pinIntersects.length > 0) {
        let hitObj: THREE.Object3D | null = pinIntersects[0].object;
        while (hitObj && !hitObj.userData.pinData) {
          hitObj = hitObj.parent;
        }
        if (hitObj && hitObj.userData.pinData) {
          const clickedPin: AnatomicalPin = hitObj.userData.pinData;
          onSelectPin(clickedPin);
          speakAnnotation(`${clickedPin.label}. ${clickedPin.latinName}. ${clickedPin.clinicalSignificance}`);
          return;
        }
      }
    }

    // 2. If in AI Scanner Mode, drop probe onto organ surface
    if (isAiScannerActive && organGroupRef.current) {
      const organIntersects = raycaster.intersectObjects(organGroupRef.current.children, true);
      if (organIntersects.length > 0) {
        const hit = organIntersects[0];
        const point = hit.point;
        setScannerProbePoint([point.x, point.y, point.z]);

        // Place holographic probe marker
        if (aiProbeMeshRef.current) {
          aiProbeMeshRef.current.position.copy(point.clone().add(hit.face?.normal.clone().multiplyScalar(0.05) || new THREE.Vector3(0, 0, 0.05)));
          aiProbeMeshRef.current.lookAt(point.clone().add(hit.face?.normal || new THREE.Vector3(0, 0, 1)));
          aiProbeMeshRef.current.visible = true;
        }

        // Run live AI diagnostic analysis simulation
        setProbeStatusText('Analyzing surface optical reflectance & cellular dysplasia probability...');
        setTimeout(() => {
          // Find closest simulation or pin
          const sim = organ.aiSimulations[1] || organ.aiSimulations[0];
          onSelectSimulation(sim);
          setProbeStatusText(`Active Probe Point: [${point.x.toFixed(2)}, ${point.y.toFixed(2)}, ${point.z.toFixed(2)}] • ${sim.categoryTitle}`);
          speakAnnotation(`AI Diagnostic Scan Complete. ${sim.categoryTitle}. ${sim.tissueDescription}`);
        }, 600);
      }
    }
  };

  // Preset Camera Angles
  const setCameraAngle = (view: 'anterior' | 'lateral' | 'superior' | 'reset') => {
    if (!plinthGroupRef.current || !cameraRef.current) return;
    setIsRotating(false);
    if (view === 'anterior') {
      plinthGroupRef.current.rotation.set(0, 0, 0);
    } else if (view === 'lateral') {
      plinthGroupRef.current.rotation.set(0, Math.PI / 2, 0);
    } else if (view === 'superior') {
      plinthGroupRef.current.rotation.set(0.65, 0, 0);
    } else {
      plinthGroupRef.current.rotation.set(0, 0, 0);
      cameraRef.current.position.set(0, 0.6, 4.2);
    }
  };

  // Zoom controls
  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const factor = direction === 'in' ? 0.82 : 1.22;
    cameraRef.current.position.multiplyScalar(factor);
  };

  // Sketch Drawing Functions
  const startSketch = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isSketchMode) return;
    setIsDrawing(true);
    const canvas = sketchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const drawSketch = (x: number, y: number) => {
    const canvas = sketchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = inkWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = inkColor;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clearSketch = () => {
    const canvas = sketchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Snapshot download
  const handleSaveSnapshot = () => {
    if (!rendererRef.current) return;
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `aarogya-drishti-anatomy-${organ.id}.png`;
    a.click();
  };

  return (
    <div className="relative w-full h-[640px] sm:h-[720px] rounded-2xl overflow-hidden border border-[#dce8e9] bg-[#18242b] shadow-2xl select-none font-sans">
      
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleCanvasClick}
      />

      {/* Transparent Ink-Sketch Annotation Overlay Canvas */}
      {isSketchMode && (
        <canvas
          ref={sketchCanvasRef}
          width={1200}
          height={720}
          className="absolute inset-0 w-full h-full cursor-crosshair z-20"
          onMouseDown={startSketch}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      )}

      {/* Top Banner: Organ Latin Inscription & Curatorial Heading */}
      <div className="absolute top-4 left-4 right-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pointer-events-none z-10">
        <div className="bg-[#18242b]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 shadow-lg pointer-events-auto">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping" />
            <h2 className="text-white font-serif font-black text-lg sm:text-xl tracking-wide">
              {organ.name}
            </h2>
          </div>
          <p className="text-amber-200/90 font-serif italic text-xs tracking-wider">
            {organ.latinName} • {organ.category}
          </p>
        </div>

        {/* Live AI Status Pill */}
        <div className="bg-[#18242b]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-emerald-500/30 flex items-center gap-2 text-xs text-white shadow-lg pointer-events-auto">
          <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] text-emerald-300 font-semibold">
            AD-OralNet v2.4.1 Live AI
          </span>
          <button
            onClick={() => setIsSpeechActive(!isSpeechActive)}
            className={`p-1 rounded-md transition-colors ${isSpeechActive ? 'text-emerald-400 bg-emerald-950/60' : 'text-gray-400 hover:text-white'}`}
            title="Toggle voice narration of anatomical structures"
          >
            {isSpeechActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Floating Left Toolbar: Interactive Classical Studio Tools */}
      <div className="absolute top-24 left-4 flex flex-col gap-2 z-10 pointer-events-auto">
        
        {/* Shading Mode Switcher */}
        <div className="bg-[#18242b]/95 backdrop-blur-md p-1.5 rounded-xl border border-white/15 flex flex-col gap-1 shadow-xl">
          <button
            onClick={() => setShadingMode('wax')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-left flex items-center gap-2 ${
              shadingMode === 'wax' ? 'bg-[#087F8C] text-white shadow-xs' : 'text-gray-300 hover:bg-white/10'
            }`}
            title="Anatomical Wax Model Shading"
          >
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span className="hidden sm:inline">Wax Resin</span>
          </button>

          <button
            onClick={() => setShadingMode('ink')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-left flex items-center gap-2 ${
              shadingMode === 'ink' ? 'bg-[#c97a63] text-white shadow-xs' : 'text-gray-300 hover:bg-white/10'
            }`}
            title="Hand-Inked Etching (Da Vinci / Vesalius style)"
          >
            <span className="w-2 h-2 rounded-full bg-amber-200" />
            <span className="hidden sm:inline">Ink Etching</span>
          </button>

          <button
            onClick={() => setShadingMode('sepia')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-left flex items-center gap-2 ${
              shadingMode === 'sepia' ? 'bg-[#8c5338] text-white shadow-xs' : 'text-gray-300 hover:bg-white/10'
            }`}
            title="Vintage Sepia Folio Wash"
          >
            <span className="w-2 h-2 rounded-full bg-[#d4a373]" />
            <span className="hidden sm:inline">Sepia Folio</span>
          </button>
        </div>

        {/* Section Tool / Cut Plane Button & Depth Slider */}
        <div className="bg-[#18242b]/95 backdrop-blur-md p-2 rounded-xl border border-white/15 flex flex-col gap-1.5 shadow-xl">
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-300 px-1">
            <span className="flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5 text-amber-400" />
              Section Slicer
            </span>
            <span className="text-amber-400 font-mono">{sectionPlane.toUpperCase()}</span>
          </div>

          <div className="grid grid-cols-4 gap-1 text-[10px] font-bold">
            <button
              onClick={() => setSectionPlane('none')}
              className={`py-1 rounded text-center ${sectionPlane === 'none' ? 'bg-white/25 text-white' : 'text-gray-400 hover:bg-white/10'}`}
            >
              Off
            </button>
            <button
              onClick={() => setSectionPlane('sagittal')}
              className={`py-1 rounded text-center ${sectionPlane === 'sagittal' ? 'bg-amber-600 text-white' : 'text-gray-400 hover:bg-white/10'}`}
            >
              Sag
            </button>
            <button
              onClick={() => setSectionPlane('coronal')}
              className={`py-1 rounded text-center ${sectionPlane === 'coronal' ? 'bg-amber-600 text-white' : 'text-gray-400 hover:bg-white/10'}`}
            >
              Cor
            </button>
            <button
              onClick={() => setSectionPlane('transverse')}
              className={`py-1 rounded text-center ${sectionPlane === 'transverse' ? 'bg-amber-600 text-white' : 'text-gray-400 hover:bg-white/10'}`}
            >
              Tra
            </button>
          </div>

          {sectionPlane !== 'none' && (
            <div className="pt-1">
              <input
                type="range"
                min="-1.2"
                max="1.2"
                step="0.05"
                value={sectionDepth}
                onChange={(e) => setSectionDepth(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1 bg-white/20 rounded"
              />
            </div>
          )}
        </div>

        {/* Isolate Tool Button */}
        <button
          onClick={() => setIsIsolateMode(!isIsolateMode)}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xl border ${
            isIsolateMode 
              ? 'bg-amber-500 text-black border-amber-400 font-black' 
              : 'bg-[#18242b]/95 text-gray-200 border-white/15 hover:bg-white/10'
          }`}
          title="Isolate selected anatomical structure"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{isIsolateMode ? 'Isolate: Active' : 'Isolate Tool'}</span>
        </button>

        {/* Ink-Sketch Annotation Tool Button */}
        <button
          onClick={() => setIsSketchMode(!isSketchMode)}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xl border ${
            isSketchMode 
              ? 'bg-rose-600 text-white border-rose-400 font-black animate-pulse' 
              : 'bg-[#18242b]/95 text-gray-200 border-white/15 hover:bg-white/10'
          }`}
          title="Toggle hand-drawn quill ink sketch over 3D model"
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>{isSketchMode ? 'Sketching...' : 'Ink Annotator'}</span>
        </button>

        {/* Sketch Color Palette when active */}
        {isSketchMode && (
          <div className="bg-[#18242b]/95 backdrop-blur-md p-2 rounded-xl border border-rose-500/40 flex flex-col gap-1.5 shadow-xl text-[11px] text-gray-200">
            <span className="font-semibold text-rose-300">Quill Ink Color</span>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setInkColor('#8c2d19')} 
                className={`w-5 h-5 rounded-full bg-[#8c2d19] border-2 ${inkColor === '#8c2d19' ? 'border-white scale-110' : 'border-transparent'}`} 
              />
              <button 
                onClick={() => setInkColor('#1a1a1a')} 
                className={`w-5 h-5 rounded-full bg-[#1a1a1a] border-2 ${inkColor === '#1a1a1a' ? 'border-white scale-110' : 'border-transparent'}`} 
              />
              <button 
                onClick={() => setInkColor('#087F8C')} 
                className={`w-5 h-5 rounded-full bg-[#087F8C] border-2 ${inkColor === '#087F8C' ? 'border-white scale-110' : 'border-transparent'}`} 
              />
              <button 
                onClick={() => setInkColor('#d97706')} 
                className={`w-5 h-5 rounded-full bg-[#d97706] border-2 ${inkColor === '#d97706' ? 'border-white scale-110' : 'border-transparent'}`} 
              />
            </div>
            <div className="flex gap-1 pt-1">
              <button
                onClick={clearSketch}
                className="flex-1 py-1 bg-white/15 hover:bg-white/25 rounded text-[10px] font-bold text-center"
              >
                Clear Ink
              </button>
            </div>
          </div>
        )}

        {/* AI Diagnostic Live Probe Trigger */}
        <button
          onClick={() => {
            const nextState = !isAiScannerActive;
            setIsAiScannerActive(nextState);
            if (aiProbeMeshRef.current) {
              aiProbeMeshRef.current.visible = nextState;
            }
          }}
          className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xl border ${
            isAiScannerActive 
              ? 'bg-emerald-500 text-black border-emerald-300 font-black animate-pulse' 
              : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30 hover:bg-emerald-900'
          }`}
          title="Drop AI Diagnostic Scanner Probe anywhere on the 3D organ"
        >
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span>{isAiScannerActive ? 'AI Probe: ON' : 'AI Diagnostic Probe'}</span>
        </button>

      </div>

      {/* Floating Right Control Palette: Camera & Turntable */}
      <div className="absolute top-24 right-4 flex flex-col gap-2 z-10 pointer-events-auto">
        <div className="bg-[#18242b]/95 backdrop-blur-md p-2 rounded-xl border border-white/15 flex flex-col gap-1.5 shadow-xl text-gray-300">
          
          {/* Turntable Auto-Spin Toggle */}
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
              isRotating ? 'bg-amber-500 text-black' : 'text-gray-300 hover:bg-white/10'
            }`}
            title="Toggle turntable continuous rotation"
          >
            <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
          </button>

          {/* Toggle Pins Visibility */}
          <button
            onClick={() => setShowPins(!showPins)}
            className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
              showPins ? 'bg-[#087F8C] text-white' : 'text-gray-400 hover:bg-white/10'
            }`}
            title="Toggle anatomical pins"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Preset Angles */}
          <button
            onClick={() => setCameraAngle('anterior')}
            className="p-1.5 rounded hover:bg-white/10 text-[10px] font-bold text-center"
            title="Anterior front view"
          >
            Ant
          </button>
          <button
            onClick={() => setCameraAngle('lateral')}
            className="p-1.5 rounded hover:bg-white/10 text-[10px] font-bold text-center"
            title="Lateral profile view"
          >
            Lat
          </button>
          <button
            onClick={() => setCameraAngle('superior')}
            className="p-1.5 rounded hover:bg-white/10 text-[10px] font-bold text-center"
            title="Superior cranial view"
          >
            Sup
          </button>

          <hr className="border-white/10 my-0.5" />

          {/* Zoom In / Out */}
          <button
            onClick={() => handleZoom('in')}
            className="p-2 rounded hover:bg-white/10 flex items-center justify-center"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            className="p-2 rounded hover:bg-white/10 flex items-center justify-center"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Reset View */}
          <button
            onClick={() => setCameraAngle('reset')}
            className="p-2 rounded hover:bg-white/10 flex items-center justify-center text-amber-300"
            title="Reset camera view"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Save High-Res Snapshot */}
          <button
            onClick={handleSaveSnapshot}
            className="p-2 rounded hover:bg-white/10 flex items-center justify-center text-emerald-400"
            title="Capture high-resolution anatomical plate snapshot"
          >
            <Camera className="w-4 h-4" />
          </button>

        </div>
      </div>

      {/* Bottom Floating Telemetry & AI Probe Diagnostic Bar */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-10">
        <div className="bg-[#18242b]/95 backdrop-blur-md px-4 py-3 rounded-xl border border-white/15 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pointer-events-auto">
          
          {/* Status Message */}
          <div className="flex items-center gap-2 text-xs text-gray-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono">{probeStatusText}</span>
          </div>

          {/* Active Pin or Simulation Quick Indicator */}
          {activePin && (
            <div className="flex items-center gap-2 bg-[#087F8C]/40 border border-[#087F8C] px-3 py-1 rounded-lg text-xs text-white">
              <span className="font-bold text-amber-300">Pin #{activePin.number}:</span>
              <span>{activePin.label}</span>
              <button
                onClick={() => onSelectPin(null)}
                className="text-gray-400 hover:text-white ml-1 font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* Turntable Speed Slider */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-gray-400">
            <span>Turntable Speed:</span>
            <input
              type="range"
              min="0.002"
              max="0.03"
              step="0.002"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
              className="accent-[#087F8C] h-1 w-20 bg-white/20 rounded cursor-pointer"
            />
          </div>

        </div>
      </div>

    </div>
  );
};
