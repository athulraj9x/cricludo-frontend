import { format } from "date-fns";
import { ChartDataPoint, Game, StatsByUser, Timeframe, User, UserStats } from "./type";

export function getFormattedDate(dateStr: string, timeframe: Timeframe): string {
  const date = new Date(dateStr);
  switch (timeframe) {
    case 'daily':
      return format(date, 'yyyy-MM-dd');
    case 'monthly':
      return format(date, 'yyyy-MM');
    case 'yearly':
      return format(date, 'yyyy');
    default:
      return '';
  }
}

export function generateChartData(
  users: User[],
  gameRooms: Game[],
  timeframe: Timeframe
): ChartDataPoint[] {
  const dataMap = new Map<string, ChartDataPoint>();

  // Process users
  users.forEach(user => {
    const key = getFormattedDate(user.createdAt, timeframe);
    if (!dataMap.has(key)) {
      dataMap.set(key, { date: key, userCount: 0, gameRoomCount: 0 });
    }
    dataMap.get(key)!.userCount += 1;
  });

  // Process game rooms
  gameRooms.forEach(room => {
    const key = getFormattedDate(room.settledAt, timeframe);
    if (!dataMap.has(key)) {
      dataMap.set(key, { date: key, userCount: 0, gameRoomCount: 0 });
    }
    dataMap.get(key)!.gameRoomCount += 1;
  });

  // Return sorted array
  return Array.from(dataMap.values()).sort((a, b) => a.date.localeCompare(b.date));
}


export function generateStats(games: Game[], users: User[]): StatsByUser {
  const stats: StatsByUser = {};
  const userMap = new Map(users.map((u) => [u._id, u]));

  games.forEach((game) => {
    const settledDate = new Date(game.settledAt);
    const dayKey = settledDate.toISOString().split("T")[0];
    const monthKey = `${settledDate.getFullYear()}-${String(
      settledDate.getMonth() + 1
    ).padStart(2, "0")}`;
    const yearKey = `${settledDate.getFullYear()}`;

    const keys = { daily: dayKey, monthly: monthKey, yearly: yearKey };

    // Track room creator
    const creatorId = game.roomCreatedBy;
    if (creatorId) {
      if (!stats[creatorId]) {
        stats[creatorId] = initUserStats();
      }
      stats[creatorId].roomsCreated += 1;
    }

    // Process each player in the room
    game.players.forEach((player: any) => {
      const userId = player.userId;
      const user = userMap.get(userId);

      if (!userId) return;

      if (!stats[userId]) {
        stats[userId] = initUserStats();
      }

      // Track game summary stats
      stats[userId].totalGamesPlayed += 1;

      // Determine if this user won
      const result = game.result.find((r: any) => r.userId === userId);
      const didWin = result && result.rank === 1;

      if (didWin) {
        stats[userId].totalWins += 1;
      } else {
        stats[userId].totalLosses += 1;
      }

      // Time-based stats (daily/monthly/yearly)
      for (const period of ["daily", "monthly", "yearly"] as const) {
        const timeKey = keys[period];
        const periodStats = stats[userId][period];

        if (!periodStats[timeKey]) {
          periodStats[timeKey] = { gamesPlayed: 0, wins: 0, losses: 0 };
        }

        const current = periodStats[timeKey];
        current.gamesPlayed += 1;
        if (didWin) current.wins += 1;
        else current.losses += 1;
      }

      const opponentIds = game.players
        .map((p) => p.userId)
        .filter((id) => id !== userId)
        .map((id) => userMap.get(id)?.username || id);

      stats[userId].matches.push({
        id: game._id,
        date: settledDate.toISOString(),
        result: didWin ? "win" : "loss",
        opponents: opponentIds,
        roomId: game.roomId,
        gameType: game.gameType,
        category: game.category,
        winnerPrize: game.players[0].winnerPrize,
        totalOver: game.result.find((p: any)=> p.rank === 1)?.totalOver || 0,
        entryValue: game.players[0].entryValue,
        coinType: game.players[0].coinType,

      });
    });
  });

  return stats;
}

export function initUserStats(): UserStats {
  return {
    daily: {},
    monthly: {},
    yearly: {},
    totalGamesPlayed: 0,
    totalWins: 0,
    totalLosses: 0,
    roomsCreated: 0,
    matches: [],
  };
}

export function mergeGameData(gameResults: any[], gameSessions: any[]): any[] {
    // Create a map for fast lookup of session data by gameId
    const sessionMap: Record<string, any> = {};
    for (const session of gameSessions) {
        sessionMap[session.gameId] = session;
    }

    // Merge game result data with matching session data using roomId ↔ gameId
    const mergedData = gameResults.map(result => {
        const session = sessionMap[result.roomId];
        return {
            ...result,
            ...session
        };
    });

    return mergedData;
}

export function countGamesSettledToday(games: any) {
  const today = new Date();
  
  return games.filter((game: any) => {
    const settledDate = new Date(game.settledAt?.$date || game.settledAt);
    return (
      settledDate.getFullYear() === today.getFullYear() &&
      settledDate.getMonth() === today.getMonth() &&
      settledDate.getDate() === today.getDate()
    );
  }).length;
}