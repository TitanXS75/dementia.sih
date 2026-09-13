import React from "react";

interface FooterProps {
  onOpenRoleModal: (role?: string) => void;
  onScrollTo: (id: string) => void;
  onNavigateFaq?: () => void;
}

export default function Footer({ onOpenRoleModal, onScrollTo, onNavigateFaq }: FooterProps) {
  return (
    <footer className="w-full bg-[#142F24] text-[#F7F5F0] pt-14 pb-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-12 border-b border-white/10 text-left">
          
          {/* Col 1: Our Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C8F028] mb-4">
              Our Product
            </h4>
            <ul className="space-y-2.5 text-sm font-normal text-white/75 font-sans">
              <li>
                <button onClick={() => onOpenRoleModal("patient")} className="hover:text-white transition-colors text-left">
                  Elder Companion Tablet
                </button>
              </li>
              <li>
                <button onClick={() => onOpenRoleModal("caregiver")} className="hover:text-white transition-colors text-left">
                  Caregiver Family Portal
                </button>
              </li>
              <li>
                <button onClick={() => onOpenRoleModal("asha")} className="hover:text-white transition-colors text-left">
                  ASHA Frontline Tablet
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo("how-it-works")} className="hover:text-white transition-colors text-left">
                  How it all works
                </button>
              </li>
              {onNavigateFaq && (
                <li>
                  <button onClick={onNavigateFaq} className="hover:text-white transition-colors text-left">
                    Frequently Asked Questions
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 2: Dialects */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C8F028] mb-4">
              Dialects
            </h4>
            <ul className="space-y-2.5 text-sm font-normal text-white/75 font-sans">
              <li>অসমীয়া (Assamese)</li>
              <li>বাংলা (Bengali)</li>
              <li>ਪੰਜਾਬੀ (Punjabi)</li>
              <li>हिंदी (Hindi)</li>
              <li>मराठी (Marathi)</li>
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C8F028] mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-white/75">
              <li>
                <button
                  type="button"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Community Healthcare Forum
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Geriatric Research Alliance
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Care Support Helpline
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} SmritiSetu</span>
            <span className="text-white/30">·</span>
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-medium border border-white/15 text-[11px]">
              Built for SIH
            </span>
          </div>
          <div className="flex items-center text-white/80">
            <span>Dedicated to elder dignity across India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
