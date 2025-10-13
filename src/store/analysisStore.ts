import { create } from "zustand";

interface AnalysisState {
  loading: boolean;
  setLoading: (b: boolean) => void;
  totalUsers: number;
  setTotalUsers: (n: number) => void;
  activeUsers: number;
  setActiveUsers: (n: number) => void;
  activeUserPercent: string;
  setActiveUserPercent: (s: string) => void;

  totalRoomsCreated: number;
  setTotalRoomsCreated: (n: number) => void;

  todayRoomSettled: number;
  setTodayRoomSettled: (r: number) => void;
  totalCoin: number;
  setTotalCoin: (n: number) => void;
  chartData: any;
  setChartData: (c: any) => void;

  totalDiamond: number;
  setTotalDiamond: (n: number) => void;
  totalLives: number;
  setTotalLives: (n: number) => void;
  roomsByDate: Record<string, number>;
  setRoomsByDate: (r: Record<string, number>) => void;
  userTableData: any[];
  setUserTableData: (d: any[]) => void;
}

export const useAnalysisStore = create<AnalysisState>()((set) => ({
  loading: false,
  setLoading: (b) => set({ loading: b }),
  totalUsers: 0,
  setTotalUsers: (n) => set({ totalUsers: n }),
  activeUsers: 0,
  setActiveUsers: (n) => set({ activeUsers: n }),
  activeUserPercent: "0.00",
  setActiveUserPercent: (s) => set({ activeUserPercent: s }),
  chartData: {daily: [], monthly: [], yearly: []},
  setChartData: (c) => set({chartData: c}),
  totalRoomsCreated: 0,
  setTotalRoomsCreated: (n) => set({ totalRoomsCreated: n }),
  todayRoomSettled: 0,
  setTodayRoomSettled: (r) => set({todayRoomSettled: r}),
  totalCoin: 0,
  setTotalCoin: (n) => set({ totalCoin: n }),
  totalDiamond: 0,
  setTotalDiamond: (n) => set({ totalDiamond: n }),
  totalLives: 0,
  setTotalLives: (n) => set({ totalLives: n }),
  roomsByDate: {},
  setRoomsByDate: (r) => set({ roomsByDate: r }),
  userTableData: [],
  setUserTableData: (d) => set({ userTableData: d }),
}));
