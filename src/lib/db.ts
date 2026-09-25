import Dexie, { type EntityTable } from "dexie";

/* ─── Type definitions ─── */

export interface Patient {
  id?: number;
  name: string;
  language: string;
  role: "patient" | "family" | "asha";
  greeting?: string;
  stage?: string;
  createdAt: Date;
}

export interface MemoryAsset {
  id?: number;
  patientId: number;
  type: "photo" | "audio" | "place";
  blob?: Blob;
  url?: string;
  label: string;
  relationship?: string;
  createdAt: Date;
}

export interface GameSession {
  id?: number;
  patientId: number;
  gameType: "faces" | "places" | "routine" | "culture";
  startedAt: Date;
  completedAt?: Date;
  accuracy?: number;
  latencyMs?: number;
  completed: boolean;
}

export interface Reminder {
  id?: number;
  patientId: number;
  type: "medicine" | "hydration" | "activity" | "custom";
  title: string;
  scheduledAt: Date;
  acknowledged: boolean;
}

export interface PendingSync {
  id?: number;
  action: string;
  payload: string;
  createdAt: Date;
}

/* ─── Database definition ─── */

const db = new Dexie("SmritiSetuDB") as Dexie & {
  patients: EntityTable<Patient, "id">;
  memoryAssets: EntityTable<MemoryAsset, "id">;
  gameSessions: EntityTable<GameSession, "id">;
  reminders: EntityTable<Reminder, "id">;
  pendingSync: EntityTable<PendingSync, "id">;
};

db.version(1).stores({
  patients: "++id, name, language, role",
  memoryAssets: "++id, patientId, type, label",
  gameSessions: "++id, patientId, gameType, startedAt",
  reminders: "++id, patientId, type, scheduledAt",
  pendingSync: "++id, action, createdAt",
});

/* ─── Sample data seed (for demo mode) ─── */

export async function seedDemoData() {
  const count = await db.patients.count();
  if (count > 0) return; // Already seeded

  const patientId = await db.patients.add({
    name: "Baba",
    language: "as",
    role: "patient",
    greeting: "Suprobhat, Deuta!",
    stage: "mild",
    createdAt: new Date(),
  });

  // Sample memory assets (placeholder URLs — will be replaced with real uploads)
  await db.memoryAssets.bulkAdd([
    {
      patientId: patientId as number,
      type: "photo",
      url: "/images/indian_family_album.jpg",
      label: "Family gathering during Bihu",
      relationship: "Family",
      createdAt: new Date(),
    },
    {
      patientId: patientId as number,
      type: "photo",
      url: "/images/indian_grandmother_tea.jpg",
      label: "Morning tea in the veranda",
      relationship: "Home",
      createdAt: new Date(),
    },
    {
      patientId: patientId as number,
      type: "photo",
      url: "/images/indian_grandfather_radio.jpg",
      label: "Listening to Bhupen Hazarika",
      relationship: "Music",
      createdAt: new Date(),
    },
    {
      patientId: patientId as number,
      type: "place",
      url: "/images/indian_grandfather_assam.jpg",
      label: "Tea garden in Jorhat",
      relationship: "Place",
      createdAt: new Date(),
    },
  ]);

  // Sample reminders
  const today = new Date();
  await db.reminders.bulkAdd([
    {
      patientId: patientId as number,
      type: "medicine",
      title: "Morning blood pressure capsule",
      scheduledAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0),
      acknowledged: false,
    },
    {
      patientId: patientId as number,
      type: "hydration",
      title: "Drink a glass of warm water",
      scheduledAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
      acknowledged: false,
    },
  ]);
}

export { db };
