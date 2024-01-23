import React from "react";
import Sidebar from "../shared/Sidebar";
import { Container, MainContent } from "./layout.styles";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router-dom";
import { useDashboardData } from "../../util/routes-data";
import { NoContestYet } from "../Competition/no-contest-yet";

export const DashboardLayout = () => {
  const { currentContest } = useDashboardData();

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Navbar />
        <div className="page-content">
          {currentContest ? <Outlet /> : <NoContestYet />}
        </div>
      </MainContent>
    </Container>
  );
};
