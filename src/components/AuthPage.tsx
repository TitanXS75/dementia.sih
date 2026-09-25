import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  Home,
  Sparkles,
} from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider, isFirebaseConfigured } from "../firebase";
import { useAuth } from "../lib/useAuth";
import QuickRoleLogin from "./QuickRoleLogin";

type AuthMode = "login" | "signup";
type Role = "family" | "asha" | "patient";

const ROLES: { id: Role; label: string; desc: string }[] = [
  { id: "family", label: "Family Member", desc: "Caregiver or relative" },
  { id: "asha", label: "ASHA / Clinician", desc: "Healthcare worker" },
  { id: "patient", label: "Elder Patient", desc: "Bedside memory care" },
];

interface AuthPageProps {
  initialMode?: AuthMode;
  onNavigateHome: () => void;
}

/* ─────────────────────────────────────────── shared styles ── */
const inputBase = "flex items-center border bg-[#FAF7F2] transition-colors rounded-xl overflow-hidden";
const inputNormal =
  "border-[#1B382B]/20 focus-within:border-[#1B382B] focus-within:bg-white";
const inputError = "border-[#B24A2B]/70 bg-[#FBECE7]/40";

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
const strengthColors = ["", "#B24A2B", "#D97706", "#1B382B"];

export default function AuthPage({ initialMode = "login", onNavigateHome }: AuthPageProps) {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);

  function switchMode(next: AuthMode) {
    setMode(next);
    window.history.replaceState(null, "", next === "login" ? "#login" : "#signup");
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
    if (!v.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email.";
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
    if (Object.keys(errs).length > 0) {
      setLErrors(errs);
      return;
    }
    setLErrors({});
    setLSubmitting(true);
    setTimeout(() => {
      setLSubmitting(false);
      setLSubmitted(true);
      // Save user session and redirect to interior app
      authLogin({
        name: lEmail.split("@")[0],
        email: lEmail,
        role: "patient",
        language: "en",
      });
      navigate("/app/home");
    }, 700);
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
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    form?: string;
  }>({});
  const [sSubmitting, setSSubmitting] = useState(false);
  const [sSubmitted, setSSubmitted] = useState(false);

  function resetSignup() {
    setSName("");
    setSEmail("");
    setSPassword("");
    setSConfirm("");
    setSRole("family");
    setSShowPw(false);
    setSShowConfirm(false);
    setSErrors({});
    setSSubmitting(false);
    setSSubmitted(false);
  }

  function validateSName(v: string) {
    if (!v.trim()) return "Full name is required.";
    if (v.trim().length < 2) return "At least 2 characters.";
    return "";
  }
  function validateSEmail(v: string) {
    if (!v.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email.";
    return "";
  }
  function validateSPassword(v: string) {
    if (!v) return "Password is required.";
    if (v.length < 8) return "At least 8 characters.";
    return "";
  }
  function validateSConfirm(v: string, pass: string) {
    if (!v) return "Confirm your password.";
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
    if (Object.keys(errs).length > 0) {
      setSErrors(errs);
      return;
    }
    setSErrors({});
    setSSubmitting(true);
    setTimeout(() => {
      setSSubmitting(false);
      setSSubmitted(true);
      // Save user session and redirect to interior app
      authLogin({
        name: sName || sEmail.split("@")[0],
        email: sEmail,
        role: sRole,
        language: "en",
      });
      navigate("/app/home");
    }, 700);
  }

  const sStrength = getPasswordStrength(sPassword);

  async function handleGoogleSignIn() {
    try {
      if (!isFirebaseConfigured || !auth || !googleProvider || !db) {
        console.info("SmritiSetu: Local demo mode active (Firebase unconfigured).");
        authLogin({
          name: mode === "signup" ? (sName || "Guest") : (lEmail ? lEmail.split("@")[0] : "Guest"),
          email: mode === "signup" ? sEmail : lEmail || "guest@demo.local",
          role: mode === "signup" ? sRole : "patient",
          language: "en",
        });
        navigate("/app/home");
        return;
      }

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
          createdAt: new Date().toISOString(),
        });
      }

      // Save user session from Firebase and redirect
      authLogin({
        name: user.displayName || "User",
        email: user.email || "",
        role: mode === "signup" ? sRole : "patient",
        language: "en",
        avatar: user.photoURL || undefined,
      });
      navigate("/app/home");
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

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const isLogin = mode === "login";

  return (
    <div className="h-screen w-full bg-[#FAF7F2] flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden font-sans selection:bg-[#1B382B] selection:text-[#FAF7F2]">

      {/* ── Left Column: Atmospheric Heritage & Clinical Reassurance (Minimal, uncluttered) ── */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-between p-8 xl:p-12 relative bg-[#12241C] text-[#FAF7F2] overflow-hidden">
        {/* Background Authentic Documentary Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/indian_family_album.jpg"
            alt="Authentic Indian family memory archive"
            className="w-full h-full object-cover rounded-none opacity-25 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12241C] via-[#12241C]/85 to-[#12241C]/80" />
        </div>

        {/* Content on top */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F2]">SmritiSetu</span>
            <span className="block text-[11px] text-[#E58A18] tracking-widest uppercase font-medium mt-0.5">
              স্মৃতিসেতু • Dementia Care Ecosystem
            </span>
          </div>
          <button
            onClick={onNavigateHome}
            aria-label="Return to Home"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-[#FAF7F2]/20 hover:bg-[#FAF7F2]/10 transition-colors text-[#FAF7F2] cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-[#FAF7F2]" />
            <span>Home</span>
          </button>
        </div>

        <div className="relative z-10 my-auto py-8 max-w-lg">
          <h2 className="font-serif text-3xl xl:text-4xl text-[#FAF7F2] leading-snug font-normal">
            Gentle cognitive reminiscence rooted in Northeast Indian family love.
          </h2>

          <p className="text-sm text-[#FAF7F2]/75 leading-relaxed mt-4">
            Restoring comfort, familiar voices, and emotional calm.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-xs text-[#FAF7F2]/60">
          <ShieldCheck className="w-4 h-4 text-[#E58A18]" />
          <span>ABDM &amp; FHIR Compliant Architecture • Reminiscence Therapy Protocol</span>
        </div>
      </div>

      {/* ── Right Column: Compact 1-View Form on Desktop ── */}
      <div className="w-full lg:w-7/12 xl:w-1/2 flex flex-col justify-between p-4 sm:p-6 lg:p-8 xl:p-10 h-full overflow-y-auto lg:overflow-hidden bg-[#FAF7F2]">

        {/* Mobile Header: Website Name (Top Left) & Home Button with Home Icon (Top Right) */}
        <div className="lg:hidden flex items-center justify-between pb-3 border-b border-[#1B382B]/10 shrink-0">
          <span className="font-serif text-lg font-bold text-[#1B382B] tracking-tight">
            SmritiSetu<span className="text-[#E58A18]">.</span>
          </span>
          <button
            onClick={onNavigateHome}
            aria-label="Return to Home"
            title="Return to Home"
            className="w-8 h-8 rounded-full flex items-center justify-center border border-[#1B382B]/15 text-[#1B382B] hover:bg-[#1B382B]/5 active:scale-95 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* Vertically Centered 1-View Form Card Container */}
        <div className="max-w-[430px] w-full mx-auto my-auto flex flex-col justify-center py-2">

          {/* Form Header */}
          <div className="mb-3.5 text-center sm:text-left">
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1B382B] leading-tight">
              {isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-xs text-[#1F1914]/65 mt-0.5 leading-normal">
              {isLogin
                ? "Sign in to continue supporting your loved one."
                : "Join families and healthcare workers in Assam & Northeast India."}
            </p>
          </div>

          {/* Quick Demo Access (1-Click Login for All Roles) */}
          <div className="mb-4 bg-white border border-[#1B382B]/15 p-3.5 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between mb-2.5 px-0.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E58A18]" />
                <span className="text-[11px] font-bold text-[#1B382B] uppercase tracking-wider">
                  Quick Role Access
                </span>
              </div>
              <span className="text-[10px] text-[#1B382B] bg-[#1B382B]/5 px-2 py-0.5 rounded font-semibold">
                Instant 1-Click Browse
              </span>
            </div>
            <QuickRoleLogin compact={true} />
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-px bg-[#1B382B]/10" />
            <span className="text-[10px] text-[#1F1914]/40 uppercase tracking-widest font-semibold">
              or sign in with credentials
            </span>
            <div className="flex-1 h-px bg-[#1B382B]/10" />
          </div>

          {/* Mode Switcher Tab (Compact & Rounded) */}
          <div
            className="flex p-1 border border-[#1B382B]/15 bg-[#FAF7F2] rounded-xl mb-3 overflow-hidden shrink-0"
            role="tablist"
            aria-label="Authentication mode"
          >
            <button
              id="auth-tab-login"
              role="tab"
              aria-selected={isLogin}
              onClick={() => switchMode("login")}
              className={`flex-1 py-2 text-xs font-semibold tracking-wide rounded-lg transition-all ${
                isLogin
                  ? "bg-[#1B382B] text-white shadow-xs"
                  : "text-[#1F1914]/65 hover:text-[#1B382B] hover:bg-[#1B382B]/5"
              }`}
            >
              Sign in
            </button>
            <button
              id="auth-tab-signup"
              role="tab"
              aria-selected={!isLogin}
              onClick={() => switchMode("signup")}
              className={`flex-1 py-2 text-xs font-semibold tracking-wide rounded-lg transition-all ${
                !isLogin
                  ? "bg-[#1B382B] text-white shadow-xs"
                  : "text-[#1F1914]/65 hover:text-[#1B382B] hover:bg-[#1B382B]/5"
              }`}
            >
              Create account
            </button>
          </div>

          {/* Form Card Content */}
          <div className="bg-white border border-[#1B382B]/15 p-4 sm:p-5 shadow-sm rounded-2xl">

            {/* Success States */}
            {isLogin && lSubmitted ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-[#1B382B] rounded-full flex items-center justify-center mx-auto mb-2.5">
                  <CheckCircle2 className="w-6 h-6 text-[#E58A18]" />
                </div>
                <h2 className="font-serif text-lg text-[#1B382B] mb-1">Signed in successfully</h2>
                <p className="text-xs text-[#1F1914]/65 mb-4">
                  Welcome to SmritiSetu. Your session is now verified.
                </p>
                <button
                  onClick={onNavigateHome}
                  className="w-full h-10 bg-[#1B382B] hover:bg-[#12241C] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer rounded-xl"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : !isLogin && sSubmitted ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-[#1B382B] rounded-full flex items-center justify-center mx-auto mb-2.5">
                  <BookOpen className="w-6 h-6 text-[#E58A18]" />
                </div>
                <h2 className="font-serif text-lg text-[#1B382B] mb-1">Account created</h2>
                <p className="text-xs text-[#1F1914]/65 mb-4">
                  Your family memory space has been initialized.
                </p>
                <button
                  onClick={() => switchMode("login")}
                  className="w-full h-10 bg-[#1B382B] hover:bg-[#12241C] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer rounded-xl"
                >
                  Go to sign in
                </button>
              </div>
            ) : isLogin ? (
              /* ════════ LOGIN FORM (Fits easily in 1 view) ════════ */
              <form onSubmit={handleLoginSubmit} noValidate className="flex flex-col gap-2.5">
                {lErrors.form && (
                  <div className="border border-[#B24A2B]/40 bg-[#FBECE7] px-3 py-2 text-xs text-[#B24A2B] flex items-center gap-1.5 rounded-xl">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>{lErrors.form}</span>
                  </div>
                )}

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="login-email" className="text-[11px] font-semibold text-[#1F1914]/80 uppercase tracking-wider">
                    Email address
                  </label>
                  <div className={`${inputBase} ${lErrors.email ? inputError : inputNormal}`}>
                    <span className="pl-3 text-[#1B382B]/60"><Mail className="w-4 h-4" /></span>
                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      value={lEmail}
                      onChange={(e) => {
                        setLEmail(e.target.value);
                        if (lErrors.email) setLErrors((p) => ({ ...p, email: undefined }));
                      }}
                      placeholder="caregiver@smritisetu.org"
                      className="flex-1 min-w-0 h-10 px-2.5 bg-transparent text-xs sm:text-sm text-[#1F1914] placeholder:text-[#1F1914]/35 focus:outline-none"
                    />
                  </div>
                  {lErrors.email && <p className="text-[10px] text-[#B24A2B]">{lErrors.email}</p>}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="login-password" className="text-[11px] font-semibold text-[#1F1914]/80 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert("Password reset link will be sent to your registered email.")}
                      className="text-[11px] text-[#1B382B] font-medium hover:underline focus:outline-none cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className={`${inputBase} ${lErrors.password ? inputError : inputNormal}`}>
                    <span className="pl-3 text-[#1B382B]/60"><Lock className="w-4 h-4" /></span>
                    <input
                      id="login-password"
                      type={lShowPw ? "text" : "password"}
                      autoComplete="current-password"
                      value={lPassword}
                      onChange={(e) => {
                        setLPassword(e.target.value);
                        if (lErrors.password) setLErrors((p) => ({ ...p, password: undefined }));
                      }}
                      placeholder="Enter your password"
                      className="flex-1 min-w-0 h-10 px-2.5 bg-transparent text-xs sm:text-sm text-[#1F1914] placeholder:text-[#1F1914]/35 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setLShowPw(!lShowPw)}
                      className="pr-3 text-[#1B382B]/50 hover:text-[#1B382B] focus:outline-none shrink-0 cursor-pointer"
                      aria-label={lShowPw ? "Hide password" : "Show password"}
                    >
                      {lShowPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {lErrors.password && <p className="text-[10px] text-[#B24A2B]">{lErrors.password}</p>}
                </div>

                {/* Submit button */}
                <button
                  id="login-submit-btn"
                  type="submit"
                  disabled={lSubmitting}
                  className="w-full h-10 bg-[#1B382B] hover:bg-[#12241C] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm disabled:opacity-60 cursor-pointer mt-1 rounded-xl"
                >
                  {lSubmitting ? "Signing in..." : "Sign in"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-2 my-0.5">
                  <div className="flex-1 h-px bg-[#1B382B]/10" />
                  <span className="text-[10px] text-[#1F1914]/40 uppercase tracking-widest font-semibold">or</span>
                  <div className="flex-1 h-px bg-[#1B382B]/10" />
                </div>

                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full h-10 border border-[#1B382B]/20 bg-[#FAF7F2] hover:bg-white text-[#1B382B] font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-xl"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </form>
            ) : (
              /* ════════ SIGNUP FORM (2-column layout to fit 1 view) ════════ */
              <form onSubmit={handleSignupSubmit} noValidate className="flex flex-col gap-2.5">
                {sErrors.form && (
                  <div className="border border-[#B24A2B]/40 bg-[#FBECE7] px-3 py-1.5 text-xs text-[#B24A2B] flex items-center gap-1.5 rounded-xl">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>{sErrors.form}</span>
                  </div>
                )}

                {/* Role selection tabs */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-[#1F1914]/75 uppercase tracking-wider">
                    I am joining as:
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {ROLES.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSRole(r.id)}
                        className={`py-1.5 px-2 border rounded-xl text-center transition-all focus:outline-none cursor-pointer ${
                          sRole === r.id
                            ? "border-[#1B382B] bg-[#1B382B] text-white shadow-xs"
                            : "border-[#1B382B]/20 bg-[#FAF7F2] text-[#1F1914]/80 hover:border-[#1B382B]/40"
                        }`}
                        aria-pressed={sRole === r.id}
                      >
                        <span className="text-[11px] font-semibold block truncate leading-tight">
                          {r.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2-Column: Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="signup-name" className="text-[10px] font-semibold text-[#1F1914]/80 uppercase tracking-wider">
                      Full Name
                    </label>
                    <div className={`${inputBase} ${sErrors.name ? inputError : inputNormal}`}>
                      <span className="pl-2.5 text-[#1B382B]/60"><User className="w-3.5 h-3.5" /></span>
                      <input
                        id="signup-name"
                        type="text"
                        autoComplete="name"
                        value={sName}
                        onChange={(e) => {
                          setSName(e.target.value);
                          if (sErrors.name) setSErrors((p) => ({ ...p, name: undefined }));
                        }}
                        placeholder="Ramesh Sharma"
                        className="flex-1 min-w-0 h-9 px-2 bg-transparent text-xs text-[#1F1914] placeholder:text-[#1F1914]/35 focus:outline-none"
                      />
                    </div>
                    {sErrors.name && <p className="text-[10px] text-[#B24A2B]">{sErrors.name}</p>}
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="signup-email" className="text-[10px] font-semibold text-[#1F1914]/80 uppercase tracking-wider">
                      Email address
                    </label>
                    <div className={`${inputBase} ${sErrors.email ? inputError : inputNormal}`}>
                      <span className="pl-2.5 text-[#1B382B]/60"><Mail className="w-3.5 h-3.5" /></span>
                      <input
                        id="signup-email"
                        type="email"
                        autoComplete="email"
                        value={sEmail}
                        onChange={(e) => {
                          setSEmail(e.target.value);
                          if (sErrors.email) setSErrors((p) => ({ ...p, email: undefined }));
                        }}
                        placeholder="you@email.com"
                        className="flex-1 min-w-0 h-9 px-2 bg-transparent text-xs text-[#1F1914] placeholder:text-[#1F1914]/35 focus:outline-none"
                      />
                    </div>
                    {sErrors.email && <p className="text-[10px] text-[#B24A2B]">{sErrors.email}</p>}
                  </div>
                </div>

                {/* 2-Column: Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="signup-password" className="text-[10px] font-semibold text-[#1F1914]/80 uppercase tracking-wider">
                      Password
                    </label>
                    <div className={`${inputBase} ${sErrors.password ? inputError : inputNormal}`}>
                      <span className="pl-2.5 text-[#1B382B]/60"><Lock className="w-3.5 h-3.5" /></span>
                      <input
                        id="signup-password"
                        type={sShowPw ? "text" : "password"}
                        autoComplete="new-password"
                        value={sPassword}
                        onChange={(e) => {
                          setSPassword(e.target.value);
                          if (sErrors.password) setSErrors((p) => ({ ...p, password: undefined }));
                        }}
                        placeholder="Min. 8 chars"
                        className="flex-1 min-w-0 h-9 px-2 bg-transparent text-xs text-[#1F1914] placeholder:text-[#1F1914]/35 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setSShowPw(!sShowPw)}
                        className="pr-2 text-[#1B382B]/50 hover:text-[#1B382B] focus:outline-none shrink-0 cursor-pointer"
                        aria-label={sShowPw ? "Hide password" : "Show password"}
                      >
                        {sShowPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {sErrors.password && <p className="text-[10px] text-[#B24A2B]">{sErrors.password}</p>}
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="signup-confirm" className="text-[10px] font-semibold text-[#1F1914]/80 uppercase tracking-wider">
                      Confirm
                    </label>
                    <div className={`${inputBase} ${sErrors.confirmPassword ? inputError : inputNormal}`}>
                      <span className="pl-2.5 text-[#1B382B]/60"><Lock className="w-3.5 h-3.5" /></span>
                      <input
                        id="signup-confirm"
                        type={sShowConfirm ? "text" : "password"}
                        autoComplete="new-password"
                        value={sConfirm}
                        onChange={(e) => {
                          setSConfirm(e.target.value);
                          if (sErrors.confirmPassword) setSErrors((p) => ({ ...p, confirmPassword: undefined }));
                        }}
                        placeholder="Re-enter password"
                        className="flex-1 min-w-0 h-9 px-2 bg-transparent text-xs text-[#1F1914] placeholder:text-[#1F1914]/35 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setSShowConfirm(!sShowConfirm)}
                        className="pr-2 text-[#1B382B]/50 hover:text-[#1B382B] focus:outline-none shrink-0 cursor-pointer"
                        aria-label={sShowConfirm ? "Hide confirm password" : "Show confirm password"}
                      >
                        {sShowConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {sErrors.confirmPassword && <p className="text-[10px] text-[#B24A2B]">{sErrors.confirmPassword}</p>}
                  </div>
                </div>

                {/* Password strength bar */}
                {sPassword && (
                  <div className="flex items-center gap-1.5 -mt-1">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3].map((lvl) => (
                        <div
                          key={lvl}
                          className="h-1.5 flex-1 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor:
                              sStrength.level >= lvl ? strengthColors[sStrength.level] : "#E9E5DB",
                          }}
                        />
                      ))}
                    </div>
                    <span
                      className="text-[10px] font-medium"
                      style={{ color: strengthColors[sStrength.level] || "#1F1914" }}
                    >
                      {sStrength.label}
                    </span>
                  </div>
                )}

                {/* Submit */}
                <button
                  id="signup-submit-btn"
                  type="submit"
                  disabled={sSubmitting}
                  className="w-full h-10 bg-[#1B382B] hover:bg-[#12241C] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm disabled:opacity-60 cursor-pointer mt-0.5 rounded-xl"
                >
                  {sSubmitting ? "Creating account..." : "Create account"}
                </button>

                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full h-9 border border-[#1B382B]/20 bg-[#FAF7F2] hover:bg-white text-[#1B382B] font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-xl"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Sign up with Google</span>
                </button>
              </form>
            )}
          </div>

          {/* Micro Trust footnote */}
          <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-[#1F1914]/50">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1B382B]" />
            <span>Secure. Private. Built for Northeast Indian families.</span>
          </div>
        </div>

        {/* Bottom spacing / alignment anchor */}
        <div className="shrink-0 h-2" />
      </div>
    </div>
  );
}
