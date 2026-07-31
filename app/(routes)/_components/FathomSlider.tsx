"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./fathom.css";

const SLIDES_DATA = [
  { id: 0, label: "Report" },
  { id: 1, label: "Mutual Funds" },
  { id: 2, label: "Stocks" },
  { id: 3, label: "Credit Cards" },
  { id: 4, label: "Insurance" },
];

export default function FathomSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [autoplayActive, setAutoplayActive] = useState(true);
  const [closingVisible, setClosingVisible] = useState(false);

  // Report image tilt styles
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({
    transform: "rotate(-1.2deg)",
  });

  const viewportRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Detect Reduced Motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // 2. Set introDone class on Slide 0 (Report) after POP sequence (5.2s)
  useEffect(() => {
    if (currentIndex === 0 && !introDone) {
      const delay = reduceMotion ? 0 : 5200;
      const timer = setTimeout(() => {
        setIntroDone(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, introDone, reduceMotion]);

  // 3. Autoplay engine
  useEffect(() => {
    if (!autoplayActive) return;
    const delay = currentIndex === 0 && !reduceMotion ? 5200 : 3000;
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % SLIDES_DATA.length;
      goTo(nextIndex);
    }, delay);
    return () => clearTimeout(timer);
  }, [currentIndex, autoplayActive, reduceMotion]);

  // 4. Keyboard Esc key listener for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 5. Scroll tracking to sync dots & arrows
  const handleScroll = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const slideWidth = viewport.clientWidth;
      if (slideWidth === 0) return;
      const index = Math.round(viewport.scrollLeft / slideWidth);
      if (index !== currentIndex && index >= 0 && index < SLIDES_DATA.length) {
        setCurrentIndex(index);
      }
    }, 80);
  };

  // 6. Keyboard navigation (ArrowLeft & ArrowRight) inside viewport
  const handleViewportKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(currentIndex + 1);
      restartAutoplay();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(currentIndex - 1);
      restartAutoplay();
    }
  };

  // 7. Sync slider position on resize
  useEffect(() => {
    const handleResize = () => {
      goTo(currentIndex);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  // 8. Intersection Observer for closing section CTA reveal
  useEffect(() => {
    if (reduceMotion) {
      setClosingVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setClosingVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    const element = closingRef.current;
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [reduceMotion]);

  // 9. Visibility change listener to pause autoplay when tab hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setAutoplayActive(false);
      } else {
        setAutoplayActive(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const goTo = (index: number) => {
    const nextIdx = Math.max(0, Math.min(SLIDES_DATA.length - 1, index));
    const viewport = viewportRef.current;
    if (!viewport) return;
    const slideWidth = viewport.clientWidth;
    viewport.scrollTo({
      left: nextIdx * slideWidth,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setCurrentIndex(nextIdx);
  };

  const restartAutoplay = () => {
    setAutoplayActive(false);
    // Use short timeout to trigger autoplay state back on next tick
    setTimeout(() => {
      setAutoplayActive(true);
    }, 50);
  };

  // Lightbox functions
  const openLightbox = () => {
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "";
  };

  // Report Image Mouse Interaction (Tilt)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotY = px * 14;
    const rotX = py * -14;
    setTiltStyle({
      transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`,
    });
  };

  const handleMouseLeave = () => {
    if (reduceMotion) return;
    setTiltStyle({
      transform: "rotate(-1.2deg)",
    });
  };

  const handleMouseEnter = () => {
    if (reduceMotion) return;
    setTiltStyle((prev) => ({
      ...prev,
      transition: "box-shadow 0.3s ease",
    }));
  };

  return (
    <div className="fathom-layout">
      <div className="ledger-bg" aria-hidden="true"></div>

      <main>
        {/* ============ SLIDER: REPORT -> PRODUCTS ============ */}
        <section
          className="slider-section"
          id="slider"
          onFocus={() => setAutoplayActive(false)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setAutoplayActive(true);
            }
          }}
          onTouchStart={() => setAutoplayActive(false)}
          onTouchEnd={restartAutoplay}
        >
          <button
            className="slider-arrow slider-arrow--prev"
            id="prevBtn"
            aria-label="Previous slide"
            disabled={currentIndex === 0}
            onClick={() => {
              goTo(currentIndex - 1);
              restartAutoplay();
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="slider-arrow slider-arrow--next"
            id="nextBtn"
            aria-label="Next slide"
            disabled={currentIndex === SLIDES_DATA.length - 1}
            onClick={() => {
              goTo(currentIndex + 1);
              restartAutoplay();
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className="slider-viewport"
            id="sliderViewport"
            ref={viewportRef}
            onScroll={handleScroll}
            onKeyDown={handleViewportKeyDown}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Your report and matching products"
          >
            <div className="slider-track" id="sliderTrack">
              {/* SLIDE 1 — REPORT */}
              <div
                className={`slide slide--report ${currentIndex === 0 ? "is-active" : ""} ${
                  introDone ? "intro-done" : ""
                }`}
                data-label="Report"
              >
                <div className="slide__inner slide__inner--report">
                  <div
                    className="report-image-wrap"
                    id="reportImageWrap"
                    tabIndex={0}
                    role="button"
                    aria-label="Research report — expand to view larger"
                    style={tiltStyle}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
                    onClick={openLightbox}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openLightbox();
                      }
                    }}
                  >
                    <Image
                      className="report-image"
                      src="/fathom/research-report.png"
                      alt="Sample equity research report from Fiscal Forum, showing report highlights and key financial ratios including ROE, NIM, cost-to-income ratio, and capital adequacy ratio."
                      width={420}
                      height={580}
                      priority
                    />

                    <span className="report-image-wrap__expand" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path
                          d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  <div className="advisor-figure">
                    <Image
                      className="advisor-figure__img"
                      src="/fathom/advisor-cutout.png"
                      alt="An advisor in a suit, pointing toward the highlighted takeaway."
                      width={280}
                      height={480}
                      priority
                    />
                  </div>

                  <div className="slide__side">
                    <p className="callout-words">
                      <span className="word-pop" style={{ "--i": 0 } as React.CSSProperties}>
                        Unlock
                      </span>
                      <span className="word-pop" style={{ "--i": 1 } as React.CSSProperties}>
                        institutional-quality
                      </span>
                      <span className="word-pop" style={{ "--i": 2 } as React.CSSProperties}>
                        research
                      </span>
                      <span className="word-pop" style={{ "--i": 3 } as React.CSSProperties}>
                        at
                      </span>
                      <span className="word-pop" style={{ "--i": 4 } as React.CSSProperties}>
                        your
                      </span>
                      <span className="word-pop" style={{ "--i": 5 } as React.CSSProperties}>
                        fingertips
                      </span>
                    </p>
                    <div className="callout-lines">
                      <p
                        className="line-pop line-pop--right"
                        style={{ "--i": 0 } as React.CSSProperties}
                      >
                        We don&apos;t limit to Research,
                      </p>
                      <p
                        className="line-pop line-pop--left"
                        style={{ "--i": 1 } as React.CSSProperties}
                      >
                        we help you park your money
                      </p>
                      <p
                        className="line-pop line-pop--right"
                        style={{ "--i": 2 } as React.CSSProperties}
                      >
                        in right assets according to
                      </p>
                      <p
                        className="line-pop line-pop--left"
                        style={{ "--i": 3 } as React.CSSProperties}
                      >
                        your needs.
                      </p>
                    </div>
                    <p className="report-cta__prompt">Want your market research report?</p>
                    <Link href="/reports" className="btn btn--yellow report-cta__btn">
                      CLICK HERE<span className="btn__arrow">→</span>
                    </Link>
                    <p className="slide__hint">
                      Swipe or use the arrows to see what to do about it{" "}
                      <span className="slide__hint-arrow">→</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* SLIDE 2 — MUTUAL FUNDS */}
              <div
                className={`slide slide--fund ${currentIndex === 1 ? "is-active" : ""}`}
                data-label="Mutual Funds"
              >
                <div className="slide__inner slide__inner--fund">
                  <div className="fund-col fund-col--left">
                    <div className="slide__side">
                      <h2 className="slide__title">Mutual Funds</h2>
                      <p className="slide__desc">
                        Turn disciplined investing into lasting wealth with expertly selected mutual funds in top AMCs.
                      </p>
                    </div>

                    <div className="fund-amc">
                      <p className="fund-amc__label">
                        On the FISCAL FORUM mutual fund website, we help you compare and invest across India&apos;s leading AMCs
                      </p>
                      <div
                        className="product-image-card fund-amc__card"
                        style={{ "--card-rot": "0.6deg", "--accent": "var(--emerald)" } as React.CSSProperties}
                      >
                        <Image
                          className="product-image"
                          src="/fathom/mutual-fund-amcs.png"
                          alt="Top mutual fund AMCs in India..."
                          width={380}
                          height={200}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="fund-recommend">
                    <div
                      className="product-image-card fund-recommend__card"
                      style={{ "--card-rot": "-0.6deg", "--accent": "var(--emerald)" } as React.CSSProperties}
                    >
                      <Image
                        className="product-image"
                        src="/fathom/fund-recommendations.png"
                        alt="Harsh's Top Fund Recommendations..."
                        width={340}
                        height={400}
                      />
                    </div>
                    <p className="fund-recommend__prompt">Want recommendations like these?</p>
                    <Link href="/services/mutual-funds" className="btn btn--yellow">
                      CLICK HERE<span className="btn__arrow">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* SLIDE 3 — STOCKS */}
              <div
                className={`slide slide--stocks ${currentIndex === 2 ? "is-active" : ""}`}
                data-label="Stocks"
              >
                <div className="slide__inner slide__inner--stocks">
                  <div className="stock-col stock-col--left">
                    <div className="slide__side">
                      <h2 className="slide__title">Stocks</h2>
                      <p className="slide__desc">
                        Discover high-potential stocks backed by in-depth research and market insights. Invest with confidence, not speculation.
                      </p>
                    </div>

                    <div
                      className="slide__visual slide__visual--photo"
                      style={{ "--accent": "var(--gold)" } as React.CSSProperties}
                    >
                      <div className="product-image-card" style={{ "--card-rot": "1.2deg" } as React.CSSProperties}>
                        <Image
                          className="product-image"
                          src="/fathom/stocks-bull.png"
                          alt="Stocks bull statue..."
                          width={300}
                          height={220}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="stock-recommend">
                    <div
                      className="product-image-card stock-recommend__card"
                      style={{ "--card-rot": "-0.6deg", "--accent": "var(--gold)" } as React.CSSProperties}
                    >
                      <Image
                        className="product-image"
                        src="/fathom/stocks-recommend.png"
                        alt="Stocks breakdown..."
                        width={640}
                        height={420}
                      />
                    </div>
                    <p className="stock-recommend__prompt">Want recommendations like this?</p>
                    <Link href="/services/stock-investment" className="btn btn--yellow">
                      CLICK HERE<span className="btn__arrow">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* SLIDE 4 — CREDIT CARDS */}
              <div
                className={`slide slide--cards ${currentIndex === 3 ? "is-active" : ""}`}
                data-label="Credit Cards"
              >
                <div className="slide__inner slide__inner--cards">
                  <div className="card-col card-col--left">
                    <div className="slide__side">
                      <h2 className="slide__title">Credit Cards</h2>
                      <p className="slide__desc">
                        Unlock exclusive rewards, smarter spending, and greater financial flexibility. Find the right credit card tailored to your needs in minutes.
                      </p>
                    </div>

                    <div
                      className="slide__visual slide__visual--photo"
                      style={{ "--accent": "var(--steel)" } as React.CSSProperties}
                    >
                      <div
                        className="product-image-card product-image-card--tall"
                        style={{ "--card-rot": "-2deg" } as React.CSSProperties}
                      >
                        <Image
                          className="product-image"
                          src="/fathom/credit-card.png"
                          alt="Credit card gradient design..."
                          width={220}
                          height={300}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card-recommend">
                    <div
                      className="product-image-card card-recommend__card"
                      style={{ "--card-rot": "-0.6deg", "--accent": "var(--steel)" } as React.CSSProperties}
                    >
                      <Image
                        className="product-image"
                        src="/fathom/credit-cards-grid.png"
                        alt="Credit cards lineup..."
                        width={480}
                        height={340}
                      />
                    </div>
                    <p className="card-recommend__prompt">Want to save money using credit card?</p>
                    <Link href="/services/credit-card" className="btn btn--yellow">
                      CLICK HERE<span className="btn__arrow">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* SLIDE 5 — INSURANCE */}
              <div
                className={`slide slide--insurance ${currentIndex === 4 ? "is-active" : ""}`}
                data-label="Insurance"
              >
                <div className="slide__inner slide__inner--insurance">
                  <div className="insurance-col insurance-col--left">
                    <div className="slide__side">
                      <h2 className="slide__title">Insurance</h2>
                      <p className="slide__desc">
                        Life is unpredictable, but your financial future doesn&apos;t have to be. Find the right insurance plan for every stage of life.
                      </p>
                    </div>

                    <div
                      className="slide__visual slide__visual--photo"
                      style={{ "--accent": "var(--rose)" } as React.CSSProperties}
                    >
                      <div className="product-image-card" style={{ "--card-rot": "1.6deg" } as React.CSSProperties}>
                        <Image
                          className="product-image"
                          src="/fathom/insurance-family.png"
                          alt="Insurance family..."
                          width={300}
                          height={220}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="insurance-recommend">
                    <div
                      className="product-image-card insurance-recommend__card"
                      style={{ "--card-rot": "-0.6deg", "--accent": "var(--rose)" } as React.CSSProperties}
                    >
                      <Image
                        className="product-image"
                        src="/fathom/insurance-recommend.png"
                        alt="Insurance types..."
                        width={480}
                        height={340}
                      />
                    </div>
                    <p className="insurance-recommend__prompt">
                      Don&apos;t want to risk your family life and your belongings?
                    </p>
                    <Link href="/services/insurance" className="btn btn--yellow">
                      CLICK HERE<span className="btn__arrow">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="slider-dots" id="sliderDots" role="tablist" aria-label="Choose a slide">
            {SLIDES_DATA.map((slide) => (
              <button
                key={slide.id}
                className={`slider-dot ${currentIndex === slide.id ? "is-active" : ""}`}
                role="tab"
                aria-label={`Go to ${slide.label} slide`}
                onClick={() => {
                  goTo(slide.id);
                  restartAutoplay();
                }}
              >
                <span className="slider-dot__bead"></span>
                <span>{slide.label}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

        {/* ============ CLOSING CTA ============ */}
        <section
          className={`closing ${closingVisible ? "is-visible" : ""}`}
          id="closing"
          ref={closingRef}
        >
          <div className="closing__inner">
            <div className="closing__visual">
              <Image
                className="closing__image"
                src="/fathom/research-reports.png"
                alt="Research reports lineup..."
                width={420}
                height={320}
              />
            </div>
            <div className="closing__content">
              <h2 className="closing__title">
                <span className="closing__line closing__line--1">
                  Everything you need to invest smarter, all in one place.
                </span>
                <span className="closing__line closing__line--2">
                  Get actionable market insights, in-depth research, and reports personalized to your investment goals.
                </span>
              </h2>
              <Link href="/reports" className="btn btn--primary btn--large closing__btn">
                CLICK HERE<span className="btn__arrow">→</span>
              </Link>
              <p className="closing__note">To get your research backed reports ...</p>
            </div>
          </div>
        </section>
      </main>

      <div
        className={`lightbox ${isLightboxOpen ? "is-open" : ""}`}
        id="reportLightbox"
        aria-hidden={!isLightboxOpen}
      >
        <div className="lightbox__backdrop" onClick={closeLightbox}></div>
        <div className="lightbox__stage">
          <button className="lightbox__close" id="lightboxClose" aria-label="Close enlarged report" onClick={closeLightbox}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <Image
            className="lightbox__img"
            src="/fathom/research-report.png"
            alt="Enlarged view of the Fiscal Forum equity research report."
            width={640}
            height={900}
          />
        </div>
      </div>
    </div>
  );
}
