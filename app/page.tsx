"use client";

import { useState, useEffect } from "react";
import HomeMobile from "./(routes)/_components/HomeMobile";
import HomeDesktop from "./(routes)/_components/HomeDesktop";


export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile ? <HomeMobile /> : <HomeDesktop />;
}
