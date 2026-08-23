// app/(routes)/reports/pre-market/page.tsx
import Link from "next/link";
import { db } from "../../../../config/db";
import { researchReportsTable } from "../../../../config/schema";
import { desc } from "drizzle-orm";
import { format } from "date-fns";
import "./premarket.css";

export const metadata = {
  title: "Before the Market Opens — Fiscal Forum",
  description: "Everything you need to know before you make your first move. Get your morning edge in the market with our Pre-Market Report.",
};

export default async function PreMarketLandingPage() {
  const reports = await db
    .select()
    .from(researchReportsTable)
    .orderBy(desc(researchReportsTable.publishDate));

  const preMarketReports = reports.filter(
    (report) =>
      (report.reportType || "").toLowerCase().replace(/ /g, "-") ===
      "pre-market-research-report"
  );

  return (
    <div
      className="premarket-page-container"
    >
      <section className="hero">
        <div className="grid-field"></div>
        <div className="sunrise"></div>
        


        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow-row">
              <span className="pill accent">
                <span className="dot"></span>Pre-Market
              </span>
              <span className="pill">Today</span>
            </div>

            <h1 className="headline">
              Before the<br />Market <em>Opens.</em>
            </h1>

            <p className="sub">
              Everything you need to know before you make your first move.
            </p>

            <div className="cta-row">
              <a href="#report-inside" className="cta">
                Read Report
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 8H14M14 8L9 3M14 8L9 13"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="card-stage">
            <div className="hero-img-wrap">
              <img src="/premarket-header.png" alt="Pre-Market Report Banner" className="hero-image" />
            </div>
          </div>
        </div>

        <div className="scroll-cue">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 6L8 12L14 6"
              stroke="#101512"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      <section className="report-content" id="report-inside">
        <div className="section-wrap">
          <div className="section-kicker">Inside the report</div>

          <div className="section-heading">
            <h2>What&apos;s inside our <em>pre-market report?</em></h2>
            <p>
              A focused morning read designed to help you understand the market story
              before the opening bell — without the noise.
            </p>
          </div>

          <div className="inside-grid">
            <div className="inside-card">
              <div className="icon-box">
                <svg viewBox="0 0 48 48" fill="none" strokeWidth="2">
                  <rect x="7" y="8" width="34" height="32" rx="2" />
                  <path d="M13 32l7-8 6 5 9-12" />
                  <path d="M31 17h4v4" />
                </svg>
              </div>
              <div className="inside-copy">
                <span className="num">01 / WATCHLIST</span>
                <h3>Stocks to Watch</h3>
                <p>Companies and developments that deserve attention before the market opens.</p>
              </div>
              <span className="card-arrow">↗</span>
            </div>

            <div className="inside-card">
              <div className="icon-box">
                <svg viewBox="0 0 48 48" fill="none" strokeWidth="2">
                  <rect x="6" y="8" width="36" height="30" rx="2" />
                  <path d="M12 31l7-7 5 4 8-11 5 4" />
                  <path d="M12 14h8" />
                </svg>
              </div>
              <div className="inside-copy">
                <span className="num">02 / BIG PICTURE</span>
                <h3>Market Summary</h3>
                <p>The key overnight developments and the broader story shaping the morning.</p>
              </div>
              <span className="card-arrow">↗</span>
            </div>

            <div className="inside-card">
              <div className="icon-box">
                <svg viewBox="0 0 48 48" fill="none" strokeWidth="2">
                  <path d="M14 20h20v20H14z" />
                  <path d="M18 20v-5a6 6 0 0 1 12 0v5" />
                  <path d="M20 27h8M20 32h6" />
                </svg>
              </div>
              <div className="inside-copy">
                <span className="num">03 / PRIMARY MARKET</span>
                <h3>Current IPO</h3>
                <p>IPOs and primary-market activity investors should know about today.</p>
              </div>
              <span className="card-arrow">↗</span>
            </div>

            <div className="inside-card">
              <div className="icon-box">
                <svg viewBox="0 0 48 48" fill="none" strokeWidth="2">
                  <path d="M8 38V18l10-6v26" />
                  <path d="M18 38V9l10-5v34" />
                  <path d="M28 38V16l12-7v29" />
                  <path d="M6 38h36" />
                </svg>
              </div>
              <div className="inside-copy">
                <span className="num">04 / INDIA</span>
                <h3>Indian Market Snapshot</h3>
                <p>A concise view of the domestic setup and themes shaping the opening mood.</p>
              </div>
              <span className="card-arrow">↗</span>
            </div>

            <div className="inside-card">
              <div className="icon-box">
                <svg viewBox="0 0 48 48" fill="none" strokeWidth="2">
                  <circle cx="24" cy="24" r="16" />
                  <path d="M24 8v32M8 24h32" />
                  <path d="M14 14c5 4 15 4 20 0M14 34c5-4 15-4 20 0" />
                </svg>
              </div>
              <div className="inside-copy">
                <span className="num">05 / THEMES</span>
                <h3>Sectoral Overview</h3>
                <p>Which sectors are attracting attention and what is driving their stories.</p>
              </div>
              <span className="card-arrow">↗</span>
            </div>

            <div className="inside-card">
              <div className="icon-box">
                <svg viewBox="0 0 48 48" fill="none" strokeWidth="2">
                  <circle cx="24" cy="24" r="15" />
                  <path d="M9 24h30M24 9c5 5 7 10 7 15s-2 10-7 15M24 9c-5 5-7 10-7 15s2 10 7 15" />
                  <path d="M13 15h22M13 33h22" />
                </svg>
              </div>
              <div className="inside-copy">
                <span className="num">06 / GLOBAL CUES</span>
                <h3>Global Market Sentiment</h3>
                <p>International cues and overnight developments setting the tone for India.</p>
              </div>
              <span className="card-arrow">↗</span>
            </div>
          </div>



          <div className="report-cta">
            <div>
              <h3>Your morning market read starts here.</h3>
              <p>One report. Six essential perspectives. Zero unnecessary noise.</p>
            </div>
            <a href="#table" className="cta">
              Explore Today&apos;s Report
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 8H14M14 8L9 3M14 8L9 13"
                  stroke="#14432A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="clay-database-section" id="table">
        <div className="clay-heading-wrap">
          <h2 className="clay-title">Research Reports Database</h2>
          <p className="clay-subtitle">Explore full institutional-grade analysis from our research desk.</p>
        </div>

        <div className="clay-table-container">
          <div className="clay-table-header">
            <div>Report Info</div>
            <div>Date</div>
            <div style={{ textAlign: "center" }}>Action</div>
          </div>

          {preMarketReports.length === 0 ? (
            <div style={{ padding: "48px", textAlign: "center", color: "var(--muted)", fontWeight: "bold" }}>
              No Pre-Market reports found.
            </div>
          ) : (
            preMarketReports.map((report) => {
              return (
                <div className="clay-table-row" key={report.id}>
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "16px", color: "var(--ink)", marginBottom: "6px" }}>
                      {report.title}
                    </div>
                    <div>
                      {(report.tags || []).map((tag, idx) => (
                        <span className="clay-tag" key={idx}>{tag}</span>
                      ))}
                      {report.reportType && <span className="clay-tag">{report.reportType}</span>}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--muted)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.6 }}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {report.publishDate ? format(new Date(report.publishDate), "MMM d, yyyy") : "N/A"}
                  </div>

                  <div style={{ textAlign: "center" }}>
                    {report.pdfUrl ? (
                      <a 
                        href={report.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="clay-btn"
                      >
                        View Report
                      </a>
                    ) : (
                      <span style={{ fontSize: "12px", color: "var(--muted)" }}>No PDF</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
