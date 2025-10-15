import { countGamesSettledToday, generateChartData, generateStats, mergeGameData } from "./helper";

export function prepareDashboardData(data: {
  analysisData: any[];
  users: any[];
  userwallets: any[];
  settledgames: any[];
}): {
  totalUsers: number;
  activeUsers: number;
  activeUserPercent: string;
  totalRoomsCreated: number;
  chartData: any;
  totalCoin: number;
  todayRoomSettled: number;
  totalDiamond: number;
  totalLives: number;
  roomsByDate: Record<string, number>;
  userTableData: any[];
} {
  const { analysisData, users, userwallets, settledgames } = data;
  // 1. Aggregate total users and active users
  const totalUsers = users.length;
  const activeUsers = users.filter(
    (user) => user.status === "1" || user.isActive === true
  ).length;
  const activeUserPercent = ((activeUsers / totalUsers) * 100).toFixed(2);

  // 2. Total rooms created
  const totalRoomsCreated = settledgames?.length || 0;

  // 3. Total wallet coins, diamonds, lives
  let totalCoin = 0,
    totalDiamond = 0,
    totalLives = 0;
  userwallets.forEach((wallet) => {
    totalCoin += wallet.coin || 0;
    totalDiamond += wallet.diamond || 0;
    totalLives += wallet.lives || 0;
  });

  // 4. Prepare graph data (rooms created daily, monthly, yearly)
  const roomsByDate: Record<string, number> = {};
  settledgames.forEach((room) => {
    const date = new Date(room.createdAt || room.settledAt || Date.now())
      .toISOString()
      .slice(0, 10); // yyyy-mm-dd
    roomsByDate[date] = (roomsByDate[date] || 0) + 1;
  });
  const usersChartData = generateStats(settledgames, users);
  const todayRoomSettled = countGamesSettledToday(settledgames)

  const userTableData = users.map((user) => {
    const analysis = (analysisData ?? []).find((a) => a.userId === user._id) || {};
    const wallet = (userwallets ?? []).find((w) => w.userId === user._id) || {};
    const userMatch = usersChartData[user._id]?.matches || [];
    const userGameSession = analysis?.gameSessions || [];

   

    return {
      profilePic:  user.profile_pic || analysis.profilePic || user.google_pic || "",
      username: user.username,
      email: user.email,
      active: user.status === "1" || user.isActive === true,
      totalRoomsCreated: usersChartData[user._id]?.roomsCreated || 0,
      totalGamesJoined: usersChartData[user._id]?.totalGamesPlayed || user?.gamesJoined || analysis?.gamesJoined || 0,
      wins: usersChartData[user._id]?.totalWins || user.wins || analysis.wins || 0,
      losses: usersChartData[user._id]?.totalLosses || user.losses || analysis.losses || 0,
      coinsDistributed: analysis.coinsDistributed || 0,
      coin: wallet.coin || 0,
      diamond: wallet.diamond || 0,
      live: wallet.lives || 0,
      totalTimeSpent: analysis.totalTimeSpent || 0,
      loginHistory: analysis.loginHistory || [],
      gameSessions: analysis.gameSessions || [],
      activityStats: analysis.activityStats || [],
      id: user._id,
      isVIP: user.vip_user || false,
      isGuest: user.is_guest || false,
      isAgent: user.is_agent || false,
      followerCount: user.followersCount || 0,
      followingCount: user.followingCount || 0,
      rating: user.rating || 0,
      lastLogin: user.last_login || "N/A",
      userChartData: { daily: usersChartData[user._id]?.daily || {}, monthly: usersChartData[user._id]?.monthly || {}, yearly: usersChartData[user._id]?.yearly || {}},
      userMatches: mergeGameData(userMatch,userGameSession)
    };
  });
  const chartData = {daily: generateChartData(users, settledgames, 'daily'),
     monthly: generateChartData(users, settledgames , 'monthly'), yearly : generateChartData(users, settledgames, 'yearly')};
  // useAnalysisStore.getState().setTotalUsers(totalUsers);
  // useAnalysisStore.getState().setActiveUsers(activeUsers);
  // useAnalysisStore.getState().setActiveUserPercent(activeUserPercent);
  // useAnalysisStore.getState().setTotalRoomsCreated(totalRoomsCreated);
  // useAnalysisStore.getState().setTotalCoin(totalCoin);
  // useAnalysisStore.getState().setTotalDiamond(totalDiamond);
  // useAnalysisStore.getState().setTotalLives(totalLives);
  // useAnalysisStore.getState().setRoomsByDate(roomsByDate);
  // useAnalysisStore.getState().setUserTableData(userTableData);

  return {
    totalUsers,
    activeUsers,
    chartData,
    activeUserPercent,
    totalRoomsCreated,
    todayRoomSettled,
    totalCoin,
    totalDiamond,
    totalLives,
    roomsByDate,
    userTableData,
  };
}