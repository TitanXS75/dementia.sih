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
  Sparkles,
  Volume2,
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
    description: "Gentle reminiscence memory exercise",
    icon: BookOpen,
    to: "/app/games",
    color: "bg-[#1B382B]",
    textColor: "text-[#FAF7F2]",
    iconColor: "text-[#E58A18]",
  },
  {
    label: "Nostalgia Radio",
    description: "Bhupen Hazarika & classic melodies",
    icon: Music,
    to: "/app/calming",
    color: "bg-[#D97706]/10",
    textColor: "text-[#1F1914]",
    iconColor: "text-[#D97706]",
  },
  {
    label: "Family Photos",
    description: "Look at your children and grandchildren",
    icon: ImageIcon,
    to: "/app/memories",
    color: "bg-[#B24A2B]/10",
    textColor: "text-[#1F1914]",
    iconColor: "text-[#B24A2B]",
  },
  {
    label: "Calming Breath",
    description: "Peaceful atmosphere & gentle breathing",
    icon: Leaf,
    to: "/app/calming",
    color: "bg-[#1B382B]/10",
    textColor: "text-[#1F1914]",
    iconColor: "text-[#1B382B]",
  },
];

export default function PatientHomeScreen() {
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
      .limit(4)
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
      ? "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]/40 border-[#D97706]/20"
      : currentPhase === "noon"
        ? "bg-gradient-to-br from-[#FAF7F2] to-[#F5EFEB] border-[#1B382B]/10"
        : currentPhase === "evening"
          ? "bg-gradient-to-br from-[#FADBD2] to-[#F5EFEB] border-[#B24A2B]/20"
          : "bg-gradient-to-br from-[#E8E0D2] to-[#F5EFEB] border-[#1B382B]/10";

  return (
    <div className="space-y-6">
      {/* ─── Living Room Daylight Orientation Banner ─── */}
      <div
        className={`${daylightBg} rounded-3xl p-6 lg:p-8 border shadow-xs transition-all`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/80 border border-[#1B382B]/10 flex items-center justify-center shrink-0 shadow-xs">
              <PhaseIconComponent className="w-9 h-9 text-[#D97706]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider block mb-0.5">
                Bedside Living Room Orientation
              </span>
              <h1 className="font-serif text-2xl lg:text-3xl text-[#1B382B] font-bold leading-tight">
                {getDaylightDescription(currentPhase)}
              </h1>
              <p className="text-sm text-[#1F1914]/70 font-sans mt-1">
                {dateStr}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="font-serif text-3xl lg:text-4xl font-bold text-[#1B382B] block">
              {timeStr}
            </span>
            <span className="text-xs text-[#1F1914]/50">
              Jorhat, Assam • Calm Weather
            </span>
          </div>
        </div>
      </div>

      {/* ─── Daily Routine Timeline (Horizontal scrolling/flex on widescreen) ─── */}
      <div className="bg-white border border-[#1B382B]/15 rounded-3xl p-5 lg:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg lg:text-xl text-[#1B382B] font-bold">
            Today's Daily Rhythm
          </h2>
          <span className="text-xs text-[#1F1914]/50">
            Gentle markers for today
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {routineItems.map((item, i) => {
            const isCurrentPhase = item.phase === currentPhase;
            return (
              <div
                key={i}
                className={`flex flex-col items-center justify-center gap-2 rounded-2xl p-4 border transition-all text-center min-h-[90px]
                  ${
                    isCurrentPhase
                      ? "bg-[#1B382B] text-[#FAF7F2] border-[#1B382B] shadow-md scale-[1.02]"
                      : "bg-[#FAF7F2] text-[#1F1914]/70 border-[#1B382B]/10 hover:bg-white"
                  }`}
              >
                <item.icon
                  className={`w-6 h-6 ${
                    isCurrentPhase ? "text-[#E58A18]" : "text-[#1F1914]/40"
                  }`}
                  strokeWidth={1.8}
                />
                <div>
                  <span className="text-xs font-bold leading-none block">
                    {item.time}
                  </span>
                  <span
                    className={`text-[11px] leading-tight block mt-0.5 ${
                      isCurrentPhase ? "text-[#FAF7F2]/80" : "text-[#1F1914]/60"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 4 Large Touch Action Tiles (Widescreen 2x2 or 4x1) ─── */}
      <div>
        <h2 className="font-serif text-xl text-[#1B382B] font-bold mb-3.5">
          What would you like to do right now?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.to)}
              className={`${action.color} border border-[#1B382B]/15 hover:border-[#1B382B]/40 hover:shadow-lg transition-all rounded-3xl p-5 text-left flex flex-col justify-between min-h-[140px] cursor-pointer group active:scale-[0.98]`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/80 border border-[#1B382B]/10 flex items-center justify-center shrink-0 mb-4 group-hover:scale-105 transition-transform shadow-xs">
                <action.icon className={`w-6 h-6 ${action.iconColor}`} />
              </div>

              <div>
                <span className={`font-serif text-lg font-bold block ${action.textColor}`}>
                  {action.label}
                </span>
                <span className={`text-xs block mt-1 ${action.textColor} opacity-75`}>
                  {action.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Bottom Section: Recent Family Photos & Music ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Family Photos Card */}
        <div className="bg-white border border-[#1B382B]/15 rounded-3xl p-5 lg:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#B24A2B]" />
                <h3 className="font-serif text-lg text-[#1B382B] font-bold">
                  Your Family Memories
                </h3>
              </div>
              <button
                onClick={() => navigate("/app/memories")}
                className="text-xs font-semibold text-[#1B382B] hover:underline"
              >
                View All
              </button>
            </div>
            <p className="text-xs text-[#1F1914]/65 mb-4">
              Photos uploaded by daughter Ananya and grandson Aarav.
            </p>

            <div className="grid grid-cols-3 gap-2.5">
              {recentPhotos.length > 0 ? (
                recentPhotos.slice(0, 3).map((photo, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-[#FAF7F2] border border-[#1B382B]/15 rounded-none overflow-hidden relative group"
                  >
                    <img
                      src={photo.url}
                      alt={photo.label}
                      className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-1.5">
                      <span className="text-[10px] text-white font-medium truncate block">
                        {photo.label}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-6 text-xs text-[#1F1914]/50">
                  Family photos appear here automatically.
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => navigate("/app/memories")}
            className="w-full mt-4 h-11 rounded-2xl bg-[#FAF7F2] hover:bg-white border border-[#1B382B]/15 text-xs font-semibold text-[#1B382B] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Open Photo Album</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Nostalgia Melodies Card */}
        <div className="bg-gradient-to-br from-[#FEF3C7]/40 to-[#FAF7F2] border border-[#D97706]/25 rounded-3xl p-5 lg:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Music className="w-5 h-5 text-[#D97706]" />
              <h3 className="font-serif text-lg text-[#1B382B] font-bold">
                Vintage Melody Jukebox
              </h3>
            </div>
            <p className="text-xs text-[#1F1914]/75 leading-relaxed mb-4">
              Timeless classics that stimulate long-term memory: Bhupen Hazarika's "Manuhe Manuhor Babe", Jyoti Prasad Agarwala, and gentle bamboo flute.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-white border border-[#1B382B]/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Volume2 className="w-4 h-4 text-[#D97706]" />
                  <div>
                    <span className="font-bold text-[#1B382B] block">
                      Manuhe Manuhor Babe
                    </span>
                    <span className="text-[10px] text-[#1F1914]/50">
                      Dr. Bhupen Hazarika • Timeless Heritage
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#D97706] bg-[#D97706]/10 px-2 py-0.5 rounded-full">
                  Familiar
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-[#1B382B]/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Volume2 className="w-4 h-4 text-[#1B382B]" />
                  <div>
                    <span className="font-bold text-[#1B382B] block">
                      Gentle Assam Tea Garden Flute
                    </span>
                    <span className="text-[10px] text-[#1F1914]/50">
                      Evening Calming & Sunset Rest
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#1B382B] bg-[#1B382B]/10 px-2 py-0.5 rounded-full">
                  Peaceful
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/app/calming")}
            className="w-full mt-4 h-11 rounded-2xl bg-[#1B382B] hover:bg-[#12241C] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Leaf className="w-4 h-4 text-[#E58A18]" />
            <span>Start Calming Audio</span>
          </button>
        </div>
      </div>
    </div>
  );
}
