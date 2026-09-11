import React, { useState } from "react";
import { UserCheck, MapPin, Clock, Sparkles, CheckCircle2 } from "lucide-react";

export default function MemoryToGames() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Record<string, string>>({
    faces: "Granddaughter Ananya",
    places: "Bokakhat Peda Stall",
    routines: "Drink warm ginger water",
  });
  const [feedback, setFeedback] = useState<string | null>(null);

  const games = [
    {
      id: "faces",
      title: "“Who is this?”",
      tag: "Family Faces",
      tagColor: "bg-olive-tint text-olive",
      icon: UserCheck,
      description:
        "Pairs beloved family portraits with gentle spoken hints in the patient's native dialect. The elder recognizes their grandchild or daughter without feeling like they are undergoing a test.",
      previewPrompt: "“Recognize Ananya celebrating her college convocation at Guwahati?”",
      sampleChoice: ["Granddaughter Ananya", "Niece Rimi", "Neighbor Sunita"],
      correct: "Granddaughter Ananya",
      successMsg: "Correct! Recognized granddaughter with peaceful warmth.",
    },
    {
      id: "places",
      title: "“Where did we go?”",
      tag: "Cherished Places",
      tagColor: "bg-terracotta-tint text-terracotta",
      icon: MapPin,
      description:
        "Culturally anchored questions around morning tea garden strolls in Jorhat, ferry rides on the Brahmaputra, or ancestral temple courtyards in Kamakhya.",
      previewPrompt: "“Where did we stop for hot ginger tea on our drive to Kaziranga?”",
      sampleChoice: ["Bokakhat Peda Stall", "Tezpur Ghat", "Shillong Peak"],
      correct: "Bokakhat Peda Stall",
      successMsg: "Recalled! The stop where we had tea and fresh milk sweets.",
    },
    {
      id: "routines",
      title: "“What comes next?”",
      tag: "Daily Sequences",
      tagColor: "bg-cream-dark text-on-surface-variant",
      icon: Clock,
      description:
        "Soothing, sequential prompts based on their real daily rhythm: steeping morning Assam CTC tea, tending orchids in the courtyard, and lighting the evening sandhya diya.",
      previewPrompt: "“After watering the potted ferns in the veranda, what is our morning routine?”",
      sampleChoice: ["Drink warm ginger water", "Check the gate lock", "Pack the suitcase"],
      correct: "Drink warm ginger water",
      successMsg: "Perfect sequence! Gentle daily habits preserved.",
    },
  ];

  const handleChoiceClick = (gameId: string, choice: string, correct: string, msg: string) => {
    setSelectedAnswer((prev) => ({ ...prev, [gameId]: choice }));
    if (choice === correct) {
      setFeedback(msg);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-[#FBF9F4] relative" id="memory-games">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: Scrapbook Heirloom Collage with Prehosted Indian Grandmother photo */}
          <div className="lg:col-span-6 relative">
            <div className="tactile-card p-3 sm:p-5 rounded-[32px] sm:rounded-[40px] shadow-tactile border border-olive/15 relative bg-white">
              <div className="relative rounded-[24px] sm:rounded-[30px] overflow-hidden bg-cream-card h-[340px] sm:h-[440px] lg:h-[480px]">
                <img
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80"
                  alt="Indian grandmother smiling tenderly on veranda"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Scrapbook Heirloom Tape Badges */}
              <div className="absolute -top-3 left-6 sm:left-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg shadow-md rotate-[-2deg] text-[11px] font-semibold text-olive border border-olive/15 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>Morning tea with Aita · Dibrugarh</span>
              </div>
              <div className="absolute -bottom-3 right-6 sm:right-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg shadow-md rotate-[2deg] text-[11px] font-semibold text-secondary border border-olive/15 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                <span>Bihu Celebration · Family Gathering</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Activity Previews */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-olive-tint border border-olive/15 text-olive text-xs font-semibold tracking-wider uppercase mb-4">
              Reminiscence Therapy
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl text-olive tracking-tight mb-4 leading-tight">
              Turn memories into moments of engagement.
            </h2>

            <p className="text-base sm:text-lg text-on-surface-variant mb-8 leading-relaxed">
              Cognitive therapy shouldn’t feel like an exam. We transform family photos, familiar voices, and daily rituals into calm, joyful interactive moments.
            </p>

            {/* Interactive Game Selector Tabs */}
            <div className="flex flex-col gap-3.5 w-full">
              {games.map((g, idx) => {
                const Icon = g.icon;
                const isSelected = activeTab === idx;
                const currentChoice = selectedAnswer[g.id];

                return (
                  <div
                    key={g.id}
                    onClick={() => setActiveTab(idx)}
                    className={`p-5 rounded-[24px] cursor-pointer transition-all border ${
                      isSelected
                        ? "bg-white shadow-tactile border-olive/30 ring-2 ring-olive/10"
                        : "bg-white/70 hover:bg-white border-olive/10 shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${
                          isSelected ? "bg-olive text-cream scale-105 shadow-sm" : "bg-cream-card text-olive"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-olive truncate">
                            {g.title}
                          </h4>
                          <span className={`text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-bold shrink-0 ${g.tagColor}`}>
                            {g.tag}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                          {g.description}
                        </p>

                        {/* Interactive mini-preview if active */}
                        {isSelected && (
                          <div className="mt-4 pt-3 border-t border-cream-border animate-in fade-in duration-200">
                            <div className="flex items-center justify-between gap-2 mb-2.5">
                              <p className="text-xs font-semibold text-secondary italic">
                                {g.previewPrompt}
                              </p>
                              <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
                                Tap to try
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {g.sampleChoice.map((choice, cIdx) => {
                                const isPicked = currentChoice === choice;
                                const isCorrect = choice === g.correct;

                                return (
                                  <button
                                    key={cIdx}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleChoiceClick(g.id, choice, g.correct, g.successMsg);
                                    }}
                                    className={`text-xs px-3.5 py-2 rounded-full font-medium transition-all focus:outline-none flex items-center gap-1.5 ${
                                      isPicked && isCorrect
                                        ? "bg-olive text-cream font-bold shadow-sm scale-[1.02]"
                                        : isPicked
                                        ? "bg-cream-dark text-olive font-semibold"
                                        : "bg-cream-card hover:bg-cream-dark text-on-surface-variant"
                                    }`}
                                  >
                                    <span>{choice}</span>
                                    {isPicked && isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-cream" />}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Tactile Feedback Banner */}
                            {feedback && isSelected && (
                              <div className="mt-3 px-3 py-1.5 rounded-xl bg-olive-tint text-olive text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                                <Sparkles className="w-3.5 h-3.5 text-secondary shrink-0" />
                                <span>{feedback}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
