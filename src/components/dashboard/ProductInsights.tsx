"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle } from "lucide-react";

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
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-gray-900 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-indigo-600" />
          Product Insights
        </CardTitle>
        <p className="text-sm text-gray-500">Top performers and inventory alerts</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Top Selling Products */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <h4 className="text-sm font-semibold text-gray-900">Top Selling Crackers</h4>
            </div>
            <div className="space-y-3">
              {data.topSellingProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                    {product.sales} sold
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <h4 className="text-sm font-semibold text-gray-900">Low Stock Alert</h4>
            </div>
            <div className="space-y-3">
              {data.lowStockProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100">
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <Badge className="bg-red-100 text-red-700 border-red-200">
                    {product.stock} left
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}