import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Compass, Globe, Building2, GraduationCap, FastForward, Play, Pause } from 'lucide-react';

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
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isPlayingManual, setIsPlayingManual] = useState(false);

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
            // fastSeek if available, else currentTime
            if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
              (video as any).fastSeek(targetTimeRef.current);
            } else {
              video.currentTime = targetTimeRef.current;
            }
          } catch {
            // fallback safe
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

  // Setup GSAP ScrollTrigger for video scrubbing
  useEffect(() => {
    if (isReducedMotion) {
      // In reduced motion, we do not pin or scrub
      return;
    }

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) return;

    // Start RAF loop for smooth seeking
    startRafLoop();

    // Determine scroll distance: ~3000px on desktop, ~1800px on mobile
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
          setCurrentProgress(prog);

          // Update target video time
          const vidDur = video?.duration || 23.0;
          targetTimeRef.current = Math.min(prog * vidDur, vidDur - 0.05);

          // Update narrative chapter
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

  // Toggle manual video play for reduced motion or users who wish to preview
  const togglePlayManual = () => {
    if (!videoRef.current) return;
    if (isPlayingManual) {
      videoRef.current.pause();
      setIsPlayingManual(false);
    } else {
      videoRef.current.play().then(() => setIsPlayingManual(true)).catch(() => {});
    }
  };

  const chapters = [
    {
      id: 0,
      title: 'Global Horizons',
      subtitle: 'Earth & Global Perspective',
      icon: Globe,
      time: '0s - 5s',
    },
    {
      id: 1,
      title: 'Destination Mapping',
      subtitle: 'Routes & Pinpoint Locations',
      icon: Compass,
      time: '5s - 12s',
    },
    {
      id: 2,
      title: 'Campus Discovery',
      subtitle: 'Modern University Architecture',
      icon: Building2,
      time: '12s - 18s',
    },
    {
      id: 3,
      title: 'Student Journey',
      subtitle: 'Arrival & Academic Life',
      icon: GraduationCap,
      time: '18s - 23s',
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
      {/* 1. CINEMATIC VIDEO / POSTER MEDIA LAYER */}
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
            objectPosition: 'center right',
            opacity: videoLoaded ? 1 : 0.85,
            transition: 'opacity 0.6s ease',
          }}
          aria-hidden="true"
        />

        {/* Fallback poster image if video fails or is loading */}
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

        {/* Cinematic low-distraction navy gradient overlay:
            Dense on left for crisp typography, subtle on right to preserve the video's Earth, routes and campus */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(90deg, rgba(20, 34, 53, 0.95) 0%, rgba(20, 34, 53, 0.78) 38%, rgba(20, 34, 53, 0.35) 72%, rgba(20, 34, 53, 0.45) 100%)',
          }}
        />

        {/* Bottom subtle blend into content */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '120px',
            background: 'linear-gradient(to top, rgba(20, 34, 53, 0.9) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* 2. FOREGROUND CONTENT & INTERACTIVE CONTROLS */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '5rem',
          paddingBottom: '3.5rem',
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          {/* Narrative journey chapter pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: 'rgba(120, 154, 152, 0.16)',
              border: '1px solid rgba(120, 154, 152, 0.35)',
              padding: '0.4rem 0.95rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#94b5b3',
              marginBottom: '1.5rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            {React.createElement(chapters[activeChapter].icon, { size: 16, strokeWidth: 2.2 })}
            <span style={{ color: '#ffffff' }}>Chapter 0{activeChapter + 1}:</span>
            <span>{chapters[activeChapter].title}</span>
          </div>

          {/* DYNAMIC SCENE NARRATIVE: Smooth transition of text based on video scene */}
          {activeChapter === 0 && (
            <div className="fade-in-content">
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5.2vw, 4.2rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  marginBottom: '1.4rem',
                }}
              >
                Your Journey <br />
                <span
                  style={{
                    color: '#789A98',
                    textDecoration: 'none',
                    position: 'relative',
                  }}
                >
                  Starts Here.
                </span>
              </h1>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                  color: 'rgba(231, 235, 237, 0.9)',
                  lineHeight: 1.65,
                  marginBottom: '2.5rem',
                  maxWidth: '540px',
                }}
              >
                Expert guidance to help you find the right destination, university and pathway to your future.
              </p>
            </div>
          )}

          {activeChapter === 1 && (
            <div className="fade-in-content">
              <h1
                style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.18,
                  letterSpacing: '-0.03em',
                  marginBottom: '1.4rem',
                }}
              >
                Explore Global <br />
                <span style={{ color: '#789A98' }}>Destinations.</span>
              </h1>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                  color: 'rgba(231, 235, 237, 0.9)',
                  lineHeight: 1.65,
                  marginBottom: '2.5rem',
                  maxWidth: '540px',
                }}
              >
                Connecting ambitious students with top accredited institutions across the UK, Canada, and Australia.
              </p>
            </div>
          )}

          {activeChapter === 2 && (
            <div className="fade-in-content">
              <h1
                style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.18,
                  letterSpacing: '-0.03em',
                  marginBottom: '1.4rem',
                }}
              >
                Discover Modern <br />
                <span style={{ color: '#789A98' }}>Campus Life.</span>
              </h1>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                  color: 'rgba(231, 235, 237, 0.9)',
                  lineHeight: 1.65,
                  marginBottom: '2.5rem',
                  maxWidth: '540px',
                }}
              >
                Experience learning environments that foster innovation, academic excellence, and personal growth.
              </p>
            </div>
          )}

          {activeChapter === 3 && (
            <div className="fade-in-content">
              <h1
                style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.18,
                  letterSpacing: '-0.03em',
                  marginBottom: '1.4rem',
                }}
              >
                Step Into <br />
                <span style={{ color: '#789A98' }}>Your Future.</span>
              </h1>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                  color: 'rgba(231, 235, 237, 0.9)',
                  lineHeight: 1.65,
                  marginBottom: '2.5rem',
                  maxWidth: '540px',
                }}
              >
                Comprehensive advisory support from initial consultation to campus arrival and visa guidance.
              </p>
            </div>
          )}

          {/* Primary & Secondary Call to Actions */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              marginBottom: '2.5rem',
            }}
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenConsultation}
              style={{
                padding: '0.9rem 2rem',
                fontSize: '1rem',
                fontWeight: 700,
                boxShadow: '0 8px 24px rgba(120, 154, 152, 0.3)',
              }}
            >
              <span>Book a Free Consultation</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={scrollToDestinations}
              style={{
                padding: '0.9rem 1.8rem',
                fontSize: '1rem',
              }}
            >
              <span>Explore Destinations</span>
            </button>
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.8rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '0.85rem',
              color: 'rgba(231, 235, 237, 0.75)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#789A98' }} />
              <span>100% Impartial Guidance</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#789A98' }} />
              <span>Certified Advisors</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#789A98' }} />
              <span>Zero Placement Fees</span>
            </div>
          </div>
        </div>

        {/* 3. CINEMATIC TIMELINE SCRUB BAR (UNDERSTATED) */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '1.5rem',
            right: '1.5rem',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Narrative chapters progress indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="timeline-stepper">
            {chapters.map((chap, idx) => (
              <div
                key={chap.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  backgroundColor:
                    activeChapter === idx ? 'rgba(120, 154, 152, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border:
                    activeChapter === idx
                      ? '1px solid rgba(120, 154, 152, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                  color: activeChapter === idx ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                }}
              >
                <span>0{idx + 1}</span>
                <span className="chapter-label" style={{ display: activeChapter === idx ? 'inline' : 'none' }}>
                  {chap.title}
                </span>
              </div>
            ))}

            {/* Quick skip to content button */}
            <button
              type="button"
              onClick={scrollToDestinations}
              title="Skip cinematic intro to content"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.5)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.78rem',
                cursor: 'pointer',
                padding: '0.4rem 0.6rem',
                marginLeft: '0.5rem',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)')}
            >
              <FastForward size={14} />
              <span>Skip Intro</span>
            </button>

            {/* Visual scrub bar */}
            <div
              style={{
                width: '100px',
                height: '3px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '2px',
                overflow: 'hidden',
                marginLeft: '0.5rem',
              }}
              title={`Cinematic progress: ${Math.round(currentProgress * 100)}%`}
            >
              <div
                style={{
                  width: `${Math.round(currentProgress * 100)}%`,
                  height: '100%',
                  backgroundColor: '#789A98',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
          </div>

          {/* Understated scroll indicator */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.78rem',
              letterSpacing: '0.05em',
            }}
          >
            <span>Scroll to explore</span>
            <div
              style={{
                width: '20px',
                height: '32px',
                borderRadius: '12px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '6px',
              }}
            >
              <div
                style={{
                  width: '3px',
                  height: '6px',
                  backgroundColor: '#789A98',
                  borderRadius: '2px',
                  animation: 'mouse-scroll 1.6s infinite ease-in-out',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reduced motion or manual playback fallback controller */}
      {isReducedMotion && (
        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 30,
            background: 'rgba(20, 34, 53, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '9999px',
            padding: '0.4rem 0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.78rem',
          }}
        >
          <button
            type="button"
            onClick={togglePlayManual}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            {isPlayingManual ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlayingManual ? 'Pause Background' : 'Play Background'}</span>
          </button>
        </div>
      )}

      {/* Animations & CSS helper */}
      <style>{`
        @keyframes mouse-scroll {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.4; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .fade-in-content {
          animation: textFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes textFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .timeline-stepper {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
