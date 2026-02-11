"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import {
  ArrowLeftIcon,
  SparklesIcon,
  ShieldCheckIcon,
  TagIcon,
  CurrencyRupeeIcon,
  PhotoIcon,
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

// Crackers Categories (matching backend validation)
const crackerCategories = [
  { id: "ground-crackers", name: "Ground Crackers" },
  { id: "aerial-crackers", name: "Aerial Crackers" },
  { id: "sparklers", name: "Sparklers" },
  { id: "sound-crackers", name: "Sound Crackers" },
  { id: "fancy-crackers", name: "Fancy Crackers" },
  { id: "gift-boxes", name: "Gift Boxes" },
];

// Sound levels based on Supreme Court regulations (Max 125 dB at 4 meters)
const soundLevels = [
  { id: "Silent", name: "Silent / Visual Only (0 dB)" },
  { id: "Low", name: "Low - Kids Safe (< 90 dB)" },
  { id: "Medium", name: "Medium (90-110 dB)" },
  { id: "High", name: "High (110-125 dB - Legal Limit)" },
  { id: "Very High", name: "Very High (125 dB - Maximum Allowed)" },
];

// Green Cracker Types (CSIR-NEERI Approved)
const greenCrackerTypes = [
  { id: "SWAS", name: "SWAS (Safe Water Releaser)" },
  { id: "STAR", name: "STAR (Safe Thermite Cracker)" },
  { id: "SAFAL", name: "SAFAL (Safe Minimal Aluminium)" },
  { id: "Other", name: "Other Green Cracker" },
  { id: "N/A", name: "Not Applicable" },
];

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  sku: string; // Auto-generated SKU based on category
  brand: string;

  // Pricing
  purchasePrice: string;
  sellingPrice: string;
  mrp: string;
  gstPercentage: string;

  // Inventory
  stock: string;
  lowStockThreshold: string;
  unit: string; // e.g., Box, Pkt, Pcs

  // Compliance & Safety (Tamil Nadu Rules)
  isGreenCracker: boolean;
  greenCrackerType: string; // SWAS, STAR, SAFAL
  bariumFree: boolean;
  pesoLicenseNo: string;
  batchNumber: string;
  manufacturingDate: string;
  contentWeight: string; // Net Explosive Content (NEC)
  noiseLevel: string; // Actual dB measurement
  ageRestriction: boolean;
  safetyInstructions: string;

  // Cracker Specs
  soundLevel: string;
  piecesPerPack: string; // e.g., "5 Pcs" or "10 Pcs"
  safetyDistance: string; // e.g., "5 Meters"
  duration: string; // e.g., "30 Seconds"
  effects: string; // e.g., "Red and Green Stars"

  image: File | null;
}

export function AddProductForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    category: "",
    sku: "",
    brand: "",
    purchasePrice: "",
    sellingPrice: "",
    mrp: "",
    gstPercentage: "18", // Standard for crackers often 18%
    stock: "",
    lowStockThreshold: "10",
    unit: "Box",
    soundLevel: "",
    piecesPerPack: "",
    safetyDistance: "5 Meters",
    duration: "",
    effects: "",
    image: null,

    // Compliance Defaults
    isGreenCracker: true,
    greenCrackerType: "SWAS",
    bariumFree: true,
    pesoLicenseNo: "",
    batchNumber: "",
    manufacturingDate: new Date().toISOString().split("T")[0], // Default to today
    contentWeight: "",
    noiseLevel: "",
    ageRestriction: true,
    safetyInstructions:
      "Use only under adult supervision. For outdoor use only. maintain safe distance.",
  });

  // Generate SKU based on category
  const generateSKU = (category: string): string => {
    const prefixes: Record<string, string> = {
      "ground-crackers": "GC",
      "aerial-crackers": "AC",
      sparklers: "SP",
      "sound-crackers": "SC",
      "fancy-crackers": "FC",
      "gift-boxes": "GB",
    };

    const prefix = prefixes[category] || "XX";
    const randomNum = Math.floor(Math.random() * 9000) + 1001; // 1001-9999
    return `${prefix}-${randomNum}`;
  };

  // Calculate stock status for preview
  const getStockStatus = () => {
    const stockQty = parseInt(formData.stock) || 0;
    const threshold = parseInt(formData.lowStockThreshold) || 10;

    if (stockQty === 0) {
      return { label: "Out of Stock", color: "red" };
    } else if (stockQty < threshold) {
      return { label: "Low Stock", color: "yellow" };
    } else {
      return { label: "In Stock", color: "green" };
    }
  };

  const generateBatchNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const random = Math.floor(Math.random() * 9000) + 1000;
    const batch = `BN-${year}${month}${day}-${random}`;
    setFormData((prev) => ({
      ...prev,
      batchNumber: batch,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    // Handle checkboxes correctly
    const finalValue =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  // Handle category change with auto SKU generation
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setFormData((prev) => ({
      ...prev,
      category,
      sku: category ? generateSKU(category) : "", // Auto-generate SKU
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();

      // Append fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image") return;

        if (typeof value === "boolean") {
          submitData.append(key, value ? "true" : "false");
        } else if (value !== "" && value !== null && value !== undefined) {
          submitData.append(key, value as string);
        }
      });

      // Append image if exists
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You must be logged in to add products");
      }

      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submitData,
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (data.errors && Array.isArray(data.errors)) {
          throw new Error(data.errors.join("\n"));
        }
        throw new Error(data.error || "Failed to create product");
      }

      alert("Product added successfully!");
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error instanceof Error ? error.message : "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                Add New Product
              </h1>
              <p className="text-xs text-gray-500">
                Skyspark Inventory Management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Details */}
            <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TagIcon className="h-5 w-5 text-primary" />
                  Product Details
                </CardTitle>
                <CardDescription>
                  Basic information about the cracker item.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. 1000 Wala / Red Fort Giant"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white text-gray-900 border-gray-300"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleCategoryChange}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                      required
                    >
                      <option value="">Select Category</option>
                      {crackerCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="brand">Brand / Brand Name</Label>
                    <Input
                      id="brand"
                      name="brand"
                      placeholder="e.g. Standard, Sony, Cock etc."
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="bg-white text-gray-900 border-gray-300"
                    />
                  </div>
                </div>

                {/* SKU Field - Auto-generated */}
                {formData.sku && (
                  <div className="grid gap-2">
                    <Label htmlFor="sku">
                      SKU Code
                      <span className="text-xs text-gray-500 ml-2 font-normal">
                        (Auto-generated)
                      </span>
                    </Label>
                    <Input
                      id="sku"
                      name="sku"
                      placeholder="e.g. GC-1001"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="bg-white text-gray-900 border-gray-300 font-mono"
                    />
                    <p className="text-xs text-gray-500">
                      Auto-generated based on category. You can override if
                      needed.
                    </p>
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the visual effects, sound, and what makes this special..."
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-white text-gray-900 border-gray-300"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Compliance & Safety (Tamil Nadu Rules) */}
            <Card className="bg-white text-gray-900 border-gray-200 shadow-sm border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <ClipboardDocumentCheckIcon className="h-5 w-5" />
                  Compliance & Safety
                </CardTitle>
                <CardDescription>
                  Mandatory fields for Tamil Nadu Govt & Supreme Court
                  Directives.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Barium Free Check */}
                  <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <input
                      type="checkbox"
                      id="bariumFree"
                      name="bariumFree"
                      checked={formData.bariumFree}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 mt-1"
                    />
                    <div className="space-y-1 leading-none">
                      <Label
                        htmlFor="bariumFree"
                        className="cursor-pointer font-medium"
                      >
                        No Barium Nitrate
                      </Label>
                      <p className="text-xs text-gray-500">
                        Confirm this product is free from banned chemicals like
                        Barium, Arsenic, Mercury, Lead.
                      </p>
                    </div>
                  </div>

                  {/* Green Cracker Check */}
                  <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-green-50/50">
                    <input
                      type="checkbox"
                      id="isGreenCracker"
                      name="isGreenCracker"
                      checked={formData.isGreenCracker}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 mt-1"
                    />
                    <div className="space-y-1 leading-none">
                      <Label
                        htmlFor="isGreenCracker"
                        className="cursor-pointer font-medium flex items-center gap-1"
                      >
                        <CheckBadgeIcon className="h-4 w-4 text-green-600" />
                        Green Cracker Certified
                      </Label>
                      <p className="text-xs text-gray-500">
                        Product meets CSIR-NEERI & PESO green cracker norms.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Green Cracker Type - Show only if Green Cracker is checked */}
                {formData.isGreenCracker && (
                  <div className="grid gap-2 bg-green-50/30 p-4 rounded-lg border border-green-200">
                    <Label
                      htmlFor="greenCrackerType"
                      className="text-green-800 font-semibold"
                    >
                      Green Cracker Type (CSIR-NEERI Approved) *
                    </Label>
                    <select
                      id="greenCrackerType"
                      name="greenCrackerType"
                      value={formData.greenCrackerType}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-green-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-green-500 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                      required={formData.isGreenCracker}
                    >
                      {greenCrackerTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-green-700">
                      <strong>SWAS:</strong> Safe Water Releaser |{" "}
                      <strong>STAR:</strong> Safe Thermite Cracker |{" "}
                      <strong>SAFAL:</strong> Safe Minimal Aluminium
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="pesoLicenseNo">PESO License Number</Label>
                    <Input
                      id="pesoLicenseNo"
                      name="pesoLicenseNo"
                      placeholder="e.g. E/HQ/TN/22/..."
                      value={formData.pesoLicenseNo}
                      onChange={handleInputChange}
                      className="bg-white text-gray-900 border-gray-300"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contentWeight">
                      Net Explosive Content (NEC)
                    </Label>
                    <Input
                      id="contentWeight"
                      name="contentWeight"
                      placeholder="e.g. 15g per piece"
                      value={formData.contentWeight}
                      onChange={handleInputChange}
                      className="bg-white text-gray-900 border-gray-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="noiseLevel"
                      className="flex items-center gap-2"
                    >
                      Noise Level (dB)
                      <span className="text-xs text-red-600 font-normal">
                        Max: 125 dB (SC Order)
                      </span>
                    </Label>
                    <Input
                      id="noiseLevel"
                      name="noiseLevel"
                      type="number"
                      max="125"
                      placeholder="e.g. 110 dB at 4 meters"
                      value={formData.noiseLevel}
                      onChange={handleInputChange}
                      className="bg-white text-gray-900 border-gray-300"
                    />
                    <p className="text-xs text-gray-500">
                      Measured at 4 meters distance. Supreme Court limit: 125
                      dB(AI) or 145 dB(C)pk
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="batchNumber"
                      className="flex items-center gap-2"
                    >
                      Batch Number
                      <span className="text-xs text-gray-400 font-normal">
                        (Auto-generate or manual)
                      </span>
                    </Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <TagIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          id="batchNumber"
                          name="batchNumber"
                          placeholder="e.g. B-2024-001"
                          value={formData.batchNumber}
                          onChange={handleInputChange}
                          className="bg-white text-gray-900 border-gray-300 pl-9"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generateBatchNumber}
                        className="shrink-0"
                      >
                        Generate
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 invisible md:visible">
                      &nbsp;
                    </p>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="manufacturingDate">Manufacturing Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white border-gray-300 text-gray-900",
                          !formData.manufacturingDate &&
                            "text-muted-foreground",
                        )}
                      >
                        <CalendarDaysIcon className="mr-2 h-4 w-4 text-gray-500" />
                        {formData.manufacturingDate ? (
                          format(new Date(formData.manufacturingDate), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          formData.manufacturingDate
                            ? new Date(formData.manufacturingDate)
                            : undefined
                        }
                        onSelect={(date) => {
                          if (date) {
                            // Adjust for local timezone to keep YYYY-MM-DD correct
                            const offset = date.getTimezoneOffset();
                            const localDate = new Date(
                              date.getTime() - offset * 60 * 1000,
                            );
                            const dateString = localDate
                              .toISOString()
                              .split("T")[0];
                            setFormData((prev) => ({
                              ...prev,
                              manufacturingDate: dateString,
                            }));
                          }
                        }}
                        initialFocus
                        className="bg-white border text-gray-900"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>

            {/* Cracker Specifications */}
            <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5 text-secondary" />
                  Specifications
                </CardTitle>
                <CardDescription>
                  Detailed specs for customers to understand the product.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="piecesPerPack">Pieces per Pack/Box *</Label>
                    <Input
                      id="piecesPerPack"
                      name="piecesPerPack"
                      placeholder="e.g. 5 Pcs / 10 Pcs"
                      value={formData.piecesPerPack}
                      onChange={handleInputChange}
                      className="bg-white text-gray-900 border-gray-300"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="soundLevel">Sound Level</Label>
                    <select
                      id="soundLevel"
                      name="soundLevel"
                      value={formData.soundLevel}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    >
                      <option value="">Select Level</option>
                      {soundLevels.map((lvl) => (
                        <option key={lvl.id} value={lvl.id}>
                          {lvl.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="effects">Visual Effects</Label>
                  <Input
                    id="effects"
                    name="effects"
                    placeholder="e.g. Golden stars with crackling finish"
                    value={formData.effects}
                    onChange={handleInputChange}
                    className="bg-white text-gray-900 border-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Approx Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      placeholder="e.g. 45 Seconds"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="bg-white text-gray-900 border-gray-300"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="safetyDistance"
                      className="flex items-center gap-1"
                    >
                      <ShieldCheckIcon className="h-4 w-4" /> Safety Distance
                    </Label>
                    <Input
                      id="safetyDistance"
                      name="safetyDistance"
                      placeholder="e.g. 5 Meters"
                      value={formData.safetyDistance}
                      onChange={handleInputChange}
                      className="bg-white text-gray-900 border-gray-300"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="safetyInstructions">
                    Safety Instructions
                  </Label>
                  <Textarea
                    id="safetyInstructions"
                    name="safetyInstructions"
                    placeholder="Specific safety instructions for this cracker..."
                    rows={2}
                    value={formData.safetyInstructions}
                    onChange={handleInputChange}
                    className="bg-white text-gray-900 border-gray-300"
                  />
                </div>

                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    id="ageRestriction"
                    name="ageRestriction"
                    checked={formData.ageRestriction}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <Label
                    htmlFor="ageRestriction"
                    className="text-sm font-medium text-red-600 flex items-center gap-1"
                  >
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    Strictly 18+ Only (Enforce Age Verification)
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Pricing & Image */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CurrencyRupeeIcon className="h-5 w-5 text-green-600" />
                  Pricing & Stocks
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="mrp">MRP (₹)</Label>
                  <Input
                    id="mrp"
                    name="mrp"
                    type="number"
                    placeholder="0.00"
                    value={formData.mrp}
                    onChange={handleInputChange}
                    className="bg-white text-gray-900 border-gray-300"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sellingPrice">Selling Price (₹) *</Label>
                  <Input
                    id="sellingPrice"
                    name="sellingPrice"
                    type="number"
                    placeholder="0.00"
                    className="font-bold bg-white text-gray-900 border-gray-300"
                    value={formData.sellingPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    placeholder="100"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="bg-white text-gray-900 border-gray-300"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="lowStockThreshold">
                    Low Stock Alert Threshold
                    <span className="text-xs text-gray-500 ml-2 font-normal">
                      (Alert when below)
                    </span>
                  </Label>
                  <Input
                    id="lowStockThreshold"
                    name="lowStockThreshold"
                    type="number"
                    min="0"
                    placeholder="e.g. 10"
                    value={formData.lowStockThreshold}
                    onChange={handleInputChange}
                    className="bg-white text-gray-900 border-gray-300"
                  />
                  <p className="text-xs text-gray-500">
                    You&apos;ll be alerted when stock quantity goes below this
                    number
                  </p>
                </div>

                {/* Stock Status Preview */}
                {formData.stock && (
                  <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Current Status:
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          getStockStatus().color === "green"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : getStockStatus().color === "yellow"
                              ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                      >
                        ● {getStockStatus().label}
                      </span>
                    </div>
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="stock">Unit *</Label>
                  <select
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                  >
                    <option value="Box">Box</option>
                    <option value="Pkt">Packet (Pkt)</option>
                    <option value="Pcs">Piece (Pcs)</option>
                    <option value="Set">Set</option>
                    <option value="Case">Case</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PhotoIcon className="h-5 w-5" />
                  Product Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center text-center hover:bg-gray-50 transition-colors">
                  {formData.image ? (
                    <div className="text-sm">
                      <p className="font-medium text-primary">
                        {formData.image.name}
                      </p>
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        className="text-red-500 h-auto p-0 mt-2"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, image: null }))
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <PhotoIcon className="h-10 w-10 text-gray-300 mb-2" />
                      <Label htmlFor="image" className="cursor-pointer">
                        <span className="text-primary font-medium hover:underline">
                          Upload a file
                        </span>
                        <span className="text-gray-500"> or drag and drop</span>
                      </Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <p className="text-xs text-gray-400 mt-2">
                        PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
