"use client";

import React, { useState } from "react";
import { RotateCcw, ChevronDown } from "lucide-react";

const categories = [
  { label: "Apparel & Textiles", checked: true },
  { label: "Tech & Electronics", checked: false },
  { label: "Home & Furniture", checked: false },
];

const materials = ["All Materials", "Aluminum", "Steel", "Plastic", "Titanium", "Carbon Fiber"];

const certifications = [
  { label: "ISO 9001", active: true },
  { label: "B-Corp", active: false },
  { label: "OEKO-TEX", active: false },
];

export default function FilterPanel() {
  const [selectedCategories, setSelectedCategories] = useState(
    categories.map((c) => c.checked)
  );
  const [selectedMaterial, setSelectedMaterial] = useState("All Materials");
  const [moqRange, setMoqRange] = useState(50);
  const [activeCerts, setActiveCerts] = useState(
    certifications.map((c) => c.active)
  );

  const handleCategoryToggle = (idx: number) => {
    const updated = [...selectedCategories];
    updated[idx] = !updated[idx];
    setSelectedCategories(updated);
  };

  const handleCertToggle = (idx: number) => {
    const updated = [...activeCerts];
    updated[idx] = !updated[idx];
    setActiveCerts(updated);
  };

  const handleReset = () => {
    setSelectedCategories(categories.map(() => false));
    setSelectedMaterial("All Materials");
    setMoqRange(50);
    setActiveCerts(certifications.map(() => false));
  };

  return (
    <div className="sticky top-8 rounded-2xl bg-white p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">Filters</h2>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs font-semibold text-primary uppercase tracking-wider transition-smooth hover:text-primary-hover"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      {/* Category */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-700">Category</h3>
        <div className="mt-3 space-y-3">
          {categories.map((cat, idx) => (
            <label
              key={cat.label}
              className="flex cursor-pointer items-center gap-3 group"
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-smooth ${
                  selectedCategories[idx]
                    ? "border-primary bg-primary"
                    : "border-slate-300 group-hover:border-slate-400"
                }`}
                onClick={() => handleCategoryToggle(idx)}
              >
                {selectedCategories[idx] && (
                  <svg
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-slate-600">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Primary Material */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-700">
          Primary Material
        </h3>
        <div className="relative mt-3">
          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            {materials.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* MOQ Slider */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">
            Minimum Order (MOQ)
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {moqRange} – 500+
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={500}
          value={moqRange}
          onChange={(e) => setMoqRange(Number(e.target.value))}
          className="mt-3 w-full"
        />
      </div>

      {/* Certifications */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-700">Certifications</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {certifications.map((cert, idx) => (
            <button
              key={cert.label}
              onClick={() => handleCertToggle(idx)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-smooth ${
                activeCerts[idx]
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
              }`}
            >
              {cert.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
