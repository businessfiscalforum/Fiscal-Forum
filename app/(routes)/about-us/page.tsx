"use client";

import Image from "next/image";

export default function AboutUs() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .about-page-container {
          --ink: #0E251E;
          --ink-2: #153229;
          --panel: #F4EFE2;
          --panel-dim: #E9E1CE;
          --gold: #C9A227;
          --gold-bright: #E7C25E;
          --rust: #B5563C;
          --text-light: #F2EEE2;
          --text-muted: #9FB6AA;
          --text-dark: #1B241F;
          --text-dark-muted: #5B665D;
          --line: rgba(242,238,226,0.14);

          background-color: var(--panel);
          color: var(--text-dark);
          font-family: 'Manrope', sans-serif;
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
        }

        .about-page-container .wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 88px 32px 100px;
          position: relative;
        }

        .about-page-container h1.headline {
          font-family: 'Fraunces', serif;
          font-optical-sizing: auto;
          font-weight: 500;
          font-size: clamp(34px, 5.2vw, 64px);
          line-height: 1.08;
          letter-spacing: -0.01em;
          max-width: 880px;
          margin: 0 0 22px;
          color: var(--text-dark);
          opacity: 0;
          animation: aboutRise 0.9s ease 0.1s forwards;
        }
        .about-page-container h1.headline em {
          font-style: italic;
          color: var(--gold);
          font-weight: 400;
        }

        .about-page-container p.sub {
          font-size: 17px;
          line-height: 1.65;
          max-width: 620px;
          color: var(--text-dark-muted);
          margin: 0;
          opacity: 0;
          animation: aboutRise 0.9s ease 0.22s forwards;
        }

        .about-page-container .founders {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 76px 36px;
          align-items: stretch;
          margin-top: 120px;
        }

        .about-page-container .card {
          background: #FBF7EC;
          border: 1px solid rgba(14,37,30,0.1);
          border-radius: 18px;
          padding: 38px 34px 34px;
          color: var(--text-dark);
          position: relative;
          opacity: 0;
          transform: translateY(24px);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          box-shadow: 0 10px 28px rgba(14,37,30,0.08);
          display: flex;
          flex-direction: column;
        }
        .about-page-container .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(14,37,30,0.18);
        }

        .about-page-container .card.c1 {
          animation: aboutRise 0.8s ease 0.35s forwards;
        }
        .about-page-container .card.c2 {
          animation: aboutRise 0.8s ease 0.5s forwards;
        }
        .about-page-container .card.c3 {
          animation: aboutRise 0.8s ease 0.65s forwards;
        }
        .about-page-container .card.c4 {
          animation: aboutRise 0.8s ease 0.8s forwards;
        }

        .about-page-container .photo-frame {
          width: 112px;
          height: 112px;
          border-radius: 50%;
          margin: -78px 0 20px;
          padding: 5px;
          background: var(--panel);
          border: 1px solid rgba(201,162,39,0.5);
          position: relative;
          z-index: 2;
        }
        .about-page-container .photo-frame img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          background: var(--ink-2);
        }

        .about-page-container .role-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--rust);
          margin-bottom: 8px;
          display: block;
          font-weight: 500;
        }
        .about-page-container h3.name {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 25px;
          letter-spacing: 0.01em;
          margin: 0 0 4px;
          color: var(--text-dark);
        }
        .about-page-container p.title-line {
          font-size: 13.5px;
          color: var(--text-dark-muted);
          margin: 0 0 16px;
          font-weight: 600;
        }
        .about-page-container p.bio {
          font-size: 14.5px;
          line-height: 1.65;
          color: var(--text-dark-muted);
          margin: 0 0 22px;
          flex-grow: 1;
        }
        .about-page-container .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
        }
        .about-page-container .chip {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.02em;
          padding: 6px 12px;
          border-radius: 20px;
          background: #000000;
          color: #FFFFFF;
          border: 1px solid rgba(27,36,31,0.08);
        }

        @keyframes aboutRise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 860px) {
          .about-page-container .wrap { padding: 56px 20px 70px; }
          .about-page-container .founders {
            grid-template-columns: 1fr;
            gap: 88px;
            margin-top: 100px;
          }
        }
      `}</style>

      <div className="about-page-container">
        <div className="wrap">
          <h1 className="headline">
            Finance, made simple. Investing, made <em>easy</em>.
          </h1>
          <p className="sub">
            Fiscal Forum is a new-age fintech built on a simple bet: that India&apos;s next generation of investors doesn&apos;t need more noise — it needs a teacher. We break down finance in the simplest way possible and back every investment decision with in-depth research reports from SEBI-certified research analysts. Here&apos;s who&apos;s behind it.
          </p>

          <div className="founders">
            {/* Harsh Card */}
            <div className="card c1">
              <div className="photo-frame">
                <Image
                  src="/founder-harsh.png"
                  alt="Harsh Mahto"
                  width={102}
                  height={102}
                  priority
                />
              </div>
              <span className="role-label">Co-Founder</span>
              <h3 className="name">HARSH MAHTO</h3>
              <p className="title-line">Finance, Research &amp; Technology</p>
              <p className="bio">
                Harsh is the one making sure Fiscal Forum&apos;s advice is actually right before it&apos;s ever made simple. He pairs deep market research with hands-on engineering, building the analytical engine and the product behind every lesson — so what users learn is grounded in real data, not shortcuts.
              </p>
              <div className="chips">
                <span className="chip">Equity Research</span>
                <span className="chip">Product Engineering</span>
                <span className="chip">Data &amp; Models</span>
              </div>
            </div>

            {/* Arihant Card */}
            <div className="card c2">
              <div className="photo-frame">
                <Image
                  src="/founder-arihant.png"
                  alt="Arihant Mehta"
                  width={102}
                  height={102}
                  priority
                />
              </div>
              <span className="role-label">Co-Founder</span>
              <h3 className="name">ARIHANT MEHTA</h3>
              <p className="title-line">Sales, Client Relations &amp; Management</p>
              <p className="bio">
                Arihant spearheads client-facing relationships, strategic sales initiatives, and cross-functional management at Fiscal Forum. Dedicated to client success and organizational growth, he ensures seamless partnerships, top-tier advisory delivery, and lasting value for every investor and institutional client.
              </p>
              <div className="chips">
                <span className="chip">Sales &amp; Growth</span>
                <span className="chip">Client Relations</span>
                <span className="chip">Strategic Management</span>
              </div>
            </div>

            {/* Rishita Card */}
            <div className="card c3">
              <div className="photo-frame">
                <Image
                  src="/team-rishita.png"
                  alt="Rishita Soni"
                  width={102}
                  height={102}
                  priority
                />
              </div>
              <span className="role-label">Marketing</span>
              <h3 className="name">RISHITA SONI</h3>
              <p className="title-line">Brand, Growth &amp; Community</p>
              <p className="bio">
                Rishita leads marketing and brand strategy at Fiscal Forum, turning intricate market concepts into compelling, digestible stories. She drives multi-channel audience engagement, creative brand positioning, and digital campaigns that make financial literacy accessible to every ambitious investor.
              </p>
              <div className="chips">
                <span className="chip">Brand Strategy</span>
                <span className="chip">Content &amp; Growth</span>
                <span className="chip">Digital Campaigns</span>
              </div>
            </div>

            {/* Nakul Card */}
            <div className="card c4">
              <div className="photo-frame">
                <Image
                  src="/team-nakul.png"
                  alt="Nakul Prajapat"
                  width={102}
                  height={102}
                  priority
                />
              </div>
              <span className="role-label">HR &amp; Operations</span>
              <h3 className="name">NAKUL PRAJAPAT</h3>
              <p className="title-line">People, Culture &amp; Execution</p>
              <p className="bio">
                Nakul steers human resources and organizational operations at Fiscal Forum. From talent acquisition and team alignment to streamlining daily execution workflows, he builds the operational backbone and vibrant work culture that powers Fiscal Forum&apos;s continuous scale.
              </p>
              <div className="chips">
                <span className="chip">People &amp; Culture</span>
                <span className="chip">Operations</span>
                <span className="chip">Talent Acquisition</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
