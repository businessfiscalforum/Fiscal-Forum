import Link from "next/link";
import Image from "next/image";

type Broker = {
  name: string;
  logo: string;
  loginLink: string;
};

const existingAccounts: Broker[] = [
  {
    name: "Alice Blue",
    logo: "/alice-blue.png",
    loginLink: "https://aliceblueonline.com",
  },
  {
    name: "Angel One",
    logo: "/angel-one.png",
    loginLink: "https://trade.angelone.in/",
  },
  {
    name: "Choice",
    logo: "/choice.png",
    loginLink: "https://trade.choiceindia.com/",
  },
  {
    name: "Motilal Oswal",
    logo: "/motilal-oswal.png",
    loginLink: "https://login.motilaloswal.com/",
  },
  {
    name: "Upstox",
    logo: "/upstox.png",
    loginLink: "https://pro.upstox.com/",
  },
  {
    name: "Nuvama",
    logo: "/nuvama.png",
    loginLink: "https://trade.nuvamawealth.com/",
  },
  {
    name: "NJ Wealth",
    logo: "/Nj-wealth.png",
    loginLink: "https://www.njwealth.in/Login",
  },
  {
    name: "Prudent",
    logo: "/prudent.png",
    loginLink: "https://www.prudentcorporate.com/Login",
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
            <Link key={broker.name} href={broker.loginLink} target="_blank">
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
