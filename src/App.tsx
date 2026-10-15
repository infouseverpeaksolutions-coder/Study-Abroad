import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroCinematic } from './components/HeroCinematic';
import { DestinationsSection } from './components/DestinationsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessTimeline } from './components/ProcessTimeline';
import { FinalCTA } from './components/FinalCTA';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';

export const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string>('United Kingdom');

  const handleOpenConsultation = (destination?: string) => {
    if (destination) {
      setSelectedDestination(destination);
    }
    setIsModalOpen(true);
  };

  const handleSelectDestinationForForm = (destination: string) => {
    setSelectedDestination(destination);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-layout">
      {/* 1. Header / Navigation */}
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      <main id="main-content">
        {/* 2. Cinematic Scroll-Controlled Video Hero (accounts for ~50% of scrollable journey) */}
        <HeroCinematic onOpenConsultation={() => handleOpenConsultation()} />

        {/* 3. Section A: Destination Cards */}
        <DestinationsSection onSelectDestination={handleSelectDestinationForForm} />

        {/* 4. Section B: Advisory Benefits */}
        <WhyChooseUs />

        {/* 5. Section C: Four-Step Process */}
        <ProcessTimeline onStartProcess={() => handleOpenConsultation()} />

        {/* 6. Section D: Final Consultation CTA */}
        <FinalCTA onOpenConsultation={() => handleOpenConsultation()} />

        {/* 7. Section E: Contact Form */}
        <ContactForm initialDestination={selectedDestination} />
      </main>

      {/* 8. Footer */}
      <Footer />

      {/* Global Interactive Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        presetDestination={selectedDestination}
      />
    </div>
  );
};

export default App;
