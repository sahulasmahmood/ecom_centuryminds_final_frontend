import api from "@/lib/api";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface ProductFormData {
  name: string;
  description?: string;
  brand?: string;
  category: string;
  sku?: string; // Stock Keeping Unit - unique product identifier
  purchasePrice?: number;
  sellingPrice: number;
  mrp?: number;
  gstPercentage?: number;
  stock?: number;
  lowStockThreshold?: number;
  unit?: string;
  soundLevel?: string;
  piecesPerPack?: string;
  duration?: string;
  safetyDistance?: string;
  effects?: string;
  status?: string;
  isFeatured?: boolean;
  image?: File;
}

export const productService = {
  // Get all products
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
  }) {
    const response = await api.get("/products", { params });
    return response.data;
  },

  // Get single product
  async getProduct(id: string) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Create product with image upload
  async createProduct(data: ProductFormData) {
    const formData = new FormData();

    // Append all fields to FormData
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.brand) formData.append("brand", data.brand);
    formData.append("category", data.category);
    if (data.sku) formData.append("sku", data.sku);
    formData.append("sellingPrice", data.sellingPrice.toString());

    if (data.purchasePrice)
      formData.append("purchasePrice", data.purchasePrice.toString());
    if (data.mrp) formData.append("mrp", data.mrp.toString());
    if (data.gstPercentage)
      formData.append("gstPercentage", data.gstPercentage.toString());
    if (data.stock !== undefined)
      formData.append("stock", data.stock.toString());
    if (data.lowStockThreshold !== undefined)
      formData.append("lowStockThreshold", data.lowStockThreshold.toString());
    if (data.unit) formData.append("unit", data.unit);

    if (data.soundLevel) formData.append("soundLevel", data.soundLevel);
    if (data.piecesPerPack)
      formData.append("piecesPerPack", data.piecesPerPack);
    if (data.duration) formData.append("duration", data.duration);
    if (data.safetyDistance)
      formData.append("safetyDistance", data.safetyDistance);
    if (data.effects) formData.append("effects", data.effects);

    if (data.status) formData.append("status", data.status);
    if (data.isFeatured !== undefined)
      formData.append("isFeatured", data.isFeatured.toString());

    if (data.image) formData.append("image", data.image);

    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Use axios directly for multipart/form-data with token
    const response = await axios.post(`${API_URL}/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  },

  // Update product
  async updateProduct(id: string, data: Partial<ProductFormData>) {
    const formData = new FormData();

    // Append only provided fields to FormData
    if (data.name) formData.append("name", data.name);
    if (data.description !== undefined)
      formData.append("description", data.description);
    if (data.brand !== undefined) formData.append("brand", data.brand);
    if (data.category) formData.append("category", data.category);
    if (data.sku !== undefined) formData.append("sku", data.sku);
    if (data.sellingPrice !== undefined)
      formData.append("sellingPrice", data.sellingPrice.toString());

    if (data.purchasePrice !== undefined)
      formData.append("purchasePrice", data.purchasePrice.toString());
    if (data.mrp !== undefined) formData.append("mrp", data.mrp.toString());
    if (data.gstPercentage !== undefined)
      formData.append("gstPercentage", data.gstPercentage.toString());
    if (data.stock !== undefined)
      formData.append("stock", data.stock.toString());
    if (data.unit !== undefined) formData.append("unit", data.unit);

    if (data.soundLevel !== undefined)
      formData.append("soundLevel", data.soundLevel);
    if (data.piecesPerPack !== undefined)
      formData.append("piecesPerPack", data.piecesPerPack);
    if (data.duration !== undefined) formData.append("duration", data.duration);
    if (data.safetyDistance !== undefined)
      formData.append("safetyDistance", data.safetyDistance);
    if (data.effects !== undefined) formData.append("effects", data.effects);

    if (data.status !== undefined) formData.append("status", data.status);
    if (data.isFeatured !== undefined)
      formData.append("isFeatured", data.isFeatured.toString());

    if (data.image) formData.append("image", data.image);

    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Use axios directly for multipart/form-data with token
    const response = await axios.put(`${API_URL}/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  },

  // Delete product
  async deleteProduct(id: string) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};
