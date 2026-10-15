import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Globe,
  Building2,
  GraduationCap,
  FastForward,
  Play,
  Pause,
  Plane,
} from 'lucide-react';

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
          setCurrentProgress(prog);

          const vidDur = video?.duration || 23.0;
          targetTimeRef.current = Math.min(prog * vidDur, vidDur - 0.05);

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

  // Clickable Chapter Jumper
  const jumpToChapter = (chapterIndex: number) => {
    const targetProg =
      chapterIndex === 0 ? 0.05 : chapterIndex === 1 ? 0.35 : chapterIndex === 2 ? 0.65 : 0.9;
    if (scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const scrollPos = st.start + targetProg * (st.end - st.start);
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    } else {
      setActiveChapter(chapterIndex);
      if (videoRef.current) {
        const vidDur = videoRef.current.duration || 23.0;
        videoRef.current.currentTime = targetProg * vidDur;
      }
    }
  };

  // Interactive timeline scrub click
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = Math.max(0, Math.min(1, clickX / rect.width));
    if (scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const scrollPos = st.start + progress * (st.end - st.start);
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  };

  // Toggle manual video play
  const togglePlayManual = () => {
    if (!videoRef.current) return;
    if (isPlayingManual) {
      videoRef.current.pause();
      setIsPlayingManual(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlayingManual(true))
        .catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const chapters = [
    {
      id: 0,
      title: 'Global Horizons',
      subtitle: 'Earth & Global Scope',
      icon: Globe,
      time: '0s - 5s',
      badge: '45+ Countries Mapped',
    },
    {
      id: 1,
      title: 'Destination Mapping',
      subtitle: 'Flight Corridors & Hubs',
      icon: Plane,
      time: '5s - 12s',
      badge: 'UK • Canada • Australia',
    },
    {
      id: 2,
      title: 'Campus Discovery',
      subtitle: 'Modern Academic Quad',
      icon: Building2,
      time: '12s - 18s',
      badge: 'World-Class Infrastructure',
    },
    {
      id: 3,
      title: 'Student Community',
      subtitle: 'Campus Arrival & Integration',
      icon: GraduationCap,
      time: '18s - 23s',
      badge: 'Global Scholar Network',
    },
  ];

  const currentSeconds = currentProgress * duration;

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
      {/* 1. CINEMATIC VIDEO / POSTER MEDIA LAYER (100% BRIGHT & VIVID) */}
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
            opacity: videoLoaded ? 1 : 0.9,
            filter: 'brightness(1.14) contrast(1.05) saturate(1.14)',
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

        {/* Subtle radial ambient light behind the card to create depth without darkening the video */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(120, 154, 152, 0.16) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Ultra-subtle left edge gradient only */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(20, 34, 53, 0.22) 0%, transparent 40%)',
          }}
        />

        {/* Bottom subtle edge blend */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '60px',
            background: 'linear-gradient(to top, rgba(20, 34, 53, 0.25) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* 2. DYNAMIC FLOATING CONTEXT BADGE OVER VIDEO (TOP-RIGHT) */}
      <div
        className="scene-context-badge"
        style={{
          position: 'absolute',
          top: '5.5rem',
          right: '2.5rem',
          zIndex: 15,
          backgroundColor: 'rgba(20, 34, 53, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '16px',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'rgba(120, 154, 152, 0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#789A98',
            flexShrink: 0,
          }}
        >
          {React.createElement(chapters[activeChapter].icon, { size: 20, strokeWidth: 2 })}
        </div>
        <div>
          <div
            style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#789A98',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#789A98',
                display: 'inline-block',
                animation: 'pulse-dot 2s infinite ease-in-out',
              }}
            />
            <span>Scene 0{activeChapter + 1} of 04</span>
          </div>
          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>
            {chapters[activeChapter].title}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(231, 235, 237, 0.75)' }}>
            {chapters[activeChapter].badge}
          </div>
        </div>
      </div>

      {/* 3. FOREGROUND CONTENT & EDITORIAL GLASS CONSOLE */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '4.5rem',
          paddingBottom: '5rem',
        }}
      >
        <div
          className="hero-glass-card"
          style={{
            maxWidth: '640px',
            backgroundColor: 'rgba(20, 34, 53, 0.65)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '24px',
            padding: '2.5rem 2.5rem 2.25rem 2.5rem',
            boxShadow: '0 30px 70px -15px rgba(10, 20, 35, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Live Status Indicator Bar */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              backgroundColor: 'rgba(120, 154, 152, 0.16)',
              border: '1px solid rgba(120, 154, 152, 0.35)',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '1.4rem',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#52b788',
                boxShadow: '0 0 10px #52b788',
                animation: 'pulse-dot 2s infinite',
              }}
            />
            <span style={{ color: '#94b5b3', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Advisory Intake 2026 / 2027
            </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>•</span>
            <span style={{ color: '#ffffff' }}>Impartial Guidance</span>
          </div>

          {/* DYNAMIC SCENE NARRATIVE HEADLINE */}
          {activeChapter === 0 && (
            <div className="fade-in-content">
              <h1
                style={{
                  fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  marginBottom: '1.25rem',
                }}
              >
                Your Journey <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 40%, #94b5b3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Starts Here.
                </span>
              </h1>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                  color: 'rgba(231, 235, 237, 0.92)',
                  lineHeight: 1.65,
                  marginBottom: '2rem',
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
                  fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  marginBottom: '1.25rem',
                }}
              >
                Explore Global <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 40%, #94b5b3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Destinations.
                </span>
              </h1>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                  color: 'rgba(231, 235, 237, 0.92)',
                  lineHeight: 1.65,
                  marginBottom: '2rem',
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
                  fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  marginBottom: '1.25rem',
                }}
              >
                Discover Modern <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 40%, #94b5b3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Campus Life.
                </span>
              </h1>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                  color: 'rgba(231, 235, 237, 0.92)',
                  lineHeight: 1.65,
                  marginBottom: '2rem',
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
                  fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  marginBottom: '1.25rem',
                }}
              >
                Step Into <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 40%, #94b5b3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Your Future.
                </span>
              </h1>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                  color: 'rgba(231, 235, 237, 0.92)',
                  lineHeight: 1.65,
                  marginBottom: '2rem',
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
              marginBottom: '2rem',
            }}
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenConsultation}
              style={{
                padding: '0.9rem 2rem',
                fontSize: '0.98rem',
                fontWeight: 700,
                boxShadow: '0 8px 24px rgba(120, 154, 152, 0.35)',
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
                fontSize: '0.98rem',
              }}
            >
              <span>Explore Destinations</span>
            </button>
          </div>

          {/* Reassurance Metrics Pill Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                150+
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(231, 235, 237, 0.7)', marginTop: '4px' }}>
                Top Global Universities
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#94b5b3', lineHeight: 1 }}>
                98%
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(231, 235, 237, 0.7)', marginTop: '4px' }}>
                Offer Recommendation
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                $0
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(231, 235, 237, 0.7)', marginTop: '4px' }}>
                Placement Fees Charged
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM FLOATING CINEMATIC SCRUB CONTROLLER & HUD */}
      <div
        className="hero-timeline-hud"
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          left: '1.5rem',
          right: '1.5rem',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          backgroundColor: 'rgba(20, 34, 53, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '16px',
          padding: '0.75rem 1.25rem',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* Interactive Chapter Selector Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {chapters.map((chap, idx) => (
            <button
              key={chap.id}
              type="button"
              onClick={() => jumpToChapter(idx)}
              title={`Jump to Scene 0${idx + 1}: ${chap.title}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                backgroundColor:
                  activeChapter === idx ? 'rgba(120, 154, 152, 0.35)' : 'rgba(255, 255, 255, 0.06)',
                border:
                  activeChapter === idx
                    ? '1px solid rgba(120, 154, 152, 0.7)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                color: activeChapter === idx ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <span>0{idx + 1}</span>
              <span className="chapter-label">{chap.title}</span>
            </button>
          ))}
        </div>

        {/* Interactive Scrub Track & Telemetry Time */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.9rem',
            flexGrow: 1,
            maxWidth: '420px',
            margin: '0 0.5rem',
          }}
          className="scrub-track-wrapper"
        >
          <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.8)' }}>
            {formatTime(currentSeconds)}
          </span>

          <div
            onClick={handleTimelineClick}
            title="Click along track to scrub video"
            style={{
              flexGrow: 1,
              height: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.16)',
              borderRadius: '9999px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${Math.round(currentProgress * 100)}%`,
                height: '100%',
                backgroundColor: '#789A98',
                borderRadius: '9999px',
                transition: 'width 0.1s linear',
              }}
            />
          </div>

          <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.5)' }}>
            {formatTime(duration)}
          </span>
        </div>

        {/* Quick controls: Skip intro & Manual playback */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={togglePlayManual}
            title="Toggle playback"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '0.4rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            {isPlayingManual ? <Pause size={14} /> : <Play size={14} />}
            <span className="control-label">{isPlayingManual ? 'Pause' : 'Play'}</span>
          </button>

          <button
            type="button"
            onClick={scrollToDestinations}
            title="Skip directly to content"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.7)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.78rem',
              cursor: 'pointer',
              padding: '0.4rem 0.6rem',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)')}
          >
            <FastForward size={14} />
            <span className="control-label">Skip Intro</span>
          </button>
        </div>
      </div>

      {/* Styles & Animation Helpers */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
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

        @media (max-width: 992px) {
          .scene-context-badge {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .hero-timeline-hud {
            bottom: 0.75rem !important;
            left: 0.75rem !important;
            right: 0.75rem !important;
            padding: 0.5rem 0.75rem !important;
          }
          .chapter-label, .control-label {
            display: none !important;
          }
          .scrub-track-wrapper {
            max-width: 160px !important;
          }
        }

        @media (max-width: 640px) {
          .hero-glass-card {
            padding: 1.5rem !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </div>
  );
};
