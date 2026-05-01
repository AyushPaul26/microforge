"use client";

import React, { useState } from "react";
import TopBar from "@/components/layout/top-bar";
import FilterPanel from "@/components/manufacturers/filter-panel";
import ManufacturerCard from "@/components/manufacturers/manufacturer-card";
import { ChevronDown, Check } from "lucide-react";

const manufacturers = [
  {
    id: "apex-textiles",
    name: "Apex Textiles International",
    location: "Ho Chi Minh City, VN",
    rating: 4.9,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    tags: ["Apparel Manufacturing", "Knitwear"],
    minOrder: 500,
    unit: "units",
    featured: true,
  },
  {
    id: "nexus-electronics",
    name: "Nexus Electronics Corp",
    location: "Taipei, TW",
    rating: 4.7,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&h=400&fit=crop",
    tags: ["Electronics", "PCB Assembly"],
    minOrder: 500,
    unit: "units",
    featured: true,
  },
  {
    id: "lumina-home",
    name: "Lumina Home Goods",
    location: "Porto, PT",
    rating: 4.9,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop",
    tags: ["Packaging", "Ceramics"],
    minOrder: 500,
    unit: "units",
    featured: true,
  },
  {
    id: "pure-cosmetics",
    name: "Pure Beauty Labs",
    location: "Seoul, KR",
    rating: 4.8,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=400&fit=crop",
    tags: ["Cosmetics / Personal Care", "Skincare"],
    minOrder: 500,
    unit: "units",
    featured: true,
  },
  {
    id: "zenith-polymers",
    name: "Zenith Packaging Ltd",
    location: "Shenzhen, CN",
    rating: 4.6,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&h=400&fit=crop",
    tags: ["Packaging", "Injection Molding"],
    minOrder: 500,
    unit: "units",
    featured: true,
  },
  {
    id: "stellar-foods",
    name: "Stellar Food & Bev",
    location: "Chicago, US",
    rating: 4.5,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop",
    tags: ["Food & Beverage", "Bottling"],
    minOrder: 500,
    unit: "units",
    featured: true,
  },
];

const sortOptions = ["Match Score", "Rating", "MOQ: Low to High", "MOQ: High to Low"];

export default function ManufacturersPage() {
  const [sortBy, setSortBy] = useState("Match Score");
  const [showSort, setShowSort] = useState(false);

  return (
    <div className="animate-fade-in">
      <TopBar
        title="Manufacturers"
        subtitle="Browse and connect with verified manufacturing partners worldwide."
      />

      {/* Hero Section */}
      <div className="mt-4 mb-2 rounded-2xl bg-gradient-to-br from-primary to-violet-600 p-8 text-white shadow-lg relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-32 right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative z-10 max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            From Concept to Reality.
          </h2>
          <p className="mt-4 text-lg font-medium text-white/90 leading-relaxed">
            Microforge connects product designers with manufacturers for fast prototyping and production.
          </p>
          <ul className="mt-8 flex flex-wrap gap-4">
            {[
              "Fast supplier discovery",
              "Instant quote requests",
              "Verified manufacturers",
            ].map((bullet, idx) => (
              <li key={idx} className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm border border-white/10 shadow-sm">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-emerald-900">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </div>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Filter Panel */}
        <div className="lg:col-span-1">
          <FilterPanel />
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {/* Results Header */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-800">{manufacturers.length}</span> verified
              manufacturers
            </p>
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 text-sm text-slate-500 transition-smooth hover:text-slate-700"
              >
                Sort by:{" "}
                <span className="font-semibold text-slate-800">{sortBy}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {showSort && (
                <div className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-xl border border-slate-100 bg-white py-1 shadow-lg">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                        setShowSort(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm transition-smooth hover:bg-slate-50 ${
                        opt === sortBy
                          ? "font-semibold text-primary"
                          : "text-slate-600"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {manufacturers.map((mfg) => (
              <ManufacturerCard key={mfg.id} {...mfg} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
