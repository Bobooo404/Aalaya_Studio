import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck } from 'lucide-react';

interface EstimatorProps {
  onProceedToInquiry?: (details: string) => void;
}

export const InteractiveEstimator: React.FC<EstimatorProps> = ({ onProceedToInquiry }) => {
  const [typology, setTypology] = useState<'villa' | 'penthouse' | 'commercial' | 'landscape'>('villa');
  const [area, setArea] = useState(5500);
  const [tier, setTier] = useState<'natural' | 'ultra' | 'passive'>('natural');

  // Typology parameters
  const typologies = [
    { id: 'villa', name: 'Private Home', baseWeeks: 18, baseRate: 350 },
    { id: 'penthouse', name: 'Apartment Interior', baseWeeks: 12, baseRate: 280 },
    { id: 'commercial', name: 'Office or Shop', baseWeeks: 24, baseRate: 320 },
    { id: 'landscape', name: 'Garden or Outdoor Space', baseWeeks: 14, baseRate: 180 },
  ];

  const currentTypology = typologies.find((t) => t.id === typology) || typologies[0];

  // Duration computation
  const multiplier = tier === 'passive' ? 1.25 : tier === 'ultra' ? 1.15 : 1.0;
  const estimatedDesignWeeks = Math.round(currentTypology.baseWeeks * (area > 7000 ? 1.2 : 1.0));
  const estimatedConstructionMonths = Math.round((estimatedDesignWeeks * 0.75 + (area / 800)) * multiplier);

  const handleInquire = () => {
    const summary = `${currentTypology.name} (${area.toLocaleString()} sq.ft), ${tier.toUpperCase()} material level.`;
    if (onProceedToInquiry) {
      onProceedToInquiry(summary);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="estimator" className="relative py-28 lg:py-36 bg-[#F5F1E8]/60 overflow-hidden">
      <div className="absolute inset-0 bg-architect-grid opacity-35 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DFD5] text-xs uppercase tracking-widest text-[#B8620B] font-semibold mb-4">
            <Calculator className="w-3.5 h-3.5 text-[#B8620B]" />
            <span>Quick Cost Check</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-semibold tracking-tight mb-4">
            Project <span className="italic text-[#B8620B]">Planner</span>
          </h2>

          <p className="text-sm sm:text-base text-[#666]">
            Choose your project type, size, and finish level to see a simple estimate of the design process.
          </p>
        </div>

        {/* Interactive Estimator Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8E1D5] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Inputs */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Typology Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-3">
                  1. Choose Your Project Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {typologies.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTypology(t.id as any)}
                      className={`p-3.5 rounded-xl text-left border text-xs font-medium transition-all ${
                        typology === t.id
                          ? 'border-[#B8620B] bg-[#FBF9F5] text-[#B8620B] ring-2 ring-[#B8620B]/20 font-semibold'
                          : 'border-[#EBE5DA] text-[#4A4A4A] hover:border-stone-400'
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Area Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">
                    2. Size of the Project (Square Feet)
                  </label>
                  <span className="font-mono text-sm font-bold text-[#B8620B] bg-[#F5F1E8] px-3 py-1 rounded-md">
                    {area.toLocaleString()} sq.ft
                  </span>
                </div>

                <input
                  type="range"
                  min="2000"
                  max="16000"
                  step="500"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-2 bg-[#EBE5DA] rounded-lg appearance-none cursor-pointer accent-[#B8620B]"
                />

                <div className="flex justify-between text-[11px] font-mono text-[#737373] mt-1.5">
                  <span>2,000 SF (Small)</span>
                  <span>8,000 SF</span>
                  <span>16,000+ SF (Very Large)</span>
                </div>
              </div>

              {/* Step 3: Material Specification Tier */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-3">
                  3. Materials and Energy Choices
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'natural', title: 'Natural', subtitle: 'Oak, plaster, bronze' },
                    { id: 'ultra', title: 'Premium Stone', subtitle: 'Basalt, custom stone' },
                    { id: 'passive', title: 'Eco Certified', subtitle: 'Timber that makes net-zero' },
                  ].map((tierItem) => (
                    <button
                      key={tierItem.id}
                      type="button"
                      onClick={() => setTier(tierItem.id as any)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        tier === tierItem.id
                          ? 'border-[#B8620B] bg-[#B8620B]/10 text-[#1A1A1A] ring-1 ring-[#B8620B]'
                          : 'border-[#EBE5DA] hover:border-stone-400 text-[#555]'
                      }`}
                    >
                      <p className="text-xs font-semibold leading-tight">{tierItem.title}</p>
                      <p className="text-[10px] text-[#737373] mt-1 truncate">{tierItem.subtitle}</p>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 bg-[#1A1E24] rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-blueprint-dark opacity-60 pointer-events-none" />

              <div className="relative z-10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#E8797A]">
                  YOUR ESTIMATE
                </span>

                <h4 className="font-serif text-2xl text-white font-semibold mt-2 mb-6">
                  {currentTypology.name}
                </h4>

                <div className="space-y-4 text-xs border-y border-white/10 py-5 my-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Design and Drawings</span>
                    <span className="font-mono text-white font-semibold">{estimatedDesignWeeks} Weeks</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Getting Permission</span>
                    <span className="font-mono text-white font-semibold">6 – 8 Weeks</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Site Support</span>
                    <span className="font-mono text-white font-semibold">~{estimatedConstructionMonths} Months</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Your Main Architect</span>
                    <span className="text-[#E8797A] font-semibold">Our Design Team</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-white/60 mt-4">
                  <ShieldCheck className="w-4 h-4 text-[#B8620B]" />
                  <span>Fixed Price, Guaranteed</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="relative z-10 pt-6">
                <button
                  type="button"
                  onClick={handleInquire}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#B8620B] hover:bg-[#C85A17] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-lg hover:shadow-[#B8620B]/30 hover:scale-[1.02]"
                >
                  <span>Ask for a Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
