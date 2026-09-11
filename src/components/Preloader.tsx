import React, { useState, useEffect } from "react";

interface PreloaderProps {
  brandName?: string;
  minDuration?: number;
  onComplete?: () => void;
}

export default function Preloader({
  brandName = "SMRITISETU",
  minDuration = 1900,
  onComplete,
}: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();

    const handleComplete = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        setIsFadingOut(true);
        if (onComplete) onComplete();
        // After slow curtain exit transition finishes (1000ms), unmount cleanly
        setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      handleComplete();
    } else {
      window.addEventListener("load", handleComplete, { once: true });
      const fallbackTimeout = setTimeout(handleComplete, minDuration + 600);
      return () => {
        clearTimeout(fallbackTimeout);
        window.removeEventListener("load", handleComplete);
      };
    }
  }, [minDuration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FBF9F4] overflow-hidden px-6 transition-all duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isFadingOut
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      <style>{`
        @keyframes preloader-bar {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(380%); }
        }
        .animate-preloader-bar {
          animation: preloader-bar 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Brand Title - Solid, calm, elegant, NO blinking */}
      <div className="text-[#1E4334] font-serif font-light tracking-[0.25em] sm:tracking-[0.45em] md:tracking-[0.7em] text-3xl sm:text-5xl md:text-6xl text-center select-none opacity-100">
        {brandName}
      </div>

      {/* Minimalist 1px Track with Slow Steady Gliding Line */}
      <div className="mt-8 w-40 sm:w-56 h-px bg-[#1E4334]/15 overflow-hidden relative">
        <div className="absolute top-0 left-0 h-full w-1/3 bg-[#1E4334] animate-preloader-bar" />
      </div>
    </div>
  );
}
