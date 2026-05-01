"use client";

import React, { useState, useRef } from "react";
import { ChevronDown, ArrowRight, Upload, Check, Calendar, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const steps = [
  { id: 1, label: "Details" },
  { id: 2, label: "Specs" },
  { id: 3, label: "Timeline" },
];

const categories = [
  "Select a category",
  "Apparel Manufacturing",
  "Cosmetics / Personal Care",
  "Food & Beverage",
  "Packaging",
  "Electronics",
  "CNC Machining",
  "Injection Molding",
];

export default function NewRFQPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: "",
    volume: "1000",
    pricePerUnit: "0.00",
    material: "",
    tolerance: "",
    surfaceFinish: "",
    deadline: "",
    deliveryDate: "",
    shippingMethod: "Standard Freight",
    notes: "",
  });

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, "rfqs"), {
          ...formData,
          status: "Queued",
          createdAt: serverTimestamp(),
          manufacturer: "Matching Manufacturer",
        });
        router.push("/orders");
      } catch (error) {
        console.error("Error submitting RFQ: ", error);
        alert("Failed to submit RFQ. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/10";

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Post Requirement</h1>
          <p className="mt-1 text-sm text-slate-500">Define requirements to source manufacturing partners.</p>
        </div>
        <div className="flex items-center gap-0">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-smooth ${step.id === currentStep ? "bg-primary text-white shadow-md shadow-primary/30" : step.id < currentStep ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"}`}>
                  {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <span className={`text-sm font-medium ${step.id === currentStep ? "text-slate-800" : "text-slate-400"}`}>{step.label}</span>
              </div>
              {idx < steps.length - 1 && <div className={`mx-3 h-[2px] w-12 rounded-full ${step.id < currentStep ? "bg-primary" : "bg-slate-200"}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="mt-8 rounded-2xl bg-white p-8 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold text-slate-800">Product Information</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-700">Product Type / Name</label>
                <input type="text" placeholder="e.g. CNC Milled Aluminum Enclosure" value={formData.productName} onChange={(e) => setFormData({ ...formData, productName: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Category</label>
                <div className="relative mt-2">
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/10">
                    {categories.map((c) => (<option key={c} value={c === "Select a category" ? "" : c}>{c}</option>))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold text-slate-700">Description</label>
              <textarea rows={5} placeholder="Briefly describe the product and its primary application..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={inputClass + " resize-none"} />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-700">Quantity</label>
                <input type="number" value={formData.volume} onChange={(e) => setFormData({ ...formData, volume: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Target Price per Unit ($)</label>
                <input type="number" step="0.01" value={formData.pricePerUnit} onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })} className={inputClass} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold text-slate-800">Technical Specifications</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-700">Primary Material</label>
                <input type="text" placeholder="e.g. 6061-T6 Aluminum" value={formData.material} onChange={(e) => setFormData({ ...formData, material: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Tolerance</label>
                <input type="text" placeholder="e.g. ±0.05mm" value={formData.tolerance} onChange={(e) => setFormData({ ...formData, tolerance: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold text-slate-700">Surface Finish</label>
              <input type="text" placeholder="e.g. Anodized, Brushed, Polished" value={formData.surfaceFinish} onChange={(e) => setFormData({ ...formData, surfaceFinish: e.target.value })} className={inputClass} />
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold text-slate-700">Upload Technical Drawings</label>
              <div 
                className="mt-2 flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 transition-smooth hover:border-primary/30 hover:bg-primary/5"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-center">
                  <Upload className={`mx-auto h-10 w-10 ${selectedFile ? 'text-primary' : 'text-slate-300'}`} />
                  {selectedFile ? (
                    <p className="mt-3 text-sm font-semibold text-primary">{selectedFile.name}</p>
                  ) : (
                    <>
                      <p className="mt-3 text-sm font-medium text-slate-600">Drag & drop files here, or <span className="text-primary font-semibold">browse</span></p>
                      <p className="mt-1 text-xs text-slate-400">STEP, IGES, DWG, PDF up to 50MB</p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }} 
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold text-slate-800">Timeline & Delivery</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-700">Quote Deadline</label>
                <div className="relative mt-2">
                  <input type="date" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/10" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Desired Delivery Date</label>
                <div className="relative mt-2">
                  <input type="date" value={formData.deliveryDate} onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/10" />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold text-slate-700">Shipping Method</label>
              <div className="relative mt-2">
                <select value={formData.shippingMethod} onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value })} className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/10">
                  <option>Standard Freight</option>
                  <option>Express Air</option>
                  <option>Sea Freight (FCL)</option>
                  <option>DDP (Delivered Duty Paid)</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold text-slate-700">Additional Notes</label>
              <textarea rows={4} placeholder="Any additional requirements..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className={inputClass + " resize-none"} />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <button onClick={currentStep === 1 ? undefined : handleBack} className={`rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold transition-smooth ${currentStep === 1 ? "text-slate-400 cursor-not-allowed" : "text-slate-600 hover:border-slate-300"}`} disabled={currentStep === 1}>
          {currentStep === 1 ? "Cancel" : "← Back"}
        </button>
        <button onClick={handleNext} disabled={isSubmitting} className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-smooth hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : currentStep === 3 ? (
            "Submit RFQ"
          ) : (
            <>
              Next Step <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
