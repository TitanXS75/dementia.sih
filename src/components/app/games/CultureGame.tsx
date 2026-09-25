import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shapes, RefreshCw, CheckCircle2 } from "lucide-react";

const sampleQuestions = [
  {
    prompt: "Which of these is a traditional Assamese weaving pattern?",
    options: [
      { label: "Gamosa (red and white towel)", correct: true },
      { label: "A leather belt", correct: false },
      { label: "A wristwatch", correct: false },
    ],
  },
  {
    prompt: "What do people wear on their heads during Bihu celebrations?",
    options: [
      { label: "A helmet", correct: false },
      { label: "Japi (bamboo hat)", correct: true },
      { label: "A scarf", correct: false },
    ],
  },
  {
    prompt: "Which instrument fills the air during Rongali Bihu?",
    options: [
      { label: "Dhol (traditional drum)", correct: true },
      { label: "Piano", correct: false },
      { label: "Flute", correct: false },
    ],
  },
  {
    prompt: "What is the brass offering plate used in Assamese households?",
    options: [
      { label: "A copper pot", correct: false },
      { label: "Xorai (bell-metal plate)", correct: true },
      { label: "A clay bowl", correct: false },
    ],
  },
];

export default function CultureGame() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "responded" | "finished">("playing");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [encouragement, setEncouragement] = useState("");

  const encouragements = [
    "Wonderful! You know our traditions so well!",
    "Very good! Our culture lives in your heart.",
    "That's right! Beautiful heritage memory.",
    "Well done! These traditions are a part of you.",
  ];

  const gentleHints = [
    "That's alright. Think of the festivals you celebrated as a child.",
    "No worry. These beautiful traditions are always around us.",
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
            Our heritage stays alive in you!
          </h2>
          <p className="text-sm text-[#1F1914]/55 font-sans mt-2 max-w-xs">
            You carry the rich traditions of our land in your heart. That is truly
            beautiful.
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
            Our Traditions
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
              i === currentIndex ? "w-6 bg-[#B24A2B]" : i < currentIndex ? "w-1.5 bg-[#1B382B]/30" : "w-1.5 bg-[#1B382B]/10"
            }`}
          />
        ))}
      </div>

      <div className="bg-[#1B382B]/5 border border-[#1B382B]/10 rounded-2xl p-6 text-center">
        <Shapes className="w-8 h-8 text-[#B24A2B] mx-auto mb-3" />
        <p className="text-base font-sans text-[#1F1914]/85 leading-relaxed">
          {current.prompt}
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
            {currentIndex < sampleQuestions.length - 1 ? "Next Question" : "Finish"}
          </button>
        </div>
      )}
    </div>
  );
}
