import type React from "react";
import { useLeaderboard } from "../../services/contest-results/queries";
import { useDashboardData } from "../../util/routes-data";
import Loader from "../Loader";
import { LeaderboardList } from "./leaderboard-list";
import { LeaderBoardMain } from "./TopStudents.styles";

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
