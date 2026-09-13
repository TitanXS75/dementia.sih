import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import GoogleTranslate from "./GoogleTranslate";

interface HeaderProps {
  onOpenRoleModal: (role?: string) => void;
  currentLang?: string;
  onSelectLang?: (lang: string) => void;
  onNavigateFaq?: () => void;
}

export default function Header({
  onOpenRoleModal,
  onSelectLang,
  onNavigateFaq,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#1E4334]/10 transition-all">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Logo - Just SmritiSetu */}
        <a href="#" className="flex items-center focus:outline-none shrink-0 group">
          <span className="font-serif text-2xl font-bold tracking-tight text-[#1E4334] group-hover:text-[#142F24] transition-colors leading-none">
            SmritiSetu<span className="text-orange-500">.</span>
          </span>
        </a>

        {/* Centered Navigation Links - Sequentially Arranged By Section Order */}
        <nav className="hidden lg:flex items-center gap-1.5">
          <a
            href="#problems"
            className="px-4 py-2 rounded-full text-sm font-medium text-[#1A1814]/75 hover:text-[#1E4334] hover:bg-[#1E4334]/5 transition-all"
          >
            The Reality
          </a>
          <a
            href="#solutions"
            className="px-4 py-2 rounded-full text-sm font-medium text-[#1A1814]/75 hover:text-[#1E4334] hover:bg-[#1E4334]/5 transition-all"
          >
            Ecosystem
          </a>
          <a
            href="#how-it-works"
            className="px-4 py-2 rounded-full text-sm font-medium text-[#1A1814]/75 hover:text-[#1E4334] hover:bg-[#1E4334]/5 transition-all"
          >
            How It Works
          </a>
          <a
            href="#comparison"
            className="px-4 py-2 rounded-full text-sm font-medium text-[#1A1814]/75 hover:text-[#1E4334] hover:bg-[#1E4334]/5 transition-all"
          >
            Comparison
          </a>
          <a
            href="#surfaces"
            className="px-4 py-2 rounded-full text-sm font-medium text-[#1A1814]/75 hover:text-[#1E4334] hover:bg-[#1E4334]/5 transition-all"
          >
            Surfaces
          </a>
          <button
            onClick={() => {
              if (onNavigateFaq) onNavigateFaq();
            }}
            className="px-4 py-2 rounded-full text-sm font-medium text-[#1A1814]/75 hover:text-[#1E4334] hover:bg-[#1E4334]/5 transition-all"
          >
            FAQs
          </button>
        </nav>

        {/* Right Actions: Language Selector + Clean Pill CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Functional Real-Time Language Switcher */}
          <GoogleTranslate onLanguageChange={onSelectLang} />

          {/* Clean Pill Button */}
          <button
            onClick={() => onOpenRoleModal()}
            className="hidden sm:inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#1E4334] text-white hover:bg-[#142F24] font-semibold text-xs tracking-wide transition-all shadow-sm active:scale-95"
          >
            Explore Platform
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full text-[#1A1814] hover:bg-white border border-[#1E4334]/15 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F5F0] border-t border-[#1E4334]/10 px-6 py-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-2 text-sm font-medium text-[#1A1814]">
            <a href="#problems" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-white text-left">
              The Reality
            </a>
            <a href="#solutions" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-white text-left">
              Ecosystem
            </a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-white text-left">
              How It Works
            </a>
            <a href="#comparison" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-white text-left">
              Comparison
            </a>
            <a href="#surfaces" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-white text-left">
              Surfaces
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigateFaq) onNavigateFaq();
              }}
              className="px-3 py-2 rounded-xl hover:bg-white text-left font-medium"
            >
              FAQs
            </button>
            <div className="pt-2 border-t border-[#1E4334]/10 mt-2 flex flex-col gap-3">
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-xs font-semibold text-[#1E4334]">Language / भाषा</span>
                <GoogleTranslate onLanguageChange={onSelectLang} />
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRoleModal();
                }}
                className="w-full py-3 rounded-full bg-[#1E4334] text-white font-semibold text-xs tracking-wide shadow-sm text-center cursor-pointer"
              >
                Explore Platform
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
