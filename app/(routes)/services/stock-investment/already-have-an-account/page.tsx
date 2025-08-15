import Link from "next/link";
import Image from "next/image";

type Broker = {
  name: string;
  logo: string;
  link: string;
};

const brokers: Broker[] = [
  {
    name: "Alice Blue",
    logo: "/alice-blue.png",
    link: "https://ekyc.aliceblueonline.com/?source=WRAJ1101",
  },
  {
    name: "Angel One",
    logo: "/angel-one.png",
    link: "https://a.aonelink.in/ANGOne/6pTAS0u",
  },
  {
    name: "Choice",
    logo: "/choice.png",
    link: "https://choiceindia.com/open-free-demat-account?refercode=QzAwMTExMzI=&source=Q0hPSUNFX0NPTk5Q1Q=",
  },
  {
    name: "Motilal Oswal",
    logo: "/motilal-oswal.png",
    link: "https://ekyc.motilaloswal.com/Partner/?diyid=8eb2b8cb-c9f3-47f5-b206-70c847d9f8b7",
  },
  {
    name: "Upstox",
    logo: "/upstox.png",
    link: "https://upstox.com/open-account/?f=4ZAVSY",
  },
  {
    name: "Nuvama",
    logo: "/nuvama.png",
    link: "https://onboarding.nuvamawealth.com/Partner?utm_source=EMPLOYEE&utm_campaign=43065&utm_content=ELITE&utm_term=1572814v",
  },
  {
    name: "Prudent",
    logo: "/prudent.png",
    link: "https://fundzbazar.com/Link/jRkmixvcvvw",
  },
];

export default function TransferDematPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-green-800 mb-4">
            Transfer Your Demat. Unlock Your Portfolio’s Potential.
          </h2>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            Move your holdings to our trusted broker partners and get{" "}
            <span className="font-semibold text-green-900">
              FREE premium research reports
            </span>{" "}
            & early market insights every morning — so you can invest smarter,
            grow faster.
          </p>
        </div>

        {/* Bonus Banner */}
        <div className="bg-green-600 text-white rounded-xl p-6 mb-12 text-center shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">
            🎁 Exclusive for Switchers!
          </h3>
          <p className="text-lg">
            Transfer your Demat today & get{" "}
            <span className="font-bold">3 months of Research Reports FREE</span>
          </p>
        </div>

        {/* How It Works */}
        <section className="bg-white border border-green-200 rounded-xl shadow-md p-8 mb-16">
          <h3 className="text-2xl font-bold text-green-800 text-center mb-8">
            How to Switch in 4 Simple Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                1
              </div>
              <h4 className="font-semibold text-green-800 mb-2">Choose Broker</h4>
              <p className="text-green-700 text-sm">
                Pick your preferred broker from our trusted partners.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                2
              </div>
              <h4 className="font-semibold text-green-800 mb-2">Fill Switch Form</h4>
              <p className="text-green-700 text-sm">
                Complete a quick online form to initiate your transfer.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                3
              </div>
              <h4 className="font-semibold text-green-800 mb-2">Submit KYC Docs</h4>
              <p className="text-green-700 text-sm">
                Upload PAN, Aadhaar, and other required documents.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                4
              </div>
              <h4 className="font-semibold text-green-800 mb-2">Start Trading</h4>
              <p className="text-green-700 text-sm">
                Your demat will be live in 24–48 hours. Start investing!
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="text-center mt-8">
            <Link
              href="#switch-form"
              className="px-8 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition"
            >
              Start Your Transfer →
            </Link>
          </div>
        </section>

        {/* Brokers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {brokers.map((broker) => (
            <Link key={broker.name} href={broker.link} target="_blank">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center hover:-translate-y-2 border border-green-200">
                <div className="w-20 h-20 mb-4 flex items-center justify-center bg-green-50 rounded-full">
                  <Image
                    src={broker.logo}
                    alt={`${broker.name} logo`}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-green-800">
                  {broker.name}
                </h3>
                <span className="mt-2 text-sm text-green-600 font-medium">
                  Switch & Get Rewards →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8 text-center border border-green-200">
          <h3 className="text-2xl font-bold text-green-800 mb-4">
            Why Switch With Us?
          </h3>
          <ul className="text-green-700 space-y-3 max-w-xl mx-auto">
            <li>✅ Zero Transfer Charges with our partner brokers</li>
            <li>✅ Daily Pre-Market Reports delivered to your inbox</li>
            <li>✅ Priority support for switched accounts</li>
            <li>✅ Exclusive investment strategies from experts</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
