import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, ShieldCheck, BookOpen } from "lucide-react";

interface LoginPageProps {
  onNavigateHome: () => void;
  onNavigateSignup: () => void;
}

export default function LoginPage({ onNavigateHome, onNavigateSignup }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validateEmail(val: string) {
    if (!val.trim()) return "Email address is required.";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(val)) return "Please enter a valid email address.";
    return "";
  }

  function validatePassword(val: string) {
    if (!val) return "Password is required.";
    return "";
  }

  function validate() {
    const newErrors: typeof errors = {};
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    if (emailErr) newErrors.email = emailErr;
    if (passErr) newErrors.password = passErr;
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

  function handleEmailChange(val: string) {
    setEmail(val);
    if (errors.email) {
      const err = validateEmail(val);
      setErrors((prev) => ({ ...prev, email: err || undefined }));
    }
  }

  function handlePasswordChange(val: string) {
    setPassword(val);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: val ? undefined : "Password is required." }));
    }
  }

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
            onClick={onNavigateSignup}
            className="text-sm font-semibold text-[#1E4334] hover:text-[#142F24] transition-colors focus:outline-none underline-offset-2 hover:underline"
          >
            Create account
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[440px]">

          {/* Icon mark */}
          <div className="mb-8 flex items-center justify-center">
            <div className="w-14 h-14 bg-[#1E4334] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-[#C8F028]" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#1E4334] leading-tight mb-3">
              Welcome back
            </h1>
            <p className="text-sm text-[#1A1814]/60 leading-relaxed">
              Sign in to continue supporting your loved one's care journey.
            </p>
          </div>

          {/* Success State */}
          {submitted ? (
            <div className="bg-white border border-[#1E4334]/20 p-8 text-center">
              <div className="w-12 h-12 bg-[#1E4334] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-[#C8F028]" />
              </div>
              <h2 className="font-serif text-xl text-[#1E4334] mb-2">Signed in successfully</h2>
              <p className="text-sm text-[#1A1814]/60">
                Authentication is currently in prototype mode. Backend integration is coming in the next phase.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm font-semibold text-[#1E4334] underline underline-offset-2 hover:text-[#142F24] transition-colors focus:outline-none"
              >
                Back to sign in
              </button>
            </div>
          ) : (
            /* Form Card */
            <div className="bg-white border border-[#1E4334]/12 shadow-[0_4px_20px_-2px_rgba(30,67,52,0.06)]">
              <form onSubmit={handleSubmit} noValidate className="p-8 flex flex-col gap-5">

                {/* Global error */}
                {errors.form && (
                  <div className="border border-[#99462A]/30 bg-[#FBECE7] px-4 py-3 text-sm text-[#99462A] flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{errors.form}</span>
                  </div>
                )}

                {/* Email field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="login-email"
                    className="text-xs font-semibold text-[#1A1814]/80 uppercase tracking-wide"
                  >
                    Email address
                  </label>
                  <div
                    className={`flex items-center border bg-[#F7F5F0] transition-colors ${
                      errors.email
                        ? "border-[#99462A]/60 bg-[#FBECE7]/40"
                        : "border-[#1E4334]/15 focus-within:border-[#1E4334]/50 focus-within:bg-white"
                    }`}
                  >
                    <span className="pl-4 text-[#1E4334]/50">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      placeholder="you@example.com"
                      className="flex-1 min-h-[56px] px-3 bg-transparent text-sm text-[#1A1814] placeholder:text-[#1A1814]/35 focus:outline-none"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-[#99462A] mt-0.5">{errors.email}</p>
                  )}
                </div>

                {/* Password field */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="login-password"
                      className="text-xs font-semibold text-[#1A1814]/80 uppercase tracking-wide"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs text-[#1E4334] font-medium hover:underline underline-offset-2 focus:outline-none"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div
                    className={`flex items-center border bg-[#F7F5F0] transition-colors ${
                      errors.password
                        ? "border-[#99462A]/60 bg-[#FBECE7]/40"
                        : "border-[#1E4334]/15 focus-within:border-[#1E4334]/50 focus-within:bg-white"
                    }`}
                  >
                    <span className="pl-4 text-[#1E4334]/50">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      placeholder="Enter your password"
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
                  {errors.password && (
                    <p className="text-xs text-[#99462A] mt-0.5">{errors.password}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  id="login-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[56px] bg-[#1E4334] text-white font-semibold text-sm tracking-wide hover:bg-[#142F24] active:scale-[0.985] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                >
                  {isSubmitting ? "Signing in..." : "Sign in to SmritiSetu"}
                </button>

              </form>

              {/* Divider + Switch link */}
              <div className="px-8 pb-8 flex flex-col items-center gap-5">
                <div className="w-full flex items-center gap-3">
                  <div className="flex-1 h-px bg-[#1E4334]/10" />
                  <span className="text-xs text-[#1A1814]/40 font-medium">or</span>
                  <div className="flex-1 h-px bg-[#1E4334]/10" />
                </div>
                <p className="text-sm text-[#1A1814]/60">
                  New to SmritiSetu?{" "}
                  <button
                    onClick={onNavigateSignup}
                    className="font-semibold text-[#1E4334] hover:text-[#142F24] underline underline-offset-2 transition-colors focus:outline-none"
                  >
                    Create an account
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
