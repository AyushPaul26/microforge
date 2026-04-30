"use client";

import React from "react";
import { FileText, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    icon: FileText,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "Draft New RFQ",
    description: "Start a new quote request",
    href: "/rfq/new",
  },
  {
    icon: MessageSquare,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "Message Manufacturer",
    description: "2 unread messages",
    href: "#",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
      <h2 className="text-lg font-bold text-slate-800">Quick Actions</h2>
      <div className="mt-4 space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              href={action.href}
              className="group flex items-center gap-4 rounded-xl p-3 transition-smooth hover:bg-slate-50"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${action.iconColor}`} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-700">
                  {action.title}
                </p>
                <p className="text-xs text-slate-400">{action.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 transition-smooth group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
