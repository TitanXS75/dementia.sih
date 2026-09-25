import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, MapPin, ListOrdered, Shapes, ChevronRight } from "lucide-react";

const games = [
  {
    id: "faces",
    title: "Who is this?",
    subtitle: "Manuh Sinaki",
    description: "Recognize familiar family faces from cherished photographs.",
    icon: Users,
    gradient: "from-[#1B382B] to-[#234335]",
    accentColor: "text-[#E58A18]",
    accentBg: "bg-[#E58A18]/15",
  },
  {
    id: "places",
    title: "Where did we go?",
    subtitle: "Thai Xoron",
    description: "Remember beloved places from your life's journey.",
    icon: MapPin,
    gradient: "from-[#D97706]/90 to-[#B24A2B]/80",
    accentColor: "text-[#FAF7F2]",
    accentBg: "bg-white/15",
  },
  {
    id: "routine",
    title: "What comes next?",
    subtitle: "Doinik Niyom",
    description: "Arrange your daily routine in the right order.",
    icon: ListOrdered,
    gradient: "from-[#B24A2B] to-[#8B3A22]",
    accentColor: "text-[#FEF3C7]",
    accentBg: "bg-white/15",
  },
  {
    id: "culture",
    title: "Our Traditions",
    subtitle: "Xobdo aru Rong",
    description: "Identify regional objects, patterns, and cultural treasures.",
    icon: Shapes,
    gradient: "from-[#1B382B] to-[#12241C]",
    accentColor: "text-[#D97706]",
    accentBg: "bg-[#D97706]/15",
  },
];

export default function GamesHub() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="mb-1">
        <h1 className="font-serif text-xl text-[#1B382B] font-medium">
          Memory Games
        </h1>
        <p className="text-sm text-[#1F1914]/50 font-sans mt-0.5">
          Gentle exercises with familiar memories. No scores, no pressure.
        </p>
      </div>

      <div className="space-y-3">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => navigate(`/app/games/${game.id}`)}
            className={`w-full bg-gradient-to-r ${game.gradient} rounded-2xl p-5 text-left transition-all hover:scale-[1.01] active:scale-[0.99] group shadow-sm`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-xl ${game.accentBg} flex items-center justify-center shrink-0`}
              >
                <game.icon className={`w-6 h-6 ${game.accentColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-sans font-semibold text-[#FAF7F2] leading-tight">
                  {game.title}
                </p>
                <p className="text-[11px] font-sans text-[#FAF7F2]/50 mt-0.5 italic">
                  {game.subtitle}
                </p>
                <p className="text-xs font-sans text-[#FAF7F2]/65 mt-1 leading-relaxed">
                  {game.description}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#FAF7F2]/30 shrink-0 group-hover:text-[#FAF7F2]/60 transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
