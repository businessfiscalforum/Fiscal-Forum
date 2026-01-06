"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, LineChart, Banknote, Shield, CreditCard, Landmark, FileText, Sparkles, Star, Zap, Gem } from "lucide-react";
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
    { name: "Stock Investment", href: "/services/stock-investment", icon: <LineChart className="w-5 h-5 text-emerald-500" /> },
    { name: "Mutual Funds", href: "/services/mutual-funds", icon: <Banknote className="w-5 h-5 text-emerald-500" /> },
    { name: "Insurance", href: "/services/insurance", icon: <Shield className="w-5 h-5 text-emerald-500" /> },
    { name: "Credit Card", href: "/services/credit-card", icon: <CreditCard className="w-5 h-5 text-emerald-500" /> },
    // { name: "Saving Account", href: "/services/saving-account", icon: <PiggyBank className="w-5 h-5 text-green-600" /> },
    { name: "Loan", href: "/services/loan", icon: <Landmark className="w-5 h-5 text-emerald-500" /> },
    { name: "Govt Bonds & FD", href: "/services/govt-bonds-and-fd", icon: <FileText className="w-5 h-5 text-emerald-500" /> },
  ];

  const navItems = [
    { label: "News & IPOs", href: "/news" },
    { label: "About Us", href: "/about-us" },
    { label: "Newsletters", href: "/newsletter" },
    { label: "Reports", href: "/reports" },
  ];

  useEffect(() => { setIsClient(true); }, []);

  // Multi-Element Sparkle Logic
  const SparkleGenerator = ({ count = 5 }) => {
    return Array.from({ length: count }).map((_, i) => {
      const Icons = [Star, Sparkles, Zap, Gem];
      const PickedIcon = Icons[Math.floor(Math.random() * Icons.length)];
      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -20] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          className="absolute pointer-events-none text-yellow-400"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        >
          <PickedIcon size={Math.random() * 12 + 6} fill={Math.random() > 0.5 ? "currentColor" : "none"} />
        </motion.div>
      );
    });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 z-[100] w-full bg-white shadow-md px-4 py-4 md:py-5 border-b border-emerald-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        
        {/* Simple Clean Logo (No Borders/Circles) */}
        <Link href="/" onClick={closeAll} className="relative flex items-center gap-3">
          <Image src="/forum1.ico" alt="Fiscal Forum" width={65} height={65} className="transition-transform active:scale-95" />
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-black text-emerald-900 tracking-tighter">
              FISCAL <span className="text-emerald-500">FORUM</span>
            </h1>
            <p className="text-[9px] font-bold text-yellow-600 tracking-[0.3em] uppercase leading-none">Finserve</p>
          </div>
          {/* Subtle Sparkle on Logo */}
          <div className="absolute -top-1 -left-2 opacity-70">
            <Sparkles size={14} className="text-yellow-400 animate-pulse" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Services with Hover Detection */}
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-emerald-900 hover:text-emerald-600 transition-colors uppercase tracking-wide">
              Services <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-[550px] pt-2"
                >
                  <div className="bg-white border border-emerald-100 shadow-2xl rounded-sm grid grid-cols-2 p-4 relative overflow-hidden">
                    <SparkleGenerator count={8} />
                    {servicesDropdown.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        onClick={closeAll}
                        className="flex items-center gap-4 p-4 hover:bg-emerald-50 transition-all border-l-2 border-transparent hover:border-emerald-500"
                      >
                        <div className="p-2 bg-emerald-50 rounded-lg">{service.icon}</div>
                        <span className="text-sm font-bold text-emerald-900">{service.name}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-4 py-2 text-sm font-bold text-emerald-900 hover:text-emerald-600 transition-colors uppercase tracking-wide"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Action Side */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/referrals" className="group flex items-center gap-2 text-xs font-black text-yellow-600 uppercase tracking-widest">
            <Gem size={14} className="group-hover:rotate-12 transition-transform" />
            Refer & Earn
          </Link>

          {isClient && (
            <>
              <SignedIn>
                <div className="flex items-center gap-4">
                  <Link href="/dashboard" onClick={closeAll}>
                    <Image src={user?.imageUrl || "/user-icon.webp"} alt="User" width={35} height={35} className="rounded-full ring-2 ring-emerald-100" />
                  </Link>
                  <SignOutButton>
                    <button className="text-[10px] font-black text-red-500 hover:text-red-700 uppercase">Exit</button>
                  </SignOutButton>
                </div>
              </SignedIn>

              <SignedOut>
                <Link href="/sign-up">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-emerald-600 px-8 py-3 text-white text-xs font-black uppercase tracking-[0.2em] shadow-[5px_5px_0px_#10b98133]"
                  >
                    Get Started
                    <SparkleGenerator count={3} />
                  </motion.button>
                </Link>
              </SignedOut>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-emerald-900">
          {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-emerald-50 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Our Services</p>
              <div className="grid grid-cols-2 gap-2">
                {servicesDropdown.map((s) => (
                  <Link key={s.name} href={s.href} onClick={closeAll} className="flex items-center gap-2 p-3 bg-emerald-50 rounded-md">
                    {s.icon} <span className="text-[10px] font-bold text-emerald-900">{s.name}</span>
                  </Link>
                ))}
              </div>
              <div className="h-px bg-emerald-50 my-2" />
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} onClick={closeAll} className="text-lg font-black text-emerald-900 uppercase">
                  {item.label}
                </Link>
              ))}
              <SignedOut>
                <Link href="/sign-up" onClick={closeAll} className="w-full py-4 bg-emerald-600 text-white font-black text-center uppercase tracking-widest mt-4">
                  Join Now
                </Link>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}