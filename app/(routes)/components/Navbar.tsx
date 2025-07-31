"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { SignOutButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const path = event.composedPath();
      if (dropdownRef.current && !path.includes(dropdownRef.current)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "News & IPOs", href: "/news" },
    { label: "Work With Us", href: "/work-with-us" },
    { label: "Reports", href: "/reports" },
  ];

  const servicesDropdown = [
    "Loan",
    "Insurance",
    "Saving Account",
    "Stock Investment",
    "Mutual Funds",
    "Credit Card",
    "Govt Bonds & FD",
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
  bg-white/40 md:bg-white/40 
  backdrop-blur-md md:backdrop-blur-md 
  border border-green-200 shadow-lg 
  md:rounded-full rounded-md 
  px-4 md:px-8 py-3 md:py-4 
  max-w-7xl w-full"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Fiscal Forum" width={40} height={40} />
          <span className="text-xl font-bold text-green-900">Fiscal Forum</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-green-900">
          {/* Services Dropdown */}
          <div ref={dropdownRef} className="relative group">
            <div
              onClick={() => setServicesOpen((prev) => !prev)}
              className="flex items-center gap-1 cursor-pointer hover:text-green-600 relative"
            >
              Services <ChevronDown size={16} />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full" />
            </div>
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-green-100 rounded-md shadow-lg z-50">
                {servicesDropdown.map((service, i) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={`/services/${service
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-900"
                    >
                      {service}
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Other Nav Items */}
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="hover:text-green-600 transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {/* User Auth */}
          {isSignedIn ? (
            <div className="relative">
              <div
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="cursor-pointer"
              >
                <Image
                  src={"/globe.svg"}
                  alt="User Avatar"
                  className="rounded-full h-8 w-8 object-cover"
                  width={32}
                  height={32}
                />
              </div>

              {mobileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-green-900 border shadow-lg rounded-md z-50 p-2 space-y-1">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-green-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <SignOutButton>
                    <button className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 rounded">
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              )}
            </div>
          ) : (
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-green-600 to-green-400 text-white hover:from-green-700 hover:to-green-500 px-5 py-2 rounded-full">
                Register
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-green-700"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="mt-4 p-4 rounded-xl bg-white shadow-lg md:hidden z-50">
          <div className="mb-4">
            <p className="font-semibold text-green-800 mb-2">Services</p>
            {servicesDropdown.map((service) => (
              <Link
                key={service}
                href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-green-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                {service}
              </Link>
            ))}
          </div>

          <div className="mb-4  ">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className=" block py-2 font-semibold text-green-800 mb-2 "
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {isSignedIn ? (
            <div>
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-green-800 hover:bg-green-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <SignOutButton>
                <button className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 rounded">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          ) : (
            <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white hover:from-green-700 hover:to-green-500 py-2 mt-2">
                Register
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
