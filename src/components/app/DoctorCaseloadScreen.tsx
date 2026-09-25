import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  AlertTriangle,
  Activity,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  FileText,
  Download,
  Phone,
  CheckCircle2,
  X,
  Stethoscope,
  TrendingUp,
  Brain,
  Sparkles,
} from "lucide-react";

export interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F";
  location: string;
  phcBlock: string;
  cdrStage: string;
  cdrScore: number;
  cognitiveStability: number; // 0-100
  stabilityTrend: "up" | "stable" | "down";
  riskLevel: "stable" | "review" | "critical";
  lastActive: string;
  lastSession: string;
  kinName: string;
  kinRelation: string;
  kinPhone: string;
  touchPrecision: number; // %
  responseLatency: string; // e.g. "2.4s"
  reminiscenceAccuracy: {
    faces: number;
    places: number;
    routine: number;
  };
  ashaNotes: string[];
  recentAlert?: string;
}

const DEMO_PATIENTS: PatientRecord[] = [
  {
    id: "PT-JOR-001",
    name: "Bapuram Baruah",
    age: 72,
    gender: "M",
    location: "Tarajan, Jorhat",
    phcBlock: "Jorhat PHC",
    cdrStage: "CDR 1.0 (Mild Dementia)",
    cdrScore: 1.0,
    cognitiveStability: 84,
    stabilityTrend: "stable",
    riskLevel: "stable",
    lastActive: "15 mins ago",
    lastSession: "Faces Game • 100% recognition",
    kinName: "Ananya Baruah",
    kinRelation: "Daughter",
    kinPhone: "+91 98640 12345",
    touchPrecision: 92,
    responseLatency: "2.1s",
    reminiscenceAccuracy: { faces: 100, places: 67, routine: 100 },
    ashaNotes: [
      "Completed Rongali Bihu memory cue. Smiles when hearing Bhupen Hazarika.",
      "Morning medication taken on time with family supervision.",
    ],
  },
  {
    id: "PT-MAJ-004",
    name: "Kamala Devi Bora",
    age: 68,
    gender: "F",
    location: "Garamur, Majuli",
    phcBlock: "Majuli Rural",
    cdrStage: "CDR 0.5 (Early MCI)",
    cdrScore: 0.5,
    cognitiveStability: 71,
    stabilityTrend: "down",
    riskLevel: "review",
    lastActive: "3 hours ago",
    lastSession: "Routine Game • Sequence hesitation",
    kinName: "Mukesh Bora",
    kinRelation: "Son",
    kinPhone: "+91 94350 88219",
    touchPrecision: 78,
    responseLatency: "3.8s",
    reminiscenceAccuracy: { faces: 80, places: 60, routine: 67 },
    ashaNotes: [
      "Slight hesitation during afternoon routine sequencing.",
      "Recommended family to upload village sattra heirloom photos.",
    ],
    recentAlert: "Response latency increased by 18% over 14 days",
  },
  {
    id: "PT-GOL-012",
    name: "Hemanta Saikia",
    age: 76,
    gender: "M",
    location: "Bokakhat, Golaghat",
    phcBlock: "Golaghat",
    cdrStage: "CDR 2.0 (Moderate Dementia)",
    cdrScore: 2.0,
    cognitiveStability: 59,
    stabilityTrend: "down",
    riskLevel: "critical",
    lastActive: "Yesterday",
    lastSession: "Places Game • 40% recognition",
    kinName: "Pranab Saikia",
    kinRelation: "Brother",
    kinPhone: "+91 97060 44321",
    touchPrecision: 64,
    responseLatency: "4.9s",
    reminiscenceAccuracy: { faces: 60, places: 40, routine: 50 },
    ashaNotes: [
      "Evening sundowning agitation reported between 6:00 PM and 7:30 PM.",
      "Calming flute mode triggered twice remotely by brother.",
      "Home visit scheduled for tomorrow morning.",
    ],
    recentAlert: "Twilight sundowning restlessness flagged (2 nights running)",
  },
  {
    id: "PT-DIB-007",
    name: "Purnima Das",
    age: 71,
    gender: "F",
    location: "Chowkidinghee, Dibrugarh",
    phcBlock: "Dibrugarh",
    cdrStage: "CDR 1.0 (Mild Dementia)",
    cdrScore: 1.0,
    cognitiveStability: 88,
    stabilityTrend: "up",
    riskLevel: "stable",
    lastActive: "Today, 9:20 AM",
    lastSession: "Culture Game • 100% accuracy",
    kinName: "Debashree Das",
    kinRelation: "Daughter-in-law",
    kinPhone: "+91 98540 66710",
    touchPrecision: 95,
    responseLatency: "1.8s",
    reminiscenceAccuracy: { faces: 100, places: 85, routine: 100 },
    ashaNotes: [
      "Very high engagement with vintage handloom weaving patterns.",
      "Family WhatsApp photo uploads functioning daily.",
    ],
  },
  {
    id: "PT-TEO-009",
    name: "Tarun Chandra Phukan",
    age: 79,
    gender: "M",
    location: "Teok Sub-centre",
    phcBlock: "Jorhat PHC",
    cdrStage: "CDR 1.5 (Moderate-Mild)",
    cdrScore: 1.5,
    cognitiveStability: 64,
    stabilityTrend: "stable",
    riskLevel: "review",
    lastActive: "Yesterday",
    lastSession: "Routine Game • 70% accuracy",
    kinName: "Runu Phukan",
    kinRelation: "Wife",
    kinPhone: "+91 94351 22901",
    touchPrecision: 71,
    responseLatency: "3.4s",
    reminiscenceAccuracy: { faces: 75, places: 60, routine: 70 },
    ashaNotes: [
      "Motor touch tremor recorded during tile selection.",
      "Need ASHA assistant to adjust touch target calibration.",
    ],
    recentAlert: "Motor tremor detected during touchscreen interactions",
  },
];

export default function DoctorCaseloadScreen() {
  const [patients, setPatients] = useState<PatientRecord[]>(DEMO_PATIENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState("All");
  const [activePatient, setActivePatient] = useState<PatientRecord | null>(null);
  const [newNote, setNewNote] = useState("");
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Filter patients
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBlock =
      selectedBlock === "All" || p.phcBlock === selectedBlock;
    const matchesRisk =
      selectedRisk === "All" || p.riskLevel === selectedRisk;
    return matchesSearch && matchesBlock && matchesRisk;
  });

  const totalPatients = patients.length;
  const stableCount = patients.filter((p) => p.riskLevel === "stable").length;
  const reviewCount = patients.filter((p) => p.riskLevel === "review").length;
  const criticalCount = patients.filter((p) => p.riskLevel === "critical").length;

  const handleAddNote = () => {
    if (!newNote.trim() || !activePatient) return;
    const updated = {
      ...activePatient,
      ashaNotes: [newNote.trim(), ...activePatient.ashaNotes],
    };
    setActivePatient(updated);
    setPatients((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setNewNote("");
  };

  const handleExportPDF = (patient: PatientRecord) => {
    setExportNotice(
      `Bilingual Clinical Summary PDF generated for ${patient.name} (${patient.id}). Ready for Neurologist Review.`
    );
    setTimeout(() => setExportNotice(null), 5000);
  };

  const getRiskBadge = (level: "stable" | "review" | "critical") => {
    switch (level) {
      case "stable":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B382B]/10 text-[#1B382B] border border-[#1B382B]/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1B382B]" />
            <span>Stable Track</span>
          </span>
        );
      case "review":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#D97706]/15 text-[#D97706] border border-[#D97706]/30">
            <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Needs Review</span>
          </span>
        );
      case "critical":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#B24A2B]/15 text-[#B24A2B] border border-[#B24A2B]/30 animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5 text-[#B24A2B]" />
            <span>Sundowning Alert</span>
          </span>
        );
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* ─── Top Clinical Banner & Caseload Overview ─── */}
      <div className="bg-white border border-[#1B382B]/15 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#1B382B]/10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold bg-[#B24A2B]/10 text-[#B24A2B] border border-[#B24A2B]/20">
                <Stethoscope className="w-3 h-3" />
                ASHA & Clinical Triage Cockpit
              </span>
              <span className="text-xs text-[#1F1914]/50">
                Upper Assam Health Network • ABDM Compliant
              </span>
            </div>
            <h1 className="font-serif text-2xl lg:text-3xl text-[#1B382B] font-bold">
              Cognitive Caseload Triage
            </h1>
            <p className="text-xs sm:text-sm text-[#1F1914]/65 mt-0.5 max-w-2xl">
              Passive motor tremor telemetry, acoustic response latency, and reminiscence therapy compliance across community households.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setExportNotice(
                  "Batch District Caseload Report (5 Patients) exported as bilingual clinical summary."
                );
                setTimeout(() => setExportNotice(null), 5000);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#12241C] transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              <Download className="w-4 h-4 text-[#E58A18]" />
              <span>Export District Report</span>
            </button>
          </div>
        </div>

        {/* ─── 4 Metric Cards Across Desktop ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-5">
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#1B382B]/10">
            <span className="text-[11px] text-[#1F1914]/60 font-semibold uppercase tracking-wider block">
              Active Caseload
            </span>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="font-serif text-3xl font-bold text-[#1B382B]">
                {totalPatients}
              </span>
              <span className="text-xs text-[#1F1914]/50 font-medium">Elders</span>
            </div>
            <span className="text-[10px] text-[#1B382B] font-semibold mt-1 block">
              3 PHC Blocks Monitored
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#1B382B]/10">
            <span className="text-[11px] text-[#1F1914]/60 font-semibold uppercase tracking-wider block">
              Stable Cognitive Track
            </span>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="font-serif text-3xl font-bold text-[#1B382B]">
                {stableCount}
              </span>
              <span className="text-xs text-[#1B382B] font-semibold">
                {Math.round((stableCount / totalPatients) * 100)}%
              </span>
            </div>
            <span className="text-[10px] text-[#1F1914]/50 mt-1 block">
              Normal Reminiscence Adherence
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FEF3C7]/40 border border-[#D97706]/25">
            <span className="text-[11px] text-[#D97706] font-semibold uppercase tracking-wider block">
              Needs Clinical Review
            </span>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="font-serif text-3xl font-bold text-[#D97706]">
                {reviewCount}
              </span>
              <span className="text-xs text-[#D97706] font-semibold">Elders</span>
            </div>
            <span className="text-[10px] text-[#1F1914]/60 mt-1 block">
              Latency or Sequencing Hesitation
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FBECE7] border border-[#B24A2B]/30">
            <span className="text-[11px] text-[#B24A2B] font-semibold uppercase tracking-wider block">
              Sundowning Alerts
            </span>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="font-serif text-3xl font-bold text-[#B24A2B]">
                {criticalCount}
              </span>
              <span className="text-xs text-[#B24A2B] font-semibold">Flagged</span>
            </div>
            <span className="text-[10px] text-[#B24A2B] mt-1 block">
              Twilight Motor Restlessness
            </span>
          </div>
        </div>
      </div>

      {/* Export Toast Notice */}
      {exportNotice && (
        <div className="p-3.5 rounded-xl bg-[#1B382B] text-white text-xs flex items-center justify-between shadow-md animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#E58A18]" />
            <span>{exportNotice}</span>
          </div>
          <button
            onClick={() => setExportNotice(null)}
            className="text-white/60 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ─── Filter & Search Bar with Interactive Risk Pills ─── */}
      <div className="bg-white border border-[#1B382B]/15 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#1F1914]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search elder by name, ID, or village (e.g. Bapuram, Tarajan, Majuli)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-9 text-xs sm:text-sm bg-[#FAF7F2] border border-[#1B382B]/15 rounded-xl text-[#1F1914] placeholder:text-[#1F1914]/40 focus:outline-none focus:border-[#1B382B] focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1F1914]/40 hover:text-[#1F1914] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* PHC Block Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#1B382B]/15 rounded-xl px-3 h-10">
              <Filter className="w-3.5 h-3.5 text-[#1B382B]/60" />
              <select
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                className="bg-transparent text-xs text-[#1F1914] font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="All">All PHC Blocks</option>
                <option value="Jorhat PHC">Jorhat PHC</option>
                <option value="Majuli Rural">Majuli Rural</option>
                <option value="Golaghat">Golaghat</option>
                <option value="Dibrugarh">Dibrugarh</option>
              </select>
            </div>
          </div>
        </div>

        {/* Risk Status Segmented Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 border-t border-[#1B382B]/8">
          <span className="text-[11px] font-semibold text-[#1F1914]/50 uppercase tracking-wider mr-1 shrink-0">
            Filter:
          </span>
          <button
            onClick={() => setSelectedRisk("All")}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              selectedRisk === "All"
                ? "bg-[#1B382B] text-white shadow-2xs"
                : "bg-[#FAF7F2] text-[#1F1914]/70 hover:bg-[#1B382B]/8 hover:text-[#1B382B] border border-[#1B382B]/10"
            }`}
          >
            All Statuses ({patients.length})
          </button>
          <button
            onClick={() => setSelectedRisk("stable")}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              selectedRisk === "stable"
                ? "bg-[#1B382B] text-white shadow-2xs"
                : "bg-[#FAF7F2] text-[#1F1914]/70 hover:bg-[#1B382B]/8 hover:text-[#1B382B] border border-[#1B382B]/10"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#1B382B]" />
            <span>Stable ({stableCount})</span>
          </button>
          <button
            onClick={() => setSelectedRisk("review")}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              selectedRisk === "review"
                ? "bg-[#D97706] text-white shadow-2xs"
                : "bg-[#FAF7F2] text-[#1F1914]/70 hover:bg-[#D97706]/10 hover:text-[#D97706] border border-[#1B382B]/10"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
            <span>Needs Review ({reviewCount})</span>
          </button>
          <button
            onClick={() => setSelectedRisk("critical")}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              selectedRisk === "critical"
                ? "bg-[#B24A2B] text-white shadow-2xs"
                : "bg-[#FAF7F2] text-[#1F1914]/70 hover:bg-[#B24A2B]/10 hover:text-[#B24A2B] border border-[#1B382B]/10"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#B24A2B] animate-pulse" />
            <span>Sundowning Alert ({criticalCount})</span>
          </button>
        </div>
      </div>

      {/* ─── Multi-Patient Caseload Grid ─── */}
      <div className="space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
          <div>
            <h2 className="font-serif text-xl text-[#1B382B] font-bold">
              Patient Roster ({filteredPatients.length} elders found)
            </h2>
            <p className="text-xs text-[#1F1914]/55">
              Live bedside telemetry and passive touch dynamics for Jorhat & Upper Assam
            </p>
          </div>
          <span className="text-[11px] text-[#1B382B] font-semibold bg-[#1B382B]/5 px-2.5 py-1 rounded-full border border-[#1B382B]/10 self-start sm:self-auto">
            Click any patient card to open full clinical telemetry
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => setActivePatient(patient)}
              className="group bg-white border border-[#1B382B]/15 hover:border-[#1B382B]/40 hover:shadow-md transition-all rounded-2xl p-5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, Staging, Risk Pill */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#1B382B]/8">
                  <div className="flex items-center gap-3">
                    {/* Avatar Initials Badge */}
                    <div className="w-11 h-11 rounded-xl bg-[#1B382B]/10 border border-[#1B382B]/20 flex items-center justify-center text-[#1B382B] font-bold text-sm shrink-0 group-hover:scale-105 transition-transform relative">
                      <span>{getInitials(patient.name)}</span>
                      <span
                        className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          patient.riskLevel === "stable"
                            ? "bg-[#1B382B]"
                            : patient.riskLevel === "review"
                              ? "bg-[#D97706]"
                              : "bg-[#B24A2B] animate-pulse"
                        }`}
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-lg text-[#1B382B] font-bold group-hover:text-[#D97706] transition-colors leading-tight">
                          {patient.name}
                        </h3>
                        <span className="text-xs text-[#1F1914]/55 font-sans">
                          {patient.gender === "M" ? "Male" : "Female"}, {patient.age}y
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-[#1F1914]/65">
                        <span className="font-mono text-[10px] font-semibold bg-[#1B382B]/5 px-2 py-0.5 rounded text-[#1B382B]">
                          {patient.id}
                        </span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <MapPin className="w-3 h-3 text-[#1F1914]/40" />
                          {patient.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">{getRiskBadge(patient.riskLevel)}</div>
                </div>

                {/* Staging & Stability Metrics Bar */}
                <div className="py-3.5 space-y-2.5">
                  {/* Gauge Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[11px] uppercase tracking-wider text-[#1F1914]/60 font-semibold flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-[#1B382B]" />
                        <span>Cognitive Stability Index</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-[#1B382B]">
                          {patient.cognitiveStability}%
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-1.5 py-0.2 rounded ${
                            patient.stabilityTrend === "up"
                              ? "bg-[#1B382B]/10 text-[#1B382B]"
                              : patient.stabilityTrend === "stable"
                                ? "bg-[#D97706]/10 text-[#D97706]"
                                : "bg-[#B24A2B]/10 text-[#B24A2B]"
                          }`}
                        >
                          {patient.stabilityTrend === "up"
                            ? "↑ Improving"
                            : patient.stabilityTrend === "stable"
                              ? "→ Stable"
                              : "↓ Declining"}
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-[#FAF7F2] border border-[#1B382B]/10 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          patient.cognitiveStability >= 75
                            ? "bg-[#1B382B]"
                            : patient.cognitiveStability >= 60
                              ? "bg-[#D97706]"
                              : "bg-[#B24A2B]"
                        }`}
                        style={{ width: `${patient.cognitiveStability}%` }}
                      />
                    </div>
                  </div>

                  {/* 3 Telemetry Pill Chips */}
                  <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                    <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#1B382B]/8">
                      <span className="text-[10px] uppercase tracking-wider text-[#1F1914]/50 font-semibold block">
                        Clinical Stage
                      </span>
                      <span className="text-xs font-semibold text-[#1F1914] truncate block mt-0.5">
                        {patient.cdrStage.split(" ")[0]} {patient.cdrStage.split(" ")[1]}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#1B382B]/8">
                      <span className="text-[10px] uppercase tracking-wider text-[#1F1914]/50 font-semibold block">
                        Touch Precision
                      </span>
                      <span className="text-xs font-semibold text-[#1F1914] block mt-0.5">
                        {patient.touchPrecision}% precision
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#1B382B]/8">
                      <span className="text-[10px] uppercase tracking-wider text-[#1F1914]/50 font-semibold block">
                        Acoustic Latency
                      </span>
                      <span className="text-xs font-semibold text-[#1F1914] block mt-0.5">
                        {patient.responseLatency} response
                      </span>
                    </div>
                  </div>
                </div>

                {/* Alert Warning if any */}
                {patient.recentAlert && (
                  <div className="mb-3 px-3 py-2 rounded-xl bg-[#FBECE7] border border-[#B24A2B]/25 text-xs text-[#B24A2B] flex items-center gap-2 font-medium">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-[#B24A2B]" />
                    <span>{patient.recentAlert}</span>
                  </div>
                )}

                {/* Reminiscence & Kin Info */}
                <div className="text-xs text-[#1F1914]/70 space-y-1 bg-[#FAF7F2] p-2.5 rounded-xl border border-[#1B382B]/8">
                  <div className="flex items-center justify-between">
                    <span>
                      <strong className="text-[#1F1914]">Last Session:</strong> {patient.lastSession}
                    </span>
                    <span className="text-[10px] text-[#1F1914]/45">{patient.lastActive}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#1F1914]/60 pt-0.5">
                    <Phone className="w-3 h-3 text-[#1B382B]/60" />
                    <span>Kin: {patient.kinName} ({patient.kinRelation}) • {patient.kinPhone}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer Action */}
              <div className="mt-4 pt-3 border-t border-[#1B382B]/8 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#1B382B] font-medium">
                  {patient.ashaNotes.length} ASHA field notes logged
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#1B382B] group-hover:text-[#D97706] transition-colors">
                  <span>Inspect Telemetry &amp; Notes</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Detailed Patient Drilldown Modal ─── */}
      {activePatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1914]/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-[#1B382B]/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setActivePatient(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#1B382B]/15 flex items-center justify-center text-[#1F1914] hover:bg-[#1B382B]/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="pr-10 mb-4 pb-4 border-b border-[#1B382B]/10">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs bg-[#1B382B]/10 text-[#1B382B] px-2 py-0.5 rounded font-semibold">
                  {activePatient.id}
                </span>
                {getRiskBadge(activePatient.riskLevel)}
              </div>
              <h2 className="font-serif text-2xl text-[#1B382B] font-bold">
                {activePatient.name}
              </h2>
              <p className="text-xs text-[#1F1914]/60">
                {activePatient.gender === "M" ? "Male" : "Female"}, {activePatient.age} years old • {activePatient.location} ({activePatient.phcBlock})
              </p>
            </div>

            {/* Clinical Metrics Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#1B382B]/10">
                <span className="text-[10px] text-[#1F1914]/50 uppercase tracking-wider font-semibold block">
                  Stability Score
                </span>
                <span className="font-serif text-xl font-bold text-[#1B382B] block mt-0.5">
                  {activePatient.cognitiveStability}/100
                </span>
                <span className="text-[10px] text-[#1B382B] font-medium">
                  {activePatient.stabilityTrend === "up" ? "Improving" : activePatient.stabilityTrend === "down" ? "Decline trend" : "Stable baseline"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#1B382B]/10">
                <span className="text-[10px] text-[#1F1914]/50 uppercase tracking-wider font-semibold block">
                  Touch Precision
                </span>
                <span className="font-serif text-xl font-bold text-[#1B382B] block mt-0.5">
                  {activePatient.touchPrecision}%
                </span>
                <span className="text-[10px] text-[#1F1914]/50">
                  Motor tremor index
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#1B382B]/10">
                <span className="text-[10px] text-[#1F1914]/50 uppercase tracking-wider font-semibold block">
                  Response Latency
                </span>
                <span className="font-serif text-xl font-bold text-[#1B382B] block mt-0.5">
                  {activePatient.responseLatency}
                </span>
                <span className="text-[10px] text-[#1F1914]/50">
                  Acoustic pause rate
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#1B382B]/10">
                <span className="text-[10px] text-[#1F1914]/50 uppercase tracking-wider font-semibold block">
                  Clinical Staging
                </span>
                <span className="font-serif text-xl font-bold text-[#1B382B] block mt-0.5">
                  CDR {activePatient.cdrScore}
                </span>
                <span className="text-[10px] text-[#1F1914]/50">
                  HMSE adapted
                </span>
              </div>
            </div>

            {/* Reminiscence Performance by Therapy Type */}
            <div className="mb-5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#1B382B]/10">
              <h4 className="text-xs font-bold text-[#1B382B] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-[#E58A18]" />
                Reminiscence Therapy Engagement Breakdown
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-[#1F1914]">Faces Game (Kin Identification)</span>
                    <span className="font-bold text-[#1B382B]">{activePatient.reminiscenceAccuracy.faces}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1B382B]/10 overflow-hidden">
                    <div
                      className="h-full bg-[#1B382B] rounded-full transition-all"
                      style={{ width: `${activePatient.reminiscenceAccuracy.faces}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-[#1F1914]">Places Game (Ancestral Milestones)</span>
                    <span className="font-bold text-[#D97706]">{activePatient.reminiscenceAccuracy.places}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1B382B]/10 overflow-hidden">
                    <div
                      className="h-full bg-[#D97706] rounded-full transition-all"
                      style={{ width: `${activePatient.reminiscenceAccuracy.places}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-[#1F1914]">Routine Game (Sequencing & Orientation)</span>
                    <span className="font-bold text-[#1B382B]">{activePatient.reminiscenceAccuracy.routine}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1B382B]/10 overflow-hidden">
                    <div
                      className="h-full bg-[#1B382B] rounded-full transition-all"
                      style={{ width: `${activePatient.reminiscenceAccuracy.routine}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Caregiver Contact */}
            <div className="mb-5 p-3.5 rounded-xl border border-[#1B382B]/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#1F1914]/50 font-semibold block">
                  Family Caregiver Contact
                </span>
                <span className="text-xs font-bold text-[#1F1914] block mt-0.5">
                  {activePatient.kinName} ({activePatient.kinRelation})
                </span>
                <span className="text-[11px] text-[#1F1914]/60">
                  {activePatient.kinPhone}
                </span>
              </div>
              <a
                href={`tel:${activePatient.kinPhone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1B382B]/10 text-[#1B382B] text-xs font-semibold hover:bg-[#1B382B]/20 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Kin</span>
              </a>
            </div>

            {/* ASHA Notes & Observation Log */}
            <div className="mb-5">
              <h4 className="text-xs font-bold text-[#1B382B] uppercase tracking-wider mb-2">
                ASHA Clinical Observation History
              </h4>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {activePatient.ashaNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#1B382B]/8 text-xs text-[#1F1914]/75"
                  >
                    {note}
                  </div>
                ))}
              </div>

              {/* Add Note Input */}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Record new observation or home visit note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
                  className="flex-1 h-9 px-3 text-xs bg-[#FAF7F2] border border-[#1B382B]/15 rounded-xl focus:outline-none focus:border-[#1B382B]"
                />
                <button
                  onClick={handleAddNote}
                  className="px-3.5 h-9 rounded-xl bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#12241C] cursor-pointer"
                >
                  Save Note
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-[#1B382B]/10 flex items-center justify-between gap-3">
              <button
                onClick={() => handleExportPDF(activePatient)}
                className="flex-1 h-10 rounded-xl bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#12241C] flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#E58A18]" />
                <span>Download Bilingual Physician Summary</span>
              </button>
              <button
                onClick={() => setActivePatient(null)}
                className="px-4 h-10 rounded-xl border border-[#1B382B]/20 text-xs font-semibold text-[#1F1914] hover:bg-[#FAF7F2] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
