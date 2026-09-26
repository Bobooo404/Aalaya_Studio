import React from 'react';
import { motion } from 'motion/react';
import { Building2, Compass, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const coreServices = [
    {
      id: 'architectural-design',
      number: '01',
      title: 'Architectural Design',
      tagline: 'Homes & Commercial Buildings',
      description: 'We plan the whole building, from the first floor plan and 3D view to the drawing you need for permission and the drawings we use on site.',
      icon: Building2,
      deliverables: [
        'Checking the site and planning the layout',
        'Design for your home or commercial building',
        'Drawings for building permission',
        'Checking plans during construction'
      ]
    },
    {
      id: 'interior-architecture',
      number: '02',
      title: 'Interior Design',
      tagline: 'Room Layouts & Materials',
      description: 'We plan the inside of your space and help you pick the right materials, lights, and storage so the rooms work well and feel warm.',
      icon: Compass,
      deliverables: [
        'Planning rooms and where things go',
        'Custom cupboards and wood work',
        'Choosing lights, finishes, and materials',
        'Choosing taps, handles, and paint colours'
      ]
    },
    {
      id: 'renovation-structural',
      number: '03',
      title: 'Renovation & Remodeling',
      tagline: 'Improve Your Home or Space',
      description: 'We improve existing homes and shops so the space flows better, has more natural light, and looks fresh again.',
      icon: Wrench,
      deliverables: [
        'Making the space modern and open',
        'Removing walls and making new openings',
        'Inside and outside repairs',
        'Watching the work on site'
      ]
    }
  ];

  const handleServiceClick = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    } else {
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative py-20 lg:py-28 bg-[#F5F1E8]/50 overflow-hidden border-t border-[#EAE3D2]">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header in simple, basic English */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E0D7C5] text-[11px] uppercase tracking-widest text-[#B8620B] font-semibold mb-3">
            <span>What We Offer</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-medium tracking-tight">
            Our Design Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#555] font-normal leading-relaxed">
            Practical design services for your space, your idea, and your budget.
          </p>
        </div>

        {/* 3 Clean Core Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white rounded-2xl p-7 sm:p-8 border border-[#E8E1D5] shadow-xs hover:shadow-lg hover:border-[#B8620B]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Icon & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-[#EAE3D2] flex items-center justify-center text-[#B8620B] group-hover:bg-[#B8620B] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-sm font-semibold text-[#999] group-hover:text-[#B8620B] transition-colors">
                      {service.number}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-medium mb-1.5 group-hover:text-[#B8620B] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#B8620B] font-medium mb-4">
                    {service.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-[#555] leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Deliverables */}
                  <div className="pt-4 border-t border-[#F5F1E8] space-y-2 mb-8">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#888] mb-2 font-semibold">
                      What is included:
                    </p>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#444]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B8620B] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Quick Contact Action */}
                <div className="pt-4 border-t border-[#F5F1E8]">
                  <button
                    onClick={() => handleServiceClick(service.title)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-[#1A1A1A] py-2.5 px-3.5 rounded-lg bg-[#FAF6F0] hover:bg-[#B8620B] hover:text-white transition-all group/btn cursor-pointer"
                  >
                    <span>Ask About {service.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
