"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  RefreshCw,
} from "lucide-react";

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

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case "shipped":
        return <Truck className="h-4 w-4 text-purple-600" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusCount = (status: string) => {
    return orders.filter((order) => order.status === status).length;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const statusCards = [
    {
      status: "pending",
      label: "Pending",
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      status: "confirmed",
      label: "Confirmed",
      icon: CheckCircle,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      status: "shipped",
      label: "Shipped",
      icon: Truck,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      status: "delivered",
      label: "Delivered",
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      status: "cancelled",
      label: "Cancelled",
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">
            Manage customer orders and track deliveries
          </p>
        </div>
        <Button variant="outline" className="border-gray-300">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Order Status Overview */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {statusCards.map((item) => (
          <Card
            key={item.status}
            className="border-0 shadow-lg hover:shadow-xl transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${item.bg}`}>
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {getStatusCount(item.status)}
              </p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Orders Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b rounded-t-xl">
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            All Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100 bg-gray-50/50">
                <TableHead className="text-gray-600 font-medium">
                  Order ID
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Customer
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Items
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Total
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Status
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Date
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-900">
                    #{order.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
                          {getInitials(order.customerName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">
                          {order.customerName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.customerEmail}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {order.items} items
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900">
                    ₹{order.total.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{order.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className="hover:bg-primary/10 hover:text-primary hover:border-primary"
                    >
                      <Eye className="h-4 w-4" />
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
