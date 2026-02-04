import React from "react";
import Loader from "../Loader";
import { LeaderBoardMain } from "./TopStudents.styles";
import { useDashboardData } from "../../util/routes-data";
import { ContestStatus } from "../../services/contests/utils";
import { LeaderboardList } from "./leaderboard-list";
import { useLeaderboard } from "../../services/contest-results/queries";

export const colors = ["#503E9D", "#FB862C", "#FF5367", "#FDD561", "#FFBAC2"];

export function getColor(index) {
  return colors[index % colors.length];
}

export default function Leaderboard() {
  const { currentContest } = useDashboardData();
  const isContestNotStarted =
    currentContest?.status === ContestStatus.NOT_STARTED;

  const { data: topStudents = [], isLoading } = useLeaderboard(currentContest?.id, {
    enabled: !isContestNotStarted && !!currentContest?.id,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <LeaderBoardMain>
      <LeaderboardList topStudents={topStudents} />
    </LeaderBoardMain>
  );
}
