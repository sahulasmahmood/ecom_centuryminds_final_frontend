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
import { EyeIcon, UserIcon } from "@heroicons/react/24/outline";

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

export default function CustomersPage() {
  const [customers] = useState(mockCustomers);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "vip":
        return <Badge className="bg-purple-100 text-purple-800">VIP</Badge>;
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "new":
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
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

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">
          Manage your customer relationships
        </p>
      </div>

      {/* Customer Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIP</CardTitle>
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.vip}</div>
          </CardContent>
        </Card>
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.new}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">
                          {customer.city}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{customer.email}</div>
                      <div className="text-sm text-gray-500">
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>₹{customer.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
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
