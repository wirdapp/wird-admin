import { CalendarIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { DailySubmissionSummary, TopThreeUser } from "../../../types";
import { getFullName } from "../../../util/user-utils";
import { Avatar } from "../../shared/Avatar";

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
		const todayItem = document.querySelector(".results-overview-list-item.today");
		if (todayItem && listRef.current) {
			listRef.current.scrollTop = (todayItem as HTMLElement).offsetTop - 150;
		}
	}, []);

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
		navigate(`../results/members?userId=${user.id}`);
	};

	return (
		<TooltipProvider>
			{/* Header - hidden on mobile */}
			<div className="hidden lg:flex gap-4 py-2 px-4 items-center justify-between bg-muted/50 rounded-t-lg">
				<div className="min-w-[200px]">{t("day")}</div>
				<div className="min-w-[200px]">{t("no-of-submissions")}</div>
				<div className="min-w-[200px]">{t("top-3")}</div>
			</div>

			{/* List wrapper */}
			<div className="relative bg-muted/50 rounded-b-lg overflow-clip">
				{/* Top overflow indicator */}
				<div
					className={cn(
						"absolute left-0 top-0 w-full h-10 pointer-events-none opacity-0 invisible transition-all duration-200",
						"bg-gradient-to-b from-muted to-transparent",
						topOverflow && "opacity-100 visible",
					)}
				/>
				{/* Bottom overflow indicator */}
				<div
					className={cn(
						"absolute left-0 bottom-0 w-full h-10 pointer-events-none opacity-0 invisible transition-all duration-200",
						"bg-gradient-to-t from-muted to-transparent",
						bottomOverflow && "opacity-100 visible",
					)}
				/>

				{/* List */}
				<div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto p-2" ref={listRef}>
					{results.map((result, resultIndex) => {
						const isToday = dayjs().isSame(result.date, "day");
						const isAfterToday = dayjs().isBefore(result.date, "day");
						return (
							<div
								key={result.date}
								className={cn(
									"results-overview-list-item flex flex-col lg:flex-row gap-4 p-4 bg-background rounded-lg lg:items-center lg:justify-between",
									isToday && "today",
									isAfterToday && "after-today opacity-30",
								)}
							>
								{/* Day cell */}
								<div className="flex gap-3 items-center min-w-[200px]">
									<div
										className={cn(
											"w-12 h-12 flex justify-center items-center rounded-xl",
											isToday
												? "bg-yellow-400 shadow-[0_0_0_3px_rgba(253,213,97,0.5)]"
												: "bg-red-100",
										)}
									>
										<CalendarIcon className="w-6 h-6 text-foreground" />
									</div>
									<div>
										<div className="text-sm font-bold text-foreground">
											{t("day")} {resultIndex + 1}{" "}
											{isToday && <span className="italic">({t("today")})</span>}
										</div>
										<div className="text-xs text-muted-foreground">
											{dayjs(result.date).format("DD MMM YYYY")}
										</div>
									</div>
								</div>

								{/* Submission count cell */}
								<div className="flex gap-2 items-center min-w-[200px]">
									<div className="lg:hidden text-sm">{t("no-of-submissions")}:</div>
									<span>{result.submission_count}</span>
								</div>

								{/* Top 3 cell */}
								<div className="flex gap-2 items-center min-w-[200px]">
									<div className="lg:hidden text-sm">{t("top-3")}:</div>
									<div className="flex">
										{result.top_three_by_day?.map((user, userIndex) => (
											<Tooltip key={user.id}>
												<TooltipTrigger asChild>
													<div
														className={cn(
															"inline-flex cursor-pointer transition-all duration-200",
															userIndex === 0 ? "ms-0" : "-ms-2.5 lg:-ms-2.5 hover:ms-1",
														)}
													>
														<Avatar
															user={user}
															colorIndex={resultIndex * 3 + userIndex}
															style={{ cursor: "pointer" }}
															onClick={() => navigateToUserResults(user)}
															className="shadow-[0_0_0_3px_white]"
														/>
													</div>
												</TooltipTrigger>
												<TooltipContent>
													<div className="flex flex-col gap-1">
														<span>{getFullName(user)}</span>
														<span>
															{t("points")}: {user?.points}
														</span>
													</div>
												</TooltipContent>
											</Tooltip>
										))}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</TooltipProvider>
	);
};
