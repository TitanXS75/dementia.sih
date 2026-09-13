import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, ShieldCheck, BookOpen, SunMedium } from "lucide-react";

interface SignupPageProps {
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
}

type Role = "family" | "asha" | "patient";

const ROLES: { id: Role; label: string; desc: string }[] = [
  { id: "family", label: "Family Member", desc: "Caregiver or relative" },
  { id: "asha", label: "ASHA / Doctor", desc: "Healthcare worker or clinician" },
  { id: "patient", label: "Patient (Elder)", desc: "Individual experiencing memory care" },
];

export default function SignupPage({ onNavigateHome, onNavigateLogin }: SignupPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("family");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // --- Validators ---
  function validateName(val: string) {
    if (!val.trim()) return "Full name is required.";
    if (val.trim().length < 2) return "Name must be at least 2 characters.";
    return "";
  }

  function validateEmail(val: string) {
    if (!val.trim()) return "Email address is required.";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(val)) return "Please enter a valid email address.";
    return "";
  }

  function validatePassword(val: string) {
    if (!val) return "Password is required.";
    if (val.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Za-z]/.test(val)) return "Password must include at least one letter.";
    if (!/[0-9]/.test(val)) return "Password must include at least one number.";
    return "";
  }

  function validateConfirmPassword(val: string, pass: string) {
    if (!val) return "Please confirm your password.";
    if (val !== pass) return "Passwords do not match.";
    return "";
  }

  function validate() {
    const newErrors: typeof errors = {};
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    const confirmErr = validateConfirmPassword(confirmPassword, password);
    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (passErr) newErrors.password = passErr;
    if (confirmErr) newErrors.confirmPassword = confirmErr;
    return newErrors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    // Frontend-only prototype — no backend yet
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  }

  // Inline validation on change
  function onNameChange(val: string) {
    setName(val);
    if (errors.name) {
      const err = validateName(val);
      setErrors((prev) => ({ ...prev, name: err || undefined }));
    }
  }

  function onEmailChange(val: string) {
    setEmail(val);
    if (errors.email) {
      const err = validateEmail(val);
      setErrors((prev) => ({ ...prev, email: err || undefined }));
    }
  }

  function onPasswordChange(val: string) {
    setPassword(val);
    if (errors.password) {
      const err = validatePassword(val);
      setErrors((prev) => ({ ...prev, password: err || undefined }));
    }
    // also re-validate confirm if already touched
    if (errors.confirmPassword) {
      const err = validateConfirmPassword(confirmPassword, val);
      setErrors((prev) => ({ ...prev, confirmPassword: err || undefined }));
    }
  }

  function onConfirmPasswordChange(val: string) {
    setConfirmPassword(val);
    if (errors.confirmPassword) {
      const err = validateConfirmPassword(val, password);
      setErrors((prev) => ({ ...prev, confirmPassword: err || undefined }));
    }
  }

  // Password strength
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

  const strength = getPasswordStrength(password);
  const strengthColors = ["", "#99462A", "#D97706", "#1E4334"];

  const inputBase =
    "flex items-center border bg-[#F7F5F0] transition-colors";
  const inputNormal =
    "border-[#1E4334]/15 focus-within:border-[#1E4334]/50 focus-within:bg-white";
  const inputError =
    "border-[#99462A]/60 bg-[#FBECE7]/40";

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col font-sans selection:bg-[#1E4334] selection:text-[#C8F028]">
      {/* Minimal Top Bar */}
      <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#1E4334]/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-sm font-medium text-[#1A1814]/70 hover:text-[#1E4334] transition-colors focus:outline-none group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </button>
          <span className="font-serif text-xl font-bold text-[#1E4334] tracking-tight">SmritiSetu</span>
          <button
            onClick={onNavigateLogin}
            className="text-sm font-semibold text-[#1E4334] hover:text-[#142F24] transition-colors focus:outline-none underline-offset-2 hover:underline"
          >
            Sign in
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[480px]">

          {/* Icon mark */}
          <div className="mb-8 flex items-center justify-center">
            <div className="w-14 h-14 bg-[#1E4334] flex items-center justify-center">
              <SunMedium className="w-7 h-7 text-[#C8F028]" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#1E4334] leading-tight mb-3">
              Join SmritiSetu
            </h1>
            <p className="text-sm text-[#1A1814]/60 leading-relaxed">
              Create your account and start your family's memory care journey.
            </p>
          </div>

          {/* Success State */}
          {submitted ? (
            <div className="bg-white border border-[#1E4334]/20 p-8 text-center">
              <div className="w-12 h-12 bg-[#1E4334] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-[#C8F028]" />
              </div>
              <h2 className="font-serif text-xl text-[#1E4334] mb-2">Account created</h2>
              <p className="text-sm text-[#1A1814]/60">
                Registration is currently in prototype mode. Backend integration is coming in the next phase.
              </p>
              <button
                onClick={onNavigateLogin}
                className="mt-6 w-full min-h-[56px] bg-[#1E4334] text-white font-semibold text-sm tracking-wide hover:bg-[#142F24] active:scale-[0.985] transition-all focus:outline-none"
              >
                Go to sign in
              </button>
            </div>
          ) : (
            /* Form Card */
            <div className="bg-white border border-[#1E4334]/12 shadow-[0_4px_20px_-2px_rgba(30,67,52,0.06)]">
              <form onSubmit={handleSubmit} noValidate className="p-8 flex flex-col gap-5">

                {/* Role selector */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-[#1A1814]/80 uppercase tracking-wide">
                    I am joining as
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {ROLES.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`min-h-[56px] px-2 py-3 border text-left flex flex-col gap-0.5 transition-colors focus:outline-none ${
                          role === r.id
                            ? "border-[#1E4334] bg-[#1E4334]/5"
                            : "border-[#1E4334]/15 bg-[#F7F5F0] hover:border-[#1E4334]/35"
                        }`}
                        aria-pressed={role === r.id}
                      >
                        <span
                          className={`text-xs font-semibold leading-tight ${
                            role === r.id ? "text-[#1E4334]" : "text-[#1A1814]/70"
                          }`}
                        >
                          {r.label}
                        </span>
                        <span className="text-[10px] text-[#1A1814]/40 leading-tight">{r.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Full name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="signup-name"
                    className="text-xs font-semibold text-[#1A1814]/80 uppercase tracking-wide"
                  >
                    Full name
                  </label>
                  <div className={`${inputBase} ${errors.name ? inputError : inputNormal}`}>
                    <span className="pl-4 text-[#1E4334]/50">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      id="signup-name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => onNameChange(e.target.value)}
                      placeholder="Your full name"
                      className="flex-1 min-h-[56px] px-3 bg-transparent text-sm text-[#1A1814] placeholder:text-[#1A1814]/35 focus:outline-none"
                    />
                  </div>
                  {errors.name && <p className="text-xs text-[#99462A] mt-0.5">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="signup-email"
                    className="text-xs font-semibold text-[#1A1814]/80 uppercase tracking-wide"
                  >
                    Email address
                  </label>
                  <div className={`${inputBase} ${errors.email ? inputError : inputNormal}`}>
                    <span className="pl-4 text-[#1E4334]/50">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      id="signup-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => onEmailChange(e.target.value)}
                      placeholder="you@example.com"
                      className="flex-1 min-h-[56px] px-3 bg-transparent text-sm text-[#1A1814] placeholder:text-[#1A1814]/35 focus:outline-none"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-[#99462A] mt-0.5">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="signup-password"
                    className="text-xs font-semibold text-[#1A1814]/80 uppercase tracking-wide"
                  >
                    Password
                  </label>
                  <div className={`${inputBase} ${errors.password ? inputError : inputNormal}`}>
                    <span className="pl-4 text-[#1E4334]/50">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => onPasswordChange(e.target.value)}
                      placeholder="Min. 8 chars, letters and numbers"
                      className="flex-1 min-h-[56px] px-3 bg-transparent text-sm text-[#1A1814] placeholder:text-[#1A1814]/35 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="pr-4 text-[#1E4334]/50 hover:text-[#1E4334] transition-colors focus:outline-none"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Password strength bar */}
                  {password && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-1 flex-1">
                        {[1, 2, 3].map((lvl) => (
                          <div
                            key={lvl}
                            className="h-1 flex-1 transition-all duration-300"
                            style={{
                              backgroundColor:
                                strength.level >= lvl ? strengthColors[strength.level] : "#E9E5DB",
                            }}
                          />
                        ))}
                      </div>
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: strengthColors[strength.level] || "#1A1814" }}
                      >
                        {strength.label}
                      </span>
                    </div>
                  )}
                  {errors.password && <p className="text-xs text-[#99462A] mt-0.5">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="signup-confirm-password"
                    className="text-xs font-semibold text-[#1A1814]/80 uppercase tracking-wide"
                  >
                    Confirm password
                  </label>
                  <div className={`${inputBase} ${errors.confirmPassword ? inputError : inputNormal}`}>
                    <span className="pl-4 text-[#1E4334]/50">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      id="signup-confirm-password"
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => onConfirmPasswordChange(e.target.value)}
                      placeholder="Re-enter your password"
                      className="flex-1 min-h-[56px] px-3 bg-transparent text-sm text-[#1A1814] placeholder:text-[#1A1814]/35 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="pr-4 text-[#1E4334]/50 hover:text-[#1E4334] transition-colors focus:outline-none"
                      aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-[#99462A] mt-0.5">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  id="signup-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[56px] bg-[#1E4334] text-white font-semibold text-sm tracking-wide hover:bg-[#142F24] active:scale-[0.985] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                >
                  {isSubmitting ? "Creating account..." : "Create my account"}
                </button>

                <p className="text-[11px] text-[#1A1814]/40 text-center leading-relaxed -mt-1">
                  By creating an account you agree to SmritiSetu's care principles and privacy standards.
                </p>
              </form>

              {/* Divider + Switch link */}
              <div className="px-8 pb-8 flex flex-col items-center gap-5">
                <div className="w-full flex items-center gap-3">
                  <div className="flex-1 h-px bg-[#1E4334]/10" />
                  <span className="text-xs text-[#1A1814]/40 font-medium">or</span>
                  <div className="flex-1 h-px bg-[#1E4334]/10" />
                </div>
                <p className="text-sm text-[#1A1814]/60">
                  Already have an account?{" "}
                  <button
                    onClick={onNavigateLogin}
                    className="font-semibold text-[#1E4334] hover:text-[#142F24] underline underline-offset-2 transition-colors focus:outline-none"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          )}

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
