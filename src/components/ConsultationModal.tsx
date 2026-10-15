import React, { useState, useEffect } from 'react';
import { X, User, Mail, CheckCircle2, Send, Shield } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetDestination?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  presetDestination,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState(presetDestination || 'United Kingdom');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (presetDestination) {
      setDestination(presetDestination);
    }
  }, [presetDestination]);

  // Trap escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please provide your name and email address.');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-consultation-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(20, 34, 53, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          maxWidth: '540px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: 'var(--color-navy)',
            color: '#ffffff',
            padding: '1.75rem 2rem',
            position: 'relative',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close consultation modal"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>

          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--color-teal)',
              display: 'block',
              marginBottom: '0.35rem',
            }}
          >
            Direct Calendar Booking
          </span>
          <h2 id="modal-consultation-title" style={{ fontSize: '1.5rem', color: '#ffffff' }}>
            Book a Free 1-on-1 Consultation
          </h2>
        </div>

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(60, 125, 101, 0.15)',
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto',
                }}
              >
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                Consultation Slot Requested
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-body)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                An advisor specializing in <strong>{destination}</strong> admissions will confirm your video appointment
                at <strong>{email}</strong>.
              </p>
              <button type="button" className="btn btn-primary" onClick={handleReset} style={{ width: '100%' }}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {error && (
                <div
                  style={{
                    backgroundColor: 'rgba(194, 65, 62, 0.1)',
                    color: 'var(--color-error)',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  {error}
                </div>
              )}

              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  htmlFor="modal-name"
                  style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.35rem' }}
                >
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    placeholder="Elena Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.5rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(20, 34, 53, 0.2)',
                      fontSize: '0.92rem',
                    }}
                  />
                  <User size={16} color="var(--color-body)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  htmlFor="modal-email"
                  style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.35rem' }}
                >
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    placeholder="elena@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.5rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(20, 34, 53, 0.2)',
                      fontSize: '0.92rem',
                    }}
                  />
                  <Mail size={16} color="var(--color-body)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  htmlFor="modal-dest"
                  style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.35rem' }}
                >
                  Country of Interest
                </label>
                <select
                  id="modal-dest"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(20, 34, 53, 0.2)',
                    fontSize: '0.92rem',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Undecided">Undecided / Comparing</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--color-body)', marginBottom: '1.5rem' }}>
                <Shield size={14} color="var(--color-teal)" />
                <span>Zero obligations. All consultations are completely confidential.</span>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', minHeight: '48px' }}>
                <span>Confirm Free Consultation</span>
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
