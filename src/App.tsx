import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import { REGISTER_URL } from "./constants";
import { useHomeState } from "./hooks/useHomeState";
import { useScrollReveal } from "./components/ui";
import { useScrollDepth } from "./hooks/useScrollDepth";
import { useTilt } from "./hooks/useTilt";
import { useOperatorTouches } from "./hooks/useOperatorTouches";

/** Registration lives on the CTF platform now. The host redirects
    /register at the edge; this route is only the fallback for an in-app
    navigation to the old path, and it forwards there too. */
function RegisterRedirect() {
  useEffect(() => {
    window.location.replace(REGISTER_URL);
  }, []);
  return (
    <main style={{ fontFamily: "monospace", padding: "2rem", color: "#ddd", background: "#0b0b0d", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "1rem", fontWeight: 400 }}>
        Taking you to <a href={REGISTER_URL} style={{ color: "#ff3355" }}>ctf.cyberhx.com</a>…
      </h1>
    </main>
  );
}

export default function App() {
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

  return (
    <Routes>
      <Route path="/register" element={<RegisterRedirect />} />
      {/* Unknown paths never reach the app: the host answers them with its
          own 404. This route only exists for a client-side navigation to a
          path that does not exist, and says the same thing plainly. */}
      <Route
        path="*"
        element={
          <main style={{ fontFamily: "monospace", padding: "2rem", color: "#ddd", background: "#0b0b0d", minHeight: "100vh" }}>
            <h1 style={{ fontSize: "1rem", fontWeight: 400 }}>404 Not Found</h1>
          </main>
        }
      />
      <Route
        path="/"
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
              />

              {/* Hero */}
              <HomeHero {...state} />

              {/* Certification partner, surfaced before the fold-and-a-half */}
              <SponsorStrip />

              <main id="main" className="stage3d">
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
        }
      />
    </Routes>
  );
}
