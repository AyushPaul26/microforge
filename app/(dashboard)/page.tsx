import TopBar from "@/components/layout/top-bar";
import KpiCard from "@/components/dashboard/kpi-card";
import ProductionTracker from "@/components/dashboard/production-tracker";
import QuickActions from "@/components/dashboard/quick-actions";
import ActiveShipments from "@/components/dashboard/active-shipments";
import {
  ClipboardList,
  ShieldCheck,
  DollarSign,
  Crown,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="animate-fade-in">
      <TopBar
        title="Overview"
        subtitle="Welcome back. Here is the current status of your manufacturing operations."
        rightContent={
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 mr-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-soft" />
            <span className="text-xs font-semibold text-emerald-700">
              System Status: Optimal
            </span>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={ClipboardList}
          iconBg="bg-primary/10"
          iconColor="text-primary"
          label="Active Orders"
          value="34"
          trend={{ value: "12%", positive: true }}
        />
        <KpiCard
          icon={ShieldCheck}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          label="Pending Approvals"
          value="7"
          badge="Action Req."
          badgeColor="bg-red-50 text-red-500"
        />
        <KpiCard
          icon={DollarSign}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          label="Total Spend (YTD)"
          value="$1.2M"
        />
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-white to-violet-50 p-5 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)] ring-1 ring-primary/10">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Crown className="h-5 w-5 text-primary" strokeWidth={1.8} />
            </div>
            <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
              Auto-renews Oct
            </span>
          </div>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Subscription Tier
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-800">
            Enterprise Plus
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Production Tracker (2/3 width) */}
        <div className="lg:col-span-2">
          <ProductionTracker />
        </div>

        {/* Side Panel (1/3 width) */}
        <div className="space-y-6">
          <QuickActions />
          <ActiveShipments />
        </div>
      </div>
    </div>
  );
}
