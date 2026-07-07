"use client";

import Image from "next/image";

export default function IndianBondsHero() {
  return (
    <section className="bondHero">
      <div className="bondHeroCard">
        <div className="bondHeroContent">
          <span className="bondBadge">Indian Fixed Income</span>

          <h1>Indian Bonds</h1>

          <p>
            Explore Indian corporate and PSU bond opportunities with a modern
            bond screener interface inspired by trading terminals.
          </p>

          <div className="bondStats">
            <div className="bondStat">
              <strong>2500+</strong>
              <span>Bonds Listed</span>
            </div>

            <div className="bondStat">
              <strong>AAA</strong>
              <span>Rated Options</span>
            </div>

            <div className="bondStat">
              <strong>Live</strong>
              <span>Market Data</span>
            </div>
          </div>
        </div>

        <div className="bondImageWrap">
          <Image
            src="/bond-illustration.png"
            alt="Indian Bonds"
            width={600}
            height={600}
            className="bondHeroImage"
            priority
          />
        </div>
      </div>
    </section>
  );
}
