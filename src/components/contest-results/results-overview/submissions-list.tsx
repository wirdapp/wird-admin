import React, { useEffect, useState, useRef } from "react";
import {
  StyledDayCell,
  StyledResultsOverviewHeader,
  StyledResultsOverviewListWrapper,
  StyledSubmissionCountCell,
  StyledTop3Cell,
} from "./results-overview.styles";
import { cx } from "@emotion/css";
import dayjs from "dayjs";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Avatar } from "../../shared/Avatar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Space, Tooltip } from "antd";
import { getFullName } from "../../../util/user-utils";
import type { DailySubmissionSummary, TopThreeUser } from "../../../types";

interface SubmissionsListProps {
  results: DailySubmissionSummary[];
}

export const SubmissionsList: React.FC<SubmissionsListProps> = ({ results }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [topOverflow, setTopOverflow] = useState<boolean>(false);
  const [bottomOverflow, setBottomOverflow] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const todayItem = document.querySelector(
      ".results-overview-list-item.today",
    );
    if (todayItem && listRef.current) {
      listRef.current.scrollTop = (todayItem as HTMLElement).offsetTop - 150;
    }
  }, [results]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const handleScroll = (): void => {
      setTopOverflow(list.scrollTop > 0);
      setBottomOverflow(list.scrollTop + list.clientHeight < list.scrollHeight);
    };
    list.addEventListener("scroll", handleScroll);
    return () => {
      list.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigateToUserResults = (user: TopThreeUser): void => {
    navigate(`../results/members?user_id=${user.id}`);
  };

  return (
    <>
      <StyledResultsOverviewHeader>
        <StyledDayCell>{t("day")}</StyledDayCell>
        <StyledSubmissionCountCell>
          {t("no-of-submissions")}
        </StyledSubmissionCountCell>
        <StyledTop3Cell>{t("top-3")}</StyledTop3Cell>
      </StyledResultsOverviewHeader>

      <StyledResultsOverviewListWrapper>
        <div
          className={cx("overflow-indicator top", { visible: topOverflow })}
        />
        <div
          className={cx("overflow-indicator bottom", {
            visible: bottomOverflow,
          })}
        />
        <div className="results-overview-list" ref={listRef}>
          {results.map((result, resultIndex) => {
            const isToday = dayjs().isSame(result.date, "day");
            const isAfterToday = dayjs().isBefore(result.date, "day");
            return (
              <div
                key={result.date}
                className={cx("results-overview-list-item", {
                  today: isToday,
                  "after-today": isAfterToday,
                })}
              >
                <StyledDayCell>
                  <div className="icon">
                    <CalendarIcon />
                  </div>
                  <div>
                    <div className="day-index">
                      {t("day")} {resultIndex + 1}{" "}
                      {isToday && (
                        <span className="today-indicator">({t("today")})</span>
                      )}
                    </div>
                    <div className="day-date">
                      {dayjs(result.date).format("DD MMM YYYY")}
                    </div>
                  </div>
                </StyledDayCell>
                <StyledSubmissionCountCell>
                  <div className="mobile-label">{t("no-of-submissions")}:</div>
                  <span>{result.submission_count}</span>
                </StyledSubmissionCountCell>
                <StyledTop3Cell>
                  <div className="mobile-label">{t("top-3")}:</div>
                  <div className="top-3-wrapper">
                    {result.top_three_by_day?.map((user, userIndex) => (
                      <Tooltip
                        key={user.id}
                        title={
                          <Space direction="vertical">
                            <span>{getFullName(user)}</span>
                            <span>
                              {t("points")}: {user?.points}
                            </span>
                          </Space>
                        }
                      >
                        <Avatar
                          user={user}
                          colorIndex={resultIndex * 3 + userIndex}
                          style={{ cursor: "pointer" }}
                          onClick={() => navigateToUserResults(user)}
                        />
                      </Tooltip>
                    ))}
                  </div>
                </StyledTop3Cell>
              </div>
            );
          })}
        </div>
      </StyledResultsOverviewListWrapper>
    </>
  );
};
