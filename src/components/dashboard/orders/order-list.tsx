"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "@heroicons/react/24/outline";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD001",
    customerName: "Rajesh Kumar",
    customerEmail: "rajesh@example.com",
    items: 5,
    total: 2500,
    status: "confirmed",
    date: "2024-02-05",
    address: "123 Main St, Mumbai, Maharashtra",
  },
  {
    id: "ORD002",
    customerName: "Priya Sharma",
    customerEmail: "priya@example.com",
    items: 3,
    total: 1800,
    status: "shipped",
    date: "2024-02-05",
    address: "456 Park Ave, Delhi, Delhi",
  },
  {
    id: "ORD003",
    customerName: "Amit Patel",
    customerEmail: "amit@example.com",
    items: 8,
    total: 4200,
    status: "pending",
    date: "2024-02-04",
    address: "789 Garden St, Ahmedabad, Gujarat",
  },
  {
    id: "ORD004",
    customerName: "Sunita Devi",
    customerEmail: "sunita@example.com",
    items: 2,
    total: 950,
    status: "delivered",
    date: "2024-02-04",
    address: "321 Temple Rd, Jaipur, Rajasthan",
  },
  {
    id: "ORD005",
    customerName: "Vikram Singh",
    customerEmail: "vikram@example.com",
    items: 6,
    total: 3200,
    status: "cancelled",
    date: "2024-02-04",
    address: "654 Market St, Pune, Maharashtra",
  },
];

export function OrderList() {
  const [orders] = useState(mockOrders);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusCount = (status: string) => {
    return orders.filter((order) => order.status === status).length;
  };

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage customer orders and track deliveries
        </p>
      </div>

      {/* Order Status Overview */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getStatusCount("pending")}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getStatusCount("confirmed")}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Shipped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getStatusCount("shipped")}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getStatusCount("delivered")}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getStatusCount("cancelled")}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-sm text-gray-500">
                        {order.customerEmail}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{order.items} items</TableCell>
                  <TableCell>₹{order.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-primary hover:border-primary"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
