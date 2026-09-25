import { useNavigate } from "react-router-dom";
import { User, Users, Stethoscope } from "lucide-react";
import { useAuth } from "../lib/useAuth";
import { DEMO_ACCOUNTS, DemoAccount } from "../lib/demoAccounts";

interface QuickRoleLoginProps {
  onSuccess?: () => void;
  layout?: "grid" | "stack";
  compact?: boolean;
}

export default function QuickRoleLogin({
  onSuccess,
  layout = "grid",
  compact = false,
}: QuickRoleLoginProps) {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSelectRole = (account: DemoAccount) => {
    authLogin({
      name: account.name,
      email: account.email,
      role: account.role,
      language: account.language,
    });
    if (onSuccess) onSuccess();
    navigate("/app/home");
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "patient":
        return <User className="w-3.5 h-3.5 text-[#D97706]" />;
      case "family":
        return <Users className="w-3.5 h-3.5 text-[#1B382B]" />;
      case "asha":
        return <Stethoscope className="w-3.5 h-3.5 text-[#B24A2B]" />;
      default:
        return <User className="w-3.5 h-3.5 text-[#1B382B]" />;
    }
  };

  const getRoleIconBg = (role: string) => {
    switch (role) {
      case "patient":
        return "bg-[#FEF3C7] border-[#D97706]/20";
      case "family":
        return "bg-[#EAF0EC] border-[#1B382B]/20";
      case "asha":
        return "bg-[#FBECE7] border-[#B24A2B]/20";
      default:
        return "bg-white border-[#1B382B]/10";
    }
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "patient":
        return "bg-[#D97706]/10 text-[#D97706] border-[#D97706]/25";
      case "family":
        return "bg-[#1B382B]/10 text-[#1B382B] border-[#1B382B]/25";
      case "asha":
        return "bg-[#B24A2B]/10 text-[#B24A2B] border-[#B24A2B]/25";
      default:
        return "bg-[#1B382B]/10 text-[#1B382B] border-[#1B382B]/25";
    }
  };

  if (compact) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {DEMO_ACCOUNTS.map((account) => (
          <button
            key={account.role}
            type="button"
            onClick={() => handleSelectRole(account)}
            className="group flex flex-col items-center justify-between p-2 rounded-xl border border-[#1B382B]/15 bg-[#FAF7F2] hover:bg-white hover:border-[#1B382B]/40 hover:shadow-xs transition-all text-center cursor-pointer active:scale-95"
          >
            <div
              className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 mb-1 group-hover:scale-105 transition-transform ${getRoleIconBg(
                account.role
              )}`}
            >
              {getRoleIcon(account.role)}
            </div>

            <div className="w-full min-w-0">
              <span className="text-[11px] font-bold text-[#1B382B] leading-tight block truncate">
                {account.role === "patient"
                  ? "Elder Patient"
                  : account.role === "family"
                    ? "Caregiver"
                    : "Clinician / ASHA"}
              </span>
              <span
                className={`text-[8px] uppercase tracking-wider px-1 py-0.2 border rounded font-semibold inline-block mt-0.5 ${getRoleBadgeStyle(
                  account.role
                )}`}
              >
                {account.badge}
              </span>
              <p className="text-[9px] text-[#1F1914]/55 truncate mt-0.5">
                {account.name.split(" ")[0]}
              </p>
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={
        layout === "grid"
          ? "grid grid-cols-1 sm:grid-cols-3 gap-2.5"
          : "flex flex-col gap-2.5"
      }
    >
      {DEMO_ACCOUNTS.map((account) => (
        <button
          key={account.role}
          type="button"
          onClick={() => handleSelectRole(account)}
          className="group flex items-center justify-between p-3 rounded-xl border border-[#1B382B]/15 bg-[#FAF7F2] hover:bg-white hover:border-[#1B382B]/40 hover:shadow-xs transition-all text-left cursor-pointer active:scale-[0.99]"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${getRoleIconBg(
                account.role
              )}`}
            >
              {getRoleIcon(account.role)}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1B382B] truncate">
                  {account.roleLabel}
                </span>
                <span
                  className={`text-[9px] uppercase tracking-wider px-1.5 py-0.2 border rounded font-semibold shrink-0 ${getRoleBadgeStyle(
                    account.role
                  )}`}
                >
                  {account.badge}
                </span>
              </div>
              <p className="text-[11px] text-[#1F1914]/65 truncate">
                {account.name}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
