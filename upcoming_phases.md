# SmritiSetu (স্মৃতি সেতু) — Upcoming Phases & Implementation Blueprint

> **Product**: SmritiSetu — AI-Based Cognitive Gaming & Memory Assistance Platform for Elderly Dementia Patients in North Eastern Region (NER)  
> **Prepared for**: Sarthak & Development Team  
> **Date**: September 2026  
> **Tech Stack**: Next.js (React/TypeScript PWA), Tailwind CSS, Dexie.js (IndexedDB), Bhashini Speech API, Coqui TTS (XTTS-v2), Supabase, Firebase, WhatsApp Cloud API / Fast2SMS  

---

## 1. Overview & Phasing Strategy

SmritiSetu is built around the clinical insight that **reminiscence-based, personally meaningful content** (a family’s own photos, familiar local voices, daily routines, and regional cultural touchstones) produces vastly superior engagement and emotional stability in dementia patients compared to generic abstract puzzle drills.

The project is broken into distinct, modular delivery phases:

| Phase | Name | Focus | Target Environment |
| :--- | :--- | :--- | :--- |
| **Phase 0** | **Foundation & Landing** *(Completed)* | Public responsive landing page, design system tokens, voice player simulation, architecture PRD & roadmap | Web / Desktop / Mobile Browser |
| **Phase 1** | **Patient Voice-First PWA & Reminiscence Engine** | 4 Reminiscence games, Dexie.js offline store, Caregiver photo/voice asset uploader | Android Tablet / Smartphone (PWA) |
| **Phase 2** | **Family Voice Cloning & ASHA Health Worker Console** | Coqui XTTS-v2 zero-shot voice cloning, decline-slope scoring, ASHA multi-patient triage, WhatsApp/SMS fallback | Field Pilot (2–3 NER Districts) |
| **Phase 3** | **Adaptive Intelligence & Clinical Integration** | ML-based difficulty adaptation, ABDM / ABHA ID integration, printable neurologist summary, NHM scale | State Health Mission Integration |

---

## 2. Phase 1 — Patient Voice-First PWA & Reminiscence Engine

### 2.1 Patient PWA (Installable Web App)
- **Target Surfaces**: Low-cost Android tablets and smartphones dominating rural Northeast India (e.g. Jio, Samsung Galaxy Tab, Redmi).
- **Service Worker / PWA**: Packaged via `@serwist/next` for home-screen installation without needing Google Play Store approval.
- **Accessibility Principles**:
  - Minimum text size: `20px` (body) to `48px` (headings).
  - Minimum touch target: `48px × 48px` with generous spacing to accommodate tremors or arthritic fingers.
  - High contrast ratio exceeding WCAG AAA standards.
  - Maximum navigation depth: **2 taps** to any primary activity.
  - Voice-guided UI where every screen speaks its instructions automatically.

### 2.2 The 4 Core Reminiscence Modules
1. **“Who is this?” (*Manuh Sinaki*)**:
   - Displays uploaded heirloom family portraits (daughter, son, grandchild, spouse).
   - Audio prompt spoken in familiar voice: *"Look at this photo from Bihu, who is smiling with you?"*
   - Two to three large photo cards as options. No failing buzzers; gentle encouragement on every tap.
2. **“Where did we go?” (*Thāi Xoron*)**:
   - Geographically and culturally anchored NER places: Tea garden veranda in Golaghat/Jorhat, Kaziranga National Park safari, Brahmaputra river ferry ghat, Kamakhya temple steps, Shillong peak.
   - Question anchors: *"Where did we drink warm morning ginger tea together?"*
3. **“What comes next?” (*Doinik Niyom*)**:
   - Sequential recall of the patient’s real daily rhythm:
     - Morning: Steeping Assam CTC tea ➔ Taking heart medication.
     - Noon: Lunch ➔ Short courtyard rest.
     - Evening: Lighting the sandhya prayer lamp (*Sandhya Bati*) ➔ Family chat.
4. **Cultural Patterns & Regional Objects (*Xôbdo aru Rong*)**:
   - Regional object and pattern recognition: Assamese red & white *Gamosa*, bamboo *Japi*, festival *Dhol*, brass *Xorai*, local wild orchids.

### 2.3 Offline-First Persistence (Dexie.js / IndexedDB)
- **Zero-Connectivity Resilience**: 100% of gameplay, stored photos, voice notes, and daily routines function with zero mobile data.
- **Data Entities Cached Locally**:
  - `patients`: Local profile, preferred NER dialect, stage note.
  - `memoryAssets`: Base64/Blob cached family photos, audio prompts.
  - `gameSessions`: Start time, accuracy, hesitation latency, completion flag.
  - `reminders`: Today's scheduled dosage alerts.
  - `pendingSync`: Action delta queue to sync to Supabase upon reconnect.

### 2.4 Caregiver Memory Asset Studio (Phase 1 Baseline)
- Simple web uploader where family members upload photos directly from their smartphone camera roll.
- Tag each photo with:
  - Person/Place name
  - Relationship (e.g., "Granddaughter", "Ancestral Home")
  - Optional 10-second voice note recorded via microphone.
- New assets automatically seed into the patient's game pool immediately without re-deploying code.

---

## 3. Phase 2 — Family Voice Cloning & ASHA Health Worker Console

### 3.1 Family Voice Library (Coqui TTS / XTTS-v2)
- Caregivers record **30 seconds to 1 minute** of clean speech on their smartphone.
- Open-source Coqui XTTS-v2 (or Piper TTS) generates personalized speech models.
- Generates natural, familiar voice prompts for:
  - Daily medicine & hydration reminders (*"Aita, take your blue blood pressure capsule with water"*).
  - Encouraging game closings (*"Wonderful job, Ma! We will visit this Sunday"*).
  - Repeated-question companion answers.

### 3.2 Repeated-Question Companion Mode
- Pre-recorded or cloned-voice answers to the questions dementia patients ask repeatedly throughout the day:
  - *"Where is my son?"* ➔ *"Rahul is in Guwahati at work, Ma. He will call you at 6 PM. You are safe at home."*
  - *"What day is today?"* ➔ *"Today is Saturday morning. The sun is shining in the courtyard."*
- Significantly reduces caregiver frustration, anxiety, and repetitive stress burnout.

### 3.3 Calming Mode (*Xanti Bhab*)
- Passively triggered when patient shows signs of agitation (e.g. rapid tapping, >15s hesitation on simple prompts).
- Also accessible via a permanent large green lotus icon on the patient screen.
- Screen transitions to peaceful tea garden imagery, sound of rain falling on a corrugated tin roof, and a soft reassuring voice note.

### 3.4 ASHA & Frontline Health Worker Console
- **Multi-Patient Village Triage**:
  - A single ASHA worker covers ~1,000 residents across remote hamlets.
  - Console lists all enrolled elderly patients in her jurisdiction.
  - Patients are sorted by priority flag:
    - 🔴 **Red Flag**: >30% increase in reaction latency over 2 weeks OR 3 consecutive missed medications.
    - 🟡 **Yellow Flag**: Minor routine inconsistency or missed game sessions.
    - 🟢 **Green Flag**: Stable cognitive engagement and routine adherence.
- **WhatsApp & SMS Fallback Alerting**:
  - Unacknowledged critical reminders trigger automated WhatsApp message via Meta Cloud API.
  - For areas with zero data connectivity, dispatches SMS via Fast2SMS directly to the family's basic feature phone.

---

## 4. Phase 3 — Adaptive Intelligence & Clinical Scale

### 4.1 Passive Cognitive Decline Detection (FastAPI + Scikit-Learn)
- **Silent Clinical Telemetry**:
  - Response accuracy trend over rolling 14-day and 30-day windows.
  - Average hesitation latency (time between audio prompt finish and touch selection).
  - Speech hesitation pauses (measured during voice-response tasks).
- **Explainable Clinical Flagging**:
  - Rule-based decision tree transitioning into lightweight scikit-learn regression models.
  - Clinicians can inspect *why* a flag was raised (e.g. *"Reason: 4.2s latency increase on familiar faces over 21 days"*).

### 4.2 Bhashini National Language Mission Integration
- Integration with Govt. of India's free **Bhashini API** (ULCA pipeline):
  - ASR (Automatic Speech Recognition) for regional Indic languages: Assamese (`as`), Bengali (`bn`), Bodo (`brx`), Manipuri (`mni`), Hindi (`hi`).
  - NMT (Neural Machine Translation) for translating caregiver notes into the elder's native dialect.
  - On-device **whisper.cpp** fallback for offline speech recognition.

### 4.3 ABDM & Doctor-Visit Consultation Summary
- **ABHA ID Integration**: Seamless record linkage with the Ayushman Bharat Digital Mission.
- **Printable Clinical Summary PDF**:
  - Longitudinal LASI-DAD aligned cognitive timeline.
  - Reaction speed graph, session frequency, and routine adherence.
  - Summary formatted specifically for neurologists at district civil hospitals.

---

## 5. Directory Blueprint for Implementation

```
smritisetu/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Public Landing Page (Phase 0)
│   │   ├── layout.tsx               # Root layout & Google fonts
│   │   ├── globals.css              # Custom Tailwind & tokens
│   │   ├── patient/                 # [Phase 1] Voice-First Patient PWA
│   │   │   ├── page.tsx
│   │   │   ├── games/
│   │   │   │   ├── faces.tsx        # "Who is this?" game
│   │   │   │   ├── places.tsx       # "Where did we go?" game
│   │   │   │   ├── routines.tsx     # "What comes next?" sequencing
│   │   │   │   └── culture.tsx      # NER cultural pattern matching
│   │   │   ├── calming-mode.tsx     # Xanti Bhab soothing screen
│   │   │   └── companion.tsx        # Repeated-question voice answers
│   │   ├── caregiver/               # [Phase 1/2] Family Caregiver Portal
│   │   │   ├── page.tsx
│   │   │   ├── studio/              # Memory photo & voice uploader
│   │   │   ├── voice-library/       # Voice recording & XTTS cloning
│   │   │   └── trends/              # Weekly decline slope charts
│   │   └── asha/                    # [Phase 2] ASHA Multi-Patient Console
│   │       ├── page.tsx             # Village triage table (Red/Yellow/Green)
│   │       ├── patient/[id]/        # Individual patient clinical history
│   │       └── export-summary/      # Doctor-visit printable report
│   ├── components/
│   │   ├── Header.tsx               # Fixed header & NER language switcher
│   │   ├── Hero.tsx                 # Visual showcase & heirloom photos
│   │   ├── HowItWorks.tsx           # 4 Connected care steps
│   │   ├── MemoryToGames.tsx        # Interactive reminiscence cards
│   │   ├── FamilyVoiceSection.tsx   # Live audio waveform player
│   │   ├── CareCircle.tsx           # 3-sided circle of care
│   │   ├── CaregiverPreview.tsx     # Minimalist dashboard preview
│   │   ├── OfflineRegional.tsx      # Low-connectivity & cultural notes
│   │   ├── RoadmapSection.tsx       # Visual roadmap component
│   │   ├── RoleModal.tsx            # Surface preview modal
│   │   └── Footer.tsx               # Regional credits & navigation
│   └── lib/
│       ├── db.ts                    # Dexie.js IndexedDB schema (Phase 1)
│       ├── voice.ts                 # Speech synthesis & Bhashini bridge
│       └── types.ts                 # Shared TypeScript interfaces
├── upcoming_phases.md               # This technical roadmap specification
└── package.json
```

---

## 6. Verification & Milestones Checklist

- [x] **Milestone 0.1**: Faithful Next.js conversion of `hmpg.html` with Tailwind design tokens.
- [x] **Milestone 0.2**: Working audio player with animated waveform and Web Speech API synthesis.
- [x] **Milestone 0.3**: Regional language dropdown preview (Assamese, Bengali, Bodo, Manipuri, Hindi, English).
- [x] **Milestone 0.4**: Three-surface preview modals for Patient, Caregiver, and ASHA roles.
- [x] **Milestone 0.5**: Comprehensive `upcoming_phases.md` specification saved in workspace.
- [ ] **Milestone 1.1**: Initialize Dexie.js schema and pre-seed with sample Northeast family profiles.
- [ ] **Milestone 1.2**: Implement the 4 patient reminiscence game components with audio prompts.
- [ ] **Milestone 1.3**: Build caregiver photo upload and memory asset tagging studio.
- [ ] **Milestone 2.1**: Integrate Coqui XTTS-v2 / Bhashini API speech pipeline.
- [ ] **Milestone 2.2**: Implement ASHA multi-patient triage view and WhatsApp fallback webhook.
- [ ] **Milestone 3.1**: ABDM digital health ID integration and printable doctor PDF export.
