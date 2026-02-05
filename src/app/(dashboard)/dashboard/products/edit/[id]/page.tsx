"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
import {
  ArrowLeftIcon,
  SparklesIcon,
  ShieldCheckIcon,
  TagIcon,
  CurrencyRupeeIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { productService } from "@/services/productService";

// Crackers Categories (matching backend validation)
const crackerCategories = [
  { id: "ground-crackers", name: "Ground Crackers" },
  { id: "aerial-crackers", name: "Aerial Crackers" },
  { id: "sparklers", name: "Sparklers" },
  { id: "sound-crackers", name: "Sound Crackers" },
  { id: "fancy-crackers", name: "Fancy Crackers" },
  { id: "gift-boxes", name: "Gift Boxes" },
];

const soundLevels = [
  { id: "Silent", name: "Silent / Visual Only" },
  { id: "Low", name: "Low (Kids Safe)" },
  { id: "Medium", name: "Medium" },
  { id: "High", name: "High (Loud)" },
  { id: "Very High", name: "Very High (Extra Loud)" },
];

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  brand: string;

  // Pricing
  purchasePrice: string;
  sellingPrice: string;
  mrp: string;
  gstPercentage: string;

  // Inventory
  stock: string;
  unit: string;

  // Cracker Specs
  soundLevel: string;
  piecesPerPack: string;
  safetyDistance: string;
  duration: string;
  effects: string;

  image: File | null;
  currentImageUrl?: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    category: "",
    brand: "",
    purchasePrice: "",
    sellingPrice: "",
    mrp: "",
    gstPercentage: "18",
    stock: "",
    unit: "Box",
    soundLevel: "",
    piecesPerPack: "",
    safetyDistance: "5 Meters",
    duration: "",
    effects: "",
    image: null,
    currentImageUrl: "",
  });

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await productService.getProduct(productId);
      if (response.success) {
        const product = response.data;
        setFormData({
          name: product.name || "",
          description: product.description || "",
          category: product.category || "",
          brand: product.brand || "",
          purchasePrice: product.purchasePrice?.toString() || "",
          sellingPrice: product.sellingPrice?.toString() || "",
          mrp: product.mrp?.toString() || "",
          gstPercentage: product.gstPercentage?.toString() || "18",
          stock: product.stock?.toString() || "",
          unit: product.unit || "Box",
          soundLevel: product.soundLevel || "",
          piecesPerPack: product.piecesPerPack || "",
          safetyDistance: product.safetyDistance || "5 Meters",
          duration: product.duration || "",
          effects: product.effects || "",
          image: null,
          currentImageUrl: product.image || "",
        });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Failed to load product details");
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      const updateData: any = {};

      // Add all fields to update data
      if (formData.name) updateData.name = formData.name;
      if (formData.description) updateData.description = formData.description;
      if (formData.category) updateData.category = formData.category;
      if (formData.brand) updateData.brand = formData.brand;
      
      if (formData.sellingPrice) updateData.sellingPrice = parseFloat(formData.sellingPrice);
      if (formData.purchasePrice) updateData.purchasePrice = parseFloat(formData.purchasePrice);
      if (formData.mrp) updateData.mrp = parseFloat(formData.mrp);
      if (formData.gstPercentage) updateData.gstPercentage = parseFloat(formData.gstPercentage);
      
      if (formData.stock) updateData.stock = parseInt(formData.stock);
      if (formData.unit) updateData.unit = formData.unit;
      
      if (formData.soundLevel) updateData.soundLevel = formData.soundLevel;
      if (formData.piecesPerPack) updateData.piecesPerPack = formData.piecesPerPack;
      if (formData.safetyDistance) updateData.safetyDistance = formData.safetyDistance;
      if (formData.duration) updateData.duration = formData.duration;
      if (formData.effects) updateData.effects = formData.effects;
      
      if (formData.image) updateData.image = formData.image;

      const response = await productService.updateProduct(productId, updateData);

      if (response.success) {
        alert("Product updated successfully!");
        router.push("/dashboard/products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert(error instanceof Error ? error.message : "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading product...</div>
        </div>
      </div>
    );
  }

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
                Edit Product
              </h1>
              <p className="text-xs text-gray-500">
                Update product information
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
              {loading ? "Updating..." : "Update Product"}
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
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                  <Label htmlFor="unit">Unit *</Label>
                  <select
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                {formData.currentImageUrl && !formData.image && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                    <img 
                      src={formData.currentImageUrl} 
                      alt="Current product" 
                      className="w-full h-40 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
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
                          Upload new image
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
