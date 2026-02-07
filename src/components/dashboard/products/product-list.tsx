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
import {
  Plus,
  Pencil,
  Trash2,
  Package,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { productService } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";

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

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (showRefreshToast = false) => {
    try {
      if (showRefreshToast) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const response = await productService.getProducts();
      if (response.success) {
        setProducts(response.data);
        if (showRefreshToast) {
          toast({
            title: "Products Refreshed",
            description: "Product list has been updated.",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to fetch products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEdit = (productId: string) => {
    router.push(`/dashboard/products/edit/${productId}`);
  };

  const handleDelete = async (productId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this product? This action cannot be undone.",
      )
    ) {
      return;
    }

    setDeleting(productId);
    try {
      const response = await productService.deleteProduct(productId);
      if (response.success) {
        toast({
          title: "Product Deleted",
          description: "Product has been successfully deleted.",
        });
        // Remove from local state
        setProducts(products.filter((p) => p.id !== productId));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };

  const getStatusBadge = (status: string, stock: number) => {
    if (stock === 0) {
      return (
        <Badge className="bg-red-100 text-red-800 border-0">Out of Stock</Badge>
      );
    } else if (stock < 10) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-0">
          Low Stock
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-green-100 text-green-800 border-0">In Stock</Badge>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your crackers inventory</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => fetchProducts(true)}
            disabled={refreshing}
            className="border-gray-300"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button onClick={() => router.push("/dashboard/products/add")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Products Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b rounded-t-xl">
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Product Inventory
          </CardTitle>
          <p className="text-sm text-gray-500">
            Manage your crackers and fireworks products
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100 bg-gray-50/50">
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
                  <TableCell colSpan={6} className="text-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
                    <span className="text-gray-500">Loading inventory...</span>
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <Package className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-500">
                      No products found. Add your first product!
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow
                    key={product.id}
                    className="border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {product.id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {product.category || "Uncategorized"}
                    </TableCell>
                    <TableCell className="font-semibold text-gray-900">
                      ₹{product.price.toLocaleString()}
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
                          size="icon-sm"
                          className="hover:bg-primary/10 hover:text-primary hover:border-primary"
                          onClick={() => handleEdit(product.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon-sm"
                          className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                          onClick={() => handleDelete(product.id)}
                          disabled={deleting === product.id}
                        >
                          {deleting === product.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
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
  );
}
