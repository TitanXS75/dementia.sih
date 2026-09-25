import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, RefreshCw, CheckCircle2 } from "lucide-react";
import { db, type MemoryAsset } from "../../../lib/db";

/* ─── Sample question pools (used when no user photos exist) ─── */
const sampleQuestions = [
  {
    prompt: "Look at this photo. Who is smiling with you?",
    image: "/images/indian_family_album.jpg",
    options: [
      { label: "My daughter", correct: true },
      { label: "My neighbour", correct: false },
      { label: "The teacher", correct: false },
    ],
  },
  {
    prompt: "Who is this person in the photograph?",
    image: "/images/indian_grandmother_tea.jpg",
    options: [
      { label: "My wife", correct: true },
      { label: "My sister", correct: false },
      { label: "A visitor", correct: false },
    ],
  },
  {
    prompt: "Do you remember this face? Who could it be?",
    image: "/images/indian_grandfather_assam.jpg",
    options: [
      { label: "That is me!", correct: true },
      { label: "My brother", correct: false },
      { label: "The doctor", correct: false },
    ],
  },
];

type GameState = "playing" | "responded" | "finished";

export default function FacesGame() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(sampleQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [encouragement, setEncouragement] = useState("");

  const encouragements = [
    "Wonderful! You remembered!",
    "Very good! Your memory is strong.",
    "That's right! Beautiful memory.",
    "Well done! Keep going.",
    "Lovely! You know your family well.",
  ];

  const gentleHints = [
    "That's alright. Look closely, this person loves you very much.",
    "No worry. Think about who visits you with warm tea.",
    "Take your time. This face is someone very dear.",
  ];

  const handleSelect = (index: number) => {
    if (gameState !== "playing") return;

    setSelectedOption(index);
    setGameState("responded");

    const isCorrect = questions[currentIndex].options[index].correct;
    if (isCorrect) {
      setEncouragement(
        encouragements[Math.floor(Math.random() * encouragements.length)]
      );
    } else {
      setEncouragement(
        gentleHints[Math.floor(Math.random() * gentleHints.length)]
      );
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setGameState("playing");
      setSelectedOption(null);
      setEncouragement("");
    } else {
      setGameState("finished");
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setGameState("playing");
    setSelectedOption(null);
    setEncouragement("");
  };

  const current = questions[currentIndex];

  if (gameState === "finished") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-[#1B382B]/8 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-[#1B382B]" />
        </div>
        <div>
          <h2 className="font-serif text-xl text-[#1B382B] font-medium">
            Well done!
          </h2>
          <p className="text-sm text-[#1F1914]/55 font-sans mt-2 max-w-xs">
            You spent time with your loved ones' photographs today. That was
            wonderful.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRestart}
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
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/app/games")}
          className="w-10 h-10 rounded-xl border border-[#1B382B]/10 flex items-center justify-center hover:bg-[#1B382B]/5 transition-colors"
        >
          <ArrowLeft className="w-4.5 h-4.5 text-[#1B382B]" />
        </button>
        <div className="flex-1">
          <h1 className="font-serif text-lg text-[#1B382B] font-medium">
            Who is this?
          </h1>
          <p className="text-[11px] text-[#1F1914]/40 font-sans">
            {currentIndex + 1} of {questions.length}
          </p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 justify-center">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === currentIndex
                ? "w-6 bg-[#D97706]"
                : i < currentIndex
                  ? "w-1.5 bg-[#1B382B]/30"
                  : "w-1.5 bg-[#1B382B]/10"
            }`}
          />
        ))}
      </div>

      {/* Photo */}
      <div className="border border-[#1B382B]/12 rounded-none overflow-hidden aspect-square max-w-xs mx-auto">
        <img
          src={current.image}
          alt="Memory photograph"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Voice prompt */}
      <div className="bg-[#FEF3C7]/50 border border-[#D97706]/15 rounded-xl px-4 py-3 flex items-center gap-3">
        <Volume2 className="w-5 h-5 text-[#D97706] shrink-0" />
        <p className="text-sm text-[#1F1914]/80 font-sans leading-snug italic">
          "{current.prompt}"
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {current.options.map((option, i) => {
          const isSelected = selectedOption === i;
          const isCorrect = option.correct;
          const showResult = gameState === "responded";

          let optionStyle = "bg-white border-[#1B382B]/10 text-[#1F1914]";
          if (showResult && isSelected && isCorrect) {
            optionStyle = "bg-[#1B382B]/8 border-[#1B382B] text-[#1B382B]";
          } else if (showResult && isSelected && !isCorrect) {
            optionStyle = "bg-[#D97706]/8 border-[#D97706]/40 text-[#1F1914]";
          } else if (showResult && isCorrect) {
            optionStyle = "bg-[#1B382B]/5 border-[#1B382B]/20 text-[#1B382B]";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={gameState !== "playing"}
              className={`w-full px-4 py-4 rounded-xl border text-left font-sans text-base font-medium transition-all
                ${optionStyle}
                ${gameState === "playing" ? "hover:border-[#1B382B]/30 hover:bg-[#1B382B]/3 active:scale-[0.98]" : ""}
              `}
              style={{ minHeight: "56px" }}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Encouragement + Next */}
      {gameState === "responded" && (
        <div className="space-y-3 animate-fade-in">
          <p className="text-center text-sm font-sans text-[#1B382B] font-medium px-4">
            {encouragement}
          </p>
          <button
            onClick={handleNext}
            className="w-full py-3.5 bg-[#1B382B] text-[#FAF7F2] font-sans font-semibold text-sm rounded-xl hover:bg-[#234335] transition-colors"
          >
            {currentIndex < questions.length - 1 ? "Next Photo" : "Finish"}
          </button>
        </div>
      )}
    </div>
  );
}
