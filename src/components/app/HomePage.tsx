import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  SunMedium,
  BookOpen,
  ImageIcon,
  Leaf,
  Music,
  Clock,
  Pill,
  Droplets,
  ChevronRight,
  Sun,
  Sunset,
  Moon,
  User,
  Users,
  Stethoscope,
  Upload,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../lib/useAuth";
import {
  getDaylightPhase,
  getDaylightDescription,
  getFormattedDate,
  getFormattedTime,
  type DaylightPhase,
} from "../../lib/daylight";
import { db } from "../../lib/db";

/* ─── Routine timeline data ─── */
const routineItems = [
  { phase: "morning" as const, time: "6:30 AM", label: "Morning tea", icon: SunMedium },
  { phase: "morning" as const, time: "8:00 AM", label: "Medicine", icon: Pill },
  { phase: "noon" as const, time: "12:30 PM", label: "Lunch", icon: Clock },
  { phase: "noon" as const, time: "2:00 PM", label: "Rest time", icon: Droplets },
  { phase: "evening" as const, time: "5:00 PM", label: "Evening prayer", icon: Sunset },
  { phase: "night" as const, time: "8:00 PM", label: "Dinner", icon: Moon },
];

/* ─── Quick action tiles ─── */
const quickActions = [
  {
    label: "Play a Game",
    description: "Memory exercises",
    icon: BookOpen,
    to: "/app/games",
    color: "bg-[#1B382B]",
    textColor: "text-[#FAF7F2]",
    iconColor: "text-[#E58A18]",
  },
  {
    label: "Listen to Music",
    description: "Familiar melodies",
    icon: Music,
    to: "/app/calming",
    color: "bg-[#D97706]/10",
    textColor: "text-[#1F1914]",
    iconColor: "text-[#D97706]",
  },
  {
    label: "Family Photos",
    description: "Precious memories",
    icon: ImageIcon,
    to: "/app/memories",
    color: "bg-[#B24A2B]/8",
    textColor: "text-[#1F1914]",
    iconColor: "text-[#B24A2B]",
  },
  {
    label: "Calming Mode",
    description: "Peace and rest",
    icon: Leaf,
    to: "/app/calming",
    color: "bg-[#1B382B]/8",
    textColor: "text-[#1F1914]",
    iconColor: "text-[#1B382B]",
  },
];

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState<DaylightPhase>(getDaylightPhase());
  const [dateStr, setDateStr] = useState(getFormattedDate(user?.language ?? "en"));
  const [timeStr, setTimeStr] = useState(getFormattedTime());
  const [recentPhotos, setRecentPhotos] = useState<{ url: string; label: string }[]>([]);

  // Update clock and phase every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase(getDaylightPhase());
      setTimeStr(getFormattedTime());
      setDateStr(getFormattedDate(user?.language ?? "en"));
    }, 60_000);
    return () => clearInterval(interval);
  }, [user?.language]);

  // Load recent photos from Dexie
  useEffect(() => {
    db.memoryAssets
      .where("type")
      .equals("photo")
      .limit(3)
      .toArray()
      .then((assets) => {
        setRecentPhotos(
          assets
            .filter((a) => a.url)
            .map((a) => ({ url: a.url!, label: a.label }))
        );
      })
      .catch(() => {});
  }, []);

  const phaseIcon =
    currentPhase === "morning"
      ? SunMedium
      : currentPhase === "noon"
        ? Sun
        : currentPhase === "evening"
          ? Sunset
          : Moon;

  const PhaseIconComponent = phaseIcon;

  // Daylight card warm tones
  const daylightBg =
    currentPhase === "morning"
      ? "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]/40"
      : currentPhase === "noon"
        ? "bg-gradient-to-br from-[#FAF7F2] to-[#F5EFEB]"
        : currentPhase === "evening"
          ? "bg-gradient-to-br from-[#FADBD2] to-[#F5EFEB]"
          : "bg-gradient-to-br from-[#E8E0D2] to-[#F5EFEB]";

  return (
    <div className="space-y-4">
      {/* ─── Active Role Banner ─── */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#1B382B]/10 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              user?.role === "patient"
                ? "bg-[#D97706]/15 text-[#D97706]"
                : user?.role === "family"
                  ? "bg-[#1B382B]/10 text-[#1B382B]"
                  : "bg-[#B24A2B]/10 text-[#B24A2B]"
            }`}
          >
            {user?.role === "patient" ? (
              <User className="w-4 h-4" />
            ) : user?.role === "family" ? (
              <Users className="w-4 h-4" />
            ) : (
              <Stethoscope className="w-4 h-4" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#1F1914] truncate">
                {user?.role === "patient"
                  ? "Bedside Tablet"
                  : user?.role === "family"
                    ? "Family Caregiver Portal"
                    : "ASHA Clinical Triage"}
              </span>
              <span
                className={`text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded font-semibold border ${
                  user?.role === "patient"
                    ? "bg-[#D97706]/10 text-[#D97706] border-[#D97706]/20"
                    : user?.role === "family"
                      ? "bg-[#1B382B]/10 text-[#1B382B] border-[#1B382B]/20"
                      : "bg-[#B24A2B]/10 text-[#B24A2B] border-[#B24A2B]/20"
                }`}
              >
                {user?.role ?? "patient"}
              </span>
            </div>
            <p className="text-[11px] text-[#1F1914]/60 truncate font-sans">
              Logged in as {user?.name ?? "Bapuram Baruah"}
            </p>
          </div>
        </div>

        <span className="text-[10px] font-semibold text-[#1B382B] bg-[#FAF7F2] border border-[#1B382B]/10 px-2 py-1 rounded-lg shrink-0">
          {user?.role === "patient"
            ? "Assam (Jorhat)"
            : user?.role === "family"
              ? "WhatsApp Sync Active"
              : "PHC Jorhat"}
        </span>
      </div>

      {/* Role-Specific Companion Card */}
      {user?.role === "family" && (
        <div className="bg-[#1B382B]/5 border border-[#1B382B]/15 rounded-2xl p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1B382B]">
              Elder Memory Companion
            </span>
            <span className="text-[10px] text-[#1F1914]/50">
              Cared for: Bapuram Baruah
            </span>
          </div>
          <p className="text-xs text-[#1F1914]/75 leading-relaxed">
            Upload family photographs or audio cues to keep your loved one connected to cherished roots and relatives.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => navigate("/app/memories")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#12241C] transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-[#E58A18]" />
              <span>Add Memory Photo</span>
            </button>
            <button
              onClick={() => navigate("/app/games")}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#1B382B]/15 text-[#1B382B] text-xs font-semibold hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            >
              Preview Games
            </button>
          </div>
        </div>
      )}

      {user?.role === "asha" && (
        <div className="bg-[#B24A2B]/5 border border-[#B24A2B]/20 rounded-2xl p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#B24A2B]" />
              <span className="text-xs font-bold text-[#B24A2B]">
                Clinical Stability Score
              </span>
            </div>
            <span className="text-[11px] font-bold text-[#1B382B] bg-white border border-[#1B382B]/10 px-2 py-0.5 rounded-md">
              84 / 100 • Stable
            </span>
          </div>
          <p className="text-xs text-[#1F1914]/75 leading-relaxed">
            Patient Bapuram Baruah completed 4 reminiscence game sessions this week. 0 disorientation alerts logged in the last 48 hours.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => navigate("/app/games")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#12241C] transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#E58A18]" />
              <span>Inspect Reminiscence Data</span>
            </button>
          </div>
        </div>
      )}

      {/* ─── Daylight Orientation Card ─── */}
      <div
        className={`${daylightBg} rounded-2xl p-5 border border-[#1B382B]/6`}
      >
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#D97706]/15 flex items-center justify-center shrink-0">
            <PhaseIconComponent className="w-6 h-6 text-[#D97706]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-serif text-base sm:text-lg text-[#1B382B] leading-snug">
              {getDaylightDescription(currentPhase)}
            </p>
            <p className="text-sm text-[#1F1914]/60 font-sans mt-1">
              {dateStr}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Daily Routine Timeline ─── */}
      <div>
        <h2 className="font-serif text-base text-[#1B382B] mb-3">
          Today's Routine
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          {routineItems.map((item, i) => {
            const isCurrentPhase = item.phase === currentPhase;
            return (
              <div
                key={i}
                className={`shrink-0 flex flex-col items-center gap-1.5 rounded-xl px-3 py-2.5 min-w-[72px] border transition-all
                  ${
                    isCurrentPhase
                      ? "bg-[#1B382B] text-[#FAF7F2] border-[#1B382B] shadow-sm"
                      : "bg-white text-[#1F1914]/60 border-[#1B382B]/8"
                  }`}
              >
                <item.icon
                  className={`w-4.5 h-4.5 ${
                    isCurrentPhase ? "text-[#E58A18]" : "text-[#1F1914]/35"
                  }`}
                  strokeWidth={1.8}
                />
                <span className="text-[10px] font-sans font-semibold leading-none">
                  {item.time}
                </span>
                <span
                  className={`text-[9px] font-sans leading-none ${
                    isCurrentPhase ? "text-[#FAF7F2]/70" : "text-[#1F1914]/40"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Quick Action Tiles (2x2 Grid) ─── */}
      <div>
        <h2 className="font-serif text-base text-[#1B382B] mb-3">
          What would you like to do?
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.to)}
              className={`${action.color} rounded-2xl p-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98] border border-[#1B382B]/5 min-h-[120px] flex flex-col justify-between`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  action.color === "bg-[#1B382B]"
                    ? "bg-white/10"
                    : "bg-white/70"
                }`}
              >
                <action.icon className={`w-5 h-5 ${action.iconColor}`} />
              </div>
              <div className="mt-2">
                <p
                  className={`text-sm font-sans font-semibold ${action.textColor} leading-tight`}
                >
                  {action.label}
                </p>
                <p
                  className={`text-[11px] font-sans mt-0.5 ${
                    action.color === "bg-[#1B382B]"
                      ? "text-[#FAF7F2]/55"
                      : "text-[#1F1914]/45"
                  }`}
                >
                  {action.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Recent Family Photos Strip ─── */}
      {recentPhotos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-serif text-base text-[#1B382B]">
              Family Memories
            </h2>
            <button
              onClick={() => navigate("/app/memories")}
              className="text-xs text-[#D97706] font-sans font-semibold flex items-center gap-0.5 hover:underline"
            >
              View all
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {recentPhotos.map((photo, i) => (
              <button
                key={i}
                onClick={() => navigate("/app/memories")}
                className="shrink-0 group"
              >
                <div className="w-24 h-24 rounded-none border border-[#1B382B]/12 overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.label}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-[9px] font-sans text-[#1F1914]/50 mt-1 max-w-[96px] truncate text-center">
                  {photo.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
