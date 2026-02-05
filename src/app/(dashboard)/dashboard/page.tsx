"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { KPICards } from "@/components/dashboard/KPICards";
import { OrderOperations } from "@/components/dashboard/OrderOperations";
import { ProductInsights } from "@/components/dashboard/ProductInsights";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { dashboardService } from "@/services/dashboardService";
import type { DashboardData } from "@/types/dashboard";

export default function Dashboard() {
  const { isLoading: authLoading } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-gray-50 min-h-screen pb-10">
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome to your crackers store admin panel
        </p>
      </div>

      <div className="px-6">
        {dashboardData && (
          <>
            <KPICards data={dashboardData.kpiCards} />

            <div className="grid gap-8 md:grid-cols-2 mt-8">
              <OrderOperations data={dashboardData.orderOperations} />
              <ProductInsights data={dashboardData.productInsights} />
            </div>

            <div className="mt-8">
              <RecentOrders data={dashboardData.recentOrders} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
