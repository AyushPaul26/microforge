"use client";

import React from "react";
import TopBar from "@/components/layout/top-bar";
import { TrendingUp, IndianRupee, Package, Clock } from "lucide-react";

const monthlyData = [
  { month: "Jan", spend: 85 },
  { month: "Feb", spend: 92 },
  { month: "Mar", spend: 78 },
  { month: "Apr", spend: 110 },
  { month: "May", spend: 95 },
  { month: "Jun", spend: 120 },
  { month: "Jul", spend: 105 },
  { month: "Aug", spend: 130 },
  { month: "Sep", spend: 115 },
  { month: "Oct", spend: 140 },
  { month: "Nov", spend: 125 },
  { month: "Dec", spend: 150 },
];

const maxSpend = Math.max(...monthlyData.map((d) => d.spend));

const topManufacturers = [
  { name: "Apex Textiles International", spend: "₹342,000", pct: 28 },
  { name: "Precision Metals Co", spend: "₹285,000", pct: 24 },
  { name: "Nexus Electronics Corp", spend: "₹198,000", pct: 16 },
  { name: "Zenith Polymers Ltd", spend: "₹156,000", pct: 13 },
  { name: "Others", spend: "₹219,000", pct: 19 },
];

export default function AnalyticsPage() {
  return (
    <div className="animate-fade-in">
      <TopBar title="Analytics" subtitle="Insights into your manufacturing spend and operations." />

      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Spend (YTD)", value: "₹1.2M", icon: IndianRupee, bg: "bg-emerald-50", color: "text-emerald-600", trend: "+18%" },
          { label: "Avg. Order Value", value: "₹17,400", icon: TrendingUp, bg: "bg-primary/10", color: "text-primary", trend: "+5%" },
          { label: "Total Orders", value: "68", icon: Package, bg: "bg-blue-50", color: "text-blue-600", trend: "+12%" },
          { label: "Avg. Lead Time", value: "18 days", icon: Clock, bg: "bg-amber-50", color: "text-amber-600", trend: "-3 days" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl bg-white p-5 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
              <div className="flex items-start justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.bg}`}>
                  <Icon className={`h-5 w-5 ${s.color}`} strokeWidth={1.8} />
                </div>
                <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">{s.trend}</span>
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-800">{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Spend Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
          <h3 className="text-lg font-bold text-slate-800">Monthly Spend</h3>
          <p className="text-sm text-slate-500">Manufacturing spend breakdown by month (in ₹K)</p>
          <div className="mt-6 flex items-end gap-2 h-48">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-lg bg-gradient-to-t from-primary to-violet-400 transition-all duration-300 hover:from-primary-hover hover:to-violet-500" style={{ height: `${(d.spend / maxSpend) * 100}%` }} />
                <span className="text-[10px] font-medium text-slate-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Manufacturers */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
          <h3 className="text-lg font-bold text-slate-800">Top Manufacturers</h3>
          <p className="text-sm text-slate-500">By total spend</p>
          <div className="mt-6 space-y-4">
            {topManufacturers.map((m) => (
              <div key={m.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700 truncate max-w-[160px]">{m.name}</span>
                  <span className="font-semibold text-slate-800">{m.spend}</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-violet-400" style={{ width: `${m.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
