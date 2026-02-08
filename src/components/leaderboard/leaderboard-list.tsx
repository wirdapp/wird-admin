import { ArrowLeft, ArrowRight, Crown, User } from "lucide-react";
import type React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Empty } from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { ContestStatus } from "../../services/contests/utils";
import type { LeaderboardEntry } from "../../types";
import { useDashboardData } from "../../util/routes-data";
import { getLeaderboardFullName } from "../../util/user-utils";

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
				const crownBg = index === 0 ? "bg-yellow-50" : index === 1 ? "bg-gray-50" : "bg-amber-50";
				const glowColor =
					index === 0
						? "rgba(250, 204, 21, 0.15)"
						: index === 1
							? "rgba(156, 163, 175, 0.18)"
							: index === 2
								? "rgba(180, 83, 9, 0.12)"
								: undefined;

				return (
					<div
						key={student.id}
						className="relative flex items-center bg-wheat-warm border-2 border-white p-4 md:px-6 gap-4 max-w-[800px] mx-auto w-full rounded-2xl"
					>
						{glowColor && (
							<div
								className="absolute inset-0 rounded-2xl pointer-events-none"
								style={{
									background: `radial-gradient(circle at top ${i18n.dir() === "rtl" ? "left" : "right"}, ${glowColor} 0%, transparent 70%)`,
								}}
							/>
						)}
						{index < 3 && (
							<div
								className={cn(
									"absolute -top-2.5 -end-2.5 flex items-center justify-center w-8 h-8 rounded-full shadow-md shadow-black/25",
									crownBg,
								)}
							>
								<Crown className={crownColor} size={16} />
							</div>
						)}
						<span
							className={cn(
								"text-2xl shrink-0 w-5 text-center",
								index === 0 && "font-bold text-black/80",
								index === 1 && "font-bold text-black/50",
								index === 2 && "font-bold text-black/30",
								index > 2 && "font-normal text-black/20",
							)}
						>
							{index + 1}
						</span>
						<Avatar className="h-10 w-10 rounded-xl shrink-0">
							{student.person__profile_photo && (
								<AvatarImage
									src={student.person__profile_photo}
									alt={getLeaderboardFullName(student)}
									className="rounded-xl"
								/>
							)}
							<AvatarFallback className="rounded-xl">
								<User className="h-5 w-5 text-muted-foreground" />
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-row items-center justify-between flex-grow gap-2">
							<div className="flex flex-col items-start">
								<h3 className="mb-0 font-semibold">{getLeaderboardFullName(student)}</h3>
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
