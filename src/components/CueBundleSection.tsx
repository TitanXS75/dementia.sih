import React from "react";
import { Clock, Radio, ShieldCheck, BookOpen, Wifi } from "lucide-react";

interface CueBundleSectionProps {
  onOpenRoleModal: (role?: string) => void;
}

export default function CueBundleSection({ onOpenRoleModal }: CueBundleSectionProps) {
  const cards = [
    {
      icon: Clock,
      title: "Quick Daily Calm",
      tag: "Morning Routine",
      desc: "Turn confusing mornings into 15 minutes of gentle memory reassurance. No complicated logins, no confusing icons, and no exhaustion trying to calm elder disorientation alone.",
      span: "lg:col-span-2",
    },
    {
      icon: Radio,
      title: "Culturally Grounded",
      tag: "Regional Heritage",
      desc: "Old Bollywood & Bihu songs, archival Assam tea garden imagery, and mother-tongue audio prompts in Assamese, Bengali, Bodo, Manipuri, and Hindi.",
      span: "lg:col-span-2",
    },
    {
      icon: ShieldCheck,
      title: "Zero Invasive Cameras",
      tag: "100% Dignity",
      desc: "No creepy 24/7 surveillance cameras pointed at their bed. Peaceful voice cadence analysis and touch puzzle metrics protect their privacy with complete dignity.",
      span: "lg:col-span-2",
    },
    {
      icon: BookOpen,
      title: "Living Heritage",
      tag: "Family Memory Vault",
      desc: "The essence of your loved one will always be their life stories, village folklore, and laughter. SmritiSetu records and archives their voice in their mother tongue before memories slip away.",
      span: "lg:col-span-3",
    },
    {
      icon: Wifi,
      title: "Offline ASHA Sync",
      tag: "Frontline Healthcare",
      desc: "Functions 100% offline without active 4G or Wi-Fi. Frontline community health teams can perform door-to-door cognitive triage in rural communities on basic tablets.",
      span: "lg:col-span-3",
    },
  ];

  return (
    <section id="solutions" className="w-full bg-[#F7F5F0] py-16 sm:py-24 overflow-hidden border-b border-[#1E4334]/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1E4334] mb-3">
            Core Capabilities
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1A1814] tracking-tight leading-[1.12] mb-3 font-normal">
            Thoughtfully built for Indian elders &amp; families
          </h2>
          <p className="font-serif text-xl sm:text-2xl text-[#1A1814]/75 italic">
            Five gentle principles that make memory care comforting, familiar, and dignified.
          </p>
        </div>

        {/* Cohesive Cards Grid (3 top, 2 bottom) - No Candy Pastels, No Explore Button */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-12">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`rounded-[28px] p-7 bg-white border border-[#1E4334]/12 shadow-xs hover:border-[#D97706]/40 hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between ${card.span}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-[#1E4334]/8 text-[#1E4334] flex items-center justify-center border border-[#1E4334]/15">
                      <Icon className="w-5 h-5 text-[#1E4334]" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#1E4334] px-3 py-1 rounded-full bg-[#1E4334]/8 border border-[#1E4334]/12">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1E4334] tracking-tight mb-2.5">
                    {card.title}
                  </h3>

                  <p className="text-sm text-on-surface-variant leading-relaxed font-normal font-sans">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-[32px] bg-[#1E4334] text-[#F7F5F0]">
          <div className="text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-normal">
              Ready to see SmritiSetu in action?
            </h4>
            <p className="text-sm text-white/75 mt-1 font-normal font-sans">
              Explore the 3 tailored surfaces for elders, families, and healthcare workers.
            </p>
          </div>
          <button
            onClick={() => onOpenRoleModal()}
            className="px-8 py-3.5 rounded-full bg-[#C8F028] hover:bg-[#C8F028] text-[#1A1814] font-semibold text-sm transition-all shadow-md shrink-0 cursor-pointer"
          >
            Launch Interactive Tour
          </button>
        </div>

      </div>
    </section>
  );
}
