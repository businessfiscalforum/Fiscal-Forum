// app/(routes)/reports/weekly/page.tsx
import { db } from "../../../../config/db";
import { researchReportsTable, SelectResearchReport } from "../../../../config/schema";
import { desc } from "drizzle-orm";
import { format } from "date-fns";
import "./weekly.css";

export const metadata = {
  title: "The Week in Markets — Fiscal Forum",
  description: "One clear view of what moved markets, why it mattered, and what to watch next.",
};

export default async function WeeklyReportsPage() {
  let reports: SelectResearchReport[] = [];
  try {
    if (process.env.DATABASE_URL || process.env.NEON_DATABASE_URL) {
      reports = await db
        .select()
        .from(researchReportsTable)
        .orderBy(desc(researchReportsTable.publishDate));
    }
  } catch (error) {
    console.error("Failed to fetch weekly reports from DB:", error);
  }

  const weeklyReports = reports.filter(
    (report) =>
      (report.reportType || "").toLowerCase().replace(/ /g, "-") ===
      "weekly-research-report"
  );

  return (
    <div className="weekly-page-container">
      <section className="hero">
        <div className="grid-field"></div>
        <div className="sunrise"></div>
        
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow-row">
              <span className="pill accent"><span className="dot"></span>Weekly Report</span>
              <span className="pill">This Week</span>
            </div>

            <h1 className="headline">Make Sense of<br />the <em>Week.</em></h1>

            <p className="sub">One clear view of what moved markets, why it mattered, and what to watch next.</p>

            <div className="cta-row">
              <a href="#table" className="cta">
                Read Weekly Report
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8H14M14 8L9 3M14 8L9 13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <span className="cta-note mono"><span className="clock-dot"></span>Weekly edition {"\u2022"} Friday close</span>
            </div>
          </div>

          <div className="card-stage">
            <div className="hero-img-wrap">
              <img 
                src="/weekly-header.jpg" 
                alt="Weekly Market Report Banner" 
                className="hero-image"
              />
            </div>
          </div>
        </div>

        <div className="scroll-cue">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 6L8 12L14 6" stroke="#101512" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      <section className="report-content" id="report-inside">
        <div className="section-wrap">
          <div className="section-kicker">Inside the report</div>

          <div className="section-heading">
            <h2>What&apos;s inside our <em>weekly report?</em></h2>
            <p>
              A focused morning read designed to help you understand the market story
              before the opening bell — without the noise.
            </p>
          </div>

          <div className="inside-grid">
            <article className="inside-card">
              <div className="icon-box">
                <svg viewBox="0 0 48 48" fill="none" strokeWidth="2">
                  <rect x="10" y="7" width="28" height="34" rx="2" />
                  <path d="M16 13h16M16 20h11" />
                  <path d="M16 34V27M22 34V23M28 34V29M34 34V18" />
                  <path d="M14 7v-3M34 7v-3" />
                </svg>
              </div>
              <div className="inside-copy">
                <span className="num">01 / INDIA</span>
                <h3>Weekly Market Snapshot</h3>
                <p>A concise view of how Indian markets performed across the week and what shaped the trend.</p>
              </div>
              <span className="card-arrow">↗</span>
            </article>

            <article className="inside-card">
              <div className="icon-box">
                <svg viewBox="0 0 48 48" fill="none" strokeWidth="2">
                  <circle cx="24" cy="24" r="15" />
                  <path d="M9 24h30M24 9c5 5 7 10 7 15s-2 10-7 15M24 9c-5 5-7 10-7 15s2 10 7 15" />
                  <path d="M13 15h22M13 33h22" />
                  <path d="M29 13l5 2-2 5" />
                </svg>
              </div>
              <div className="inside-copy">
                <span className="num">02 / GLOBAL</span>
                <h3>Global Performance</h3>
                <p>Track major global indices, international markets and overseas cues influencing India.</p>
              </div>
              <span className="card-arrow">↗</span>
            </article>

            <article className="inside-card">
              <div className="icon-box">
                <svg viewBox="0 0 48 48" fill="none" strokeWidth="2">
                  <path d="M8 34h32" />
                  <path d="M12 31V18h12v13M27 31V13h9v18" />
                  <ellipse cx="18" cy="18" rx="6" ry="3" />
                  <path d="M12 18v6c0 2 12 2 12 0v-6" />
                  <path d="M27 20h9M27 25h9" />
                </svg>
              </div>
              <div className="inside-copy">
                <span className="num">03 / ASSET CLASS</span>
                <h3>Commodities</h3>
                <p>Key movements in gold, crude, metals and other commodities shaping market sentiment.</p>
              </div>
              <span className="card-arrow">↗</span>
            </article>

            <article className="inside-card">
              <div className="icon-box">
                <svg viewBox="0 0 48 48" fill="none" strokeWidth="2">
                  <rect x="8" y="10" width="26" height="30" rx="2" />
                  <path d="M14 16h14M14 22h14M14 28h10" />
                  <path d="M30 30c3-5 8-5 10 0M31 34h8" />
                  <path d="M35 14v8" />
                </svg>
              </div>
              <div className="inside-copy">
                <span className="num">04 / NEWS</span>
                <h3>Top News of the Week</h3>
                <p>The most market-relevant business, economic and corporate developments of the week.</p>
              </div>
              <span className="card-arrow">↗</span>
            </article>

            <article className="inside-card">
              <div className="icon-box">
                <svg viewBox="0 0 48 48" fill="none" strokeWidth="2">
                  <circle cx="16" cy="19" r="7" />
                  <circle cx="32" cy="29" r="7" />
                  <path d="M11 24l-3 6 8 4 4-7" />
                  <path d="M37 24l3-6-8-4-4 7" />
                  <path d="M14 19h4M30 29h4" />
                </svg>
              </div>
              <div className="inside-copy">
                <span className="num">05 / FLOWS</span>
                <h3>FIIs &amp; DIIs Activity</h3>
                <p>Understand institutional buying and selling flows and their impact on Indian markets.</p>
              </div>
              <span className="card-arrow">↗</span>
            </article>

            <article className="inside-card">
              <div className="icon-box">
                <svg viewBox="0 0 48 48" fill="none" strokeWidth="2">
                  <rect x="10" y="9" width="28" height="30" rx="2" />
                  <path d="M16 15h16M16 22h16M16 29h9" />
                  <path d="M29 34h10M34 29v10" />
                  <path d="M15 9v-3M33 9v-3" />
                </svg>
              </div>
              <div className="inside-copy">
                <span className="num">06 / CALENDAR</span>
                <h3>Upcoming Events</h3>
                <p>Important economic, corporate, policy and market events to watch in the week ahead.</p>
              </div>
              <span className="card-arrow">↗</span>
            </article>

            <article className="inside-card">
              <div className="icon-box">
                <svg viewBox="0 0 48 48" fill="none" strokeWidth="2">
                  <circle cx="21" cy="21" r="10" />
                  <path d="M28.5 28.5L38 38" />
                  <path d="M16 24l4-5 3 3 6-8" />
                  <path d="M27 14h4v4" />
                </svg>
              </div>
              <div className="inside-copy">
                <span className="num">07 / STOCKS</span>
                <h3>Stocks in Focus</h3>
                <p>Selected companies worth watching based on performance, developments and upcoming catalysts.</p>
              </div>
              <span className="card-arrow">↗</span>
            </article>
          </div>

          <div className="report-cta">
            <div>
              <h3>Your weekly market read starts here.</h3>
              <p>One report. Six essential perspectives. Zero unnecessary noise.</p>
            </div>
            <a href="#table" className="cta">
              Explore This Week&apos;s Report
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8H14M14 8L9 3M14 8L9 13" stroke="#14432A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

          {weeklyReports.length === 0 ? (
            <div style={{ padding: "48px", textAlign: "center", color: "var(--muted)", fontWeight: "bold" }}>
              No Weekly reports found.
            </div>
          ) : (
            weeklyReports.map((report) => {
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
