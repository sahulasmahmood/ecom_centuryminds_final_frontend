"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeftIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CheckBadgeIcon,
  XCircleIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock Data for a single lead (In real app, fetch by ID)
const leadData = {
  id: "L-1001",
  customer: {
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.k@example.com",
    address: "123, Gandhi Road, Sivakasi - 626123",
  },
  status: "new",
  created_at: "Oct 24, 2026, 10:30 AM",
  items: [
    { id: 1, name: "1000 Wala (Giant)", price: 850, qty: 2, total: 1700 },
    { id: 2, name: "Flower Pots (Big)", price: 250, qty: 4, total: 1000 },
    { id: 3, name: "Sparklers (Red)", price: 120, qty: 10, total: 1200 },
    { id: 4, name: "Sky Shot (12 Shot)", price: 600, qty: 1, total: 600 },
  ],
  subtotal: 4500,
  tax: 0,
  total: 4500,
};

export default function LeadDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [status, setStatus] = useState(leadData.status);

  const handleConfirmOrder = () => {
    // Logic to convert Lead -> Order would go here
    if (confirm("Confirm this lead and generate Invoice #INV-2024-001?")) {
      setStatus("converted");
      // router.push("/dashboard/orders/INV-2024-001"); // Redirect to new order
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900">
                  Lead #{params.id || "L-1001"}
                </h1>
                <Badge
                  className={`${status === "converted" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"} hover:bg-none border-0`}
                >
                  {status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">
                Created on {leadData.created_at}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex gap-1"
            >
              <PrinterIcon className="h-4 w-4" /> Print
            </Button>
            {status !== "converted" && (
              <Button
                onClick={handleConfirmOrder}
                className="bg-green-600 hover:bg-green-700 text-white gap-2"
              >
                <CheckBadgeIcon className="h-4 w-4" /> Confirm Order
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl">
        {/* Left: Customer Info & Actions */}
        <div className="space-y-6">
          <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {leadData.customer.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {leadData.customer.name}
                  </p>
                  <p className="text-sm text-gray-500">Regular Customer</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <PhoneIcon className="h-4 w-4 text-gray-400" />
                  <a
                    href={`tel:${leadData.customer.phone}`}
                    className="hover:text-primary hover:underline"
                  >
                    {leadData.customer.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                  <span>{leadData.customer.email}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPinIcon className="h-4 w-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-600">
                    {leadData.customer.address}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Lead Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button variant="outline" className="justify-start gap-2">
                <PhoneIcon className="h-4 w-4" /> Call Customer
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2 text-red-600 hover:text-red-700 border-red-200 bg-red-50 hover:bg-red-100"
              >
                <XCircleIcon className="h-4 w-4" /> Mark as Lost/Fake
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right: Items List */}
        <div className="lg:col-span-2">
          <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Requested Items</CardTitle>
              <CardDescription>
                Items added to cart by the customer
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3">Item</th>
                      <th className="px-6 py-3 text-right">Price</th>
                      <th className="px-6 py-3 text-center">Qty</th>
                      <th className="px-6 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadData.items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-right">₹{item.price}</td>
                        <td className="px-6 py-4 text-center">{item.qty}</td>
                        <td className="px-6 py-4 text-right font-medium">
                          ₹{item.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50/50 font-medium text-gray-900">
                    <tr>
                      <td colSpan={3} className="px-6 py-3 text-right">
                        Subtotal
                      </td>
                      <td className="px-6 py-3 text-right">
                        ₹{leadData.subtotal}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-3 text-right text-gray-500"
                      >
                        Tax (0%)
                      </td>
                      <td className="px-6 py-3 text-right text-gray-500">₹0</td>
                    </tr>
                    <tr className="text-lg border-t border-gray-200">
                      <td colSpan={3} className="px-6 py-4 text-right">
                        Grand Total
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-primary">
                        ₹{leadData.total}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
