"use client";

import Image from "next/image";
import Link from "next/link";

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
          background-image:
            linear-gradient(rgba(14,37,30,0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,37,30,0.09) 1px, transparent 1px);
          background-size: 42px 42px;
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
          grid-template-columns: 1fr 1fr;
          gap: 40px;
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
          animation: aboutRise 0.8s ease forwards;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          box-shadow: 0 10px 28px rgba(14,37,30,0.08);
        }
        .about-page-container .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(14,37,30,0.18);
        }
        .about-page-container .card.left { animation-delay: 0.7s; }
        .about-page-container .card.right { animation-delay: 0.85s; }

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
        }
        .about-page-container h3.name {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 27px;
          letter-spacing: 0.01em;
          margin: 0 0 4px;
          color: var(--text-dark);
        }
        .about-page-container p.title-line {
          font-size: 13.5px;
          color: var(--text-dark-muted);
          margin: 0 0 18px;
          font-weight: 600;
        }
        .about-page-container p.bio {
          font-size: 15px;
          line-height: 1.65;
          color: var(--text-dark-muted);
          margin: 0 0 22px;
        }
        .about-page-container .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
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

        @media (max-width: 760px) {
          .about-page-container .wrap { padding: 56px 20px 70px; }
          .about-page-container .founders { grid-template-columns: 1fr; gap: 96px; margin-top: 120px; }
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
            <div className="card left">
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
            <div className="card right">
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
              <p className="title-line">Client Relations, Sales &amp; People Management</p>
              <p className="bio">
                Arihant is the reason Fiscal Forum feels human. He runs the relationships, the sales motion and the culture that turn a product into a community — sitting closest to users, translating what they actually need back into how Fiscal Forum teaches and grows.
              </p>
              <div className="chips">
                <span className="chip">Client Relations</span>
                <span className="chip">Sales Strategy</span>
                <span className="chip">Team &amp; Culture</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
