"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Package, ChevronRight } from "lucide-react";
import Link from "next/link";

interface RecentOrdersProps {
  data: Array<{
    id: string;
    customerName: string;
    items: number;
    total: number;
    status: string;
    date: string;
  }>;
}

export function RecentOrders({ data }: RecentOrdersProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-0";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-0";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-0";
      case "delivered":
        return "bg-green-100 text-green-800 border-0";
      case "cancelled":
        return "bg-red-100 text-red-800 border-0";
      default:
        return "bg-gray-100 text-gray-800 border-0";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b rounded-t-xl">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Package className="h-5 w-5 text-primary" />
            Recent Orders
          </CardTitle>
          <Link href="/dashboard/orders">
            <Button
              variant="outline"
              size="sm"
              className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-gray-300"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {data.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {data.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              >
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-secondary text-secondary-foreground font-medium text-sm">
                    {getInitials(order.customerName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {order.customerName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    #{order.id} · {order.items} items
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-gray-900">
                    ₹{order.total.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2 mt-1 justify-end">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(order.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No recent orders found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
