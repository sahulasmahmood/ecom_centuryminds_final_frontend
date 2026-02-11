"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { KPICards } from "@/components/dashboard/KPICards";
import { OrderOperations } from "@/components/dashboard/OrderOperations";
import { ProductInsights } from "@/components/dashboard/ProductInsights";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { dashboardService } from "@/services/dashboardService";
import type { DashboardData } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RefreshCw,
  Loader2,
  AlertCircle,
  ShoppingBag,
  Package,
  Users,
  Settings,
  Tag,
  Store,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DashboardView() {
  const { loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async (showRefreshToast = false) => {
    try {
      if (showRefreshToast) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const data = await dashboardService.getDashboardData();
      setDashboardData(data);
      if (showRefreshToast) {
        toast({
          title: "Dashboard Updated",
          description: "Latest data has been loaded successfully.",
        });
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      if (showRefreshToast) {
        toast({
          title: "Error",
          description: "Failed to refresh dashboard data. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadDashboardData(true);
  };

  const quickActions = [
    { title: "Products", href: "/dashboard/products", icon: ShoppingBag },
    { title: "Categories", href: "/dashboard/categories", icon: Tag },
    { title: "Orders", href: "/dashboard/orders", icon: Package },
    { title: "Customers", href: "/dashboard/customers", icon: Users },
    { title: "POS", href: "/dashboard/pos", icon: Store },
    { title: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-400" />
          <p className="text-muted-foreground mb-4">
            Failed to load dashboard data
          </p>
          <Button onClick={() => loadDashboardData()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s your store overview.
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-primary/10 hover:text-primary hover:border-primary"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {/* KPI Cards - 6 columns on large screens */}
      <KPICards data={dashboardData.kpiCards} />

      {/* Main Content - Charts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Charts Section - Takes 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <OrderOperations data={dashboardData.orderOperations} />
            <ProductInsights data={dashboardData.productInsights} />
          </div>

          {/* Recent Orders */}
          <RecentOrders data={dashboardData.recentOrders} />
        </div>

        {/* Quick Actions - Takes 1 column */}
        <Card className="border-0 shadow-lg h-fit">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Settings className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href}>
                  <Button
                    variant="outline"
                    className="w-full h-auto py-3 flex flex-col items-center gap-1 hover:bg-primary/10 hover:border-primary transition-all"
                  >
                    <action.icon className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium text-foreground">
                      {action.title}
                    </span>
                  </Button>
                </Link>
              ))}
            </div>

            {/* Store Stats */}
            <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-muted rounded-lg">
                <p className="text-lg font-bold text-foreground">
                  {dashboardData.kpiCards.todaysOrders}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Today&apos;s Orders
                </p>
              </div>
              <div className="text-center p-2 bg-muted rounded-lg">
                <p className="text-lg font-bold text-foreground">
                  ₹{dashboardData.kpiCards.todaysRevenue.toLocaleString()}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Today&apos;s Revenue
                </p>
              </div>
            </div>

            {/* View All Link */}
            <Link href="/dashboard/orders" className="block mt-4">
              <Button
                variant="ghost"
                className="w-full text-primary hover:text-primary hover:bg-primary/10"
              >
                View All Orders
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
