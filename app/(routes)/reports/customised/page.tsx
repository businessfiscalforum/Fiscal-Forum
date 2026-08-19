// app/(routes)/reports/customised/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import "./customised.css";

export default function CustomisedReportsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<number | "done">(1);
  const [wizardLoading, setWizardLoading] = useState(false);
  const [wizardMessage, setWizardMessage] = useState<string | null>(null);

  const [wizardAnswers, setWizardAnswers] = useState({
    capital: "",
    details: "",
    name: "",
    email: "",
    mobile: "",
  });

  const categories = [
    {
      id: "Mutual Fund",
      num: "01",
      title: "Mutual Fund",
      desc: "Explore mutual fund opportunities, categories, themes and market developments.",
      img: "/images/wizard_mutual_fund.png",
    },
    {
      id: "Stocks",
      num: "02",
      title: "Stocks",
      desc: "Track companies, valuations, results, watchlists and the stocks that matter to you.",
      img: "/images/wizard_stocks.png",
    },
    {
      id: "Credit Card",
      num: "03",
      title: "Credit Card",
      desc: "Best credit card recommendations tailored to your lifestyle.",
      img: "/images/wizard_credit_card.png",
    },
    {
      id: "Insurance",
      num: "04",
      title: "Insurance",
      desc: "Smart insurance recommendations for a secure future.",
      img: "/images/wizard_insurance.png",
    },
    {
      id: "Loans",
      num: "05",
      title: "Loans",
      desc: "Understand lending products, loan themes, rates and developments across the market.",
      img: "/images/wizard_loans.png",
    },
  ];

  const handleCardClick = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNextStep = () => {
    if (wizardStep === 1) setWizardStep(2);
    else if (wizardStep === 2) setWizardStep(3);
  };

  const handlePrevStep = () => {
    if (wizardStep === 2) setWizardStep(1);
    else if (wizardStep === 3) setWizardStep(2);
  };

  const handleWizardSubmit = async () => {
    setWizardLoading(true);
    setWizardMessage(null);

    const categoryList = selectedCategories.length > 0
      ? selectedCategories.join(", ")
      : "Customised Selection";

    let customDetails = `Categories: ${categoryList}\n`;
    customDetails += `Capital/Limit/Requirement: ₹${wizardAnswers.capital || "N/A"}\n`;
    customDetails += `Requirements Details: ${wizardAnswers.details || "None"}\n`;
    customDetails += `Email: ${wizardAnswers.email || "N/A"}\n`;

    const payload = {
      name: wizardAnswers.name,
      email: wizardAnswers.email,
      mobile: wizardAnswers.mobile,
      category: categoryList,
      capitalInvestBorrow: wizardAnswers.capital || null,
      addDetails: customDetails,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/custom-reports`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setWizardStep("done");
    } catch (err) {
      console.error("Failed to submit form:", err);
      setWizardMessage("❌ Failed to submit request. Please try again.");
    } finally {
      setWizardLoading(false);
    }
  };

  const handleCloseWizard = () => {
    setWizardOpen(false);
    setWizardStep(1);
    setWizardAnswers({
      capital: "",
      details: "",
      name: "",
      email: "",
      mobile: "",
    });
    setWizardMessage(null);
  };

  return (
    <div className="customised-page-container">
      <section className="hero">
        <div className="grid-field"></div>
        <div className="sunrise"></div>

        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow-row">
              <span className="pill accent"><span className="dot"></span>Custom Reports</span>
              <span className="pill">Built For You</span>
            </div>

            <h1 className="headline">Reports Built<br />Around <em>You.</em></h1>

            <p className="sub">Choose what matters to you — and get a market report focused only on your interests, portfolio and goals.</p>

            <div className="cta-row">
              <a href="#customise-section" className="cta">
                Build My Report
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8H14M14 8L9 3M14 8L9 13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <span className="cta-note"><span className="clock-dot"></span>Personalised in minutes</span>
            </div>
          </div>

          <div className="card-stage">
            <div className="report-card">
              <div className="badge-float">New</div>
              <div className="card-top">
                <span className="mono">Custom Report &nbsp;•&nbsp; Your Edition</span>
                <h2>Your Market:<br />What Matters to You</h2>
              </div>
              <div className="card-body">
                <div className="line">Choose your market interests</div>
                <div className="line">Select stocks, sectors & themes</div>
                <div className="line">Set your preferred report depth</div>
                <div className="line">Receive a focused market view</div>
              </div>
              <div className="card-foot">
                <span className="mono">Start Customising</span>
                <span className="arrow-badge">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8H14M14 8L9 3M14 8L9 13" stroke="#14432A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-cue">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 6L8 12L14 6" stroke="#101512" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      <section className="report-content" id="customise-section">
        <div className="section-wrap">
          <div className="section-kicker">Inside Customised Reports</div>

          <div className="section-heading">
            <h2>What can you <em>customise?</em></h2>
            <p>
              Build a report around the exact companies, sectors, themes and financial products
              you care about — without information you do not need.
            </p>
          </div>

          <div className="entity-grid">
            {categories.map((cat) => {
              const isSelected = selectedCategories.includes(cat.id);
              return (
                <article
                  key={cat.id}
                  className={`entity-card ${isSelected ? "selected" : ""}`}
                  tabIndex={0}
                  onClick={() => handleCardClick(cat.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(cat.id);
                    }
                  }}
                >
                  <div className="entity-image-wrap">
                    <img src={cat.img} alt={cat.title} className="entity-image" />
                    <span className="entity-number">{cat.num}</span>
                  </div>
                  <div className="entity-copy">
                    <h3>{cat.title}</h3>
                    <p>{cat.desc}</p>
                  </div>
                  <span className="entity-arrow">↗</span>
                </article>
              );
            })}
          </div>

          <div className="report-cta">
            <div>
              <h3>Your report. Your priorities. Your market.</h3>
              <p>Choose the inputs. We bring the relevant market story together.</p>
            </div>
            <button
              onClick={() => setWizardOpen(true)}
              className="cta"
              style={{ border: "none" }}
            >
              Create My Custom Report
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8H14M14 8L9 3M14 8L9 13" stroke="#14432A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Report Customiser Wizard Modal */}
      {wizardOpen && (
        <div className="wizard-modal-overlay">
          <div className="wizard-modal">
            <button className="wizard-modal-close" onClick={handleCloseWizard}>
              &times;
            </button>

            {/* STEP 1: Capital Size */}
            {wizardStep === 1 && (
              <div className="wizard-step active">
                <h3>What capital or budget details should we focus on?</h3>
                <p>Enter the approximate capital size, investment limit, or loan requirement.</p>
                <input
                  type="text"
                  placeholder="e.g. ₹5,00,000"
                  value={wizardAnswers.capital}
                  onChange={(e) =>
                    setWizardAnswers({ ...wizardAnswers, capital: e.target.value })
                  }
                  className="wizard-input-field"
                />
                <button className="wizard-btn" onClick={handleNextStep}>
                  Next step
                </button>
              </div>
            )}

            {/* STEP 2: Custom Details */}
            {wizardStep === 2 && (
              <div className="wizard-step active">
                <h3>Any specific requirements or interests?</h3>
                <p>Provide specific themes, stock names, or preferences you want analyzed.</p>
                <textarea
                  placeholder="e.g. Focus on high growth large caps and dividend payout stocks."
                  value={wizardAnswers.details}
                  onChange={(e) =>
                    setWizardAnswers({ ...wizardAnswers, details: e.target.value })
                  }
                  className="wizard-input-field"
                  style={{ minHeight: "100px", resize: "vertical" }}
                />
                <div style={{ display: "flex", gap: "16px" }}>
                  <button
                    className="wizard-btn"
                    onClick={handlePrevStep}
                    style={{ background: "var(--muted)" }}
                  >
                    Back
                  </button>
                  <button className="wizard-btn" onClick={handleNextStep}>
                    Next step
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Personal & Contact Info */}
            {wizardStep === 3 && (
              <div className="wizard-step active">
                <h3>Submit your custom request</h3>
                <p>We need your contact information to send you the custom report.</p>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={wizardAnswers.name}
                  onChange={(e) =>
                    setWizardAnswers({ ...wizardAnswers, name: e.target.value })
                  }
                  className="wizard-input-field"
                  style={{ marginBottom: "12px" }}
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={wizardAnswers.email}
                  onChange={(e) =>
                    setWizardAnswers({ ...wizardAnswers, email: e.target.value })
                  }
                  className="wizard-input-field"
                  style={{ marginBottom: "12px" }}
                />

                <input
                  type="tel"
                  placeholder="WhatsApp Mobile Number"
                  value={wizardAnswers.mobile}
                  onChange={(e) =>
                    setWizardAnswers({ ...wizardAnswers, mobile: e.target.value })
                  }
                  className="wizard-input-field"
                  style={{ marginBottom: "20px" }}
                />

                {wizardMessage && (
                  <div style={{ color: "#B3432B", fontSize: "14px", marginBottom: "16px", fontWeight: "bold" }}>
                    {wizardMessage}
                  </div>
                )}

                <div style={{ display: "flex", gap: "16px" }}>
                  <button
                    className="wizard-btn"
                    onClick={handlePrevStep}
                    style={{ background: "var(--muted)" }}
                    disabled={wizardLoading}
                  >
                    Back
                  </button>
                  <button
                    className="wizard-btn"
                    onClick={handleWizardSubmit}
                    disabled={wizardLoading}
                  >
                    {wizardLoading ? "Submitting..." : "Submit Request"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: SUCCESS PANEL */}
            {wizardStep === "done" && (
              <div className="wizard-step active">
                <h3>Thanks — your custom request is in!</h3>
                <p>We are processing your details and will send your customized report on your WhatsApp number shortly.</p>
                <button className="wizard-btn" onClick={handleCloseWizard}>
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
