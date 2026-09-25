import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Globe, Type, User, ChevronRight, ShieldCheck } from "lucide-react";
import { useAuth, type UserRole } from "../../lib/useAuth";

const languages = [
  { code: "en", label: "English" },
  { code: "as", label: "অসমীয়া (Assamese)" },
  { code: "bn", label: "বাংলা (Bengali)" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "brx", label: "Bodo" },
  { code: "mni", label: "Manipuri" },
];

const textSizes = [
  { value: "normal", label: "Normal" },
  { value: "large", label: "Large" },
  { value: "xlarge", label: "Very Large" },
];

export default function SettingsPage() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showLang, setShowLang] = useState(false);
  const [showTextSize, setShowTextSize] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const currentLangLabel =
    languages.find((l) => l.code === user?.language)?.label ?? "English";

  return (
    <div className="max-w-3xl space-y-5">
      <div>
        <h1 className="font-serif text-xl text-[#1B382B] font-medium">
          Settings
        </h1>
        <p className="text-sm text-[#1F1914]/50 font-sans mt-0.5">
          Customize your experience
        </p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-[#1B382B]/8 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#1B382B] flex items-center justify-center">
            <User className="w-5 h-5 text-[#FAF7F2]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-sans text-base font-semibold text-[#1F1914] truncate">
              {user?.name ?? "Guest"}
            </p>
            <p className="text-xs text-[#1F1914]/45 font-sans truncate">
              {user?.email ?? "Demo mode"}
            </p>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#D97706] font-sans font-semibold bg-[#D97706]/8 px-2 py-1 rounded-lg">
            {user?.role ?? "patient"}
          </span>
        </div>
      </div>

      {/* Settings list */}
      <div className="bg-white rounded-2xl border border-[#1B382B]/8 divide-y divide-[#1B382B]/5 overflow-hidden">
        {/* Language */}
        <button
          onClick={() => setShowLang(!showLang)}
          className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#1B382B]/3 transition-colors text-left"
        >
          <Globe className="w-5 h-5 text-[#1B382B]/50" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-sans font-medium text-[#1F1914]">
              Language
            </p>
            <p className="text-xs text-[#1F1914]/40 font-sans">
              {currentLangLabel}
            </p>
          </div>
          <ChevronRight
            className={`w-4 h-4 text-[#1F1914]/25 transition-transform ${
              showLang ? "rotate-90" : ""
            }`}
          />
        </button>

        {showLang && (
          <div className="px-4 py-2 space-y-0.5 bg-[#FAF7F2]/50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  updateUser({ language: lang.code });
                  setShowLang(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-sans transition-colors
                  ${
                    user?.language === lang.code
                      ? "bg-[#1B382B] text-[#FAF7F2] font-semibold"
                      : "text-[#1F1914]/70 hover:bg-[#1B382B]/5"
                  }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        )}

        {/* Text Size */}
        <button
          onClick={() => setShowTextSize(!showTextSize)}
          className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#1B382B]/3 transition-colors text-left"
        >
          <Type className="w-5 h-5 text-[#1B382B]/50" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-sans font-medium text-[#1F1914]">
              Text Size
            </p>
            <p className="text-xs text-[#1F1914]/40 font-sans">Normal</p>
          </div>
          <ChevronRight
            className={`w-4 h-4 text-[#1F1914]/25 transition-transform ${
              showTextSize ? "rotate-90" : ""
            }`}
          />
        </button>

        {showTextSize && (
          <div className="px-4 py-2 space-y-0.5 bg-[#FAF7F2]/50">
            {textSizes.map((size) => (
              <button
                key={size.value}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-sans text-[#1F1914]/70 hover:bg-[#1B382B]/5 transition-colors"
              >
                {size.label}
              </button>
            ))}
          </div>
        )}

        {/* Privacy */}
        <div className="flex items-center gap-3 px-4 py-3.5">
          <ShieldCheck className="w-5 h-5 text-[#1B382B]/50" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-sans font-medium text-[#1F1914]">
              Privacy
            </p>
            <p className="text-xs text-[#1F1914]/40 font-sans">
              All data stays on your device
            </p>
          </div>
        </div>
      </div>

      {/* Sign Out Button - Bright & High-Contrast */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 bg-[#B24A2B] hover:bg-[#963C21] text-white shadow-sm font-sans text-sm font-semibold rounded-2xl transition-all active:scale-[0.99] cursor-pointer"
      >
        <LogOut className="w-4 h-4 text-white" />
        <span>Sign Out</span>
      </button>

      {/* App version */}
      <p className="text-center text-[10px] text-[#1F1914]/25 font-sans">
        SmritiSetu v0.2.0 — Built for SIH
      </p>
    </div>
  );
}
