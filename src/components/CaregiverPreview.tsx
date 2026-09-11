"use client";

import React, { useState } from "react";
import { Bell } from "lucide-react";

export default function CaregiverPreview() {
  const [selectedDay, setSelectedDay] = useState<number>(5); // Saturday

  const weekData = [
    { day: "M", label: "Monday", height: "h-9", val: "18m", status: "Steady" },
    { day: "T", label: "Tuesday", height: "h-10", val: "22m", status: "Calm & Engaged" },
    { day: "W", label: "Wednesday", height: "h-8", val: "15m", status: "Steady" },
    { day: "T", label: "Thursday", height: "h-11", val: "25m", status: "Enjoyed Photos" },
    { day: "F", label: "Friday", height: "h-10", val: "20m", status: "Steady" },
    { day: "S", label: "Saturday", height: "h-12", val: "28m", status: "Completed All 3 Games" },
    { day: "S", label: "Sunday", height: "h-4", val: "Rest", status: "Scheduled Rest" },
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 2xl:py-28 bg-surface-container-low/40" id="care-teams">
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl text-primary tracking-tight mb-4">
            Know how they’re doing. Without drowning in data.
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-on-surface-variant leading-relaxed">
            SmritiSetu turns daily interactions into a simple, doctor-readable picture that families and community health
            workers can understand in 5 seconds.
          </p>
        </div>

        {/* Realistic Minimalist Dashboard Card */}
        <div className="max-w-4xl 2xl:max-w-5xl mx-auto bg-surface-container-lowest rounded-[28px] sm:rounded-[36px] p-5 sm:p-8 lg:p-10 shadow-xl border border-surface-container-high/60">
          {/* Header Ribbon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-surface-container-high/60 gap-4">
            <div>
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                Caregiver Console · Jorhat District
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl 2xl:text-4xl text-primary font-bold mt-0.5">
                Priya Devi <span className="text-base sm:text-lg font-normal text-on-surface-variant">(Mother, 72 yrs)</span>
              </h3>
            </div>

            <div className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary-fixed/50 text-primary text-xs sm:text-sm font-semibold self-start sm:self-auto border border-primary/20">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              <span>Status: Stable (Green Flag) · Active at 9:30 AM</span>
            </div>
          </div>

          {/* 3 Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 my-6 sm:my-8">
            <div className="bg-surface-container-low/70 p-4 sm:p-5 rounded-2xl border border-surface-container-high/40">
              <span className="text-xs font-medium text-on-surface-variant">Weekly Engagement</span>
              <div className="font-serif text-2xl sm:text-3xl 2xl:text-4xl text-primary font-bold mt-1">5 Sessions</div>
              <p className="text-xs text-surface-tint font-semibold mt-1">15–20 min peaceful routine</p>
            </div>

            <div className="bg-surface-container-low/70 p-4 sm:p-5 rounded-2xl border border-surface-container-high/40">
              <span className="text-xs font-medium text-on-surface-variant">Cognitive Recall Trend</span>
              <div className="font-serif text-2xl sm:text-3xl 2xl:text-4xl text-primary font-bold mt-1">92% Steady</div>
              <p className="text-xs text-surface-tint font-semibold mt-1">Faces &amp; daily sequence intact</p>
            </div>

            <div className="bg-surface-container-low/70 p-4 sm:p-5 rounded-2xl border border-surface-container-high/40">
              <span className="text-xs font-medium text-on-surface-variant">Response Latency</span>
              <div className="font-serif text-2xl sm:text-3xl 2xl:text-4xl text-secondary font-bold mt-1">3.8s Avg</div>
              <p className="text-xs text-secondary font-semibold mt-1">No sign of cognitive agitation</p>
            </div>
          </div>

          {/* Bottom Grid: Next Reminder + Weekly Chart */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 pt-2 items-center">
            {/* Next scheduled prompt */}
            <div className="md:col-span-6 bg-surface-container-high/40 p-4 sm:p-5 rounded-2xl border border-surface-container-high flex items-center gap-3.5 sm:gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-md">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                    Upcoming Today
                  </span>
                  <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary font-semibold">
                    Voice Alert
                  </span>
                </div>
                <p className="font-serif text-base sm:text-lg font-semibold text-primary mt-0.5 truncate">
                  Afternoon Medicine · 2:00 PM
                </p>
                <p className="text-xs text-on-surface-variant truncate">
                  Spoken in son Rahul&#39;s voice with 1-tap confirmation
                </p>
              </div>
            </div>

            {/* Minimal Weekly Trend SVG Bar Chart */}
            <div className="md:col-span-6 bg-surface-container-low/70 p-4 sm:p-5 rounded-2xl border border-surface-container-high/40">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-on-surface-variant">
                  Weekly Routine Consistency
                </span>
                <span className="text-xs font-bold text-primary">
                  {weekData[selectedDay].label}: {weekData[selectedDay].val}
                </span>
              </div>

              {/* Interactive Bar Visualization */}
              <div className="flex items-end justify-between h-14 sm:h-16 px-2 sm:px-3 pt-2">
                {weekData.map((item, idx) => {
                  const isSelected = selectedDay === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDay(idx)}
                      className="flex flex-col items-center gap-1.5 focus:outline-none group"
                      title={`${item.label}: ${item.val}`}
                    >
                      <div
                        className={`w-6 sm:w-7 rounded-t-md transition-all duration-300 ${item.height} ${
                          isSelected
                            ? "bg-secondary ring-2 ring-secondary/30 scale-105"
                            : idx === 6
                            ? "bg-surface-variant group-hover:bg-surface-tint"
                            : "bg-primary group-hover:bg-primary-container"
                        }`}
                      />
                      <span
                        className={`text-[10px] sm:text-[11px] font-semibold ${
                          isSelected ? "text-secondary font-bold" : "text-on-surface-variant"
                        }`}
                      >
                        {item.day}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 text-center text-[10px] sm:text-[11px] text-surface-tint font-medium">
                {weekData[selectedDay].status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
