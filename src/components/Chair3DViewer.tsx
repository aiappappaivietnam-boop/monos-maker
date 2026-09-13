/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  Layers, 
  Eye, 
  Maximize2, 
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';

interface Chair3DViewerProps {
  className?: string;
}

type MaterialPreset = 'cognac' | 'sand' | 'obsidian';
type ViewMode = 'rendered' | 'blueprint' | 'clay';

export default function Chair3DViewer({ className = '' }: Chair3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [activeMaterial, setActiveMaterial] = useState<MaterialPreset>('cognac');
  const [viewMode, setViewMode] = useState<ViewMode>('rendered');
  const [showHotspots, setShowHotspots] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [angleDeg, setAngleDeg] = useState(0);

  // References for Three.js animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const chairGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<{ [key: string]: THREE.Material }>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 340;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.3, 3.4);
    camera.lookAt(0, 0.05, 0);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // Clear previous children and append canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Key Light (warm soft highlight)
    const keyLight = new THREE.DirectionalLight(0xfffdfa, 1.8);
    keyLight.position.set(2.5, 3.5, 2.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 10;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Fill Light (cool soft contrast)
    const fillLight = new THREE.DirectionalLight(0xe8f0fe, 1.0);
    fillLight.position.set(-2.5, 2.0, -1.5);
    scene.add(fillLight);

    // Top Rim Light
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, 3.0, -2.5);
    scene.add(rimLight);

    // 5. Studio Floor Grid & Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x202124,
      transparent: true,
      opacity: 0.08,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.58;
    scene.add(shadowMesh);

    // Circular Studio Ring
    const ringGeo = new THREE.RingGeometry(0.88, 0.90, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x1a73e8,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = -0.579;
    scene.add(ringMesh);

    // 6. BUILD HIGH-END SCULPTURAL DESIGNER CHAIR
    const chairGroup = new THREE.Group();
    chairGroupRef.current = chairGroup;
    scene.add(chairGroup);

    // Master Geometries & Meshes
    // A. Main Seat Cushion (Plush organic curve)
    const seatGeo = new THREE.BoxGeometry(0.72, 0.12, 0.68, 6, 2, 6);
    // Deform vertices for subtle organic ergonomics
    const seatPos = seatGeo.attributes.position;
    for (let i = 0; i < seatPos.count; i++) {
      const x = seatPos.getX(i);
      const y = seatPos.getY(i);
      const z = seatPos.getZ(i);
      if (y > 0) {
        // slight ergonomic concave bowl
        seatPos.setY(i, y - (1 - (x*x + z*z)*1.5) * 0.02);
      }
    }
    seatGeo.computeVertexNormals();

    // B. Backrest (Curved comfort angle)
    const backGeo = new THREE.BoxGeometry(0.68, 0.74, 0.10, 6, 6, 2);
    const backPos = backGeo.attributes.position;
    for (let i = 0; i < backPos.count; i++) {
      const x = backPos.getX(i);
      const y = backPos.getY(i);
      const z = backPos.getZ(i);
      // Curve backrest wings slightly inward
      backPos.setZ(i, z + Math.abs(x) * 0.08);
    }
    backGeo.computeVertexNormals();

    // C. Headrest Cushion
    const headrestGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.54, 32);
    headrestGeo.rotateZ(Math.PI / 2);

    // D. Outer Wooden Sculptural Shell (Molded bentwood)
    const shellGeo = new THREE.BoxGeometry(0.76, 0.06, 0.72);
    const backShellGeo = new THREE.BoxGeometry(0.72, 0.78, 0.05);

    // E. 4-Star Architectural Swivel Base
    const centerHubGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.28, 24);
    const starLegGeo = new THREE.BoxGeometry(0.035, 0.028, 0.46);
    starLegGeo.rotateX(0.12);

    // Materials Library
    const mats = {
      // Cognac Palette
      cognacCushion: new THREE.MeshStandardMaterial({
        color: 0x9b5123,
        roughness: 0.42,
        metalness: 0.05,
      }),
      cognacShell: new THREE.MeshStandardMaterial({
        color: 0x422617, // Deep Walnut
        roughness: 0.35,
        metalness: 0.1,
      }),
      cognacMetal: new THREE.MeshStandardMaterial({
        color: 0x1f2328, // Matte Charcoal Black
        roughness: 0.25,
        metalness: 0.85,
      }),

      // Sand / Nordic Palette
      sandCushion: new THREE.MeshStandardMaterial({
        color: 0xe6ded2, // Ivory Boucle
        roughness: 0.75,
        metalness: 0.0,
      }),
      sandShell: new THREE.MeshStandardMaterial({
        color: 0xd2ba97, // Natural Light Oak
        roughness: 0.4,
        metalness: 0.05,
      }),
      sandMetal: new THREE.MeshStandardMaterial({
        color: 0xc8a467, // Brushed Champagne Brass
        roughness: 0.3,
        metalness: 0.9,
      }),

      // Obsidian Palette
      obsidianCushion: new THREE.MeshStandardMaterial({
        color: 0x1a1d24, // Midnight Charcoal Leather
        roughness: 0.38,
        metalness: 0.1,
      }),
      obsidianShell: new THREE.MeshStandardMaterial({
        color: 0x121316, // Black Ash
        roughness: 0.3,
        metalness: 0.15,
      }),
      obsidianMetal: new THREE.MeshStandardMaterial({
        color: 0x3c4043, // Gunmetal Titanium
        roughness: 0.2,
        metalness: 0.92,
      }),

      // Blueprint Wireframe
      wireframeMat: new THREE.MeshBasicMaterial({
        color: 0x1a73e8,
        wireframe: true,
      }),

      // Clay Mode
      clayMat: new THREE.MeshStandardMaterial({
        color: 0xecf0f1,
        roughness: 0.6,
        metalness: 0.0,
      })
    };
    materialsRef.current = mats;

    // Build the Chair Hierarchy
    // 1. Seat Group
    const seatMesh = new THREE.Mesh(seatGeo, mats.cognacCushion);
    seatMesh.position.set(0, -0.04, 0.02);
    seatMesh.castShadow = true;
    seatMesh.receiveShadow = true;
    seatMesh.name = 'cushion';

    const seatShellMesh = new THREE.Mesh(shellGeo, mats.cognacShell);
    seatShellMesh.position.set(0, -0.11, 0.02);
    seatShellMesh.castShadow = true;
    seatShellMesh.name = 'shell';

    // 2. Backrest Group (Tilted ergonomically 14 degrees)
    const backGroup = new THREE.Group();
    backGroup.position.set(0, -0.04, -0.28);
    backGroup.rotation.x = -0.24; // Recline angle

    const backMesh = new THREE.Mesh(backGeo, mats.cognacCushion);
    backMesh.position.set(0, 0.42, 0.02);
    backMesh.castShadow = true;
    backMesh.name = 'cushion';

    const backShellMesh = new THREE.Mesh(backShellGeo, mats.cognacShell);
    backShellMesh.position.set(0, 0.42, -0.045);
    backShellMesh.castShadow = true;
    backShellMesh.name = 'shell';

    const headrestMesh = new THREE.Mesh(headrestGeo, mats.cognacCushion);
    headrestMesh.position.set(0, 0.74, 0.06);
    headrestMesh.castShadow = true;
    headrestMesh.name = 'cushion';

    backGroup.add(backShellMesh);
    backGroup.add(backMesh);
    backGroup.add(headrestMesh);

    // 3. Armrests (Sculptural cantilever)
    const armLeft = createArmrest(mats.cognacShell, mats.cognacMetal, -1);
    const armRight = createArmrest(mats.cognacShell, mats.cognacMetal, 1);

    // 4. Base Star Leg System
    const baseGroup = new THREE.Group();
    baseGroup.position.set(0, -0.14, 0);

    const centerHub = new THREE.Mesh(centerHubGeo, mats.cognacMetal);
    centerHub.position.set(0, -0.14, 0);
    centerHub.castShadow = true;
    centerHub.name = 'metal';
    baseGroup.add(centerHub);

    // 4 Star Legs (90 deg increments)
    for (let i = 0; i < 4; i++) {
      const leg = new THREE.Mesh(starLegGeo, mats.cognacMetal);
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      leg.rotation.y = angle;
      leg.position.set(
        Math.sin(angle) * 0.22,
        -0.28,
        Math.cos(angle) * 0.22
      );
      leg.castShadow = true;
      leg.name = 'metal';
      baseGroup.add(leg);

      // Floor glide
      const glideGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.015, 16);
      const glide = new THREE.Mesh(glideGeo, mats.cognacMetal);
      glide.position.set(
        Math.sin(angle) * 0.42,
        -0.42,
        Math.cos(angle) * 0.42
      );
      glide.name = 'metal';
      baseGroup.add(glide);
    }

    // Assemble Chair
    chairGroup.add(seatShellMesh);
    chairGroup.add(seatMesh);
    chairGroup.add(backGroup);
    chairGroup.add(armLeft);
    chairGroup.add(armRight);
    chairGroup.add(baseGroup);

    // Center pivot slightly for natural rotation
    chairGroup.position.set(0, 0.05, 0);
    chairGroup.rotation.y = THREE.MathUtils.degToRad(32);

    // 7. Interactive Drag Orbit Handling
    let isDragging = false;
    let previousMouseX = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      previousMouseX = clientX;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !chairGroupRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - previousMouseX;
      previousMouseX = clientX;

      chairGroupRef.current.rotation.y += deltaX * 0.012;
      const currentDeg = Math.round(THREE.MathUtils.radToDeg(chairGroupRef.current.rotation.y) % 360 + 360) % 360;
      setAngleDeg(currentDeg);
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    domElement.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // 8. Render Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (chairGroupRef.current) {
        if (isAutoRotate && !isDragging) {
          chairGroupRef.current.rotation.y += 0.0075;
          const deg = Math.round(THREE.MathUtils.radToDeg(chairGroupRef.current.rotation.y) % 360 + 360) % 360;
          setAngleDeg(deg);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domElement.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Helper to build modern curved Armrest
  function createArmrest(shellMat: THREE.Material, metalMat: THREE.Material, side: number) {
    const armGroup = new THREE.Group();
    const xPos = side * 0.41;

    // Sculpted wooden arm pad
    const padGeo = new THREE.BoxGeometry(0.07, 0.024, 0.44);
    const padMesh = new THREE.Mesh(padGeo, shellMat);
    padMesh.position.set(xPos, 0.14, -0.02);
    padMesh.rotation.x = -0.08;
    padMesh.castShadow = true;
    padMesh.name = 'shell';
    armGroup.add(padMesh);

    // Metal support strut
    const strutGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.22, 16);
    const strut = new THREE.Mesh(strutGeo, metalMat);
    strut.position.set(xPos * 0.95, 0.03, 0.08);
    strut.castShadow = true;
    strut.name = 'metal';
    armGroup.add(strut);

    return armGroup;
  }

  // Update materials dynamically
  useEffect(() => {
    if (!chairGroupRef.current || !materialsRef.current) return;
    const mats = materialsRef.current;

    let cushionMat = mats.cognacCushion;
    let shellMat = mats.cognacShell;
    let metalMat = mats.cognacMetal;

    if (activeMaterial === 'sand') {
      cushionMat = mats.sandCushion;
      shellMat = mats.sandShell;
      metalMat = mats.sandMetal;
    } else if (activeMaterial === 'obsidian') {
      cushionMat = mats.obsidianCushion;
      shellMat = mats.obsidianShell;
      metalMat = mats.obsidianMetal;
    }

    chairGroupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (viewMode === 'blueprint') {
          child.material = mats.wireframeMat;
        } else if (viewMode === 'clay') {
          child.material = mats.clayMat;
        } else {
          // Rendered PBR mode
          if (child.name === 'cushion') child.material = cushionMat;
          else if (child.name === 'shell') child.material = shellMat;
          else if (child.name === 'metal') child.material = metalMat;
        }
      }
    });
  }, [activeMaterial, viewMode]);

  return (
    <div className={`w-full max-w-[360px] aspect-square bg-gradient-to-b from-[#ffffff] to-[#f8f9fa] border border-[#dadce0] rounded-3xl p-5 flex flex-col justify-between relative shadow-sm select-none overflow-hidden group ${className}`}>
      
      {/* Top Floating Control Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#5f6368] z-10">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#dadce0] shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#1a73e8] animate-pulse" />
          <span className="font-bold text-[#202124] tracking-tight">3D REAL-TIME</span>
        </div>

        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#dadce0] text-[10px] text-[#1a73e8] font-bold shadow-2xs">
          <RotateCw className="w-3 h-3 animate-spin" style={{ animationDuration: isAutoRotate ? '4s' : '0s' }} />
          <span>{angleDeg}° ORBIT</span>
        </div>
      </div>

      {/* 3D Canvas Mount Stage */}
      <div className="relative w-full h-[230px] my-auto flex items-center justify-center cursor-grab active:cursor-grabbing">
        <div ref={containerRef} className="w-full h-full" />

        {/* Blueprint Dimension Overlay (Optional/Hover) */}
        <div className="absolute left-2 top-8 bottom-12 flex flex-col justify-between items-center pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
          <div className="h-full w-[1px] bg-[#1a73e8] relative flex flex-col justify-between items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8]" />
            <span className="text-[9px] font-mono text-[#1a73e8] bg-white px-1 py-0.5 rounded border border-[#1a73e8]/30 -rotate-90 origin-center whitespace-nowrap">
              H: 840mm
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8]" />
          </div>
        </div>

        {/* Hotspot Floating Badges */}
        {showHotspots && (
          <>
            <button 
              onClick={() => setActiveHotspot('Đệm đúc công thái học High-Density Foam')}
              className="absolute top-[42%] left-[48%] w-5 h-5 rounded-full bg-[#1a73e8] text-white flex items-center justify-center text-[10px] font-bold shadow-md animate-bounce cursor-pointer hover:scale-125 transition-transform"
            >
              1
            </button>
            <button 
              onClick={() => setActiveHotspot('Vỏ gỗ uốn nhiệt 3D Molded Plywood')}
              className="absolute bottom-[38%] right-[22%] w-5 h-5 rounded-full bg-[#1a73e8] text-white flex items-center justify-center text-[10px] font-bold shadow-md animate-bounce cursor-pointer hover:scale-125 transition-transform"
            >
              2
            </button>
          </>
        )}

        {/* Active Hotspot Tooltip */}
        {activeHotspot && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#202124] text-white text-[10px] px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 z-20 whitespace-nowrap border border-white/10">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#34a853]" />
            <span>{activeHotspot}</span>
            <button onClick={() => setActiveHotspot(null)} className="ml-1 text-white/60 hover:text-white">✕</button>
          </div>
        )}

        {/* Interaction Drag Hint */}
        <div className="absolute bottom-1 right-2 bg-white/90 backdrop-blur-md border border-[#dadce0] rounded-full px-2.5 py-0.5 text-[9px] font-mono text-[#5f6368] opacity-0 group-hover:opacity-100 transition-opacity shadow-2xs pointer-events-none">
          Kéo để xoay 360°
        </div>
      </div>

      {/* Bottom Control Deck */}
      <div className="border-t border-[#dadce0] pt-2.5 flex items-center justify-between text-[11px] z-10">
        
        {/* Material Presets */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#5f6368] font-semibold mr-0.5">Vật liệu:</span>
          {[
            { key: 'cognac' as const, bg: '#9b5123', label: 'Cognac Leather & Walnut' },
            { key: 'sand' as const, bg: '#e6ded2', label: 'Nordic Sand & Light Oak' },
            { key: 'obsidian' as const, bg: '#1a1d24', label: 'Obsidian Black & Ash' }
          ].map(m => (
            <button
              key={m.key}
              onClick={() => {
                setViewMode('rendered');
                setActiveMaterial(m.key);
              }}
              title={m.label}
              className={`w-4 h-4 rounded-full border transition-all cursor-pointer shadow-2xs ${
                activeMaterial === m.key && viewMode === 'rendered'
                  ? 'scale-125 border-[#202124] ring-2 ring-[#1a73e8] ring-offset-1' 
                  : 'border-[#dadce0] hover:scale-110'
              }`}
              style={{ backgroundColor: m.bg }}
            />
          ))}
        </div>

        {/* View Mode & Auto-Rotate Toggle Buttons */}
        <div className="flex items-center gap-1">
          {/* Wireframe / Blueprint toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'blueprint' ? 'rendered' : 'blueprint')}
            title="Chế độ CAD Wireframe"
            className={`p-1 rounded-md text-[10px] font-medium border transition-colors cursor-pointer ${
              viewMode === 'blueprint'
                ? 'bg-[#1a73e8] text-white border-[#1a73e8]'
                : 'bg-white text-[#5f6368] border-[#dadce0] hover:bg-[#f1f3f4]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          {/* Auto spin toggle */}
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`px-2 py-1 rounded-md text-[10px] font-semibold border transition-colors cursor-pointer ${
              isAutoRotate 
                ? 'bg-[#f1f3f4] text-[#202124] border-[#dadce0]' 
                : 'bg-[#1a73e8] text-white border-[#1a73e8]'
            }`}
          >
            {isAutoRotate ? 'Tạm dừng' : 'Tự xoay'}
          </button>
        </div>

      </div>

    </div>
  );
}
