"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, Sliders, Sparkles } from "lucide-react";

interface FamilyVoiceSectionProps {
  currentLang: string;
}

export default function FamilyVoiceSection({ currentLang }: FamilyVoiceSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const progressIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Audio prompt text mapped to selected language
  const promptMap: Record<string, { transcript: string; sub: string; speaker: string; langTag: string }> = {
    en: {
      transcript: "“It’s time for your medicine, Dad. Drink some warm water too.”",
      sub: "Daughter Ananya · Guwahati",
      speaker: "English & Assamese",
      langTag: "en-US",
    },
    as: {
      transcript: "“দেউতা, ঔষধ খোৱাৰ সময় হ'ল। অলপ গৰম পানীও খাই লওক।”",
      sub: "জীয়াৰী অনন্যা · গুৱাহাটী",
      speaker: "অসমীয়া",
      langTag: "as-IN",
    },
    bn: {
      transcript: "“বাবা, ওষুধ খাওয়ার সময় হয়ে গেছে। একটু জল খেয়ে নাও।”",
      sub: "মেয়ে অনন্যা · গুয়াহাটি",
      speaker: "বাংলা",
      langTag: "bn-IN",
    },
    brx: {
      transcript: "“आफा, मुलै लोंनो सम जाबाय। अननानै दै एसेल' लोंदो।”",
      sub: "फिसाजो अनन्या · गोहाटी",
      speaker: "बड़ो",
      langTag: "hi-IN",
    },
    mni: {
      transcript: "“ইপা, হিদাক চাবগী মতম ওইরে। ঈশিং খরা থকউ।”",
      sub: "মচা নুপী অনন্যা · গুৱাহাটী",
      speaker: "ꯃꯤꯇꯩꯂꯣꯟ",
      langTag: "hi-IN",
    },
    hi: {
      transcript: "“पापा, दवाई लेने का समय हो गया है। थोड़ा गुनगुना पानी भी पी लीजिए।”",
      sub: "बेटी अनन्या · गुवाहाटी",
      speaker: "हिंदी",
      langTag: "hi-IN",
    },
  };

  const activeVoice = promptMap[currentLang] || promptMap.en;

  const toggleVoicePlayback = () => {
    if (isPlaying) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      setAudioProgress(0);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    } else {
      setIsPlaying(true);
      setAudioProgress(0);

      // Trigger Web Speech API synthesis
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const cleanText = activeVoice.transcript.replace(/[“”]/g, "");
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 0.88; // Gentler, slower cadence for dementia care
        utterance.pitch = 1.08; // Warm, reassuring daughter cadence
        
        utterance.onend = () => {
          setIsPlaying(false);
          setAudioProgress(0);
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
          setAudioProgress(0);
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };

        window.speechSynthesis.speak(utterance);
      }

      // Animate progress bar over ~4.5 seconds
      const startTime = Date.now();
      const duration = 4500;
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, Math.round((elapsed / duration) * 100));
        setAudioProgress(pct);
        if (pct >= 100) {
          setIsPlaying(false);
          setAudioProgress(0);
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        }
      }, 50);
    }
  };

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <section className="w-full py-20 sm:py-24 lg:py-28 2xl:py-32 bg-primary text-on-primary relative overflow-hidden">
      {/* Ambient background aura */}
      <div className="absolute -bottom-20 -left-20 w-96 2xl:w-[36rem] h-96 2xl:h-[36rem] bg-primary-container rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 2xl:w-[30rem] h-80 2xl:h-[30rem] bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl text-on-primary tracking-tight mb-4 sm:mb-5">
            Hear a familiar voice.
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-primary-fixed-dim leading-relaxed">
            Clinical studies show dementia patients respond far more calmly to a loved one’s voice than a generic
            synthesized alert. SmritiSetu delivers daily reminders and games spoken by their own family.
          </p>
        </div>

        {/* Central Voice Card Player UI with Liquid Glass Dark Materiality */}
        <div className="max-w-2xl 2xl:max-w-3xl mx-auto liquid-glass-dark rounded-[32px] sm:rounded-[40px] p-6 sm:p-9 lg:p-12 relative backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-7">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-surface-container-lowest/15 text-on-primary text-xs font-semibold border border-white/10 shadow-sm truncate max-w-[280px] sm:max-w-none">
              <Volume2 className="w-4 h-4 text-secondary-container shrink-0" />
              <span className="truncate">Recorded by: {activeVoice.sub}</span>
            </div>

            <span className="px-3.5 py-1 rounded-full bg-surface-container-lowest/15 text-primary-fixed-dim text-xs font-bold shrink-0 border border-white/10">
              {activeVoice.speaker}
            </span>
          </div>

          {/* Transcript Display */}
          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-primary my-5 sm:my-7 leading-snug tracking-tight font-normal">
            {activeVoice.transcript}
          </blockquote>

          {/* Audio Sound Waveform Visualization */}
          <div className="w-full bg-primary/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-5 sm:mb-6 flex items-center gap-4 sm:gap-6 border border-white/10 shadow-inner">
            {/* Play Trigger Button */}
            <button
              onClick={toggleVoicePlayback}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 hover:bg-secondary-container hover:text-on-secondary-container transition-all active:scale-95 shadow-[0_8px_20px_-4px_rgba(153,70,42,0.6)] tactile-btn group focus:outline-none"
              aria-label={isPlaying ? "Pause voice sample" : "Play voice sample"}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
              ) : (
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-0.5" />
              )}
            </button>

            {/* Waveform Bars */}
            <div className="flex-1 flex items-center justify-between gap-1 sm:gap-2 h-12 sm:h-14 px-1 sm:px-2 overflow-hidden">
              {[4, 8, 12, 6, 9, 11, 7, 5, 10, 8, 12, 4, 9, 11, 6, 3, 8, 10].map((height, i) => {
                const isActiveBar = isPlaying;
                return (
                  <span
                    key={i}
                    style={{
                      height: `${height * 3}px`,
                      animationDelay: `${i * 70}ms`,
                    }}
                    className={`w-1 sm:w-1.5 rounded-full transition-all duration-300 ${
                      isActiveBar
                        ? i < 9
                          ? "bg-secondary animate-pulse"
                          : "bg-primary-fixed-dim animate-pulse"
                        : "bg-primary-fixed-dim/40"
                    }`}
                  />
                );
              })}
            </div>

            <span className="text-xs sm:text-sm font-mono text-primary-fixed-dim shrink-0">
              {isPlaying ? `0:0${Math.floor((audioProgress / 100) * 4)}` : "0:14"}
            </span>
          </div>

          {/* Progress bar */}
          {isPlaying && (
            <div className="w-full bg-black/30 rounded-full h-1.5 mb-4 overflow-hidden">
              <div
                className="bg-secondary-container h-full transition-all duration-100 ease-linear rounded-full"
                style={{ width: `${audioProgress}%` }}
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-primary-fixed-dim text-xs sm:text-sm font-medium pt-2 border-t border-white/10">
            <span className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-secondary-container shrink-0" />
              <span>Warm morning cadence · Coqui XTTS-v2</span>
            </span>
            <span className="text-on-primary/70 italic">Tap play to hear simulated voice</span>
          </div>
        </div>

        {/* 3-Step Simple Caregiver Flow with Bento Variety */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 text-center max-w-3xl 2xl:max-w-4xl mx-auto">
          <div className="p-6 rounded-3xl bg-primary-container/40 border border-primary-fixed/15 backdrop-blur-sm tactile-btn">
            <span className="text-xs font-bold text-secondary-container uppercase tracking-wider block mb-1">
              Step 1
            </span>
            <p className="font-serif text-lg sm:text-xl font-semibold text-on-primary">Record on phone</p>
            <p className="text-xs sm:text-sm text-primary-fixed-dim mt-2 leading-relaxed">
              Speak a simple 10-second reassurance or greeting clip.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-primary-container/40 border border-primary-fixed/15 backdrop-blur-sm tactile-btn">
            <span className="text-xs font-bold text-secondary-container uppercase tracking-wider block mb-1">
              Step 2
            </span>
            <p className="font-serif text-lg sm:text-xl font-semibold text-on-primary">Personalise prompt</p>
            <p className="text-xs sm:text-sm text-primary-fixed-dim mt-2 leading-relaxed">
              Tag with family photo, relationship name, and time of day.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-primary-container/40 border border-primary-fixed/15 backdrop-blur-sm tactile-btn">
            <span className="text-xs font-bold text-secondary-container uppercase tracking-wider block mb-1">
              Step 3
            </span>
            <p className="font-serif text-lg sm:text-xl font-semibold text-on-primary">Remind at 2:00 PM</p>
            <p className="text-xs sm:text-sm text-primary-fixed-dim mt-2 leading-relaxed">
              Plays calmly on the elder’s tablet with high-contrast text.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
