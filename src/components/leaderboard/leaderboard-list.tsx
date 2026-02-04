import { css } from "@emotion/css";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Empty } from "antd";
import type React from "react";
import { useTranslation } from "react-i18next";
import { FaCrown } from "react-icons/fa6";
import { ContestStatus } from "../../services/contests/utils";
import type { LeaderboardEntry } from "../../types";
import { useDashboardData } from "../../util/routes-data";
import { getFullName } from "../../util/user-utils";
import {
	StyledLeaderboardItem,
	StyledLeaderboardList,
	StyledResultsLink,
} from "./TopStudents.styles";

interface LeaderboardListProps {
	topStudents: LeaderboardEntry[];
}

export const LeaderboardList: React.FC<LeaderboardListProps> = ({ topStudents }) => {
	const { t, i18n } = useTranslation();
	const { currentContest } = useDashboardData();
	const isContestNotStarted = currentContest?.status === ContestStatus.NOT_STARTED;

	return isContestNotStarted || topStudents.length === 0 ? (
		<Empty
			className={css`
        margin-top: 50px;
      `}
			description={isContestNotStarted ? t("contestNotStarted") : t("noTopStudentsYet")}
		/>
	) : (
		<StyledLeaderboardList>
			{topStudents.map((student, index) => {
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
									{getFullName(student.person_info)}
								</h3>
								<StyledResultsLink to={`/dashboard/results/members?userId=${student.id}`}>
									{t("showResults")} {i18n.dir() === "rtl" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
								</StyledResultsLink>
							</div>
							<div className="item-points">
								<span className="item-points-label">{t("totalPoints")}</span>
								<span className="item-points-value">{student.total_points}</span>
							</div>
						</div>
					</StyledLeaderboardItem>
				);
			})}
		</StyledLeaderboardList>
	);
};
