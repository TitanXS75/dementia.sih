import React from "react";
import { useAuth } from "../../lib/useAuth";
import DoctorCaseloadScreen from "./DoctorCaseloadScreen";
import FamilyPortalScreen from "./FamilyPortalScreen";
import PatientHomeScreen from "./PatientHomeScreen";

/**
 * Smart Role Dispatcher for `/app/home`.
 * Automatically mounts the clinical multi-patient cockpit for Doctors/ASHAs,
 * the connected elder companion hub for Family Caregivers,
 * or the accessible living room bedside tablet for Elder Patients.
 */
export default function HomePage() {
  const { user } = useAuth();

  if (user?.role === "asha") {
    return <DoctorCaseloadScreen />;
  }

  if (user?.role === "family") {
    return <FamilyPortalScreen />;
  }

  // Default to Elder Patient Bedside Tablet mode
  return <PatientHomeScreen />;
}
