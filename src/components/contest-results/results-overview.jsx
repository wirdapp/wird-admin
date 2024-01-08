import React, { useEffect, useState } from "react";
import { ContestResultsApi } from "../../services/contest-results/api";
import { useTranslation } from "react-i18next";
import {
  StyledDayCell,
  StyledOverviewWrapper,
  StyledResultsOverviewHeader,
  StyledResultsOverviewListWrapper,
  StyledSubmissionCountCell,
  StyledTop3Cell,
} from "./results-overview.styles";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Badge } from "../../ui/badge";
import { Avatar } from "../shared/Avatar";
import { useNavigate } from "react-router-dom";
import { SubmissionsCountChart } from "./submissions-count-chart";
import dayjs from "dayjs";
import { cx } from "@emotion/css";

export const ResultsOverview = () => {
  const { t } = useTranslation();
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [topOverflow, setTopOverflow] = useState(false);
  const [bottomOverflow, setBottomOverflow] = useState(false);
  const listRef = React.useRef(null);

  useEffect(() => {
    ContestResultsApi.getResults().then((res) => {
      setResults(res.results);
    });
  }, []);

  useEffect(() => {
    const todayItem = document.querySelector(
      ".results-overview-list-item.today",
    );
    if (todayItem) {
      todayItem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [results]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const handleScroll = () => {
      setTopOverflow(list.scrollTop > 0);
      setBottomOverflow(list.scrollTop + list.clientHeight < list.scrollHeight);
    };
    list.addEventListener("scroll", handleScroll);
    return () => {
      list.removeEventListener("scroll", handleScroll);
    };
  }, [listRef.current]);

  const navigateToUserResults = (user) => {
    navigate({ search: `?user_id=${user.id}&tab=members` });
  };

  return (
    <StyledOverviewWrapper>
      <h3>{t("contest-submissions")}</h3>
      <SubmissionsCountChart chartData={results} />
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
            return (
              <div
                key={result.index}
                className={cx("results-overview-list-item", { today: isToday })}
              >
                <StyledDayCell>
                  <div className="icon">
                    <CalendarIcon />
                  </div>
                  <div>
                    <div className="day-index">
                      {t("day")} {result.index + 1}{" "}
                      {dayjs().isSame(result.date, "day") && (
                        <span className="today-indicator">({t("today")})</span>
                      )}
                    </div>
                    <div className="day-date">{result.date}</div>
                  </div>
                </StyledDayCell>
                <StyledSubmissionCountCell>
                  <div className="mobile-label">{t("no-of-submissions")}:</div>
                  <span>
                    {result.submissions_count} {t("of")} {result.total_members}
                  </span>
                  <Badge variant="secondary" size="small">
                    {(result.submissions_count / result.total_members) * 100}%
                  </Badge>
                </StyledSubmissionCountCell>
                <StyledTop3Cell>
                  <div className="mobile-label">{t("top-3")}:</div>
                  <div className="top-3-wrapper">
                    {result.top_three?.map((user, userIndex) => (
                      <Avatar
                        key={user.id}
                        user={user}
                        colorIndex={resultIndex * 3 + userIndex}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigateToUserResults(user)}
                      />
                    ))}
                  </div>
                </StyledTop3Cell>
              </div>
            );
          })}
        </div>
      </StyledResultsOverviewListWrapper>
    </StyledOverviewWrapper>
  );
};
