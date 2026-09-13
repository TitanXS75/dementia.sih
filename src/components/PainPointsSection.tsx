import React from "react";

export default function PainPointsSection() {
  const problems = [
    {
      num: "01",
      text: "The childhood stories and village memories simply got lost before anyone recorded them",
    },
    {
      num: "02",
      text: "Answering the same question 35 times a morning made everyone quietly exhausted and heartbroken",
    },
    {
      num: "03",
      text: "Full-time jobs, children's schooling, and daily household chores got in the way, again",
    },
    {
      num: "04",
      text: "Hospital questionnaires in unfamiliar English felt intimidating, cold, and caused distress",
    },
    {
      num: "05",
      text: "Evening sundowning restlessness and agitation struck without any early warning cues",
    },
    {
      num: "06",
      text: "Doctor slips, prescription photos, and updates were scattered across chaotic group chats",
    },
  ];

  return (
    <section id="problems" className="w-full bg-[#1E4334] text-[#F7F5F0] py-10 sm:py-14 lg:py-16 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Visual with Authentic Indian Elder Photograph Frame */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-none overflow-hidden border border-white/20 p-2 bg-white/5 shadow-2xl relative">
              <div className="relative h-[260px] sm:h-[320px] lg:h-[370px] rounded-none overflow-hidden">
                <img
                  src="/images/grandfather_documentary.png"
                  alt="Elderly Indian grandfather portrait"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E4334]/95 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-left">
                  <span className="px-3 py-1 rounded-none bg-[#C8F028] text-[#1A1814] text-xs font-semibold uppercase tracking-wider">
                    The Silent Reality
                  </span>
                  <p className="font-serif text-base sm:text-lg lg:text-xl text-white font-normal mt-2 leading-snug">
                    Over 8.8 million seniors in India live with dementia, yet 90% navigate care without a structured system.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Problems List - Compact 2-column Grid fitting in 1 view */}
          <div className="lg:col-span-7 flex flex-col text-left justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8F028] mb-2">
              The Reality
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight mb-5 font-normal">
              Moments that faded unrecorded because:
            </h2>

            {/* 2-Column Grid (3 rows) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {problems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-start gap-3.5 text-left"
                >
                  <span className="font-serif font-light text-xl sm:text-2xl text-[#C8F028] shrink-0 leading-none mt-0.5">
                    {item.num}
                  </span>
                  <p className="text-xs sm:text-sm font-normal text-white/90 leading-snug font-sans">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
