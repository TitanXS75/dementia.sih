import React, { useState, useEffect } from "react";
import {
  SunMedium,
  Radio,
  Image as ImageIcon,
  Stethoscope,
  ShieldCheck,
  FileCheck2,
} from "lucide-react";

interface HeroProps {
  onOpenRoleModal: (role?: string) => void;
  onScrollTo: (id: string) => void;
  isReady?: boolean;
}

type RoleType = "patient" | "asha";

export default function Hero({ onOpenRoleModal, onScrollTo, isReady = false }: HeroProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => setAnimate(true), 60);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  // Fallback so it is never hidden under any circumstance
  useEffect(() => {
    const fallback = setTimeout(() => setAnimate(true), 2400);
    return () => clearTimeout(fallback);
  }, []);
  const [activeRole, setActiveRole] = useState<RoleType>("patient");

  const [currentTime, setCurrentTime] = useState<string>(() => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  });

  const [greeting, setGreeting] = useState<string>(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "সুপ্ৰভাত, দেউতা!";
    if (hour < 17) return "শুভ অপৰাহ্ন, দেউতা!";
    return "শুভ সন্ধ্যা, দেউতা!";
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      const hour = now.getHours();
      if (hour < 12) setGreeting("সুপ্ৰভাত, দেউতা!");
      else if (hour < 17) setGreeting("শুভ অপৰাহ্ন, দেউতা!");
      else setGreeting("শুভ সন্ধ্যা, দেউতা!");
    };

    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full min-h-[calc(100vh-5rem)] min-h-[calc(100dvh-5rem)] flex flex-col justify-center bg-[#F7F5F0] py-8 sm:py-12 lg:py-16 overflow-hidden relative border-b border-[#1E4334]/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Headline */}
            <h1 className={`font-serif text-4xl sm:text-6xl lg:text-7xl text-primary tracking-tight font-normal leading-[1.12] mb-6 sm:mb-7 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Every memory <br className="hidden sm:inline" />
              <span className="font-medium text-secondary pb-1 inline-block border-b-2 border-secondary/30">
                matters.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className={`text-lg sm:text-xl lg:text-2xl text-on-surface-variant mb-8 sm:mb-10 max-w-xl leading-relaxed font-normal transition-all duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Gentle cognitive games, familiar family voices, and culturally rooted reminiscence therapy for elderly loved ones across Northeast India.
            </p>

            {/* CTA Button Row */}
            <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}>
              <button
                onClick={() => onScrollTo("how-it-works")}
                className="inline-flex items-center justify-center px-8 py-4 rounded-none bg-[#1E4334] text-[#F7F5F0] hover:bg-[#142F24] font-semibold text-sm sm:text-base transition-all shadow-xl active:scale-95 cursor-pointer border border-[#1E4334]"
              >
                <span>See How It Works</span>
              </button>

              <button
                onClick={() => onOpenRoleModal(activeRole)}
                className="inline-flex items-center justify-center px-8 py-4 rounded-none bg-white text-[#1A1814] hover:bg-[#F7F5F0] font-semibold text-sm sm:text-base border-2 border-[#1A1814]/15 transition-all shadow-sm cursor-pointer"
              >
                Explore Surface Apps
              </button>
            </div>
          </div>

          {/* Right Hero Visual: 2-Role Interactive Switcher (Constant Height, Simple) */}
          <div className={`lg:col-span-6 w-full transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            animate ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.98]"
          }`}>
            <div className="border-2 border-[#1E4334] bg-white shadow-2xl rounded-none flex flex-col h-[440px]">
              
              {/* 2 Role Navigation Tabs */}
              <div className="grid grid-cols-2 border-b-2 border-[#1E4334] bg-[#F7F5F0] shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveRole("patient")}
                  className={`py-4 px-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer rounded-none border-r border-[#1E4334]/20 ${
                    activeRole === "patient"
                      ? "bg-[#1E4334] text-[#C8F028]"
                      : "text-[#1A1814] hover:bg-black/5"
                  }`}
                >
                  <SunMedium className="w-4 h-4 shrink-0" />
                  <span>Elder Bedside Tablet</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRole("asha")}
                  className={`py-4 px-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer rounded-none ${
                    activeRole === "asha"
                      ? "bg-[#1E4334] text-[#C8F028]"
                      : "text-[#1A1814] hover:bg-black/5"
                  }`}
                >
                  <Stethoscope className="w-4 h-4 shrink-0" />
                  <span>Doctor &amp; Frontline ASHA</span>
                </button>
              </div>

              {/* Constant-Height Body */}
              <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between text-left overflow-hidden bg-white">
                
                {/* 1. ELDER TABLET MODE */}
                {activeRole === "patient" && (
                  <>
                    <div>
                      {/* Clean Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#1E4334]/15 mb-4">
                        <div>
                          <h3 className="font-serif text-lg sm:text-xl text-[#1A1814] flex items-center gap-2 flex-wrap">
                            <span>{greeting}</span>
                            <span className="text-[#1E4334]/40">·</span>
                            <span className="font-mono text-base sm:text-lg font-bold text-[#1E4334] tracking-tight">
                              {currentTime}
                            </span>
                          </h3>
                          <p className="text-xs text-on-surface-variant font-sans mt-0.5">
                            Live daylight orientation clock for the bedside
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-[#92400E] bg-[#FEF3C7] px-2.5 py-0.5 border border-[#D97706]/30 uppercase tracking-wider">
                          Living Room
                        </span>
                      </div>

                      {/* 2 Big Simple Buttons */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="p-3.5 bg-[#F7F5F0] border border-[#1E4334]/15">
                          <Radio className="w-5 h-5 text-[#1E4334] mb-2" />
                          <h4 className="text-sm font-semibold text-[#1A1814]">Nostalgia Radio</h4>
                          <p className="text-xs text-on-surface-variant mt-0.5">Classic Assamese songs</p>
                        </div>

                        <div className="p-3.5 bg-[#F7F5F0] border border-[#1E4334]/15">
                          <ImageIcon className="w-5 h-5 text-[#1E4334] mb-2" />
                          <h4 className="text-sm font-semibold text-[#1A1814]">Family Photos</h4>
                          <p className="text-xs text-on-surface-variant mt-0.5">Familiar faces &amp; memories</p>
                        </div>
                      </div>

                      {/* Simple Calm Telemetry */}
                      <div className="flex items-center gap-2 text-xs text-[#1E4334] bg-[#1E4334]/5 p-2.5 border border-[#1E4334]/15">
                        <ShieldCheck className="w-4 h-4 text-[#1E4334] shrink-0" />
                        <span>Sundowning status: <strong>Peaceful &amp; Calm (98%)</strong></span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => onOpenRoleModal("patient")}
                      className="w-full py-3.5 px-4 bg-[#1E4334] hover:bg-[#142F24] text-[#C8F028] font-semibold text-sm transition-all flex items-center justify-center cursor-pointer shadow-md rounded-none active:scale-[0.99]"
                    >
                      <span>Launch Bedside Surface</span>
                    </button>
                  </>
                )}

                {/* 2. DOCTOR & ASHA MODE */}
                {activeRole === "asha" && (
                  <>
                    <div>
                      {/* Clean Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#1E4334]/15 mb-4">
                        <div>
                          <h3 className="font-serif text-lg sm:text-xl text-[#1A1814]">
                            Frontline Doctor &amp; ASHA Triage
                          </h3>
                          <p className="text-xs text-on-surface-variant font-sans">
                            Door-to-door cognitive screening for rural Northeast
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-[#92400E] bg-[#FEF3C7] px-2.5 py-0.5 border border-[#D97706]/30 uppercase tracking-wider">
                          100% Offline
                        </span>
                      </div>

                      {/* 2 Stat Cards */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="p-3 bg-[#F7F5F0] border border-[#1E4334]/15 text-center">
                          <div className="text-[10px] uppercase font-semibold text-on-surface-variant mb-0.5">
                            Speech &amp; Motor Test
                          </div>
                          <div className="font-mono text-xl font-bold text-[#1E4334]">94.2%</div>
                          <div className="text-[10px] text-[#1E4334]">Stable baseline</div>
                        </div>

                        <div className="p-3 bg-[#F7F5F0] border border-[#1E4334]/15 text-center">
                          <div className="text-[10px] uppercase font-semibold text-on-surface-variant mb-0.5">
                            Cultural Cue Recall
                          </div>
                          <div className="font-mono text-xl font-bold text-[#1E4334]">8 / 10</div>
                          <div className="text-[10px] text-[#1E4334]">High recognition</div>
                        </div>
                      </div>

                      {/* Report summary */}
                      <div className="flex items-center gap-2 text-xs text-[#1E4334] bg-[#1E4334]/5 p-2.5 border border-[#1E4334]/15">
                        <FileCheck2 className="w-4 h-4 text-[#1E4334] shrink-0" />
                        <span>Bilingual clinical summary ready for doctor review</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => onOpenRoleModal("asha")}
                      className="w-full py-3.5 px-4 bg-[#1E4334] hover:bg-[#142F24] text-[#C8F028] font-semibold text-sm transition-all flex items-center justify-center cursor-pointer shadow-md rounded-none active:scale-[0.99]"
                    >
                      <span>Preview Clinical Triage Tool</span>
                    </button>
                  </>
                )}

              </div>
              
              {/* Bottom Subtle Hint */}
              <div className="bg-[#F7F5F0] border-t border-[#1E4334]/15 px-4 py-2 text-center text-[11px] text-on-surface-variant font-medium shrink-0">
                Switch tabs above to preview the Elder Bedside Tablet and Clinical Triage modes
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
