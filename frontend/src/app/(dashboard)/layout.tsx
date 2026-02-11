import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AdminRouteGuard } from "@/components/auth/AdminRouteGuard";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminRouteGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AdminRouteGuard>
  );
}