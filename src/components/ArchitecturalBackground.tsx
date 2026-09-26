import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export const ArchitecturalBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<SVGPathElement>(null);
  const blob2Ref = useRef<SVGPathElement>(null);
  const blob3Ref = useRef<SVGPathElement>(null);
  const blobContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Resolve anime function safely across different bundler configurations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const animeFn: any = typeof anime === 'function' ? anime : (anime as any)?.default || anime;

    if (typeof animeFn !== 'function') {
      return;
    }

    // 1. Floating Architectural Icons Animation (Houses, Arches, Columns, Doors, Windows)
    const iconAnimation = animeFn({
      targets: '.icon-float',
      translateX: ['-120vw', '120vw'],
      translateY: (_el: any, i: number) => [
        (i % 2 === 0 ? -40 : 40) + 'px',
        (i % 2 === 0 ? 60 : -60) + 'px'
      ],
      rotate: (_el: any, i: number) => [i % 2 === 0 ? 0 : 360, i % 2 === 0 ? 360 : 0],
      duration: () => (animeFn.random ? animeFn.random(20000, 30000) : 25000),
      easing: 'linear',
      loop: true,
      delay: animeFn.stagger ? animeFn.stagger(1500, { start: 0, from: 'first' }) : 1000
    });

    // 2. Vertical Subtle Drift for secondary floating elements
    const verticalFloat = animeFn({
      targets: '.icon-float-subtle',
      translateY: ['-80px', '80px'],
      opacity: [0.02, 0.05, 0.02],
      duration: () => (animeFn.random ? animeFn.random(14000, 22000) : 18000),
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    // 3. Blob Morphing Animation (Animation Type 6: Organic Orb/Blob Morphing)
    // 6-8 seconds per morph cycle, smooth easeInOutQuad, orange to pink gradient
    const blob1Anim = blob1Ref.current
      ? animeFn({
          targets: blob1Ref.current,
          d: [
            { value: 'M300,300 Q450,150 600,300 T600,600 Q450,750 300,600 T300,300' },
            { value: 'M320,280 Q520,120 640,320 T580,640 Q400,720 280,560 T320,280' },
            { value: 'M260,340 Q420,180 580,260 T660,540 Q500,700 340,640 T260,340' },
            { value: 'M340,260 Q480,100 620,300 T560,660 Q380,760 260,580 T340,260' },
            { value: 'M300,300 Q450,150 600,300 T600,600 Q450,750 300,600 T300,300' }
          ],
          duration: 7500,
          loop: true,
          easing: 'easeInOutQuad'
        })
      : null;

    const blob2Anim = blob2Ref.current
      ? animeFn({
          targets: blob2Ref.current,
          d: [
            { value: 'M350,250 Q500,120 620,280 T590,580 Q420,680 270,520 T350,250' },
            { value: 'M290,310 Q440,180 580,240 T650,520 Q530,690 320,620 T290,310' },
            { value: 'M380,220 Q540,160 610,340 T540,620 Q360,710 250,480 T380,220' },
            { value: 'M350,250 Q500,120 620,280 T590,580 Q420,680 270,520 T350,250' }
          ],
          duration: 6800,
          loop: true,
          easing: 'easeInOutQuad',
          delay: 1200
        })
      : null;

    const blob3Anim = blob3Ref.current
      ? animeFn({
          targets: blob3Ref.current,
          d: [
            { value: 'M280,320 Q400,180 560,260 T620,540 Q480,690 310,610 T280,320' },
            { value: 'M340,260 Q520,140 640,300 T580,620 Q390,730 260,540 T340,260' },
            { value: 'M310,290 Q460,110 590,320 T610,590 Q430,660 290,570 T310,290' },
            { value: 'M280,320 Q400,180 560,260 T620,540 Q480,690 310,610 T280,320' }
          ],
          duration: 8200,
          loop: true,
          easing: 'easeInOutQuad',
          delay: 2400
        })
      : null;

    // 4. Blob Opacity Pulse (3% → 8% as requested) & Gentle Scale / Drift
    const blobPulse = animeFn({
      targets: '.blob-layer',
      opacity: [0.03, 0.08, 0.03],
      scale: [1, 1.08, 1],
      duration: 7200,
      loop: true,
      easing: 'easeInOutSine'
    });

    const blobDrift = animeFn({
      targets: '.blob-drift-1',
      translateX: ['-30px', '40px'],
      translateY: ['-40px', '30px'],
      duration: 16000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    const blobDrift2 = animeFn({
      targets: '.blob-drift-2',
      translateX: ['40px', '-30px'],
      translateY: ['30px', '-40px'],
      duration: 19000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    return () => {
      iconAnimation?.pause?.();
      verticalFloat?.pause?.();
      blob1Anim?.pause?.();
      blob2Anim?.pause?.();
      blob3Anim?.pause?.();
      blobPulse?.pause?.();
      blobDrift?.pause?.();
      blobDrift2?.pause?.();
    };
  }, []);

  // Icon catalog definitions for architecture symbols
  const iconsData = [
    { type: 'house-pitched', top: '10%', delay: 0, size: 76 },
    { type: 'arch-roman', top: '22%', delay: 2000, size: 84 },
    { type: 'column-fluted', top: '35%', delay: 4000, size: 90 },
    { type: 'window-arch', top: '48%', delay: 6000, size: 72 },
    { type: 'door-pivot', top: '60%', delay: 8000, size: 80 },
    { type: 'blocks-axonometric', top: '72%', delay: 10000, size: 88 },
    { type: 'house-gable', top: '85%', delay: 12000, size: 78 },
    // Staggered secondary rows
    { type: 'arch-cathedral', top: '16%', delay: 3500, size: 68 },
    { type: 'window-mullion', top: '42%', delay: 7500, size: 64 },
    { type: 'column-doric', top: '67%', delay: 11500, size: 82 },
    { type: 'door-double', top: '92%', delay: 14000, size: 74 },
  ];

  const renderArchitecturalSymbol = (type: string) => {
    switch (type) {
      case 'house-pitched':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M20,50 L50,20 L80,50 L80,85 L20,85 Z" stroke="url(#archGrad)" strokeWidth="2.5" />
            <line x1="14" y1="52" x2="50" y2="16" stroke="url(#archGrad)" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="16" x2="86" y2="52" stroke="url(#archGrad)" strokeWidth="3" strokeLinecap="round" />
            <rect x="42" y="60" width="16" height="25" stroke="url(#archGrad)" strokeWidth="2" />
            <rect x="28" y="52" width="10" height="10" stroke="url(#archGrad)" strokeWidth="1.5" />
            <rect x="62" y="52" width="10" height="10" stroke="url(#archGrad)" strokeWidth="1.5" />
            <line x1="68" y1="26" x2="68" y2="34" stroke="url(#archGrad)" strokeWidth="2.5" />
          </svg>
        );

      case 'arch-roman':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M25,85 L25,48 A25,25 0 0,1 75,48 L75,85" stroke="url(#archGrad)" strokeWidth="2.5" />
            <path d="M35,85 L35,48 A15,15 0 0,1 65,48 L65,85" stroke="url(#archGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="18" y="85" width="64" height="6" rx="1" stroke="url(#archGrad)" strokeWidth="2" />
            <rect x="46" y="20" width="8" height="8" rx="1" stroke="url(#archGrad)" strokeWidth="2" />
            <line x1="20" y1="48" x2="30" y2="48" stroke="url(#archGrad)" strokeWidth="2" />
            <line x1="70" y1="48" x2="80" y2="48" stroke="url(#archGrad)" strokeWidth="2" />
          </svg>
        );

      case 'column-fluted':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Capital */}
            <rect x="24" y="20" width="52" height="7" rx="2" stroke="url(#archGrad)" strokeWidth="2" />
            <path d="M30,27 Q50,33 70,27" stroke="url(#archGrad)" strokeWidth="2" />
            {/* Shaft & Flutes */}
            <line x1="32" y1="28" x2="32" y2="78" stroke="url(#archGrad)" strokeWidth="2.5" />
            <line x1="41" y1="28" x2="41" y2="78" stroke="url(#archGrad)" strokeWidth="1.5" />
            <line x1="50" y1="28" x2="50" y2="78" stroke="url(#archGrad)" strokeWidth="1.5" />
            <line x1="59" y1="28" x2="59" y2="78" stroke="url(#archGrad)" strokeWidth="1.5" />
            <line x1="68" y1="28" x2="68" y2="78" stroke="url(#archGrad)" strokeWidth="2.5" />
            {/* Base */}
            <path d="M28,78 Q50,74 72,78" stroke="url(#archGrad)" strokeWidth="2" />
            <rect x="22" y="80" width="56" height="8" rx="2" stroke="url(#archGrad)" strokeWidth="2" />
          </svg>
        );

      case 'window-arch':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M26,82 L26,45 A24,24 0 0,1 74,45 L74,82 Z" stroke="url(#archGrad)" strokeWidth="2.5" />
            <line x1="50" y1="21" x2="50" y2="82" stroke="url(#archGrad)" strokeWidth="2" />
            <line x1="26" y1="52" x2="74" y2="52" stroke="url(#archGrad)" strokeWidth="2" />
            <line x1="26" y1="67" x2="74" y2="67" stroke="url(#archGrad)" strokeWidth="1.5" />
            {/* Sill */}
            <rect x="20" y="82" width="60" height="5" rx="1" stroke="url(#archGrad)" strokeWidth="2" />
          </svg>
        );

      case 'door-pivot':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="25" y="16" width="50" height="72" stroke="url(#archGrad)" strokeWidth="2.5" />
            <path d="M25,88 L60,76 L60,8 L25,16 Z" stroke="url(#archGrad)" strokeWidth="1.8" />
            <line x1="53" y1="36" x2="53" y2="56" stroke="url(#archGrad)" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="25" cy="88" rx="35" ry="8" stroke="url(#archGrad)" strokeWidth="1.2" strokeDasharray="3 3" />
          </svg>
        );

      case 'blocks-axonometric':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Top diamond */}
            <path d="M50,20 L76,34 L50,48 L24,34 Z" stroke="url(#archGrad)" strokeWidth="2" />
            {/* Left face */}
            <path d="M24,34 L50,48 L50,80 L24,66 Z" stroke="url(#archGrad)" strokeWidth="2" />
            {/* Right face */}
            <path d="M50,48 L76,34 L76,66 L50,80 Z" stroke="url(#archGrad)" strokeWidth="2" />
            {/* Internal grid line */}
            <line x1="50" y1="48" x2="50" y2="80" stroke="url(#archGrad)" strokeWidth="2.5" />
          </svg>
        );

      case 'house-gable':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M20,40 L50,15 L80,40 L80,85 L20,85 Z" stroke="url(#archGrad)" strokeWidth="2.2" />
            <path d="M35,85 L35,55 A15,15 0 0,1 65,55 L65,85" stroke="url(#archGrad)" strokeWidth="2" />
            <circle cx="50" cy="35" r="7" stroke="url(#archGrad)" strokeWidth="1.5" />
          </svg>
        );

      case 'arch-cathedral':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M26,85 L26,45 Q26,20 50,15 Q74,20 74,45 L74,85" stroke="url(#archGrad)" strokeWidth="2.2" />
            <path d="M34,85 L34,48 Q34,28 50,24 Q66,28 66,48 L66,85" stroke="url(#archGrad)" strokeWidth="1.5" />
            <line x1="50" y1="15" x2="50" y2="85" stroke="url(#archGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
        );

      case 'window-mullion':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="24" y="24" width="52" height="52" rx="3" stroke="url(#archGrad)" strokeWidth="2.5" />
            <line x1="50" y1="24" x2="50" y2="76" stroke="url(#archGrad)" strokeWidth="2" />
            <line x1="24" y1="50" x2="76" y2="50" stroke="url(#archGrad)" strokeWidth="2" />
            <rect x="28" y="28" width="20" height="20" stroke="url(#archGrad)" strokeWidth="1" opacity="0.6" />
            <rect x="52" y="28" width="20" height="20" stroke="url(#archGrad)" strokeWidth="1" opacity="0.6" />
            <rect x="28" y="52" width="20" height="20" stroke="url(#archGrad)" strokeWidth="1" opacity="0.6" />
            <rect x="52" y="52" width="20" height="20" stroke="url(#archGrad)" strokeWidth="1" opacity="0.6" />
          </svg>
        );

      case 'column-doric':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="20" y="16" width="60" height="8" rx="1" stroke="url(#archGrad)" strokeWidth="2.2" />
            <polygon points="26,24 74,24 70,32 30,32" stroke="url(#archGrad)" strokeWidth="1.8" />
            <line x1="32" y1="32" x2="32" y2="80" stroke="url(#archGrad)" strokeWidth="2" />
            <line x1="44" y1="32" x2="44" y2="80" stroke="url(#archGrad)" strokeWidth="1.5" />
            <line x1="56" y1="32" x2="56" y2="80" stroke="url(#archGrad)" strokeWidth="1.5" />
            <line x1="68" y1="32" x2="68" y2="80" stroke="url(#archGrad)" strokeWidth="2" />
            <rect x="22" y="80" width="56" height="8" rx="1" stroke="url(#archGrad)" strokeWidth="2.2" />
          </svg>
        );

      case 'door-double':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="20" y="18" width="60" height="70" stroke="url(#archGrad)" strokeWidth="2.5" />
            <line x1="50" y1="18" x2="50" y2="88" stroke="url(#archGrad)" strokeWidth="2" />
            <rect x="26" y="24" width="18" height="26" stroke="url(#archGrad)" strokeWidth="1.5" />
            <rect x="56" y="24" width="18" height="26" stroke="url(#archGrad)" strokeWidth="1.5" />
            <rect x="26" y="54" width="18" height="26" stroke="url(#archGrad)" strokeWidth="1.5" />
            <rect x="56" y="54" width="18" height="26" stroke="url(#archGrad)" strokeWidth="1.5" />
            <circle cx="46" cy="54" r="2" fill="url(#archGrad)" />
            <circle cx="54" cy="54" r="2" fill="url(#archGrad)" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* GLOBAL SVG GRADIENT DEFINITIONS: Terracotta → Coral Pink → Soft Red */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          {/* Linear gradient for subtle architectural icons */}
          <linearGradient id="archGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B8620B" />   {/* Terracotta */}
            <stop offset="50%" stopColor="#E8797A" />  {/* Coral pink */}
            <stop offset="100%" stopColor="#C85A17" /> {/* Soft red */}
          </linearGradient>

          {/* Radial gradient for organic morphing blobs */}
          <radialGradient id="blobGrad1" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#B8620B" stopOpacity="0.8" />
            <stop offset="55%" stopColor="#E8797A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C85A17" stopOpacity="0.0" />
          </radialGradient>

          <radialGradient id="blobGrad2" cx="60%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#E8797A" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#B8620B" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#E6947E" stopOpacity="0.0" />
          </radialGradient>

          <radialGradient id="blobGrad3" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#C85A17" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#E8797A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#B8620B" stopOpacity="0.0" />
          </radialGradient>
        </defs>
      </svg>

      {/* ========================================================
          ANIMATION TYPE 6: ORB / BLOB MORPHING
          Organic, blob-like shapes that slowly morph and move
          Colors: Orange to pink gradient, Opacity pulse: 3% → 8%
          ======================================================== */}
      <div ref={blobContainerRef} className="absolute inset-0 overflow-hidden">
        {/* Top-Left / Center Morphing Orb */}
        <div className="blob-drift-1 absolute -top-32 -left-32 w-[650px] h-[650px] sm:w-[850px] sm:h-[850px]">
          <svg viewBox="0 0 900 900" className="blob-layer w-full h-full filter blur-[40px] opacity-[0.05]">
            <path
              ref={blob1Ref}
              d="M300,300 Q450,150 600,300 T600,600 Q450,750 300,600 T300,300"
              fill="url(#blobGrad1)"
            />
          </svg>
        </div>

        {/* Center-Right Floating Morphing Orb */}
        <div className="blob-drift-2 absolute top-[35%] -right-40 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px]">
          <svg viewBox="0 0 900 900" className="blob-layer w-full h-full filter blur-[50px] opacity-[0.05]">
            <path
              ref={blob2Ref}
              d="M350,250 Q500,120 620,280 T590,580 Q420,680 270,520 T350,250"
              fill="url(#blobGrad2)"
            />
          </svg>
        </div>

        {/* Bottom-Left Living Morphing Orb */}
        <div className="blob-drift-1 absolute -bottom-40 left-[15%] w-[700px] h-[700px] sm:w-[900px] sm:h-[900px]">
          <svg viewBox="0 0 900 900" className="blob-layer w-full h-full filter blur-[45px] opacity-[0.05]">
            <path
              ref={blob3Ref}
              d="M280,320 Q400,180 560,260 T620,540 Q480,690 310,610 T280,320"
              fill="url(#blobGrad3)"
            />
          </svg>
        </div>
      </div>

      {/* ========================================================
          ANIMATION: SUBTLE FLOATING ARCHITECTURAL ICONS
          Houses, doors, arches, columns, windows
          Colors: Terracotta → coral pink → soft red
          Opacity: 2-5% (very subtle, almost invisible)
          Movement: Slow drift across viewport (20-30 seconds)
          ======================================================== */}
      <div className="absolute inset-0 overflow-hidden">
        {iconsData.map((icon, idx) => (
          <div
            key={idx}
            className="icon-float absolute pointer-events-none"
            style={{
              top: icon.top,
              left: `${(idx * 9) % 80}%`,
              width: `${icon.size}px`,
              height: `${icon.size}px`,
              opacity: 0.035, // 2-5% opacity as specified
            }}
          >
            <div className="icon-float-subtle w-full h-full">
              {renderArchitecturalSymbol(icon.type)}
            </div>
          </div>
        ))}
      </div>

      {/* Very faint architectural draftsman guide lines */}
      <div className="absolute inset-0 opacity-[0.025] bg-architect-grid pointer-events-none" />
    </div>
  );
};
