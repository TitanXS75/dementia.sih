"use client";

import React from "react";
import { Languages, WifiOff, Trees, ShieldAlert } from "lucide-react";

export default function OfflineRegional() {
  const highlights = [
    {
      title: "Voice-First & Multilingual",
      desc: "Supports regional North Eastern languages including Assamese, Bengali, Bodo, Manipuri, Hindi, and English with conversational cadence powered by Bhashini.",
      icon: Languages,
      color: "text-secondary",
      bg: "bg-secondary-fixed/50",
    },
    {
      title: "Offline-Ready Core (Dexie.js)",
      desc: "Patient-facing reminiscence activities, photo sets, and spoken alerts function 100% offline. Delta-sync quietly reconciles when connectivity resumes.",
      icon: WifiOff,
      color: "text-primary",
      bg: "bg-primary-fixed/50",
    },
    {
      title: "Culturally Anchored in NER",
      desc: "Designed around authentic regional life: Assamese Gamosa patterns, tea garden picking, Bihu folk rhythms, Majuli masks, and sacred courtyard traditions.",
      icon: Trees,
      color: "text-surface-tint",
      bg: "bg-surface-container-high",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 2xl:py-28 bg-secondary-fixed/15 relative" id="offline-and-regional">
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl text-primary tracking-tight mb-4">
            Care shouldn’t depend on a strong signal.
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-on-surface-variant leading-relaxed">
            Built thoughtfully for towns, tea estates, river valleys, and hill districts across Northeast India where
            internet connectivity is intermittent and specialized neurological clinics are days away.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 2xl:gap-10">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            const bgClass =
              idx === 0
                ? "bg-surface-container-lowest border-surface-container-high/60"
                : idx === 1
                ? "bg-primary-fixed/20 border-primary-fixed/40"
                : "bg-surface-container-low border-surface-container-high/70";
            return (
              <div
                key={idx}
                className={`${bgClass} p-6 sm:p-8 2xl:p-10 rounded-[28px] sm:rounded-[36px] shadow-sm border flex flex-col items-start hover:shadow-lg transition-all duration-300`}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} mb-5 sm:mb-6`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl 2xl:text-3xl text-primary font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-on-surface-variant leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Emergency SMS Fallback Banner */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-surface-container-lowest border border-surface-container-high shadow-md flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-secondary-fixed/40 flex items-center justify-center text-secondary shrink-0 mt-0.5 sm:mt-0">
              <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg 2xl:text-xl font-bold text-primary">
                Critical Safety Alert Fallback
              </h4>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                Unacknowledged medicines or sudden cognitive drops trigger immediate SMS alerts directly to the
                caregiver and local ASHA worker even if mobile data is toggled off.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            <span className="text-[11px] sm:text-xs px-3 py-1.5 rounded-full bg-primary-fixed text-primary font-semibold">
              Emergency Alert
            </span>
            <span className="text-[11px] sm:text-xs px-3 py-1.5 rounded-full bg-secondary-fixed text-secondary font-semibold">
              SMS Gateway
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
