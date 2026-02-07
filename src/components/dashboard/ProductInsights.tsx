"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, Package } from "lucide-react";

interface ProductInsightsProps {
  data: {
    topSellingProducts: Array<{
      name: string;
      sales: number;
      category: string;
    }>;
    lowStockProducts: Array<{
      name: string;
      stock: number;
    }>;
  };
}

export function ProductInsights({ data }: ProductInsightsProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b rounded-t-xl">
        <CardTitle className="text-gray-900 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Product Insights
        </CardTitle>
        <p className="text-sm text-gray-500">
          Top performers and inventory alerts
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Top Selling Products */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-4 h-4 text-green-600" />
              <h4 className="text-sm font-semibold text-gray-900">
                Top Selling Crackers
              </h4>
            </div>
            {data.topSellingProducts.length > 0 ? (
              <div className="space-y-3">
                {data.topSellingProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-green-50/50 border border-green-100 hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.category}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-0">
                      {product.sales} sold
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No sales data available
              </p>
            )}
          </div>

          {/* Low Stock Alert */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <h4 className="text-sm font-semibold text-gray-900">
                Low Stock Alert
              </h4>
            </div>
            {data.lowStockProducts.length > 0 ? (
              <div className="space-y-3">
                {data.lowStockProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-red-50/50 border border-red-100 hover:bg-red-50 transition-colors"
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {product.name}
                    </p>
                    <Badge className="bg-red-100 text-red-800 border-0">
                      {product.stock} left
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-green-600 text-center py-4 bg-green-50 rounded-lg">
                All products are well stocked! ✓
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
