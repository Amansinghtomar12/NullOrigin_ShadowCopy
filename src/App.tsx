import { useState } from "react";
import HackerBackground from "./components/HackerBackground";
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import HomeSidebar from "./components/HomeSidebar";
import AmbientLogs from "./components/AmbientLogs";
import About from "./components/sections/About";
import Highlights from "./components/sections/Highlights";
// import Sponsors from "./components/sections/Sponsors"; // hidden for now
import Impact from "./components/sections/Impact";
import Schedule from "./components/sections/Schedule";
import Prizes from "./components/sections/Prizes";
import Closer from "./components/sections/Closer";
import FAQ from "./components/sections/FAQ";
import SiteFooter from "./components/SiteFooter";
import RegistrationPage from "./components/RegistrationPage";
import { useHomeState } from "./hooks/useHomeState";
import { useScrollReveal } from "./components/ui";

export default function App() {
  const [page, setPage] = useState<"home" | "register">("home");
  const state = useHomeState();
  useScrollReveal();

  if (page === "register") {
    return <RegistrationPage onBack={() => setPage("home")} />;
  }

  return (
    <div id="top" className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      <HackerBackground />
      <div className="relative z-10">
        <Navbar
          audioEnabled={state.audioEnabled}
          onToggleSound={state.toggleSound}
          onRegister={() => setPage("register")}
        />

        {/* Hero section — wowi_wowi marquee style */}
        <HomeHero {...state} onRegister={() => setPage("register")} />



        {/* New design sections */}
        <About />
        <Highlights />
        {/* Sponsors hidden for now — re-enable by uncommenting <Sponsors /> below */}
        {/* <Sponsors /> */}
        <Impact />
        <Schedule />
        <Prizes />
        <Closer />
        <FAQ />

        <SiteFooter />
      </div>
    </div>
  );
}