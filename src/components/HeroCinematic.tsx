import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroCinematicProps {
  onOpenConsultation: () => void;
}

export const HeroCinematic: React.FC<HeroCinematicProps> = ({ onOpenConsultation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [duration, setDuration] = useState(23.0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const targetTimeRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Scrubbing RAF loop
  const startRafLoop = useCallback(() => {
    const tick = () => {
      const video = videoRef.current;
      if (video && !video.seeking && video.readyState >= 2) {
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.04) {
          try {
            if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
              (video as any).fastSeek(targetTimeRef.current);
            } else {
              video.currentTime = targetTimeRef.current;
            }
          } catch {
            // fallback
          }
        }
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };

    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(tick);
    }
  }, []);

  // Handle video metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration || 23.0;
      setDuration(dur);
      setVideoLoaded(true);
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  // Setup GSAP ScrollTrigger for video scrubbing & text animations
  useEffect(() => {
    if (isReducedMotion) {
      return;
    }

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) return;

    startRafLoop();

    const isMobile = window.innerWidth < 768;
    const scrollDistance = isMobile ? 1800 : 3200;

    const ctx = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const prog = self.progress;

          const vidDur = video?.duration || 23.0;
          targetTimeRef.current = Math.min(prog * vidDur, vidDur - 0.05);

          // Update chapter based on scroll
          if (prog < 0.25) {
            setActiveChapter(0);
          } else if (prog < 0.55) {
            setActiveChapter(1);
          } else if (prog < 0.8) {
            setActiveChapter(2);
          } else {
            setActiveChapter(3);
          }
        },
      });
    }, container);

    return () => {
      ctx.revert();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isReducedMotion, duration, startRafLoop]);

  // Jump directly to section
  const scrollToDestinations = () => {
    const el = document.getElementById('destinations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scenes = [
    {
      id: 0,
      tag: 'GLOBAL ADVISORY • 2026 / 2027',
      headlineMain: 'Your Journey',
      headlineAccent: 'Starts Here.',
      description:
        'Expert guidance to help you find the right destination, university and pathway to your future.',
      primaryBtnText: 'Book a Free Consultation',
      secondaryBtnText: 'Explore Destinations',
    },
    {
      id: 1,
      tag: 'INTERNATIONAL EDUCATION PATHWAYS',
      headlineMain: 'Explore Global',
      headlineAccent: 'Destinations.',
      description:
        'Connecting ambitious scholars with premier institutions across the United Kingdom, Canada, and Australia.',
      primaryBtnText: 'Book a Free Consultation',
      secondaryBtnText: 'Explore Destinations',
    },
    {
      id: 2,
      tag: 'CAMPUS & RESEARCH EXCELLENCE',
      headlineMain: 'Discover Modern',
      headlineAccent: 'Campus Life.',
      description:
        'Experience world-class learning environments that foster innovation, academic excellence, and personal growth.',
      primaryBtnText: 'Book a Free Consultation',
      secondaryBtnText: 'Explore Destinations',
    },
    {
      id: 3,
      tag: 'PERSONAL GUIDANCE & CONFIDENCE',
      headlineMain: 'Step Into',
      headlineAccent: 'Your Future.',
      description:
        'Comprehensive, transparent advisory support from initial consultation to university enrollment and arrival.',
      primaryBtnText: 'Book a Free Consultation',
      secondaryBtnText: 'Explore Destinations',
    },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#142235',
        overflow: 'hidden',
        color: '#ffffff',
      }}
      id="hero-cinematic"
    >
      {/* 1. CINEMATIC VIDEO MEDIA LAYER (BRIGHT & VIVID) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <video
          ref={videoRef}
          src="/Untitled_Scene_10-15_10_40_12_20261015162459.mp4"
          poster="/hero-poster.jpg"
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onError={() => setVideoError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: videoLoaded ? 1 : 0.9,
            filter: 'brightness(1.15) contrast(1.05) saturate(1.15)',
            transition: 'opacity 0.6s ease',
          }}
          aria-hidden="true"
        />

        {/* Fallback poster image if video fails */}
        {videoError && (
          <img
            src="/hero-poster.jpg"
            alt="Study Abroad Journey Cinematic Poster"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}

        {/* Soft radial contrast mask centered behind typography to ensure pure readability without dark boxes */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            background:
              'radial-gradient(ellipse at center, rgba(20, 34, 53, 0.42) 0%, rgba(20, 34, 53, 0.18) 55%, transparent 80%)',
          }}
        />

        {/* Subtle bottom edge blend */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '80px',
            background: 'linear-gradient(to top, rgba(20, 34, 53, 0.35) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* 2. CENTERED TEXT CONTENT (WITHOUT CONTAINER BACKGROUND) ANIMATED WITH SCROLL */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 1.5rem',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '920px',
            minHeight: '380px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {scenes.map((scene, idx) => {
            const isCurrent = activeChapter === idx;
            const isPast = activeChapter > idx;

            return (
              <div
                key={scene.id}
                style={{
                  position: 'absolute',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  opacity: isCurrent ? 1 : 0,
                  transform: isCurrent
                    ? 'translateY(0) scale(1)'
                    : isPast
                    ? 'translateY(-36px) scale(0.96)'
                    : 'translateY(36px) scale(0.96)',
                  pointerEvents: isCurrent ? 'auto' : 'none',
                  transition:
                    'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Subtle refined category tag */}
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: '#94b5b3',
                    marginBottom: '1.25rem',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
                  }}
                >
                  {scene.tag}
                </div>

                {/* Main Headline without background box */}
                <h1
                  style={{
                    fontSize: 'clamp(2.6rem, 5.8vw, 4.8rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.12,
                    letterSpacing: '-0.03em',
                    marginBottom: '1.4rem',
                    textShadow:
                      '0 4px 30px rgba(0, 0, 0, 0.85), 0 2px 10px rgba(0, 0, 0, 0.95), 0 0 2px rgba(0, 0, 0, 0.9)',
                  }}
                >
                  {scene.headlineMain}{' '}
                  <span
                    style={{
                      color: '#789A98',
                      textShadow:
                        '0 4px 30px rgba(0, 0, 0, 0.85), 0 2px 10px rgba(0, 0, 0, 0.95)',
                    }}
                  >
                    {scene.headlineAccent}
                  </span>
                </h1>

                {/* Supporting description text */}
                <p
                  style={{
                    fontSize: 'clamp(1.05rem, 1.9vw, 1.3rem)',
                    color: '#F4F3EE',
                    lineHeight: 1.65,
                    marginBottom: '2.5rem',
                    maxWidth: '680px',
                    margin: '0 auto 2.5rem auto',
                    textShadow:
                      '0 2px 16px rgba(0, 0, 0, 0.9), 0 1px 4px rgba(0, 0, 0, 0.95)',
                  }}
                >
                  {scene.description}
                </p>

                {/* Centered Action Buttons */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onOpenConsultation}
                    style={{
                      padding: '0.95rem 2.25rem',
                      fontSize: '1rem',
                      fontWeight: 700,
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <span>{scene.primaryBtnText}</span>
                    <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={scrollToDestinations}
                    style={{
                      padding: '0.95rem 2rem',
                      fontSize: '1rem',
                      backgroundColor: 'rgba(20, 34, 53, 0.4)',
                      borderColor: 'rgba(255, 255, 255, 0.35)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                    }}
                  >
                    <span>{scene.secondaryBtnText}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. MINIMALIST UNDERSTATED SCROLL INDICATOR (CENTERED BOTTOM) */}
      <div
        onClick={scrollToDestinations}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'rgba(255, 255, 255, 0.75)',
          fontSize: '0.78rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
        }}
      >
        <span>Scroll to explore</span>
        <div
          style={{
            animation: 'bounce-arrow 1.8s infinite ease-in-out',
            color: '#789A98',
          }}
        >
          <ChevronDown size={20} strokeWidth={2.5} />
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes bounce-arrow {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
