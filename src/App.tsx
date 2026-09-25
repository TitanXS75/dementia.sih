import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PainPointsSection from "./components/PainPointsSection";
import CueBundleSection from "./components/CueBundleSection";
import ManifestoSection from "./components/ManifestoSection";
import HowItWorks from "./components/HowItWorks";
import ComparisonSection from "./components/ComparisonSection";
import SurfacesBento from "./components/SurfacesBento";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";
import RoleModal from "./components/RoleModal";
import FaqPage from "./components/FaqPage";
import AuthPage from "./components/AuthPage";
import Preloader from "./components/Preloader";
import Lenis from "lenis";
import ScrollReveal from "./components/ScrollReveal";
import EdgeVoiceConsole from "./components/edge-ai/EdgeVoiceConsole";
import ActiveActionExecutionModal from "./components/edge-ai/ActiveActionExecutionModal";
import { ToolExecutionResult } from "./lib/edge-ai/edgeEngine";
import { Mic } from "lucide-react";

export default function App() {
  const routerNavigate = useNavigate();
  const [isSiteLoaded, setIsSiteLoaded] = useState(false);

  // Lenis Butter-Smooth Inertia Scroll
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    (window as any).__lenis = lenis;

    let animId: number;
    function raf(time: number) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }
    animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      (window as any).__lenis = null;
    };
  }, []);

  const [currentLang, setCurrentLang] = useState<string>("en");
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [initialRole, setInitialRole] = useState("patient");
  const [isEdgeConsoleOpen, setIsEdgeConsoleOpen] = useState(false);
  const [activeExecutionResult, setActiveExecutionResult] = useState<ToolExecutionResult | null>(null);

  // Freeze background page scroll completely whenever any modal is open
  const isAnyModalOpen = isRoleModalOpen || isEdgeConsoleOpen || Boolean(activeExecutionResult);
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (lenis) lenis.start();
    }
  }, [isAnyModalOpen]);

  const [currentView, setCurrentView] = useState<"home" | "faq">(() => {
    if (window.location.hash === "#faq") return "faq";
    return "home";
  });

  // Re-sync Lenis dimensions and smooth scroll whenever view changes or site finishes preloading
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (!lenis) return;

    if (!isAnyModalOpen) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      lenis.start();
    }

    const timer = setTimeout(() => {
      lenis.resize();
    }, 100);
    return () => clearTimeout(timer);
  }, [currentView, isSiteLoaded, isAnyModalOpen]);


  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#faq") {
        setCurrentView("faq");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (["faq"].includes(currentView)) {
        setCurrentView("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [currentView]);

  const handleOpenRoleModal = (role?: string) => {
    if (role) setInitialRole(role);
    setIsRoleModalOpen(true);
  };

  const handleScrollTo = (id: string) => {
    if (currentView !== "home") {
      setCurrentView("home");
      window.location.hash = "";
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToFaq = () => {
    setCurrentView("faq");
    window.location.hash = "#faq";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToHome = () => {
    setCurrentView("home");
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToLogin = () => {
    routerNavigate("/login");
  };

  const navigateToSignup = () => {
    routerNavigate("/signup");
  };

  // Dedicated Separate FAQ Page View
  if (currentView === "faq") {
    return (
      <>
        <FaqPage
          onNavigateHome={navigateToHome}
          onOpenRoleModal={handleOpenRoleModal}
          currentLang={currentLang}
          onSelectLang={setCurrentLang}
        />
        <RoleModal
          isOpen={isRoleModalOpen}
          onClose={() => setIsRoleModalOpen(false)}
          initialRole={initialRole}
        />
      </>
    );
  }

  // Auth is now handled by React Router — no need for auth view here


  // Main Landing Page (Zero Fake Claims, No Inlined FAQs)
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#1A1814] font-sans selection:bg-[#1E4334] selection:text-[#FAF7F2]">
      <Preloader onComplete={() => setIsSiteLoaded(true)} />

      {/* 1. Sticky Navigation Bar */}
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        onOpenRoleModal={handleOpenRoleModal}
        onNavigateFaq={navigateToFaq}
        onNavigateLogin={navigateToLogin}
        onNavigateSignup={navigateToSignup}
      />

      <main className="flex-1 w-full">
        {/* 2. Hero Section */}
        <Hero
          isReady={isSiteLoaded}
          onOpenRoleModal={handleOpenRoleModal}
          onScrollTo={handleScrollTo}
          onNavigateLogin={navigateToLogin}
        />

        {/* 3. Second Section: Fits completely in 1 view on desktop/laptop */}
        <ScrollReveal distance={36} duration={950}>
          <PainPointsSection />
        </ScrollReveal>

        {/* 4. Ecosystem: 5 Authentic capabilities */}
        <ScrollReveal distance={36} duration={950}>
          <CueBundleSection onOpenRoleModal={handleOpenRoleModal} />
        </ScrollReveal>

        {/* 5. Dementia Empathy Manifesto */}
        <ScrollReveal distance={36} duration={950}>
          <ManifestoSection />
        </ScrollReveal>

        {/* 6. How It Works: 5 Real Steps from Daylight orientation to Calm twilight */}
        <ScrollReveal distance={36} duration={950}>
          <HowItWorks />
        </ScrollReveal>

        {/* 7. Honest Comparison Table */}
        <ScrollReveal distance={36} duration={950}>
          <ComparisonSection />
        </ScrollReveal>

        {/* 8. 3 Digital Surfaces On Demand */}
        <ScrollReveal distance={36} duration={950}>
          <SurfacesBento onOpenRoleModal={handleOpenRoleModal} />
        </ScrollReveal>

        {/* 9. Early Family Access & Clinical Pilot Form */}
        <ScrollReveal distance={36} duration={950}>
          <CtaSection onOpenRoleModal={() => handleOpenRoleModal()} />
        </ScrollReveal>
      </main>

      {/* 10. Footer */}
      <Footer
        onOpenRoleModal={handleOpenRoleModal}
        onScrollTo={handleScrollTo}
        onNavigateFaq={navigateToFaq}
      />

      {/* Simple, compact floating voice assistant trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsEdgeConsoleOpen(true)}
          className="w-12 h-12 rounded-full bg-[#1E4334] hover:bg-[#142F24] text-[#C8F028] shadow-xl flex items-center justify-center border border-[#C8F028]/30 transition-all hover:scale-105 active:scale-95 group focus:outline-none"
          title="Voice & Clinical Assistant (Offline)"
          aria-label="Open Voice & Clinical Assistant"
        >
          <Mic className="w-5 h-5 text-[#C8F028] transition-transform group-hover:scale-110" />
        </button>
      </div>

      {/* On-Device Edge AI Voice & Triage Console */}
      <EdgeVoiceConsole
        isOpen={isEdgeConsoleOpen}
        onClose={() => setIsEdgeConsoleOpen(false)}
        onExecuteTool={(res) => {
          setActiveExecutionResult(res);
        }}
      />

      {/* Active Action Execution Modal (Triggered by tool dispatch) */}
      <ActiveActionExecutionModal
        result={activeExecutionResult}
        onClose={() => setActiveExecutionResult(null)}
      />

      {/* Interactive Surface Simulator Modal */}
      <RoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        initialRole={initialRole}
      />
    </div>
  );
}
