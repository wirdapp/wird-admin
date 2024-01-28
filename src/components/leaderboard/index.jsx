import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import {
  LeaderBoardContainer,
  LeaderBoardMain,
  StudentPointsWrapper,
  Top2Img,
  TopStudentsSpan,
} from "./TopStudents.styles";
import { useTranslation } from "react-i18next";
import { useDashboardData } from "../../util/routes-data";
import { getFullName, getInitials } from "../../util/user-utils";
import { ContestResultsApi } from "../../services/contest-results/api";
import { Empty, Space } from "antd";
import { css } from "@emotion/css";
import { Link } from "react-router-dom";
import { colors as themeColors } from "../../styles";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ContestStatus } from "../../services/contests/utils";

const colors = ["#503E9D", "#FB862C", "#FF5367", "#FDD561", "#FFBAC2"];

function getColor(index) {
  return colors[index % colors.length];
}

export default function Leaderboard() {
  const [topStudents, setTopStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
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
      {isContestNotStarted || topStudents.length === 0 ? (
        <Empty
          className={css`
            margin-top: 50px;
          `}
          description={
            isContestNotStarted ? t("contestNotStarted") : t("noTopStudentsYet")
          }
        />
      ) : (
        <LeaderBoardContainer>
          {topStudents.map((student, index) => {
            const person = {
              first_name: student.person__first_name,
              last_name: student.person__last_name,
              username: student.person__username,
            };
            return (
              <StudentPointsWrapper
                key={student.id}
                golden={index === 0}
                silver={index === 1}
                bronze={index === 2}
              >
                <TopStudentsSpan> #{index + 1}</TopStudentsSpan>

                <Top2Img style={{ background: getColor(index) }}>
                  {getInitials(person)}
                </Top2Img>
                <Space direction="vertical">
                  <h3
                    className={css`
                      margin-bottom: 0;
                    `}
                  >
                    {getFullName(person)}
                  </h3>
                  <div>
                    <span>{t("totalPoints")}: </span>
                    <span>{student.total_points}</span>
                  </div>
                </Space>
                <Link
                  to={`/dashboard/results/members?userId=${student.id}`}
                  className={css`
                    margin-inline-start: auto;
                    color: ${themeColors.red};
                    border: 0;
                    padding: 10px 20px;
                    border-radius: 5px;
                    font-size: 14px;
                    font-weight: 600;
                    text-decoration: none;
                    cursor: pointer;
                    transition: all 0.3s ease-in-out;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;

                    svg {
                      width: 14px;
                      height: 14px;
                    }

                    &:hover {
                      background-color: ${themeColors.red};
                      color: #fff;
                    }
                  `}
                >
                  {t("showResults")}{" "}
                  {i18n.dir() === "rtl" ? (
                    <ArrowLeftIcon />
                  ) : (
                    <ArrowRightIcon />
                  )}
                </Link>
              </StudentPointsWrapper>
            );
          })}
        </LeaderBoardContainer>
      )}
    </LeaderBoardMain>
  );
}
