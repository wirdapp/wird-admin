import React from "react";
import Loader from "../Loader";
import { LeaderBoardMain } from "./TopStudents.styles";
import { useDashboardData } from "../../util/routes-data";
import { LeaderboardList } from "./leaderboard-list";
import { useLeaderboard } from "../../services/contest-results/queries";

export const colors: string[] = ["#503E9D", "#FB862C", "#FF5367", "#FDD561", "#FFBAC2"];

export function getColor(index: number): string {
  return colors[index % colors.length];
}

export default function Leaderboard(): React.ReactElement {
  const { currentContest } = useDashboardData();

  const { data: topStudents = [], isLoading } = useLeaderboard(currentContest?.id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <LeaderBoardMain>
      <LeaderboardList topStudents={topStudents} />
    </LeaderBoardMain>
  );
}
