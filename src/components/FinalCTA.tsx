import React from 'react';
import { ArrowRight, Sparkles, Clock, ShieldCheck, MessageSquare } from 'lucide-react';

interface FinalCTAProps {
  onOpenConsultation: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenConsultation }) => {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-navy)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        padding: '7rem 0',
      }}
    >
      {/* Background subtle geometric architectural accents */}
      <div
        style={{
          position: 'absolute',
          top: '-150px',
          right: '-150px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(120, 154, 152, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '-100px',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52, 75, 96, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Subtle Tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(120, 154, 152, 0.15)',
              border: '1px solid rgba(120, 154, 152, 0.3)',
              color: '#94b5b3',
              fontSize: '0.82rem',
              fontWeight: 600,
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              marginBottom: '1.5rem',
            }}
          >
            <Sparkles size={15} />
            <span>Advisory Intake 2026 / 2027</span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.2,
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem',
            }}
          >
            Your Future Starts with <br className="hidden-mobile" />
            <span style={{ color: 'var(--color-teal)' }}>One Conversation.</span>
          </h2>

          {/* Supporting Text */}
          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
              color: 'rgba(231, 235, 237, 0.9)',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              maxWidth: '580px',
              margin: '0 auto 2.5rem auto',
            }}
          >
            Let's explore your study-abroad options together.
          </p>

          {/* CTA Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenConsultation}
              style={{
                fontSize: '1.05rem',
                padding: '1rem 2.5rem',
                minHeight: '52px',
                boxShadow: '0 8px 30px rgba(120, 154, 152, 0.35)',
              }}
            >
              <span>Book a Free Consultation</span>
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Pillars of Consultation */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '2rem',
              color: 'rgba(231, 235, 237, 0.75)',
              fontSize: '0.85rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '2rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} color="var(--color-teal)" />
              <span>30-Minute Diagnostic Session</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} color="var(--color-teal)" />
              <span>Zero Placement Fee Guarantee</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={16} color="var(--color-teal)" />
              <span>Virtual or In-Office Availability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
