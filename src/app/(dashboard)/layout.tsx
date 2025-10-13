"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useUsersAnalysisData } from "@/hooks/useAnalysisData";
import { prepareDashboardData } from "@/lib/analytics-data";
import { useAnalysisStore } from "@/store/analysisStore";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, isLoading } = useUsersAnalysisData();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setLoading(true);
      const {
        totalUsers,
        activeUsers,
        activeUserPercent,
        totalRoomsCreated,
        todayRoomSettled,
        totalCoin,
        totalDiamond,
        totalLives,
        roomsByDate,
        userTableData,
        chartData
      } = prepareDashboardData(data.data ?? []);
      useAnalysisStore.getState().setLoading(true);
      useAnalysisStore.getState().setTotalUsers(totalUsers);
      useAnalysisStore.getState().setActiveUsers(activeUsers);
      useAnalysisStore.getState().setActiveUserPercent(activeUserPercent);
      useAnalysisStore.getState().setTotalRoomsCreated(totalRoomsCreated);
      useAnalysisStore.getState().setTodayRoomSettled(todayRoomSettled);
      useAnalysisStore.getState().setTotalCoin(totalCoin);
      useAnalysisStore.getState().setTotalDiamond(totalDiamond);
      useAnalysisStore.getState().setTotalLives(totalLives);
      useAnalysisStore.getState().setRoomsByDate(roomsByDate);
      useAnalysisStore.getState().setUserTableData(userTableData);
      useAnalysisStore.getState().setChartData(chartData);
      useAnalysisStore.getState().setLoading(false);
      setLoading(false);
    }
  },[data]);
  if (isLoading || loading || !data ) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/75">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
