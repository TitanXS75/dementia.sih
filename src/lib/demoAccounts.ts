import { AppUser, UserRole } from "./useAuth";

export interface DemoAccount extends AppUser {
  roleLabel: string;
  badge: string;
  subtitle: string;
  description: string;
  avatarInitials: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: "patient",
    name: "Bapuram Baruah",
    email: "bapuram.elder@smritisetu.org",
    language: "en",
    roleLabel: "Elder Patient",
    badge: "Bedside Tablet",
    subtitle: "Age 72 • Jorhat, Assam",
    description: "Daylight rhythm, 1-tap memory games, familiar music & calming audio",
    avatarInitials: "BB",
  },
  {
    role: "family",
    name: "Ananya Baruah",
    email: "ananya.family@smritisetu.org",
    language: "en",
    roleLabel: "Family Caregiver",
    badge: "Caregiver Portal",
    subtitle: "Daughter • Guwahati",
    description: "Family memory photo uploads, WhatsApp sync & routine tracking",
    avatarInitials: "AB",
  },
  {
    role: "asha",
    name: "Dr. Priyanka Sharma",
    email: "priyanka.asha@nhm.gov.in",
    language: "en",
    roleLabel: "ASHA / Clinician",
    badge: "Clinical Triage",
    subtitle: "Community Health Officer",
    description: "Cognitive stability index, session logs & clinical reminiscence triage",
    avatarInitials: "PS",
  },
];
