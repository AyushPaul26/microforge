"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Factory,
  ShoppingCart,
  Package,
  BarChart3,
  Plus,
  HelpCircle,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Manufacturers", href: "/", icon: Factory },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "Inventory", href: "/inventory", icon: Package },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-full w-[220px] flex-col border-r border-slate-100 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-lg shadow-md shadow-primary/20">
          M
        </div>
        <div>
          <h1 className="text-[15px] font-bold text-slate-800 leading-tight">
            MicroForge
          </h1>
          <p className="text-[11px] text-slate-400 font-medium">
            Enterprise Portal
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-2 flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-smooth ${
                    active
                      ? "bg-primary/8 text-primary"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.2 : 1.8} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* New RFQ Button */}
      <div className="px-4 pb-3">
        <Link
          href="/rfq/new"
          className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-smooth hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Post Requirement
        </Link>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 px-3 py-3">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-smooth hover:bg-slate-50 hover:text-slate-700">
          <HelpCircle className="h-[18px] w-[18px]" strokeWidth={1.8} />
          Help Center
        </button>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-smooth hover:bg-slate-50 hover:text-red-500">
          <LogOut className="h-[18px] w-[18px]" strokeWidth={1.8} />
          Logout
        </button>
      </div>
    </aside>
  );
}
