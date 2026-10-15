import React from 'react';
import { UserCheck, FileText, ShieldAlert, Plane, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      icon: UserCheck,
      title: 'Personalized University Guidance',
      description:
        'We assess your academic credentials, career ambitions, and financial parameters to build a tailored shortlist of institutions that align with your genuine potential.',
      tag: 'Strategic Matching',
    },
    {
      icon: FileText,
      title: 'Application Support',
      description:
        'Structured critique and refinement for statements of purpose, academic CVs, and recommendation letters to present your strengths honestly and effectively.',
      tag: 'End-to-End Care',
    },
    {
      icon: ShieldAlert,
      title: 'Documentation & Visa Guidance',
      description:
        'Meticulous adherence to official embassy regulations, financial compliance frameworks, and submission checklists to maximize preparation clarity.',
      tag: 'Regulatory Clarity',
    },
    {
      icon: Plane,
      title: 'Pre-Departure Preparation',
      description:
        'Pragmatic pre-arrival briefings covering student accommodations, medical coverage, foreign exchange, and cultural adaptation in your destination city.',
      tag: 'Smooth Transition',
    },
  ];

  return (
    <section
      id="advisory"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-mist)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Our Ethical Advisory Principles</span>
          <h2 className="section-title">Why Choose Our Advisory?</h2>
          <p className="section-desc">
            We prioritize student well-being and academic alignment over commercial targets. Our advisors operate with
            integrity, realism, and rigorous attention to detail.
          </p>
        </div>

        {/* Benefit Cards Grid (4 cards) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="card-base"
                style={{
                  padding: '2.25rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                }}
              >
                {/* Icon wrapper */}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(120, 154, 152, 0.14)',
                    border: '1px solid rgba(120, 154, 152, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-navy)',
                    marginBottom: '1.5rem',
                  }}
                >
                  <Icon size={26} strokeWidth={1.9} color="var(--color-slate)" />
                </div>

                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--color-teal-dark)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {b.tag}
                </div>

                <h3
                  style={{
                    fontSize: '1.2rem',
                    marginBottom: '0.85rem',
                    color: 'var(--color-navy)',
                    lineHeight: 1.35,
                  }}
                >
                  {b.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--color-body)',
                    lineHeight: 1.65,
                  }}
                >
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Commitment note on transparency */}
        <div
          style={{
            marginTop: '3.5rem',
            padding: '1.25rem 2rem',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(20, 34, 53, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            maxWidth: '850px',
            margin: '3.5rem auto 0 auto',
          }}
        >
          <div
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(120, 154, 152, 0.15)',
              color: 'var(--color-teal-dark)',
              flexShrink: 0,
            }}
          >
            <HeartHandshake size={24} />
          </div>
          <div style={{ fontSize: '0.88rem', color: 'var(--color-body)' }}>
            <strong style={{ color: 'var(--color-navy)' }}>Our Transparent Pledge:</strong> We never promise guaranteed
            admissions or predetermined visa approvals. Every international university makes independent academic
            decisions, and every consular post evaluates individual merits. We empower your application with honest,
            thorough preparation.
          </div>
        </div>
      </div>
    </section>
  );
};
