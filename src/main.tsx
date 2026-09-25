import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

// Landing page (existing)
import LandingApp from "./App";

// Auth
import AuthPage from "./components/AuthPage";

// Interior app
import AppShell from "./components/app/AppShell";
import HomePage from "./components/app/HomePage";
import GamesHub from "./components/app/GamesHub";
import FacesGame from "./components/app/games/FacesGame";
import PlacesGame from "./components/app/games/PlacesGame";
import RoutineGame from "./components/app/games/RoutineGame";
import CultureGame from "./components/app/games/CultureGame";
import CalmingMode from "./components/app/CalmingMode";
import MemoriesPage from "./components/app/MemoriesPage";
import SettingsPage from "./components/app/SettingsPage";

// Dexie seed
import { seedDemoData } from "./lib/db";

// Seed demo data on first load
seedDemoData().catch(console.warn);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public landing page — all existing views handled internally */}
        <Route path="/" element={<LandingApp />} />

        {/* Auth pages */}
        <Route
          path="/login"
          element={
            <AuthPage
              initialMode="login"
              onNavigateHome={() => window.location.href = "/"}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <AuthPage
              initialMode="signup"
              onNavigateHome={() => window.location.href = "/"}
            />
          }
        />

        {/* Interior app — protected shell with bottom tabs */}
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Navigate to="/app/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="games" element={<GamesHub />} />
          <Route path="games/faces" element={<FacesGame />} />
          <Route path="games/places" element={<PlacesGame />} />
          <Route path="games/routine" element={<RoutineGame />} />
          <Route path="games/culture" element={<CultureGame />} />
          <Route path="calming" element={<CalmingMode />} />
          <Route path="memories" element={<MemoriesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
