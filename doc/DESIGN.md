# SmritiSetu (স্মৃতি সেতু) — Design System & UX Guidelines

> **Document Version**: 1.0  
> **Status**: Production Reference  
> **Primary Audience**: UI/UX Designers, Frontend Engineers, AI Agents  

---

## 1. Core Philosophy: Dignity, Reverence & Warmth
Elderly individuals suffering from dementia frequently experience cognitive disorientation, visual acuity loss, reduced fine motor control, and heightened anxiety. Traditional clinical apps feel sterile, frightening, and exam-like.

SmritiSetu's interface must feel like:
- **A warm living room with morning tea in the veranda**, not a hospital examination room.
- **An heirloom physical photo album and vintage radio**, not an intimidating modern smartphone app.
- **Deeply respectful, culturally grounded, and dignified** at every touchpoint.

---

## 2. Color Palette & Tokens
The color palette is deliberately chosen to evoke tranquility, regional nature (Assam tea gardens, earth, morning daylight), and high clinical contrast without aggressive clinical whites or pitch blacks.

| Token Name | Hex Code | Purpose & Usage |
|---|---|---|
| **Cream Canvas** | `#F7F5F0` | Primary page background; warm, non-glare alternative to pure white |
| **Deep Forest Olive** | `#1E4334` | Primary brand green; calm, dignified, earthy; used in hero CTAs, card frames, and headers |
| **Deep Forest Dark** | `#142F24` | Footer background and dark container surfaces; grounding, reassuring |
| **Lime Radiance** | `#C8F028` | Accent highlight; eye-catching high visibility indicator; used on dark green backgrounds |
| **Warm Charcoal** | `#1A1814` | Primary typography color; soft and legible, avoiding harsh contrast of pure black |
| **Surface Variant** | `#1A1814` (70% opacity) | Secondary copy, metadata, and supporting explanations |
| **Border Subtle** | `#1E4334` (12%–20% opacity) | Hairline borders providing clean structural separation without visual noise |

### Strict Prohibitions
- **NO Sudden Pure Black (`#000000`) Sections**: Abrupt dark sections cause visual shock and disorientation. Dark sections must always use deep forest green (`#1E4334` or `#142F24`).
- **NO Generic Primary Colors**: Avoid bright standard red, blue, or cyan. All alerts and highlights must use calibrated tones.

---

## 3. Typography Hierarchy
Typography is configured to maximize legibility for aging eyes while maintaining an elegant editorial feel.

| Role | Font Family | Weight | Size Range | Usage |
|---|---|---|---|---|
| **Editorial Headlines** | `font-serif` (Playfair / Merriweather / Georgia) | Normal to Medium (400–500) | `text-3xl` to `text-7xl` | Hero headlines, section titles, patient greetings |
| **Body & UI Elements** | `font-sans` (Inter / Outfit / system-ui) | Normal (400) & Semibold (600) | `text-xs` to `text-base` | Paragraphs, buttons, metadata badges, clinical metrics |
| **Regional Scripts** | Native UTF-8 | Medium (500) | Scaled +10% | Assamese (অসমীয়া), Bengali (বাংলা), Bodo, Manipuri, Hindi |

---

## 4. Visual Imagery Standards
- **Authentic Indian Photography Only**: All photographic representations of seniors and caregivers MUST depict authentic Indian individuals, with an emphasis on Northeast India (Assam, Meghalaya, Manipur, etc.) and Indian domestic settings.
- **Square Image Framing (`rounded-none`)**:
  - Image containers and thumbnails across the platform must use sharp, square corners (`rounded-none`) with crisp hairline borders (`border border-[#1E4334]/20`).
  - Avoid generic rounded-corner bubbles or circular portrait cutouts.
- **ZERO Emojis**: Emojis appear juvenile, unprofessional, and confuse elderly patients. Use clean Lucide SVG icons instead (`Music`, `Radio`, `BookOpen`, `Users`, `Stethoscope`, `SunMedium`).
- **NO Heart Icons in Clinical Sections**: Avoid casual heart symbols in clinical and landing sections. Use dignified icons (`SunMedium` for daylight orientation, `BookOpen` for memories, `ShieldCheck` for privacy).

---

## 5. Cognitive Ergonomics for Elders
1. **Touch Targets**: Minimum interactive touch area of `56px × 56px` to accommodate tremors or low motor precision.
2. **One Action Per Surface**: Avoid multiple competing primary buttons. Provide one clear, prominent path forward.
3. **Forgiving Interactions**: No fail states, buzzer sounds, or red "Wrong Answer" alerts in memory games. Always provide comforting, progressive hints.
4. **Daylight Anchor**: Always prominently show time of day and natural orientation cues (e.g. morning sun, tea time) in the elder's native tongue.

---

## 6. Architectural File Structure
```
dimentia/
├── doc/
│   ├── PRD.md            # Product requirements & clinical architecture
│   └── DESIGN.md         # Design system, color tokens & UX guidelines
├── public/
│   └── images/           # Authentic Indian documentary photography assets
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Clean brand navigation
│   │   ├── Hero.tsx             # Editorial hero with interactive visuals
│   │   ├── PainPointsSection.tsx# The Silent Reality & Indian statistics
│   │   ├── CueBundleSection.tsx # 5 authentic ecosystem capabilities
│   │   ├── ManifestoSection.tsx # Deep green empathy manifesto
│   │   ├── HowItWorks.tsx       # 4-step daily workflow
│   │   ├── ComparisonSection.tsx# Standard care vs. SmritiSetu
│   │   ├── SurfacesBento.tsx    # 3 Connected modes diagram (2-to-1 joining)
│   │   ├── CtaSection.tsx       # Early access pilot registration
│   │   ├── Footer.tsx           # Credits with "Built for SIH"
│   │   ├── RoleModal.tsx        # Interactive 3-role simulator prototype
│   │   └── FaqPage.tsx          # Dedicated standalone FAQ page
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
```
