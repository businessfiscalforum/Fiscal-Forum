"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // <-- Fix hydration mismatch

  const navItems = [
    { label: "News & IPOs", href: "/news" },
    { label: "Work With Us", href: "/work-with-us" },
    { label: "Reports", href: "/reports" },
    { label : "Refer & Earn", href:"/referrals"}
  ];

  const servicesDropdown = [
    { name: "Stock Investment", href: "/services/stock-investment" },
    { name: "Mutual Funds", href: "/services/mutual-funds" },
    { name: "Insurance", href: "/services/insurance" },
    { name: "Credit Card", href: "/services/credit-card" },
    { name: "Saving Account", href: "/services/saving-account" },
    { name: "Loan", href: "/services/loan" },
    { name: "Govt Bonds & FD", href: "/services/govt-bonds-&-fd" },
  ];

  const closeAll = () => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  };

  // Mark as client-side after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav
      className="fixed z-50 w-full 
  bg-white
   shadow-lg 
  px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12
  py-4
  "
    >
      <div className="flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-full flex items-center justify-center p-1 overflow-hidden">
              <Image
                src="/forum1.ico"
                alt="Fiscal Forum"
                width={80}
                height={80}
              />
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium text-green-900">
          {/* Services Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1 text-green-800 hover:text-green-600 font-medium transition-colors py-2 relative"
              aria-expanded={servicesOpen}
            >
              Services
              <ChevronDown
                size={16}
                className={`${servicesOpen ? "rotate-180" : ""} transition-transform`}
              />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
            </button>

            {servicesOpen && (
              <div
                className="fixed top-[100px] left-1/2 -translate-x-1/2
  w-[calc(100vw-2rem)] max-w-7xl
  bg-white border border-green-100 shadow-2xl z-50"
              >
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 md:px-6 md:py-4 border-b border-green-100">
                  <h3 className="text-base md:text-lg font-bold text-green-900">
                    Our Financial Services
                  </h3>
                  <p className="text-xs md:text-sm text-green-700">
                    Comprehensive solutions for your financial growth
                  </p>
                </div>

                <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {servicesDropdown.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      onClick={closeAll}
                      className="group/item p-3 md:p-4 rounded-xl border border-green-100 hover:border-green-300 hover:shadow-md transition-all duration-300 bg-white"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-green-100 flex items-center justify-center group-hover/item:bg-green-600 transition-colors">
                            <div className="w-4 h-4 md:w-5 md:h-5 rounded-sm bg-green-600 group-hover/item:bg-white transition-colors"></div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-900 group-hover/item:text-green-700 transition-colors text-sm md:text-base">
                            {service.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Tailored {service.name.toLowerCase()} solutions
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="px-4 py-3 md:px-6 md:py-4 bg-green-50 border-t border-green-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <p className="text-xs md:text-sm text-green-700">
                      Need personalized financial advice?
                    </p>
                    <Link
                      href="/contact"
                      className="text-xs md:text-sm font-medium text-green-700 hover:text-green-900 underline"
                      onClick={closeAll}
                    >
                      Contact Our Experts
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Other Nav Items */}
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-green-600 transition-colors py-2"
              onClick={closeAll}
            >
              {item.label}
            </Link>
          ))}

          {/* Authenticated User Menu or Sign Up */}
          {isClient ? (
            <SignedIn>
              <div className="relative">
                <button
                  className="flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <Image
                    src={user?.imageUrl || "/user-icon.webp"}
                    alt={user?.fullName || "User"}
                    width={32}
                    height={32}
                    className="rounded-full border border-green-200"
                  />
                </button>

                {mobileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-green-900 border border-green-100 shadow-lg rounded-lg z-50 py-2">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2.5 hover:bg-green-50 text-sm"
                      onClick={closeAll}
                    >
                      Dashboard
                    </Link>
                    <SignOutButton>
                      <button
                        className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 text-sm"
                        onClick={closeAll}
                      >
                        Sign Out
                      </button>
                    </SignOutButton>
                  </div>
                )}
              </div>
            </SignedIn>
          ) : null}

          {isClient ? (
            <SignedOut>
              <Link href="/sign-up">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  Register
                </button>
              </Link>
            </SignedOut>
          ) : null}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-green-700 p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="mt-4 bg-white shadow-xl md:hidden border border-green-100 rounded-lg">
          <div>
            <button
              className="flex items-center justify-between w-full px-4 py-3 text-green-900 font-medium"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              <span>Services</span>
              <ChevronDown
                size={20}
                className={`${servicesOpen ? "rotate-180" : ""} transition-transform`}
              />
            </button>

            {servicesOpen && (
              <div className="bg-green-50 border-t border-green-100">
                {servicesDropdown.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block px-4 py-3 text-sm text-gray-700 border-b border-green-50 last:border-0 hover:bg-green-100"
                    onClick={closeAll}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-3 text-sm text-gray-700 border-b border-green-50 last:border-0 hover:bg-green-50"
                onClick={closeAll}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile User Section */}
          {isClient ? (
            <SignedIn>
              <Link
                href="/dashboard"
                className="block px-4 py-3 text-sm text-green-700 hover:bg-green-50"
                onClick={closeAll}
              >
                Dashboard
              </Link>
              <div className="px-4 py-3 border-b border-green-50">
                <SignOutButton>
                  <button className="w-full bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-lg text-sm font-medium">
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            </SignedIn>
          ) : null}

          {isClient ? (
            <SignedOut>
              <div className="px-4 py-3">
                <Link href="/sign-up">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium">
                    Register
                  </button>
                </Link>
              </div>
            </SignedOut>
          ) : null}
        </div>
      )}
    </nav>
  );
}