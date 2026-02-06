"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PhoneIcon,
  EyeIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

// Mock Data for Leads
const mockLeads = [
  {
    id: "L-1001",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    items: "1000 Wala, Flower Pots...",
    total: "₹4,500",
    date: "Today, 10:30 AM",
    status: "new",
  },
  {
    id: "L-1002",
    name: "Priya Sharma",
    phone: "+91 98989 89898",
    items: "Gift Box Premium",
    total: "₹2,200",
    date: "Today, 09:15 AM",
    status: "contacted",
  },
  {
    id: "L-1003",
    name: "Senthil Auto",
    phone: "+91 77777 66666",
    items: "Bulk Order (Rockets)",
    total: "₹15,000",
    date: "Yesterday",
    status: "converted",
  },
  {
    id: "L-1004",
    name: "Unknown User",
    phone: "+91 88888 55555",
    items: "Sparklers",
    total: "₹500",
    date: "Yesterday",
    status: "lost",
  },
];

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-yellow-100 text-yellow-700 border-yellow-200",
  converted: "bg-green-100 text-green-700 border-green-200",
  lost: "bg-gray-100 text-gray-700 border-gray-200",
};

export function LeadsList() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Leads & Inquiries
          </h1>
          <p className="text-sm text-gray-500">
            Manage incoming orders and customer inquiries for Skyspark.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2 bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-primary hover:border-primary"
          >
            <FunnelIcon className="h-4 w-4" /> Filter
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            + Manual Lead
          </Button>
        </div>
      </div>

      {/* Stats Cards (Optional but good for 'Professional' look) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardContent className="p-4 flex flex-col">
            <span className="text-xs text-muted-foreground uppercase font-bold">
              New Leads
            </span>
            <span className="text-2xl font-bold text-blue-600">12</span>
          </CardContent>
        </Card>
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardContent className="p-4 flex flex-col">
            <span className="text-xs text-muted-foreground uppercase font-bold">
              Pending Follow-up
            </span>
            <span className="text-2xl font-bold text-yellow-600">5</span>
          </CardContent>
        </Card>
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardContent className="p-4 flex flex-col">
            <span className="text-xs text-muted-foreground uppercase font-bold">
              Converted Today
            </span>
            <span className="text-2xl font-bold text-green-600">3</span>
          </CardContent>
        </Card>
        <Card className="bg-white text-gray-900 border-gray-200 shadow-sm">
          <CardContent className="p-4 flex flex-col">
            <span className="text-xs text-muted-foreground uppercase font-bold">
              Total Revenue (Exp)
            </span>
            <span className="text-2xl font-bold text-gray-900">₹24.5k</span>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Recent Inquiries</CardTitle>
            <div className="relative w-64">
              <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search name or phone..."
                className="pl-9 bg-white text-gray-900 border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 font-medium">Lead ID</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Items Summary</th>
                  <th className="px-6 py-3 font-medium">Total (Est)</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="bg-white border-b hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {lead.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">
                          {lead.name}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <PhoneIcon className="h-3 w-3" /> {lead.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-[200px]">
                      {lead.items}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {lead.total}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[lead.status]}`}
                      >
                        {lead.status.charAt(0).toUpperCase() +
                          lead.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{lead.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <PhoneIcon className="h-4 w-4" />
                        </Button>
                        <Link href={`/dashboard/leads/${lead.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1 bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-primary hover:border-primary"
                          >
                            View <EyeIcon className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
