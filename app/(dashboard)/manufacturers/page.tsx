"use client";

import React, { useState } from "react";
import TopBar from "@/components/layout/top-bar";
import FilterPanel from "@/components/manufacturers/filter-panel";
import ManufacturerCard from "@/components/manufacturers/manufacturer-card";
import { ChevronDown } from "lucide-react";

const manufacturers = [
  {
    id: "apex-textiles",
    name: "Apex Textiles International",
    location: "Ho Chi Minh City, VN",
    rating: 4.9,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    tags: ["Knitwear", "Seamless", "Sustainable"],
    minOrder: 150,
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
    tags: ["PCB Assembly", "Injection Molding"],
    minOrder: 500,
    unit: "units",
    featured: true,
  },
  {
    id: "lumina-home",
    name: "Lumina Home Goods",
    location: "Porto, PT",
    rating: 4.9,
    verified: false,
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop",
    tags: ["Ceramics", "Glassware", "Packaging"],
    minOrder: 50,
    unit: "units",
    featured: false,
  },
  {
    id: "precision-metals",
    name: "Precision Metals Co",
    location: "Stuttgart, DE",
    rating: 4.8,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop",
    tags: ["CNC Machining", "Aluminum", "Titanium"],
    minOrder: 100,
    unit: "units",
    featured: true,
  },
  {
    id: "zenith-polymers",
    name: "Zenith Polymers Ltd",
    location: "Shenzhen, CN",
    rating: 4.6,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&h=400&fit=crop",
    tags: ["3D Printing", "Injection Molding", "Prototyping"],
    minOrder: 25,
    unit: "units",
    featured: true,
  },
  {
    id: "stellar-fabrics",
    name: "Stellar Fabrics Group",
    location: "Dhaka, BD",
    rating: 4.5,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop",
    tags: ["Denim", "Cotton", "Dyeing"],
    minOrder: 300,
    unit: "units",
    featured: false,
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

      <div className="mt-2 grid grid-cols-1 gap-6 lg:grid-cols-4">
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
              <span className="font-bold text-slate-800">124</span> verified
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
