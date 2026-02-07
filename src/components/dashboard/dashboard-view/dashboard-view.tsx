"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { KPICards } from "@/components/dashboard/KPICards";
import { OrderOperations } from "@/components/dashboard/OrderOperations";
import { ProductInsights } from "@/components/dashboard/ProductInsights";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { dashboardService } from "@/services/dashboardService";
import type { DashboardData } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DashboardView() {
  const { isLoading: authLoading } = useAuth();
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

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-400" />
          <p className="text-gray-600 mb-4">Failed to load dashboard data</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here&apos;s your store overview.
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {/* KPI Cards */}
      <KPICards data={dashboardData.kpiCards} />

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <OrderOperations data={dashboardData.orderOperations} />
        <ProductInsights data={dashboardData.productInsights} />
      </div>

      {/* Recent Orders */}
      <RecentOrders data={dashboardData.recentOrders} />
    </div>
  );
}
