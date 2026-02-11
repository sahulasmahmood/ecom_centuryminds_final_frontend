"use client";

import React, { useEffect, useState } from "react";
import {
  WifiIcon,
  SignalSlashIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { usePOSStore } from "@/store/use-pos-store";
import { cn } from "@/lib/utils";

interface POSLayoutProps {
  children: React.ReactNode;
}

export function POSLayout({ children }: POSLayoutProps) {
  const [isOnline, setIsOnline] = useState(true);
  const { offlineOrders, clearOfflineOrders } = usePOSStore();
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Initial check
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const syncOfflineOrders = async () => {
    if (offlineOrders.length === 0) return;

    setIsSyncing(true);
    try {
      // Ideally, this would loop through offline orders and post them to API
      // await Promise.all(offlineOrders.map(order => api.createOrder(order)));

      console.log("Syncing offline orders:", offlineOrders);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      clearOfflineOrders();
      alert("Offline orders synced successfully!");
    } catch (error) {
      console.error("Sync failed:", error);
      alert("Failed to sync some orders. Please try again.");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* POS Top Bar */}
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg text-gray-800">POS Terminal</h1>
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full border">
            v1.0
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Connectivity Status */}
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors",
              isOnline
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700",
            )}
          >
            {isOnline ? (
              <>
                <WifiIcon className="h-4 w-4" />
                <span>Online</span>
              </>
            ) : (
              <>
                <SignalSlashIcon className="h-4 w-4" />
                <span>Offline Mode</span>
              </>
            )}
          </div>

          {/* Sync Button (visible if online + has offline data) */}
          {isOnline && offlineOrders.length > 0 && (
            <button
              onClick={syncOfflineOrders}
              disabled={isSyncing}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <ArrowPathIcon
                className={cn("h-4 w-4", isSyncing && "animate-spin")}
              />
              {isSyncing ? "Syncing..." : `Sync ${offlineOrders.length} Orders`}
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">{children}</div>
    </div>
  );
}
