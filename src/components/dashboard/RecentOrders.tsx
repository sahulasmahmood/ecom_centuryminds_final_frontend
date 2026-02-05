"use client";

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
import { ClockIcon } from "lucide-react";

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
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'shipped':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-gray-900 flex items-center gap-2">
          <ClockIcon className="h-5 w-5 text-indigo-600" />
          Recent Orders
        </CardTitle>
        <p className="text-sm text-gray-500">Latest customer orders and their status</p>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-100">
              <TableHead className="text-gray-600 font-medium">Order ID</TableHead>
              <TableHead className="text-gray-600 font-medium">Customer</TableHead>
              <TableHead className="text-gray-600 font-medium">Items</TableHead>
              <TableHead className="text-gray-600 font-medium">Total</TableHead>
              <TableHead className="text-gray-600 font-medium">Status</TableHead>
              <TableHead className="text-gray-600 font-medium">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((order) => (
              <TableRow key={order.id} className="border-gray-100 hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">#{order.id}</TableCell>
                <TableCell className="text-gray-700">{order.customerName}</TableCell>
                <TableCell className="text-gray-700">{order.items} items</TableCell>
                <TableCell className="font-medium text-gray-900">₹{order.total.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(order.status)} border font-medium`}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-500">{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}