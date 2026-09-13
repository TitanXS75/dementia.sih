import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ShieldCheck,
  BookOpen,
  SunMedium,
} from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase";

type AuthMode = "login" | "signup";

type Role = "family" | "asha" | "patient";

const ROLES: { id: Role; label: string; desc: string }[] = [
  { id: "family", label: "Family Member", desc: "Caregiver or relative" },
  { id: "asha", label: "ASHA / Doctor", desc: "Healthcare worker or clinician" },
  { id: "patient", label: "Patient (Elder)", desc: "Individual experiencing memory care" },
];

interface AuthPageProps {
  initialMode?: AuthMode;
  onNavigateHome: () => void;
}

/* ─────────────────────────────────────────── shared styles ── */
const inputBase = "flex items-center border bg-[#F7F5F0] transition-colors";
const inputNormal =
  "border-[#1E4334]/15 focus-within:border-[#1E4334]/50 focus-within:bg-white";
const inputError = "border-[#99462A]/60 bg-[#FBECE7]/40";

/* ─────────────────────────────────────── password strength ── */
function getPasswordStrength(val: string): { level: 0 | 1 | 2 | 3; label: string } {
  if (!val) return { level: 0, label: "" };
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  if (score <= 1) return { level: 1, label: "Weak" };
  if (score === 2) return { level: 2, label: "Fair" };
  return { level: 3, label: "Strong" };
}
const strengthColors = ["", "#99462A", "#D97706", "#1E4334"];

/* ═══════════════════════════════════════════════════════════ */
export default function AuthPage({ initialMode = "login", onNavigateHome }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // keep hash in sync when user clicks toggle
  function switchMode(next: AuthMode) {
    setMode(next);
    window.history.replaceState(null, "", next === "login" ? "#login" : "#signup");
    // reset both forms on switch
    resetLogin();
    resetSignup();
  }

  /* ─────────────────────── login state ── */
  const [lEmail, setLEmail] = useState("");
  const [lPassword, setLPassword] = useState("");
  const [lShowPw, setLShowPw] = useState(false);
  const [lErrors, setLErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [lSubmitting, setLSubmitting] = useState(false);
  const [lSubmitted, setLSubmitted] = useState(false);

  function resetLogin() {
    setLEmail("");
    setLPassword("");
    setLShowPw(false);
    setLErrors({});
    setLSubmitting(false);
    setLSubmitted(false);
  }

  function validateLEmail(v: string) {
    if (!v.trim()) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email address.";
    return "";
  }
  function validateLPassword(v: string) {
    if (!v) return "Password is required.";
    return "";
  }

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof lErrors = {};
    const ee = validateLEmail(lEmail);
    const pe = validateLPassword(lPassword);
    if (ee) errs.email = ee;
    if (pe) errs.password = pe;
    if (Object.keys(errs).length > 0) { setLErrors(errs); return; }
    setLErrors({});
    setLSubmitting(true);
    setTimeout(() => { setLSubmitting(false); setLSubmitted(true); }, 900);
  }

  /* ────────────────────── signup state ── */
  const [sName, setSName] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sPassword, setSPassword] = useState("");
  const [sConfirm, setSConfirm] = useState("");
  const [sRole, setSRole] = useState<Role>("family");
  const [sShowPw, setSShowPw] = useState(false);
  const [sShowConfirm, setSShowConfirm] = useState(false);
  const [sErrors, setSErrors] = useState<{
    name?: string; email?: string; password?: string; confirmPassword?: string; form?: string;
  }>({});
  const [sSubmitting, setSSubmitting] = useState(false);
  const [sSubmitted, setSSubmitted] = useState(false);

  function resetSignup() {
    setSName(""); setSEmail(""); setSPassword(""); setSConfirm("");
    setSRole("family"); setSShowPw(false); setSShowConfirm(false);
    setSErrors({}); setSSubmitting(false); setSSubmitted(false);
  }

  function validateSName(v: string) {
    if (!v.trim()) return "Full name is required.";
    if (v.trim().length < 2) return "Name must be at least 2 characters.";
    return "";
  }
  function validateSEmail(v: string) {
    if (!v.trim()) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email address.";
    return "";
  }
  function validateSPassword(v: string) {
    if (!v) return "Password is required.";
    if (v.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Za-z]/.test(v)) return "Password must include at least one letter.";
    if (!/[0-9]/.test(v)) return "Password must include at least one number.";
    return "";
  }
  function validateSConfirm(v: string, pass: string) {
    if (!v) return "Please confirm your password.";
    if (v !== pass) return "Passwords do not match.";
    return "";
  }

  function handleSignupSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof sErrors = {};
    const ne = validateSName(sName);
    const ee = validateSEmail(sEmail);
    const pe = validateSPassword(sPassword);
    const ce = validateSConfirm(sConfirm, sPassword);
    if (ne) errs.name = ne;
    if (ee) errs.email = ee;
    if (pe) errs.password = pe;
    if (ce) errs.confirmPassword = ce;
    if (Object.keys(errs).length > 0) { setSErrors(errs); return; }
    setSErrors({});
    setSSubmitting(true);
    setTimeout(() => { setSSubmitting(false); setSSubmitted(true); }, 900);
  }

  const sStrength = getPasswordStrength(sPassword);

  async function handleGoogleSignIn() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          fullName: user.displayName || "New User",
          email: user.email,
          photoURL: user.photoURL || "",
          role: mode === "signup" ? sRole : "user",
          createdAt: new Date().toISOString()
        });
      }
      
      if (mode === "login") {
        setLSubmitted(true);
      } else {
        setSSubmitted(true);
      }
    } catch (error: any) {
      console.error("Google Auth Error:", error);
      const errMessage = error.message || "Google authentication failed. Please try again.";
      if (mode === "login") {
        setLErrors({ form: errMessage });
      } else {
        setSErrors({ form: errMessage });
      }
    }
  }

  /* ────── sync mode when App changes hash externally ─────── */
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  /* ─── keep card top in view when toggling on mobile ────── */
  const cardRef = useRef<HTMLDivElement>(null);
  function handleToggle(next: AuthMode) {
    switchMode(next);
    // nudge scroll so the card top is visible — no full-page jump
    setTimeout(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        if (rect.top < 0) {
          cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, 50);
  }

  /* ═══════════════════════════════════ render ══════════════ */
  const isLogin = mode === "login";

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col font-sans selection:bg-[#1E4334] selection:text-[#C8F028]">

      {/* ── Minimal Top Bar ──────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#1E4334]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-sm font-medium text-[#1A1814]/70 hover:text-[#1E4334] transition-colors focus:outline-none group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden xs:inline">Back to home</span>
            <span className="xs:hidden sr-only">Back</span>
          </button>
          <span className="font-serif text-xl font-bold text-[#1E4334] tracking-tight">SmritiSetu</span>
          {/* spacer to keep brand centered */}
          <div className="w-[88px] sm:w-[100px]" />
        </div>
      </header>

      {/* ── Main ─────────────────────────────────────────── */}
      <main className="flex-1 flex items-start sm:items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="w-full max-w-[480px]" ref={cardRef}>

          {/* Icon mark */}
          <div className="mb-6 flex items-center justify-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1E4334] flex items-center justify-center">
              {isLogin
                ? <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#C8F028]" />
                : <SunMedium className="w-6 h-6 sm:w-7 sm:h-7 text-[#C8F028]" />}
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#1E4334] leading-tight mb-2">
              {isLogin ? "Welcome back" : "Join SmritiSetu"}
            </h1>
            <p className="text-sm text-[#1A1814]/60 leading-relaxed">
              {isLogin
                ? "Sign in to continue supporting your loved one's care journey."
                : "Create your account and start your family's memory care journey."}
            </p>
          </div>

          {/* ── Mode Toggle ─────────────────────────────── */}
          <div
            className="flex border border-[#1E4334]/15 bg-white mb-6 overflow-hidden"
            role="tablist"
            aria-label="Authentication mode"
          >
            <button
              id="auth-tab-login"
              role="tab"
              aria-selected={isLogin}
              aria-controls="auth-panel"
              onClick={() => handleToggle("login")}
              className={`flex-1 py-3 text-sm font-semibold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4334]/40 ${
                isLogin
                  ? "bg-[#1E4334] text-white"
                  : "bg-white text-[#1A1814]/60 hover:text-[#1E4334] hover:bg-[#1E4334]/5"
              }`}
            >
              Sign in
            </button>
            <button
              id="auth-tab-signup"
              role="tab"
              aria-selected={!isLogin}
              aria-controls="auth-panel"
              onClick={() => handleToggle("signup")}
              className={`flex-1 py-3 text-sm font-semibold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4334]/40 ${
                !isLogin
                  ? "bg-[#1E4334] text-white"
                  : "bg-white text-[#1A1814]/60 hover:text-[#1E4334] hover:bg-[#1E4334]/5"
              }`}
            >
              Create account
            </button>
          </div>

          {/* ── Card ────────────────────────────────────── */}
          <div
            id="auth-panel"
            role="tabpanel"
            aria-labelledby={isLogin ? "auth-tab-login" : "auth-tab-signup"}
          >

            {/* ════════ LOGIN SUCCESS ═══════════════════ */}
            {isLogin && lSubmitted ? (
              <div className="bg-white border border-[#1E4334]/20 p-6 sm:p-8 text-center">
                <div className="w-12 h-12 bg-[#1E4334] flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-[#C8F028]" />
                </div>
                <h2 className="font-serif text-xl text-[#1E4334] mb-2">Signed in successfully</h2>
                <p className="text-sm text-[#1A1814]/60">
                  Authentication is currently in prototype mode. Backend integration is coming in the next phase.
                </p>
                <button
                  onClick={() => setLSubmitted(false)}
                  className="mt-6 text-sm font-semibold text-[#1E4334] underline underline-offset-2 hover:text-[#142F24] transition-colors focus:outline-none"
                >
                  Back to sign in
                </button>
              </div>

            /* ════════ SIGNUP SUCCESS ════════════════════ */
            ) : !isLogin && sSubmitted ? (
              <div className="bg-white border border-[#1E4334]/20 p-6 sm:p-8 text-center">
                <div className="w-12 h-12 bg-[#1E4334] flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-[#C8F028]" />
                </div>
                <h2 className="font-serif text-xl text-[#1E4334] mb-2">Account created</h2>
                <p className="text-sm text-[#1A1814]/60">
                  Registration is currently in prototype mode. Backend integration is coming in the next phase.
                </p>
                <button
                  onClick={() => handleToggle("login")}
                  className="mt-6 w-full min-h-[52px] bg-[#1E4334] text-white font-semibold text-sm tracking-wide hover:bg-[#142F24] active:scale-[0.985] transition-all focus:outline-none"
                >
                  Go to sign in
                </button>
              </div>

            /* ════════ LOGIN FORM ════════════════════════ */
            ) : isLogin ? (
              <div className="bg-white border border-[#1E4334]/12 shadow-[0_4px_20px_-2px_rgba(30,67,52,0.06)]">
                <form onSubmit={handleLoginSubmit} noValidate className="p-5 sm:p-8 flex flex-col gap-5">

                  {/* Global error */}
                  {lErrors.form && (
                    <div className="border border-[#99462A]/30 bg-[#FBECE7] px-4 py-3 text-sm text-[#99462A] flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{lErrors.form}</span>
                    </div>
                  )}

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="login-email" className="text-xs font-semibold text-[#1A1814]/80 uppercase tracking-wide">
                      Email address
                    </label>
                    <div className={`${inputBase} ${lErrors.email ? inputError : inputNormal}`}>
                      <span className="pl-4 text-[#1E4334]/50"><Mail className="w-4 h-4" /></span>
                      <input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        value={lEmail}
                        onChange={(e) => {
                          const v = e.target.value;
                          setLEmail(v);
                          if (lErrors.email) {
                            const err = validateLEmail(v);
                            setLErrors((p) => ({ ...p, email: err || undefined }));
                          }
                        }}
                        placeholder="you@example.com"
                        className="flex-1 min-w-0 min-h-[52px] sm:min-h-[56px] px-3 bg-transparent text-sm text-[#1A1814] placeholder:text-[#1A1814]/35 focus:outline-none"
                      />
                    </div>
                    {lErrors.email && <p className="text-xs text-[#99462A] mt-0.5">{lErrors.email}</p>}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="login-password" className="text-xs font-semibold text-[#1A1814]/80 uppercase tracking-wide">
                        Password
                      </label>
                      <button
                        type="button"
                        className="text-xs text-[#1E4334] font-medium hover:underline underline-offset-2 focus:outline-none"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className={`${inputBase} ${lErrors.password ? inputError : inputNormal}`}>
                      <span className="pl-4 text-[#1E4334]/50"><Lock className="w-4 h-4" /></span>
                      <input
                        id="login-password"
                        type={lShowPw ? "text" : "password"}
                        autoComplete="current-password"
                        value={lPassword}
                        onChange={(e) => {
                          const v = e.target.value;
                          setLPassword(v);
                          if (lErrors.password) {
                            setLErrors((p) => ({ ...p, password: v ? undefined : "Password is required." }));
                          }
                        }}
                        placeholder="Enter your password"
                        className="flex-1 min-w-0 min-h-[52px] sm:min-h-[56px] px-3 bg-transparent text-sm text-[#1A1814] placeholder:text-[#1A1814]/35 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setLShowPw(!lShowPw)}
                        className="pr-4 text-[#1E4334]/50 hover:text-[#1E4334] transition-colors focus:outline-none shrink-0"
                        aria-label={lShowPw ? "Hide password" : "Show password"}
                      >
                        {lShowPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {lErrors.password && <p className="text-xs text-[#99462A] mt-0.5">{lErrors.password}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    id="login-submit-btn"
                    type="submit"
                    disabled={lSubmitting}
                    className="w-full min-h-[52px] sm:min-h-[56px] bg-[#1E4334] text-white font-semibold text-sm tracking-wide hover:bg-[#142F24] active:scale-[0.985] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                  >
                    {lSubmitting ? "Signing in..." : "Sign in to SmritiSetu"}
                  </button>

                  <div className="w-full flex items-center gap-3 mt-1">
                    <div className="flex-1 h-px bg-[#1E4334]/10" />
                    <span className="text-xs text-[#1A1814]/40 font-medium">or</span>
                    <div className="flex-1 h-px bg-[#1E4334]/10" />
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full min-h-[52px] sm:min-h-[56px] border border-[#1E4334]/15 bg-white text-[#1E4334] font-semibold text-sm tracking-wide hover:bg-[#F7F5F0] active:scale-[0.985] transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </button>
                </form>
              </div>

            /* ════════ SIGNUP FORM ══════════════════════ */
            ) : (
              <div className="bg-white border border-[#1E4334]/12 shadow-[0_4px_20px_-2px_rgba(30,67,52,0.06)]">
                <form onSubmit={handleSignupSubmit} noValidate className="p-5 sm:p-8 flex flex-col gap-5">

                  {/* Global error */}
                  {sErrors.form && (
                    <div className="border border-[#99462A]/30 bg-[#FBECE7] px-4 py-3 text-sm text-[#99462A] flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{sErrors.form}</span>
                    </div>
                  )}

                  {/* Role selector */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-[#1A1814]/80 uppercase tracking-wide">
                      I am joining as
                    </span>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      {ROLES.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setSRole(r.id)}
                          className={`min-h-[52px] sm:min-h-[56px] px-1.5 sm:px-2 py-2 sm:py-3 border text-left flex flex-col gap-0.5 transition-colors focus:outline-none ${
                            sRole === r.id
                              ? "border-[#1E4334] bg-[#1E4334]/5"
                              : "border-[#1E4334]/15 bg-[#F7F5F0] hover:border-[#1E4334]/35"
                          }`}
                          aria-pressed={sRole === r.id}
                        >
                          <span className={`text-[10px] sm:text-xs font-semibold leading-tight ${sRole === r.id ? "text-[#1E4334]" : "text-[#1A1814]/70"}`}>
                            {r.label}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-[#1A1814]/40 leading-tight">{r.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Full name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="signup-name" className="text-xs font-semibold text-[#1A1814]/80 uppercase tracking-wide">
                      Full name
                    </label>
                    <div className={`${inputBase} ${sErrors.name ? inputError : inputNormal}`}>
                      <span className="pl-4 text-[#1E4334]/50"><User className="w-4 h-4" /></span>
                      <input
                        id="signup-name"
                        type="text"
                        autoComplete="name"
                        value={sName}
                        onChange={(e) => {
                          const v = e.target.value;
                          setSName(v);
                          if (sErrors.name) {
                            const err = validateSName(v);
                            setSErrors((p) => ({ ...p, name: err || undefined }));
                          }
                        }}
                        placeholder="Your full name"
                        className="flex-1 min-w-0 min-h-[52px] sm:min-h-[56px] px-3 bg-transparent text-sm text-[#1A1814] placeholder:text-[#1A1814]/35 focus:outline-none"
                      />
                    </div>
                    {sErrors.name && <p className="text-xs text-[#99462A] mt-0.5">{sErrors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="signup-email" className="text-xs font-semibold text-[#1A1814]/80 uppercase tracking-wide">
                      Email address
                    </label>
                    <div className={`${inputBase} ${sErrors.email ? inputError : inputNormal}`}>
                      <span className="pl-4 text-[#1E4334]/50"><Mail className="w-4 h-4" /></span>
                      <input
                        id="signup-email"
                        type="email"
                        autoComplete="email"
                        value={sEmail}
                        onChange={(e) => {
                          const v = e.target.value;
                          setSEmail(v);
                          if (sErrors.email) {
                            const err = validateSEmail(v);
                            setSErrors((p) => ({ ...p, email: err || undefined }));
                          }
                        }}
                        placeholder="you@example.com"
                        className="flex-1 min-w-0 min-h-[52px] sm:min-h-[56px] px-3 bg-transparent text-sm text-[#1A1814] placeholder:text-[#1A1814]/35 focus:outline-none"
                      />
                    </div>
                    {sErrors.email && <p className="text-xs text-[#99462A] mt-0.5">{sErrors.email}</p>}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="signup-password" className="text-xs font-semibold text-[#1A1814]/80 uppercase tracking-wide">
                      Password
                    </label>
                    <div className={`${inputBase} ${sErrors.password ? inputError : inputNormal}`}>
                      <span className="pl-4 text-[#1E4334]/50"><Lock className="w-4 h-4" /></span>
                      <input
                        id="signup-password"
                        type={sShowPw ? "text" : "password"}
                        autoComplete="new-password"
                        value={sPassword}
                        onChange={(e) => {
                          const v = e.target.value;
                          setSPassword(v);
                          if (sErrors.password) {
                            const err = validateSPassword(v);
                            setSErrors((p) => ({ ...p, password: err || undefined }));
                          }
                          if (sErrors.confirmPassword) {
                            const err = validateSConfirm(sConfirm, v);
                            setSErrors((p) => ({ ...p, confirmPassword: err || undefined }));
                          }
                        }}
                        placeholder="Min. 8 chars, letters and numbers"
                        className="flex-1 min-w-0 min-h-[52px] sm:min-h-[56px] px-3 bg-transparent text-sm text-[#1A1814] placeholder:text-[#1A1814]/35 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setSShowPw(!sShowPw)}
                        className="pr-4 text-[#1E4334]/50 hover:text-[#1E4334] transition-colors focus:outline-none shrink-0"
                        aria-label={sShowPw ? "Hide password" : "Show password"}
                      >
                        {sShowPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {/* Strength bar */}
                    {sPassword && (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-1 flex-1">
                          {[1, 2, 3].map((lvl) => (
                            <div
                              key={lvl}
                              className="h-1 flex-1 transition-all duration-300"
                              style={{ backgroundColor: sStrength.level >= lvl ? strengthColors[sStrength.level] : "#E9E5DB" }}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-medium" style={{ color: strengthColors[sStrength.level] || "#1A1814" }}>
                          {sStrength.label}
                        </span>
                      </div>
                    )}
                    {sErrors.password && <p className="text-xs text-[#99462A] mt-0.5">{sErrors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="signup-confirm-password" className="text-xs font-semibold text-[#1A1814]/80 uppercase tracking-wide">
                      Confirm password
                    </label>
                    <div className={`${inputBase} ${sErrors.confirmPassword ? inputError : inputNormal}`}>
                      <span className="pl-4 text-[#1E4334]/50"><Lock className="w-4 h-4" /></span>
                      <input
                        id="signup-confirm-password"
                        type={sShowConfirm ? "text" : "password"}
                        autoComplete="new-password"
                        value={sConfirm}
                        onChange={(e) => {
                          const v = e.target.value;
                          setSConfirm(v);
                          if (sErrors.confirmPassword) {
                            const err = validateSConfirm(v, sPassword);
                            setSErrors((p) => ({ ...p, confirmPassword: err || undefined }));
                          }
                        }}
                        placeholder="Re-enter your password"
                        className="flex-1 min-w-0 min-h-[52px] sm:min-h-[56px] px-3 bg-transparent text-sm text-[#1A1814] placeholder:text-[#1A1814]/35 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setSShowConfirm(!sShowConfirm)}
                        className="pr-4 text-[#1E4334]/50 hover:text-[#1E4334] transition-colors focus:outline-none shrink-0"
                        aria-label={sShowConfirm ? "Hide confirm password" : "Show confirm password"}
                      >
                        {sShowConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {sErrors.confirmPassword && (
                      <p className="text-xs text-[#99462A] mt-0.5">{sErrors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    id="signup-submit-btn"
                    type="submit"
                    disabled={sSubmitting}
                    className="w-full min-h-[52px] sm:min-h-[56px] bg-[#1E4334] text-white font-semibold text-sm tracking-wide hover:bg-[#142F24] active:scale-[0.985] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                  >
                    {sSubmitting ? "Creating account..." : "Create my account"}
                  </button>

                  <p className="text-[11px] text-[#1A1814]/40 text-center leading-relaxed -mt-1">
                    By creating an account you agree to SmritiSetu's care principles and privacy standards.
                  </p>

                  <div className="w-full flex items-center gap-3 mt-1">
                    <div className="flex-1 h-px bg-[#1E4334]/10" />
                    <span className="text-xs text-[#1A1814]/40 font-medium">or</span>
                    <div className="flex-1 h-px bg-[#1E4334]/10" />
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full min-h-[52px] sm:min-h-[56px] border border-[#1E4334]/15 bg-white text-[#1E4334] font-semibold text-sm tracking-wide hover:bg-[#F7F5F0] active:scale-[0.985] transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Trust badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#1A1814]/40">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E4334]/50" />
            <span>Secure. Private. Built for Indian families.</span>
          </div>

        </div>
      </main>
    </div>
  );
}
