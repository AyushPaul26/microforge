"use client";

import React, { useState, useEffect } from "react";
import TopBar from "@/components/layout/top-bar";
import { Eye, MoreHorizontal, Search, Filter, Loader2 } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const dummyOrders = [
  { id: "MF-8892", manufacturer: "Apex Textiles International", product: "Custom Aluminum Extrusions (Batch B)", status: "In Transit", statusColor: "bg-blue-50 text-blue-600", value: "$24,500", date: "2026-04-15" },
  { id: "MF-8895", manufacturer: "Nexus Electronics Corp", product: "Titanium Fasteners Assembly", status: "Processing", statusColor: "bg-amber-50 text-amber-600", value: "$18,200", date: "2026-04-12" },
  { id: "MF-8901", manufacturer: "Precision Metals Co", product: "Circuit Board Housings", status: "Queued", statusColor: "bg-slate-100 text-slate-500", value: "$31,750", date: "2026-04-10" },
  { id: "MF-8876", manufacturer: "Zenith Polymers Ltd", product: "Injection Molded Casings (Rev C)", status: "Delivered", statusColor: "bg-emerald-50 text-emerald-600", value: "$12,800", date: "2026-04-05" },
  { id: "MF-8864", manufacturer: "Stellar Fabrics Group", product: "Cotton Blend Fabric Rolls", status: "Delivered", statusColor: "bg-emerald-50 text-emerald-600", value: "$9,400", date: "2026-03-28" },
  { id: "MF-8852", manufacturer: "Lumina Home Goods", product: "Ceramic Mug Set (500 pcs)", status: "Delivered", statusColor: "bg-emerald-50 text-emerald-600", value: "$6,250", date: "2026-03-20" },
  { id: "MF-8840", manufacturer: "Apex Textiles International", product: "Seamless Activewear Batch", status: "Cancelled", statusColor: "bg-red-50 text-red-500", value: "$15,300", date: "2026-03-15" },
  { id: "MF-8831", manufacturer: "Precision Metals Co", product: "Aluminum Heat Sinks (1000 pcs)", status: "Delivered", statusColor: "bg-emerald-50 text-emerald-600", value: "$22,100", date: "2026-03-10" },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<any[]>(dummyOrders);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const q = query(collection(db, "rfqs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const fetchedOrders = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const dateStr = data.createdAt ? new Date(data.createdAt.seconds * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
          
          return {
            id: `MF-${doc.id.substring(0, 4).toUpperCase()}`,
            manufacturer: data.manufacturer || "Pending",
            product: data.productName || "Unnamed Product",
            status: data.status || "Queued",
            statusColor: "bg-slate-100 text-slate-500", // Default style for new
            value: `$${(Number(data.volume) * Number(data.pricePerUnit)).toLocaleString()}`,
            date: dateStr
          };
        });

        // Combine fetched orders with dummy orders so the screen isn't empty
        setOrders([...fetchedOrders, ...dummyOrders]);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const filtered = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <TopBar title="Orders" subtitle="Track and manage all your manufacturing orders." />

      {/* Toolbar */}
      <div className="mt-2 flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search orders..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-10 w-[300px] rounded-xl bg-white pl-10 pr-4 text-sm text-slate-700 placeholder-slate-400 outline-none ring-1 ring-slate-200 transition-smooth focus:ring-primary/30" />
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-smooth hover:border-slate-300">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Order ID</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Manufacturer</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Product</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Status</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Value</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Date</th>
              <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, idx) => (
              <tr key={order.id} className={`border-b border-slate-50 transition-smooth hover:bg-slate-50/50 ${idx % 2 === 0 ? "" : ""}`}>
                <td className="px-6 py-4 text-sm font-bold text-primary">{order.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-700">{order.manufacturer}</td>
                <td className="px-6 py-4 text-sm text-slate-500 max-w-[200px] truncate">{order.product}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block rounded-lg px-2.5 py-1 text-[11px] font-semibold ${order.statusColor}`}>{order.status}</span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-700">{order.value}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{order.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-smooth hover:bg-slate-100 hover:text-primary">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-smooth hover:bg-slate-100 hover:text-slate-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Table Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-sm text-slate-400">Showing {filtered.length} of {orders.length} orders</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((p) => (
              <button key={p} className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-smooth ${p === 1 ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-100"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
