import React from "react";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  badge?: string;
  badgeColor?: string;
}

export default function KpiCard({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  trend,
  badge,
  badgeColor,
}: KpiCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)] transition-smooth card-hover">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={1.8} />
        </div>
        {trend && (
          <span
            className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${
              trend.positive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            {trend.positive ? "↗" : "↘"} {trend.value}
          </span>
        )}
        {badge && (
          <span
            className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold ${
              badgeColor || "bg-amber-50 text-amber-600"
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );
}
