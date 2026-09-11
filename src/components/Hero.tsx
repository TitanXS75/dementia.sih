import React, { useState } from "react";
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
}

type RoleType = "patient" | "asha";

export default function Hero({ onOpenRoleModal, onScrollTo }: HeroProps) {
  const [activeRole, setActiveRole] = useState<RoleType>("patient");

  return (
    <section className="w-full bg-[#F7F5F0] pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-24 overflow-hidden relative border-b border-[#1A1814]/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-primary tracking-tight font-normal leading-[1.12] mb-6 sm:mb-7">
              Every memory <br className="hidden sm:inline" />
              <span className="font-medium text-secondary pb-1 inline-block border-b-2 border-secondary/30">
                matters.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl lg:text-2xl text-on-surface-variant mb-8 sm:mb-10 max-w-xl leading-relaxed font-normal">
              Gentle cognitive games, familiar family voices, and culturally rooted reminiscence therapy for elderly loved ones across Northeast India.
            </p>

            {/* CTA Button Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
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
          <div className="lg:col-span-6 w-full">
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
                          <h3 className="font-serif text-lg sm:text-xl text-[#1A1814]">
                            সুপ্ৰভাত, দেউতা! · 08:30 AM
                          </h3>
                          <p className="text-xs text-on-surface-variant font-sans">
                            Calm daylight orientation clock for the bedside
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-[#1E4334] bg-[#C8F028] px-2 py-0.5 border border-[#1E4334]/20 uppercase">
                          Living Room
                        </span>
                      </div>

                      {/* 2 Big Simple Buttons */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="p-3.5 bg-[#F7F5F0] border border-[#1E4334]/20">
                          <Radio className="w-5 h-5 text-[#1E4334] mb-2" />
                          <h4 className="text-sm font-semibold text-[#1A1814]">Nostalgia Radio</h4>
                          <p className="text-xs text-on-surface-variant mt-0.5">Classic Assamese songs</p>
                        </div>

                        <div className="p-3.5 bg-[#F7F5F0] border border-[#1E4334]/20">
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
                        <span className="text-[10px] font-bold text-[#1E4334] bg-[#C8F028] px-2 py-0.5 border border-[#1E4334]/20 uppercase">
                          100% Offline
                        </span>
                      </div>

                      {/* 2 Stat Cards */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="p-3 bg-[#F7F5F0] border border-[#1E4334]/20 text-center">
                          <div className="text-[10px] uppercase font-semibold text-on-surface-variant mb-0.5">
                            Speech &amp; Motor Test
                          </div>
                          <div className="font-mono text-xl font-bold text-[#1E4334]">94.2%</div>
                          <div className="text-[10px] text-[#1E4334]">Stable baseline</div>
                        </div>

                        <div className="p-3 bg-[#F7F5F0] border border-[#1E4334]/20 text-center">
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
