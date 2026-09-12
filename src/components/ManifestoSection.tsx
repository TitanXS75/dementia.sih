import React from "react";

export default function ManifestoSection() {
  return (
    <section id="manifesto" className="w-full bg-[#1B382B] text-[#FAF7F2] py-20 sm:py-28 overflow-hidden border-b border-white/10 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Big Bold Statement */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] mb-6">
              It’s hard watching someone you love forget who you are.
            </h2>

            <p className="font-serif text-xl sm:text-2xl text-[#F59E0B] italic font-medium leading-snug mb-4">
              And that’s why we never ask you to carry this journey alone.
            </p>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              It's harder when you care so deeply about your elder, and that’s just the raw truth.
            </p>

            <div className="mt-8 pt-8 border-t border-white/15 w-full flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#E58A18] shrink-0" />
              <p className="text-xs sm:text-sm text-white/90 font-medium">
                Engineered with clinical rigor and deep familial empathy for Indian households.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Monologue */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6 text-white/80 text-base sm:text-lg leading-relaxed">
            <p className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
              You haven't slept peacefully in months because well...
            </p>

            <ul className="space-y-3 pl-2">
              <li className="flex items-start gap-3">
                <span className="text-[#F59E0B] font-bold">—</span>
                <span>You're terrified they'll wander past the front gate into traffic</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F59E0B] font-bold">—</span>
                <span>You have exhausting decision fatigue and endless caregiver guilt</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F59E0B] font-bold">—</span>
                <span>You miss hearing them tell childhood stories with a twinkle in their eye</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F59E0B] font-bold">—</span>
                <span>Hospital paper checklists feel like an intimidating, cold exam</span>
              </li>
            </ul>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-3">
              <p className="text-white font-semibold">
                But also because you care so much about their dignity.
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                If elder care was just a chore to you, you would have settled for sterile medication alarms long ago. We know how much you care, because we've lived it too.
              </p>
              <p className="text-sm text-[#F59E0B] font-bold pt-2">
                SmritiSetu translates their fondest memories, favorite old songs, and family voices into quiet daily reassurance.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
