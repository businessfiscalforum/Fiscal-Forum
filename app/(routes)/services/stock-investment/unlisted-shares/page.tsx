"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./UnlistedShares.module.css";

const journeyNodes = [
  { label: "Idea", isHero: false, isGold: false },
  { label: "Startup", isHero: false, isGold: false },
  { label: "Seed Funding", isHero: false, isGold: false },
  { label: "Series A", isHero: false, isGold: false },
  { label: "Series B", isHero: false, isGold: false },
  { label: "Series C", isHero: false, isGold: false },
  { label: "UNLISTED\nSHARE", isHero: true, isGold: false },
  { label: "IPO", isHero: false, isGold: true },
  { label: "NSE", isHero: false, isGold: false },
  { label: "BSE", isHero: false, isGold: false },
];

export default function UnlistedSharesPage() {
  const router = useRouter();
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const travelArrowRef = useRef<HTMLSpanElement>(null);
  const travelLineRef = useRef<HTMLSpanElement>(null);

  // 1. Reveal-on-scroll IntersectionObserver
  useEffect(() => {
    const revealEls = document.querySelectorAll(`.${styles.reveal}`);
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["in-view"]);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
    return () => {
      revealObserver.disconnect();
    };
  }, []);

  // 2. Journey horizontal track scroll & animation behavior
  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    const travelArrow = travelArrowRef.current;
    const travelLine = travelLineRef.current;

    if (!track) return;

    // Size rail
    const journeyRail = track.querySelector(`.${styles["journey-rail"]}`) as HTMLElement;
    const sizeRail = () => {
      if (journeyRail) {
        journeyRail.style.width = Math.max(track.scrollWidth - 40, 0) + "px";
      }
    };
    sizeRail();
    window.addEventListener("resize", sizeRail);

    // Update progress
    const updateProgress = () => {
      const max = track.scrollWidth - track.clientWidth;
      const pct = max > 0 ? (track.scrollLeft / max) * 100 : 0;
      if (fill) fill.style.width = pct + "%";
      if (travelArrow) travelArrow.style.left = pct + "%";
      if (travelLine) travelLine.style.width = pct + "%";
    };
    updateProgress();
    track.addEventListener("scroll", updateProgress, { passive: true });

    // Reveal individual nodes in viewport
    const nodes = track.querySelectorAll(`.${styles["j-node"]}`);
    const nodeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["in-view"]);
          }
        });
      },
      { root: track, threshold: 0.6 }
    );
    nodes.forEach((n) => nodeObserver.observe(n));

    // Auto-scroll loop
    let autoScrollPaused = false;
    let sectionInView = false;
    const autoScrollSpeed = 2.2;

    const journeyCard = track.closest(`.${styles["journey-card"]}`) || track;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionInView = entry.isIntersecting;
        });
      },
      { threshold: 0.3 }
    );
    visibilityObserver.observe(journeyCard);

    let animationFrameId: number;
    const runAutoScroll = () => {
      if (!autoScrollPaused && sectionInView) {
        const max = track.scrollWidth - track.clientWidth;
        if (max > 0) {
          if (track.scrollLeft >= max - autoScrollSpeed) {
            track.scrollLeft = 0;
          } else {
            track.scrollLeft += autoScrollSpeed;
          }
        }
      }
      animationFrameId = requestAnimationFrame(runAutoScroll);
    };
    animationFrameId = requestAnimationFrame(runAutoScroll);

    const pauseScroll = () => {
      autoScrollPaused = true;
    };
    const resumeScroll = () => {
      setTimeout(() => {
        autoScrollPaused = false;
      }, 1200);
    };

    track.addEventListener("touchstart", pauseScroll, { passive: true });
    track.addEventListener("touchend", resumeScroll, { passive: true });

    // Drag scroll behavior
    let isDown = false;
    let startX: number;
    let scrollLeftStart: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      autoScrollPaused = true;
      track.style.cursor = "grabbing";
      startX = e.pageX - track.offsetLeft;
      scrollLeftStart = track.scrollLeft;
    };

    const onMouseLeaveOrUp = () => {
      if (isDown) {
        isDown = false;
        setTimeout(() => {
          autoScrollPaused = false;
        }, 800);
      }
      track.style.cursor = "grab";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.2;
      track.scrollLeft = scrollLeftStart - walk;
    };

    track.addEventListener("mousedown", onMouseDown);
    track.addEventListener("mouseleave", onMouseLeaveOrUp);
    track.addEventListener("mouseup", onMouseLeaveOrUp);
    track.addEventListener("mousemove", onMouseMove);

    // Mouse wheel scroll translation
    let wheelResumeTimer: NodeJS.Timeout;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        track.scrollLeft += e.deltaY;
        autoScrollPaused = true;
        clearTimeout(wheelResumeTimer);
        wheelResumeTimer = setTimeout(() => {
          autoScrollPaused = false;
        }, 1200);
        e.preventDefault();
      }
    };
    track.addEventListener("wheel", onWheel, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener("resize", sizeRail);
      track.removeEventListener("scroll", updateProgress);
      nodeObserver.disconnect();
      visibilityObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      track.removeEventListener("touchstart", pauseScroll);
      track.removeEventListener("touchend", resumeScroll);
      track.removeEventListener("mousedown", onMouseDown);
      track.removeEventListener("mouseleave", onMouseLeaveOrUp);
      track.removeEventListener("mouseup", onMouseLeaveOrUp);
      track.removeEventListener("mousemove", onMouseMove);
      track.removeEventListener("wheel", onWheel);
    };
  }, []);

  // 3. Smooth scroll mapping for sub-navigation anchors
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const navElement = document.querySelector(`.${styles.nav}`) as HTMLElement;
      const navHeight = navElement ? navElement.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.unlistedPage}>
      <div className="pt-24 pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">

        </div>

        <div className={styles["page-frame"]}>
          {/* Sub Navigation */}
          <nav className={styles.nav}>
            <div className={styles["nav-inner"]}>
              <a
                href="#top"
                onClick={(e) => handleAnchorClick(e, "top")}
                className={styles.brand}
              >
                UN<span className={styles["brand-slash"]}>/</span>LISTED
              </a>
              <div className={styles["nav-links"]}>
                <a href="#basics" onClick={(e) => handleAnchorClick(e, "basics")}>
                  The Basics
                </a>
                <a href="#journey" onClick={(e) => handleAnchorClick(e, "journey")}>
                  Company Journey
                </a>
                <a href="#why" onClick={(e) => handleAnchorClick(e, "why")}>
                  Why Invest
                </a>
              </div>
            </div>
          </nav>

          {/* Marquee Ticker */}
          <div className={styles.ticker}>
            <div className={styles["ticker-track"]}>
              <span>SEBI-ALIGNED INFORMATION ONLY</span>
              <span>•</span>
              <span>UNLISTED = PRE-IPO OWNERSHIP</span>
              <span>•</span>
              <span>NOT TRADED ON NSE / BSE</span>
              <span>•</span>
              <span>LOWER LIQUIDITY, HIGHER DILIGENCE</span>
              <span>•</span>
              <span>SEBI-ALIGNED INFORMATION ONLY</span>
              <span>•</span>
              <span>UNLISTED = PRE-IPO OWNERSHIP</span>
              <span>•</span>
              <span>NOT TRADED ON NSE / BSE</span>
              <span>•</span>
              <span>LOWER LIQUIDITY, HIGHER DILIGENCE</span>
              <span>•</span>
            </div>
          </div>

          {/* Hero Section */}
          <section className={styles.hero} id="top">
            <div className={styles["hero-inner"]}>
              <div className={styles["hero-left"]} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span className={`${styles.badge} ${styles.reveal}`}>
                  PRE-IPO INVESTING, EXPLAINED
                </span>
                <h1 className={styles.reveal} style={{ textAlign: "center" }}>
                  Invest Before
                  <br />
                  the IPO Happens.
                </h1>
                <p className={`${styles["hero-sub"]} ${styles.reveal}`} style={{ textAlign: "center", marginBottom: "20px" }}>
                  Own shares of companies before they become publicly listed.
                </p>
                <div className={`${styles["hero-buttons"]} ${styles.reveal}`} style={{ justifyContent: "center", marginBottom: "8px" }}>
                  <a
                    href="#basics"
                    onClick={(e) => handleAnchorClick(e, "basics")}
                    className={`${styles.btn} ${styles["btn-outline"]}`}
                  >
                    How It Works <span className={styles["arrow-down"]}>↓</span>
                  </a>
                </div>
                <p className={`${styles["hero-tagline"]} ${styles.reveal}`} style={{ textAlign: "center", marginTop: "8px" }}>
                  Access high-growth companies before they become publicly traded...
                </p>
              </div>

              <div className={styles["hero-right"]}>
                <div className={`${styles.card} ${styles["hero-visual"]} ${styles.reveal}`} id="ladder">
                  <span className={`${styles.badge} ${styles["hero-visual-badge"]}`}>
                    THE ROAD TO IPO
                  </span>
                  <Image
                    className={styles["hero-visual-img"]}
                    src="/unlisted-hero-visual.webp"
                    alt="Illustrated winding path showing a company's journey from seed stage and startup growth, through the unlisted share stage, up to becoming listed at IPO"
                    width={440}
                    height={440}
                    priority
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Basics Section */}
          <section className={styles.basics} id="basics">
            <div className={styles["section-head"]}>
              <span className={`${styles.badge} ${styles.reveal}`}>
                THE FUNDAMENTALS
              </span>
              <h2 className={styles.reveal}>What Exactly Is an Unlisted Share?</h2>
              <p className={`${styles["section-sub"]} ${styles.reveal}`}>
                A real equity stake in a company that simply hasn&apos;t listed on an exchange yet.
                <br />
                <br />
                When a company is <strong>unlisted</strong>, its shares still exist and still change
                hands — just not on the NSE or BSE. Buying one gets you the same underlying ownership a
                public shareholder has: a claim on the business, voting rights, dividend eligibility if
                declared, and upside if the company grows. What&apos;s different is entirely in <em>how</em>{" "}
                that ownership gets priced, found, and transferred, not what it represents.
              </p>
            </div>

            <div className={styles.flow}>
              <div className={`${styles.card} ${styles["flow-card"]} ${styles.reveal} ${styles["from-right"]}`}>
                <span className={`${styles.badge} ${styles["badge-sm"]}`}>STAGE 01</span>
                <h3>Private Company</h3>
                <div className={styles["card-divider"]}></div>
                <p className={styles["card-meta"]}>Not traded on NSE / BSE</p>
              </div>

              <div className={`${styles["flow-arrow"]} ${styles.reveal}`}>↓</div>

              <div className={`${styles.card} ${styles["flow-card"]} ${styles["holders-card"]} ${styles.reveal} ${styles["from-left"]}`}>
                <span className={`${styles.badge} ${styles["badge-sm"]}`}>STAGE 02</span>
                <h3>Held Privately By</h3>
                <div className={styles["card-divider"]}></div>
                <div className={styles["holder-grid"]}>
                  <span>Employees</span>
                  <span>Early Investors</span>
                  <span>VCs</span>
                  <span>Promoters</span>
                </div>
              </div>

              <div className={`${styles["flow-arrow"]} ${styles.reveal}`}>↓</div>

              <div className={`${styles.card} ${styles["flow-card"]} ${styles["locked-card"]} ${styles.reveal} ${styles["from-right"]}`}>
                <span className={`${styles.badge} ${styles["badge-sm"]} ${styles["badge-dark"]}`}>
                  STAGE 03
                </span>
                <h3>Public</h3>
                <div className={`${styles["card-divider"]} ${styles["card-divider-dark"]}`}></div>
                <p className={`${styles["card-meta"]} ${styles["card-meta-dark"]}`}>
                  <span className={styles["lock-icon"]}>🔒</span> Cannot Buy Normally
                </p>
              </div>
            </div>

            <div className={styles["section-divider"]}></div>

            <div className={styles["fact-head"]}>
              <span className={`${styles.badge} ${styles["badge-sm"]} ${styles.reveal}`}>
                THE FINE PRINT
              </span>
              <h3 className={styles.reveal}>What Actually Changes When a Share Isn&apos;t Listed</h3>
            </div>

            <div className={styles["fact-grid"]}>
              <div className={`${styles.card} ${styles["fact-card"]} ${styles.reveal} ${styles["from-left"]}`}>

                <h4>Liquidity</h4>
                <div className={styles["card-divider"]}></div>
                <p className={styles["card-meta"]}>
                  No exchange order book. Trades are matched off-market, peer-to-peer, so exiting a
                  position can take days, not seconds.
                </p>
              </div>
              <div className={`${styles.card} ${styles["fact-card"]} ${styles.reveal} ${styles["from-left"]}`}>

                <h4>Price Discovery</h4>
                <div className={styles["card-divider"]}></div>
                <p className={styles["card-meta"]}>
                  No live ticker. Price is set by recent private deals and demand, so valuations move
                  on far fewer data points.
                </p>
              </div>
              <div className={`${styles.card} ${styles["fact-card"]} ${styles.reveal} ${styles["from-right"]}`}>

                <h4>Minimum Investment</h4>
                <div className={styles["card-divider"]}></div>
                <p className={styles["card-meta"]}>
                  Usually sold in board lots rather than single shares, with entry size set by
                  whoever&apos;s holding the stock.
                </p>
              </div>
              <div className={`${styles.card} ${styles["fact-card"]} ${styles.reveal} ${styles["from-right"]}`}>

                <h4>Settlement</h4>
                <div className={styles["card-divider"]}></div>
                <p className={styles["card-meta"]}>
                  Ownership moves through an off-market transfer into your demat account — the same
                  depository system used for listed stock.
                </p>
              </div>
            </div>
          </section>

          {/* Journey Section */}
          <section className={styles.journey} id="journey">
            <div className={styles["section-head"]}>
              <span className={`${styles.badge} ${styles.reveal}`}>THE TIMELINE</span>
              <h2 className={styles.reveal}>Company Life Journey</h2>
              <p className={`${styles["section-sub"]} ${styles.reveal}`}>
                Scroll sideways. Every stage earns its place in line.
              </p>
            </div>

            <div className={`${styles.card} ${styles["journey-card"]} ${styles.reveal}`}>
              <div className={styles["journey-progress"]}>
                <div ref={fillRef} className={styles["journey-progress-fill"]}></div>
              </div>

              <div ref={trackRef} className={styles["journey-track"]}>
                <div className={styles["journey-rail"]}>
                  <span ref={travelLineRef} className={styles["j-travel-line"]}></span>
                  <span ref={travelArrowRef} className={styles["j-travel-arrow"]}>
                    ➤
                  </span>
                </div>

                {journeyNodes.map((node, index) => (
                  <div key={index} className="flex items-center gap-6">
                    <div
                      className={`${styles["j-node"]} ${
                        node.isHero ? styles["j-node-hero"] : ""
                      } ${node.isGold ? styles["j-node-gold"] : ""}`}
                      data-i={index}
                    >
                      <span
                        className={`${styles["j-dot"]} ${
                          node.isHero ? styles["j-dot-hero"] : ""
                        } ${node.isGold ? styles["j-dot-gold"] : ""}`}
                      ></span>
                      <span
                        className={`${styles["j-label"]} ${
                          node.isHero ? styles["j-label-hero"] : ""
                        }`}
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {node.label}
                      </span>
                    </div>
                    {index < journeyNodes.length - 1 && (
                      <div className={styles["j-arrow"]}>→</div>
                    )}
                  </div>
                ))}
              </div>
              <p className={styles["journey-hint"]}>← drag to scroll, or use your trackpad →</p>
            </div>
          </section>

          {/* Why Invest Section */}
          <section className={styles.why} id="why">
            <div className={styles["section-head"]}>
              <span className={`${styles.badge} ${styles.reveal}`}>THE CASE FOR IT</span>
              <h2 className={styles.reveal}>Why Investors Buy Unlisted Shares</h2>
            </div>

            <div className={styles["why-grid"]}>
              <div className={`${styles.card} ${styles["why-card"]} ${styles["wc-1"]} ${styles.reveal} ${styles["from-left"]}`}>
                <span className={`${styles.badge} ${styles["badge-sm"]}`}>REASON 01</span>
                <div className={styles["why-card-head"]}>
                  <div className={styles["why-visual"]}>
                    <Image
                      className={styles["why-img"]}
                      src="/why-returns.png"
                      alt="Potential High Returns illustration"
                      width={96}
                      height={96}
                    />
                  </div>
                  <h3>Potential High Returns</h3>
                </div>
                <div className={styles["card-divider"]}></div>
                <p className={styles["card-meta"]}>Invest before the IPO happens</p>
              </div>

              <div className={`${styles.card} ${styles["why-card"]} ${styles["wc-2"]} ${styles.reveal} ${styles["from-right"]}`}>
                <span className={`${styles.badge} ${styles["badge-sm"]}`}>REASON 02</span>
                <div className={styles["why-card-head"]}>
                  <div className={styles["why-visual"]}>
                    <Image
                      className={styles["why-img"]}
                      src="/why-diversification.png"
                      alt="Portfolio Diversification illustration"
                      width={96}
                      height={96}
                    />
                  </div>
                  <h3>Portfolio Diversification</h3>
                </div>
                <div className={styles["card-divider"]}></div>
                <p className={styles["card-meta"]}>Beyond listed equities and bonds</p>
              </div>

              <div className={`${styles.card} ${styles["why-card"]} ${styles["wc-3"]} ${styles.reveal} ${styles["from-left"]}`}>
                <span className={`${styles.badge} ${styles["badge-sm"]}`}>REASON 03</span>
                <div className={styles["why-card-head"]}>
                  <div className={styles["why-visual"]}>
                    <Image
                      className={styles["why-img"]}
                      src="/why-future.png"
                      alt="Access to Future Giants illustration"
                      width={96}
                      height={96}
                    />
                  </div>
                  <h3>Access to Future Giants</h3>
                </div>
                <div className={styles["card-divider"]}></div>
                <p className={styles["card-meta"]}>Companies not yet on any exchange</p>
              </div>

              <div className={`${styles.card} ${styles["why-card"]} ${styles["wc-4"]} ${styles.reveal} ${styles["from-right"]}`}>
                <span className={`${styles.badge} ${styles["badge-sm"]}`}>REASON 04</span>
                <div className={styles["why-card-head"]}>
                  <div className={styles["why-visual"]}>
                    <Image
                      className={styles["why-img"]}
                      src="/why-ownership.png"
                      alt="Early Ownership illustration"
                      width={96}
                      height={96}
                    />
                  </div>
                  <h3>Early Ownership</h3>
                </div>
                <div className={styles["card-divider"]}></div>
                <p className={styles["card-meta"]}>A seat at the table, ahead of listing day</p>
              </div>
            </div>
          </section>

          {/* Dynamic Call to Action Funnel */}
          <section className="bg-white py-12 px-6 border-t border-[#111315] text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-extrabold text-[#111315] font-['Space_Grotesk'] uppercase">
                Ready to Own Tomorrow&apos;s Giants, Today?
              </h2>
              <p className="text-[#5B6B7C] text-lg font-medium">
                Open your Demat account with us to start navigating pre-IPO deals and unlisted share opportunities safely.
              </p>
              <button
                onClick={() => router.push("/services/stock-investment/open-demat-account")}
                className={`${styles.btn} ${styles["btn-large"]} ${styles["btn-primary"]} mt-4`}
              >
                Open Demat Account
              </button>
            </div>
          </section>

          {/* Footer Disclaimer */}
          <footer className={styles.footer}>
            <div className={styles["footer-inner"]}>
              <span className={`${styles.brand} ${styles["brand-small"]}`}>
                UN<span className={styles["brand-slash"]}>/</span>LISTED
              </span>
              <p className={styles["footer-disclaimer"]}>
                Unlisted shares carry lower liquidity, wider price spreads, and limited public
                disclosure. This page is educational and is not investment advice. Always do
                independent diligence before buying pre-IPO shares. · A Fiscal Forum property
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}