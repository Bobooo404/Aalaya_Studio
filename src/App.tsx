import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { CinematicInteriorBackground } from './components/CinematicInteriorBackground';
import { ProjectsSection } from './components/ProjectsSection';

export default function App() {
  const [initialInquiryMessage, setInitialInquiryMessage] = useState('');

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (customMessage?: string) => {
    if (customMessage) {
      setInitialInquiryMessage(customMessage);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FBF9F5] text-[#1A1A1A]">
      {/* Scroll-linked photographic interior scene. It rewinds as the page is scrolled back up. */}
      <CinematicInteriorBackground />

      {/* Sticky Header Navigation */}
      <Navbar />

      <main className="relative z-10 flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreWork={scrollToServices}
          onBookConsultation={() => scrollToContact()}
        />

        {/* 2. Services Section */}
        <ServicesSection onSelectService={(title) => scrollToContact(`I would like to ask about: ${title}`)} />

        {/* 3. Example project showcase */}
        <ProjectsSection />

        {/* 4. Contact/CTA Section: Direct Get in Touch (Phone, WhatsApp, Email, and Message Form) */}
        <ContactCTA initialMessage={initialInquiryMessage} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
