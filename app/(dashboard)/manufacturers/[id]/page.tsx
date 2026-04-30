"use client";

import React, { useState } from "react";
import TopBar from "@/components/layout/top-bar";
import {
  MapPin,
  Star,
  CheckCircle,
  Clock,
  Package,
  Wrench,
  Shield,
  MessageSquare,
  ArrowLeft,
  ChevronRight,
  Users,
  Calendar,
  Globe,
} from "lucide-react";
import Link from "next/link";

const manufacturerData = {
  id: "apex-textiles",
  name: "Apex Textiles International",
  location: "Ho Chi Minh City, Vietnam",
  rating: 4.9,
  reviewCount: 127,
  verified: true,
  established: "2008",
  employees: "500-1000",
  responseTime: "< 4 hours",
  description:
    "Apex Textiles International is a leading manufacturer specializing in high-quality knitwear, seamless garments, and sustainable textile production. With over 15 years of experience, we serve fashion brands across North America, Europe, and Asia-Pacific.",
  certifications: ["ISO 9001", "OEKO-TEX Standard 100", "GOTS Certified", "B-Corp"],
  capabilities: [
    "Knitwear Production",
    "Seamless Technology",
    "Sustainable Dyeing",
    "Custom Pattern Making",
    "Small Batch Production",
    "Full-Package Manufacturing",
  ],
  machines: [
    { name: "Santoni SM8-TOP2", type: "Circular Knitting", count: 24 },
    { name: "Stoll CMS ADF 32W", type: "Flat Knitting", count: 12 },
    { name: "Juki DDL-9000C", type: "Sewing", count: 60 },
    { name: "Tonello G1", type: "Finishing / Washing", count: 4 },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=500&fit=crop",
  ],
  minOrder: 150,
  leadTime: "4-6 weeks",
  paymentTerms: "Net 30, T/T, L/C",
};

export default function ManufacturerDetailPage() {
  const mfg = manufacturerData;
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="animate-fade-in">
      <TopBar
        title="Manufacturer Profile"
        subtitle="Review details and request a quote."
      />

      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link
          href="/manufacturers"
          className="flex items-center gap-1 transition-smooth hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Manufacturers
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-slate-700">{mfg.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (2/3) */}
        <div className="space-y-6 lg:col-span-2">
          {/* Image Gallery */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
            <div className="relative h-[340px] overflow-hidden bg-slate-100">
              <div
                className="h-full w-full bg-cover bg-center transition-all duration-500"
                style={{
                  backgroundImage: `url(${mfg.gallery[selectedImage]})`,
                }}
              />
            </div>
            <div className="flex gap-2 p-3">
              {mfg.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`h-16 w-24 overflow-hidden rounded-xl bg-cover bg-center transition-smooth ${
                    idx === selectedImage
                      ? "ring-2 ring-primary ring-offset-2"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
            </div>
          </div>

          {/* About */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-800">
                    {mfg.name}
                  </h2>
                  {mfg.verified && (
                    <CheckCircle
                      className="h-5 w-5 text-primary"
                      strokeWidth={2.2}
                    />
                  )}
                </div>
                <div className="mt-1 flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {mfg.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {mfg.rating} ({mfg.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {mfg.description}
            </p>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Calendar, label: "Est.", value: mfg.established },
                { icon: Users, label: "Employees", value: mfg.employees },
                { icon: Clock, label: "Response", value: mfg.responseTime },
                { icon: Globe, label: "Markets", value: "45+ Countries" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-slate-50 p-3 text-center"
                  >
                    <Icon className="mx-auto h-4 w-4 text-slate-400" />
                    <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                    <p className="text-sm font-bold text-slate-700">
                      {stat.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certifications */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-base font-bold text-slate-800">
                Certifications & Compliance
              </h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {mfg.certifications.map((cert) => (
                <span
                  key={cert}
                  className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Machine List */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="text-base font-bold text-slate-800">
                Machine Inventory
              </h3>
            </div>
            <div className="mt-4 space-y-3">
              {mfg.machines.map((machine) => (
                <div
                  key={machine.name}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      {machine.name}
                    </p>
                    <p className="text-xs text-slate-400">{machine.type}</p>
                  </div>
                  <span className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">
                    ×{machine.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <h3 className="text-base font-bold text-slate-800">
                Capabilities
              </h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {mfg.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sticky Quote Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
              <h3 className="text-base font-bold text-slate-800">
                Request a Quote
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Get a custom quote from this manufacturer.
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600">
                    Product Type
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Custom Knitwear"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">
                    Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="Min. 150 units"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">
                    Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of your requirements..."
                    className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-smooth resize-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              <button className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-smooth hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]">
                Submit Quote Request
              </button>

              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition-smooth hover:border-primary hover:text-primary">
                <MessageSquare className="h-4 w-4" />
                Message Directly
              </button>
            </div>

            {/* Key Details */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
              <h3 className="text-base font-bold text-slate-800">
                Key Details
              </h3>
              <div className="mt-4 space-y-4">
                {[
                  { label: "Minimum Order", value: `${mfg.minOrder} units` },
                  { label: "Lead Time", value: mfg.leadTime },
                  { label: "Payment Terms", value: mfg.paymentTerms },
                ].map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-slate-500">
                      {detail.label}
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
