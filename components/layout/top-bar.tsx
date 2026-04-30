"use client";

import React from "react";
import { Search, Bell, Settings } from "lucide-react";

interface TopBarProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
}

export default function TopBar({ title, subtitle, rightContent }: TopBarProps) {
  return (
    <header className="flex items-start justify-between pb-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {rightContent}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search manufacturers, capabilities..."
            className="h-10 w-[280px] rounded-xl bg-slate-100 pl-10 pr-4 text-sm text-slate-700 placeholder-slate-400 outline-none ring-1 ring-transparent transition-smooth focus:bg-white focus:ring-primary/20 focus:shadow-sm"
          />
        </div>

        {/* Notifications */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-smooth hover:bg-slate-100 hover:text-slate-700">
          <Bell className="h-[18px] w-[18px]" strokeWidth={1.8} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Settings */}
        <button className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-smooth hover:bg-slate-100 hover:text-slate-700">
          <Settings className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </button>

        {/* Avatar */}
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 ring-2 ring-white shadow-sm flex items-center justify-center text-white text-sm font-bold cursor-pointer">
          AP
        </div>
      </div>
    </header>
  );
}
