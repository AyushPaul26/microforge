"use client";

import React from "react";
import TopBar from "@/components/layout/top-bar";
import { Package, AlertTriangle, TrendingUp, Box } from "lucide-react";

const inventoryItems = [
  { sku: "ALU-EXT-6061", name: "6061-T6 Aluminum Extrusions", stock: 2450, unit: "pcs", status: "In Stock", statusColor: "bg-emerald-50 text-emerald-600", reorder: 500 },
  { sku: "TI-FAST-GR5", name: "Grade 5 Titanium Fasteners", stock: 180, unit: "pcs", status: "Low Stock", statusColor: "bg-amber-50 text-amber-600", reorder: 200 },
  { sku: "PCB-HSG-V3", name: "Circuit Board Housings (V3)", stock: 0, unit: "pcs", status: "Out of Stock", statusColor: "bg-red-50 text-red-500", reorder: 300 },
  { sku: "KNT-SML-BLK", name: "Seamless Knit Fabric (Black)", stock: 1200, unit: "m", status: "In Stock", statusColor: "bg-emerald-50 text-emerald-600", reorder: 500 },
  { sku: "INJ-CSG-RC", name: "Injection Molded Casings (Rev C)", stock: 890, unit: "pcs", status: "In Stock", statusColor: "bg-emerald-50 text-emerald-600", reorder: 200 },
  { sku: "CRM-MUG-STD", name: "Ceramic Mugs (Standard White)", stock: 45, unit: "pcs", status: "Low Stock", statusColor: "bg-amber-50 text-amber-600", reorder: 100 },
];

const stats = [
  { label: "Total SKUs", value: "156", icon: Box, bg: "bg-primary/10", color: "text-primary" },
  { label: "Low Stock Alerts", value: "8", icon: AlertTriangle, bg: "bg-amber-50", color: "text-amber-600" },
  { label: "Avg. Turnover", value: "14 days", icon: TrendingUp, bg: "bg-emerald-50", color: "text-emerald-600" },
  { label: "In Transit", value: "12", icon: Package, bg: "bg-blue-50", color: "text-blue-600" },
];

export default function InventoryPage() {
  return (
    <div className="animate-fade-in">
      <TopBar title="Inventory" subtitle="Monitor stock levels across all product lines." />

      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl bg-white p-5 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.bg}`}>
                <Icon className={`h-5 w-5 ${s.color}`} strokeWidth={1.8} />
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-800">{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">SKU</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Product</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Stock</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Status</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Reorder Level</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item) => (
              <tr key={item.sku} className="border-b border-slate-50 transition-smooth hover:bg-slate-50/50">
                <td className="px-6 py-4 text-sm font-bold text-primary">{item.sku}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-700">{item.name}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{item.stock.toLocaleString()} {item.unit}</td>
                <td className="px-6 py-4"><span className={`inline-block rounded-lg px-2.5 py-1 text-[11px] font-semibold ${item.statusColor}`}>{item.status}</span></td>
                <td className="px-6 py-4 text-sm text-slate-400">{item.reorder} {item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
