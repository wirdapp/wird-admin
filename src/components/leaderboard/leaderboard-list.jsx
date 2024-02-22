import React from "react";
import { Empty } from "antd";
import { css } from "@emotion/css";
import {
  StyledLeaderboardItem,
  StyledLeaderboardList,
  StyledResultsLink,
} from "./TopStudents.styles";
import { FaCrown } from "react-icons/fa6";
import { getFullName } from "../../util/user-utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useDashboardData } from "../../util/routes-data";
import { ContestStatus } from "../../services/contests/utils";
import { useTranslation } from "react-i18next";

export const LeaderboardList = ({ topStudents }) => {
  const { t, i18n } = useTranslation();
  const { currentContest } = useDashboardData();
  const isContestNotStarted =
    currentContest?.status === ContestStatus.NOT_STARTED;

  return isContestNotStarted || topStudents.length === 0 ? (
    <Empty
      className={css`
        margin-top: 50px;
      `}
      description={
        isContestNotStarted ? t("contestNotStarted") : t("noTopStudentsYet")
      }
    />
  ) : (
    <StyledLeaderboardList>
      {topStudents.map((student, index) => {
        const person = {
          first_name: student.person__first_name,
          last_name: student.person__last_name,
          username: student.person__username,
        };
        return (
          <StyledLeaderboardItem key={student.id}>
            {index < 3 && <FaCrown className="crown-icon" size={30} />}
            <div className="item-rank"> {index + 1}</div>
            <div className="item-content">
              <div className="item-details">
                <h3
                  className={css`
                    margin-bottom: 0;
                  `}
                >
                  {getFullName(person)}
                </h3>
                <StyledResultsLink
                  to={`/dashboard/results/members?userId=${student.id}`}
                >
                  {t("showResults")}{" "}
                  {i18n.dir() === "rtl" ? (
                    <ArrowLeftIcon />
                  ) : (
                    <ArrowRightIcon />
                  )}
                </StyledResultsLink>
              </div>
              <div className="item-points">
                <span className="item-points-label">{t("totalPoints")}</span>
                <span className="item-points-value">
                  {student.total_points}
                </span>
              </div>
            </div>
          </StyledLeaderboardItem>
        );
      })}
    </StyledLeaderboardList>
  );
};
