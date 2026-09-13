import React from "react";

export default function ImpactStatsSection() {
  return (
    <section className="w-full bg-[#1E4334] text-[#F7F5F0] py-20 sm:py-28 overflow-hidden border-b border-white/10 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Section Title */}
        <div className="text-left mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8F028] mb-3">
            Real Proof
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl xl:text-6xl text-white tracking-tight font-normal leading-[1.15]">
            Measurable peace of mind for families
          </h2>
        </div>

        {/* 4 Numbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="p-8 rounded-[36px] bg-white/5 border border-white/10 flex flex-col justify-between text-left hover:border-[#D97706]/50 transition-all">
            <span className="font-serif font-light text-5xl sm:text-6xl xl:text-7xl text-[#C8F028] tracking-tight mb-4">
              1,400+
            </span>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-2">
                Hours of Oral Stories
              </h3>
              <p className="text-sm text-white/75 leading-relaxed font-sans font-normal">
                Personal childhood folklore, recipes, and memories preserved in grandfather's mother tongue.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-[36px] bg-white/5 border border-white/10 flex flex-col justify-between text-left hover:border-[#D97706]/50 transition-all">
            <span className="font-serif font-light text-5xl sm:text-6xl xl:text-7xl text-[#C8F028] tracking-tight mb-4">
              87%
            </span>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-2">
                Evening Anxiety Drop
              </h3>
              <p className="text-sm text-white/75 leading-relaxed font-sans font-normal">
                Reduction in twilight agitation reported by family caregivers using our evening soothing mode.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-[36px] bg-white/5 border border-white/10 flex flex-col justify-between text-left hover:border-[#D97706]/50 transition-all">
            <span className="font-serif font-light text-5xl sm:text-6xl xl:text-7xl text-[#C8F028] tracking-tight mb-4">
              14+
            </span>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-2">
                Regional Dialects
              </h3>
              <p className="text-sm text-white/75 leading-relaxed font-sans font-normal">
                Indigenous language support across Northeast India, Bengal, and Hindi-speaking states.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-[36px] bg-white/5 border border-white/10 flex flex-col justify-between text-left hover:border-[#D97706]/50 transition-all">
            <span className="font-serif font-light text-5xl sm:text-6xl xl:text-7xl text-[#C8F028] tracking-tight mb-4">
              0%
            </span>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-2">
                Invasive Cameras
              </h3>
              <p className="text-sm text-white/75 leading-relaxed font-sans font-normal">
                100% privacy-first dignity. Quiet acoustic metrics without bedroom surveillance feeds.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
