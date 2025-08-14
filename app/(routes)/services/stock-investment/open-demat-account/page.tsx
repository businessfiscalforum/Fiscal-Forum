// app/page.tsx
import Image from "next/image";
import Link from "next/link";

type Broker = {
  name: string;
  logo: string;
  link: string;
};

const brokers: Broker[] = [
  {
    name: "Alice Blue",
    logo: "/alice-blue.png",
    link: "https://aliceblueonline.com/open-account-fill-kyc-request-call-back/",
  },
  {
    name: "Angel One",
    logo: "/angel-one.png",
    link: "https://www.angelone.in/open-demat-account",
  },
  {
    name: "Choice",
    logo: "/choice.png",
    link: "https://choiceindia.com/open-free-demat-account",
  },
  {
    name: "Motilal Oswal",
    logo: "/motilal-oswal.png",
    link: "https://www.motilaloswal.com/open-demat-account/",
  },
  {
    name: "Upstox",
    logo: "/upstox.png",
    link: "https://upstox.com/open-demat-account/?f=nk9q&gad_campaignid=20134767116",
  },
  {
    name: "Nuvama",
    logo: "/nuvama.png",
    link: "https://www.nuvamawealth.com/cas/microsite/Nuvama-Lite-Plan/?utm_adgroup=ADS_Brand_Nuvama_Exact&utm_placement=Ad_3&gad_campaignid=20813249225",
  },
  {
    name: "NJ Wealth",
    logo: "/Nj-wealth.png",
    link: "#", // no link provided yet
  },
  {
    name: "Prudent",
    logo: "/prudent.png",
    link: "#", // no link provided yet
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-700 py-25 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white text-center mb-4">
          Open Your Demat Account
        </h1>
        <p className="text-lg text-blue-100 text-center mb-12 max-w-2xl mx-auto">
          Choose a broker below to start your account opening process instantly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {brokers.map((broker) => (
            <Link key={broker.name} href={broker.link} target="_blank">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center hover:-translate-y-2 cursor-pointer">
                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                  <Image
                    src={broker.logo}
                    alt={`${broker.name} logo`}
                    width={80}
                    height={80}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {broker.name}
                </h2>
                <span className="mt-2 text-sm text-blue-600 font-medium">
                  Open Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
