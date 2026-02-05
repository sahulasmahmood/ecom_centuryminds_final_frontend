"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  const statusItems = [
    { 
      label: "Pending", 
      count: data.pending, 
      color: "bg-yellow-50 text-yellow-700 border-yellow-200",
      dotColor: "bg-yellow-400"
    },
    { 
      label: "Confirmed", 
      count: data.confirmed, 
      color: "bg-blue-50 text-blue-700 border-blue-200",
      dotColor: "bg-blue-400"
    },
    { 
      label: "Shipped", 
      count: data.shipped, 
      color: "bg-purple-50 text-purple-700 border-purple-200",
      dotColor: "bg-purple-400"
    },
    { 
      label: "Delivered", 
      count: data.delivered, 
      color: "bg-green-50 text-green-700 border-green-200",
      dotColor: "bg-green-400"
    },
    { 
      label: "Cancelled", 
      count: data.cancelled, 
      color: "bg-red-50 text-red-700 border-red-200",
      dotColor: "bg-red-400"
    },
  ];

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-gray-900">Order Operations</CardTitle>
        <p className="text-sm text-gray-500">Current order status breakdown</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {statusItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item.dotColor}`}></div>
                <Badge variant="secondary" className={`${item.color} border font-medium`}>
                  {item.label}
                </Badge>
              </div>
              <span className="text-2xl font-bold text-gray-900">{item.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}