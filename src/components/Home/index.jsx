import React, { useEffect, useState } from "react";
import { HomeContainer } from "./home.styles";
import HomeBanner from "./HomeBanner";
import TopRanks from "./TopRanks";
import { useDashboardData } from "../../util/routes-data";
import { useTranslation } from "react-i18next";
import { MembersApi } from "../../services/members/api";
import { getFullName } from "../../util/user-utils";
import { ContestResultsApi } from "../../services/contest-results/api";
import { ContestDetailsBox } from "../Competition/contest-details-box";

function Home() {
  const { currentUser, currentContest } = useDashboardData();
  const { t } = useTranslation();
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [topMembersLoading, setTopMembersLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [topMembers, setTopMembers] = useState([]);

  const initStudents = async () => {
    try {
      setStudentsLoading(true);
      const students = await MembersApi.getMembers({
        contestId: currentContest.id,
      });
      setStudents(students);
    } catch (err) {
      console.log("Failed to retrieve students : ", err.data);
    } finally {
      setStudentsLoading(false);
    }
  };

  const initTopMembers = async () => {
    try {
      setTopMembersLoading(true);
      const topMembers = await ContestResultsApi.leaderboard({
        contestId: currentContest.id,
      });
      setTopMembers(topMembers?.slice(0, 3) ?? []);
    } catch (err) {
      console.log("Failed to retrieve top members : ", err.data);
    } finally {
      setTopMembersLoading(false);
    }
  };

  useEffect(() => {
    if (!currentContest) return;
    initStudents();
    initTopMembers();
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
