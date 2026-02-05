import { ArrowLeft, ArrowRight, Crown } from "lucide-react";
import type React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Empty } from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { ContestStatus } from "../../services/contests/utils";
import type { LeaderboardEntry } from "../../types";
import { useDashboardData } from "../../util/routes-data";
import { getFullName } from "../../util/user-utils";

interface LeaderboardListProps {
	topStudents: LeaderboardEntry[];
}

export const LeaderboardList: React.FC<LeaderboardListProps> = ({ topStudents }) => {
	const { t, i18n } = useTranslation();
	const { currentContest } = useDashboardData();
	const isContestNotStarted = currentContest?.status === ContestStatus.NOT_STARTED;

	if (isContestNotStarted || topStudents.length === 0) {
		return (
			<Empty
				className="mt-12"
				description={isContestNotStarted ? t("contestNotStarted") : t("noTopStudentsYet")}
			/>
		);
	}

	return (
		<div className="w-auto flex mx-auto gap-3 justify-center flex-col">
			{topStudents.map((student, index) => {
				const crownColor =
					index === 0 ? "text-yellow-400" : index === 1 ? "text-gray-400" : "text-amber-600";

				return (
					<div
						key={student.id}
						className="relative flex items-center bg-wheat-warm border-2 border-white p-4 md:px-6 gap-4 max-w-[800px] mx-auto w-full rounded-2xl"
					>
						{index < 3 && (
							<Crown className={cn("absolute -top-2.5 -end-2.5", crownColor)} size={30} />
						)}
						<div className="font-bold text-xs leading-7 text-white bg-brand-red w-[30px] h-[30px] text-center shrink-0 rounded-[10px] flex items-center justify-center">
							{index + 1}
						</div>
						<div className="flex flex-row items-center justify-between flex-grow gap-2">
							<div className="flex flex-col items-start">
								<h3 className="mb-0 font-semibold">{getFullName(student.person_info)}</h3>
								<Link
									to={`/dashboard/results/members?userId=${student.id}`}
									className="text-brand-red border-0 py-2 rounded text-xs font-semibold no-underline cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-1.5 hover:underline"
								>
									{t("showResults")}
									{i18n.dir() === "rtl" ? (
										<ArrowLeft className="w-3.5 h-3.5" />
									) : (
										<ArrowRight className="w-3.5 h-3.5" />
									)}
								</Link>
							</div>
							<div className="flex flex-col items-center justify-center gap-1">
								<span className="font-normal text-xs text-grey-dark whitespace-nowrap">
									{t("totalPoints")}
								</span>
								<span className="font-bold text-base leading-7 text-brand-red">
									{student.total_points}
								</span>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
