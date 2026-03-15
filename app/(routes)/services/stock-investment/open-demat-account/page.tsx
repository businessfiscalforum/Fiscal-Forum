"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaCheck, // Added FaCheck for the modal list items
} from "react-icons/fa";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

// --- TYPES ---
type Broker = {
  name: string;
  logo: string;
  link: string;
  brokerage: string[];
};

// --- DATA ---
const brokers: Broker[] = [
  {
    name: "Alice Blue",
    logo: "/alice-blue.png",
    link: "https://ekyc.aliceblueonline.com/?source=WRAJ1101",
    brokerage: [
      "• Equity Delivery: 0.0%",
      "• Equity Futures: ₹20 per executed order or 0.05% (whichever is lower)",
      "• Equity Options: ₹20 per executed order",
      "• Currency Futures: ₹20 per executed order or 0.05% (whichever is lower)",
      "• Currency Options: ₹20 per executed order or 2.5% (whichever is lower)",
    ],
  },
  {
    name: "Angel One",
    logo: "/angel-one.png",
    link: "https://a.aonelink.in/ANGOne/6pTAS0u",
    brokerage: [
      "• Equity Delivery: ₹20 or 0.1% whichever is lower per executed order (minimum brokerage of INR 2 will be levied)",
      "• Equity Intraday: ₹20 or 0.03% (whichever is lower) per executed order",
      "• Futures, Options, Commodity, Currency: ₹20 per executed order",
    ],
  },
  {
    name: "Choice",
    logo: "/choice.png",
    link: "https://choiceindia.com/open-free-demat-account?refercode=QzAwMTExMzI=&source=Q0hPSUNFX0NPTk5FQ1Q=",
    brokerage: [
      "• Equity Delivery: 0.20% of transaction value",
      "• Equity Intraday: 0.02% of transaction value",
      "• Equity Futures: 0.02% of transaction value",
      "• Equity Options: ₹10 per lot",
    ],
  },
  // {
  //   name: "Motilal Oswal",
  //   logo: "/motilal-oswal.png",
  //   link: "https://ekyc.motilaloswal.com/Partner/?diyid=8eb2b8cb-c9f3-47f5-b206-70c847d9f8b7",
  //   brokerage: [
  //     "• Equity Delivery: 0.20% of transaction value",
  //     "• Equity Futures: 0.02% of transaction value",
  //     "• Equity Options: ₹20 per executed order (lot)",
  //   ],
  // },
  // {
  //   name: "Upstox",
  //   logo: "/upstox.png",
  //   link: "https://upstox.com/open-account/?f=4ZAVSY",
  //   brokerage: [
  //     "• ₹0 AMC*: Account Maintenance Charges (No account maintenance charges for the first year)",
  //     "• ₹20 Brokerage*: Maximum brokerage per order",
  //     "• Equity Delivery: ₹20 or 2.5% (whichever is lower)",
  //     "• Equity Intraday: ₹20 or 0.05% (whichever is lower)",
  //   ],
  // },
  {
    name: "Nuvama",
    logo: "/nuvama.png",
    link: "https://onboarding.nuvamawealth.com/Partner?utm_source=EMPLOYEE&utm_campaign=43065&utm_content=ELITE&utm_term=1572814v",
    brokerage: [
      "• Equity Delivery: 0.30%",
      "• Equity Intraday: 0.03%",
      "• Equity Futures: 0.03%",
      "• Equity Options: ₹75 per lot",
      "• Currency Futures: 0.02%",
      "• Currency Options: ₹20 per lot",
      "• Commodity Futures: 0.015%",
      "• Commodity Options: ₹30 per lot",
    ],
  },
  {
    name: "Dhan",
    logo: "/dhan.png",
    link: "https://invite.dhan.co/?join=DITA87",
    brokerage: [
      "• Equity Delivery, ETFs, IPOs: ₹0",
      "• Equity Intraday: ₹20 per executed order or 0.03% (whichever is lower)",
      "• Equity Futures: ₹20 per executed order or 0.03% (whichever is lower)",
      "• Equity Options: ₹20 per executed order",
      "• Commodity (Intraday/F&O): ₹20 per executed order or 0.03% (whichever is lower)",
    ],
  },
  {
    name: "Fyers",
    logo: "/fyers.png",
    link: "https://signup.fyers.in/?utm-source=AP-Leads&utm-medium=AP4384",
    brokerage: [
      "• Equity Intraday: ₹20 or 0.03% per executed order (whichever is lower)",
      "• Equity Delivery: ₹20 or 0.3% per executed order (whichever is lower)",
      "• Equity & Commodity Futures: ₹20 or 0.03% per executed order (whichever is lower)",
      "• Equity & Commodity Options: Flat ₹20 per executed order",
      "• Mutual Funds & IPOs: ₹0 (Free)",
    ],
  },
  // {
  //   name: "Prudent",
  //   logo: "/prudent.png",
  //   link: "https://fundzbazar.com/Link/jRkmixvcvvw",
  //   brokerage: [
  //     "• Equity Delivery: 0.30% of transaction value",
  //     "• Equity Intraday: 0.03% of transaction value",
  //     "• Equity Futures: 0.03% of transaction value",
  //     "• Equity Options: ₹15 per lot",
  //   ],
  // },
  // {
  //   name: "Unlisted Shares",
  //   logo: "/unlisted-shares.png",
  //   link: "/services/stock-investment/unlisted-shares/apply",
  //   brokerage: [
  //     "• Unlisted Shares: Brokerage as per deal basis. Contact us for the best rate.",
  //   ],
  // },
];

// --- MODIFIED SUB-COMPONENT: BrokerCard ---
const BrokerCard = ({
  broker,
  onOpenModal,
}: {
  broker: Broker;
  onOpenModal: (broker: Broker) => void;
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-green-200 overflow-hidden h-[420px] w-full">
      <div className="p-5 flex flex-col items-center text-center">
        <div className="w-24 h-24 mb-3 flex items-center justify-center bg-white rounded-full">
          <Image
            src={broker.logo}
            alt={`${broker.name} logo`}
            width={200}
            height={200}
            className="object-contain p-1"
          />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-green-800">
          {broker.name}
        </h2>
      </div>

      <div className="px-5 pb-4 text-left flex-grow">
        <h3 className="font-semibold text-green-800 mb-1 text-sm">
          Key Brokerage:
        </h3>
        <ul className="space-y-1">
          {broker.brokerage.slice(0, 3).map((detail, index) => (
            <li
              key={index}
              className="text-xs sm:text-sm text-green-900 leading-relaxed truncate"
            >
              {detail}
            </li>
          ))}
          {broker.brokerage.length > 3 && (
            <li
              className="text-xs text-green-700 font-semibold cursor-pointer pt-1"
              onClick={() => onOpenModal(broker)}
            >
              ... View All Details
            </li>
          )}
        </ul>
      </div>

      <div className="mt-auto p-3 bg-gray-50 border-t border-green-100">
        <button
          onClick={() => onOpenModal(broker)}
          className="w-full px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg text-sm font-semibold transition shadow-md"
        >
          Open Account
        </button>
      </div>
    </div>
  );
};

// --- MODAL COMPONENT ---
const DematAccountModal = ({
  isOpen,
  closeModal,
  broker,
}: {
  isOpen: boolean;
  closeModal: () => void;
  broker: Broker | null;
}) => {
  if (!broker) return null;
  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 z-50 overflow-y-auto">
        <DialogPanel
          transition
          className="w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-white shadow-2xl border border-gray-200 transform transition-all data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 sm:p-8">
            {/* Left Side: Logo & Quick Details */}
            <div className="flex flex-col items-center justify-start space-y-6 md:border-r md:pr-6 border-gray-100">
              <div className="text-center w-full relative">
                {/* Close Button for mobile/convenience */}
                <button
                  onClick={closeModal}
                  className="absolute top-0 right-0 md:hidden text-gray-500 hover:text-gray-900"
                >
                  <X size={24} />
                </button>

                <DialogTitle className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
                  {broker.name}
                </DialogTitle>
                <p className="text-green-600 text-base md:text-lg">
                  Trusted Mutual Fund Partner
                </p>
              </div>

              <div className="w-full flex items-center justify-center py-4 bg-green-50 rounded-xl border border-green-100">
                <Image
                  src={broker.logo}
                  alt={`${broker.name} Logo`}
                  width={150}
                  height={150}
                  className="object-contain max-h-[150px] max-w-[150px] p-2"
                />
              </div>

              {/* Account Opening Link Card */}
              <div className="w-full bg-emerald-50 rounded-xl p-4 text-center border border-emerald-100">
                <p className="text-sm text-emerald-800 font-semibold">
                  Direct Investment Link
                </p>
                <Link
                  href={broker.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeModal}
                  className="text-lg font-bold text-emerald-600 block truncate hover:text-emerald-700 transition"
                >
                  Click to View Plans
                </Link>
              </div>

              {/* Exclusive Reward Card */}
              <div className="w-full bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
                <p className="text-sm text-yellow-800 font-semibold">
                  Exclusive Fiscal Forum Bonus
                </p>
                <p className="text-lg font-bold text-yellow-600">
                  Personalized Investment Strategy
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-full px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl text-lg font-semibold mt-4 hidden md:block"
              >
                Close Comparison
              </button>
            </div>

            {/* Right Side: Detailed Brokerage List (Benefits) */}
            <div className="flex flex-col justify-start space-y-6">
              <div className="space-y-5 overflow-y-auto max-h-[70vh] pr-2">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                    Key Investment Benefits
                  </h3>
                  <ul className="space-y-3">
                    {broker.brokerage.map((detail, i) => (
                      <li
                        key={i}
                        className="text-lg text-gray-700 flex items-start gap-2"
                      >
                        <span className="text-green-500 mt-1 flex-shrink-0">
                          <FaCheck className="w-5 h-5" />
                        </span>
                        <span className="font-medium text-gray-800">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Apply Link (Repeated for convenience) */}
              <div className="flex flex-col justify-end gap-3 pt-4 border-t border-gray-200">
                <Link
                  href={broker.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeModal}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-xl text-lg font-bold flex items-center justify-center gap-2 shadow-lg transition"
                >
                  Open {broker.name} Account
                </Link>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl text-lg font-semibold md:hidden"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Page() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);

  const openModal = (broker: Broker) => {
    setSelectedBroker(broker);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBroker(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 pt-8">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-700 to-teal-700 mb-6 leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Open Your Demat Account &{" "}
            <span className="block mt-2">Unlock Exclusive Rewards</span>
          </motion.h1>
          <p className="text-base sm:text-lg text-green-700 max-w-3xl mx-auto font-medium leading-relaxed">
            Join thousands of investors getting{" "}
            <span className="font-bold text-green-900 bg-green-100/50 px-2 py-1 rounded-lg">
              free research reports & trading tips
            </span>{" "}
            when they open their account through us.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {brokers.map((broker) => (
            <motion.div
              key={broker.name}
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BrokerCard broker={broker} onOpenModal={openModal} />
            </motion.div>
          ))}
        </div>

        <DematAccountModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          broker={selectedBroker}
        />
      </div>
    </main>
  );
}
