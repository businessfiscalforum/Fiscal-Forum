import Link from "next/link";
import Image from "next/image";

type Broker = {
  name: string;
  logo: string;
  link: string;
};

const existingAccounts: Broker[] = [
  // {
  //   name: "Alice Blue",
  //   logo: "/alice-blue.png",
  //   link: "https://ekyc.aliceblueonline.com/?source=WRAJ1101",
  // },
  // {
  //   name: "Angel One",
  //   logo: "/angel-one.png",
  //   link: "https://a.aonelink.in/ANGOne/6pTAS0u",
  // },
  {
    name: "Choice",
    logo: "/choice.png",
    link: "https://choiceindia.com/mutual-funds-investment?refercode=QzAwMTExMzI=&source=Q0hPSUNFX0NPTk5FQ1Q=",
  },
  // {
  //   name: "Motilal Oswal",
  //   logo: "/motilal-oswal.png",
  //   link: "https://ekyc.motilaloswal.com/Partner/?diyid=8eb2b8cb-c9f3-47f5-b206-70c847d9f8b7",
  // },
  // {
  //   name: "Upstox",
  //   logo: "/upstox.png",
  //   link: "https://upstox.com/open-account/?f=4ZAVSY",
  // },
  {
    name: "Nuvama",
    logo: "/nuvama.png",
    link: "https://onboarding.nuvamawealth.com/Partner?utm_source=EMPLOYEE&utm_campaign=43065&utm_content=ELITE&utm_term=1572814",
  },
  {
    name: "NJ Wealth",
    logo: "/Nj-wealth.png",
    link: "https://www.njindiaonline.com/etada/partintiate.fin?cmdAction=showMenu&njBrcode=47283", // no link provided yet
  },
  {
    name: "Prudent",
    logo: "/prudent.png",
    link: "https://fundzbazar.com/Link/jRkmixvcvvw", // no link provided yet
  },
];

export default function AlreadyHaveAccount() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-700 py-25 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white text-center mb-4">
          Already Have an Account?
        </h2>
        <p className="text-lg text-blue-100 text-center mb-12 max-w-2xl mx-auto">
          Login to your existing broker account and start trading instantly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {existingAccounts.map((broker) => (
            <Link key={broker.name} href={broker.link} target="_blank">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center hover:-translate-y-2 cursor-pointer">
                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                  <Image
                    src={broker.logo}
                    alt={`${broker.name} logo`}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {broker.name}
                </h3>
                <span className="mt-2 text-sm text-green-600 font-medium">
                  Login →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
