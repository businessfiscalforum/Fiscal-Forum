"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  LineChart,
  Banknote,
  Shield,
  CreditCard,
  Landmark,
  FileText,
  Sparkles,
  Star,
  Zap,
  Gem,
  BarChart3,
} from "lucide-react";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  // Auto-close logic when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeAll();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAll = () => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  };

  const servicesDropdown = [
    {
      name: "Stock Investment",
      href: "/services/stock-investment",
      icon: <LineChart className="w-5 h-5 text-black" />,
    },
    {
      name: "Mutual Funds",
      href: "/services/mutual-funds",
      icon: <Banknote className="w-5 h-5 text-black" />,
    },
    {
      name: "Insurance",
      href: "/services/insurance",
      icon: <Shield className="w-5 h-5 text-black" />,
    },
    {
      name: "Credit Card",
      href: "/services/credit-card",
      icon: <CreditCard className="w-5 h-5 text-black" />,
    },
    {
      name: "Loan",
      href: "/services/loan",
      icon: <Landmark className="w-5 h-5 text-black" />,
    },
    {
      name: "Govt Bonds & FD",
      href: "/services/govt-bonds-and-fd",
      icon: <FileText className="w-5 h-5 text-black" />,
    },
  ];

  const navItems = [
    { label: "Reports", href: "/reports" },
    { label: "For Women", href: "/for-women" },
    { label: "News & IPOs", href: "/news" },
    { label: "About Us", href: "/about-us" },
    { label: "Newsletters", href: "/newsletter" },
    { label: "Work With Us", href: "/work-with-us" },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 z-[100] w-full bg-white border-b border-black px-4 py-3 md:py-4 shadow-none"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeAll}
          className="relative flex items-center gap-3"
        >
          <Image
            src="/forum1.ico"
            alt="Fiscal Forum"
            width={85}
            height={65}
            className="transition-transform active:scale-95"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Services dropdown toggle */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-black hover:text-emerald-700 transition-colors uppercase tracking-wider">
              <span>Services</span>
              <ChevronDown
                size={14}
                className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-[550px] pt-2"
                >
                  <div className="bg-white border border-black shadow-md rounded-2xl grid grid-cols-2 p-4 gap-2">
                    {servicesDropdown.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        onClick={closeAll}
                        className="flex items-center gap-4 p-3 hover:bg-emerald-50 border-2 border-transparent hover:border-black rounded-xl transition-all"
                      >
                        <div className="p-2 bg-emerald-100 border border-black rounded-lg">
                          {service.icon}
                        </div>
                        <span className="text-sm font-bold text-black uppercase tracking-wide">
                          {service.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navItems.map((item) => {
            if (item.label === "Reports") {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative overflow-hidden group flex items-center justify-center w-32 h-[2.5em] rounded-full bg-black/20 p-[1.5px] transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
                >
                  {/* Rotating border shine layer */}
                  <motion.div
                    className="absolute inset-0 w-[150%] h-[300%] -top-[100%] -left-[25%] pointer-events-none"
                    style={{
                      background: "conic-gradient(from 0deg, transparent 50%, #FFFFFF 65%, #FAF9F6 80%, #F4FBF7 95%, transparent 100%)",
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "linear",
                    }}
                  />

                  {/* Front content panel */}
                  <div className="absolute inset-[1.5px] rounded-full bg-[#E2F5E9] flex items-center justify-center gap-1.5 z-10 pointer-events-none">
                    <BarChart3 size={13} className="text-black stroke-[2.5]" />
                    <span className="text-xs font-bold text-black uppercase tracking-wider">{item.label}</span>
                  </div>
                </Link>
              );
            }
            const isForWomen = item.label === "For Women";
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-1.5 text-xs font-bold transition-colors uppercase tracking-wider ${
                  isForWomen ? "text-[#E11D48] hover:text-[#BE123C]" : "text-black hover:text-emerald-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/referrals"
            className="group flex items-center gap-2 px-3 py-1.5 border border-black rounded-xl bg-yellow-100 text-xs font-bold text-black uppercase tracking-wider shadow-sm  hover:-translate-y-0.5 hover:shadow-sm  active:translate-y-0 active:shadow-sm transition-all"
          >
            <Gem
              size={14}
              className="group-hover:rotate-12 transition-transform text-black"
            />
            <span>Refer & Earn</span>
          </Link>

          {isClient && (
            <>
              <SignedIn>
                <div className="flex items-center gap-4">
                  <Link href="/dashboard" onClick={closeAll}>
                    <Image
                      src={user?.imageUrl || "/user-icon.webp"}
                      alt="User"
                      width={35}
                      height={35}
                      className="rounded-full border border-black hover:shadow-sm transition-all"
                    />
                  </Link>
                  <SignOutButton>
                    <button className="text-[10px] font-bold text-black border border-black px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 transition-all uppercase shadow-sm">
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              </SignedIn>

              <SignedOut>
                <Link href="/sign-up">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#1FA463] border border-black px-6 py-2.5 text-white text-xs font-bold uppercase tracking-[0.2em] shadow-sm  hover:-translate-y-0.5 hover:shadow-md  active:translate-y-0 active:shadow-sm transition-all"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </SignedOut>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-black focus:outline-none"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-black overflow-hidden mt-3"
          >
            <div className="space-y-4 p-6">

              {/* Refer & Earn */}
              <Link
                href="/referrals"
                onClick={closeAll}
                className="flex items-center justify-center gap-2 p-3 border border-black rounded-xl bg-yellow-100 text-xs font-bold text-black uppercase tracking-wider shadow-sm"
              >
                <Gem size={14} />
                <span>Refer & Earn</span>
              </Link>

              {isClient && (
                <>
                  <SignedIn>
                    <div className="flex items-center justify-between bg-emerald-50 border border-black p-3.5 rounded-xl">
                      <Link
                        href="/dashboard"
                        onClick={closeAll}
                        className="flex items-center gap-3"
                      >
                        <Image
                          src={user?.imageUrl || "/user-icon.webp"}
                          alt="User"
                          width={36}
                          height={36}
                          className="rounded-full border border-black"
                        />
                        <span className="text-xs font-bold text-black uppercase tracking-wider">
                          Go Dashboard
                        </span>
                      </Link>

                      <SignOutButton>
                        <button className="text-[10px] font-bold text-black border border-black px-2.5 py-1.5 bg-red-100 rounded-lg uppercase cursor-pointer">
                          Sign Out
                        </button>
                      </SignOutButton>
                    </div>
                  </SignedIn>

                  <SignedOut>
                    <Link
                      href="/sign-up"
                      onClick={closeAll}
                      className="block w-full py-3.5 bg-[#1FA463] text-white border border-black font-bold text-center uppercase tracking-widest rounded-xl shadow-sm"
                    >
                      Get Started
                    </Link>
                  </SignedOut>
                </>
              )}
            </div>

            <div className="flex flex-col px-6 pb-6 gap-4">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-black pb-1.5">
                Our Services
              </p>
              <div className="grid grid-cols-2 gap-3">
                {servicesDropdown.map((s) => (
                  <Link
                    key={s.name}
                    href={s.href}
                    onClick={closeAll}
                    className="flex items-center gap-2.5 p-3 bg-gray-50 border border-black hover:border-black rounded-xl hover:bg-white transition-all"
                  >
                    <div className="w-4 h-4 text-black flex-shrink-0 flex items-center justify-center">
                      {s.icon}
                    </div>
                    <span className="text-[10px] font-bold text-black uppercase tracking-wide">
                      {s.name}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="h-0.5 bg-black/10 my-2" />

              <div className="flex flex-col gap-3">
                {navItems.map((item) => {
                  if (item.label === "Reports") {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={closeAll}
                        className="relative overflow-hidden group flex items-center justify-center w-full h-[3em] rounded-full bg-black/20 p-[1.5px] transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        {/* Rotating border shine layer */}
                        <motion.div
                          className="absolute inset-0 w-[150%] h-[300%] -top-[100%] -left-[25%] pointer-events-none"
                          style={{
                            background: "conic-gradient(from 0deg, transparent 50%, #FFFFFF 65%, #FAF9F6 80%, #F4FBF7 95%, transparent 100%)",
                          }}
                          animate={{
                            rotate: 360,
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: "linear",
                          }}
                        />

                        {/* Front content panel */}
                        <div className="absolute inset-[1.5px] rounded-full bg-[#E2F5E9] flex items-center gap-2 px-5 z-10 pointer-events-none">
                          <BarChart3 size={16} className="text-black stroke-[2.5]" />
                          <span className="text-base font-bold text-black uppercase tracking-wider">{item.label}</span>
                        </div>
                      </Link>
                    );
                  }
                  const isForWomen = item.label === "For Women";
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeAll}
                      className={`text-base font-bold uppercase tracking-wider ${
                        isForWomen ? "text-[#E11D48] hover:text-[#BE123C]" : "text-black"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
