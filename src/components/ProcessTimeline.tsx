import React from 'react';
import { CalendarCheck, Compass, FileCheck, Send, ArrowRight } from 'lucide-react';

interface ProcessTimelineProps {
  onStartProcess: () => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onStartProcess }) => {
  const steps = [
    {
      num: '01',
      icon: CalendarCheck,
      title: 'Book a Consultation',
      summary: 'Initial Diagnostic & Profile Review',
      detail:
        'Schedule a confidential session with a dedicated advisor to evaluate your academic transcripts, English proficiency, budgetary scope, and career ambitions.',
    },
    {
      num: '02',
      icon: Compass,
      title: 'Choose Destination & University',
      summary: 'Data-Driven Shortlisting',
      detail:
        'Compare country frameworks, post-study opportunities, tuition brackets, and specialized faculty rankings to finalize your targeted application list.',
    },
    {
      num: '03',
      icon: FileCheck,
      title: 'Prepare Your Application',
      summary: 'Portfolio & Statement Refinement',
      detail:
        'Compile authenticated documentation, structure impactful statements of purpose, coordinate referee letters, and lodge applications well in advance.',
    },
    {
      num: '04',
      icon: Send,
      title: 'Get Ready for Departure',
      summary: 'Visa Lodgement & Arrival Briefing',
      detail:
        'Finalize acceptance offers, organize certified financial records for visa lodgement, arrange student accommodations, and attend pre-departure orientation.',
    },
  ];

  return (
    <section
      id="process"
      className="section-padding"
      style={{
        backgroundColor: '#ffffff',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Methodical Pathway</span>
          <h2 className="section-title">Your Study-Abroad Journey</h2>
          <p className="section-desc">
            A structured, stress-free four-stage roadmap guiding you from initial inquiry to your first day on campus.
          </p>
        </div>

        {/* Minimal Timeline Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            position: 'relative',
          }}
        >
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2rem 1.5rem',
                  backgroundColor: 'var(--color-ivory)',
                  borderRadius: '16px',
                  border: '1px solid rgba(20, 34, 53, 0.07)',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }}
                className="step-card"
              >
                {/* Step number indicator */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: 'var(--color-slate-light)',
                      opacity: 0.6,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {s.num}
                  </span>

                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(120, 154, 152, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-teal-dark)',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--color-teal-dark)',
                    letterSpacing: '0.06em',
                    marginBottom: '0.35rem',
                  }}
                >
                  {s.summary}
                </div>

                <h3
                  style={{
                    fontSize: '1.2rem',
                    marginBottom: '0.85rem',
                    color: 'var(--color-navy)',
                  }}
                >
                  {s.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--color-body)',
                    lineHeight: 1.6,
                    flexGrow: 1,
                  }}
                >
                  {s.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Process CTA Footer */}
        <div
          style={{
            marginTop: '3.5rem',
            textAlign: 'center',
          }}
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={onStartProcess}
            style={{
              padding: '0.85rem 2rem',
              fontSize: '0.95rem',
            }}
          >
            <span>Start Step 1: Book Consultation</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .step-card:hover {
          transform: translateY(-4px);
          border-color: rgba(120, 154, 152, 0.4);
        }
      `}</style>
    </section>
  );
};
