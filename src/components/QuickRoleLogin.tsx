import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Users, Stethoscope, ArrowRight } from "lucide-react";
import { useAuth } from "../lib/useAuth";
import { DEMO_ACCOUNTS, DemoAccount } from "../lib/demoAccounts";

interface QuickRoleLoginProps {
  onSuccess?: () => void;
  layout?: "grid" | "stack";
  compact?: boolean;
}

export default function QuickRoleLogin({
  onSuccess,
  layout = "stack",
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
        return <User className="w-4 h-4 text-[#D97706]" />;
      case "family":
        return <Users className="w-4 h-4 text-[#1B382B]" />;
      case "asha":
        return <Stethoscope className="w-4 h-4 text-[#B24A2B]" />;
      default:
        return <User className="w-4 h-4 text-[#1B382B]" />;
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
      <div className="flex flex-col gap-2">
        {DEMO_ACCOUNTS.map((account) => (
          <button
            key={account.role}
            type="button"
            onClick={() => handleSelectRole(account)}
            className="group w-full flex items-center justify-between p-3 rounded-xl border border-[#1B382B]/12 bg-[#FAF7F2] hover:bg-white hover:border-[#1B382B]/35 hover:shadow-xs transition-all text-left cursor-pointer active:scale-[0.99]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${getRoleIconBg(
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
                    className={`text-[9px] uppercase tracking-wider px-1.5 py-0.2 border rounded-md font-semibold ${getRoleBadgeStyle(
                      account.role
                    )}`}
                  >
                    {account.badge}
                  </span>
                </div>
                <p className="text-[11px] text-[#1F1914]/65 truncate font-sans mt-0.5">
                  <span className="font-medium text-[#1F1914]">{account.name}</span>
                  <span className="text-[#1F1914]/40 mx-1">•</span>
                  <span>{account.subtitle}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 ml-2 text-[10px] font-semibold text-[#1F1914]/40 group-hover:text-[#1B382B] transition-colors">
              <span className="hidden sm:inline">Enter</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
          className="group flex flex-col justify-between p-3.5 rounded-xl border border-[#1B382B]/15 bg-white hover:border-[#1B382B]/40 hover:shadow-sm transition-all text-left cursor-pointer active:scale-[0.99]"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${getRoleIconBg(
                    account.role
                  )}`}
                >
                  {getRoleIcon(account.role)}
                </div>
                <span className="text-xs font-bold text-[#1B382B]">
                  {account.roleLabel}
                </span>
              </div>
              <span
                className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 border rounded-md font-semibold ${getRoleBadgeStyle(
                  account.role
                )}`}
              >
                {account.badge}
              </span>
            </div>

            <p className="text-xs font-medium text-[#1F1914] mb-0.5">
              {account.name}
            </p>
            <p className="text-[10px] text-[#1F1914]/50 mb-2">
              {account.subtitle}
            </p>
            <p className="text-[11px] text-[#1F1914]/75 line-clamp-2 leading-relaxed">
              {account.description}
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-[#1B382B]/8 flex items-center justify-between text-[11px] font-semibold text-[#1B382B] group-hover:text-[#D97706] transition-colors">
            <span>Enter as {account.roleLabel.split(" ")[0]}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      ))}
    </div>
  );
}
