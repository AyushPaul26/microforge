"use client";

import React from "react";
import { Globe, MapPin } from "lucide-react";

export default function ActiveShipments() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 pt-5">
        <Globe className="h-4 w-4 text-slate-400" />
        <h3 className="text-sm font-semibold text-white">Active Shipments</h3>
      </div>

      {/* Map placeholder */}
      <div className="relative mt-3 px-6">
        <svg
          viewBox="0 0 400 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="w-full text-slate-400 opacity-30"
        >
          {/* Simplified world map outlines */}
          <path d="M50,80 Q60,60 80,65 T120,60 Q140,55 150,70 T180,65 Q200,60 210,75" />
          <path d="M220,70 Q240,60 260,65 T290,75 Q300,80 320,70 T360,80" />
          <path d="M80,90 Q100,95 120,85 T160,90 Q180,100 200,95" />
          <path d="M240,85 Q260,90 280,80 T320,90 Q340,95 360,85" />
          <path d="M100,110 Q120,115 140,105 T180,110 Q200,120 220,115" />
          <path d="M260,100 Q280,95 300,100 T340,105" />
          <path d="M120,130 Q140,135 160,125 T200,130" />
          {/* Dots for cities */}
          <circle cx="280" cy="75" r="3" fill="#4F46E5" className="animate-pulse-soft" />
          <circle cx="150" cy="85" r="3" fill="#22c55e" className="animate-pulse-soft" />
          {/* Route line */}
          <path
            d="M280,75 Q250,50 220,60 Q190,70 150,85"
            strokeWidth="1.5"
            stroke="#4F46E5"
            strokeDasharray="4,4"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* ETA Card (Glassmorphism) */}
      <div className="mx-4 mb-4 mt-2 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              ETA: TOMORROW
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              Shenzhen → LAX
            </p>
          </div>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-emerald-400 transition-smooth hover:bg-white/20">
            <MapPin className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
