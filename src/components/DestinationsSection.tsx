import React, { useState } from 'react';
import { ArrowUpRight, Check, MapPin, X } from 'lucide-react';

interface Destination {
  id: string;
  country: string;
  tagline: string;
  image: string;
  description: string;
  intakes: string;
  avgDuration: string;
  workRights: string;
  keyFeatures: string[];
}

interface DestinationsSectionProps {
  onSelectDestination: (country: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({ onSelectDestination }) => {
  const [selectedModalDest, setSelectedModalDest] = useState<Destination | null>(null);

  const destinations: Destination[] = [
    {
      id: 'uk',
      country: 'United Kingdom',
      tagline: 'Academic Tradition & Accelerated Pathways',
      image: '/destinations/uk.jpg',
      description:
        'Home to centuries-old universities and cutting-edge research facilities. The UK offers intensive 1-year postgraduate degrees and structured undergraduate courses recognized worldwide.',
      intakes: 'September & January',
      avgDuration: '3 Years (UG) / 1 Year (PG)',
      workRights: 'Graduate Route (2-3 years post-study)',
      keyFeatures: [
        'World-ranking research institutions',
        'Accelerated 1-year master’s programmes',
        'Rich cultural and literary heritage',
        'Direct career links across Europe',
      ],
    },
    {
      id: 'canada',
      country: 'Canada',
      tagline: 'Innovation, Diversity & Clear Pathways',
      image: '/destinations/canada.jpg',
      description:
        'Consistently ranked among the world’s most welcoming nations for international scholars, offering high academic standards, co-op work experience, and robust student support.',
      intakes: 'September, January & May',
      avgDuration: '4 Years (UG) / 1-2 Years (PG)',
      workRights: 'Post-Graduation Work Permit (PGWP)',
      keyFeatures: [
        'Subsidized public education model',
        'Integrated Co-op work terms',
        'Safe, multicultural metropolitan hubs',
        'Clear pathways for skilled graduates',
      ],
    },
    {
      id: 'australia',
      country: 'Australia',
      tagline: 'Global Research & Unmatched Quality of Life',
      image: '/destinations/australia.jpg',
      description:
        'Distinguished by high-calibre teaching, strong industry alignment, and leading research facilities. Australian universities emphasize practical learning in dynamic student cities.',
      intakes: 'February & July',
      avgDuration: '3-4 Years (UG) / 1.5-2 Years (PG)',
      workRights: 'Temporary Graduate Visa (Subclass 485)',
      keyFeatures: [
        'Group of Eight research excellence',
        'High student satisfaction ratings',
        'Balanced lifestyle with modern facilities',
        'Favourable post-study work options',
      ],
    },
  ];

  return (
    <section
      id="destinations"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-ivory)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Primary Study Hubs</span>
          <h2 className="section-title">Explore Study Destinations</h2>
          <p className="section-desc">
            We provide impartial, personalized guidance across top global education systems. Explore their unique
            structures, academic advantages, and post-study opportunities.
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="card-base"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                height: '100%',
              }}
            >
              {/* Card Image with subtle hover zoom */}
              <div
                style={{
                  position: 'relative',
                  height: '220px',
                  overflow: 'hidden',
                  backgroundColor: '#142235',
                }}
              >
                <img
                  src={dest.image}
                  alt={`${dest.country} campus and cityscape`}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(20, 34, 53, 0.85)',
                    color: '#ffffff',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <MapPin size={13} color="#789A98" />
                  <span>{dest.country}</span>
                </div>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                }}
              >
                <div style={{ marginBottom: '0.5rem' }}>
                  <h3
                    style={{
                      fontSize: '1.35rem',
                      color: 'var(--color-navy)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {dest.country}
                  </h3>
                  <div
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--color-teal-dark)',
                    }}
                  >
                    {dest.tagline}
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--color-body)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                    flexGrow: 1,
                  }}
                >
                  {dest.description}
                </p>

                {/* Key feature bullets */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1.75rem',
                    padding: '1rem',
                    backgroundColor: 'var(--color-mist)',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                  }}
                >
                  {dest.keyFeatures.slice(0, 3).map((feat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={14} color="#789A98" strokeWidth={2.5} />
                      <span style={{ color: 'var(--color-body-dark)' }}>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="btn btn-outline-navy"
                    onClick={() => setSelectedModalDest(dest)}
                    style={{
                      flex: 1,
                      fontSize: '0.88rem',
                      padding: '0.65rem 1rem',
                      minHeight: '42px',
                    }}
                  >
                    <span>View Overview</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onSelectDestination(dest.country)}
                    style={{
                      fontSize: '0.88rem',
                      padding: '0.65rem 1.15rem',
                      minHeight: '42px',
                    }}
                    title={`Consult on studying in ${dest.country}`}
                  >
                    <span>Apply</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destination Detailed Overview Modal */}
      {selectedModalDest && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-dest-title"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(20, 34, 53, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setSelectedModalDest(null)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div style={{ position: 'relative', height: '200px' }}>
              <img
                src={selectedModalDest.image}
                alt={selectedModalDest.country}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                type="button"
                onClick={() => setSelectedModalDest(null)}
                aria-label="Close modal"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: 'rgba(20, 34, 53, 0.8)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '2rem' }}>
              <span className="section-tag">{selectedModalDest.tagline}</span>
              <h3 id="modal-dest-title" style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
                Study in {selectedModalDest.country}
              </h3>
              <p style={{ fontSize: '0.98rem', marginBottom: '1.5rem' }}>{selectedModalDest.description}</p>

              {/* Fast Facts Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  padding: '1.25rem',
                  backgroundColor: 'var(--color-mist)',
                  borderRadius: '12px',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-body)' }}>
                    Primary Intakes
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: '0.92rem' }}>
                    {selectedModalDest.intakes}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-body)' }}>
                    Degree Duration
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: '0.92rem' }}>
                    {selectedModalDest.avgDuration}
                  </div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-body)' }}>
                    Post-Study Work
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: '0.92rem' }}>
                    {selectedModalDest.workRights}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  type="button"
                  className="btn btn-outline-navy"
                  onClick={() => setSelectedModalDest(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    const country = selectedModalDest.country;
                    setSelectedModalDest(null);
                    onSelectDestination(country);
                  }}
                >
                  <span>Request Consultation for {selectedModalDest.country}</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
