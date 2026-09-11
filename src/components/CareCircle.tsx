"use client";

import React from "react";
import { User, Users, ClipboardCheck } from "lucide-react";

interface CareCircleProps {
  onOpenRoleModal: (role: string) => void;
}

export default function CareCircle({ onOpenRoleModal }: CareCircleProps) {
  const cards = [
    {
      id: "patient",
      audience: "For Loved Ones",
      title: "Simple. Familiar. Voice-First.",
      desc: "Large high-contrast controls, gentle voice guidance, and personalized reminiscence activities designed for everyday ease without stressful menus.",
      icon: User,
      iconBg: "bg-surface-container-low text-primary",
      cta: "Explore Patient App",
      badge: "Voice + Big Touch",
    },
    {
      id: "caregiver",
      audience: "For Families",
      title: "Peace of Mind, at a Glance.",
      desc: "Manage heirloom memories, record voice reminders, and quietly monitor weekly cognitive trends from anywhere without intrusive surveillance cameras.",
      icon: Users,
      iconBg: "bg-secondary-fixed/50 text-secondary",
      cta: "Explore Family Portal",
      badge: "Memory Studio + Trends",
    },
    {
      id: "asha",
      audience: "For Care Teams & ASHA",
      title: "A Clearer Picture Over Time.",
      desc: "Passive decline-slope tracking and multi-patient triage help visiting community health workers and neurologists identify subtle shifts early.",
      icon: ClipboardCheck,
      iconBg: "bg-primary-fixed/50 text-primary",
      cta: "Explore ASHA Console",
      badge: "Clinical Triage & Fallback",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 2xl:py-28 bg-surface" id="for-families">
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl text-primary tracking-tight">
            Thoughtfully tailored for all three sides.
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-on-surface-variant mt-4 leading-relaxed">
            Dementia care works best when the elder, their family, and last-mile health workers share one seamless,
            sympathetic ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 2xl:gap-10">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="bg-surface-container-lowest p-6 sm:p-8 2xl:p-10 rounded-[28px] sm:rounded-[36px] shadow-sm border border-surface-container-high/60 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${card.iconBg} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full bg-surface-container font-semibold text-on-surface-variant">
                      {card.badge}
                    </span>
                  </div>

                  <span className="text-xs uppercase tracking-wider text-surface-tint font-bold block mb-1">
                    {card.audience}
                  </span>

                  <h3 className="font-serif text-xl sm:text-2xl 2xl:text-3xl text-primary font-semibold mb-3">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm lg:text-base text-on-surface-variant leading-relaxed mb-6 sm:mb-8">
                    {card.desc}
                  </p>
                </div>

                <button
                  onClick={() => onOpenRoleModal(card.id)}
                  className="inline-flex items-center font-semibold text-xs sm:text-sm text-primary hover:text-secondary transition-colors focus:outline-none"
                >
                  <span>{card.cta}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
