import React, { useEffect, useState } from "react";
import { HomeContainer } from "./home.styles";
import HomeBanner from "./HomeBanner";
import TopRanks from "./TopRanks";
import { useDashboardData } from "../../util/routes-data";
import { MembersService } from "../../services/members/members.service";
import { getFullName } from "../../util/user-utils";
import { ContestResultsService } from "../../services/contest-results/contest-results.service";
import { ContestDetailsBox } from "../Competition/contest-details-box";
import { ContestPerson, LeaderboardEntry } from "../../types";

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
