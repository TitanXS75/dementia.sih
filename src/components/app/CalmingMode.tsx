import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Volume2, VolumeX, X } from "lucide-react";

/**
 * Calming Mode (Xanti Bhab) — full-screen peaceful environment
 * Soft nature imagery, gentle ambient visuals, and soothing presence.
 * Accessible from anywhere via a permanent action.
 */
export default function CalmingMode() {
  const navigate = useNavigate();
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const controlTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-hide controls after 5 seconds
  useEffect(() => {
    controlTimer.current = setTimeout(() => setShowControls(false), 5000);
    return () => {
      if (controlTimer.current) clearTimeout(controlTimer.current);
    };
  }, []);

  const handleTap = () => {
    setShowControls(true);
    if (controlTimer.current) clearTimeout(controlTimer.current);
    controlTimer.current = setTimeout(() => setShowControls(false), 5000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#12241C] flex flex-col items-center justify-center select-none"
      onClick={handleTap}
    >
      {/* Gentle animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(27,56,43,0.6) 0%, transparent 70%), radial-gradient(ellipse at 70% 60%, rgba(217,119,6,0.15) 0%, transparent 60%)",
          }}
        />
        {/* Floating gentle circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#1B382B]/20 rounded-full blur-3xl animate-calming-float" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#D97706]/10 rounded-full blur-3xl animate-calming-float-slow" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#B24A2B]/8 rounded-full blur-3xl animate-calming-float-reverse" />
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center px-8 space-y-8">
        <div className="w-20 h-20 rounded-2xl bg-[#1B382B]/40 border border-[#FAF7F2]/10 flex items-center justify-center mx-auto">
          <Leaf className="w-9 h-9 text-[#D97706]/80" />
        </div>

        <div className="space-y-3">
          <h1 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2]/90 font-medium">
            You are safe.
          </h1>
          <p className="text-sm sm:text-base text-[#FAF7F2]/40 font-sans max-w-xs mx-auto leading-relaxed">
            Take a slow, deep breath. The morning sun is warm. Your family is
            nearby.
          </p>
        </div>

        {/* Breathing guide */}
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-2 border-[#D97706]/20 flex items-center justify-center animate-breathing">
            <div className="w-16 h-16 rounded-full bg-[#D97706]/10 flex items-center justify-center">
              <span className="text-xs text-[#FAF7F2]/50 font-sans font-medium">
                Breathe
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls — auto-hide */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between transition-opacity duration-500 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
          className="w-12 h-12 rounded-xl bg-[#FAF7F2]/10 border border-[#FAF7F2]/10 flex items-center justify-center text-[#FAF7F2]/50 hover:text-[#FAF7F2]/80 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/app/home");
          }}
          className="px-6 py-3 rounded-xl bg-[#FAF7F2]/10 border border-[#FAF7F2]/10 text-[#FAF7F2]/70 font-sans text-sm font-medium hover:bg-[#FAF7F2]/15 transition-colors"
        >
          I feel calm now
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/app/home");
          }}
          className="w-12 h-12 rounded-xl bg-[#FAF7F2]/10 border border-[#FAF7F2]/10 flex items-center justify-center text-[#FAF7F2]/50 hover:text-[#FAF7F2]/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
