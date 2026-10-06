import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MessageCircle, Instagram, Mail } from 'lucide-react';
import {
  INSTAGRAM_URL, MAILTO_HREF, TEL_HREF, whatsappUrl
} from '../config/contact';

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = ['hero', 'services', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
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
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-[#F5F1E8] py-3.5'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          className="group flex items-center gap-3 focus:outline-none"
          id="nav-logo"
        >
          <img
            src="/logo2.png"
            alt="Aalaya As Studios"
            className="w-[9.45rem] sm:w-[11.55rem] h-auto mix-blend-multiply contrast-110 saturate-90 transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-4 py-2 text-xs uppercase tracking-widest font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[#B8620B] font-semibold'
                    : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#B8620B]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Quick Links */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-all shadow-xs"
            title="Instagram"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <a
            href={MAILTO_HREF}
            className="p-2 rounded-full bg-[#E8797A]/10 text-[#E8797A] hover:bg-[#E8797A] hover:text-white transition-all shadow-xs"
            title="Email us"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-xs"
            title="Chat on WhatsApp"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <a
            href={TEL_HREF}
            className="p-2 rounded-full bg-[#F5F1E8] text-[#1A1A1A] hover:bg-[#B8620B] hover:text-white transition-all shadow-xs"
            title="Call Studio"
            aria-label="Phone"
          >
            <Phone className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="px-5 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B8620B] transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/80 border border-[#EBE5DA] text-[#1A1A1A] focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-[#EBE5DA] px-6 py-5 shadow-lg"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm uppercase tracking-wider font-medium text-[#1A1A1A] hover:text-[#B8620B] py-2"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="pt-4 border-t border-[#EBE5DA] flex flex-col gap-2.5">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="w-full text-center py-3 rounded-xl bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold"
                >
                  Get in Touch
                </a>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366]/10 text-[#15803d] text-xs uppercase tracking-wider font-semibold"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Chat</span>
                </a>
                <div className="grid grid-cols-3 gap-2.5">
                  <a
                    href={TEL_HREF}
                    className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#F5F1E8] text-[#1A1A1A] text-[11px] uppercase tracking-wider font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B8620B]" />
                    <span>Call</span>
                  </a>
                  <a
                    href={MAILTO_HREF}
                    className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#E8797A]/10 text-[#C85A17] text-[11px] uppercase tracking-wider font-semibold"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#E1306C]/10 text-[#E1306C] text-[11px] uppercase tracking-wider font-semibold"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Insta</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
