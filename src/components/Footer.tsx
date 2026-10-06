import React from 'react';
import { ArrowUp, Phone, Mail, MessageCircle, Instagram } from 'lucide-react';
import {
  EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, MAILTO_HREF, PHONE_DISPLAY, TEL_HREF, whatsappUrl
} from '../config/contact';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#15181D] text-white/80 border-t border-white/10 pt-12 pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Main Footer Grid: Responsive across mobile and desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-10 items-start">
          
          {/* Col 1: Studio Brand & Brief Note (occupies 5 cols on lg) */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#B8620B] to-[#C85A17] flex items-center justify-center font-serif text-white font-bold text-base">
                A
              </div>
              <span className="font-serif font-bold text-lg text-white tracking-wider">
                AALAYA <span className="font-sans font-light text-xs text-[#E8797A] uppercase">AS STUDIOS</span>
              </span>
            </div>

            <p className="text-xs text-white/60 leading-relaxed font-normal max-w-sm">
              We plan and design homes, shops, and offices, inside and out.
            </p>
          </div>

          {/* Col 2: Services (occupies 2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase font-mono tracking-widest text-white font-semibold mb-3.5">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-white/65">
              <li>
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, 'services')}
                  className="hover:text-white transition-colors"
                >
                  Architectural Design
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, 'services')}
                  className="hover:text-white transition-colors"
                >
                  Interior Design
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, 'services')}
                  className="hover:text-white transition-colors"
                >
                  Renovation & Remodeling
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links (occupies 2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase font-mono tracking-widest text-white font-semibold mb-3.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/65">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => scrollToSection(e, 'hero')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, 'services')}
                  className="hover:text-white transition-colors"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="hover:text-white transition-colors"
                >
                  Get in Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Contact (occupies 3 cols on lg) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-white font-semibold mb-3.5">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-white/65">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B8620B] shrink-0" />
                <a href={TEL_HREF} className="hover:text-white transition-colors font-mono">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Chat
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E8797A] shrink-0" />
                <a href={MAILTO_HREF} className="hover:text-white transition-colors break-all">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-[#E1306C] shrink-0" />
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @{INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Clean single-line layout on mobile and desktop without copyright */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4 text-xs text-white/40">
          <p className="text-[11px] font-mono uppercase tracking-wider text-white/50">
            AALAYA AS STUDIOS
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#B8620B] text-white transition-colors text-[11px] uppercase tracking-wider cursor-pointer"
            id="back-to-top-btn"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
