"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ShoppingCart } from "lucide-react";

interface OrderOperationsProps {
  data: {
    pending: number;
    confirmed: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
}

export function OrderOperations({ data }: OrderOperationsProps) {
  const total =
    data.pending +
    data.confirmed +
    data.shipped +
    data.delivered +
    data.cancelled;

  const statusItems = [
    {
      label: "Pending",
      count: data.pending,
      color: "bg-yellow-100 text-yellow-800 border-0",
      progressColor: "bg-yellow-400",
      percentage: total > 0 ? (data.pending / total) * 100 : 0,
    },
    {
      label: "Confirmed",
      count: data.confirmed,
      color: "bg-blue-100 text-blue-800 border-0",
      progressColor: "bg-blue-400",
      percentage: total > 0 ? (data.confirmed / total) * 100 : 0,
    },
    {
      label: "Shipped",
      count: data.shipped,
      color: "bg-purple-100 text-purple-800 border-0",
      progressColor: "bg-purple-400",
      percentage: total > 0 ? (data.shipped / total) * 100 : 0,
    },
    {
      label: "Delivered",
      count: data.delivered,
      color: "bg-green-100 text-green-800 border-0",
      progressColor: "bg-green-400",
      percentage: total > 0 ? (data.delivered / total) * 100 : 0,
    },
    {
      label: "Cancelled",
      count: data.cancelled,
      color: "bg-red-100 text-red-800 border-0",
      progressColor: "bg-red-400",
      percentage: total > 0 ? (data.cancelled / total) * 100 : 0,
    },
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b rounded-t-xl">
        <CardTitle className="text-gray-900 flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          Order Operations
        </CardTitle>
        <p className="text-sm text-gray-500">Current order status breakdown</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {statusItems.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Badge className={item.color}>{item.label}</Badge>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {item.count}
                </span>
              </div>
              <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`absolute h-full ${item.progressColor} transition-all duration-500 rounded-full`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Total orders */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">Total Orders</span>
          <span className="text-xl font-bold text-gray-900">{total}</span>
        </div>
      </CardContent>
    </Card>
  );
}
