import React, { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  SunMedium,
  BookOpen,
  ImageIcon,
  Settings,
  Globe,
  ChevronDown,
  User,
  Users,
  Stethoscope,
  ArrowLeft,
  Check,
  Leaf,
  Activity,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../lib/useAuth";
import {
  getGreeting,
  getFormattedTime,
  getDaylightPhase,
} from "../../lib/daylight";
import { DEMO_ACCOUNTS, DemoAccount } from "../../lib/demoAccounts";
import GoogleTranslate from "../GoogleTranslate";

export default function AppShell() {
  const { user, login: authLogin, updateUser, logout } = useAuth();
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

  // Role-customized navigation tabs
  const getTabsForRole = (role?: string) => {
    switch (role) {
      case "asha":
        return [
          { to: "/app/home", icon: Stethoscope, label: "Caseload Triage" },
          { to: "/app/games", icon: BookOpen, label: "Cognitive Games" },
          { to: "/app/settings", icon: Settings, label: "Clinical Setup" },
        ];
      case "family":
        return [
          { to: "/app/home", icon: Users, label: "Elder Companion" },
          { to: "/app/memories", icon: ImageIcon, label: "Memory Vault" },
          { to: "/app/games", icon: BookOpen, label: "Preview Games" },
          { to: "/app/settings", icon: Settings, label: "Settings" },
        ];
      default:
        return [
          { to: "/app/home", icon: SunMedium, label: "Bedside Living Room" },
          { to: "/app/games", icon: BookOpen, label: "Memory Games" },
          { to: "/app/memories", icon: ImageIcon, label: "Family Photos" },
          { to: "/app/settings", icon: Settings, label: "Settings" },
        ];
    }
  };

  const currentTabs = getTabsForRole(user?.role);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* ─── Top Responsive Header ─── */}
      <header
        className={`sticky top-0 z-30 bg-gradient-to-b ${phaseGradient} border-b border-[#1B382B]/10 px-4 sm:px-6 lg:px-8 h-16 safe-area-top shadow-2xs backdrop-blur-md flex items-center`}
      >
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-3 sm:gap-6">
          {/* Left: Brand + Role Perspective Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate("/")}
              className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1B382B] hover:text-[#12241C] transition-colors flex items-center cursor-pointer"
              title="Return to Landing Page"
            >
              <span>SmritiSetu</span>
              <span className="text-[#D97706]">.</span>
            </button>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#1B382B]/8 text-[#1B382B] border border-[#1B382B]/12">
              <span className={`w-1.5 h-1.5 rounded-full ${getRoleDotColor(user?.role)}`} />
              {user?.role === "patient"
                ? "Bedside Tablet"
                : user?.role === "family"
                  ? "Family Companion"
                  : "Clinical Triage"}
            </span>
          </div>

          {/* Center (Desktop): Floating Pill Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 backdrop-blur-md border border-[#1B382B]/12 rounded-full p-1 shadow-2xs">
            {currentTabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#1B382B] text-white shadow-xs"
                      : "text-[#1F1914]/70 hover:text-[#1B382B] hover:bg-[#1B382B]/5"
                  }`
                }
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right Actions: Daylight Time + Role Switcher Dropdown + Landing Exit */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Daylight / Live Time Pill (Desktop) */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#1B382B]/10 text-xs text-[#1F1914]/70 font-medium shadow-2xs">
              <SunMedium className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="capitalize">{phase}</span>
              <span className="text-[#1F1914]/30">•</span>
              <span className="font-mono text-[11px]">{time}</span>
            </div>

            {/* Quick Role Switcher */}
            <div className="relative" ref={roleMenuRef}>
              <button
                type="button"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide border border-[#1B382B]/15 rounded-full px-3 py-1.5 bg-white/90 hover:bg-white hover:border-[#1B382B]/35 transition-all shadow-2xs cursor-pointer active:scale-95"
                title="Switch Active Role"
              >
                <span
                  className={`w-2 h-2 rounded-full ${getRoleDotColor(
                    user?.role
                  )}`}
                />
                <span className="capitalize text-[#1F1914] truncate max-w-[110px] sm:max-w-none">
                  {user?.role === "asha"
                    ? "Clinician / ASHA"
                    : user?.role === "family"
                      ? "Caregiver"
                      : "Patient"}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#1F1914]/50 transition-transform ${
                    roleMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-[#1B382B]/15 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-2.5 py-1.5 border-b border-[#1B382B]/8 mb-1.5">
                    <p className="text-[10px] font-bold text-[#1B382B] uppercase tracking-wider">
                      Switch Role Perspective
                    </p>
                    <p className="text-[10px] text-[#1F1914]/50">
                      Explore how each persona interacts with SmritiSetu
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    {DEMO_ACCOUNTS.map((account) => {
                      const isActive = user?.role === account.role;
                      return (
                        <button
                          key={account.role}
                          type="button"
                          onClick={() => handleSwitchRole(account)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                            isActive
                              ? "bg-[#1B382B]/10 font-bold text-[#1B382B]"
                              : "hover:bg-[#FAF7F2] text-[#1F1914]"
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-2 h-2 rounded-full ${getRoleDotColor(
                                  account.role
                                )}`}
                              />
                              <span className="truncate font-semibold">
                                {account.roleLabel}
                              </span>
                              <span className="text-[9px] uppercase px-1.5 py-0.2 bg-[#1B382B]/5 rounded font-mono">
                                {account.badge}
                              </span>
                            </div>
                            <span className="text-[10px] text-[#1F1914]/55 truncate block pl-3.5 mt-0.5">
                              {account.name} • {account.subtitle}
                            </span>
                          </div>
                          {isActive && (
                            <Check className="w-4 h-4 text-[#1B382B] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="border-t border-[#1B382B]/8 mt-1.5 pt-1.5 space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setRoleMenuOpen(false);
                        navigate("/");
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-[#1F1914]/70 hover:bg-[#FAF7F2] hover:text-[#1B382B] text-left cursor-pointer transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Landing Page</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRoleMenuOpen(false);
                        logout();
                        navigate("/");
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#B24A2B] hover:bg-[#963C21] text-left cursor-pointer transition-all shadow-2xs active:scale-[0.98]"
                    >
                      <LogOut className="w-3.5 h-3.5 text-white" />
                      <span>Sign Out Session</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Language Selector */}
            <GoogleTranslate
              className="!h-8 !px-3 !rounded-full !bg-white/90 hover:!bg-white !border-[#1B382B]/15 hover:!border-[#1B382B]/35 !text-xs !shadow-2xs"
              onLanguageChange={(langCode) => updateUser({ language: langCode })}
            />
          </div>
        </div>
      </header>

      {/* ─── Responsive Page Content (Full width max-w-7xl on desktop) ─── */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>

      {/* ─── Mobile Bottom Tab Bar (Only visible on small screens < md) ─── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#1B382B]/10 safe-area-bottom">
        <div className="flex items-stretch justify-around px-2">
          {currentTabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors
                ${
                  isActive
                    ? "text-[#1B382B]"
                    : "text-[#1F1914]/40 hover:text-[#1F1914]/70"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-xl transition-colors ${
                      isActive ? "bg-[#1B382B]/10" : ""
                    }`}
                  >
                    <tab.icon
                      className="w-5 h-5"
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-sans leading-none ${
                      isActive ? "font-bold text-[#1B382B]" : "font-medium"
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
