# Agent Instructions for SmritiSetu Repository

> **MANDATORY CONTEXT FOR ALL AI AGENTS & PAIR PROGRAMMERS**

Before implementing any feature, refactoring code, altering layouts, or writing documentation in this repository, you **MUST** read and follow these two authoritative reference documents:

1. **Product Requirements Document**: [`doc/PRD.md`](file:///d:/dimentia/doc/PRD.md)
   - Read this to understand the core problem statement, SIH initiative goals, the 3 connected surfaces (Patient Bedside Tablet, Family WhatsApp Portal, ASHA/Doctor Clinical Triage), and functional architecture.
   - Do NOT invent fictitious features or generic brain training games that violate clinical reminiscence therapy principles.

2. **Design System & UX Guidelines**: [`doc/DESIGN.md`](file:///d:/dimentia/doc/DESIGN.md)
   - **Color Palette (Suryodaya & Chandan)**: Sandalwood Canvas (`#FAF7F2`), Heritage Pine (`#1B382B`), Roasted Pine Dark (`#12241C`), Surya / Kesar Gold (`#D97706` / `#E58A18`), Earthen Terracotta (`#B24A2B`), Warm Charcoal (`#1F1914`).
   - **No Sudden Pure Black (`#000000`)**: Never create sudden pitch-black sections; use deep roasted pine green (`#12241C` or `#1B382B`).
   - **No Neon/Acid High-Frequency Colors (`#C8F028`)**: Never use neon/acid colors; use warm golden amber (`#D97706` / `#E58A18`).
   - **Zero Emojis**: Do not use emojis anywhere on the website. Use clean Lucide SVG icons.
   - **Square Image Framing**: Images and photo thumbnails must have square corners (`rounded-none`).
   - **Authentic Indian Imagery Only**: Always use authentic Indian and Northeast Indian documentary photography.
   - **No Heart Icons**: Do not use heart icons in clinical, landing, tab favicon, or footer sections; use dignified context-specific icons (`SunMedium`, `BookOpen`, `ShieldCheck`).

3. **Build & Terminal Commands**:
   - **DO NOT run `npm run build`** automatically. Never run production build checks unless the user explicitly requests it.
