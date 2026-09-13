import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface CtaSectionProps {
  onOpenRoleModal: () => void;
}

export default function CtaSection({ onOpenRoleModal }: CtaSectionProps) {
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFullName("");
      setContact("");
    }
  };

  return (
    <section className="w-full bg-[#1E4334] text-[#F7F5F0] pt-20 sm:pt-28 pb-16 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        
        {/* Monologue Banner */}
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <h2 className="font-serif text-3xl sm:text-5xl xl:text-6xl text-white tracking-tight font-normal leading-[1.15] mb-8">
            Bringing dignity back to every moment
          </h2>

          <div className="space-y-2 text-base sm:text-xl text-white/85 font-normal mb-12 max-w-2xl leading-relaxed font-sans">
            <p>Don't lose another precious memory to silence.</p>
            <p>Don't lose another childhood story to forgetting.</p>
            <p className="text-white/65 text-sm sm:text-base pt-1">
              Don't lose your evening peace of mind to sundowning distress and care burnout.
            </p>
          </div>

          {/* Form Box */}
          <div className="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-[32px] p-6 sm:p-8 border border-white/20 shadow-2xl mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#C8F028] mb-4 text-center">
              Request Early Family Access or Clinic Pilot
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-5 py-3.5 rounded-2xl bg-[#F7F5F0]/95 text-[#1A1814] placeholder:text-[#1A1814]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                required
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Phone Number or Email"
                  className="flex-1 px-5 py-3.5 rounded-2xl bg-[#F7F5F0]/95 text-[#1A1814] placeholder:text-[#1A1814]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-[#C8F028] hover:bg-[#C8F028] text-[#1A1814] font-semibold text-sm transition-all shadow-md shrink-0 flex items-center justify-center cursor-pointer"
                >
                  <span>Submit</span>
                </button>
              </div>
            </form>

            {submitted && (
              <div className="mt-4 p-3 rounded-xl bg-[#FEF3C7]/20 border border-[#D97706] text-xs font-semibold text-[#C8F028] flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! Our care team will reach out directly.</span>
              </div>
            )}
          </div>

          {/* Quick Platform Launch Button */}
          <button
            onClick={onOpenRoleModal}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[#1E4334] hover:bg-[#FEF3C7] hover:text-[#92400E] font-semibold text-sm transition-all shadow-xl active:scale-95 cursor-pointer"
          >
            <span>Explore All 3 Surfaces Live</span>
          </button>

        </div>

      </div>
    </section>
  );
}
