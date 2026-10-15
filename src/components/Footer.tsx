import React from 'react';
import { Compass, Mail, Phone, MapPin, Clock, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-navy)',
        color: '#ffffff',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        paddingTop: '5rem',
        paddingBottom: '2.5rem',
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand & Mission Statement */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(120, 154, 152, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-teal)',
                }}
              >
                <Compass size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.04em' }}>AURA</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-teal)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Study Advisory
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'rgba(231, 235, 237, 0.75)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              Dedicated to impartial international education counseling, objective university matching, and ethical application guidance for students worldwide.
            </p>

            <div style={{ fontSize: '0.78rem', color: 'rgba(120, 154, 152, 0.9)' }}>
              Certified International Education Advisory
            </div>
          </div>

          {/* Column 1: Primary Hubs */}
          <div>
            <h3
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-teal)',
                marginBottom: '1.25rem',
              }}
            >
              Study Destinations
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li>
                <a
                  href="#destinations"
                  style={{ color: 'rgba(231, 235, 237, 0.8)', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(231, 235, 237, 0.8)')}
                >
                  United Kingdom Universities
                </a>
              </li>
              <li>
                <a
                  href="#destinations"
                  style={{ color: 'rgba(231, 235, 237, 0.8)', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(231, 235, 237, 0.8)')}
                >
                  Canadian Higher Education
                </a>
              </li>
              <li>
                <a
                  href="#destinations"
                  style={{ color: 'rgba(231, 235, 237, 0.8)', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(231, 235, 237, 0.8)')}
                >
                  Australian Institutions
                </a>
              </li>
              <li>
                <a
                  href="#destinations"
                  style={{ color: 'rgba(231, 235, 237, 0.8)', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(231, 235, 237, 0.8)')}
                >
                  Degree Duration Comparison
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Advisory Scope */}
          <div>
            <h3
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-teal)',
                marginBottom: '1.25rem',
              }}
            >
              Advisory Scope
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li>
                <a
                  href="#advisory"
                  style={{ color: 'rgba(231, 235, 237, 0.8)', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(231, 235, 237, 0.8)')}
                >
                  Profile & Academic Assessment
                </a>
              </li>
              <li>
                <a
                  href="#advisory"
                  style={{ color: 'rgba(231, 235, 237, 0.8)', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(231, 235, 237, 0.8)')}
                >
                  Statement of Purpose Editing
                </a>
              </li>
              <li>
                <a
                  href="#advisory"
                  style={{ color: 'rgba(231, 235, 237, 0.8)', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(231, 235, 237, 0.8)')}
                >
                  Visa Documentation Verification
                </a>
              </li>
              <li>
                <a
                  href="#advisory"
                  style={{ color: 'rgba(231, 235, 237, 0.8)', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(231, 235, 237, 0.8)')}
                >
                  Pre-Arrival Student Orientation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Placeholders clearly marked for replacement */}
          <div>
            <h3
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-teal)',
                marginBottom: '1.25rem',
              }}
            >
              Advisory Office & Contacts
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.86rem', color: 'rgba(231, 235, 237, 0.8)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={16} color="var(--color-teal)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <span style={{ color: 'rgba(231, 235, 237, 0.5)', display: 'block', fontSize: '0.75rem' }}>
                    [Contact Placeholder — Replace with Headquarters]
                  </span>
                  <span>Suite 400, Global Education Tower, London EC2A 4NE</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={16} color="var(--color-teal)" style={{ flexShrink: 0 }} />
                <div>
                  <span style={{ color: 'rgba(231, 235, 237, 0.5)', display: 'block', fontSize: '0.75rem' }}>
                    [Contact Placeholder — Replace with Desk Email]
                  </span>
                  <a href="mailto:advisory@aura-advisors.example.com" style={{ color: '#ffffff' }}>
                    advisory@aura-advisors.example.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={16} color="var(--color-teal)" style={{ flexShrink: 0 }} />
                <div>
                  <span style={{ color: 'rgba(231, 235, 237, 0.5)', display: 'block', fontSize: '0.75rem' }}>
                    [Contact Placeholder — Replace with Phone]
                  </span>
                  <span>+44 (0) 20 7946 0812 / +1 (800) 555-0144</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Clock size={16} color="var(--color-teal)" style={{ flexShrink: 0 }} />
                <span>Mon – Fri: 09:00 – 18:00 (GMT)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            fontSize: '0.82rem',
            color: 'rgba(231, 235, 237, 0.6)',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} Aura Advisory Services. All rights reserved. Impartial educational consulting.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ color: 'rgba(231, 235, 237, 0.4)' }}>
              Independent Advisory — Not an Immigration Enforcement Body
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(120, 154, 152, 0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)')}
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
