import {
  IconTrendingUp,
  IconUsers,
  IconWallet,
  IconUserCheck,
  IconCoin,
  IconDiamond,
  IconHeart,
  IconLayoutGrid,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { useAnalysisStore } from "@/store/analysisStore";


export function SectionCards() {
  const {
    totalCoin,
    totalUsers,
    activeUsers,
    activeUserPercent,
    totalRoomsCreated,
    totalDiamond,
    totalLives,
    todayRoomSettled
  } = useAnalysisStore();

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 xl:grid-cols-6 @5xl/main:grid-cols-3">
      <Card className="@container/card">
    <CardHeader className="flex items-center justify-between pb-2">
    <CardTitle className="text-sm font-medium text-muted-foreground">
      Users Overview
    </CardTitle>
    <IconUsers className="h-5 w-5 text-primary" />
  </CardHeader>
  <CardContent className="space-y-3">
    <div className="text-3xl font-bold tabular-nums">{totalUsers}</div>
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <IconUserCheck className="h-4 w-4 text-green-500" />
        Active Users
      </div>
      <div className="tabular-nums font-semibold">{activeUsers}</div>
    </div>
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span className="flex items-center gap-1">
        <IconTrendingUp className="h-4 w-4 text-green-500" />
        Active %
      </span>
      <Badge variant="outline" className="text-xs">
        {activeUserPercent}%
      </Badge>
    </div>
    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
      <div
        className="bg-green-500 h-full transition-all duration-300"
        style={{ width: `${activeUserPercent}%` }}
      />
    </div>
  </CardContent>
</Card>

      <Card className="@container/card">
  <CardHeader className="flex items-center justify-between pb-2">
    <CardTitle className="text-sm font-medium text-muted-foreground">
      Rooms Overview
    </CardTitle>
    <IconLayoutGrid className="h-5 w-5 text-primary" />
  </CardHeader>
  <CardContent className="space-y-3">
    <div className="text-3xl font-bold tabular-nums">{totalRoomsCreated}</div>

    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <IconTrendingUp className="h-4 w-4 text-blue-500" />
        Created Today
      </div>
      <div className="tabular-nums font-semibold">{todayRoomSettled}</div>
    </div>

    {totalRoomsCreated > 0 && (
      <>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <IconTrendingUp className="h-4 w-4 text-blue-500" />
            Daily Share
          </span>
          <Badge variant="outline" className="text-xs">
            {Math.round((todayRoomSettled / totalRoomsCreated) * 100)}%
          </Badge>
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{
              width: `${(todayRoomSettled / totalRoomsCreated) * 100}%`,
            }}
          />
        </div>
      </>
    )}
  </CardContent>
</Card>

      <Card className="@container/card">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total User Wallet
          </CardTitle>
          <IconWallet className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <IconCoin className="h-4 w-4" />
              Coins
            </span>
            <span className="text-lg font-semibold tabular-nums">
              {totalCoin}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <IconDiamond className="h-4 w-4" />
              Diamonds
            </span>
            <span className="text-lg font-semibold tabular-nums">
              {totalDiamond}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <IconHeart className="h-4 w-4" />
              Lives
            </span>
            <span className="text-lg font-semibold tabular-nums">
              {totalLives}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
