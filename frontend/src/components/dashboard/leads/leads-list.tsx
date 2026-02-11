"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  Phone,
  Eye,
  MessageSquare,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  DollarSign,
  RefreshCw,
} from "lucide-react";

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
  new: "bg-blue-100 text-blue-800 border-0",
  contacted: "bg-yellow-100 text-yellow-800 border-0",
  converted: "bg-green-100 text-green-800 border-0",
  lost: "bg-gray-100 text-gray-800 border-0",
};

export function LeadsList() {
  const [searchTerm, setSearchTerm] = useState("");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const statsCards = [
    {
      label: "New Leads",
      value: "12",
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Pending Follow-up",
      value: "5",
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      label: "Converted Today",
      value: "3",
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Total Revenue (Exp)",
      value: "₹24.5k",
      icon: DollarSign,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Leads & Inquiries
          </h1>
          <p className="text-gray-600 mt-1">
            Manage incoming orders and customer inquiries
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gray-300">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Manual Lead
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
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

      {/* Leads Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b rounded-t-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Recent Inquiries
            </CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
          <div className="divide-y divide-gray-100">
            {mockLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 hover:bg-gray-50 transition-colors gap-4"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-secondary text-secondary-foreground font-medium text-sm">
                      {getInitials(lead.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {lead.name}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {lead.phone}
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0 px-0 sm:px-4">
                  <p className="text-sm text-gray-600 truncate">{lead.items}</p>
                  <p className="text-xs text-gray-500">#{lead.id}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{lead.total}</p>
                    <p className="text-xs text-gray-500">{lead.date}</p>
                  </div>
                  <Badge className={statusColors[lead.status]}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Link href={`/dashboard/leads/${lead.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-primary/10 hover:text-primary hover:border-primary"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
