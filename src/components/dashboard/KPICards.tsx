"use client";

import { ShoppingCart, DollarSign, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface KPICardsProps {
  data: {
    todaysOrders: number;
    todaysRevenue: number;
    totalCustomers: number;
    totalProducts: number;
  };
}

export function KPICards({ data }: KPICardsProps) {
  const cards = [
    {
      title: "Today's Orders",
      value: data.todaysOrders,
      description: "Orders received today",
      icon: ShoppingCart,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Today's Revenue",
      value: `₹${data.todaysRevenue.toLocaleString()}`,
      description: "Revenue generated today",
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Total Customers",
      value: data.totalCustomers,
      description: "Registered customers",
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Products",
      value: data.totalProducts,
      description: "Products in inventory",
      icon: TrendingUp,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          className="border-0 shadow-lg hover:shadow-xl transition-shadow"
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${card.iconBg}`}>
                <card.icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>
              <span className="text-xs text-gray-500">{card.title}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-500 mt-1">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
