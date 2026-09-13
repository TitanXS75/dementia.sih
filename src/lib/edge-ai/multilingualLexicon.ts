// Regional Multilingual Lexicon for SmritiSetu On-Device Edge AI (28MB RAM Engine)
// Provides zero-latency semantic mapping from Assamese, Bengali, Hindi, and English
// into canonical clinical and reminiscence tool schemas.

export type SupportedLang = "as" | "bn" | "hi" | "en";

export interface ToolIntentDefinition {
  toolName: string;
  category: "reminiscence" | "calm_safety" | "clinical_triage" | "orientation";
  displayName: string;
  defaultConfidence: number;
  keywords: {
    as: string[]; // Assamese (Native & Romanized)
    bn: string[]; // Bengali (Native & Romanized)
    hi: string[]; // Hindi (Native & Romanized)
    en: string[]; // English
  };
  extractSlots: (query: string, lang: SupportedLang) => Record<string, any>;
}

export const SMRITI_TOOL_DEFINITIONS: ToolIntentDefinition[] = [
  {
    toolName: "play_nostalgia_audio",
    category: "reminiscence",
    displayName: "Vintage Reminiscence Audio Player",
    defaultConfidence: 0.94,
    keywords: {
      as: [
        "গান", "সুৰ", "ভূপেন", "হাজৰিকা", "জয়ন্ত", "হাজৰিকাৰ", "বিহু", "পুৰণি", "বজোৱা", "সুনাম", "লগাওক",
        "gaan", "sur", "bhupen", "hazarika", "joyonto", "bihu", "puroni", "bajao", "bojuwa", "geet"
      ],
      bn: [
        "গান", "সুর", "রবীন্দ্র", "সঙ্গীত", "নজরুল", "মান্না দে", "হৈমন্তী", "চালাও", "বাজাও", "শোনাও",
        "gaan", "sur", "rabindra", "sangeet", "manna dey", "chalao", "bajao", "shonao", "geet"
      ],
      hi: [
        "गाना", "गीत", "संगीत", "भजन", "मुकेश", "लता", "किशोर", "पुराने", "बजाओ", "सुनाओ", "लगाओ",
        "gaana", "geet", "sangeet", "bhajan", "lata", "kishore", "purane geet", "bajao", "sunao"
      ],
      en: [
        "music", "song", "audio", "radio", "melody", "tune", "vintage", "bhupen", "tagore", "play", "listen"
      ]
    },
    extractSlots: (query: string) => {
      const lower = query.toLowerCase();
      let artist = "Bhupen Hazarika";
      let track = "Manuhe Manuhor Babe (Vintage Classic)";
      let tempo = "soothing_60bpm";

      if (lower.includes("রবীন্দ্র") || lower.includes("rabindra") || lower.includes("tagore")) {
        artist = "Rabindranath Tagore";
        track = "Purano Sei Diner Kotha";
      } else if (lower.includes("জয়ন্ত") || lower.includes("joyonto")) {
        artist = "Jayanta Hazarika";
        track = "Tomar Morome Mor";
      } else if (lower.includes("लता") || lower.includes("lata") || lower.includes("kishore") || lower.includes("भजन")) {
        artist = "Vintage Classic";
        track = "Achyutam Keshavam (Gentle Flute)";
      }

      return {
        artist,
        track,
        tempo,
        purpose: "Agitation prevention & auditory reminiscence"
      };
    }
  },
  {
    toolName: "open_family_jigsaw",
    category: "reminiscence",
    displayName: "Tactile Family Photo Jigsaw",
    defaultConfidence: 0.92,
    keywords: {
      as: [
        "ছবি", "ফটো", "ধেমালি", "টুকৰা", "নাতি", "নাতিনী", "গাঁৱৰ", "পুৰণি ছবি", "পহিলা",
        "chobi", "photo", "dhemali", "tukura", "nati", "natini", "gao", "jigsaw", "puzzle"
      ],
      bn: [
        "ছবি", "ফটোগ্রাফ", "ধাঁধা", "টুকরো", "নাতি", "নাতনি", "পরিবার", "গ্রাম", "স্মৃতি",
        "chobi", "photo", "dhadha", "tukro", "nati", "natni", "poribar", "gram", "puzzle"
      ],
      hi: [
        "तस्वीर", "फोटो", "पहेली", "टुकड़े", "पोता", "पोती", "परिवार", "गांव", "पुरानी फोटो",
        "tasveer", "photo", "paheli", "pota", "poti", "parivar", "puzzle", "jigsaw"
      ],
      en: [
        "photo", "picture", "puzzle", "jigsaw", "grandson", "granddaughter", "family", "village", "album", "pieces"
      ]
    },
    extractSlots: (query: string) => {
      const lower = query.toLowerCase();
      let subject = "Grandchildren at Ancestral Home";
      let pieces = 4;

      if (lower.includes("গাঁও") || lower.includes("gram") || lower.includes("गांव") || lower.includes("village")) {
        subject = "Majuli Riverbank Ancestral Courtyard";
      } else if (lower.includes("নাতি") || lower.includes("pota") || lower.includes("grandson")) {
        subject = "Granddaughter Aarohi's Graduation Day";
      }

      return {
        subject,
        pieceCount: pieces,
        assistanceLevel: "Gentle contour snap (No failure penalty)",
        cognitiveTarget: "Visuospatial motor recognition"
      };
    }
  },
  {
    toolName: "trigger_calm_protocol",
    category: "calm_safety",
    displayName: "Dementia Sundowning & Calm Protocol",
    defaultConfidence: 0.96,
    keywords: {
      as: [
        "ভয়", "অস্থিৰ", "অশান্তি", "আশংকা", "মাত শুনোৱা", "শান্ত কৰক", "সন্ধিয়া", "ঘৰলৈ যাম", "কন্দা",
        "bhoy", "osthir", "osanti", "maat", "shanto", "sundowning", "ghoroloi", "kandise"
      ],
      bn: [
        "ভয়", "অস্থির", "উদ্বেগ", "শান্ত", "মেয়ের গলা", "ছেলে", "বাড়ি যাব", "সন্ধ্যাবেলা", "অশান্ত",
        "bhoy", "osthir", "udbeg", "shanto", "meyer gola", "bari jabo", "shondha"
      ],
      hi: [
        "घबराहट", "बेचैनी", "डर", "शांत करो", "आवाज", "बेटी की आवाज", "घर जाना है", "शाम", "रो रहे हैं",
        "ghabrahat", "bechaini", "dar", "shant", "aawaz", "beti", "ghar jana", "sundowning"
      ],
      en: [
        "restless", "anxious", "fear", "scared", "calm", "sundowning", "wandering", "daughter voice", "family reassurance", "crying"
      ]
    },
    extractSlots: (query: string) => {
      const lower = query.toLowerCase();
      let urgency: "critical_sundowning" | "mild_anxiety" = "mild_anxiety";
      if (lower.includes("ভয়") || lower.includes("डर") || lower.includes("scared") || lower.includes("wandering") || lower.includes("সন্ধিয়া")) {
        urgency = "critical_sundowning";
      }

      return {
        urgency,
        audioReassurance: "Daughter Priya's Voice Note (Assamese/Bengali: 'Deuta, chinta nokoribo...')",
        lightingCue: "Warm amber living room wash (reduce shadow hallucinations)",
        caregiverAlert: true
      };
    }
  },
  {
    toolName: "log_asha_screening",
    category: "clinical_triage",
    displayName: "ASHA Clinical Screening Telemetry",
    defaultConfidence: 0.91,
    keywords: {
      as: [
        "পৰীক্ষা", "স্ক্ৰীনিং", "হাত কঁপিছে", "দেরি", "পাহৰি গৈছে", "স্মৃতিশক্তি", "আশা", "ট্ৰায়েজে",
        "porikha", "screening", "kopise", "deri", "pahori", "smriti", "asha", "triage"
      ],
      bn: [
        "পরীক্ষা", "স্ক্রিনিং", "হাত কাঁপছে", "দেরি", "ভুলে গেছে", "স্মৃতি", "আশা কর্মী",
        "porikha", "screening", "kapa", "deri", "bhule geche", "asha", "triage"
      ],
      hi: [
        "जांच", "स्क्रीनिंग", "हाथ कांपना", "देरी", "भूलना", "आशा कार्यकर्ता", "ट्रायज", "लक्षण",
        "jaanch", "screening", "kaapna", "deri", "bhulna", "asha", "triage"
      ],
      en: [
        "screening", "triage", "tremor", "hesitation", "delay", "mmse", "clinical log", "asha", "symptom", "recall"
      ]
    },
    extractSlots: (query: string) => {
      const lower = query.toLowerCase();
      let hasTremor = lower.includes("tremor") || lower.includes("कँপিছে") || lower.includes("कांप") || lower.includes("kapa") || lower.includes("kopise");
      let latencySec = 18;
      const secMatch = query.match(/(\d+)\s*(s|sec|সেকেন্ড|सेकंड)/i);
      if (secMatch) {
        latencySec = parseInt(secMatch[1], 10);
      }

      return {
        clinicalSession: "Door-to-door rural triage",
        vocalRecallLatencySeconds: latencySec,
        motorTremorDetected: hasTremor,
        mmseCognitiveBand: latencySec > 20 ? "Moderate decline alert (Staging: 18/30)" : "Mild hesitation (Staging: 23/30)",
        syncStatus: "Queued for local IndexedDB (Zero Cloud Required)"
      };
    }
  },
  {
    toolName: "show_daily_orientation",
    category: "orientation",
    displayName: "Living Room Daylight Orientation",
    defaultConfidence: 0.89,
    keywords: {
      as: [
        "দিন", "বাৰ", "সময়", "চাহ", "বতৰ", "আজি কি", "কেতিয়া", "ৰুটিন",
        "din", "baar", "somoy", "cha", "botor", "aaji", "ketiya", "routine"
      ],
      bn: [
        "দিন", "বার", "সময়", "চা", "আবহাওয়া", "আজকে", "কখন", "রুটিন",
        "din", "baar", "shomoy", "cha", "aajke", "kokhon", "routine"
      ],
      hi: [
        "तारीख", "दिन", "समय", "मौसम", "आज क्या है", "चाय का समय", "सुबह",
        "tarikh", "din", "samay", "mausam", "aaj kya", "chai", "routine"
      ],
      en: [
        "date", "time", "day", "weather", "today", "morning routine", "afternoon tea", "orientation", "schedule"
      ]
    },
    extractSlots: () => {
      return {
        currentDay: "Wednesday, September 13",
        period: "Late Afternoon · Tea & Veranda Resting",
        weather: "26°C · Overcast Tea Valley Gentle Breeze",
        nextRoutine: "5:00 PM Gentle Family Melodies"
      };
    }
  }
];

// Preset sample queries for immediate 1-tap testing across all 4 languages
export interface SampleQuery {
  id: string;
  lang: SupportedLang;
  langLabel: string;
  text: string;
  expectedTool: string;
  explanation: string;
}

export const REGIONAL_SAMPLE_QUERIES: SampleQuery[] = [
  {
    id: "as_music",
    lang: "as",
    langLabel: "অসমীয়া (Assamese)",
    text: "দেউতাৰ পুৰণি ভূপেন হাজৰিকাৰ গান বজোৱা",
    expectedTool: "play_nostalgia_audio",
    explanation: "Elder requests vintage Bhupen Hazarika melody in native Assamese"
  },
  {
    id: "as_calm",
    lang: "as",
    langLabel: "অসমীয়া (Assamese)",
    text: "সন্ধিয়া দেউতা বৰ অস্থিৰ হৈছে, শান্ত কৰিবলৈ জীয়েকৰ মাত শুনোৱা",
    expectedTool: "trigger_calm_protocol",
    explanation: "Evening sundowning alert triggering daughter's calming voice note"
  },
  {
    id: "bn_puzzle",
    lang: "bn",
    langLabel: "বাংলা (Bengali)",
    text: "গ্রামের বাড়ির ছবি দিয়ে ৪ টুকরোর ধাঁধা খোলো",
    expectedTool: "open_family_jigsaw",
    explanation: "Requests 4-piece tactile jigsaw of ancestral home in Bengali"
  },
  {
    id: "bn_music",
    lang: "bn",
    langLabel: "বাংলা (Bengali)",
    text: "দাদুর প্রিয় রবীন্দ্র সঙ্গীত চালাও",
    expectedTool: "play_nostalgia_audio",
    explanation: "Plays Tagore nostalgia track to soothe grandfather in Bengali"
  },
  {
    id: "hi_calm",
    lang: "hi",
    langLabel: "हिंदी (Hindi)",
    text: "बाबाजी को बहुत घबराहट और डर लग रहा है, बेटी की आवाज सुनाओ",
    expectedTool: "trigger_calm_protocol",
    explanation: "Elder experiencing panic; triggers daughter voice reassurance in Hindi"
  },
  {
    id: "hi_puzzle",
    lang: "hi",
    langLabel: "हिंदी (Hindi)",
    text: "पोते की पुरानी फोटो की पहेली शुरू करो",
    expectedTool: "open_family_jigsaw",
    explanation: "Requests tactile jigsaw puzzle of grandson in Hindi"
  },
  {
    id: "en_asha",
    lang: "en",
    langLabel: "English",
    text: "ASHA triage: patient took 22s recall with noticeable right hand tremor",
    expectedTool: "log_asha_screening",
    explanation: "Frontline health worker logs motor tremor and speech hesitation"
  },
  {
    id: "en_orient",
    lang: "en",
    langLabel: "English",
    text: "What day and time is it? Show today's routine and tea time",
    expectedTool: "show_daily_orientation",
    explanation: "Disoriented elder asks for daylight time and routine orientation"
  }
];
