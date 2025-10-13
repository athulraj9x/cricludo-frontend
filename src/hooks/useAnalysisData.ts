"use client";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { fetcher } from "@/lib/fetcher";
import { API_URL } from "@/lib/config";

export function useUsersAnalysisData() {
  const router = useRouter();

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
      return res;
    },
    {
      refreshInterval: 60_000, // 10 second polling
      revalidateOnFocus: false, // disable refetch on window/tab focus
      revalidateOnReconnect: false, // disable refetch on reconnect
      dedupingInterval: 60_000, // prevent duplicate requests within 10 second
    }
  );

  return swr;
}
