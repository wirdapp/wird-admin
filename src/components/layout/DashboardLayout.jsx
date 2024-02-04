import React from "react";
import Sidebar from "../shared/Sidebar";
import { Container, DashboardFooter, MainContent } from "./layout.styles";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router-dom";
import { useDashboardData } from "../../util/routes-data";
import { NoContestYet } from "../Competition/no-contest-yet";
import { useTranslation } from "react-i18next";
import { EmailNotVerifiedAlert } from "./email-not-verified-alert";
import { isAtLeastAdmin } from "../../util/ContestPeople_Role";
import { Result } from "antd";

export const DashboardLayout = () => {
  const { t } = useTranslation();
  const { currentContest, currentUser } = useDashboardData();

  const canAccessAdminPanel = isAtLeastAdmin(currentUser?.role);

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Navbar />
        {canAccessAdminPanel ? (
          <>
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
          </>
        ) : (
          <div className="page-content">
            <Result
              status="403"
              title={t("forbidden")}
              subTitle={t("notAdmin")}
            />
          </div>
        )}
      </MainContent>
    </Container>
  );
};
