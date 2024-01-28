import React from "react";
import Sidebar from "../shared/Sidebar";
import { Container, DashboardFooter, MainContent } from "./layout.styles";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router-dom";
import { useDashboardData } from "../../util/routes-data";
import { NoContestYet } from "../Competition/no-contest-yet";
import { useTranslation } from "react-i18next";
import { EmailNotVerifiedAlert } from "./email-not-verified-alert";

export const DashboardLayout = () => {
  const { t } = useTranslation();
  const { currentContest, currentUser } = useDashboardData();

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Navbar />
        {!currentUser.email_verified && <EmailNotVerifiedAlert />}
        <div className="page-content">
          {currentContest ? <Outlet /> : <NoContestYet />}
        </div>
        <DashboardFooter>
          <div className="footer-content">
            <span>
              {t("copyrightFooterMsg", { year: new Date().getFullYear() })}
            </span>
          </div>
        </DashboardFooter>
      </MainContent>
    </Container>
  );
};
