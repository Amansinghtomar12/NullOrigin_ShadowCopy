import { useState } from "react";
import CosmicBackground from "./components/CosmicBackground";
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import SponsorStrip from "./components/SponsorStrip";
import ScrollProgress from "./components/ScrollProgress";
import BootIntro from "./components/BootIntro";
import BackToTop from "./components/BackToTop";
import HomeSidebar from "./components/HomeSidebar";
import AmbientLogs from "./components/AmbientLogs";
import About from "./components/sections/About";
import Highlights from "./components/sections/Highlights";
import Sponsors from "./components/sections/Sponsors";
import Impact from "./components/sections/Impact";
import Schedule from "./components/sections/Schedule";
import Prizes from "./components/sections/Prizes";
import Closer from "./components/sections/Closer";
import FAQ from "./components/sections/FAQ";
import SiteFooter from "./components/SiteFooter";
import RegistrationPage from "./components/RegistrationPage";
import { useHomeState } from "./hooks/useHomeState";
import { useScrollReveal } from "./components/ui";
import { useScrollDepth } from "./hooks/useScrollDepth";
import { useTilt } from "./hooks/useTilt";

export default function App() {
  const [page, setPage] = useState<"home" | "register">("home");
  const state = useHomeState();
  useScrollReveal();
  useScrollDepth();
  useTilt();

  if (page === "register") {
    return <RegistrationPage onBack={() => setPage("home")} />;
  }

  return (
    <div id="top" className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      <BootIntro />
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <CosmicBackground />
      <div className="above-cosmos">
        <Navbar
          audioEnabled={state.audioEnabled}
          onToggleSound={state.toggleSound}
          onRegister={() => setPage("register")}
        />

        {/* Hero */}
        <HomeHero {...state} onRegister={() => setPage("register")} />

        {/* Certification partner, surfaced before the fold-and-a-half */}
        <SponsorStrip />



        <main id="main" className="stage3d">
        {/* New design sections */}
        <About />
        <Highlights />
        <Sponsors />
        <Impact />
        <Schedule />
        <Prizes />
        <Closer />
        <FAQ />
        </main>

        <SiteFooter />
        <BackToTop />
      </div>
    </div>
  );
}