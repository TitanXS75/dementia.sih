import React, { useState } from "react";
import { Globe, Menu, X, ChevronDown } from "lucide-react";

interface HeaderProps {
  onOpenRoleModal: (role?: string) => void;
  currentLang: string;
  onSelectLang: (lang: string) => void;
  onNavigateFaq?: () => void;
}

export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "as", label: "Assamese", native: "অসমীয়া" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "brx", label: "Bodo", native: "बड़ो" },
  { code: "mni", label: "Manipuri", native: "ꯃꯤꯇꯩꯂꯣꯟ" },
  { code: "hi", label: "Hindi", native: "हिंदी" },
];

export default function Header({
  onOpenRoleModal,
  currentLang,
  onSelectLang,
  onNavigateFaq,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#1E4334]/10 transition-all">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Logo - Just SmritiSetu */}
        <a href="#" className="flex items-center focus:outline-none shrink-0 group">
          <span className="font-serif text-2xl font-bold tracking-tight text-[#1E4334] group-hover:text-[#142F24] transition-colors leading-none">
            SmritiSetu<span className="text-[#C8F028]">.</span>
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
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-xs font-medium text-[#1A1814] border border-[#1E4334]/15 hover:bg-[#F7F5F0] transition-all focus:outline-none shadow-xs"
            >
              <Globe className="w-3.5 h-3.5 text-[#1E4334]" />
              <span>{activeLangObj.native}</span>
              <ChevronDown className="w-3 h-3 text-on-surface-variant" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#1E4334]/15 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Select Language
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                      currentLang === lang.code
                        ? "bg-[#1E4334] text-white font-medium"
                        : "text-[#1A1814] hover:bg-[#F7F5F0]"
                    }`}
                  >
                    <span>{lang.label}</span>
                    <span className="text-[11px] opacity-75">{lang.native}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clean Pill Button */}
          <button
            onClick={() => onOpenRoleModal()}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#1E4334] text-white hover:bg-[#142F24] font-semibold text-xs tracking-wide transition-all shadow-sm active:scale-95"
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
            <div className="pt-2 border-t border-[#1E4334]/10 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRoleModal();
                }}
                className="w-full py-3 rounded-full bg-[#1E4334] text-white font-semibold text-xs tracking-wide shadow-sm text-center"
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
