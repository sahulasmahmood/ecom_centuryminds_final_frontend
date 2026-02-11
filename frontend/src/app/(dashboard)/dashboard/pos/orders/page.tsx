"use client";

import { useEffect, useState } from "react";
import { getPOSOrders, type POSOrder } from "@/services/posService";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Search, Eye, Download } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function POSOrdersPage() {
  const [orders, setOrders] = useState<POSOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    paymentMethod: "",
    orderStatus: "",
  });

  const { toast } = useToast();

  useEffect(() => {
    loadOrders();
  }, [page, filters]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await getPOSOrders({
        page,
        limit: 20,
        paymentMethod: filters.paymentMethod || undefined,
        orderStatus: filters.orderStatus || undefined,
      });
      setOrders(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to load orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPaymentMethodBadge = (method: string) => {
    const colors: Record<string, string> = {
      cash: "bg-green-100 text-green-700",
      card: "bg-blue-100 text-blue-700",
      upi: "bg-purple-100 text-purple-700",
    };
    return colors[method.toLowerCase()] || "bg-gray-100 text-gray-700";
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
      refunded: "bg-orange-100 text-orange-700",
    };
    return colors[status.toLowerCase()] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/pos">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to POS
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">POS Orders</h1>
            <p className="text-gray-600">View and manage point of sale orders</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="pl-10"
            />
          </div>

          <Select
            value={filters.paymentMethod}
            onValueChange={(value) =>
              setFilters({ ...filters, paymentMethod: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Methods</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="card">Card</SelectItem>
              <SelectItem value="upi">UPI</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.orderStatus}
            onValueChange={(value) =>
              setFilters({ ...filters, orderStatus: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Order Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={loadOrders} variant="outline">
            Apply Filters
          </Button>
        </div>
      </Card>

      {/* Orders Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Invoice #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  Loading orders...
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>{order.invoiceNumber || "-"}</TableCell>
                  <TableCell>
                    {order.customerName || "Walk-in Customer"}
                  </TableCell>
                  <TableCell>{order.items.length}</TableCell>
                  <TableCell className="font-semibold">
                    ₹{order.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getPaymentMethodBadge(order.paymentMethod)}
                    >
                      {order.paymentMethod.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(order.orderStatus)}>
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(order.createdAt), "MMM dd, yyyy HH:mm")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t">
            <p className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
