import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useAnalysisStore } from "@/store/analysisStore";
import { prepareDashboardData } from "@/lib/analytics-data";
import { API_URL } from "@/lib/config";
import { fetcher } from "@/lib/fetcher";

export function useUsersAnalysisData() {
  const router = useRouter();
  const store = useAnalysisStore.getState();

  const swr = useSWR(
    `${API_URL}/analysis/data`,
    async (url: string) => {
      const res = await fetcher(url, {
        credentials: "include",
      });
      if (res?.code >= 20001 && res?.code <= 20011) {
        router.push("/login");
        return null;
      }
      if (!res || res.error || res.status >= 400) {
        store.setLoading(false);
        throw new Error(res?.message || "Failed to fetch analysis data");
      }
      return res;
    },
    {
      refreshInterval: 60_000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60_000,

      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (
          error
        ) {
          store.setLoading(false);
          return;
        }

        if (retryCount >= 1) return;

        setTimeout(() => revalidate({ retryCount }), 5000);
      },

      onSuccess: (newData) => {
        if (!newData?.data) return;

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
          chartData,
        } = prepareDashboardData(newData.data);

        store.setLoading(true);
        store.setTotalUsers(totalUsers);
        store.setActiveUsers(activeUsers);
        store.setActiveUserPercent(activeUserPercent);
        store.setTotalRoomsCreated(totalRoomsCreated);
        store.setTodayRoomSettled(todayRoomSettled);
        store.setTotalCoin(totalCoin);
        store.setTotalDiamond(totalDiamond);
        store.setTotalLives(totalLives);
        store.setRoomsByDate(roomsByDate);
        store.setUserTableData(userTableData);
        store.setChartData(chartData);
        store.setLoading(false);
      },
    }
  );

  return swr;
}
