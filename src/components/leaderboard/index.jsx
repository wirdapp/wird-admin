import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { LeaderBoardMain } from "./TopStudents.styles";
import { useDashboardData } from "../../util/routes-data";
import { ContestResultsApi } from "../../services/contest-results/api";
import { ContestStatus } from "../../services/contests/utils";
import { LeaderboardList } from "./leaderboard-list";

export const colors = ["#503E9D", "#FB862C", "#FF5367", "#FDD561", "#FFBAC2"];

export function getColor(index) {
  return colors[index % colors.length];
}

export default function Leaderboard() {
  const [topStudents, setTopStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentContest } = useDashboardData();
  const isContestNotStarted =
    currentContest?.status === ContestStatus.NOT_STARTED;

  const loadTopStudents = async () => {
    setLoading(true);
    try {
      const result = await ContestResultsApi.leaderboard({
        contestId: currentContest.id,
      });
      setTopStudents(result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isContestNotStarted) return;
    loadTopStudents();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <LeaderBoardMain>
      <LeaderboardList topStudents={topStudents} />
    </LeaderBoardMain>
  );
}
