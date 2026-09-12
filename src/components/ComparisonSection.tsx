import React, { useState } from "react";
import { Check, X, Sparkles } from "lucide-react";

export default function ComparisonSection() {
  const [activeTab, setActiveTab] = useState<"rational" | "emotional">("rational");

  const rationalData = [
    {
      feature: "Northeast India Regional Dialects",
      generic: "English only (Western)",
      hospital: "Standard Hindi or English",
      smriti: "Assamese, Bengali, Bodo, Manipuri, Hindi + more",
    },
    {
      feature: "Ergonomics for Trembling Hands",
      generic: "Fast-paced timers & small text",
      hospital: "Intimidating paper questionnaires",
      smriti: "Oversized tactile buttons & voice navigation",
    },
    {
      feature: "Offline & Rural ASHA Operability",
      generic: "Requires uninterrupted high-speed 4G",
      hospital: "Requires traveling to city clinic",
      smriti: "100% offline-ready on basic tablet",
    },
    {
      feature: "Family Daily Digest Integration",
      generic: "Isolated to app with paywalled reports",
      hospital: "Bi-monthly printed hospital summary",
      smriti: "Daily evening family peace-of-mind digest",
    },
  ];

  const emotionalData = [
    {
      feature: "Elder Feeling & Dignity",
      generic: "Feels like an exam they are failing",
      hospital: "Feelings of confusion and humiliation",
      smriti: "Feels like listening to old songs on the veranda",
    },
    {
      feature: "Caregiver Evening Anxiety",
      generic: "Leaves you alone during twilight sundowning",
      hospital: "No support once you leave the hospital",
      smriti: "Evening soothing radio mode reduces panic",
    },
    {
      feature: "Oral History & Memory Preservation",
      generic: "Generic shapes and geometric math drills",
      hospital: "Only diagnostic numbers, no personal stories",
      smriti: "Preserves childhood memories in grandfather's voice",
    },
    {
      feature: "Privacy & Bedroom Surveillance",
      generic: "Confusing ad tracking and third-party data",
      hospital: "Files easily misplaced in clinic records",
      smriti: "Zero spy cameras · 100% encrypted family vault",
    },
  ];

  const currentList = activeTab === "rational" ? rationalData : emotionalData;

  return (
    <section id="comparison" className="w-full bg-[#FAF7F2] py-20 sm:py-28 overflow-hidden border-b border-[#1B382B]/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <p className="text-sm sm:text-base font-serif italic text-[#1F1914]/70 mb-2">
            Designed for real households
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl xl:text-6xl text-[#1F1914] tracking-tight font-normal leading-[1.15] max-w-4xl">
            We combined the best of neurological science with Indian family warmth.
          </h2>
        </div>

        {/* Toggle Pills */}
        <div className="flex items-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab("rational")}
            className={`px-6 py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all ${
              activeTab === "rational"
                ? "bg-[#1B382B] text-white shadow-md"
                : "bg-white text-[#1F1914] border border-[#1B382B]/15 hover:bg-[#FAF7F2]"
            }`}
          >
            Rational Benefits
          </button>
          <button
            onClick={() => setActiveTab("emotional")}
            className={`px-6 py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all ${
              activeTab === "emotional"
                ? "bg-[#1B382B] text-white shadow-md"
                : "bg-white text-[#1F1914] border border-[#1B382B]/15 hover:bg-[#FAF7F2]"
            }`}
          >
            Emotional Benefits
          </button>
        </div>

        {/* Comparison Table */}
        <div className="rounded-[36px] bg-white border border-[#1B382B]/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="border-b border-[#1B382B]/10 bg-[#FAF7F2]/80">
                  <th className="p-6 text-xs font-semibold uppercase tracking-wider text-[#1F1914]/70">
                    What matters
                  </th>
                  <th className="p-6 text-xs font-semibold uppercase tracking-wider text-[#1F1914]/70">
                    Generic Brain Games
                  </th>
                  <th className="p-6 text-xs font-semibold uppercase tracking-wider text-[#1F1914]/70">
                    Hospital Paper Logs
                  </th>
                  <th className="p-6 text-xs font-semibold uppercase tracking-wider text-[#1B382B] bg-[#FEF3C7] border-l-2 border-[#D97706]">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Sparkles className="w-4 h-4 text-[#D97706]" />
                      SmritiSetu Platform
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1B382B]/10 text-sm sm:text-base font-normal">
                {currentList.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-6 font-medium text-[#1F1914] max-w-xs">
                      {row.feature}
                    </td>
                    <td className="p-6 text-[#1F1914]/75">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{row.generic}</span>
                      </div>
                    </td>
                    <td className="p-6 text-[#1F1914]/70">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{row.hospital}</span>
                      </div>
                    </td>
                    <td className="p-6 font-bold text-[#1B382B] bg-[#FEF3C7]/40 border-l-2 border-[#D97706]">
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-[#1B382B] font-black shrink-0" />
                        <span>{row.smriti}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
