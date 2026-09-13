import React, { useState, useEffect } from "react";
import { Users, Stethoscope, Music, Image as ImageIcon, SunMedium } from "lucide-react";

interface SurfacesBentoProps {
  onOpenRoleModal: (role?: string) => void;
}

export default function SurfacesBento({ onOpenRoleModal }: SurfacesBentoProps) {
  const [liveTime, setLiveTime] = useState<string>(() => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section id="surfaces" className="w-full bg-[#F7F5F0] py-14 sm:py-20 overflow-hidden border-b border-[#1E4334]/10 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        
        {/* Clean Header (No arrow in badge) */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1E4334] mb-3 px-3.5 py-1 rounded-full bg-[#1E4334]/8 border border-[#1E4334]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E4334]" />
            <span>3 Connected Modes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1A1814] tracking-tight font-normal leading-[1.12] mb-3">
            Family &amp; Doctor connected to the Elder
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant font-normal leading-relaxed max-w-2xl mx-auto font-sans">
            Three tailored digital surfaces sharing one dignified memory bridge. Everything revolves around keeping your loved one calm and recognized.
          </p>
        </div>

        {/* 2-to-1 Convergence Grid: Left 2 Tabs/Cards -> Join -> Right Featured Patient Card */}
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
          
          {/* Left Column (5 cols): 2 Stacked Mode Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">
            
            {/* Left Card 1: Family Caregiver */}
            <div className="rounded-[24px] p-6 bg-white border border-[#1E4334]/15 shadow-sm hover:border-[#D97706]/40 hover:shadow-md transition-all duration-300 relative group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#1E4334]/8 text-[#1E4334] flex items-center justify-center border border-[#1E4334]/15 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5 text-[#1E4334]" />
                </div>
                <span className="text-[11px] font-semibold text-[#1E4334] px-3 py-0.5 rounded-full bg-[#1E4334]/8 border border-[#1E4334]/12">
                  Mode 1 · Care Circle
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#1A1814] font-normal tracking-tight mb-1.5">
                Family Caregiver
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed font-normal mb-4 font-sans">
                Uploads family heirloom photos, voice notes, and receives daily familiarity updates via the family portal.
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-[11px] font-medium text-[#1E4334] bg-[#F7F5F0] px-2.5 py-1 rounded-lg border border-[#1E4334]/10">
                  Heirloom photo cues
                </span>
                <span className="text-[11px] font-medium text-[#1E4334] bg-[#F7F5F0] px-2.5 py-1 rounded-lg border border-[#1E4334]/10">
                  Daily morning score
                </span>
                <span className="text-[11px] font-medium text-[#1E4334] bg-[#F7F5F0] px-2.5 py-1 rounded-lg border border-[#1E4334]/10">
                  Sundowning alerts
                </span>
              </div>

              <button
                onClick={() => onOpenRoleModal("caregiver")}
                className="w-full py-2.5 rounded-xl bg-[#F7F5F0] hover:bg-[#1E4334] text-[#1E4334] hover:text-white font-semibold text-xs transition-all border border-[#1E4334]/20 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Preview Family Mode</span>
              </button>
            </div>

            {/* Left Card 2: Doctor & Frontline ASHA */}
            <div className="rounded-[24px] p-6 bg-white border border-[#1E4334]/15 shadow-sm hover:border-[#D97706]/40 hover:shadow-md transition-all duration-300 relative group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#1E4334]/8 text-[#1E4334] flex items-center justify-center border border-[#1E4334]/15 group-hover:scale-105 transition-transform">
                  <Stethoscope className="w-5 h-5 text-[#1E4334]" />
                </div>
                <span className="text-[11px] font-semibold text-[#1E4334] px-3 py-0.5 rounded-full bg-[#1E4334]/8 border border-[#1E4334]/12">
                  Mode 2 · Clinical
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#1A1814] font-normal tracking-tight mb-1.5">
                Doctor &amp; Health Worker
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed font-normal mb-4 font-sans">
                Conducts door-to-door offline cognitive screenings and generates bilingual diagnostic reports.
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-[11px] font-medium text-[#1E4334] bg-[#F7F5F0] px-2.5 py-1 rounded-lg border border-[#1E4334]/10">
                  100% offline screening
                </span>
                <span className="text-[11px] font-medium text-[#1E4334] bg-[#F7F5F0] px-2.5 py-1 rounded-lg border border-[#1E4334]/10">
                  Bilingual clinical PDF
                </span>
                <span className="text-[11px] font-medium text-[#1E4334] bg-[#F7F5F0] px-2.5 py-1 rounded-lg border border-[#1E4334]/10">
                  Speech cadence trends
                </span>
              </div>

              <button
                onClick={() => onOpenRoleModal("asha")}
                className="w-full py-2.5 rounded-xl bg-[#F7F5F0] hover:bg-[#1E4334] text-[#1E4334] hover:text-white font-semibold text-xs transition-all border border-[#1E4334]/20 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Preview Clinical Mode</span>
              </button>
            </div>

          </div>

          {/* Joining Bridge Column (1 col on Desktop, hidden on Mobile) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center h-full px-1">
            <svg className="w-full h-[320px]" viewBox="0 0 60 320" fill="none" preserveAspectRatio="none">
              {/* Upper curve from Card 1 to Center */}
              <path
                d="M 0 75 C 35 75, 45 160, 60 160"
                stroke="#1E4334"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="opacity-40"
              />
              {/* Lower curve from Card 2 to Center */}
              <path
                d="M 0 245 C 35 245, 45 160, 60 160"
                stroke="#1E4334"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="opacity-40"
              />
              {/* Convergence Node */}
              <circle cx="60" cy="160" r="5" fill="#1E4334" />
              <circle cx="0" cy="75" r="4" fill="#1E4334" fillOpacity="0.6" />
              <circle cx="0" cy="245" r="4" fill="#1E4334" fillOpacity="0.6" />
            </svg>
          </div>

          {/* Right Column (6 cols): Featured Elder / Patient Surface */}
          <div className="lg:col-span-6 text-left">
            <div className="rounded-[32px] p-7 sm:p-9 bg-[#1E4334] text-[#F7F5F0] border-2 border-[#1E4334] shadow-2xl relative group overflow-hidden">
              
              {/* Subtle Warm Ambient Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8F028]/15 rounded-full blur-3xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/15 text-[#C8F028] flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform">
                  <SunMedium className="w-6 h-6 text-[#C8F028]" />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal tracking-tight mb-2">
                  The Elder / Patient
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal mb-6 font-sans">
                  The peaceful living-room anchor. Zero technology friction, giant tactile touch cards, and culturally rooted memory triggers designed for Northeast India.
                </p>

                {/* Simulated Bedside Tablet Display */}
                <div className="rounded-2xl bg-[#142F24] border border-white/15 p-4 mb-6 space-y-3">
                  {/* Tablet Status Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-[11px] text-white/70 font-sans">
                    <div className="flex items-center gap-2">
                      <SunMedium className="w-3.5 h-3.5 text-[#C8F028]" />
                      <span className="font-medium text-white">
                        <span>সুপ্ৰভাত</span> · <span className="notranslate font-mono tabular-nums font-bold" translate="no">{liveTime}</span>
                      </span>
                    </div>
                    <span className="text-[#C8F028] font-medium">Living Room Tablet</span>
                  </div>

                  {/* 3 Touch Elements */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div className="rounded-xl bg-white/10 p-3 border border-white/10 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#C8F028]/20 text-[#C8F028] flex items-center justify-center shrink-0">
                        <Music className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">Radio Melodies</div>
                        <div className="text-[10px] text-white/60">Bhupen Hazarika Classics</div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white/10 p-3 border border-white/10 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#C8F028]/20 text-[#C8F028] flex items-center justify-center shrink-0">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">Family Jigsaw</div>
                        <div className="text-[10px] text-white/60">Recognize Loved Ones</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Launch CTA */}
                <button
                  onClick={() => onOpenRoleModal("patient")}
                  className="w-full py-3.5 rounded-xl bg-[#C8F028] hover:bg-[#C8F028] text-[#1A1814] font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <span>Launch Elder Bedside Mode</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
