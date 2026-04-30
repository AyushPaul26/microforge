"use client";

import React from "react";
import { Truck, ClipboardCheck, Cog, ArrowRight } from "lucide-react";
import Link from "next/link";

interface TrackerItem {
  id: string;
  orderId: string;
  stage: string;
  product: string;
  status: "In Transit" | "Processing" | "Queued";
  progress?: number;
}

const trackerData: TrackerItem[] = [
  {
    id: "1",
    orderId: "#MF-8892",
    stage: "Shipping",
    product: "Custom Aluminum Extrusions (Batch B)",
    status: "In Transit",
    progress: 72,
  },
  {
    id: "2",
    orderId: "#MF-8895",
    stage: "Quality Control",
    product: "Titanium Fasteners Assembly",
    status: "Processing",
  },
  {
    id: "3",
    orderId: "#MF-8901",
    stage: "Assembly",
    product: "Circuit Board Housings",
    status: "Queued",
  },
];

const statusStyles: Record<string, string> = {
  "In Transit": "bg-blue-50 text-blue-600",
  Processing: "bg-amber-50 text-amber-600",
  Queued: "bg-slate-100 text-slate-500",
};

const stageIcons: Record<string, React.ReactNode> = {
  Shipping: <Truck className="h-4 w-4" />,
  "Quality Control": <ClipboardCheck className="h-4 w-4" />,
  Assembly: <Cog className="h-4 w-4" />,
};

const stageIconBg: Record<string, string> = {
  Shipping: "bg-blue-100 text-blue-600 ring-blue-200",
  "Quality Control": "bg-indigo-100 text-indigo-600 ring-indigo-200",
  Assembly: "bg-slate-100 text-slate-500 ring-slate-200",
};

export default function ProductionTracker() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">
          Production Tracker
        </h2>
        <Link
          href="/orders"
          className="flex items-center gap-1 text-sm font-semibold text-primary transition-smooth hover:text-primary-hover"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Stepper List */}
      <div className="mt-6 space-y-0">
        {trackerData.map((item, idx) => (
          <div key={item.id} className="relative flex gap-4">
            {/* Vertical line */}
            {idx < trackerData.length - 1 && (
              <div className="absolute left-[19px] top-[44px] h-[calc(100%-20px)] w-[2px] bg-slate-100" />
            )}

            {/* Icon */}
            <div
              className={`relative z-10 mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ring-4 ${stageIconBg[item.stage]}`}
            >
              {stageIcons[item.stage]}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">
                  Order {item.orderId} – {item.stage}
                </p>
                <span
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold ${statusStyles[item.status]}`}
                >
                  {item.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">{item.product}</p>
              {item.progress && (
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
