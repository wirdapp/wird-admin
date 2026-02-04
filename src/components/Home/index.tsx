import type React from "react";
import { useEffect, useState } from "react";
import { ContestResultsService } from "../../services/contest-results/contest-results.service";
import { MembersService } from "../../services/members/members.service";
import type { ContestPerson, LeaderboardEntry } from "../../types";
import { useDashboardData } from "../../util/routes-data";
import { getFullName } from "../../util/user-utils";
import { ContestDetailsBox } from "../Competition/contest-details-box";
import HomeBanner from "./HomeBanner";
import { HomeContainer } from "./home.styles";
import TopRanks from "./TopRanks";

function Home(): React.ReactElement {
	const { currentUser, currentContest } = useDashboardData();
	const [studentsLoading, setStudentsLoading] = useState<boolean>(false);
	const [topMembersLoading, setTopMembersLoading] = useState<boolean>(false);
	const [students, setStudents] = useState<ContestPerson[]>([]);
	const [topMembers, setTopMembers] = useState<LeaderboardEntry[]>([]);

	const initStudents = async (): Promise<void> => {
		try {
			setStudentsLoading(true);
			const response = await MembersService.getMembers({
				contestId: currentContest!.id,
			});
			setStudents(response.results);
		} catch (err: unknown) {
			const error = err as { data?: unknown };
			console.log("Failed to retrieve students : ", error.data);
		} finally {
			setStudentsLoading(false);
		}
	};

	const initTopMembers = async (): Promise<void> => {
		try {
			setTopMembersLoading(true);
			const topMembers = await ContestResultsService.leaderboard({
				contestId: currentContest!.id,
			});
			setTopMembers(topMembers?.slice(0, 3) ?? []);
		} catch (err: unknown) {
			const error = err as { data?: unknown };
			console.log("Failed to retrieve top members : ", error.data);
		} finally {
			setTopMembersLoading(false);
		}
	};

	useEffect(() => {
		if (!currentContest) return;
		initStudents();
		initTopMembers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentContest]);

	return (
		<HomeContainer>
			<HomeBanner name={getFullName(currentUser)} />
			{currentContest && <ContestDetailsBox />}
			<TopRanks
				students={students}
				topMembers={topMembers}
				studentsLoading={studentsLoading}
				topMembersLoading={topMembersLoading}
			/>
		</HomeContainer>
	);
}

export default Home;
