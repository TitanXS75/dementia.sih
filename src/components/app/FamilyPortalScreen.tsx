import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  ImageIcon,
  Upload,
  Clock,
  Pill,
  CheckCircle2,
  AlertTriangle,
  Music,
  MessageSquare,
  Mic,
  Volume2,
  Calendar,
  Send,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Plus,
  X,
  Play,
  Leaf,
} from "lucide-react";

interface MemoryCue {
  id: string;
  title: string;
  relation: string;
  timestamp: string;
  imageUrl: string;
  audioPrompt?: string;
  syncStatus: "synced" | "pending";
}

const INITIAL_MEMORIES: MemoryCue[] = [
  {
    id: "mem-1",
    title: "Ananya Baruah",
    relation: "Elder Daughter (You)",
    timestamp: "Uploaded 2 days ago",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    audioPrompt: "Deuta, this is your daughter Ananya from Guwahati.",
    syncStatus: "synced",
  },
  {
    id: "mem-2",
    title: "Grandson Aarav with Japi",
    relation: "Grandson (Age 8)",
    timestamp: "Uploaded 3 days ago",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    audioPrompt: "Koka, I am wearing the japi you made for me!",
    syncStatus: "synced",
  },
  {
    id: "mem-3",
    title: "Ancestral Home in Jorhat",
    relation: "Family Homestead",
    timestamp: "Uploaded 1 week ago",
    imageUrl:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
    audioPrompt: "Our family courtyard where we all celebrated Bihu.",
    syncStatus: "synced",
  },
];

export default function FamilyPortalScreen() {
  const navigate = useNavigate();
  const [memories, setMemories] = useState<MemoryCue[]>(INITIAL_MEMORIES);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newRelation, setNewRelation] = useState("");
  const [newAudioPrompt, setNewAudioPrompt] = useState("");
  const [calmingTriggerNotice, setCalmingTriggerNotice] = useState<string | null>(null);

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newCue: MemoryCue = {
      id: `mem-${Date.now()}`,
      title: newTitle.trim(),
      relation: newRelation.trim() || "Family Member",
      timestamp: "Just now",
      imageUrl:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
      audioPrompt: newAudioPrompt.trim() || undefined,
      syncStatus: "synced",
    };

    setMemories([newCue, ...memories]);
    setNewTitle("");
    setNewRelation("");
    setNewAudioPrompt("");
    setIsUploadOpen(false);
  };

  const handleTriggerCalming = () => {
    setCalmingTriggerNotice(
      "Calming flute music and breathing atmosphere triggered on Father's bedside tablet."
    );
    setTimeout(() => setCalmingTriggerNotice(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* ─── Connected Elder Profile & Status ─── */}
      <div className="bg-white border border-[#1B382B]/15 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#1B382B]/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-bold bg-[#1B382B]/10 text-[#1B382B] border border-[#1B382B]/20">
                <Users className="w-3 h-3 text-[#1B382B]" />
                Connected Elder Companion
              </span>
              <span className="text-xs text-[#1F1914]/50">
                Care Circle: Baruah Family (Assam)
              </span>
            </div>

            <div className="flex items-center gap-3 mt-1">
              <h1 className="font-serif text-2xl lg:text-3xl text-[#1B382B] font-bold">
                Bapuram Baruah
              </h1>
              <span className="text-xs text-[#1F1914]/60 font-medium">
                (Father, Age 72 • Tarajan, Jorhat)
              </span>
            </div>
            <p className="text-xs text-[#1F1914]/65 mt-0.5">
              Bedside tablet is active and connected to WiFi. Last interaction: 15 minutes ago.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsUploadOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#12241C] transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#E58A18]" />
              <span>Add Memory Photo</span>
            </button>
            <button
              onClick={handleTriggerCalming}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D97706]/40 bg-[#FEF3C7]/40 text-[#D97706] text-xs font-semibold hover:bg-[#FEF3C7] transition-colors cursor-pointer"
            >
              <Leaf className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Send Calming Melody</span>
            </button>
          </div>
        </div>

        {/* ─── 4 Live Status Indicator Badges Across Screen ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-5">
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#1B382B]/10">
            <span className="text-[10px] text-[#1F1914]/60 uppercase tracking-wider font-semibold block">
              Today's Calmness Index
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="font-serif text-2xl lg:text-3xl font-bold text-[#1B382B]">
                88%
              </span>
              <span className="text-xs text-[#1B382B] font-semibold">Peaceful</span>
            </div>
            <span className="text-[10px] text-[#1F1914]/50 mt-1 block">
              0 agitation events logged
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#1B382B]/10">
            <span className="text-[10px] text-[#1F1914]/60 uppercase tracking-wider font-semibold block">
              Medicine Adherence
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="font-serif text-2xl lg:text-3xl font-bold text-[#1B382B]">
                Done
              </span>
              <span className="text-xs text-[#1B382B] font-medium">8:05 AM</span>
            </div>
            <span className="text-[10px] text-[#1F1914]/50 mt-1 block">
              Morning dose verified
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#1B382B]/10">
            <span className="text-[10px] text-[#1F1914]/60 uppercase tracking-wider font-semibold block">
              Family Memory Cues
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="font-serif text-2xl lg:text-3xl font-bold text-[#1B382B]">
                {memories.length}
              </span>
              <span className="text-xs text-[#1F1914]/50">Active Cues</span>
            </div>
            <span className="text-[10px] text-[#1B382B] mt-1 block">
              100% Faces Game Accuracy
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FEF3C7]/40 border border-[#D97706]/25">
            <span className="text-[10px] text-[#D97706] uppercase tracking-wider font-semibold block">
              Twilight Sundown Risk
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="font-serif text-2xl lg:text-3xl font-bold text-[#D97706]">
                Low
              </span>
              <span className="text-xs text-[#D97706]">Peak: 5:30 PM</span>
            </div>
            <span className="text-[10px] text-[#1F1914]/60 mt-1 block">
              Automatic soothing audio ready
            </span>
          </div>
        </div>
      </div>

      {/* Notice alert */}
      {calmingTriggerNotice && (
        <div className="p-3.5 rounded-xl bg-[#1B382B] text-white text-xs flex items-center justify-between shadow-md animate-in fade-in">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-[#E58A18]" />
            <span>{calmingTriggerNotice}</span>
          </div>
          <button
            onClick={() => setCalmingTriggerNotice(null)}
            className="text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ─── 2-Column Responsive Layout: Memory Vault + WhatsApp Bridge ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans on desktop): Family Memory Vault */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="font-serif text-lg text-[#1B382B] font-bold">
                Family Memory Vault
              </h2>
              <p className="text-xs text-[#1F1914]/60">
                Photographs and voice cues used in your father's daily reminiscence therapy.
              </p>
            </div>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="text-xs font-semibold text-[#1B382B] hover:text-[#D97706] flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {memories.map((cue) => (
              <div
                key={cue.id}
                className="bg-white border border-[#1B382B]/15 rounded-2xl p-3.5 shadow-xs flex gap-3.5 items-start hover:border-[#1B382B]/35 transition-all"
              >
                <div className="w-20 h-20 rounded-none overflow-hidden shrink-0 border border-[#1B382B]/15 bg-[#FAF7F2]">
                  <img
                    src={cue.imageUrl}
                    alt={cue.title}
                    className="w-full h-full object-cover rounded-none"
                  />
                </div>

                <div className="min-w-0 flex-1 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#D97706] bg-[#D97706]/10 px-1.5 py-0.2 rounded-md inline-block mb-1">
                      {cue.relation}
                    </span>
                    <h3 className="font-serif text-sm font-bold text-[#1B382B] truncate">
                      {cue.title}
                    </h3>
                    {cue.audioPrompt && (
                      <p className="text-[11px] text-[#1F1914]/65 line-clamp-2 mt-0.5 italic">
                        "{cue.audioPrompt}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#1F1914]/50 mt-2 pt-1 border-t border-[#1B382B]/8">
                    <span>{cue.timestamp}</span>
                    <span className="text-[#1B382B] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#1B382B]" />
                      Synced to Tablet
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Preview Games CTA */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#1B382B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-serif text-sm font-bold text-[#1B382B]">
                Want to test what your father sees on his tablet?
              </h4>
              <p className="text-xs text-[#1F1914]/60 mt-0.5">
                Preview the 4 reminiscence games with your uploaded family photos.
              </p>
            </div>
            <button
              onClick={() => navigate("/app/games")}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#12241C] transition-colors cursor-pointer shrink-0"
            >
              <span>Play Preview Games</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column (1 span on desktop): WhatsApp Sync Bridge & Daily Routine */}
        <div className="space-y-4">
          {/* WhatsApp Dropfeed Bridge */}
          <div className="bg-white border border-[#1B382B]/15 rounded-2xl p-4.5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#1B382B]/10 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#25D366]/15 flex items-center justify-center text-[#25D366]">
                  <MessageSquare className="w-4 h-4 text-[#1B382B]" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#1B382B]">
                    WhatsApp Memory Bridge
                  </h3>
                  <span className="text-[10px] text-[#1F1914]/50">
                    Bot: +91 98640 12345
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#1B382B] bg-[#1B382B]/8 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <p className="text-xs text-[#1F1914]/75 mb-3 leading-relaxed">
              Relatives anywhere in the world can forward photos and voice notes to the family WhatsApp number. SmritiSetu automatically verifies and syncs them to your father's living room screen.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#1B382B]/8">
                <div className="flex justify-between text-[10px] text-[#1F1914]/50 mb-0.5">
                  <span className="font-semibold text-[#1F1914]">Debojit (Son, Bengaluru)</span>
                  <span>Today, 7:15 AM</span>
                </div>
                <p className="text-[#1F1914]/75 italic flex items-center gap-1.5">
                  <Volume2 className="w-3 h-3 text-[#E58A18] shrink-0" />
                  "Deuta, hope you had your morning tea and walk."
                </p>
                <span className="text-[9px] text-[#1B382B] mt-1 block">
                  ✓ Played at morning tea time
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#1B382B]/8">
                <div className="flex justify-between text-[10px] text-[#1F1914]/50 mb-0.5">
                  <span className="font-semibold text-[#1F1914]">Ananya (You, Guwahati)</span>
                  <span>Yesterday</span>
                </div>
                <p className="text-[#1F1914]/75">
                  1 Photo synced: "Family Bihu Celebration"
                </p>
                <span className="text-[9px] text-[#1B382B] mt-1 block">
                  ✓ Included in Faces Game
                </span>
              </div>
            </div>
          </div>

          {/* Routine & Sundowning Twilight Watch */}
          <div className="bg-[#FAF7F2] border border-[#1B382B]/15 rounded-2xl p-4.5">
            <h3 className="font-serif text-sm font-bold text-[#1B382B] mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#E58A18]" />
              <span>Today's Routine Timeline</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#1B382B]/8">
                <span className="font-medium text-[#1F1914]">Morning Tea (6:30 AM)</span>
                <span className="text-[10px] font-bold text-[#1B382B]">Completed</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#1B382B]/8">
                <span className="font-medium text-[#1F1914]">Heart & BP Meds (8:00 AM)</span>
                <span className="text-[10px] font-bold text-[#1B382B]">Taken</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#1B382B]/8">
                <span className="font-medium text-[#1F1914]">Lunch & Rest (12:30 PM)</span>
                <span className="text-[10px] text-[#1F1914]/50">Next scheduled</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#1B382B]/8">
                <span className="font-medium text-[#1F1914]">Twilight Melodies (5:30 PM)</span>
                <span className="text-[10px] text-[#D97706] font-semibold">Calming mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Add Memory Photo Modal ─── */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1914]/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-[#1B382B]/20 rounded-3xl max-w-lg w-full shadow-2xl p-6 relative">
            <button
              onClick={() => setIsUploadOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#1B382B]/15 flex items-center justify-center text-[#1F1914] hover:bg-[#1B382B]/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif text-xl text-[#1B382B] font-bold mb-1">
              Add New Memory Cue
            </h3>
            <p className="text-xs text-[#1F1914]/65 mb-4">
              Upload an authentic photo of a relative, ancestral place, or cherished celebration.
            </p>

            <form onSubmit={handleAddMemory} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold text-[#1F1914]/80 uppercase tracking-wider block mb-1">
                  Person or Place Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Granddaughter Meera, Jorhat Tea Estate"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-[#FAF7F2] border border-[#1B382B]/15 rounded-xl focus:outline-none focus:border-[#1B382B]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#1F1914]/80 uppercase tracking-wider block mb-1">
                  Kinship Relationship (Who is this to your father?)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Youngest Daughter, Childhood Best Friend, Cousin"
                  value={newRelation}
                  onChange={(e) => setNewRelation(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-[#FAF7F2] border border-[#1B382B]/15 rounded-xl focus:outline-none focus:border-[#1B382B]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#1F1914]/80 uppercase tracking-wider block mb-1">
                  Familiar Voice Prompt or Audio Note
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 'Deuta, this is Meera. Remember when we planted marigolds together?'"
                  value={newAudioPrompt}
                  onChange={(e) => setNewAudioPrompt(e.target.value)}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#1B382B]/15 rounded-xl focus:outline-none focus:border-[#1B382B]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 h-10 rounded-xl border border-[#1B382B]/20 text-xs font-semibold text-[#1F1914] hover:bg-[#FAF7F2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 h-10 rounded-xl bg-[#1B382B] text-white text-xs font-semibold hover:bg-[#12241C] flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5 text-[#E58A18]" />
                  <span>Sync to Bedside Tablet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
