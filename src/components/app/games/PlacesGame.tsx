import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Volume2, RefreshCw, CheckCircle2 } from "lucide-react";

const sampleQuestions = [
  {
    prompt: "Where did we drink warm morning ginger tea together?",
    image: "/images/indian_grandfather_assam.jpg",
    options: [
      { label: "Tea garden veranda in Jorhat", correct: true },
      { label: "The hospital", correct: false },
      { label: "The school courtyard", correct: false },
    ],
  },
  {
    prompt: "Which place did we visit to see the one-horned rhinoceros?",
    image: "/images/indian_grandfather_radio.jpg",
    options: [
      { label: "The market", correct: false },
      { label: "Kaziranga National Park", correct: true },
      { label: "The railway station", correct: false },
    ],
  },
  {
    prompt: "Where did we offer prayers during the harvest festival?",
    image: "/images/indian_grandmother_tea.jpg",
    options: [
      { label: "Kamakhya Temple", correct: true },
      { label: "The post office", correct: false },
      { label: "The river bank", correct: false },
    ],
  },
];

export default function PlacesGame() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "responded" | "finished">("playing");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [encouragement, setEncouragement] = useState("");

  const encouragements = [
    "Wonderful! You remember that beautiful place!",
    "Very good! Such a meaningful memory.",
    "That's right! We had lovely times there.",
  ];

  const gentleHints = [
    "That's alright. Close your eyes and think of the warm breeze there.",
    "No worry. This place holds many gentle memories.",
  ];

  const handleSelect = (index: number) => {
    if (gameState !== "playing") return;
    setSelectedOption(index);
    setGameState("responded");
    const isCorrect = sampleQuestions[currentIndex].options[index].correct;
    setEncouragement(
      isCorrect
        ? encouragements[Math.floor(Math.random() * encouragements.length)]
        : gentleHints[Math.floor(Math.random() * gentleHints.length)]
    );
  };

  const handleNext = () => {
    if (currentIndex < sampleQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setGameState("playing");
      setSelectedOption(null);
      setEncouragement("");
    } else {
      setGameState("finished");
    }
  };

  if (gameState === "finished") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-[#1B382B]/8 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-[#1B382B]" />
        </div>
        <div>
          <h2 className="font-serif text-xl text-[#1B382B] font-medium">
            Beautiful journey!
          </h2>
          <p className="text-sm text-[#1F1914]/55 font-sans mt-2 max-w-xs">
            You revisited places full of warmth today. Those memories are
            always with you.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setGameState("playing");
              setSelectedOption(null);
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

  const current = sampleQuestions[currentIndex];

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
            Where did we go?
          </h1>
          <p className="text-[11px] text-[#1F1914]/40 font-sans">
            {currentIndex + 1} of {sampleQuestions.length}
          </p>
        </div>
      </div>

      <div className="flex gap-1.5 justify-center">
        {sampleQuestions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === currentIndex ? "w-6 bg-[#D97706]" : i < currentIndex ? "w-1.5 bg-[#1B382B]/30" : "w-1.5 bg-[#1B382B]/10"
            }`}
          />
        ))}
      </div>

      <div className="border border-[#1B382B]/12 rounded-none overflow-hidden aspect-[4/3] max-w-xs mx-auto">
        <img src={current.image} alt="Place" className="w-full h-full object-cover" />
      </div>

      <div className="bg-[#FADBD2]/40 border border-[#B24A2B]/12 rounded-xl px-4 py-3 flex items-center gap-3">
        <MapPin className="w-5 h-5 text-[#B24A2B] shrink-0" />
        <p className="text-sm text-[#1F1914]/80 font-sans leading-snug italic">
          "{current.prompt}"
        </p>
      </div>

      <div className="space-y-2.5">
        {current.options.map((option, i) => {
          const isSelected = selectedOption === i;
          const isCorrect = option.correct;
          const showResult = gameState === "responded";
          let style = "bg-white border-[#1B382B]/10 text-[#1F1914]";
          if (showResult && isSelected && isCorrect) style = "bg-[#1B382B]/8 border-[#1B382B] text-[#1B382B]";
          else if (showResult && isSelected && !isCorrect) style = "bg-[#D97706]/8 border-[#D97706]/40 text-[#1F1914]";
          else if (showResult && isCorrect) style = "bg-[#1B382B]/5 border-[#1B382B]/20 text-[#1B382B]";

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={gameState !== "playing"}
              className={`w-full px-4 py-4 rounded-xl border text-left font-sans text-base font-medium transition-all ${style}
                ${gameState === "playing" ? "hover:border-[#1B382B]/30 active:scale-[0.98]" : ""}`}
              style={{ minHeight: "56px" }}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {gameState === "responded" && (
        <div className="space-y-3 animate-fade-in">
          <p className="text-center text-sm font-sans text-[#1B382B] font-medium px-4">
            {encouragement}
          </p>
          <button
            onClick={handleNext}
            className="w-full py-3.5 bg-[#1B382B] text-[#FAF7F2] font-sans font-semibold text-sm rounded-xl hover:bg-[#234335] transition-colors"
          >
            {currentIndex < sampleQuestions.length - 1 ? "Next Place" : "Finish"}
          </button>
        </div>
      )}
    </div>
  );
}
