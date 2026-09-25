import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  SunMedium,
  Pill,
  UtensilsCrossed,
  Armchair,
  Sunset,
  Moon,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface RoutineStep {
  id: string;
  label: string;
  time: string;
  icon: React.FC<any>;
  order: number;
}

const correctSequence: RoutineStep[] = [
  { id: "tea", label: "Morning tea", time: "6:30 AM", icon: SunMedium, order: 0 },
  { id: "medicine", label: "Take medicine", time: "8:00 AM", icon: Pill, order: 1 },
  { id: "lunch", label: "Lunch", time: "12:30 PM", icon: UtensilsCrossed, order: 2 },
  { id: "rest", label: "Afternoon rest", time: "2:00 PM", icon: Armchair, order: 3 },
  { id: "prayer", label: "Evening prayer", time: "5:00 PM", icon: Sunset, order: 4 },
  { id: "dinner", label: "Dinner", time: "8:00 PM", icon: Moon, order: 5 },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function RoutineGame() {
  const navigate = useNavigate();
  const [items, setItems] = useState<RoutineStep[]>(() => shuffle(correctSequence));
  const [gameState, setGameState] = useState<"playing" | "checking" | "finished">("playing");
  const [correctCount, setCorrectCount] = useState(0);

  const moveUp = (index: number) => {
    if (index === 0) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  const handleCheck = () => {
    let correct = 0;
    items.forEach((item, i) => {
      if (item.order === i) correct++;
    });
    setCorrectCount(correct);

    if (correct === items.length) {
      setGameState("finished");
    } else {
      setGameState("checking");
    }
  };

  const handleTryAgain = () => {
    setGameState("playing");
    setCorrectCount(0);
  };

  if (gameState === "finished") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-[#1B382B]/8 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-[#1B382B]" />
        </div>
        <div>
          <h2 className="font-serif text-xl text-[#1B382B] font-medium">
            Perfect routine!
          </h2>
          <p className="text-sm text-[#1F1914]/55 font-sans mt-2 max-w-xs">
            You know your daily rhythm beautifully. Each step of the day is
            familiar to you.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setItems(shuffle(correctSequence));
              setGameState("playing");
              setCorrectCount(0);
            }}
            className="flex items-center gap-2 px-5 py-3 bg-[#1B382B] text-[#FAF7F2] font-sans font-semibold text-sm rounded-xl hover:bg-[#234335] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Play Again
          </button>
          <button
            onClick={() => navigate("/app/games")}
            className="px-5 py-3 border border-[#1B382B]/15 text-[#1B382B] font-sans font-semibold text-sm rounded-xl hover:bg-[#1B382B]/5 transition-colors"
          >
            All Games
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/app/games")}
          className="w-10 h-10 rounded-xl border border-[#1B382B]/10 flex items-center justify-center hover:bg-[#1B382B]/5 transition-colors"
        >
          <ArrowLeft className="w-4.5 h-4.5 text-[#1B382B]" />
        </button>
        <div className="flex-1">
          <h1 className="font-serif text-lg text-[#1B382B] font-medium">
            What comes next?
          </h1>
          <p className="text-[11px] text-[#1F1914]/40 font-sans">
            Arrange your daily routine in order
          </p>
        </div>
      </div>

      <p className="text-sm text-[#1F1914]/60 font-sans bg-[#FEF3C7]/40 border border-[#D97706]/12 rounded-xl px-4 py-3">
        Move items up or down to put them in the right order, from morning to
        night.
      </p>

      <div className="space-y-2">
        {items.map((item, index) => {
          const isCorrectPosition = gameState === "checking" && item.order === index;
          const isWrongPosition = gameState === "checking" && item.order !== index;

          return (
            <div
              key={item.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all
                ${
                  isCorrectPosition
                    ? "bg-[#1B382B]/6 border-[#1B382B]/20"
                    : isWrongPosition
                      ? "bg-[#D97706]/6 border-[#D97706]/20"
                      : "bg-white border-[#1B382B]/8"
                }`}
            >
              <item.icon
                className={`w-5 h-5 shrink-0 ${
                  isCorrectPosition
                    ? "text-[#1B382B]"
                    : isWrongPosition
                      ? "text-[#D97706]"
                      : "text-[#1F1914]/40"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-sans font-medium text-[#1F1914]">
                  {item.label}
                </p>
                <p className="text-[10px] text-[#1F1914]/40 font-sans">
                  {item.time}
                </p>
              </div>
              {gameState === "playing" && (
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#1B382B]/40 hover:bg-[#1B382B]/5 hover:text-[#1B382B] disabled:opacity-20 transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === items.length - 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#1B382B]/40 hover:bg-[#1B382B]/5 hover:text-[#1B382B] disabled:opacity-20 transition-colors"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {gameState === "playing" && (
        <button
          onClick={handleCheck}
          className="w-full py-3.5 bg-[#1B382B] text-[#FAF7F2] font-sans font-semibold text-sm rounded-xl hover:bg-[#234335] transition-colors"
        >
          Check my order
        </button>
      )}

      {gameState === "checking" && (
        <div className="space-y-3 animate-fade-in">
          <p className="text-center text-sm font-sans text-[#1B382B] font-medium">
            {correctCount} of {items.length} are in the right place.
            {correctCount >= items.length - 1
              ? " Almost there!"
              : " Keep trying, you're doing well."}
          </p>
          <button
            onClick={handleTryAgain}
            className="w-full py-3.5 bg-[#D97706] text-[#FAF7F2] font-sans font-semibold text-sm rounded-xl hover:bg-[#B24A2B] transition-colors"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
