import React, { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  SunMedium,
  BookOpen,
  ImageIcon,
  Settings,
  LogOut,
  Globe,
  ChevronDown,
  User,
  Users,
  Stethoscope,
  ArrowLeft,
  Sparkles,
  Check,
} from "lucide-react";
import { useAuth } from "../../lib/useAuth";
import {
  getGreeting,
  getFormattedTime,
  getDaylightPhase,
} from "../../lib/daylight";
import { DEMO_ACCOUNTS, DemoAccount } from "../../lib/demoAccounts";

const tabs = [
  { to: "/app/home", icon: SunMedium, label: "Home" },
  { to: "/app/games", icon: BookOpen, label: "Games" },
  { to: "/app/memories", icon: ImageIcon, label: "Memories" },
  { to: "/app/settings", icon: Settings, label: "Settings" },
];

export default function AppShell() {
  const { user, login: authLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [time, setTime] = useState(getFormattedTime());
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const roleMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        roleMenuRef.current &&
        !roleMenuRef.current.contains(event.target as Node)
      ) {
        setRoleMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update clock every minute
  useEffect(() => {
    const interval = setInterval(() => setTime(getFormattedTime()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const phase = getDaylightPhase();
  const greeting = getGreeting(user?.language ?? "en", user?.name, phase);

  // Phase-based warm gradient for top bar
  const phaseGradient =
    phase === "morning"
      ? "from-[#FEF3C7] to-[#FAF7F2]"
      : phase === "noon"
        ? "from-[#FAF7F2] to-[#F5EFEB]"
        : phase === "evening"
          ? "from-[#FADBD2] to-[#FAF7F2]"
          : "from-[#E8E0D2] to-[#FAF7F2]";

  // Check if we're on the calming page — hide shell chrome
  const isCalming = location.pathname === "/app/calming";
  if (isCalming) {
    return <Outlet />;
  }

  const handleSwitchRole = (account: DemoAccount) => {
    authLogin({
      name: account.name,
      email: account.email,
      role: account.role,
      language: account.language,
    });
    setRoleMenuOpen(false);
  };

  const getRoleDotColor = (role?: string) => {
    switch (role) {
      case "patient":
        return "bg-[#D97706]";
      case "family":
        return "bg-[#1B382B]";
      case "asha":
        return "bg-[#B24A2B]";
      default:
        return "bg-[#1B382B]";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* ─── Top Greeting Bar ─── */}
      <header
        className={`sticky top-0 z-30 bg-gradient-to-b ${phaseGradient} border-b border-[#1B382B]/8 px-4 pt-3 pb-2.5 safe-area-top`}
      >
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex-1 min-w-0 pr-2">
            <p className="font-serif text-lg sm:text-xl text-[#1B382B] font-medium leading-snug truncate">
              {greeting}
            </p>
            <p className="text-xs text-[#1F1914]/55 font-sans mt-0.5 tracking-wide">
              {time}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick Role Switcher Pill */}
            <div className="relative" ref={roleMenuRef}>
              <button
                type="button"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide border border-[#1B382B]/15 rounded-lg px-2.5 py-1 bg-white/80 hover:bg-white transition-all shadow-xs cursor-pointer active:scale-95"
                title="Switch Role"
              >
                <span
                  className={`w-2 h-2 rounded-full ${getRoleDotColor(
                    user?.role
                  )}`}
                />
                <span className="capitalize text-[#1F1914]">
                  {user?.role ?? "Guest"}
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-[#1F1914]/50 transition-transform ${
                    roleMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-64 rounded-xl bg-white border border-[#1B382B]/15 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-2 py-1 border-b border-[#1B382B]/8 mb-1">
                    <p className="text-[10px] font-bold text-[#1B382B] uppercase tracking-wider">
                      Switch Active Role
                    </p>
                    <p className="text-[9px] text-[#1F1914]/50">
                      Browse different perspectives
                    </p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {DEMO_ACCOUNTS.map((account) => {
                      const isActive = user?.role === account.role;
                      return (
                        <button
                          key={account.role}
                          type="button"
                          onClick={() => handleSwitchRole(account)}
                          className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                            isActive
                              ? "bg-[#1B382B]/8 font-semibold text-[#1B382B]"
                              : "hover:bg-[#FAF7F2] text-[#1F1914]"
                          }`}
                        >
                          <div className="min-w-0 pr-1">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${getRoleDotColor(
                                  account.role
                                )}`}
                              />
                              <span className="truncate">
                                {account.roleLabel}
                              </span>
                            </div>
                            <span className="text-[10px] text-[#1F1914]/50 truncate block pl-3">
                              {account.name}
                            </span>
                          </div>
                          {isActive && (
                            <Check className="w-3.5 h-3.5 text-[#1B382B] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="border-t border-[#1B382B]/8 mt-1 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setRoleMenuOpen(false);
                        navigate("/");
                      }}
                      className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] text-[#1F1914]/70 hover:bg-[#FAF7F2] hover:text-[#1B382B] text-left cursor-pointer"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Back to Landing Page</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#1B382B]/50 font-semibold bg-[#1B382B]/5 rounded-lg px-2 py-1">
              <Globe className="w-3 h-3" />
              {(user?.language ?? "en").toUpperCase()}
            </span>
          </div>
        </div>
      </header>

      {/* ─── Page Content ─── */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-lg mx-auto px-4 py-4">
          <Outlet />
        </div>
      </main>

      {/* ─── Bottom Tab Bar ─── */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#1B382B]/8 safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-stretch">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors
                ${
                  isActive
                    ? "text-[#1B382B]"
                    : "text-[#1F1914]/35 hover:text-[#1F1914]/60"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1.5 rounded-xl transition-colors ${
                      isActive ? "bg-[#1B382B]/8" : ""
                    }`}
                  >
                    <tab.icon
                      className="w-5 h-5"
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-sans leading-none ${
                      isActive ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {tab.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
