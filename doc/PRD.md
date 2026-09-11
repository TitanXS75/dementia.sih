# SmritiSetu (স্মৃতি সেতু) — Product Requirements Document (PRD)

> **Project Name**: SmritiSetu ("Memory Bridge")  
> **Initiative**: Smart India Hackathon (SIH)  
> **Domain**: Healthcare / Cognitive Therapeutics & Rural Telemedicine  
> **Target Region**: Northeast India & Pan-India Households  
> **Target Audience**: Dementia/Alzheimer's Patients, Family Caregivers, Frontline ASHA Workers, Neurologists  

---

## 1. Executive Summary
**SmritiSetu** is an AI-powered cognitive gaming, daily reminiscence, and memory-assistance ecosystem designed specifically for elderly individuals living with mild-to-moderate dementia, Alzheimer's disease, and age-related cognitive decline in India (with special cultural and offline grounding for the North Eastern Region).

Unlike generic "brain training" applications that present sterile, abstract puzzles and Western-centric memory tests, SmritiSetu leverages **Reminiscence Therapy (RT)**: converting the elder’s own family photographs, ancestral folklore, vintage regional music, and family voice notes into gentle cognitive reassurance. Simultaneously, it acts as a silent clinical screening bridge, capturing speech cadence, motor touch jitter, and daily orientation trends without invasive cameras.

---

## 2. Problem Statement & Reality
1. **The Burden in India**: Over 8.8 million seniors in India live with dementia (projected to surpass 14 million by 2036). Over 90% navigate care without formal diagnostic or cognitive support.
2. **Northeast & Rural Geography**: Outside capital cities (like Guwahati or Shillong), the neurologist-to-patient ratio drops to less than 1 per 500,000 people. Rural hill families travel up to 14 hours for clinical consultations.
3. **Clinical Intimidation**: Standard pen-and-paper questionnaires (MMSE, MoCA) conducted in unfamiliar English or Hindi induce high anxiety, defensive agitation, and cognitive fatigue.
4. **Caregiver Burnout & Evening Sundowning**: Caregivers answer the same questions 30+ times a morning. By evening, seniors experience severe disorientation, wandering impulses, and restlessness ("sundowning").
5. **Surveillance vs. Dignity Dilemma**: Families often resort to invasive 24/7 CCTV cameras, stripping elders of personal dignity and inducing paranoia.

---

## 3. Product Architecture: 3 Connected Surfaces
SmritiSetu connects three distinct user personas into one unified data fabric:

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

### Surface 1: The Elder Companion (Bedside Tablet)
- **Living Room Daylight Orientation**: High-contrast, gentle ambient display in the patient’s native language showing time of day, weather, and daily routine cues (e.g., *"সুপ্ৰভাত, দেউতা! Today is Wednesday. Morning tea in the veranda."*).
- **Nostalgia Radio & Cultural Jukebox**: Curated vintage regional melodies (Bhupen Hazarika, Jyoti Prasad Agarwala, classic Bollywood, Rabindra Sangeet, Bihu folk) that stimulate preserved musical memory.
- **Affectionate Family Photo Jigsaws**: 4-to-9 piece tactile jigsaws generated from real family heirloom photos, offering progressive hints without shame or failure penalties.
- **Voice-First Interaction (Bhashini AI Integration)**: Operable entirely by voice in regional languages (Assamese, Bengali, Bodo, Manipuri, Hindi, and English).

### Surface 2: The Care Circle Portal (Family WhatsApp & App)
- **Daily Familiarity Digest**: Morning WhatsApp summary reporting the elder's cognitive calmness and recognition score without invasive surveillance.
- **Family Memory Vault**: Easy photo and audio upload interface allowing children and grandchildren across the world to upload voice notes, ancestral village stories, and family pictures.
- **Sundowning & Restlessness Alerts**: Gentle twilight notifications alerting caregivers when agitation risk peaks, suggesting calming audio triggers.

### Surface 3: Frontline ASHA & Neurologist Dashboard
- **100% Offline Screening**: Designed for door-to-door triage in hilly, zero-connectivity tea gardens and rural villages. Data persists locally via IndexedDB.
- **Standardized Cognitive Telemetry**: Measures acoustic speech hesitation, latency, and touch jitter during passive gameplay.
- **1-Tap Bilingual Clinical PDF**: Generates physician-ready summary reports formatted with standard cognitive staging metrics for quick doctor review.

---

## 4. Key Functional Modules & Tech Capabilities
| Module | Capability | Implementation Detail |
|---|---|---|
| **Reminiscence Engine** | Dynamic cognitive game generation | Converts family photo metadata into personalized matching & identification games |
| **Bhashini Speech Stack** | Regional ASR & TTS | Govt. of India's open speech stack for Assamese, Bengali, Bodo, Manipuri, and Hindi |
| **Voice Cloning Reassurance** | Family voice prompts | Synthesizes familiar family voices for reminders to reduce stranger anxiety |
| **Passive Decline Telemetry** | Longitudinal motor & speech analytics | Captures tap precision, response latency slope, and vocal pauses |
| **Offline-First PWA** | Resilient offline sync | Service Workers + IndexedDB; automatic background sync when network is detected |

---

## 5. Non-Functional Requirements
- **Accessibility & Cognitive Ergonomics**: WCAG AAA contrast ratio compliance (minimum 7:1 for text), minimum touch target of 64px, zero nested menus, zero technical jargon.
- **Privacy & Dignity**: 100% camera-free. Zero persistent video recording. On-device processing of biometric features.
- **Performance**: Instant initial paint (< 1.5s on 3G network), smooth 60fps micro-animations, bundle size < 250KB gzipped.
- **Device Compatibility**: Responsive from low-cost 8-inch Android tablets to modern desktops and smartphones.

---

## 6. Success Metrics & Clinical Validation
1. **Emotional Calming**: Measurable reduction in evening sundowning agitation episodes reported by primary caregivers.
2. **Family Engagement**: High completion rates for daily 10-minute morning reminiscence sessions.
3. **ASHA Triage Efficiency**: Reduction in door-to-door cognitive screening time from 45 minutes to 15 minutes per household.
4. **Clinical Adoption**: Neurologist utilization of the 1-tap bilingual PDF report for treatment adjustments.
