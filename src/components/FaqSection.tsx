import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      num: "01",
      q: "Can my 82-year-old grandfather use this if he has never used a smartphone?",
      a: "Yes, absolutely. SmritiSetu is engineered with zero cognitive friction for elders. There are no logins, passwords, tiny buttons, or confusing settings. It functions like a peaceful living room photo frame that responds to his voice and touch with large, tactile buttons in his native language.",
    },
    {
      num: "02",
      q: "How is SmritiSetu different from regular cognitive training games?",
      a: "Generic brain apps use abstract shapes and stressful countdown timers that often cause frustration and agitation for elders with dementia. SmritiSetu uses reminiscence therapy — rooted in the elder's actual memories, ancestral hometowns, familiar family faces, and vintage melodies that stimulate emotional comfort and cognitive preservation.",
    },
    {
      num: "03",
      q: "What languages and regional dialects are currently supported?",
      a: "We actively support Assamese (অসমীয়া), Bengali (বাংলা), Bodo (बड़ो), Manipuri (ꯃꯤꯇꯩꯂꯣꯟ), Hindi (हिंदी), and English, with additional regional dialects continuously expanding through our community linguist network across Northeast India.",
    },
    {
      num: "04",
      q: "How does the ASHA frontline mode work without an internet connection?",
      a: "The ASHA and clinical surface operates 100% offline. Frontline health workers can download cognitive screening questionnaires while at the primary health centre, perform door-to-door screenings in remote villages, and all data automatically encrypts and syncs whenever the device reconnects to a mobile network.",
    },
    {
      num: "05",
      q: "Is our family's personal photographs, audio memories, and medical data secure?",
      a: "100% private and encrypted. SmritiSetu never sells, shares, or monetizes family memories or health data. Everything is end-to-end encrypted and strictly owned by your family.",
    },
    {
      num: "06",
      q: "What stages of Alzheimer's and Dementia is SmritiSetu most effective for?",
      a: "SmritiSetu provides maximum therapeutic benefit for Mild Cognitive Impairment (MCI) and early-to-moderate dementia. The companion automatically adapts: offering memory puzzles during morning hours, and gently transitioning to soothing songs, twilight clocks, and familiar voices during evening sundowning hours.",
    },
  ];

  return (
    <section id="faqs" className="w-full bg-[#F7F5F0] py-20 sm:py-28 overflow-hidden border-b border-[#1E4334]/10">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-left mb-16">
          <h2 className="font-serif text-3xl sm:text-5xl xl:text-6xl text-[#1A1814] tracking-tight font-normal leading-[1.15]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Numbered FAQ List */}
        <div className="divide-y divide-[#1E4334]/10">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-6 sm:py-8 text-left">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-start justify-between gap-6 focus:outline-none group"
                >
                  <div className="flex items-start gap-6 sm:gap-8">
                    <span className="font-serif font-light text-2xl sm:text-3xl text-[#D97706]">
                      {faq.num}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#1A1814] group-hover:text-[#1E4334] font-normal transition-colors leading-snug">
                      {faq.q}
                    </h3>
                  </div>

                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-[#1E4334]/15 transition-all ${
                    isOpen ? "bg-[#1E4334] text-white" : "bg-white text-[#1A1814]"
                  }`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pl-12 sm:pl-16 pr-4 text-base sm:text-lg text-on-surface-variant leading-relaxed font-normal font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
