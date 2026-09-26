import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

/**
 * A quiet, scroll-scrubbed interior vignette. The scene is intentionally free
 * of controls and copy so it can sit behind the site's content.
 */
export const InteriorScrollBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001
  });

  const sceneX = useTransform(progress, [0, 1], ['-2%', '3%']);
  const sceneY = useTransform(progress, [0, 1], ['2%', '-4%']);
  const sceneScale = useTransform(progress, [0, 1], [1, 1.1]);
  const sunlightOpacity = useTransform(progress, [0, 0.5, 1], [0.12, 0.5, 0.2]);
  const sunlightX = useTransform(progress, [0, 1], ['-12%', '16%']);
  const lampOpacity = useTransform(progress, [0, 0.7, 1], [0.16, 0.4, 0.55]);
  const plantY = useTransform(progress, [0, 1], ['0%', '-7%']);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[#e7dfd1]/55" />

      <motion.div
        className="absolute inset-[-8%] flex items-center justify-center"
        style={{ x: sceneX, y: sceneY, scale: sceneScale }}
      >
        <svg viewBox="0 0 1600 900" className="h-full w-full min-w-[900px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="interior-wall" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#F8F4EC" />
              <stop offset="1" stopColor="#D8CDBB" />
            </linearGradient>
            <linearGradient id="interior-floor" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#C9AF8C" stopOpacity="0.7" />
              <stop offset="1" stopColor="#80644C" stopOpacity="0.72" />
            </linearGradient>
            <linearGradient id="interior-glass" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#BFD6DB" stopOpacity="0.9" />
              <stop offset="1" stopColor="#E9C48C" stopOpacity="0.52" />
            </linearGradient>
            <linearGradient id="interior-sun" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#FFF1BA" stopOpacity="0.9" />
              <stop offset="1" stopColor="#E7A65F" stopOpacity="0" />
            </linearGradient>
            <filter id="interior-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="20" />
            </filter>
          </defs>

          {/* Architectural shell: ceiling, walls, and an exaggerated perspective floor. */}
          <path d="M0 0H1600V550L800 410 0 550V0Z" fill="#FAF7F0" opacity="0.82" />
          <path d="M0 550L800 410L1600 550V900H0V550Z" fill="url(#interior-floor)" />
          <path d="M0 0H800V410L0 550V0Z" fill="url(#interior-wall)" opacity="0.86" />
          <path d="M800 0H1600V550L800 410V0Z" fill="#DDD1C0" opacity="0.7" />

          {/* Floor joints give the room a strong architectural perspective. */}
          <g stroke="#6F5845" strokeOpacity="0.22" strokeWidth="2">
            <path d="M800 410L120 900" /><path d="M800 410L410 900" /><path d="M800 410L700 900" />
            <path d="M800 410L990 900" /><path d="M800 410L1280 900" /><path d="M800 410L1570 900" />
            <path d="M0 645H1600" /><path d="M0 755H1600" /><path d="M0 850H1600" />
          </g>

          {/* Full-height glazed opening and its architectural mullions. */}
          <g>
            <path d="M940 82L1480 142V514L940 430V82Z" fill="url(#interior-glass)" opacity="0.78" />
            <path d="M940 82L1480 142V514L940 430V82Z" stroke="#594838" strokeOpacity="0.55" strokeWidth="9" />
            <path d="M1120 102V458M1300 122V486" stroke="#594838" strokeOpacity="0.46" strokeWidth="7" />
            <path d="M940 255L1480 325" stroke="#594838" strokeOpacity="0.36" strokeWidth="5" />
            <path d="M1000 380C1080 295 1170 305 1245 235C1325 160 1405 205 1480 142V514H940L1000 380Z" fill="#94AD94" opacity="0.33" />
          </g>

          {/* Built-in timber wall, art recess, and fireplace make the use of the room obvious. */}
          <g>
            <path d="M75 130L585 198V570L75 495V130Z" fill="#8B674A" fillOpacity="0.58" />
            {Array.from({ length: 10 }).map((_, index) => (
              <path key={index} d={`M${108 + index * 46} ${135 + index * 6}V510`} stroke="#513B2C" strokeOpacity="0.38" strokeWidth="8" />
            ))}
            <path d="M258 240L500 272V468L258 430V240Z" fill="#E8E0D4" fillOpacity="0.85" stroke="#5B4534" strokeOpacity="0.5" strokeWidth="5" />
            <path d="M314 300L448 318V415L314 394V300Z" fill="#292725" fillOpacity="0.78" />
            <ellipse cx="382" cy="410" rx="95" ry="37" fill="#D9823B" fillOpacity="0.28" filter="url(#interior-glow)" />
          </g>

          {/* Low sectional sofa and coffee table. */}
          <g>
            <path d="M355 537L806 485L1058 598L560 702L355 625V537Z" fill="#A88D78" fillOpacity="0.82" stroke="#584638" strokeOpacity="0.45" strokeWidth="5" />
            <path d="M390 498L790 452L1015 547L590 626L390 575V498Z" fill="#D5C1AD" fillOpacity="0.88" stroke="#584638" strokeOpacity="0.4" strokeWidth="5" />
            <path d="M445 505L590 626M580 482L725 600M715 466L860 575" stroke="#806958" strokeOpacity="0.42" strokeWidth="3" />
            <ellipse cx="790" cy="668" rx="170" ry="55" fill="#D3B179" fillOpacity="0.67" stroke="#5A4738" strokeOpacity="0.52" strokeWidth="5" />
            <ellipse cx="790" cy="652" rx="140" ry="38" fill="#E9DED0" fillOpacity="0.85" />
            <path d="M725 687L690 778M855 683L895 764" stroke="#513F30" strokeOpacity="0.58" strokeWidth="9" />
          </g>

          {/* A large indoor plant introduces scale and a recognisable lived-in interior silhouette. */}
          <motion.g style={{ y: plantY }}>
            <path d="M1360 540L1458 560L1432 735L1377 728L1360 540Z" fill="#927254" fillOpacity="0.75" />
            <path d="M1402 560C1365 475 1300 450 1275 390M1405 563C1430 458 1490 408 1530 355M1400 570C1355 528 1305 520 1252 490M1408 570C1450 505 1518 492 1570 450" stroke="#536D57" strokeOpacity="0.75" strokeWidth="13" strokeLinecap="round" />
            <path d="M1275 390C1310 386 1354 420 1365 475C1328 474 1285 450 1275 390ZM1530 355C1540 404 1508 448 1430 458C1440 408 1474 365 1530 355ZM1252 490C1298 480 1337 505 1355 528C1312 540 1275 522 1252 490ZM1570 450C1535 494 1480 514 1450 505C1470 464 1518 445 1570 450Z" fill="#6E8B67" fillOpacity="0.72" />
          </motion.g>

          {/* Pendant lights. */}
          <g stroke="#574234" strokeOpacity="0.58" strokeWidth="5">
            <path d="M680 0V245M830 0V220" />
          </g>
          <motion.g style={{ opacity: lampOpacity }}>
            <ellipse cx="680" cy="270" rx="72" ry="24" fill="#E5B76B" fillOpacity="0.6" />
            <ellipse cx="830" cy="245" rx="56" ry="20" fill="#E5B76B" fillOpacity="0.55" />
            <ellipse cx="680" cy="320" rx="140" ry="80" fill="#FFD27B" fillOpacity="0.28" filter="url(#interior-glow)" />
          </motion.g>
        </svg>
      </motion.div>

      {/* Scroll moves the sunlight across the room; reversing scroll returns it to its start. */}
      <motion.div
        className="absolute inset-y-0 left-[12%] w-[55%] origin-top -skew-x-12 bg-gradient-to-br from-[#fff3b0]/60 to-transparent blur-2xl"
        style={{ opacity: sunlightOpacity, x: sunlightX }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fffaf1]/20 via-transparent to-[#3f3025]/15" />
    </div>
  );
};
