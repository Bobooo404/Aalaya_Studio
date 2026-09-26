import React from 'react';
import { motion } from 'motion/react';
import { TEAM_MEMBERS, AWARDS_DATA } from '../data/portfolioData';
import { Award, Sparkles, GraduationCap } from 'lucide-react';

export const TeamAwards: React.FC = () => {
  return (
    <section className="relative py-28 lg:py-36 bg-white/80 backdrop-blur-[2px] overflow-hidden border-t border-[#F0EBE1]">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Awards Bar */}
        <div className="mb-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F1E8] text-[11px] uppercase tracking-widest text-[#B8620B] font-semibold mb-3">
                <Award className="w-3.5 h-3.5 text-[#B8620B]" />
                <span>Our Awards</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1A1A1A]">
                Awarded by Leading Architecture Groups
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AWARDS_DATA.map((award, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#FBF9F5] border border-[#EBE5DA] hover:border-[#B8620B]/40 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#B8620B] px-2 py-0.5 rounded bg-white border border-[#E5DFD5]">
                    {award.year}
                  </span>
                  <Award className="w-4 h-4 text-[#E8797A]" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1A1A1A] mb-1">
                  {award.title}
                </h4>
                <p className="text-xs text-[#737373] mb-2">{award.body}</p>
                <p className="text-[11px] font-mono text-[#B8620B]">Project: {award.project}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F1E8] text-[11px] uppercase tracking-widest text-[#B8620B] font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#B8620B]" />
              <span>Our Team</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-3">
              The Architects Behind AALAYA
            </h3>
            <p className="text-sm text-[#666]">
              A team of architects, engineers, and interior designers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, mIdx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: mIdx * 0.12 }}
                className="group bg-[#FBF9F5] rounded-2xl overflow-hidden border border-[#EBE5DA] shadow-xs hover:shadow-xl hover:border-[#B8620B]/40 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#2C2C2C]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#E8797A]">
                      {member.specialty}
                    </span>
                    <h4 className="font-serif text-xl font-bold">{member.name}</h4>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#B8620B] font-semibold mb-2">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{member.credentials}</span>
                    </div>
                    <p className="text-xs text-[#666] leading-relaxed mb-4">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EBE5DA] text-[11px] uppercase tracking-wider text-[#737373] font-medium">
                    {member.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
