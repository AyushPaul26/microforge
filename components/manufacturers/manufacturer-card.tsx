"use client";

import React from "react";
import { MapPin, CheckCircle, Star, MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface ManufacturerCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  verified: boolean;
  image: string;
  tags: string[];
  minOrder: number;
  unit: string;
  featured?: boolean;
}

export default function ManufacturerCard({
  id,
  name,
  location,
  rating,
  verified,
  image,
  tags,
  minOrder,
  featured = true,
}: ManufacturerCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.03)] transition-smooth card-hover">
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
        {/* Rating Badge */}
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 backdrop-blur-sm shadow-sm">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-slate-700">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-800 leading-snug">
                {name}
              </h3>
              {verified && (
                <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" strokeWidth={2.2} />
              )}
            </div>
            <div className="mt-1 flex items-center gap-1 text-slate-400">
              <MapPin className="h-3 w-3" />
              <span className="text-xs">{location}</span>
            </div>
          </div>
          <button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-smooth hover:bg-slate-100 hover:text-slate-600">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Min. Order
            </p>
            <p className="text-lg font-bold text-slate-800">
              {minOrder}{" "}
              <span className="text-xs font-medium text-slate-400">units</span>
            </p>
          </div>
          {featured ? (
            <Link
              href={`/manufacturers/${id}`}
              className="rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-primary/20 transition-smooth hover:bg-primary-hover hover:shadow-md hover:shadow-primary/30 active:scale-[0.97]"
            >
              Contact for Bid
            </Link>
          ) : (
            <Link
              href={`/manufacturers/${id}`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition-smooth hover:border-primary hover:text-primary active:scale-[0.97]"
            >
              View Profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
