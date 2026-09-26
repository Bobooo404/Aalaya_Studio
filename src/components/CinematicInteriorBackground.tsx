import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

/** A photographic, scroll-scrubbed interior background with a cinematic scene change. */
export const CinematicInteriorBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 24,
    restDelta: 0.001
  });

  const firstScale = useTransform(progress, [0, 1], [1, 1.16]);
  const firstX = useTransform(progress, [0, 1], ['0%', '-5%']);
  const firstY = useTransform(progress, [0, 1], ['0%', '-3%']);
  const secondClip = useTransform(progress, [0, 1], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);
  const secondScale = useTransform(progress, [0, 1], [1.13, 1.02]);
  const lightX = useTransform(progress, [0, 1], ['-35%', '45%']);
  const lightOpacity = useTransform(progress, [0, 0.5, 1], [0.1, 0.38, 0.14]);
  const ruleX = useTransform(progress, [0, 1], ['-6%', '6%']);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <motion.div
        className="absolute -inset-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=85')",
          scale: firstScale,
          x: firstX,
          y: firstY
        }}
      />

      {/* A second room slides in with scroll rather than using technical drawings. */}
      <motion.div
        className="absolute -inset-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=85')",
          clipPath: secondClip,
          scale: secondScale
        }}
      />

      {/* Warm moving daylight adds life without competing with the foreground. */}
      <motion.div
        className="absolute -top-[20%] h-[140%] w-[42%] -skew-x-12 bg-gradient-to-r from-transparent via-[#ffe1a8]/55 to-transparent blur-3xl"
        style={{ x: lightX, opacity: lightOpacity }}
      />

      <motion.div className="absolute inset-x-0 top-[16%] h-px bg-white/45" style={{ x: ruleX }} />
      <motion.div className="absolute inset-x-0 bottom-[14%] h-px bg-[#503b2b]/25" style={{ x: ruleX }} />

      {/* Keeps the photographic scene present but quiet enough for page copy. */}
      <div className="absolute inset-0 bg-[#1c1713]/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff8ed]/25 via-transparent to-[#1f1711]/30" />
    </div>
  );
};
