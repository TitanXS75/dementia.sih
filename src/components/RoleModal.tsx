"use client";

import React, { useState } from "react";
import {
  X,
  User,
  Users,
  ClipboardCheck,
  Mic,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  FileDown,
  Layers,
  Sparkles,
  WifiOff,
  ShieldCheck,
  ArrowRight,
  Heart,
} from "lucide-react";

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: string;
}

export default function RoleModal({ isOpen, onClose, initialRole = "patient" }: RoleModalProps) {
  const [activeTab, setActiveTab] = useState<string>(initialRole);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-primary/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-surface rounded-[32px] sm:rounded-[40px] shadow-[0_32px_70px_-16px_rgba(4,45,31,0.35)] border border-surface-container-high/90 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-surface-container-lowest border-b border-surface-container-high/60 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
              <span className="font-serif text-2xl sm:text-3xl text-primary font-bold tracking-tight">
                SmritiSetu Surface Hub
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-primary-fixed text-primary font-semibold border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Architecture Preview</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Three dedicated digital surfaces engineered for dementia care in the North Eastern Region, sharing one local-first monorepo.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-surface-container-low hover:bg-surface-container-high flex items-center justify-center text-primary transition-all active:scale-[0.95] shrink-0 border border-surface-container-high/60"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Segmented Capsule Tab Bar */}
        <div className="p-3 sm:p-4 bg-surface-container-low/70 border-b border-surface-container-high/50">
          <div className="flex items-center gap-2 overflow-x-auto p-1 bg-surface-container-lowest/80 rounded-2xl border border-surface-container-high/60">
            <button
              onClick={() => setActiveTab("patient")}
              className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "patient"
                  ? "bg-primary text-on-primary shadow-md"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Patient Voice PWA</span>
            </button>

            <button
              onClick={() => setActiveTab("caregiver")}
              className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "caregiver"
                  ? "bg-primary text-on-primary shadow-md"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>Caregiver Family Portal</span>
            </button>

            <button
              onClick={() => setActiveTab("asha")}
              className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "asha"
                  ? "bg-primary text-on-primary shadow-md"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
              }`}
            >
              <ClipboardCheck className="w-4 h-4 shrink-0" />
              <span>ASHA Worker Console</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: PATIENT VOICE PWA */}
          {activeTab === "patient" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Hero Showcase Card */}
              <div className="p-6 rounded-3xl bg-primary-fixed/25 border border-primary-fixed/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-lg">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary mb-2 uppercase tracking-wide">
                    <User className="w-4 h-4" />
                    <span>Designed for Elders with Cognitive Decline</span>
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-primary leading-snug">
                    Voice-First PWA with Zero-Stress Touch
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                    Operates without confusing menus, timers, or negative buzzers. Spoken prompts in Assamese, Bengali, Bodo, Manipuri, Hindi, and English guide daily orientation.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 md:max-w-xs justify-start md:justify-end">
                  <span className="px-3 py-1 rounded-full bg-surface text-[11px] font-semibold text-primary border border-primary/20 shadow-sm">
                    Offline Dexie.js DB
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface text-[11px] font-semibold text-primary border border-primary/20 shadow-sm">
                    Bhashini Speech API
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface text-[11px] font-semibold text-primary border border-primary/20 shadow-sm">
                    WCAG AAA Touch
                  </span>
                </div>
              </div>

              {/* Bento Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-sm hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-serif text-base font-bold text-primary">Reminiscence Activities</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-fixed text-primary">Core</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Presents familiar family photos, regional tea gardens, and Bihu gatherings with spoken familial hints instead of clinical arithmetic tests.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-sm hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-serif text-base font-bold text-primary">Calming Mode (Xanti Bhab)</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary">Anti-Agitation</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Detects hesitation or repeated taps, automatically transitioning to soothing tea estate imagery, rain sounds, and gentle reassurance clips.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-sm hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-serif text-base font-bold text-primary">Voice-Cloned Routine Reminders</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container-high text-primary">Family Voice</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Plays dosage and hydration alerts in a daughter’s or son’s voice, accompanied by a single large tactile button (&ldquo;মই খালোঁ / I took it&rdquo;).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-sm hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-serif text-base font-bold text-primary">Repeated-Question Companion</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container-high text-primary">Patience AI</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Answers common repetitive questions (&ldquo;Where is my family?&rdquo;) with unlimited patience using pre-recorded warm responses.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CAREGIVER FAMILY PORTAL */}
          {activeTab === "caregiver" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Hero Showcase Card */}
              <div className="p-6 rounded-3xl bg-secondary-fixed/25 border border-secondary-fixed/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-lg">
                  <div className="flex items-center gap-2 text-xs font-bold text-secondary mb-2 uppercase tracking-wide">
                    <Users className="w-4 h-4" />
                    <span>For Adult Children &amp; Spouses</span>
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-primary leading-snug">
                    Memory Studio &amp; Dignified Oversight
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                    Enables family members to upload photo albums, record 10-second voice clips, and observe weekly engagement slopes without invasive surveillance.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 md:max-w-xs justify-start md:justify-end">
                  <span className="px-3 py-1 rounded-full bg-surface text-[11px] font-semibold text-secondary border border-secondary/20 shadow-sm">
                    Coqui XTTS-v2 Voice
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface text-[11px] font-semibold text-secondary border border-secondary/20 shadow-sm">
                    LASI-DAD Metrics
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface text-[11px] font-semibold text-secondary border border-secondary/20 shadow-sm">
                    SMS Fallback
                  </span>
                </div>
              </div>

              {/* Bento Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-sm hover:border-secondary/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-serif text-base font-bold text-primary">Heirloom Memory Studio</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary">Studio</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Upload and tag old family photographs with spoken dialect hints, automatically compiling fresh reminiscence game sets for the elder.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-sm hover:border-secondary/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-serif text-base font-bold text-primary">Voice Recording &amp; Cloning</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary">Audio</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Record short reference samples on any smartphone to generate synthetic prompts in the family member’s genuine voice cadence.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-sm hover:border-secondary/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-serif text-base font-bold text-primary">Decline Slope Tracking</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container-high text-primary">Clinical</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Simple Green / Amber / Red indicators computed from multi-week response latency and recall rates, aligned with geriatric protocols.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-sm hover:border-secondary/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-serif text-base font-bold text-primary">Safety &amp; SMS Escalation</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container-high text-primary">Alerts</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Unconfirmed reminders automatically trigger SMS notifications to designated family members after an adjustable grace period.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ASHA HEALTH WORKER CONSOLE */}
          {activeTab === "asha" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Hero Showcase Card */}
              <div className="p-6 rounded-3xl bg-primary-fixed/35 border border-surface-tint/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-lg">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary mb-2 uppercase tracking-wide">
                    <ClipboardCheck className="w-4 h-4" />
                    <span>For Last-Mile Community Healthcare</span>
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-primary leading-snug">
                    Field Triage &amp; Offline Visit Management
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                    Built for ASHA and ANM workers serving ~1,000 residents across remote NER blocks. Surfaces red flags without complex cognitive charts.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 md:max-w-xs justify-start md:justify-end">
                  <span className="px-3 py-1 rounded-full bg-surface text-[11px] font-semibold text-primary border border-primary/20 shadow-sm">
                    Offline Delta Sync
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface text-[11px] font-semibold text-primary border border-primary/20 shadow-sm">
                    Doctor PDF Export
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface text-[11px] font-semibold text-primary border border-primary/20 shadow-sm">
                    DPDP Act Aligned
                  </span>
                </div>
              </div>

              {/* Bento Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-sm hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-serif text-base font-bold text-primary">Multi-Patient Priority Triage</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-fixed text-primary">Queue</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Automatically sorts assigned village households, prioritizing elders with marked increases in latency or missed medication routines.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-sm hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-serif text-base font-bold text-primary">Doctor Consultation PDF</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-fixed text-primary">Export</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    One-tap generation of a clean clinical summary for families to present during visits to district hospital neurologists.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-sm hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-serif text-base font-bold text-primary">Low-Bandwidth Operation</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container-high text-primary">Bandwidth</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Payloads are strictly under 50KB per sync session, enabling seamless background updates over 2G/3G connections or intermittent signals.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high/80 shadow-sm hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-serif text-base font-bold text-primary">Consent &amp; ABDM Readiness</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container-high text-primary">Compliance</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Full adherence to India’s DPDP Act with explicit guardian consent trails and Ayushman Bharat Digital Mission (ABDM) record linking.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 sm:p-6 bg-surface-container-low/80 border-t border-surface-container-high/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
            <span>Local-first encrypted storage · DPDP Act (India) compliant architecture</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-7 py-2.5 rounded-full bg-primary text-on-primary font-semibold text-xs sm:text-sm hover:bg-primary-container active:scale-[0.98] transition-all shadow-md"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}

