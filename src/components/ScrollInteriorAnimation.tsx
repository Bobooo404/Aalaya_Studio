import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  Home, Maximize2, Minimize2, ChevronUp, ChevronDown 
} from 'lucide-react';

interface RoomZone {
  id: string;
  name: string;
  level: string;
  elevation: string;
  description: string;
  targetSection: string;
  color: string;
}

const ROOM_ZONES: RoomZone[] = [
  {
    id: 'entrance',
    name: 'Arrival Portal & Cantilever Entry',
    level: 'Ground Floor',
    elevation: '±0.00m',
    description: 'Double-height glazed pivot portal with polished terrazzo and minimalist bonsai courtyard.',
    targetSection: 'hero',
    color: '#B8620B'
  },
  {
    id: 'living',
    name: 'Sunken Living Salon & Hearth',
    level: 'Lower Level',
    elevation: '-0.45m',
    description: 'Low-slung modular seating around a fluted stone fireplace with floor-to-ceiling panoramic glass.',
    targetSection: 'services',
    color: '#E8797A'
  },
  {
    id: 'atrium',
    name: 'Helical Staircase & Double Atrium',
    level: 'Circulation Core',
    elevation: '+1.80m',
    description: 'Sculptural curved timber joinery with floating treads under a diffuse central skylight void.',
    targetSection: 'why-us',
    color: '#C85A17'
  },
  {
    id: 'kitchen',
    name: 'Monolith Culinary & Dining Lounge',
    level: 'First Mezzanine',
    elevation: '+3.60m',
    description: 'Honed basalt stone island, floating walnut shelving, and minimalist linear suspension lighting.',
    targetSection: 'portfolio',
    color: '#B8620B'
  },
  {
    id: 'suite',
    name: 'Master Sanctuary & Soaking Bath',
    level: 'Upper Pavilion',
    elevation: '+6.80m',
    description: 'Floating platform bed, cedar privacy louvers, and freestanding oval bath open to private bamboo lightwell.',
    targetSection: 'process',
    color: '#E8797A'
  },
  {
    id: 'terrace',
    name: 'Starlight Observatory & Water Deck',
    level: 'Sky Rooftop',
    elevation: '+9.60m',
    description: 'Cantilevered timber pergola, fire bowl cauldron, and shallow reflecting pool mirroring the twilight sky.',
    targetSection: 'contact',
    color: '#E6947E'
  }
];

interface ScrollInteriorAnimationProps {
  /** Keep the walkthrough visual-only when it sits behind page content. */
  showControls?: boolean;
}

export const ScrollInteriorAnimation: React.FC<ScrollInteriorAnimationProps> = ({
  showControls = false
}) => {
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [styleMode, setStyleMode] = useState<'shaded' | 'blueprint' | 'twilight'>('shaded');
  // The page content remains above this fixed visual layer.
  const [opacityLevel, setOpacityLevel] = useState<number>(0.6);
  const [isHudOpen, setIsHudOpen] = useState(true);
  const [isExpandedView, setIsExpandedView] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll tracking
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001
  });

  // Track active room based on scroll percentage
  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      // Map 0 - 1 to 0 - 5 zones
      const clamped = Math.max(0, Math.min(0.999, latest));
      const index = Math.floor(clamped * ROOM_ZONES.length);
      setActiveZoneIndex(index);
    });
  }, [smoothProgress]);

  // Subtle mouse parallax effect for the interior layers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 20,
        y: (e.clientY / innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentZone = ROOM_ZONES[activeZoneIndex] || ROOM_ZONES[0];

  // Camera Y translation derived from scroll (scrolling down pans the house vertically)
  // Total house height is 2400 units, viewport height is 800 units
  const cameraY = useTransform(smoothProgress, [0, 1], [0, -1600]);
  const cameraScale = useTransform(smoothProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* FIXED BACKGROUND LAYER: Interactive House Interior Cross-Section Flow */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-opacity duration-500"
        style={{ opacity: opacityLevel }}
        aria-hidden="true"
      >
        {/* Ambient Warm Gradients that shift with scroll progression */}
        <motion.div 
          className="absolute inset-0 transition-colors duration-1000"
          style={{
            background: styleMode === 'blueprint'
              ? 'radial-gradient(ellipse at 50% 50%, rgba(26,30,36,0.15) 0%, rgba(245,241,232,0.6) 100%)'
              : styleMode === 'twilight'
              ? 'radial-gradient(ellipse at 50% 30%, rgba(232,121,122,0.12) 0%, rgba(184,98,11,0.08) 50%, rgba(26,30,36,0.2) 100%)'
              : 'radial-gradient(ellipse at 50% 20%, rgba(255,248,238,0.8) 0%, rgba(245,241,232,0.4) 100%)'
          }}
        />

        {/* Drawing-title block gives the scene an immediate architectural reading. */}
        <div className="absolute right-5 top-24 hidden sm:block border-l border-[#B8620B]/40 pl-3 text-right font-mono uppercase tracking-[0.18em] text-[#7D4510]/70">
          <span className="block text-[9px]">Aalaya AS Studios</span>
          <span className="mt-1 block text-[11px] font-semibold">Interior Section A-A</span>
          <span className="mt-1 block text-[8px] tracking-[0.12em]">Scroll to explore levels</span>
        </div>

        <div className="absolute right-5 top-44 hidden sm:flex items-center gap-2 font-mono text-[8px] tracking-widest text-[#B8620B]/55">
          <span className="h-px w-10 bg-[#B8620B]/45" />
          <span>1:50 / ELEVATION</span>
        </div>

        {/* Global Architectural Axis & Elevation Marks */}
        <div className="absolute left-4 sm:left-8 top-0 bottom-0 flex flex-col justify-between py-12 text-[10px] font-mono text-[#B8620B]/40 border-r border-[#B8620B]/10 pr-3">
          <div className="space-y-1">
            <span className="block font-bold text-[#B8620B]/70">ELEVATION SECTION A-A</span>
            <span className="block">AXIS: Y-LATERAL</span>
            <span className="block text-[#E8797A]/70">SCALE 1:50</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#B8620B]/40" />
              <span>+9.60m SKY ROOF</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#B8620B]/40" />
              <span>+6.80m UPPER SUITE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#B8620B]/40" />
              <span>+3.60m MEZZANINE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#B8620B]/40" />
              <span>±0.00m GROUND ATELIER</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#B8620B]/40" />
              <span>-0.45m SUNKEN HEARTH</span>
            </div>
          </div>
          <div className="space-y-1 text-[#737373]/50">
            <span>AALAYA AS STUDIOS</span>
            <span>SECTION BIM 3.4</span>
          </div>
        </div>

        {/* MASTER ARCHITECTURAL INTERIOR SVG CANVAS */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            x: mousePos.x * 0.4,
            y: mousePos.y * 0.4,
            scale: cameraScale
          }}
        >
          <motion.svg
            viewBox="0 0 1400 2400"
            className="w-full h-[300vh] max-w-[1500px] preserve-3d"
            style={{
              y: cameraY
            }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Shading Gradients */}
              <linearGradient id="wallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={styleMode === 'blueprint' ? '#2A3340' : '#EFE8DC'} stopOpacity="0.4" />
                <stop offset="100%" stopColor={styleMode === 'blueprint' ? '#1A212B' : '#E2D8C7'} stopOpacity="0.7" />
              </linearGradient>

              <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#89C4F4" stopOpacity="0.18" />
                <stop offset="50%" stopColor="#E8797A" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#B8620B" stopOpacity="0.14" />
              </linearGradient>

              <linearGradient id="warmLightBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD180" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#FFD180" stopOpacity="0.0" />
              </linearGradient>

              <linearGradient id="fireplaceGlow" x1="50%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#C85A17" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#E8797A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#B8620B" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="timberWood" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D5A26B" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#B8620B" stopOpacity="0.6" />
              </linearGradient>

              <pattern id="slattedWood" width="16" height="16" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="16" stroke="#B8620B" strokeOpacity="0.25" strokeWidth="2" />
              </pattern>

              <pattern id="concreteTile" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="40" height="40" fill="none" stroke="#B8620B" strokeOpacity="0.08" strokeWidth="0.75" />
              </pattern>
            </defs>

            {/* ========================================================
                BUILDING STRUCTURAL SKELETON (FOUNDATION TO ROOFTOP)
                ======================================================== */}
            
            {/* Outer Structural Concrete Columns & Floor Slabs */}
            <g id="structural-shell" stroke={styleMode === 'blueprint' ? '#E8797A' : '#B8620B'} strokeWidth="1.5" opacity={styleMode === 'blueprint' ? '0.7' : '0.45'}>
              {/* Foundation Slab */}
              <rect x="250" y="2150" width="900" height="45" fill="url(#wallGradient)" />
              <text x="260" y="2180" className="text-[14px] font-mono fill-[#B8620B]/60">CONCRETE RAFT FOOTING T-600</text>

              {/* Main Structural Columns Left and Right */}
              <line x1="250" y1="250" x2="250" y2="2150" strokeWidth="3" />
              <line x1="1150" y1="250" x2="1150" y2="2150" strokeWidth="3" />
              
              {/* Intermediate Bearing Shear Walls */}
              <line x1="580" y1="250" x2="580" y2="1850" strokeDasharray="6 6" strokeWidth="1" />
              <line x1="880" y1="650" x2="880" y2="1850" strokeDasharray="6 6" strokeWidth="1" />

              {/* Floor Slab Levels */}
              {/* Level 0: Ground Slab */}
              <rect x="250" y="1780" width="900" height="24" fill="url(#wallGradient)" />
              {/* Level 1: Mezzanine / Dining */}
              <rect x="250" y="1320" width="620" height="20" fill="url(#wallGradient)" />
              {/* Level 2: Upper Sanctuary */}
              <rect x="520" y="860" width="630" height="20" fill="url(#wallGradient)" />
              {/* Level 3: Rooftop Pergola Deck */}
              <rect x="250" y="380" width="900" height="24" fill="url(#wallGradient)" />
            </g>

            {/* ========================================================
                ZONE 1: ARRIVAL PORTAL & CANTILEVER ENTRY (Y: 1780 - 2150)
                ======================================================== */}
            <g id="zone-1-entrance" className="transition-all duration-700">
              {/* Concrete tile flooring */}
              <rect x="252" y="1804" width="896" height="346" fill="url(#concreteTile)" />

              {/* Grand Pivot Door (Angle open) */}
              <g transform="translate(320, 1804)">
                {/* Door Frame */}
                <rect x="0" y="0" width="180" height="280" stroke="#1A1A1A" strokeWidth="2" fill="none" opacity="0.4" />
                {/* Pivot Leaf tilted */}
                <path d="M0,280 L130,220 L130,-40 L0,0 Z" fill="url(#timberWood)" opacity="0.85" stroke="#B8620B" strokeWidth="1.5" />
                {/* Vertical Flush Handle in Brushed Brass */}
                <line x1="115" y1="60" x2="115" y2="140" stroke="#D5A26B" strokeWidth="3" />
                {/* Door Swing Arc blueprint */}
                <path d="M180,280 A180,180 0 0,1 130,220" stroke="#E8797A" strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
              </g>

              {/* Entry Bonsai in Minimalist Stone Basin */}
              <g transform="translate(560, 1980)">
                <ellipse cx="60" cy="80" rx="45" ry="12" fill="#E2D8C7" stroke="#B8620B" strokeWidth="1" />
                {/* Trunk */}
                <path d="M60,80 Q55,40 70,25 Q75,15 85,10" stroke="#8A5A36" strokeWidth="4" fill="none" strokeLinecap="round" />
                {/* Pine Needle Foliage Clouds */}
                <ellipse cx="85" cy="10" rx="26" ry="12" fill="#4B6B58" opacity="0.65" />
                <ellipse cx="65" cy="30" rx="20" ry="10" fill="#3D5A49" opacity="0.6" />
                <ellipse cx="95" cy="22" rx="16" ry="8" fill="#5E7D6A" opacity="0.7" />
              </g>

              {/* Terrazzo Bench & Coat Niche */}
              <g transform="translate(740, 1960)">
                <rect x="0" y="40" width="180" height="18" rx="3" fill="#D8CFBF" stroke="#B8620B" strokeWidth="1" />
                <rect x="20" y="58" width="14" height="60" fill="#9E9282" />
                <rect x="146" y="58" width="14" height="60" fill="#9E9282" />
                {/* Minimalist Recessed Sconce */}
                <circle cx="90" cy="-60" r="8" fill="#FFD180" opacity="0.8" />
                <path d="M90,-52 L40,30 L140,30 Z" fill="url(#warmLightBeam)" />
              </g>

              {/* Entrance Zone Annotation */}
              <g transform="translate(960, 1860)">
                <rect x="0" y="0" width="160" height="42" rx="6" fill="#F5F1E8" stroke="#B8620B" strokeWidth="1" opacity="0.9" />
                <text x="14" y="20" className="text-[11px] font-mono font-bold fill-[#B8620B]">PORTAL 01: ENTRY</text>
                <text x="14" y="34" className="text-[9px] font-mono fill-[#737373]">LEVEL ±0.00m GROUND</text>
              </g>
            </g>

            {/* ========================================================
                ZONE 2: SUNKEN LIVING SALON & HEARTH (Y: 1780 - 2100 right half)
                ======================================================== */}
            <g id="zone-2-living" className="transition-all duration-700">
              {/* Stepped Down 3 Steps into Sunken Pit */}
              <g transform="translate(680, 1780)">
                {/* Step 1 */}
                <rect x="0" y="0" width="460" height="10" fill="#E8DFCE" stroke="#B8620B" strokeWidth="0.8" />
                {/* Step 2 */}
                <rect x="40" y="10" width="420" height="10" fill="#DFD4C1" stroke="#B8620B" strokeWidth="0.8" />
                {/* Step 3 (Sunken Floor -0.45m) */}
                <rect x="80" y="20" width="380" height="260" fill="#F7F3EB" stroke="#B8620B" strokeWidth="1" />

                {/* Sunken Modular Velvet Sofa Pit */}
                <path d="M120,80 L360,80 L360,200 L300,200 L300,140 L120,140 Z" fill="#D9C3B0" opacity="0.75" stroke="#B8620B" strokeWidth="1.2" />
                {/* Sofa Cushions Lines */}
                <line x1="180" y1="80" x2="180" y2="140" stroke="#B8620B" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="240" y1="80" x2="240" y2="140" stroke="#B8620B" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="300" y1="80" x2="300" y2="140" stroke="#B8620B" strokeWidth="0.8" strokeDasharray="2 2" />
                
                {/* Low Travertine Coffee Table */}
                <ellipse cx="200" cy="170" rx="42" ry="20" fill="#EBE4D5" stroke="#B8620B" strokeWidth="1" />
                {/* Art Book & Ceramic Vessel */}
                <rect x="180" y="162" width="18" height="12" fill="#E8797A" opacity="0.8" />
                <circle cx="215" cy="168" r="5" fill="#B8620B" opacity="0.9" />

                {/* Monolith Fluted Stone Fireplace & Glowing Hearth */}
                <g transform="translate(380, 20)">
                  {/* Fluted Chimney stretching up through ceiling */}
                  <rect x="0" y="-120" width="70" height="240" fill="url(#slattedWood)" stroke="#1A1A1A" strokeWidth="1.2" />
                  {/* Firebox Recess */}
                  <rect x="10" y="60" width="50" height="50" rx="4" fill="#1A1E24" />
                  {/* Glowing Hearth Gradient */}
                  <circle cx="35" cy="95" r="28" fill="url(#fireplaceGlow)" />
                  {/* Animated Fire Flame Path */}
                  <path d="M25,102 Q35,70 38,82 Q45,64 48,102 Z" fill="#FF8C42" opacity="0.9">
                    <animate attributeName="d" 
                      values="M25,102 Q35,70 38,82 Q45,64 48,102 Z; M27,102 Q32,66 36,80 Q43,68 46,102 Z; M25,102 Q35,70 38,82 Q45,64 48,102 Z" 
                      dur="1.8s" repeatCount="indefinite" />
                  </path>
                  <circle cx="35" cy="74" r="3" fill="#FFF9E6">
                    <animate attributeName="opacity" values="0.7;1;0.4;0.9" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* Floor-to-Ceiling Glass Facade Mullions (Right Edge) */}
                <line x1="455" y1="-80" x2="455" y2="280" stroke="#1A1A1A" strokeWidth="2.5" />
                <line x1="455" y1="40" x2="455" y2="40" stroke="#1A1A1A" strokeWidth="2" />
                <rect x="440" y="-80" width="20" height="360" fill="url(#glassGradient)" />

                {/* Sunbeams Streaming In at an Angle */}
                <polygon points="455,-30 455,160 200,280 80,280" fill="url(#warmLightBeam)" opacity="0.6" />
              </g>

              {/* Sunken Salon Annotation */}
              <g transform="translate(720, 1720)">
                <rect x="0" y="0" width="180" height="36" rx="6" fill="#F5F1E8" stroke="#E8797A" strokeWidth="1" opacity="0.9" />
                <text x="12" y="16" className="text-[10px] font-mono font-bold fill-[#E8797A]">ZONE 02: SUNKEN HEARTH</text>
                <text x="12" y="28" className="text-[9px] font-mono fill-[#737373]">LEVEL -0.45m &bull; BIOCLIMATIC</text>
              </g>
            </g>

            {/* ========================================================
                ZONE 3: HELICAL STAIRCASE & DOUBLE ATRIUM (Y: 1320 - 1780)
                ======================================================== */}
            <g id="zone-3-atrium" className="transition-all duration-700">
              {/* Double-Height Open Lightwell Void */}
              <rect x="420" y="1320" width="280" height="460" fill="none" stroke="#E8797A" strokeWidth="1" strokeDasharray="4 8" opacity="0.5" />

              {/* Sculptural Spiral Staircase (Helical Elevation) */}
              <g transform="translate(450, 1340)">
                {/* Center Tension Pole */}
                <line x1="120" y1="0" x2="120" y2="440" stroke="#B8620B" strokeWidth="3" />

                {/* Floating Cantilevered Treads Spanning Upward */}
                {[...Array(14)].map((_, i) => {
                  const yPos = 420 - i * 30;
                  const angle = (i * 26) * (Math.PI / 180);
                  const xOffset = Math.sin(angle) * 75;
                  const width = 85 + Math.cos(angle) * 20;
                  return (
                    <g key={i}>
                      {/* Tread */}
                      <rect 
                        x={120 + (xOffset > 0 ? 0 : xOffset)} 
                        y={yPos} 
                        width={width} 
                        height="8" 
                        rx="2" 
                        fill="#D5A26B" 
                        stroke="#B8620B" 
                        strokeWidth="0.8" 
                      />
                      {/* LED Step Glow Line */}
                      <line 
                        x1={120 + (xOffset > 0 ? 0 : xOffset)} 
                        y1={yPos + 8} 
                        x2={120 + (xOffset > 0 ? 0 : xOffset) + width} 
                        y2={yPos + 8} 
                        stroke="#FFD180" 
                        strokeWidth="1.5" 
                        opacity="0.85" 
                      />
                      {/* Vertical Slender Brass Balusters */}
                      <line 
                        x1={120 + xOffset + width * 0.9} 
                        y1={yPos} 
                        x2={120 + xOffset + width * 0.9} 
                        y2={yPos - 22} 
                        stroke="#B8620B" 
                        strokeWidth="1" 
                        opacity="0.6" 
                      />
                    </g>
                  );
                })}

                {/* Smooth Continuous Helical Handrail Curve */}
                <path 
                  d="M195,400 C240,320 60,260 185,180 C240,110 80,40 185,-10" 
                  fill="none" 
                  stroke="#1A1A1A" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  opacity="0.8" 
                />
              </g>

              {/* Hanging Minimalist Chandelier Mobile in the Void */}
              <g transform="translate(620, 1340)">
                <line x1="0" y1="-20" x2="0" y2="180" stroke="#B8620B" strokeWidth="0.8" />
                {/* Balancing Arms */}
                <line x1="-60" y1="120" x2="60" y2="120" stroke="#B8620B" strokeWidth="1.5" />
                <circle cx="-60" cy="120" r="10" fill="#FFF2D6" stroke="#D5A26B" strokeWidth="1.5" />
                <line x1="60" y1="120" x2="60" y2="190" stroke="#B8620B" strokeWidth="0.8" />
                <line x1="30" y1="190" x2="90" y2="190" stroke="#B8620B" strokeWidth="1.2" />
                <circle cx="30" cy="190" r="8" fill="#FFF2D6" stroke="#D5A26B" strokeWidth="1.5" />
                <circle cx="90" cy="190" r="12" fill="#E8797A" opacity="0.6" />

                {/* Light glow halo */}
                <circle cx="-60" cy="120" r="28" fill="#FFD180" opacity="0.15" />
              </g>

              {/* Atrium Annotation */}
              <g transform="translate(300, 1500)">
                <rect x="0" y="0" width="170" height="36" rx="6" fill="#F5F1E8" stroke="#B8620B" strokeWidth="1" opacity="0.9" />
                <text x="12" y="16" className="text-[10px] font-mono font-bold fill-[#B8620B]">ZONE 03: HELICAL ATRIUM</text>
                <text x="12" y="28" className="text-[9px] font-mono fill-[#737373]">LEVEL +1.80m &bull; CIRCULATION</text>
              </g>
            </g>

            {/* ========================================================
                ZONE 4: MONOLITH CULINARY & DINING MEZZANINE (Y: 1320 - 900 left half)
                ======================================================== */}
            <g id="zone-4-kitchen" className="transition-all duration-700">
              <g transform="translate(260, 1140)">
                {/* Kitchen Back Wall & Floating Walnut Shelves */}
                <rect x="10" y="0" width="220" height="180" fill="url(#concreteTile)" opacity="0.6" />
                {/* Floating Shelf 1 */}
                <rect x="20" y="30" width="180" height="8" fill="#8A5A36" stroke="#B8620B" strokeWidth="0.8" />
                {/* Designer Glasses & Decanter */}
                <rect x="35" y="16" width="8" height="14" rx="2" fill="#E8797A" opacity="0.6" />
                <rect x="50" y="14" width="10" height="16" rx="2" fill="#89C4F4" opacity="0.6" />
                <circle cx="75" cy="22" r="7" fill="#B8620B" opacity="0.7" />

                {/* Floating Shelf 2 */}
                <rect x="20" y="70" width="180" height="8" fill="#8A5A36" stroke="#B8620B" strokeWidth="0.8" />

                {/* Lower Cabinetry Bank */}
                <rect x="10" y="110" width="200" height="70" fill="#242B35" stroke="#B8620B" strokeWidth="1" />
                <line x1="75" y1="110" x2="75" y2="180" stroke="#3A4452" strokeWidth="1" />
                <line x1="140" y1="110" x2="140" y2="180" stroke="#3A4452" strokeWidth="1" />

                {/* Monolith Basalt Kitchen Island */}
                <g transform="translate(180, 70)">
                  {/* Island Body */}
                  <rect x="0" y="40" width="180" height="70" rx="3" fill="#1C1E22" stroke="#B8620B" strokeWidth="1.5" />
                  {/* Basalt Countertop Cantilever */}
                  <rect x="-10" y="34" width="200" height="10" rx="2" fill="#3D444F" stroke="#E8797A" strokeWidth="1" />
                  
                  {/* Architectural Gooseneck Brass Faucet */}
                  <path d="M40,34 L40,6 Q40,-6 52,-6 Q64,-6 64,4 L64,12" fill="none" stroke="#D5A26B" strokeWidth="2.5" />

                  {/* 3 Minimalist High Stools */}
                  {[0, 1, 2].map((st) => (
                    <g key={st} transform={`translate(${30 + st * 55}, 55)`}>
                      <ellipse cx="0" cy="0" rx="14" ry="4" fill="#D5A26B" stroke="#B8620B" strokeWidth="1" />
                      <line x1="-8" y1="4" x2="-10" y2="55" stroke="#1A1A1A" strokeWidth="1.5" />
                      <line x1="8" y1="4" x2="10" y2="55" stroke="#1A1A1A" strokeWidth="1.5" />
                      <line x1="-7" y1="35" x2="7" y2="35" stroke="#1A1A1A" strokeWidth="1" />
                    </g>
                  ))}

                  {/* Suspended Linear Brass Tube Light */}
                  <line x1="20" y1="-80" x2="20" y2="-40" stroke="#B8620B" strokeWidth="0.8" />
                  <line x1="160" y1="-80" x2="160" y2="-40" stroke="#B8620B" strokeWidth="0.8" />
                  <rect x="0" y="-42" width="180" height="6" rx="2" fill="#D5A26B" stroke="#B8620B" strokeWidth="1" />
                  {/* Ambient Light Wash */}
                  <polygon points="0,-36 180,-36 210,34 -30,34" fill="url(#warmLightBeam)" opacity="0.45" />
                </g>
              </g>

              {/* Kitchen Annotation */}
              <g transform="translate(560, 1180)">
                <rect x="0" y="0" width="190" height="36" rx="6" fill="#F5F1E8" stroke="#B8620B" strokeWidth="1" opacity="0.9" />
                <text x="12" y="16" className="text-[10px] font-mono font-bold fill-[#B8620B]">ZONE 04: CULINARY ATELIER</text>
                <text x="12" y="28" className="text-[9px] font-mono fill-[#737373]">LEVEL +3.60m &bull; BASALT MONOLITH</text>
              </g>
            </g>

            {/* ========================================================
                ZONE 5: MASTER SANCTUARY & SOAKING BATH (Y: 860 - 450 right half)
                ======================================================== */}
            <g id="zone-5-suite" className="transition-all duration-700">
              <g transform="translate(680, 540)">
                {/* Low Platform Tatami Bed */}
                <g transform="translate(20, 160)">
                  {/* Wooden Base Plinth */}
                  <rect x="0" y="80" width="220" height="24" rx="3" fill="#8A5A36" stroke="#B8620B" strokeWidth="1.2" />
                  {/* Mattress with Natural Linen */}
                  <rect x="15" y="55" width="190" height="30" rx="4" fill="#FBF9F5" stroke="#B8620B" strokeWidth="1" />
                  {/* 2 Ergonomic Pillows */}
                  <rect x="25" y="44" width="55" height="16" rx="4" fill="#EAE4D8" stroke="#E8797A" strokeWidth="0.8" />
                  <rect x="90" y="44" width="55" height="16" rx="4" fill="#EAE4D8" stroke="#E8797A" strokeWidth="0.8" />
                  {/* Fluted Cedar Headboard Wall */}
                  <rect x="0" y="-80" width="220" height="135" fill="url(#slattedWood)" stroke="#1A1A1A" strokeWidth="1.2" />
                  {/* Bedside Floating Table + Lamp */}
                  <rect x="230" y="70" width="35" height="12" fill="#D5A26B" stroke="#B8620B" strokeWidth="1" />
                  <circle cx="247" cy="55" r="7" fill="#FFD180" opacity="0.9" />
                </g>

                {/* Slatted Shoji Screen Room Divider */}
                <g transform="translate(280, 80)">
                  <rect x="0" y="0" width="16" height="240" fill="#EAE4D8" stroke="#B8620B" strokeWidth="1" opacity="0.7" />
                  {[...Array(8)].map((_, si) => (
                    <line key={si} x1="0" y1={si * 30} x2="16" y2={si * 30} stroke="#B8620B" strokeWidth="1" />
                  ))}
                </g>

                {/* Freestanding Sculptural Soaking Tub */}
                <g transform="translate(320, 180)">
                  {/* Oval Tub */}
                  <ellipse cx="65" cy="55" rx="60" ry="24" fill="#FFFFFF" stroke="#B8620B" strokeWidth="1.5" />
                  <ellipse cx="65" cy="50" rx="50" ry="18" fill="#D8EEF8" stroke="#89C4F4" strokeWidth="1" opacity="0.7" />
                  {/* Floor-mounted Tub Filler */}
                  <path d="M135,70 L135,15 Q135,5 125,5 L115,5" fill="none" stroke="#D5A26B" strokeWidth="2.5" />
                  
                  {/* Skylight aperture above bath */}
                  <rect x="10" y="-180" width="110" height="12" fill="#89C4F4" opacity="0.4" stroke="#B8620B" strokeWidth="1" />
                  <polygon points="10,-168 120,-168 150,60 -20,60" fill="url(#warmLightBeam)" opacity="0.4" />
                </g>
              </g>

              {/* Suite Annotation */}
              <g transform="translate(800, 480)">
                <rect x="0" y="0" width="190" height="36" rx="6" fill="#F5F1E8" stroke="#E8797A" strokeWidth="1" opacity="0.9" />
                <text x="12" y="16" className="text-[10px] font-mono font-bold fill-[#E8797A]">ZONE 05: MASTER SANCTUARY</text>
                <text x="12" y="28" className="text-[9px] font-mono fill-[#737373]">LEVEL +6.80m &bull; OVAL SOAKING</text>
              </g>
            </g>

            {/* ========================================================
                ZONE 6: SKY PERGOLA & TWILIGHT REFLECTION POOL (Y: 380 - 50)
                ======================================================== */}
            <g id="zone-6-terrace" className="transition-all duration-700">
              {/* Roof Timber Joist Pergola Louvers */}
              <g transform="translate(250, 180)">
                {/* Horizontal Beam */}
                <rect x="0" y="60" width="900" height="16" fill="#8A5A36" stroke="#B8620B" strokeWidth="1.5" />
                {/* 16 Angled Shade Slats (Casting shadow rhythms) */}
                {[...Array(18)].map((_, sl) => (
                  <line 
                    key={sl} 
                    x1={sl * 50 + 20} 
                    y1="40" 
                    x2={sl * 50 + 45} 
                    y2="60" 
                    stroke="#D5A26B" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                  />
                ))}

                {/* Minimalist Glass Guardrail */}
                <rect x="10" y="100" width="880" height="90" fill="url(#glassGradient)" opacity="0.8" stroke="#1A1A1A" strokeWidth="1" />
                <line x1="10" y1="100" x2="890" y2="100" stroke="#1A1A1A" strokeWidth="2.5" />

                {/* Shallow Architectural Reflection Water Pool */}
                <g transform="translate(80, 160)">
                  <rect x="0" y="10" width="380" height="28" rx="4" fill="#A8D1E7" opacity="0.55" stroke="#89C4F4" strokeWidth="1" />
                  {/* Floating Stepping Stones */}
                  <rect x="50" y="14" width="45" height="18" rx="2" fill="#5A6578" stroke="#1A1A1A" strokeWidth="1" />
                  <rect x="130" y="14" width="45" height="18" rx="2" fill="#5A6578" stroke="#1A1A1A" strokeWidth="1" />
                  <rect x="210" y="14" width="45" height="18" rx="2" fill="#5A6578" stroke="#1A1A1A" strokeWidth="1" />
                  {/* Water Ripple Rings */}
                  <ellipse cx="320" cy="24" rx="24" ry="6" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.7">
                    <animate attributeName="rx" values="10;32;45" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0.3;0" dur="3s" repeatCount="indefinite" />
                  </ellipse>
                </g>

                {/* Outdoor Basalt Fire Cauldron */}
                <g transform="translate(680, 140)">
                  <ellipse cx="40" cy="40" rx="35" ry="12" fill="#242B35" stroke="#B8620B" strokeWidth="1.5" />
                  {/* Glowing Cauldron Fire */}
                  <circle cx="40" cy="35" r="22" fill="url(#fireplaceGlow)" />
                  <path d="M30,38 Q40,12 44,25 Q50,8 54,38 Z" fill="#FF8C42" opacity="0.9">
                    <animate attributeName="d" 
                      values="M30,38 Q40,12 44,25 Q50,8 54,38 Z; M32,38 Q37,9 42,22 Q48,12 52,38 Z; M30,38 Q40,12 44,25 Q50,8 54,38 Z" 
                      dur="2s" repeatCount="indefinite" />
                  </path>
                </g>

                {/* Starlight Constellation Dots above roof */}
                <g opacity="0.7">
                  <circle cx="120" cy="-60" r="2" fill="#FFF" />
                  <circle cx="280" cy="-100" r="1.5" fill="#FFF" />
                  <circle cx="450" cy="-70" r="2.5" fill="#FFF" />
                  <circle cx="680" cy="-110" r="2" fill="#FFF" />
                  <circle cx="820" cy="-50" r="1.5" fill="#FFF" />
                  {/* Starlight link line */}
                  <line x1="280" y1="-100" x2="450" y2="-70" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
                </g>
              </g>

              {/* Rooftop Annotation */}
              <g transform="translate(360, 100)">
                <rect x="0" y="0" width="200" height="36" rx="6" fill="#1A1E24" stroke="#E8797A" strokeWidth="1" opacity="0.9" />
                <text x="12" y="16" className="text-[10px] font-mono font-bold fill-[#E8797A]">ZONE 06: SKY OBSERVATORY</text>
                <text x="12" y="28" className="text-[9px] font-mono fill-[#D5CDC0]">LEVEL +9.60m &bull; REFLECTION POOL</text>
              </g>
            </g>

            {/* Dimension Lines & Grid Axes on the Exterior */}
            <g id="dimension-grid" stroke="#B8620B" strokeWidth="0.75" opacity="0.4" className="font-mono text-[9px] fill-[#B8620B]">
              {/* Overall Height Dimension Line */}
              <line x1="1220" y1="250" x2="1220" y2="2150" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
              <line x1="1200" y1="250" x2="1240" y2="250" />
              <line x1="1200" y1="2150" x2="1240" y2="2150" />
              <text x="1230" y="1200" transform="rotate(90, 1230, 1200)" className="tracking-widest">TOTAL CLEAR SPAN 14.80m</text>

              {/* Grid Bubbles A, B, C */}
              <circle cx="250" cy="2250" r="14" fill="#F5F1E8" stroke="#B8620B" strokeWidth="1" />
              <text x="246" y="2254" className="font-bold fill-[#1A1A1A]">A</text>
              <circle cx="580" cy="2250" r="14" fill="#F5F1E8" stroke="#B8620B" strokeWidth="1" />
              <text x="576" y="2254" className="font-bold fill-[#1A1A1A]">B</text>
              <circle cx="1150" cy="2250" r="14" fill="#F5F1E8" stroke="#B8620B" strokeWidth="1" />
              <text x="1146" y="2254" className="font-bold fill-[#1A1A1A]">C</text>
            </g>

          </motion.svg>
        </motion.div>
      </div>

      {/* FLOATING INTERACTIVE INTERIOR NAVIGATOR HUD (Bottom Right / Side) */}
      {showControls && <aside 
        aria-label="Architectural Interior Walkthrough HUD"
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto"
      >
        <AnimatePresence>
          {isHudOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-80 sm:w-92 bg-[#1A1E24]/95 text-white backdrop-blur-md rounded-2xl p-5 border border-white/15 shadow-2xl overflow-hidden relative"
            >
              {/* Top Bar with Live Indicator & Close/Minimize */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8797A] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B8620B]" />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8797A] font-bold">
                    LIVE INTERIOR CROSS-SECTION
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsExpandedView(!isExpandedView)}
                    className="p-1 rounded text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    title={isExpandedView ? "Collapse mini-map" : "Expand mini-map"}
                  >
                    {isExpandedView ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setIsHudOpen(false)}
                    className="p-1 rounded text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    title="Minimize HUD"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Current Room Badge & Elevation */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                  <span>{currentZone.level}</span>
                  <span className="font-mono text-[#E8797A] font-semibold">{currentZone.elevation}</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-white leading-snug">
                  {currentZone.name}
                </h4>
                <p className="text-[11px] text-white/70 leading-relaxed mt-1">
                  {currentZone.description}
                </p>
              </div>

              {/* Interactive Floorplate Minimap (Interactive Zone Selector) */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="text-[10px] font-mono text-white/40 flex justify-between">
                  <span>SECTION STACK</span>
                  <span>CLICK ROOM TO JUMP</span>
                </div>

                <div className="grid grid-cols-6 gap-1.5">
                  {ROOM_ZONES.map((zone, idx) => {
                    const isActive = idx === activeZoneIndex;
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => scrollToSection(zone.targetSection)}
                        className={`py-1.5 px-1 rounded text-center transition-all duration-300 border ${
                          isActive
                            ? 'bg-[#B8620B] border-[#E8797A] text-white font-bold shadow-md shadow-[#B8620B]/40 scale-105'
                            : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/15 hover:text-white'
                        }`}
                        title={`${zone.name} (${zone.elevation})`}
                      >
                        <span className="block text-[9px] font-mono font-bold leading-none">0{idx + 1}</span>
                        <span className="block text-[8px] font-mono opacity-80 truncate">{zone.elevation}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Expanded Interactive Controls: Style & Opacity */}
              {isExpandedView && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-3 mt-3 border-t border-white/10 space-y-3"
                >
                  {/* Style Mode Switcher */}
                  <div>
                    <span className="block text-[10px] font-mono text-white/50 uppercase mb-1.5">
                      Visual Rendering Style
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'shaded', label: 'Tactile Stone' },
                        { id: 'blueprint', label: 'CAD Drafting' },
                        { id: 'twilight', label: 'Sunset Glow' }
                      ].map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => setStyleMode(mode.id as any)}
                          className={`py-1 px-2 rounded text-[10px] font-mono transition-all ${
                            styleMode === mode.id
                              ? 'bg-white text-[#1A1A1A] font-bold'
                              : 'bg-white/10 text-white/60 hover:text-white'
                          }`}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Opacity Slider */}
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-white/50 mb-1">
                      <span>Interior Layer Opacity</span>
                      <span>{Math.round(opacityLevel * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.15"
                      max="0.95"
                      step="0.05"
                      value={opacityLevel}
                      onChange={(e) => setOpacityLevel(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#B8620B]"
                    />
                  </div>
                </motion.div>
              )}

              {/* Quick Jump Action Button */}
              <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-white/40 font-mono">FLOW: SCROLL-LINKED</span>
                <button
                  onClick={() => scrollToSection(currentZone.targetSection)}
                  className="text-[#E8797A] hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <span>Focus In View</span>
                  <span>&rarr;</span>
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimized Trigger Pill when closed */}
        {!isHudOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsHudOpen(true)}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1A1E24]/90 text-white border border-white/15 backdrop-blur-md shadow-xl hover:bg-[#B8620B] transition-all duration-300 cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8797A] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8797A]" />
            </span>
            <Home className="w-3.5 h-3.5 text-[#E8797A] group-hover:text-white" />
            <span className="font-mono text-xs font-semibold">
              Interior Flow: {currentZone.name.split('&')[0]} ({currentZone.elevation})
            </span>
            <ChevronUp className="w-3.5 h-3.5 text-white/50 group-hover:text-white" />
          </motion.button>
        )}
      </aside>}
    </>
  );
};
