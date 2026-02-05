"use client";

import { ShoppingCart, DollarSign, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Today's Revenue",
      value: `₹${data.todaysRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Total Customers",
      value: data.totalCustomers,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      title: "Total Products",
      value: data.totalProducts,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index} className={`bg-white border ${card.borderColor} shadow-sm hover:shadow-md transition-shadow`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
            <p className="text-xs text-gray-500 mt-1">
              {index === 0 && "Orders received today"}
              {index === 1 && "Revenue generated today"}
              {index === 2 && "Registered customers"}
              {index === 3 && "Products in inventory"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}