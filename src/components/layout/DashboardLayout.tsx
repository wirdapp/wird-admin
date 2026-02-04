import React from "react";
import Sidebar from "../shared/Sidebar";
import { Container, DashboardFooter, MainContent } from "./layout.styles";
import Navbar from "../shared/Navbar";
import { Outlet, useMatches } from "react-router-dom";
import { useDashboardData } from "../../util/routes-data";
import { NoContestYet } from "../Competition/no-contest-yet";
import { useTranslation } from "react-i18next";
import { EmailNotVerifiedAlert } from "./email-not-verified-alert";
import { isAtLeastAdmin } from "../../util/roles";
import { Result } from "antd";

export const DashboardLayout: React.FC = () => {
  const { t } = useTranslation();
  const { currentContest, currentUser } = useDashboardData();
  const matches = useMatches();
  const isProfilePage = matches.some((match) => match.id === "profile");

  const canAccessAdminPanel =
    isProfilePage || !currentContest || isAtLeastAdmin(currentUser?.role);

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Navbar />
        {!currentUser?.email_verified && <EmailNotVerifiedAlert />}
        {canAccessAdminPanel ? (
          <div className="page-content">
            {isProfilePage || currentContest ? <Outlet /> : <NoContestYet />}
          </div>
        ) : (
          <div className="page-content">
            <Result
              status="403"
              title={t("forbidden")}
              subTitle={t("notAdmin")}
            />
          </div>
        )}
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
