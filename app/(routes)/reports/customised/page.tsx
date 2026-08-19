// app/(routes)/reports/customised/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import "./customised.css";

const insuranceCoverMap: Record<string, { id: string; label: string; placeholder: string }> = {
  'Employer health insurance': { id: 'insCoverEmployerHealth', label: 'Employer Health Cover (₹)', placeholder: 'e.g. 300000' },
  'Personal health insurance': { id: 'insCoverPersonalHealth', label: 'Health Insurance Cover (₹)', placeholder: 'e.g. 500000' },
  'Family floater': { id: 'insCoverFamilyFloater', label: 'Family Floater Cover (₹)', placeholder: 'e.g. 1000000' },
  'Term life insurance': { id: 'insCoverTermLife', label: 'Term Insurance Cover (₹)', placeholder: 'e.g. 5000000' },
  'Personal accident insurance': { id: 'insCoverPersonalAccident', label: 'Personal Accident Cover (₹)', placeholder: 'e.g. 1000000' },
  'Critical illness cover': { id: 'insCoverCriticalIllness', label: 'Critical Illness Cover (₹)', placeholder: 'e.g. 1000000' },
  'Motor insurance': { id: 'insCoverMotor', label: 'Motor Insurance IDV (₹)', placeholder: 'e.g. 500000' }
};

export default function CustomisedReportsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardCategory, setWizardCategory] = useState<string>("");
  const [wizardStep, setWizardStep] = useState<number | "done">(1);
  const [wizardLoading, setWizardLoading] = useState(false);
  const [wizardMessage, setWizardMessage] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wizardAnswers, setWizardAnswers] = useState<Record<string, any>>({
    capital: "",
    details: "",
    name: "",
    email: "",
    mobile: "",
    // Category Specifics
    age: "30",
    stAge: "30",
    mfAge: "30",
    ccAge: "30",
    insAge: "30",
    loanAge: "30",
    occupation: "",
    mfOccupation: "",
    ccOccupation: "",
    monthlySavings: "",
    stMonthlySavings: "",
    mfMonthlySavings: "",
    insMonthlySavings: "",
    goal: "",
    stGoal: "",
    mfGoal: "",
    risk: "Medium",
    stRisk: "Medium",
    mfRisk: "Medium",
    preference: "SIP",
    mfPreference: "SIP",
    returnsExpectation: "",
    stReturns: "",
    investmentStyle: "",
    stStyle: "",
    annualIncome: "",
    insAnnualIncome: "",
    dependents: "",
    insDependents: "",
    maritalStatus: "Single",
    insMarital: "Single",
    existingInsurance: [] as string[],
    insExisting: [] as string[],
    insuranceCovers: {} as Record<string, string>,
    loansLiabilities: "",
    insLoansLiabilities: "",
    monthlySpending: "",
    ccMonthlySpending: "",
    spendingCategories: [] as string[],
    ccSpending: [] as string[],
    cardPreferences: [] as string[],
    flyFrequency: "Never",
    ccFlyFrequency: "Never",
    travelType: "Domestic",
    ccTravelType: "Domestic",
    loungeImportance: "3",
    ccLoungeImportance: "3",
    hotelFrequency: "Rarely",
    abroadSpend: "Never",
    feeComfort: "₹0 — Lifetime-free preferred",
    ccFee: "₹0 — Lifetime-free preferred",
    payHigherFee: "No",
    usageGoals: [] as string[],
    loanPurpose: "Home Purchase",
    loanEmployment: "Salaried",
    loanMonthlyIncome: "",
    loanIncomeStability: "Stable",
    loanEarningYears: "1–3 years",
    loanAmount: "500000",
    loanOwnContribution: "",
    loanHasCollateral: "No",
    loanCollateralType: "Property",
    loanHasCoApplicant: "No",
    loanCoApplicantRelation: "Spouse",
    loanKnowsScore: "No",
    loanScoreRange: "700–749",
    loanMissedEmi: "No",
    loanTenure: "Balanced EMI + tenure"
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

  const handleWizardOptionToggle = (key: string, value: string, isMulti = false, maxSelect = 99) => {
    if (isMulti) {
      const prev = (wizardAnswers[key] || []) as string[];
      if (prev.includes(value)) {
        setWizardAnswers({ ...wizardAnswers, [key]: prev.filter((v) => v !== value) });
      } else {
        if (prev.length < maxSelect) {
          setWizardAnswers({ ...wizardAnswers, [key]: [...prev, value] });
        }
      }
    } else {
      setWizardAnswers({ ...wizardAnswers, [key]: value });
    }
  };

  const handleInsuranceCoverInput = (coverName: string, amount: string) => {
    const prev = { ...(wizardAnswers.insuranceCovers || {}) };
    prev[coverName] = amount;
    setWizardAnswers({ ...wizardAnswers, insuranceCovers: prev });
  };

  const isStep1FormValid = () => {
    if (!wizardCategory) return false;

    const isMf = wizardCategory === "Mutual Fund";
    const isStocks = wizardCategory === "Stocks";
    const isCc = wizardCategory === "Credit Card";
    const isIns = wizardCategory === "Insurance";
    const isLoan = wizardCategory === "Loan" || wizardCategory === "Loans";

    if (isMf) {
      return (
        !!wizardAnswers.mfAge &&
        parseInt(wizardAnswers.mfAge) > 0 &&
        !!wizardAnswers.mfOccupation?.trim() &&
        !!wizardAnswers.mfMonthlySavings &&
        parseInt(wizardAnswers.mfMonthlySavings) > 0 &&
        !!wizardAnswers.mfGoal?.trim() &&
        !!wizardAnswers.mfRisk &&
        !!wizardAnswers.mfPreference
      );
    }

    if (isStocks) {
      return (
        !!wizardAnswers.stAge &&
        parseInt(wizardAnswers.stAge) > 0 &&
        !!wizardAnswers.stMonthlySavings &&
        parseInt(wizardAnswers.stMonthlySavings) > 0 &&
        !!wizardAnswers.stReturns?.trim() &&
        !!wizardAnswers.stGoal?.trim() &&
        !!wizardAnswers.stRisk &&
        !!wizardAnswers.stStyle?.trim()
      );
    }

    if (isCc) {
      const basicValid =
        !!wizardAnswers.ccAge &&
        parseInt(wizardAnswers.ccAge) > 0 &&
        !!wizardAnswers.ccMonthlySpending &&
        parseInt(wizardAnswers.ccMonthlySpending) > 0 &&
        !!wizardAnswers.ccOccupation?.trim() &&
        Array.isArray(wizardAnswers.ccSpending) &&
        wizardAnswers.ccSpending.length > 0 &&
        !!wizardAnswers.ccFee;

      if (!basicValid) return false;

      const hasTravelOrHotel =
        wizardAnswers.ccSpending.includes("Travel") ||
        wizardAnswers.ccSpending.includes("Hotels");
      if (hasTravelOrHotel) {
        return !!wizardAnswers.ccFlyFrequency && !!wizardAnswers.ccTravelType;
      }

      return true;
    }

    if (isIns) {
      const basicValid =
        !!wizardAnswers.insAnnualIncome &&
        parseInt(wizardAnswers.insAnnualIncome) > 0 &&
        !!wizardAnswers.insMonthlySavings &&
        parseInt(wizardAnswers.insMonthlySavings) > 0 &&
        !!wizardAnswers.insDependents &&
        parseInt(wizardAnswers.insDependents) >= 0 &&
        !!wizardAnswers.insMarital &&
        Array.isArray(wizardAnswers.insExisting) &&
        wizardAnswers.insExisting.length > 0 &&
        !!wizardAnswers.insLoansLiabilities?.trim();

      if (!basicValid) return false;

      const selectedCovers = wizardAnswers.insExisting || [];
      for (const cover of selectedCovers) {
        const amt = wizardAnswers.insuranceCovers?.[cover];
        if (!amt || parseInt(amt) <= 0) {
          return false;
        }
      }

      return true;
    }

    if (isLoan) {
      const basicValid =
        !!wizardAnswers.loanPurpose &&
        !!wizardAnswers.loanAge &&
        parseInt(wizardAnswers.loanAge) > 0 &&
        !!wizardAnswers.loanEmployment &&
        !!wizardAnswers.loanMonthlyIncome &&
        parseInt(wizardAnswers.loanMonthlyIncome) > 0 &&
        !!wizardAnswers.loanIncomeStability &&
        !!wizardAnswers.loanAmount &&
        parseInt(wizardAnswers.loanAmount) > 0 &&
        !!wizardAnswers.loanHasCollateral;

      if (!basicValid) return false;

      if (wizardAnswers.loanHasCollateral === "Yes") {
        return !!wizardAnswers.loanCollateralType;
      }

      return true;
    }

    return false;
  };

  const handleNextStep = () => {
    if (wizardStep === 1) setWizardStep(3);
    else if (wizardStep === 3) setWizardStep(4);
  };

  const handlePrevStep = () => {
    if (wizardStep === 3) setWizardStep(1);
    else if (wizardStep === 4) setWizardStep(3);
  };

  const handleWizardSubmit = async () => {
    setWizardLoading(true);
    setWizardMessage(null);

    const isCc = wizardCategory === 'Credit Card';
    const isLoan = wizardCategory === 'Loan' || wizardCategory === 'Loans';
    const isMf = wizardCategory === 'Mutual Fund';
    const isStocks = wizardCategory === 'Stocks';
    const isIns = wizardCategory === 'Insurance';

    let customDetails = `Category: ${wizardCategory}\n`;
    customDetails += `Capital/Limit/Requirement: ₹${wizardAnswers.capital || "N/A"}\n`;
    customDetails += `Requirements Details: ${wizardAnswers.details || "None"}\n`;
    customDetails += `Email: ${wizardAnswers.email || "N/A"}\n\n`;
    customDetails += `--- Personal Profile ---\n`;

    if (isMf || isStocks || isCc || isLoan) {
      customDetails += `Age: ${isLoan ? wizardAnswers.loanAge : (isCc ? wizardAnswers.ccAge : (isMf ? wizardAnswers.mfAge : wizardAnswers.stAge))}\n`;
    }
    if (isMf || isCc) {
      customDetails += `Occupation: ${isCc ? wizardAnswers.ccOccupation : wizardAnswers.mfOccupation}\n`;
    }
    if (isMf || isStocks || isIns) {
      customDetails += `Monthly Savings: ₹${isIns ? wizardAnswers.insMonthlySavings : (isMf ? wizardAnswers.mfMonthlySavings : wizardAnswers.stMonthlySavings)}\n`;
    }
    if (isMf || isStocks) {
      customDetails += `Goal: ${isMf ? wizardAnswers.mfGoal : wizardAnswers.stGoal}\n`;
      customDetails += `Risk Tolerance: ${isMf ? wizardAnswers.mfRisk : wizardAnswers.stRisk}\n`;
    }

    if (isMf) customDetails += `MF Preference: ${wizardAnswers.mfPreference}\n`;
    if (isStocks) {
      customDetails += `Expectations: ${wizardAnswers.stReturns}\n`;
      customDetails += `Investment Style: ${wizardAnswers.stStyle}\n`;
    }

    if (isIns) {
      customDetails += `Annual Income: ₹${wizardAnswers.insAnnualIncome}\n`;
      customDetails += `Dependents: ${wizardAnswers.insDependents}\n`;
      customDetails += `Marital Status: ${wizardAnswers.insMarital}\n`;
      customDetails += `Existing Insurance: ${(wizardAnswers.insExisting || []).join(", ") || "None"}\n`;
      customDetails += `Cover Amounts Details:\n`;
      Object.keys(wizardAnswers.insuranceCovers || {}).forEach(k => {
        customDetails += `- ${k}: ₹${wizardAnswers.insuranceCovers[k]}\n`;
      });
      customDetails += `Liabilities: ${wizardAnswers.insLoansLiabilities || "None"}\n`;
    }

    if (isCc) {
      customDetails += `Annual Salary: ₹${wizardAnswers.ccMonthlySpending}\n`;
      customDetails += `Major Categories: ${(wizardAnswers.ccSpending || []).join(", ") || "None"}\n`;
      customDetails += `Card Preferences: ${(wizardAnswers.cardPreferences || []).join(", ") || "None"}\n`;
      if ((wizardAnswers.ccSpending || []).includes("Travel") || (wizardAnswers.ccSpending || []).includes("Hotels")) {
        customDetails += `- Fly Frequency: ${wizardAnswers.ccFlyFrequency}\n`;
        customDetails += `- Travel Type: ${wizardAnswers.ccTravelType}\n`;
        customDetails += `- Lounge Importance: ${wizardAnswers.ccLoungeImportance}/5\n`;
      }
      customDetails += `Comfort Fee: ${wizardAnswers.ccFee}\n`;
    }

    if (isLoan) {
      customDetails += `Loan Purpose: ${wizardAnswers.loanPurpose}\n`;
      customDetails += `Employment: ${wizardAnswers.loanEmployment}\n`;
      customDetails += `Monthly Takehome: ₹${wizardAnswers.loanMonthlyIncome}\n`;
      customDetails += `Income Stability: ${wizardAnswers.loanIncomeStability}\n`;
      customDetails += `Required Loan Amt: ₹${wizardAnswers.loanAmount}\n`;
      customDetails += `Collateral Offered: ${wizardAnswers.loanHasCollateral === "Yes" ? wizardAnswers.loanCollateralType : "No"}\n`;
    }

    const payload = {
      name: wizardAnswers.name,
      email: wizardAnswers.email,
      mobile: wizardAnswers.mobile,
      category: wizardCategory,
      capitalInvestBorrow: wizardAnswers.capital || null,
      age: isLoan ? wizardAnswers.loanAge : (isCc ? wizardAnswers.ccAge : (isMf ? wizardAnswers.mfAge : (isStocks ? wizardAnswers.stAge : null))),
      occupation: isCc ? wizardAnswers.ccOccupation : (isMf ? wizardAnswers.mfOccupation : null),
      monthlySavings: isIns ? wizardAnswers.insMonthlySavings : (isMf ? wizardAnswers.mfMonthlySavings : (isStocks ? wizardAnswers.stMonthlySavings : null)),
      investmentGoal: isMf ? wizardAnswers.mfGoal : (isStocks ? wizardAnswers.stGoal : null),
      riskTolerance: isMf ? wizardAnswers.mfRisk : (isStocks ? wizardAnswers.stRisk : null),
      investmentStyle: isStocks ? wizardAnswers.stStyle : null,
      returnExpected: isStocks ? wizardAnswers.stReturns : null,
      addDetails: customDetails,
      investmentPreference: isMf ? wizardAnswers.mfPreference : null,
      annualIncome: isIns ? wizardAnswers.insAnnualIncome : null,
      dependents: isIns ? wizardAnswers.insDependents : null,
      maritalStatus: isIns ? wizardAnswers.insMarital : null,
      existingInsurance: isIns ? JSON.stringify(wizardAnswers.insExisting || []) : null,
      insuranceCovers: isIns ? JSON.stringify(wizardAnswers.insuranceCovers || {}) : null,
      loansLiabilities: isIns ? wizardAnswers.insLoansLiabilities : null,
      monthlySpending: isCc ? wizardAnswers.ccMonthlySpending : null,
      spendingCategories: isCc ? JSON.stringify(wizardAnswers.ccSpending || []) : null,
      flyFrequency: isCc ? wizardAnswers.ccFlyFrequency : null,
      travelType: isCc ? wizardAnswers.ccTravelType : null,
      loungeImportance: isCc ? wizardAnswers.ccLoungeImportance : null,
      feeComfort: isCc ? wizardAnswers.ccFee : null,
      loanPurpose: isLoan ? wizardAnswers.loanPurpose : null,
      loanEmployment: isLoan ? wizardAnswers.loanEmployment : null,
      loanMonthlyIncome: isLoan ? wizardAnswers.loanMonthlyIncome : null,
      loanIncomeStability: isLoan ? wizardAnswers.loanIncomeStability : null,
      loanAmount: isLoan ? wizardAnswers.loanAmount : null,
      loanHasCollateral: isLoan ? wizardAnswers.loanHasCollateral : null,
      loanCollateralType: isLoan ? (wizardAnswers.loanHasCollateral === "Yes" ? wizardAnswers.loanCollateralType : null) : null,
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
    setWizardCategory("");
    setWizardAnswers({
      capital: "",
      details: "",
      name: "",
      email: "",
      mobile: "",
      age: "30",
      stAge: "30",
      mfAge: "30",
      ccAge: "30",
      insAge: "30",
      loanAge: "30",
      occupation: "",
      mfOccupation: "",
      ccOccupation: "",
      monthlySavings: "",
      stMonthlySavings: "",
      mfMonthlySavings: "",
      insMonthlySavings: "",
      goal: "",
      stGoal: "",
      mfGoal: "",
      risk: "Medium",
      stRisk: "Medium",
      mfRisk: "Medium",
      preference: "SIP",
      mfPreference: "SIP",
      returnsExpectation: "",
      stReturns: "",
      investmentStyle: "",
      stStyle: "",
      annualIncome: "",
      insAnnualIncome: "",
      dependents: "",
      insDependents: "",
      maritalStatus: "Single",
      insMarital: "Single",
      existingInsurance: [] as string[],
      insExisting: [] as string[],
      insuranceCovers: {} as Record<string, string>,
      loansLiabilities: "",
      insLoansLiabilities: "",
      monthlySpending: "",
      ccMonthlySpending: "",
      spendingCategories: [] as string[],
      ccSpending: [] as string[],
      cardPreferences: [] as string[],
      flyFrequency: "Never",
      ccFlyFrequency: "Never",
      travelType: "Domestic",
      ccTravelType: "Domestic",
      loungeImportance: "3",
      ccLoungeImportance: "3",
      hotelFrequency: "Rarely",
      abroadSpend: "Never",
      feeComfort: "₹0 — Lifetime-free preferred",
      ccFee: "₹0 — Lifetime-free preferred",
      payHigherFee: "No",
      usageGoals: [] as string[],
      loanPurpose: "Home Purchase",
      loanEmployment: "Salaried",
      loanMonthlyIncome: "",
      loanIncomeStability: "Stable",
      loanEarningYears: "1–3 years",
      loanAmount: "500000",
      loanOwnContribution: "",
      loanHasCollateral: "No",
      loanCollateralType: "Property",
      loanHasCoApplicant: "No",
      loanCoApplicantRelation: "Spouse",
      loanKnowsScore: "No",
      loanScoreRange: "700–749",
      loanMissedEmi: "No",
      loanTenure: "Balanced EMI + tenure"
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

          <div className="hero-img-wrap">
            <Image
              src="/customised-header.jpg"
              alt="Customised Reports Banner"
              fill
              className="hero-image"
              priority
            />
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
                    <Image src={cat.img} alt={cat.title} fill className="entity-image object-cover" />
                    <span className="entity-number">{cat.num}</span>
                  </div>
                  <div className="entity-copy">
                    <h3>{cat.title}</h3>
                    <p>{cat.desc}</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setWizardCategory(cat.id);
                        setWizardStep(1);
                        setWizardOpen(true);
                      }}
                      className="entity-click-btn"
                    >
                      CLICK HERE
                    </button>
                  </div>
                  <span className="entity-arrow">↗</span>
                </article>
              );
            })}
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

            {/* STEP 1: CATEGORY SPECIFIC FIELDS */}
            {wizardStep === 1 && (
              <div className="wizard-step active">
                
                {/* Header block with category image */}
                <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid rgba(16, 21, 18, 0.1)" }}>
                  <div style={{ position: "relative", width: "48px", height: "48px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.1)" }}>
                    <Image
                      src={
                        wizardCategory === "Mutual Fund" ? "/images/wizard_mutual_fund.png" :
                        wizardCategory === "Stocks" ? "/images/wizard_stocks.png" :
                        wizardCategory === "Credit Card" ? "/images/wizard_credit_card.png" :
                        wizardCategory === "Insurance" ? "/images/wizard_insurance.png" :
                        "/images/wizard_loans.png"
                      }
                      alt={wizardCategory}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800 }}>Customized {wizardCategory} Report</h3>
                    <p style={{ margin: 0, fontSize: "12px", color: "var(--muted)" }}>Answer details to customize your report.</p>
                  </div>
                </div>

                {/* Form fields depending on wizardCategory */}
                <div className="wizard-category-details">
                  
                  {/* Stocks Scoped Fields */}
                  {wizardCategory === "Stocks" && (
                    <div className="wizard-category-fields">
                      <div className="wizard-field-grid">
                        <div className="wizard-field">
                          <label>Age</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 28" value={wizardAnswers.stAge || ""} onChange={(e) => handleWizardOptionToggle("stAge", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Monthly Savings (₹)</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 20000" value={wizardAnswers.stMonthlySavings || ""} onChange={(e) => handleWizardOptionToggle("stMonthlySavings", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Returns Expectation</label>
                          <input type="text" className="wizard-input-plain" placeholder="e.g. 15% annually" value={wizardAnswers.stReturns || ""} onChange={(e) => handleWizardOptionToggle("stReturns", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Investment Goal</label>
                          <input type="text" className="wizard-input-plain" placeholder="e.g. Wealth creation" value={wizardAnswers.stGoal || ""} onChange={(e) => handleWizardOptionToggle("stGoal", e.target.value)} />
                        </div>
                      </div>
                      <div className="wizard-field mt-2">
                        <label>Risk Tolerance</label>
                        <div className="wizard-options wizard-options-sm">
                          {["Low", "Medium", "High"].map(risk => (
                            <button
                              key={risk}
                              type="button"
                              className={`wizard-option ${wizardAnswers.stRisk === risk ? "selected" : ""}`}
                              onClick={() => handleWizardOptionToggle("stRisk", risk)}
                            >
                              {risk}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="wizard-field mt-4">
                        <label>Investment Style</label>
                        <input type="text" className="wizard-input-plain" placeholder="e.g. Swing trading, Value investing" value={wizardAnswers.stStyle || ""} onChange={(e) => handleWizardOptionToggle("stStyle", e.target.value)} />
                      </div>
                    </div>
                  )}

                  {/* Mutual Fund Scoped Fields */}
                  {wizardCategory === "Mutual Fund" && (
                    <div className="wizard-category-fields">
                      <div className="wizard-field-grid">
                        <div className="wizard-field">
                          <label>Age</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 32" value={wizardAnswers.mfAge || ""} onChange={(e) => handleWizardOptionToggle("mfAge", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Occupation</label>
                          <input type="text" className="wizard-input-plain" placeholder="e.g. IT Professional" value={wizardAnswers.mfOccupation || ""} onChange={(e) => handleWizardOptionToggle("mfOccupation", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Monthly Savings (₹)</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 15000" value={wizardAnswers.mfMonthlySavings || ""} onChange={(e) => handleWizardOptionToggle("mfMonthlySavings", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Goal</label>
                          <input type="text" className="wizard-input-plain" placeholder="e.g. Child education" value={wizardAnswers.mfGoal || ""} onChange={(e) => handleWizardOptionToggle("mfGoal", e.target.value)} />
                        </div>
                      </div>
                      <div className="wizard-field mt-2">
                        <label>Risk</label>
                        <div className="wizard-options wizard-options-sm">
                          {["Low", "Medium", "High"].map(risk => (
                            <button
                              key={risk}
                              type="button"
                              className={`wizard-option ${wizardAnswers.mfRisk === risk ? "selected" : ""}`}
                              onClick={() => handleWizardOptionToggle("mfRisk", risk)}
                            >
                              {risk}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="wizard-field mt-4">
                        <label>Investment Preference</label>
                        <div className="wizard-options wizard-options-sm">
                          {["Lump Sum", "SIP", "Lump Sum + SIP"].map(pref => (
                            <button
                              key={pref}
                              type="button"
                              className={`wizard-option ${wizardAnswers.mfPreference === pref ? "selected" : ""}`}
                              onClick={() => handleWizardOptionToggle("mfPreference", pref)}
                            >
                              {pref}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Insurance Scoped Fields */}
                  {wizardCategory === "Insurance" && (
                    <div className="wizard-category-fields">
                      <div className="wizard-field-grid">
                        <div className="wizard-field">
                          <label>Annual Income (₹)</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 900000" value={wizardAnswers.insAnnualIncome || ""} onChange={(e) => handleWizardOptionToggle("insAnnualIncome", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Monthly Savings (₹)</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 15000" value={wizardAnswers.insMonthlySavings || ""} onChange={(e) => handleWizardOptionToggle("insMonthlySavings", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Dependents</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 3" value={wizardAnswers.insDependents || ""} onChange={(e) => handleWizardOptionToggle("insDependents", e.target.value)} />
                        </div>
                      </div>
                      <div className="wizard-field mt-2">
                        <label>Marital Status</label>
                        <div className="wizard-options wizard-options-sm">
                          {["Single", "Married"].map(status => (
                            <button
                              key={status}
                              type="button"
                              className={`wizard-option ${wizardAnswers.insMarital === status ? "selected" : ""}`}
                              onClick={() => handleWizardOptionToggle("insMarital", status)}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="wizard-field mt-4">
                        <label>Do you currently have insurance? (Select multiple)</label>
                        <div className="wizard-options wizard-options-sm">
                          {Object.keys(insuranceCoverMap).map(cover => (
                            <button
                              key={cover}
                              type="button"
                              className={`wizard-option ${wizardAnswers.insExisting?.includes(cover) ? "selected" : ""}`}
                              onClick={() => handleWizardOptionToggle("insExisting", cover, true)}
                            >
                              {cover}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Cover Details */}
                      {wizardAnswers.insExisting?.length > 0 && (
                        <div className="wizard-subsection">
                          <h4 className="wizard-subheading">Active Cover Details</h4>
                          <div className="wizard-field-grid">
                            {wizardAnswers.insExisting.map((c: string) => {
                              const details = insuranceCoverMap[c];
                              if (!details) return null;
                              return (
                                <div className="wizard-field" key={c}>
                                  <label>{details.label}</label>
                                  <input
                                    type="number"
                                    className="wizard-input-plain"
                                    placeholder={details.placeholder}
                                    value={wizardAnswers.insuranceCovers?.[c] || ""}
                                    onChange={(e) => handleInsuranceCoverInput(c, e.target.value)}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="wizard-field mt-4">
                        <label>Loans and Liabilities</label>
                        <textarea className="wizard-textarea" rows={3} placeholder="e.g. Home loan ₹15L, Credit card outstanding ₹30k" value={wizardAnswers.insLoansLiabilities || ""} onChange={(e) => handleWizardOptionToggle("insLoansLiabilities", e.target.value)} />
                      </div>
                    </div>
                  )}

                  {/* Credit Card Scoped Fields */}
                  {wizardCategory === "Credit Card" && (
                    <div className="wizard-category-fields">
                      <div className="wizard-field-grid">
                        <div className="wizard-field">
                          <label>Age</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 27" value={wizardAnswers.ccAge || ""} onChange={(e) => handleWizardOptionToggle("ccAge", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Annual Salary (₹)</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 600000" value={wizardAnswers.ccMonthlySpending || ""} onChange={(e) => handleWizardOptionToggle("ccMonthlySpending", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Occupation</label>
                          <input type="text" className="wizard-input-plain" placeholder="e.g. Salaried" value={wizardAnswers.ccOccupation || ""} onChange={(e) => handleWizardOptionToggle("ccOccupation", e.target.value)} />
                        </div>
                      </div>
                      <div className="wizard-field mt-2">
                        <label>Where does your major spending go?</label>
                        <div className="wizard-options wizard-options-sm">
                          {["Groceries", "Dining / Food Delivery", "Online Shopping", "Fuel", "Travel", "Hotels", "Entertainment", "Utilities / Bills"].map(cat => (
                            <button
                              key={cat}
                              type="button"
                              className={`wizard-option ${wizardAnswers.ccSpending?.includes(cat) ? "selected" : ""}`}
                              onClick={() => handleWizardOptionToggle("ccSpending", cat, true)}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Travel Details */}
                      {(wizardAnswers.ccSpending?.includes("Travel") || wizardAnswers.ccSpending?.includes("Hotels")) && (
                        <div className="wizard-subsection">
                          <h4 className="wizard-subheading">Travel Behaviour</h4>
                          <div className="wizard-field">
                            <label>How often do you fly?</label>
                            <div className="wizard-options wizard-options-sm">
                              {["Never", "1–2/year", "3–5/year", "6–10/year", "10+/year"].map(fly => (
                                <button
                                  key={fly}
                                  type="button"
                                  className={`wizard-option ${wizardAnswers.ccFlyFrequency === fly ? "selected" : ""}`}
                                  onClick={() => handleWizardOptionToggle("ccFlyFrequency", fly)}
                                >
                                  {fly}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="wizard-field mt-4">
                            <label>Where do you usually travel?</label>
                            <div className="wizard-options wizard-options-sm">
                              {["Domestic", "International", "Both"].map(type => (
                                <button
                                  key={type}
                                  type="button"
                                  className={`wizard-option ${wizardAnswers.ccTravelType === type ? "selected" : ""}`}
                                  onClick={() => handleWizardOptionToggle("ccTravelType", type)}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="wizard-field mt-4">
                            <label>How important is airport lounge access? (1=None, 5=Essential)</label>
                            <div className="wizard-slider-row">
                              <span className="wizard-slider-label">Not Important</span>
                              <input type="range" className="wizard-slider" min="1" max="5" step="1" value={wizardAnswers.ccLoungeImportance} onChange={(e) => handleWizardOptionToggle("ccLoungeImportance", e.target.value)} />
                              <span className="wizard-slider-label">Essential</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="wizard-field mt-4">
                        <label>How much annual fee are you comfortable paying?</label>
                        <div className="wizard-options-stack">
                          {["₹0 — Lifetime-free preferred", "Up to ₹500 — Basic benefits", "₹500–₹2,000 — Better rewards", "₹2,000–₹5,000 — Premium benefits"].map(fee => (
                            <button
                              key={fee}
                              type="button"
                              className={`wizard-option wizard-option-stack ${wizardAnswers.ccFee === fee ? "selected" : ""}`}
                              onClick={() => handleWizardOptionToggle("ccFee", fee)}
                              style={{ display: "block" }}
                            >
                              <span className="wizard-option-title" style={{ display: "block", fontSize: "14px" }}>{fee.split(" — ")[0]}</span>
                              <span className="wizard-option-sub" style={{ display: "block", fontSize: "12px", opacity: 0.7 }}>{fee.split(" — ")[1]}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Loan Scoped Fields */}
                  {wizardCategory === "Loans" && (
                    <div className="wizard-category-fields">
                      <h4 className="wizard-subheading" style={{ marginTop: 0 }}>What do you need the loan for?</h4>
                      <div className="wizard-visual-cards">
                        {["Home Purchase", "Car / Vehicle", "Education", "Business", "Personal Expenses", "Medical Emergency", "Home Renovation"].map(purpose => (
                          <button
                            key={purpose}
                            type="button"
                            className={`wizard-option ${wizardAnswers.loanPurpose === purpose ? "selected" : ""}`}
                            onClick={() => handleWizardOptionToggle("loanPurpose", purpose)}
                          >
                            {purpose}
                          </button>
                        ))}
                      </div>

                      <div className="wizard-subsection">
                        <h4 className="wizard-subheading">Financial Profile & Requirements</h4>
                        <div className="wizard-field">
                          <label>What&apos;s your age? ({wizardAnswers.loanAge})</label>
                          <div className="wizard-slider-row">
                            <span className="wizard-slider-label">18</span>
                            <input type="range" className="wizard-slider" min="18" max="70" step="1" value={wizardAnswers.loanAge} onChange={(e) => handleWizardOptionToggle("loanAge", e.target.value)} />
                            <span className="wizard-slider-label">70+</span>
                          </div>
                        </div>

                        <div className="wizard-field mt-4">
                          <label>Employment Type</label>
                          <div className="wizard-options wizard-options-sm">
                            {["Salaried", "Self-employed", "Business", "Professional"].map(emp => (
                              <button
                                key={emp}
                                type="button"
                                className={`wizard-option ${wizardAnswers.loanEmployment === emp ? "selected" : ""}`}
                                onClick={() => handleWizardOptionToggle("loanEmployment", emp)}
                              >
                                {emp}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="wizard-field mt-4">
                          <label>Monthly Take-home Income (₹)</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 60000" value={wizardAnswers.loanMonthlyIncome || ""} onChange={(e) => handleWizardOptionToggle("loanMonthlyIncome", e.target.value)} />
                        </div>

                        <div className="wizard-field mt-4">
                          <label>Stability of Income</label>
                          <div className="wizard-options wizard-options-sm">
                            {["Stable", "Somewhat variable", "Highly variable"].map(stab => (
                              <button
                                key={stab}
                                type="button"
                                className={`wizard-option ${wizardAnswers.loanIncomeStability === stab ? "selected" : ""}`}
                                onClick={() => handleWizardOptionToggle("loanIncomeStability", stab)}
                              >
                                {stab}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="wizard-field mt-4">
                          <label>How much do you want to borrow? (₹{Number(wizardAnswers.loanAmount).toLocaleString()})</label>
                          <div className="wizard-slider-row">
                            <span className="wizard-slider-label">₹50K</span>
                            <input type="range" className="wizard-slider" min="50000" max="10000000" step="50000" value={wizardAnswers.loanAmount} onChange={(e) => handleWizardOptionToggle("loanAmount", e.target.value)} />
                            <span className="wizard-slider-label">₹1Cr+</span>
                          </div>
                        </div>

                        <div className="wizard-field mt-4">
                          <label>Do you have collateral to offer?</label>
                          <div className="wizard-options wizard-options-sm">
                            {["Yes", "No"].map(col => (
                              <button
                                key={col}
                                type="button"
                                className={`wizard-option ${wizardAnswers.loanHasCollateral === col ? "selected" : ""}`}
                                onClick={() => handleWizardOptionToggle("loanHasCollateral", col)}
                              >
                                {col}
                              </button>
                            ))}
                          </div>
                        </div>

                        {wizardAnswers.loanHasCollateral === "Yes" && (
                          <div className="wizard-field mt-4">
                            <label>Collateral Type</label>
                            <div className="wizard-options wizard-options-sm">
                              {["Property", "Vehicle", "Fixed Deposit", "Gold"].map(type => (
                                <button
                                  key={type}
                                  type="button"
                                  className={`wizard-option ${wizardAnswers.loanCollateralType === type ? "selected" : ""}`}
                                  onClick={() => handleWizardOptionToggle("loanCollateralType", type)}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>

                <div className="wizard-nav" style={{ marginTop: "24px" }}>
                  <button className="wizard-btn" onClick={handleCloseWizard} style={{ background: "var(--muted)" }}>
                    Cancel
                  </button>
                  <button
                    className="wizard-btn primary"
                    disabled={!isStep1FormValid()}
                    onClick={handleNextStep}
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: OPEN REQUIREMENTS */}
            {wizardStep === 3 && (
              <div className="wizard-step active">
                <h3>Give specific details about your requirements</h3>
                <p>Tell us anything specific you&apos;d like this report to cover.</p>
                <textarea
                  className="wizard-textarea"
                  rows={5}
                  placeholder="Tell us anything specific you'd like this report to cover..."
                  value={wizardAnswers.details}
                  onChange={(e) =>
                    setWizardAnswers({ ...wizardAnswers, details: e.target.value })
                  }
                  style={{ minHeight: "120px", resize: "vertical", width: "100%", padding: "16px", borderRadius: "10px", background: "var(--cream)", border: "1.5px solid var(--border-light)", color: "var(--ink)" }}
                />
                <div className="wizard-nav" style={{ marginTop: "24px" }}>
                  <button
                    className="wizard-btn"
                    onClick={handlePrevStep}
                    style={{ background: "var(--muted)" }}
                  >
                    &larr; Back
                  </button>
                  <button
                    className="wizard-btn primary"
                    disabled={!wizardAnswers.details?.trim()}
                    onClick={handleNextStep}
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CONTACT DETAILS */}
            {wizardStep === 4 && (
              <div className="wizard-step active">
                <h3>Give your details, we will get back to you ASAP</h3>
                <p>We need your contact information to send you the custom report.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div className="wizard-field" style={{ margin: 0 }}>
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={wizardAnswers.name}
                      onChange={(e) =>
                        setWizardAnswers({ ...wizardAnswers, name: e.target.value })
                      }
                      className="wizard-input-plain"
                    />
                  </div>

                  <div className="wizard-field" style={{ margin: 0 }}>
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={wizardAnswers.email}
                      onChange={(e) =>
                        setWizardAnswers({ ...wizardAnswers, email: e.target.value })
                      }
                      className="wizard-input-plain"
                    />
                  </div>

                  <div className="wizard-field" style={{ margin: 0 }}>
                    <label>Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="WhatsApp Mobile Number"
                      value={wizardAnswers.mobile}
                      onChange={(e) =>
                        setWizardAnswers({ ...wizardAnswers, mobile: e.target.value })
                      }
                      className="wizard-input-plain"
                    />
                  </div>
                </div>

                {wizardMessage && (
                  <div style={{ color: "#B3432B", fontSize: "14px", marginTop: "16px", fontWeight: "bold" }}>
                    {wizardMessage}
                  </div>
                )}

                <div className="wizard-nav" style={{ marginTop: "28px" }}>
                  <button
                    className="wizard-btn"
                    onClick={handlePrevStep}
                    style={{ background: "var(--muted)" }}
                    disabled={wizardLoading}
                  >
                    &larr; Back
                  </button>
                  <button
                    className="wizard-btn primary"
                    onClick={handleWizardSubmit}
                    disabled={wizardLoading || !wizardAnswers.name?.trim() || !wizardAnswers.email?.trim() || !wizardAnswers.mobile?.trim()}
                  >
                    {wizardLoading ? "Submitting..." : "Submit Request"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP: SUCCESS PANEL */}
            {wizardStep === "done" && (
              <div className="wizard-step active wizard-success">
                <h3>Thanks — your custom request is in!</h3>
                <p>We are processing your details and will send your customized report on your WhatsApp number shortly.</p>
                <button className="wizard-btn primary" onClick={handleCloseWizard}>
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
