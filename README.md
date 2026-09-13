# SmritiSetu (স্মৃতি সেতু)

> **AI-Based Cognitive Gaming & Memory Assistance Platform for Dementia Care**  
> *Built for Smart India Hackathon (SIH) · Northeast India Healthcare Initiative*

[![Built for SIH](https://img.shields.io/badge/Built%20for-SIH%202026-1E4334?style=flat-square)](https://github.com/TitanXS75/dimentia.sih)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Privacy Focused](https://img.shields.io/badge/Privacy-Dignity%20First-C8F028?style=flat-square&colorA=1E4334)](https://github.com/TitanXS75/dimentia.sih)

---

## Overview

**SmritiSetu** ("Memory Bridge") is a digital therapeutic ecosystem engineered for elderly individuals experiencing mild-to-moderate dementia, Alzheimer's disease, and cognitive disorientation in India.

Standard clinical brain-training applications rely on abstract match-3 puzzles and sterile Western questionnaires that induce high anxiety and cognitive distress in elderly Indian patients. SmritiSetu pioneers **Culturally Rooted Reminiscence Therapy (RT)**: transforming family heirloom photos, ancestral village folklore, vintage regional radio melodies (Bhupen Hazarika, Jyoti Prasad Agarwala, classic Bollywood, Rabindra Sangeet), and familiar family voices into soothing cognitive reassurance.

---

## The 3 Connected Surfaces

SmritiSetu unifies three key care participants on a shared, dignified data bridge:

```
                  ┌─────────────────────────────────────────┐
                  │          The Elder / Patient            │
                  │   Living Room Bedside Tablet Surface    │
                  │  Zero Tech Friction · Large Touch Tiles │
                  └────────────────────▲────────────────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    │                                     │
┌───────────────────┴─────────────────┐ ┌─────────────────┴───────────────────┐
│         Family Caregiver            │ │    Doctor & Frontline ASHA Worker   │
│ WhatsApp Updates · Memory Uploads   │ │ Offline Screening · Bilingual PDFs  │
└─────────────────────────────────────┘ └─────────────────────────────────────┘
```

1. **Elder Bedside Tablet Surface**:
   - **Living Room Daylight Orientation**: High-contrast, gentle clock displaying time of day, weather, and daily routine in native languages.
   - **Nostalgia Radio**: Curated regional vintage music that taps into deeply preserved musical memory.
   - **Affectionate Family Photo Jigsaws**: Progressive-hint tactile puzzles built from actual family photos.
   - **Dignity-First Care**: Ambient monitoring protecting personal dignity.

2. **Family Caregiver Portal & WhatsApp Bridge**:
   - Daily morning familiarity digests delivered directly via WhatsApp.
   - Simple photo and audio memory uploader for family members across the globe.
   - Sundowning and evening restlessness alerts suggesting calming audio cues.

3. **Doctor & Frontline ASHA Worker Interface**:
   - 100% offline door-to-door cognitive screening for rural and remote hill communities.
   - Passive telemetry tracking response latency and vocal cadence during natural gameplay.
   - 1-tap bilingual clinical PDF report exportable for visiting neurologists.

---

## Key Clinical Differentiators

- **Reminiscence-First Engine**: Uses real family memories and regional heritage instead of generic puzzles.
- **Voice-First Interaction (Bhashini AI)**: Govt. of India's open multilingual speech stack supporting Assamese (`অসমীয়া`), Bengali (`বাংলা`), Bodo (`बड़ो`), Manipuri (`ꯃꯤꯇꯩꯂꯣꯟ`), Hindi (`हिंदी`), and English.
- **Passive Telemetry**: Detects cognitive decline trends silently through motor tap latency and voice hesitation, avoiding stressful test scenarios.
- **Offline-First PWA**: Functions seamlessly in remote hill regions with intermittent or zero 4G connectivity.

---

## Documentation

Comprehensive project documentation is maintained in the [`doc/`](doc/) directory:

- 📄 [**Product Requirements Document (PRD)**](doc/PRD.md) — Clinical problem statement, functional specifications, system architecture, and success metrics.
- 🎨 [**Design System & UX Guidelines (DESIGN.md)**](doc/DESIGN.md) — Color tokens, typography hierarchy, cognitive ergonomics, square framing standards, and accessibility requirements.
- 🤖 [**AI Agent Guidelines (AGENTS.md)**](AGENTS.md) — Instructions and behavioral rules for AI assistants and contributors.

---

## Tech Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (custom HSL tokens & semantic design system)
- **Icons**: Lucide React (zero generic emojis)
- **Audio & Media**: Web Audio API, HTML5 Audio with progressive streaming
- **AI Integrations**: Bhashini Speech API (ASR / TTS) for regional Indian dialects

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/TitanXS75/dimentia.sih.git
cd dimentia.sih

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be available at `http://localhost:3444` (or configured port).

### Building for Production
```bash
npm run build
```

---

## Regional Dialect Support

SmritiSetu natively supports:
- **অসমীয়া** (Assamese)
- **বাংলা** (Bengali)
- **बड़ो** (Bodo)
- **ꯃꯤꯇꯩꯂꯣꯟ** (Manipuri)
- **हिंदी** (Hindi)
- **English**

---

## License & Acknowledgements

Dedicated to elder dignity across India.  
Developed for the **Smart India Hackathon (SIH)**.