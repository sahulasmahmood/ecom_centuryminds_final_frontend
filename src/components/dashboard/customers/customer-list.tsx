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
  Users,
  Crown,
  UserPlus,
  UserCheck,
  RefreshCw,
} from "lucide-react";

// Mock data for customers
const mockCustomers = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
    totalOrders: 12,
    totalSpent: 15600,
    lastOrder: "2024-02-05",
    status: "active",
    city: "Mumbai",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 87654 32109",
    totalOrders: 8,
    totalSpent: 9800,
    lastOrder: "2024-02-04",
    status: "active",
    city: "Delhi",
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit@example.com",
    phone: "+91 76543 21098",
    totalOrders: 15,
    totalSpent: 22400,
    lastOrder: "2024-02-03",
    status: "vip",
    city: "Ahmedabad",
  },
  {
    id: "4",
    name: "Sunita Devi",
    email: "sunita@example.com",
    phone: "+91 65432 10987",
    totalOrders: 3,
    totalSpent: 2850,
    lastOrder: "2024-01-28",
    status: "new",
    city: "Jaipur",
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "+91 54321 09876",
    totalOrders: 6,
    totalSpent: 7200,
    lastOrder: "2024-01-15",
    status: "inactive",
    city: "Pune",
  },
];

export function CustomerList() {
  const [customers] = useState(mockCustomers);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "vip":
        return (
          <Badge className="bg-purple-100 text-purple-800 border-0">VIP</Badge>
        );
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 border-0">Active</Badge>
        );
      case "new":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-0">New</Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 border-0">Inactive</Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-0">{status}</Badge>
        );
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

  const getCustomerStats = () => {
    return {
      total: customers.length,
      active: customers.filter((c) => c.status === "active").length,
      vip: customers.filter((c) => c.status === "vip").length,
      new: customers.filter((c) => c.status === "new").length,
    };
  };

  const stats = getCustomerStats();

  const statsCards = [
    {
      label: "Total Customers",
      value: stats.total,
      icon: Users,
      color: "text-gray-600",
      bg: "bg-gray-100",
    },
    {
      label: "Active",
      value: stats.active,
      icon: UserCheck,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "VIP",
      value: stats.vip,
      icon: Crown,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      label: "New",
      value: stats.new,
      icon: UserPlus,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">
            Manage your customer relationships
          </p>
        </div>
        <Button variant="outline" className="border-gray-300">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Customer Stats Overview */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {statsCards.map((item) => (
          <Card
            key={item.label}
            className="border-0 shadow-lg hover:shadow-xl transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${item.bg}`}>
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customers Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b rounded-t-xl">
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Customer List
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100 bg-gray-50/50">
                <TableHead className="text-gray-600 font-medium">
                  Customer
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Contact
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Orders
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Total Spent
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Last Order
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
              {customers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className="border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {customer.city}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm text-gray-900">
                        {customer.email}
                      </div>
                      <div className="text-xs text-gray-500">
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {customer.totalOrders}
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900">
                    ₹{customer.totalSpent.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {customer.lastOrder}
                  </TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
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
