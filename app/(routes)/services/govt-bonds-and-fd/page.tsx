import IndianBondsHero from "../../_components/IndianBondsHero";
import { metadata } from "./metadata";
import Link from "next/link";

export { metadata };

export default function GovernmentBondsPage() {
  return (
    <main className="pt-24 min-h-screen bg-[#efe4d5]">
      <IndianBondsHero />

      {/* Bottom CTA Section */}
      <section className="bondWiseTerminal border-t border-[#13140f]/10 pt-16 pb-12 text-center max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-[#14160f] mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Ready to Invest in Bonds?
        </h2>
        <p className="text-base text-[#62695c] mb-6 max-w-xl mx-auto font-semibold">
          Open a Demat and Trading account to start buying Government Bonds, Corporate Bonds, and FDs.
        </p>
        <div>
          <Link
            href="/services/learn-earn/open-demat-account"
            className="cta-btn inline-block text-center font-bold px-8 py-3.5"
            style={{ textDecoration: 'none' }}
          >
            Explore Demat Account →
          </Link>
        </div>
      </section>
    </main>
  );
}