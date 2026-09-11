SmritiSetu

(स्मृति सेतु — "Memory Bridge")

AI-Based Cognitive Gaming & Memory Assistance Platform

for Elderly Dementia Patients in the North Eastern Region

Product Requirements Document  •  Technical Requirements  •  Tech Stack  •  Repository Blueprint

Prepared by Sarthak

Document version 1.0

September 2026

Table of Contents

1. Executive Summary

2. Problem Statement

3. Product Vision & Differentiation

4. Target Users & Personas

5. Goals & Success Metrics

6. Functional Requirements

7. Non-Functional Requirements

8. System Architecture

9. Technology Stack (100% Free / Open-Source)

10. Data Model (Core Entities)

11. Delivery Roadmap

12. Repository Structure

13. Key External References & APIs

14. Reference GitHub Repositories

15. Business Model

16. Risks & Mitigations

17. Closing Note

1. Executive Summary

SmritiSetu is an AI-powered cognitive gaming and memory-assistance platform built for elderly dementia patients across the North Eastern Region (NER) of India. It is designed around one core clinical insight that most generic "brain training" apps miss: reminiscence-based, personally meaningful content produces measurably better engagement and emotional wellbeing in dementia patients than abstract puzzle games.

The platform turns a family's own photos, voice recordings, festivals, and daily routines into personalised cognitive games, delivers them through a voice-first, multilingual interface suited to low-literacy and low-motor-control elderly users, and quietly converts everyday gameplay into an early-warning clinical signal for caregivers, ASHA workers, and doctors — closing the specialist-access gap that defines dementia care in NER's remote and hilly geography.

What makes this different

Reminiscence-first content engine — not generic match-3 games, but AI-generated modules built from the patient's own photos, voices, and local geography.

Voice-first interaction using Bhashini (Govt. of India's free multilingual speech stack) for NER's regional languages, with touch as a fallback, not the primary interface.

Family Voice Library — reminders and companion prompts spoken in an actual family member's cloned voice using free, open-source voice-cloning models, not a robotic TTS voice.

Passive cognitive-decline detection — reaction time, speech hesitation, and score-trend slope are tracked silently and surfaced as a doctor-readable red/yellow/green flag, turning the app into an early-screening bridge, not just entertainment.

Built for India's real last-mile health workforce — the caregiver dashboard is designed to also work for ASHA/Anganwadi workers, with WhatsApp/SMS fallback alerts for zero-connectivity villages.

Installable Progressive Web App (PWA) — one Next.js/React codebase, works on any Android/iOS phone or tablet browser, installs to the home screen like a native app, no app-store approval needed, and every tool in the stack is free or has a generous free tier.

Offline-first architecture — full gameplay, reminders, and data capture work with no internet; sync resumes automatically when connectivity returns.

The remainder of this document specifies the product requirements, system architecture, technology stack, data model, delivery roadmap, and repository structure needed to design, build, and extend SmritiSetu.

2. Problem Statement

The North Eastern Region is seeing a steady rise in age-related cognitive disorders, while specialised neurological care, cognitive therapy, and long-term elderly support remain scarce outside major towns. Elderly patients experience memory decline, confusion, anxiety, and social isolation; caregivers struggle with continuous monitoring and engagement; and families in remote, hilly, and low-connectivity areas have little access to affordable, culturally inclusive digital therapeutic tools.

Figure 1 — India's dementia burden nearly doubles between 2016 and 2036; prevalence is higher in rural than urban populations, which is exactly the demographic profile of most of NER.

Why NER specifically

Extreme geographic and linguistic fragmentation — dozens of languages and dialects across eight states, most with negligible digital health content.

Very low neurologist-to-population ratio outside state capitals; families often travel a full day for a single consultation.

Elderly patients frequently have low digital literacy and limited fine motor control, making touch-only apps hard to use unassisted.

Intermittent mobile connectivity across hill districts rules out any cloud-only design.

3. Product Vision & Differentiation

Vision statement

Give every elderly dementia patient in the North Eastern Region a daily companion that feels like their own life, speaks their own language, and quietly keeps their family and the health system informed — without needing a neurologist nearby.

Doctor's lens — what actually matters clinically

Reminiscence therapy (recalling emotionally-anchored personal memories) is an evidence-informed non-pharmacological intervention for dementia, and produces better mood and engagement outcomes than abstract cognitive drills.

Trend over time matters more than any single score — a slow decline slope across weeks is a stronger clinical signal than one bad day, and is exactly what a remote clinician needs to decide whether an in-person visit is urgent.

Emotional dysregulation (frustration, agitation, "sundowning" in the evening) causes app abandonment in most existing cognitive-training products; difficulty and tone must adapt, not just difficulty level.

Patient's / family's lens — what actually gets used

A parent with dementia does not want to play a stranger's version of Sudoku — they respond to their grandchild's voice, their own wedding photo, the route to the tea garden they worked at.

Repetition of the same question is a daily reality for caregivers; a gentle, patient companion that can absorb some of that repetition reduces caregiver burnout.

Reminders that speak in a familiar voice, in the patient's own language, land very differently from a generic robotic notification.

The four pillars of differentiation

Pillar

What most apps do

What SmritiSetu does

Content

Generic shape/number puzzles

AI-generated reminiscence games from the family's own photos, voices, festivals, and routines

Interface

Touch-first, English/Hindi only

Voice-first, Bhashini-powered multilingual NER language support, touch as fallback

Output

A score / streak

A doctor-readable decline-trend flag alongside the score — an early-screening signal

Distribution

Assumes a tech-savvy family caregiver

Designed to also run through India's ASHA/Anganwadi worker network, with WhatsApp/SMS fallback

4. Target Users & Personas

Persona

Who they are

Core need

Patient

Elderly (60+) with mild-to-moderate dementia, often low literacy, may have tremor/motor decline

Simple, calming, voice-first daily engagement that feels familiar, not clinical

Family caregiver

Adult child or spouse, sometimes working away from home, variable tech comfort

Peace of mind, low-effort monitoring, and reminders that actually get followed

ASHA / health worker

Community health worker covering ~1,000 rural residents, visits periodically

A simple console to check flagged patients without needing deep tech training

Doctor / neurologist

Often based in a district or state capital, sees the patient rarely

A concise, exportable trend summary rather than raw logs, to prioritise which patients need an in-person visit

5. Goals & Success Metrics

Goal

Metric (KPI)

Target (Phase 1 pilot)

Sustained patient engagement

Median sessions per patient per week

≥ 5

Reduced caregiver burden

Caregiver-reported reduction in repeated-question stress (survey)

≥ 40% report improvement

Early clinical signal value

% of red-flagged patients confirmed as needing clinical review by a doctor

≥ 60% precision

Accessibility in low connectivity

% of daily active use completed fully offline

≥ 70%

Reminder adherence

Medicine/hydration reminder acknowledgement rate

≥ 75%

Multilingual reach

Number of NER languages/dialects supported at pilot

≥ 4 (via Bhashini + local partners)

6. Functional Requirements

6.1 Onboarding & Personalisation Engine

Caregiver can create a patient profile and upload photos, short voice notes, and daily-routine details in under 10 minutes.

System auto-generates reminiscence game content from uploaded material: "who is this," "what event is this," "describe this place."

Caregiver can add/update content at any time without redeploying the app; new content is regenerated incrementally.

Content library avoids repetition by recombining assets into new variants over time so gameplay does not feel stale.

6.2 Cognitive Games & Activities

Memory improvement modules using personal photos/voices (primary) and generic memory tasks (secondary, for variety).

Attention and concentration tasks (timed recognition, sorting, simple sequencing).

Daily-routine recall tasks built from the patient's actual routine (medicine times, meals, prayer/worship habits).

Pattern and object recognition using regionally familiar objects, foods, festivals, and imagery.

All modules must be completable with voice-only input for patients unable to use touch reliably.

6.3 Adaptive Difficulty Engine

Difficulty adjusts based on response accuracy and response-time trend, not a single session's score.

System detects signs of frustration (long pauses, repeated wrong answers, raised/agitated voice tone where available) and downshifts to a calming mode (familiar photos/music) rather than a harder task.

Adaptive logic must be explainable — every difficulty change should be traceable to the metric that triggered it, for later clinical review.

6.4 Voice & Multilingual Interaction

Speech-to-text and text-to-speech in NER regional languages via the free Bhashini API, with on-device whisper.cpp as an offline ASR fallback.

Reminders and prompts can play in a caregiver's own recorded/cloned voice, not only synthesised TTS (see 6.10).

UI text, audio prompts, and game content are all localisable per patient's chosen language.

6.5 Reminders

Medicine reminders with configurable schedule, voice playback, and acknowledgement capture.

Hydration and daily-activity nudges at configurable intervals.

Medical appointment reminders with lead-time alerts to both patient and caregiver.

Missed-reminder escalation: unacknowledged critical reminders notify the caregiver, then the ASHA worker, then fall back to WhatsApp/SMS.

6.6 Caregiver & Health-Worker Dashboard

Weekly trend view of cognitive-game performance per patient (accuracy, response time, session frequency).

Simple green/yellow/red status flag per patient, not raw data, as the primary view.

One-tap exportable PDF summary formatted for a doctor visit.

ASHA-console view supporting multiple patients per worker with sortable priority (red-flagged first).

6.7 Offline & Low-Connectivity Support

All gameplay, reminders, and data capture function fully offline.

Background delta-sync resumes automatically on reconnect; conflict resolution favours latest clinically-relevant data.

Critical alerts (missed medication, sharp cognitive decline) fall back to WhatsApp/SMS when data connectivity is unavailable.

6.8 Accessibility & Elderly-Friendly UI

Large text, high-contrast colour themes, minimal navigation depth (max 2 taps to any core action).

Voice-guided navigation throughout, not only within games.

Session lengths and prompts designed to avoid fatigue; automatic gentle session-end after a configurable duration.

6.9 Security & Data Management

Patient health data encrypted at rest and in transit; role-based access for caregiver, ASHA worker, and doctor views.

Data handling aligned with India's Digital Personal Data Protection (DPDP) Act principles: purpose limitation, consent capture during onboarding, and data minimisation.

Exportable data deletion on request, in line with patient/caregiver consent withdrawal.

6.10 Family Voice & Companion Features

These features are built around the idea that comfort in dementia care comes from familiarity — the voice of one's own family carries far more reassurance than any synthetic voice, however natural it sounds.

Family Voice Library: caregivers record a few minutes of their own voice; an open-source voice-cloning model (Coqui TTS / XTTS-v2) generates new reminders and prompts spoken in that familiar voice — fully offline-capable after the initial model download.

Repeated-Question Companion Mode: pre-recorded or cloned-voice answers to the questions a patient asks most often ("where is my son", "what day is it today"), reducing the caregiver's burden of answering the same question many times a day.

Calming Mode: when frustration/agitation is detected, the app automatically switches to a familiar family photo plus a soft cloned-voice narration instead of continuing the task.

Festival & Local-Occasion Mode: game themes and visuals automatically shift around regionally relevant occasions (e.g. Bihu, Hornbill Festival, Losar, Durga Puja) for cultural familiarity and seasonal engagement.

Async Family Voice Notes: family members record short "thinking of you" voice notes that play as a warm, motivating close to a completed game session, strengthening the patient's sense of connection between visits.

7. Non-Functional Requirements

Category

Requirement

Performance

Core game screens load in under 2 seconds on a low-end Android tablet; voice response latency under 1.5 seconds on-device

Offline resilience

100% of patient-facing features usable with zero connectivity; sync is eventually-consistent

Scalability

Backend services stateless and horizontally scalable to support district-wide, then state-wide rollout

Accessibility

WCAG-aligned contrast and font sizing; voice-first parity with touch for every core flow

Localisation

Language packs are data-driven, not hardcoded, to support incremental addition of NER languages/dialects

Privacy & compliance

DPDP Act-aligned consent and data handling; encrypted storage; audit logging on data access

Reliability

Reminder delivery success rate ≥ 99% including WhatsApp/SMS fallback path

Maintainability

Modular services so the reminiscence engine, adaptive engine, and reminder engine can evolve independently

8. System Architecture

SmritiSetu follows an offline-first, voice-first architecture split into four layers: client apps (built as an installable Progressive Web App, not a native app), an edge/offline layer that keeps the patient experience fully functional without connectivity, cloud services for AI, scoring and storage, and external integrations for language, alerting, and future government health-stack connectivity.

Figure 2 — SmritiSetu system architecture.

Layer notes

Client layer: three purpose-built surfaces — the patient PWA (voice-first, installable to the home screen on any phone/tablet without an app store), a lightweight caregiver/family PWA, and an ASHA/health-worker console for multi-patient monitoring. One Next.js/React codebase serves all three.

Edge/offline layer: on-device speech recognition (whisper.cpp) and voice cloning (Coqui TTS) plus a local IndexedDB store (via Dexie.js) mean the patient app never blocks on network availability; a sync manager reconciles data when connectivity returns and can escalate critical events via WhatsApp/SMS.

Cloud services layer: independently deployable services for auth/profiles, the reminiscence content engine, the adaptive-difficulty/cognitive-scoring engine, and the alert/reminder scheduler, backed by an analytics/trend store and an encrypted patient data store.

External integrations: Bhashini (free) for Indic-language ASR/NMT/TTS, WhatsApp Cloud API (free tier) with Fast2SMS as a fallback for feature phones, a future ABHA/Ayushman Bharat Digital Mission link for interoperability with India's digital health stack, and doctor-facing PDF export.

Core daily loop

Figure 3 — How a single day of use turns personal memories into a clinical signal.

9. Technology Stack (100% Free / Open-Source)

Every layer below is free, open-source, or has a free tier generous enough for a hackathon build and an early pilot — no paid licences are required to build and demo SmritiSetu. The app is built as a single Next.js/React Progressive Web App (PWA) rather than a native app: one codebase, installable to the home screen on Android and iOS, no app-store review or fees.

Layer

Technology

Cost

Why

Patient, caregiver & ASHA apps

Next.js + React + TypeScript, packaged as an installable PWA (via Serwist)

Free, open-source

One codebase for all three surfaces; installable like a native app with no app-store approval, works on low-end Android phones/tablets which dominate NER

Styling / UI kit

Tailwind CSS + shadcn/ui

Free, open-source

Fast to build an accessible, elderly-friendly, high-contrast UI

Voice — ASR / TTS / translation

Bhashini API (primary, govt-run, free) + whisper.cpp (offline ASR fallback, MIT licence)

Free

Bhashini is purpose-built for Indic and NER regional languages; whisper.cpp runs fully offline, on-device

Family voice cloning

Coqui TTS (XTTS-v2 model), open-source, MPL-2.0

Free, open-source

Zero-shot voice cloning from a few seconds of audio — powers the Family Voice Library (section 6.10)

Backend services

Node.js + TypeScript (Express/Fastify)

Free, open-source

Matches existing team stack; async-friendly for AI service orchestration

Adaptive engine / scoring

Python (FastAPI) + scikit-learn (rule-based → ML upgrade path)

Free, open-source

Keeps ML iteration independent of the main backend; simple, explainable models first

Primary database

Supabase (hosted Postgres) — free tier

Free tier (500MB DB, sufficient for pilot)

Managed Postgres with built-in auth and row-level security for role-based access

Realtime & auth

Firebase Auth + Cloud Messaging — Spark (free) plan

Free tier

Reliable push notifications and lightweight auth for family/ASHA apps

Offline local store

Dexie.js (IndexedDB wrapper)

Free, open-source

Battle-tested local-first persistence with a simple, promise-based API

Sync layer

Custom delta-sync service, patterned on rxdb-supabase's replication approach

Free, open-source (reference)

Handles intermittent connectivity gracefully, retries, and conflict resolution

Critical alert fallback

WhatsApp Business Cloud API (Meta, free tier — 1,000 conversations/month) + Fast2SMS (₹50 free credit / 10 free SMS per day for testing)

Free tier

Reaches caregivers/ASHA workers even with zero data connectivity; ASHA workers already use WhatsApp

Hosting / infra

Vercel (Hobby/free tier) for the PWA + Supabase Edge Functions / Render free tier for services

Free tier

Matches current deployment workflow; zero infra cost for a hackathon or early pilot

Analytics / trend storage

Postgres time-series tables (within Supabase free tier) + scheduled jobs

Free, included above

Keeps decline-slope computation auditable and simple to extend

Data security

Postgres row-level security (Supabase) + DPDP-aligned consent logging

Free, included above

Meets health-data handling expectations for a govt-adjacent pilot with zero extra spend

Note on "free": Bhashini, Dexie.js, whisper.cpp, and Coqui TTS are genuinely free with no usage cap. Supabase, Firebase, Vercel, WhatsApp Cloud API, and Fast2SMS are free up to generous tiers — comfortably enough for a hackathon demo and a multi-district pilot; only a state-wide rollout would need to budget for scaling past those tiers.

10. Data Model (Core Entities)

Entity

Key fields

Notes

Patient

id, name, dob, language, district, caregiver_id, care_worker_id

Root profile; language drives all content localisation

Caregiver

id, name, relation, phone, patient_ids[]

Can be linked to more than one patient

CareWorker (ASHA)

id, name, coverage_area, patient_ids[]

Console view groups patients by flag status

MemoryAsset

id, patient_id, type (photo/voice/text), tags, uploaded_by

Raw material for the reminiscence content engine

GameModule

id, patient_id, type, generated_from_asset_ids[], difficulty

Auto-generated content instance

GameSession

id, patient_id, module_id, start_time, accuracy, avg_response_ms, completed

One row per play session

CognitiveScoreTrend

id, patient_id, week_start, score, slope, flag_color

Weekly aggregate powering the red/yellow/green flag

Reminder

id, patient_id, type (medicine/hydration/activity/appointment), schedule, voice_asset_id, ack_status

Escalation path stored per reminder

Alert

id, patient_id, type, severity, delivered_via (app/whatsapp/sms), acknowledged_by

Drives caregiver/ASHA notification and SMS fallback

ConsentRecord

id, patient_id, consent_type, granted_by, timestamp

DPDP Act-aligned consent trail

11. Delivery Roadmap

Figure 4 — Phased delivery from hackathon MVP to state-level integration.

Phase 0 — Hackathon MVP (2 weeks)

Onboarding flow with photo/voice upload

Auto-generated "who is this" reminiscence quiz (1-2 languages)

Voice-based medicine/hydration reminders

Basic caregiver dashboard with score trend (no ML yet, rule-based flagging)

Phase 1 — Pilot (Months 1-3)

Deploy in 2-3 NER districts in partnership with local ASHA networks

Offline-first sync, WhatsApp/SMS fallback alerts

ASHA console with multi-patient view

Phase 2 — Adaptive Intelligence (Months 3-5)

Decline-slope detection model, explainable flagging

Emotional-state-aware difficulty adjustment

Multilingual scale-up via Bhashini across additional NER languages

Phase 3 — Integration (Months 5-7+)

ABHA / Ayushman Bharat Digital Mission interoperability

State health department rollout and doctor-facing referral workflow

12. Repository Structure

A single monorepo keeps the patient app, caregiver/ASHA web console, backend services, and the ML/adaptive engine versioned together while staying independently deployable — and gives hackathon judges and future contributors one clear place to add functionality.

smritisetu/

├── apps/

│   ├── patient-pwa/            # Next.js — installable, voice-first patient PWA

│   ├── caregiver-web/          # Next.js — family caregiver dashboard (PWA)

│   └── asha-console/           # Next.js — health-worker multi-patient console

├── services/

│   ├── api-gateway/            # Node.js + TypeScript — auth, routing

│   ├── reminiscence-engine/    # Python — content generation from photos/voice

│   ├── adaptive-engine/        # Python (FastAPI) — difficulty + cognitive scoring

│   ├── reminder-scheduler/     # Node.js — medicine/hydration/appointment logic

│   └── sync-service/           # Node.js — offline delta-sync, conflict resolution

├── packages/

│   ├── ui-components/          # Shared elderly-friendly UI kit (Tailwind)

│   ├── voice-sdk/              # Bhashini + whisper.cpp (ASR) + Coqui TTS (voice cloning)

│   └── types/                  # Shared TypeScript types/schemas

├── infra/

│   ├── supabase/               # DB schema, row-level security policies

│   ├── docker/                 # Service containers

│   └── ci-cd/                  # Pipelines (lint, test, deploy to Vercel/cloud)

├── docs/

│   ├── prd.md                  # This document, source-controlled

│   ├── architecture.md

│   └── api-reference.md

└── README.md                   # Setup, contribution guide, extension points

Suggested extension points for new contributors

New game types: add a module under reminiscence-engine/modules/ and register it in the module registry — no changes needed elsewhere.

New language: add a language pack under packages/voice-sdk/locales/ and a Bhashini language code mapping.

New alert channel (e.g. WhatsApp): implement the Alert interface in services/reminder-scheduler/channels/.

New scoring signal (e.g. facial-affect input): add a feature extractor in adaptive-engine/signals/ behind a feature flag.

Repository placeholder (create and link your actual GitHub repo here once initialised):

https://github.com/<your-org>/smritisetu

13. Key External References & APIs

Reference

Relevance

Bhashini — National Language Translation Mission (bhashini.gov.in)

ASR, NMT, and TTS across 22 scheduled Indian languages including Assamese, Bodo, Manipuri, and others relevant to NER; government-backed and free to integrate

ABHA / Ayushman Bharat Digital Mission

India's digital health ID and interoperability layer — future integration target for doctor referral and record linkage

ASHA (Accredited Social Health Activist) programme, National Health Mission

India's ~1-million-strong rural community health worker network — the intended distribution and monitoring channel

LASI-DAD (Longitudinal Ageing Study in India — Diagnostic Assessment of Dementia)

Nationally representative dementia prevalence data used for the impact case in this document

Digital Personal Data Protection (DPDP) Act, India

Governs consent, storage, and handling requirements for patient data

ARDSI — Alzheimer's and Related Disorders Society of India

India-specific dementia research, care guidelines, and family support resources

14. Reference GitHub Repositories

Real, free, open-source repositories the team can study or build directly on top of, so nothing here needs to be built entirely from scratch.

Purpose

Repository

Notes

Bhashini / ULCA integration

github.com/bhashini-dibd/ulca

Official open-source codebase (MIT) for the Bhashini/ULCA platform

Bhashini API — working example

github.com/AdityaKukreti/bhashini-api

A minimal hackathon-style Python wrapper calling Bhashini's ASR/NMT/TTS pipeline — good starting point to copy from

Bhashini document/translation SDK

github.com/ULCA-IN/anuvaad-client-sdk

Client SDK demonstrating translation calls against Bhashini(ULCA) APIs

Offline speech recognition

github.com/ggml-org/whisper.cpp

MIT-licensed, runs OpenAI Whisper fully offline/on-device — powers the edge ASR fallback

Voice cloning (Family Voice Library)

github.com/coqui-ai/TTS  (community-maintained fork: github.com/idiap/coqui-ai-tts)

Open-source (MPL-2.0) zero-shot voice cloning via XTTS-v2, from a few seconds of reference audio

Next.js PWA starter

github.com/serwist/serwist

Actively maintained service-worker/PWA toolkit for Next.js (successor to the deprecated next-pwa)

Offline-first local database

github.com/dexie/Dexie.js

Free, open-source IndexedDB wrapper (14k+ stars) — the local store for the offline-first patient PWA

Offline-to-cloud sync pattern

github.com/marceljuenemann/rxdb-supabase

Reference implementation for two-way sync between a client-side offline database and Supabase — useful pattern even if not used verbatim

These are starting points, not dependencies to adopt wholesale — evaluate licences (MIT/MPL-2.0 here are all permissive) and current maintenance status before committing to any one of them for the final build.

15. Business Model

SmritiSetu is designed as a public-good health product first, so the business model leans on the channels India already uses to fund and distribute exactly this kind of care — government health missions, NGOs, and CSR — with a consumer subscription layered on top rather than as the primary engine. The goal is to keep the core reminiscence, reminder, and safety features free for the families who need them most, and monetise the parts that institutions and power users are willing to pay for.

Figure 5 — Illustrative revenue mix once the product moves from pilot to multi-state scale.

Revenue streams

Stream

Who pays

What they get

B2G licensing

State health departments / National Health Mission (NHM)

District- or state-wide deployment, integration with the ASHA network, aggregate (anonymised) public-health reporting

B2B2C institutional

NGOs, old-age homes, ARDSI chapters, private elder-care providers

Multi-patient licences with institutional dashboards and bulk onboarding support

Consumer premium subscription

Individual families who can afford it (freemium model)

Unlimited memory-asset storage, additional language packs, priority processing, richer analytics, doctor-visit PDF exports

CSR & grant funding

Corporate CSR budgets, health-tech/DBT/BIRAC-style grants, Digital India/Bhashini ecosystem grants

Subsidises the free tier for low-income and rural families so the core product stays free where it matters most

Anonymised research insights (opt-in)

Public-health researchers / policy bodies

Aggregate, consent-based, de-identified population cognitive-health trend reports — never individual patient data

Why this mix, not a pure consumer app

The households who need this most in NER are the least likely to pay a recurring consumer subscription — government and CSR channels reach them without a paywall.

India already funds exactly this category of intervention through NHM and state digital-health budgets, and Bhashini/ABDM integration makes SmritiSetu a natural fit for existing government digital-health procurement.

A consumer premium tier and institutional licensing give the product a path to sustainability that doesn't depend entirely on grant renewal cycles.

Distribution through ASHA workers (already government-employed and trusted in the community) keeps customer-acquisition cost near zero compared with a standard consumer app's marketing spend.

Go-to-market sequencing

Free pilot in 2-3 NER districts via ASHA partnership (Phase 1) to build the impact evidence a state health department or CSR funder will want to see.

Use pilot outcomes (engagement, caregiver-burden reduction, early-flag accuracy) to pitch state NHM units and ARDSI/NGO partners for paid district licences.

Layer in the consumer premium tier once there's an organic base of families using the free tier and asking for more.

Pursue ABDM integration once a state contract is in hand, since that integration is most valuable at government scale, not at hackathon/pilot scale.

16. Risks & Mitigations

Risk

Mitigation

Low family tech-literacy slows onboarding

ASHA-assisted onboarding option; keep upload flow to under 10 minutes with guided voice prompts

Regional language/dialect not covered by Bhashini

Local-partner voice recording fallback; community-sourced language packs via the Bhasha Daan-style contribution model

False positives in decline-slope flagging causing alert fatigue

Start with a conservative rule-based flag in Phase 0-1, validate against real clinician review before introducing ML in Phase 2

Connectivity gaps break sync/alerts

Offline-first design by default; WhatsApp/SMS fallback for anything safety-critical

Sensitive health data handling

DPDP-aligned consent capture, encryption, role-based access, minimal data retention

Caregiver/ASHA alert fatigue from too many notifications

Single green/yellow/red primary view; detail only on demand

Free-tier service limits reached at scale (Supabase/Firebase/WhatsApp)

Free tiers are sized for pilot/early scale; roadmap Phase 3 government contract funds the upgrade to paid tiers, not the pilot

17. Closing Note

SmritiSetu is deliberately scoped so the hackathon prototype (Phase 0) is a genuine, demoable slice of the full vision — a working onboarding flow, one personalised reminiscence game, a voice reminder, and a basic trend dashboard — rather than a mockup of features that don't exist yet. Every later phase extends the same architecture rather than replacing it, so a strong two-week build has a clear, credible path to a real district pilot.

This document is intended to live in the repository (docs/prd.md) and evolve alongside the product.