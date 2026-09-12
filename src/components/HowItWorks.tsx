import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Add Family Memories",
      tag: "5-Min Setup",
      desc: "Upload heirloom photographs, ancestral village names, and favorite vintage songs in the caregiver app.",
      img: "/images/indian_family_album.jpg",
    },
    {
      num: "02",
      title: "Place Bedside Tablet",
      tag: "Zero Tech Friction",
      desc: "Tactile daylight orientation clock with giant buttons and familiar mother-tongue greetings.",
      img: "/images/indian_grandfather_assam.jpg",
    },
    {
      num: "03",
      title: "Daily Reminiscence",
      tag: "Cultural Songs & Games",
      desc: "Elder enjoys nostalgic radio melodies and personalized family face jigsaw puzzles.",
      img: "/images/indian_grandfather_radio.jpg",
    },
    {
      num: "04",
      title: "Family Peace of Mind",
      tag: "100% Camera-Free",
      desc: "Family gets peaceful evening status digests, while doctors receive exportable clinical trends.",
      img: "/images/indian_grandmother_tea.jpg",
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-[#FAF7F2] py-14 sm:py-20 overflow-hidden border-b border-[#1B382B]/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-left mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1B382B] mb-2">
            The Daily Flow
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1F1914] tracking-tight font-normal leading-[1.12]">
            How it works
          </h2>
        </div>

        {/* Short 4-Column Horizontal Cards (Zero Huge Scroll) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="rounded-[28px] bg-white border border-[#1B382B]/10 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-[#D97706]/40 transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div>
                {/* Step Thumbnail */}
                <div className="relative h-36 rounded-none overflow-hidden bg-stone-100 mb-4 border border-[#1B382B]/10">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#1B382B] text-white text-[11px] font-serif font-medium shadow-xs">
                    Step {step.num}
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-[#1B382B] px-2.5 py-0.5 rounded-full bg-[#1B382B]/8 border border-[#1B382B]/12 inline-block mb-2">
                  {step.tag}
                </span>

                <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1F1914] tracking-tight mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-normal font-sans">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
