import React, { useState, useEffect } from "react";
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
import Preloader from "./components/Preloader";
import Lenis from "lenis";
import ScrollReveal from "./components/ScrollReveal";

export default function App() {
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

    let animId: number;
    function raf(time: number) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }
    animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  const [currentLang, setCurrentLang] = useState<string>("en");
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [initialRole, setInitialRole] = useState("patient");
  const [currentView, setCurrentView] = useState<"home" | "faq">(() => {
    return window.location.hash === "#faq" ? "faq" : "home";
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#faq") {
        setCurrentView("faq");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (currentView === "faq") {
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

  // Main Landing Page (Zero Fake Claims, No Inlined FAQs)
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#1A1814] font-sans selection:bg-[#1E4334] selection:text-[#C8F028]">
      <Preloader onComplete={() => setIsSiteLoaded(true)} />
      {/* 1. Sticky Navigation Bar */}
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        onOpenRoleModal={handleOpenRoleModal}
        onNavigateFaq={navigateToFaq}
      />

      <main className="flex-1 w-full">
        {/* 2. Hero Section: Generous top gap, clean serif headline, zero emojis */}
        <Hero
          isReady={isSiteLoaded}
          onOpenRoleModal={handleOpenRoleModal}
          onScrollTo={handleScrollTo}
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

      {/* Interactive Surface Simulator Modal */}
      <RoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        initialRole={initialRole}
      />
    </div>
  );
}
