"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

// Helper: compute SVG arc path for a pie slice
function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const startRad = ((startAngle - 90) * Math.PI) / 180;
  const endRad = ((endAngle - 90) * Math.PI) / 180;

  const x1 = cx + radius * Math.cos(startRad);
  const y1 = cy + radius * Math.sin(startRad);
  const x2 = cx + radius * Math.cos(endRad);
  const y2 = cy + radius * Math.sin(endRad);

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${cx} ${cy}`,
    `L ${x1} ${y1}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    `Z`,
  ].join(" ");
}

export default function PortfolioSplitStudio() {
  // Form State
  const [risk, setRisk] = useState("Moderate Risk");
  const [experience, setExperience] = useState("Beginner");
  const [horizon, setHorizon] = useState("5+ Years");
  const [goal, setGoal] = useState("Wealth Creation");
  const [surplus, setSurplus] = useState("₹5,000–₹25,000");
  const [income, setIncome] = useState("Salaried");
  const [protection, setProtection] = useState("High");

  // Hovered Segment State
  const [hoveredSegment, setHoveredSegment] = useState<{
    name: string;
    value: number;
    color: string;
  } | null>(null);

  // Mouse position for tooltip
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleChartMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  // Dynamic Allocation Logic
  const getDynamicAllocation = () => {
    let equity = 30;
    let mf = 40;
    let fo = 0;
    let mtf = 0;
    let ipo = 10;
    let bonds = 15;
    let commodities = 5;

    // Adjust by Risk Appetite
    if (risk === "Low Risk") {
      equity = 15;
      mf = 30;
      bonds = 40;
      commodities = 10;
      ipo = 5;
      fo = 0;
      mtf = 0;
    } else if (risk === "High Risk") {
      equity = 45;
      mf = 20;
      bonds = 5;
      commodities = 5;
      ipo = 15;
      if (experience === "Expert") {
        fo = 5;
        mtf = 5;
      } else if (experience === "Intermediate") {
        fo = 3;
        mtf = 2;
      }
    }

    // Adjust by Investment Experience
    if (experience === "Expert" && risk !== "Low Risk") {
      fo = Math.max(fo, 5);
      mtf = Math.max(mtf, 5);
      equity = Math.max(10, equity - 5);
      mf = Math.max(10, mf - 5);
    }

    // Adjust by Investment Horizon
    if (horizon === "1–3 Years") {
      bonds += 15;
      equity = Math.max(10, equity - 10);
      mf = Math.max(10, mf - 5);
    } else if (horizon === "3–5 Years") {
      bonds += 5;
      equity = Math.max(10, equity - 5);
    }

    // Adjust by Primary Financial Goal
    if (goal === "Capital Preservation") {
      bonds += 15;
      commodities += 5;
      equity = Math.max(5, equity - 15);
      mf = Math.max(10, mf - 5);
      ipo = 0;
    } else if (goal === "Regular Income") {
      bonds += 20;
      equity = Math.max(10, equity - 15);
      mf = Math.max(10, mf - 5);
    }

    // Adjust by Income Stability
    if (income === "Freelancer / Dynamic") {
      bonds += 5;
      equity = Math.max(10, equity - 5);
    }

    // Adjust by Protection Requirement
    if (protection === "High") {
      bonds += 5;
      mf += 5;
      equity = Math.max(10, equity - 10);
    }

    // Normalize everything to sum exactly to 100%
    const currentSum = equity + mf + fo + mtf + ipo + bonds + commodities;
    if (currentSum !== 100) {
      const difference = 100 - currentSum;
      // Add or subtract difference from Mutual Funds
      mf = Math.max(0, mf + difference);
    }

    return [
      { name: "EQUITY", value: equity, color: "#22c55e" },
      { name: "MUTUAL FUND", value: mf, color: "#2563eb" },
      { name: "F&O", value: fo, color: "#ef4444" },
      { name: "MTF", value: mtf, color: "#f97316" },
      { name: "IPO", value: ipo, color: "#a855f7" },
      { name: "BONDS", value: bonds, color: "#facc15" },
      { name: "COMMODITIES", value: commodities, color: "#14b8a6" },
    ];
  };

  const allocationData = getDynamicAllocation();
  const activeData = allocationData.filter((d) => d.value > 0);

  // Build pie slices with computed angles
  const slices: {
    name: string;
    value: number;
    color: string;
    startAngle: number;
    endAngle: number;
    midAngle: number;
  }[] = [];
  {
    let currentAngle = 0;
    for (const item of activeData) {
      const sweep = (item.value / 100) * 360;
      slices.push({
        ...item,
        startAngle: currentAngle,
        endAngle: currentAngle + sweep,
        midAngle: currentAngle + sweep / 2,
      });
      currentAngle += sweep;
    }
  }

  const CX = 50;
  const CY = 50;
  const R = 42;
  const EXPLODE = 3; // how far a hovered slice pops out

  return (
    <section className="portfolio-studio">
      <div className="studio-card">
        <p className="studio-tag">PORTFOLIO SPLIT STUDIO</p>
        <h2 className="studio-heading">
          Find your financial
          <br />
          product mix.
        </h2>

        {/* Top Row: Image & Chart side-by-side */}
        <div className="studio-top-row">
          {/* Column 1: Phone Preview with rounded border & glow */}
          <div className="phone-preview">
            <Image
              src="/images/portfolio-app-screenshot.png"
              alt="Portfolio App"
              width={500}
              height={900}
              className="phone-image"
              priority
            />
          </div>

          {/* Column 2: Pie Chart & Splitting Table */}
          <div className="chart-card">
            <div
              className="chart-area"
              onMouseMove={handleChartMouseMove}
              style={{ position: "relative" }}
            >
              {/* Ambient Glow that shifts to hovered-segment color */}
              <div
                className="ambient-glow"
                style={{
                  background: hoveredSegment
                    ? `radial-gradient(circle, ${hoveredSegment.color}30 0%, ${hoveredSegment.color}08 50%, transparent 75%)`
                    : "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
                }}
              />

              {/* The main pie chart SVG */}
              <svg
                viewBox="-10 -10 120 120"
                className="pie-svg"
              >
                {/* Subtle outer ring */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={R + 2}
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.4"
                />

                {/* Pie slices */}
                {slices.map((slice) => {
                  const isHovered = hoveredSegment?.name === slice.name;

                  // Compute the explode offset along the midAngle
                  const midRad = ((slice.midAngle - 90) * Math.PI) / 180;
                  const dx = isHovered ? EXPLODE * Math.cos(midRad) : 0;
                  const dy = isHovered ? EXPLODE * Math.sin(midRad) : 0;

                  const path = describeArc(
                    CX + dx,
                    CY + dy,
                    isHovered ? R + 1 : R,
                    slice.startAngle,
                    slice.endAngle
                  );

                  return (
                    <path
                      key={slice.name}
                      d={path}
                      fill={slice.color}
                      stroke="rgba(16, 23, 32, 0.9)"
                      strokeWidth="0.6"
                      className="pie-slice"
                      style={{
                        opacity: hoveredSegment
                          ? isHovered
                            ? 1
                            : 0.55
                          : 0.9,
                        filter: isHovered
                          ? `drop-shadow(0 0 8px ${slice.color}) drop-shadow(0 0 20px ${slice.color}50)`
                          : "none",
                        transition:
                          "opacity 0.35s ease, filter 0.35s ease, d 0.35s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={() => setHoveredSegment(slice)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    />
                  );
                })}

                {/* Outside percentage labels with connector lines */}
                {slices.map((slice) => {
                  // Only show labels for segments with > 0%
                  if (slice.value === 0) return null;

                  const isHovered = hoveredSegment?.name === slice.name;
                  const midRad = ((slice.midAngle - 90) * Math.PI) / 180;

                  // Explode offset mirrored from slice
                  const dx = isHovered ? EXPLODE * Math.cos(midRad) : 0;
                  const dy = isHovered ? EXPLODE * Math.sin(midRad) : 0;

                  const sliceEdgeR = isHovered ? R + 1 : R;
                  // Line start: just outside the slice edge
                  const lx1 = CX + dx + (sliceEdgeR + 1) * Math.cos(midRad);
                  const ly1 = CY + dy + (sliceEdgeR + 1) * Math.sin(midRad);
                  // Line end: further out
                  const labelR = R + 12;
                  const lx2 = CX + dx + (labelR - 1) * Math.cos(midRad);
                  const ly2 = CY + dy + (labelR - 1) * Math.sin(midRad);
                  // Label anchor: a bit further
                  const labelAnchorR = R + 13.5;
                  const tx = CX + dx + labelAnchorR * Math.cos(midRad);
                  const ty = CY + dy + labelAnchorR * Math.sin(midRad);

                  // Determine text-anchor based on which side of chart
                  const textAnchor = tx > CX + 2 ? "start" : tx < CX - 2 ? "end" : "middle";

                  return (
                    <g
                      key={`label-${slice.name}`}
                      style={{ pointerEvents: "none" }}
                    >
                      {/* Connector line */}
                      <line
                        x1={lx1}
                        y1={ly1}
                        x2={lx2}
                        y2={ly2}
                        stroke={slice.color}
                        strokeWidth={isHovered ? "0.7" : "0.45"}
                        strokeOpacity={isHovered ? 1 : 0.65}
                        style={{ transition: "stroke-opacity 0.3s ease, stroke-width 0.3s ease" }}
                      />
                      {/* Dot at line start */}
                      <circle
                        cx={lx1}
                        cy={ly1}
                        r="0.7"
                        fill={slice.color}
                        fillOpacity={isHovered ? 1 : 0.7}
                      />
                      {/* Percentage text */}
                      <text
                        x={tx}
                        y={ty + 1.2}
                        textAnchor={textAnchor}
                        fontSize={isHovered ? "5" : "4"}
                        fontWeight="900"
                        fill={isHovered ? slice.color : "#ffffff"}
                        fillOpacity={isHovered ? 1 : 0.75}
                        style={{ transition: "fill 0.3s ease, font-size 0.3s ease, fill-opacity 0.3s ease" }}
                      >
                        {slice.value}%
                      </text>
                    </g>
                  );
                })}

              </svg>

              {/* Floating Tooltip */}
              {hoveredSegment && (
                <div
                  className="chart-tooltip"
                  style={{
                    left: `${mousePos.x + 18}px`,
                    top: `${mousePos.y - 60}px`,
                  }}
                >
                  <div
                    className="tooltip-color-bar"
                    style={{ background: hoveredSegment.color }}
                  />
                  <div className="tooltip-content">
                    <span className="tooltip-name">{hoveredSegment.name}</span>
                    <span
                      className="tooltip-value"
                      style={{ color: hoveredSegment.color }}
                    >
                      {hoveredSegment.value}%
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Allocation Table */}
            <table className="split-table">
              <thead>
                <tr>
                  <th>ENTITY</th>
                  <th>SPLIT</th>
                </tr>
              </thead>
              <tbody>
                {allocationData.map((item) => {
                  const isHovered = hoveredSegment?.name === item.name;
                  return (
                    <tr
                      key={item.name}
                      className={isHovered ? "active-row" : ""}
                      onMouseEnter={() => setHoveredSegment(item)}
                      onMouseLeave={() => setHoveredSegment(null)}
                      style={{
                        cursor: "pointer",
                        background: isHovered
                          ? `${item.color}12`
                          : "transparent",
                        transition: "background 0.25s ease",
                      }}
                    >
                      <td>
                        <div className="entity-cell">
                          <span
                            className="dot"
                            style={{
                              background: item.color,
                              boxShadow: isHovered
                                ? `0 0 12px ${item.color}`
                                : "none",
                              transform: isHovered ? "scale(1.3)" : "scale(1)",
                              transition: "all 0.25s ease",
                            }}
                          />
                          <span
                            style={{
                              color: isHovered ? item.color : "white",
                              transition: "color 0.25s ease",
                              fontWeight: isHovered ? 900 : 700,
                            }}
                          >
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td
                        className="value-cell"
                        style={{
                          color: isHovered ? "#fff" : "#f59e0b",
                          transition: "color 0.25s ease",
                          fontWeight: 900,
                        }}
                      >
                        {item.value}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Row: Interactive Form Selects below both */}
        <div className="studio-bottom-row">
          <div className="form-card">
            <div className="field">
              <label>Risk Appetite</label>
              <select value={risk} onChange={(e) => setRisk(e.target.value)}>
                <option value="Low Risk">Low Risk</option>
                <option value="Moderate Risk">Moderate Risk</option>
                <option value="High Risk">High Risk</option>
              </select>
            </div>

            <div className="field">
              <label>Investment Experience</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="field">
              <label>Investment Horizon</label>
              <select
                value={horizon}
                onChange={(e) => setHorizon(e.target.value)}
              >
                <option value="1–3 Years">1–3 Years</option>
                <option value="3–5 Years">3–5 Years</option>
                <option value="5+ Years">5+ Years</option>
              </select>
            </div>

            <div className="field">
              <label>Primary Financial Goal</label>
              <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                <option value="Capital Preservation">
                  Capital Preservation
                </option>
                <option value="Regular Income">Regular Income</option>
                <option value="Wealth Creation">Wealth Creation</option>
              </select>
            </div>

            <div className="field">
              <label>Monthly Investable Surplus</label>
              <select
                value={surplus}
                onChange={(e) => setSurplus(e.target.value)}
              >
                <option value="Under ₹5,000">Under ₹5,000</option>
                <option value="₹5,000–₹25,000">₹5,000–₹25,000</option>
                <option value="₹25,000–₹1,00,000">₹25,000–₹1,00,000</option>
                <option value="₹1,00,000+">₹1,00,000+</option>
              </select>
            </div>

            <div className="field">
              <label>Income Stability</label>
              <select
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              >
                <option value="Salaried">Salaried</option>
                <option value="Business Owner">Business Owner</option>
                <option value="Freelancer / Dynamic">
                  Freelancer / Dynamic
                </option>
              </select>
            </div>

            <div className="field">
              <label>Protection Requirement</label>
              <select
                value={protection}
                onChange={(e) => setProtection(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .portfolio-studio {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 60px 16px;
          background: #f4fbf7;
        }

        .studio-card {
          width: 100%;
          max-width: 1200px;
          border-radius: 32px;
          padding: 40px 32px;
          background: linear-gradient(135deg, #101720 0%, #172536 100%);
          position: relative;
          overflow: hidden;
          border: 2px solid #000000;
          box-shadow: 8px 8px 0px #000;
        }

        .studio-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px
            );
          background-size: 44px 44px;
          pointer-events: none;
        }

        .studio-tag {
          color: #f59e0b;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 3px;
          margin-bottom: 12px;
          position: relative;
          z-index: 2;
          text-transform: uppercase;
        }

        .studio-heading {
          color: white;
          font-size: 48px;
          line-height: 1.1;
          font-weight: 900;
          margin-bottom: 40px;
          position: relative;
          z-index: 2;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }

        .studio-top-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin-bottom: 32px;
          position: relative;
          z-index: 2;
          width: 100%;
        }

        @media (min-width: 768px) {
          .studio-top-row {
            grid-template-columns: 1fr 1fr;
            align-items: center;
          }
        }

        .studio-bottom-row {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        /* Phone Preview */
        .phone-preview {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
        }

        .phone-preview :global(.phone-image) {
          border-radius: 36px !important;
          border: 4px solid rgba(255, 255, 255, 0.15) !important;
          box-shadow: 0 0 35px rgba(34, 197, 94, 0.3) !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .phone-preview :global(.phone-image:hover) {
          box-shadow: 0 0 55px rgba(34, 197, 94, 0.55) !important;
          transform: scale(1.03) translateY(-4px) !important;
        }

        /* Form Card */
        .form-card {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          padding: 28px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          width: 100%;
        }

        @media (min-width: 640px) {
          .form-card {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .form-card {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .field select {
          height: 52px;
          border-radius: 14px;
          border: 2px solid #000;
          outline: none;
          padding: 0 16px;
          font-size: 16px;
          font-weight: 800;
          color: #000000;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 2px 2px 0px #000;
        }

        .field select:focus {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0px #000;
        }

        /* Chart Card */
        .chart-card {
          padding: 28px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Chart Area - contains the SVG + ambient glow + tooltip */
        .chart-area {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 28px;
          position: relative;
        }

        /* Ambient under-glow */
        .ambient-glow {
          position: absolute;
          width: 420px;
          height: 420px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(50px);
          transition: background 0.5s ease;
        }

        /* The SVG itself */
        .pie-svg {
          width: 340px;
          height: 340px;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 8px 30px rgba(0, 0, 0, 0.6));
        }

        .pie-slice {
          transition: opacity 0.35s ease, filter 0.35s ease;
        }

        /* Floating Tooltip */
        .chart-tooltip {
          position: absolute;
          pointer-events: none;
          display: flex;
          align-items: stretch;
          gap: 0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.08);
          z-index: 50;
          backdrop-filter: blur(16px);
          background: rgba(10, 14, 22, 0.92);
          transition: left 0.06s ease-out, top 0.06s ease-out;
        }

        .tooltip-color-bar {
          width: 5px;
          flex-shrink: 0;
        }

        .tooltip-content {
          padding: 10px 16px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .tooltip-name {
          font-size: 10px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .tooltip-value {
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -0.5px;
        }

        /* Table */
        .split-table {
          width: 100%;
          border-collapse: collapse;
        }

        .split-table th {
          text-align: left;
          padding: 12px 8px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }

        .split-table td {
          padding: 12px 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 15px;
          font-weight: 800;
        }

        .entity-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .value-cell {
          text-align: right;
          color: #f59e0b !important;
        }

        /* Responsiveness */
        @media (max-width: 1023px) {
          .studio-card {
            padding: 32px 20px;
          }

          .studio-heading {
            font-size: 36px;
            margin-bottom: 28px;
          }

          .pie-svg {
            width: 280px;
            height: 280px;
          }

          .ambient-glow {
            width: 340px;
            height: 340px;
          }
        }

        @media (max-width: 480px) {
          .pie-svg {
            width: 240px;
            height: 240px;
          }

          .ambient-glow {
            width: 280px;
            height: 280px;
          }

          .studio-heading {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
}