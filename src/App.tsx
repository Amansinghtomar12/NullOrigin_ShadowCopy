import { useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import CosmicBackground from "./components/CosmicBackground";
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import SponsorStrip from "./components/SponsorStrip";
import ScrollProgress from "./components/ScrollProgress";
import BootIntro from "./components/BootIntro";
import BackToTop from "./components/BackToTop";
import CursorRing from "./components/CursorRing";
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
import { useOperatorTouches } from "./hooks/useOperatorTouches";

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const state = useHomeState();
  // Keyed to the pathname: a route swap replaces the page's DOM, and the
  // element-binding effects (reveal sweep, 3D adoption) must re-run on it.
  useScrollReveal(pathname);
  useScrollDepth(pathname);
  useTilt();
  useOperatorTouches();

  // Route changes swap the whole page, so screen-reader and keyboard focus
  // would otherwise be stranded on an element that no longer exists. On
  // every navigation, land focus on the new page's h1.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    requestAnimationFrame(() => document.querySelector<HTMLElement>("h1")?.focus());
  }, [pathname]);

  const toRegister = () => navigate("/register");

  return (
    <Routes>
      <Route
        path="/register"
        element={
          <>
            <CursorRing />
            <RegistrationPage onBack={() => navigate("/")} />
          </>
        }
      />
      <Route
        path="*"
        element={
          <div id="top" className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
            <BootIntro />
            <a href="#main" className="skip-link">Skip to content</a>
            <CursorRing />
            <ScrollProgress />
            <CosmicBackground />
            <div className="above-cosmos">
              <Navbar
                audioEnabled={state.audioEnabled}
                onToggleSound={state.toggleSound}
                onRegister={toRegister}
              />

              {/* Hero */}
              <HomeHero {...state} onRegister={toRegister} />

              {/* Certification partner, surfaced before the fold-and-a-half */}
              <SponsorStrip />

              <main id="main" className="stage3d">
                <About />
                <Highlights />
                <Sponsors />
                <Impact />
                <Schedule />
                <Prizes />
                <Closer onRegister={toRegister} />
                <FAQ />
              </main>

              <SiteFooter />
              <BackToTop />
            </div>
          </div>
        }
      />
    </Routes>
  );
}
