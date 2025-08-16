"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navItems = [
    { label: "News & IPOs", href: "/news" },
    { label: "Work With Us", href: "/work-with-us" },
    { label: "Reports", href: "/reports" },
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

  // Simple close function
  const closeAll = () => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
      bg-white/40 backdrop-blur-md 
      border border-green-200 shadow-lg 
      md:rounded-full rounded-lg 
      px-4 md:px-6 py-3 md:py-4 
      max-w-7xl w-[95%] md:w-full">
      
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className=" rounded-full flex items-center justify-center p-1  overflow-hidden">
              <Image src="/forum1.ico" alt="Fiscal Forum" width={32} height={32} />
            </div>
            <span className="text-xl font-bold text-green-900 hidden sm:block">
              Fiscal Forum
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium text-green-900">
          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1 hover:text-green-600 transition-colors py-2"
              aria-expanded={servicesOpen}
            >
              Services <ChevronDown size={16} className={`${servicesOpen ? 'rotate-180' : ''} transition-transform`} />
            </button>
            
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-green-100 rounded-lg shadow-xl z-50 py-2">
                {servicesDropdown.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                    onClick={closeAll}
                  >
                    {service.name}
                  </Link>
                ))}
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

          {/* User Auth */}
          {isSignedIn ? (
            <div className="relative">
              <button
                className="flex items-center gap-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <div className="bg-green-100 rounded-full p-1.5">
                  <div className="bg-green-600 rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">U</span>
                  </div>
                </div>
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
          ) : (
            <Link href="/sign-up">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                Register
              </button>
            </Link>
          )}
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

      {/* Mobile Nav Drawer - COMPLETELY SIMPLIFIED */}
      {mobileMenuOpen && (
        <div className="mt-4 bg-white shadow-xl md:hidden border border-green-100 rounded-lg">
          {/* Services Section */}
          <div>
            <button 
              className="flex items-center justify-between w-full px-4 py-3 text-green-900 font-medium"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              <span>Services</span>
              <ChevronDown size={20} className={`${servicesOpen ? 'rotate-180' : ''} transition-transform`} />
            </button>
            
            {servicesOpen && (
              <div className="bg-green-50 border-t border-green-100">
                {servicesDropdown.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block px-4 py-3 text-sm text-gray-700 border-b border-green-50 last:border-0 hover:bg-green-100"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <div>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-3 text-sm text-gray-700 border-b border-green-50 last:border-0 hover:bg-green-50"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div>
            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-4 py-3 text-sm text-green-700 hover:bg-green-50"
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
              </>
            ) : (
              <div className="px-4 py-3">
                <Link href="/sign-up">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}