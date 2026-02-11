"use client";

import {
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Users,
  Package,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface KPICardsProps {
  data: {
    todaysOrders: number;
    todaysRevenue: number;
    totalCustomers: number;
    totalProducts: number;
    pendingOrders?: number;
    totalViews?: number;
  };
}

export function KPICards({ data }: KPICardsProps) {
  const cards = [
    {
      title: "Today's Orders",
      value: data.todaysOrders,
      change: "Today",
      icon: ShoppingCart,
    },
    {
      title: "Today's Revenue",
      value: `₹${data.todaysRevenue.toLocaleString()}`,
      change: "Today",
      icon: DollarSign,
    },
    {
      title: "Total Customers",
      value: data.totalCustomers,
      change: "All time",
      icon: Users,
    },
    {
      title: "Total Products",
      value: data.totalProducts,
      change: "In stock",
      icon: Package,
    },
    {
      title: "Pending Orders",
      value: data.pendingOrders || 0,
      change: "Awaiting",
      icon: TrendingUp,
    },
    {
      title: "Store Views",
      value: data.totalViews || 0,
      change: "This month",
      icon: Eye,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <card.icon className="h-5 w-5 text-primary" />
              <span className="text-xs text-muted-foreground">
                {card.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.title}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
