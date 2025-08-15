// components/BrokerInfiniteScroll.tsx
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const brokers = [
  { name: "Alice Blue", logo: "/alice-blue.png" },
  { name: "Angel One", logo: "/angel-one.png" },
  { name: "Choice", logo: "/choice.png" },
  { name: "Motilal Oswal", logo: "/motilal-oswal.png" },
  { name: "Upstox", logo: "/upstox.png" },
  { name: "Nuvama", logo: "/nuvama.png" },
  { name: "Prudent", logo: "/prudent.png" },
];

export const BrokerInfiniteScroll = () => {
  // Duplicate brokers to ensure seamless scroll
  const repeatedBrokers = [...brokers, ...brokers, ...brokers,...brokers, ...brokers, ...brokers,...brokers, ...brokers, ...brokers,...brokers, ...brokers, ...brokers]; // 3x for smoothness

  return (
    <div className="relative h-[90vh] w-40 overflow-hidden">
      {/* Gradient overlay at top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none"></div>

      <motion.div
        className="flex flex-col gap-8 py-8"
        animate={{ y: ["0%", "-100%"] }} 
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 40, 
          },
        }}
        style={{ display: "flex" }}
      >
        {repeatedBrokers.map((broker, index) => (
          <div
            key={`${broker.name}-${index}`}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 flex-shrink-0">
              <Image
                src={broker.logo}
                alt={broker.name}
                width={100}
                height={100}
                className="w-full h-full object-contain"
              />
            </div>
            {/* <span className="text-xs text-gray-600 mt-2 text-center px-2">
              {broker.name}
            </span> */}
          </div>
        ))}
      </motion.div>
    </div>
  );
};