"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { productService } from "@/services/productService";

// Product Interface
interface Product {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  price: number;
  stock: number;
  status: string;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getProducts();
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (productId: string) => {
    router.push(`/dashboard/products/edit/${productId}`);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    setDeleting(productId);
    try {
      const response = await productService.deleteProduct(productId);
      if (response.success) {
        alert("Product deleted successfully!");
        // Remove from local state
        setProducts(products.filter(p => p.id !== productId));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  const getStatusBadge = (status: string, stock: number) => {
    if (stock === 0) {
      return (
        <Badge className="bg-red-50 text-red-700 border-red-200 border font-medium">
          Out of Stock
        </Badge>
      );
    } else if (stock < 10) {
      return (
        <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 border font-medium">
          Low Stock
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-green-50 text-green-700 border-green-200 border font-medium">
          In Stock
        </Badge>
      );
    }
  };

  return (
    <div className="space-y-8 bg-gray-50 min-h-screen pb-10">
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Products
            </h1>
            <p className="text-gray-600 mt-2">Manage your crackers inventory</p>
          </div>
          <Button
            className="flex items-center gap-2"
            onClick={() => router.push("/dashboard/products/add")}
          >
            <PlusIcon className="h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="px-6">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-gray-900">Product Inventory</CardTitle>
            <p className="text-sm text-gray-500">
              Manage your crackers and fireworks products
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100">
                  <TableHead className="text-gray-600 font-medium">
                    Product
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium">
                    Category
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium">
                    Price
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium">
                    Stock
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium">
                    Status
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-gray-500"
                    >
                      Loading inventory...
                    </TableCell>
                  </TableRow>
                ) : products.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-gray-500"
                    >
                      No products found. Add your first product!
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow
                      key={product.id}
                      className="border-gray-100 hover:bg-gray-50"
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
                            <span className="text-xs font-medium text-gray-500">
                              IMG
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {product.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {product.category || "Uncategorized"}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        ₹{product.price}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {product.stock}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(product.status, product.stock)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:bg-gray-50"
                            onClick={() => handleEdit(product.id)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-300 hover:bg-red-50 text-red-600"
                            onClick={() => handleDelete(product.id)}
                            disabled={deleting === product.id}
                          >
                            {deleting === product.id ? (
                              <span className="text-xs">...</span>
                            ) : (
                              <TrashIcon className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
