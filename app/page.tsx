"use client";
import { useEffect, useState } from "react";
import { About } from "./components/organisms/About";
import { Hero } from "./components/molecules/Hero";
import { ProgramCards } from "./components/molecules/ProgramCards";
import { LoadingAnimation } from "./components/animations/LoadingAnimation";
import { Support } from "./components/molecules/Support";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }
  return (
    <main>
      <Hero />
      <ProgramCards />
      <About />
      <Support />
    </main>
  );
}
