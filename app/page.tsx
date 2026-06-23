"use client";

import { useState, useEffect } from "react";
import HomeMobile from "./(routes)/_components/HomeMobile";
import HomeDesktop from "./(routes)/_components/HomeDesktop";


export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isMounted) {
    return null;
  }

  return isMobile ? <HomeMobile /> : <HomeDesktop />;
}
