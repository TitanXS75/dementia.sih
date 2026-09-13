import React, { useState } from "react";
import { ArrowLeft, Plus, Minus, MessageCircle, ShieldCheck } from "lucide-react";
import GoogleTranslate from "./GoogleTranslate";

interface FaqPageProps {
  onNavigateHome: () => void;
  onOpenRoleModal: (role?: string) => void;
  currentLang?: string;
  onSelectLang?: (lang: string) => void;
}

export default function FaqPage({
  onNavigateHome,
  onOpenRoleModal,
  onSelectLang,
}: FaqPageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "care", label: "Dementia Care & Dignity" },
    { id: "elder", label: "Elder Tablet" },
    { id: "family", label: "Family Circle" },
    { id: "asha", label: "ASHA & Offline" },
  ];

  const faqs = [
    {
      category: "elder",
      num: "01",
      q: "My grandfather has trembling hands and cataracts. Can he use the tablet?",
      a: "Yes. The elder surface uses high-contrast palette tokens, giant 48px tactile buttons, simplified touch areas with 200ms debounce protection to prevent accidental multiple taps, and clear mother-tongue audio narrations in Assamese, Bengali, and Hindi so seniors never have to read small text.",
    },
    {
      category: "care",
      num: "02",
      q: "Does this replace a doctor, neurologist, or clinical prescription?",
      a: "No. SmritiSetu is a non-pharmacological, culturally rooted cognitive stimulation and reminiscence therapy companion. It provides gentle cognitive reassurance at home and tracks stability metrics that you can share with your neurologist during routine clinical visits.",
    },
    {
      category: "asha",
      num: "03",
      q: "How does the offline mode work in remote Northeast villages without 4G?",
      a: "All core reminiscing games, voice audio prompts, and ASHA cognitive triage checklists operate 100% offline via local IndexedDB storage. When a healthcare worker connects to Wi-Fi or mobile data at a primary health centre, records sync securely in seconds.",
    },
    {
      category: "care",
      num: "04",
      q: "Why does SmritiSetu strictly avoid video surveillance cameras?",
      a: "Dementia care must prioritize human dignity. Installing invasive 24/7 video cameras pointing at an elder's bed strips their privacy and can induce paranoia. Instead, we monitor evening vocal cadence, rhythm calm, and touch coherence to assess distress without compromising dignity.",
    },
    {
      category: "family",
      num: "05",
      q: "How do family members send photos and voice recordings from afar?",
      a: "Family members (sons, daughters, grandchildren in other cities) access the Caregiver Portal on their smartphones. You can record a 30-second voice greeting or upload an old family photograph. The system formats it into a personalized cognitive puzzle on grandfather's tablet.",
    },
    {
      category: "care",
      num: "06",
      q: "Which languages and regional dialects are supported?",
      a: "We currently support Assamese (অসমীয়া), Bengali (বাংলা), Bodo (बड़ो), Manipuri (ꯃꯤꯇꯩꯂꯣꯟ), Hindi (हिंदी), and Indian English, with custom dialect recordings added by family members in their loved one's exact village accent.",
    },
    {
      category: "family",
      num: "07",
      q: "How does the sundowning agitation tracker help families?",
      a: "Between 4:00 PM and 7:00 PM, many elders experience twilight restlessness ('sundowning'). SmritiSetu detects evening agitation patterns and automatically plays soothing Bhupen Hazarika melodies or family voices to keep the elder grounded and calm.",
    },
    {
      category: "asha",
      num: "08",
      q: "Can frontline ASHA workers generate reports for government clinics?",
      a: "Yes. The ASHA portal generates a single-page bilingual summary PDF detailing cognitive recall patterns, speech cadence, and orientation responses, ready to hand directly to medical officers at District Civil Hospitals.",
    },
  ];

  const filteredFaqs = selectedCategory === "all"
    ? faqs
    : faqs.filter((f) => f.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#1A1814] font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#1E4334]/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-6">
          {/* Left: Back Arrow + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#1A1814]/80 hover:text-[#1E4334] p-2 rounded-full hover:bg-[#1E4334]/5 transition-all"
              aria-label="Back to Home"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>

            <div className="h-6 w-px bg-[#1E4334]/15 hidden sm:block" />

            <button onClick={onNavigateHome} className="flex items-center focus:outline-none group">
              <span className="font-serif text-xl font-bold tracking-tight text-[#1E4334] group-hover:text-[#142F24] transition-colors">
                SmritiSetu<span className="text-orange-500">.</span>
              </span>
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Functional Real-Time Language Switcher */}
            <GoogleTranslate onLanguageChange={onSelectLang} />

            {/* Platform CTA */}
            <button
              onClick={() => onOpenRoleModal()}
              className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#1E4334] text-white hover:bg-[#142F24] font-semibold text-xs tracking-wide transition-all shadow-sm active:scale-95"
            >
              Explore Platform
            </button>
          </div>
        </div>
      </header>

      {/* Main FAQ Content */}
      <main className="flex-1 w-full py-16 sm:py-24">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <div className="text-left mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1E4334] mb-3">
              Help &amp; Knowledge Center
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#1E4334] tracking-tight font-normal leading-[1.12] mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg text-on-surface-variant font-normal leading-relaxed max-w-2xl">
              Everything you need to know about SmritiSetu, our culturally rooted approach, offline frontline capabilities, and our commitment to elder privacy.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setOpenIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#1E4334] text-white shadow-sm"
                    : "bg-white text-[#1A1814]/80 border border-[#1E4334]/15 hover:bg-[#1E4334]/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion Questions List */}
          <div className="rounded-[32px] bg-white border border-[#1E4334]/10 p-6 sm:p-10 shadow-sm divide-y divide-[#1E4334]/10">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-6 first:pt-2 last:pb-2 text-left">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-start justify-between gap-6 focus:outline-none group text-left"
                  >
                    <div className="flex items-start gap-5">
                      <span className="font-serif font-light text-xl sm:text-2xl text-[#D97706] shrink-0 mt-0.5">
                        {faq.num}
                      </span>
                      <h2 className="font-serif text-lg sm:text-xl text-[#1A1814] group-hover:text-[#1E4334] font-normal transition-colors leading-snug">
                        {faq.q}
                      </h2>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-[#1E4334]/15 transition-all ${
                        isOpen ? "bg-[#1E4334] text-white" : "bg-[#F7F5F0] text-[#1A1814]"
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-3.5 pl-10 pr-4 text-sm sm:text-base text-on-surface-variant leading-relaxed font-normal font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Assistance Card */}
          <div className="mt-12 p-8 rounded-[32px] bg-[#1E4334] text-[#F7F5F0] flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mb-1">
                Have a specific question about your loved one?
              </h3>
              <p className="text-sm text-white/75 font-normal font-sans">
                Our care advisors are available to guide your family through gentle dementia setup.
              </p>
            </div>
            <a
              href="mailto:support@smritisetu.in"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C8F028] text-[#1A1814] font-semibold text-xs uppercase tracking-wider hover:bg-[#C8F028] transition-all shadow-md shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact Care Advisors</span>
            </a>
          </div>

        </div>
      </main>

      {/* Simple Clean Footer */}
      <footer className="w-full bg-[#142F24] text-[#F7F5F0] py-8 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} SmritiSetu (স্মৃতি সেতু). Dedicated to elder dignity across Northeast India.</p>
          <button onClick={onNavigateHome} className="text-[#C8F028] hover:underline font-medium cursor-pointer">
            ← Return to Home Page
          </button>
        </div>
      </footer>
    </div>
  );
}
