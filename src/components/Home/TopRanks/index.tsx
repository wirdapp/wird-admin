import type React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import SeeMore from "../../../assets/icons/Home/SeeMore.svg";
import type { ContestPerson, LeaderboardEntry } from "../../../types";
import { getFullName, getInitials } from "../../../util/user-utils";
import NumberAndAbbreviationOfNames from "../../shared/NumberAndAbbreviationOfNames";

interface TopRanksProps {
	topMembers: LeaderboardEntry[];
	topMembersLoading: boolean;
	students: ContestPerson[];
	studentsLoading: boolean;
}

function TopRanks({
	topMembers,
	topMembersLoading,
	students,
	studentsLoading,
}: TopRanksProps): React.ReactElement {
	const { t } = useTranslation();

	return (
		<div className="flex w-full mx-auto rounded-3xl">
			<div className="flex flex-col p-0 gap-[2.625rem] m-6 w-full min-[900px]:flex-row">
				{/* Participants section */}
				<div className="flex flex-col justify-center items-start p-0 gap-3 h-auto min-[900px]:w-[18.375rem]">
					{/* Title row */}
					<div className="flex justify-between w-full h-5">
						<div className="h-[1.1875rem] font-bold text-base leading-5 text-center text-black">
							{t("participants")}
						</div>

						<Link
							to="/dashboard/participants"
							className="no-underline flex flex-row items-start p-0 gap-[0.375rem] w-[4.875rem] h-5"
						>
							<div className="w-[3.25rem] h-[1.1875rem] font-normal text-base leading-5 text-right text-[#ff5367]">
								{t("see-all")}
							</div>
							<img src={SeeMore} alt="" />
						</Link>
					</div>

					{/* Participants numbers */}
					<div className="flex flex-row items-center p-6 gap-6 w-full bg-[#fbf9f7] rounded-3xl justify-start flex-1 max-[500px]:p-[1rem_0.75rem] max-[500px]:gap-[0.125rem] max-[500px]:justify-center">
						{!studentsLoading ? (
							<>
								<div className="w-[4.875rem] h-[3.625rem] font-bold text-5xl leading-[3.6875rem] text-black max-[500px]:h-[2.1875rem] max-[500px]:text-[2.1875rem] max-[500px]:leading-[2.1875rem]">
									{students?.length ?? 0}
								</div>
								<NumberAndAbbreviationOfNames users={students ?? []} />
							</>
						) : (
							<Spinner />
						)}
					</div>
				</div>

				{/* Top 3 ranks section */}
				<div className="flex flex-col items-start p-0 gap-3 w-full h-auto flex-1">
					{/* Title row */}
					<div className="flex justify-between w-full h-5">
						<div className="h-[1.1875rem] font-bold text-base leading-5 text-center text-black">
							{t("top-3-rank")}
						</div>

						<Link
							to="/dashboard/leaderboard"
							className="no-underline flex flex-row items-start p-0 gap-[0.375rem] w-[4.875rem] h-5"
						>
							<div className="w-[3.25rem] h-[1.1875rem] font-normal text-base leading-5 text-right text-[#ff5367]">
								{t("see-all")}
							</div>
							<img src={SeeMore} alt="" />
						</Link>
					</div>

					{/* Top 3 ranks content */}
					<div className="flex flex-row items-center p-6 gap-6 w-full bg-[#fbf9f7] rounded-3xl justify-start flex-1 max-[500px]:p-[1rem_0.75rem] max-[500px]:gap-[0.125rem] max-[500px]:justify-center">
						{!topMembersLoading ? (
							(topMembers?.length ?? 0) > 0 ? (
								<div className="flex flex-row gap-4 w-full p-0 justify-start max-[1400px]:flex-col">
									{(topMembers ?? []).map((topMember, i) => (
										<Link
											to={`/dashboard/results/members?userId=${topMember.id}`}
											key={i}
											className={cn(
												"flex flex-row items-center py-[10px] px-4 gap-2 rounded-[14px] bg-transparent transition-all text-[#444] hover:bg-white hover:text-black no-underline",
												"max-[1400px]:mt-[0.3125rem]",
											)}
										>
											<Avatar
												className={cn(
													"h-10 w-10 rounded-xl",
													i === 0 && "bg-[#fb6d3b] text-white",
													i === 1 && "bg-[#fb6d3b]/60",
													i === 2 && "bg-[#fb6d3b]/25",
												)}
											>
												<AvatarFallback
													className={cn(
														"rounded-xl text-sm font-bold",
														i === 0 && "bg-[#fb6d3b] text-white",
														i === 1 && "bg-[#fb6d3b]/60",
														i === 2 && "bg-[#fb6d3b]/25",
													)}
												>
													{getInitials(topMember.person_info)}
												</AvatarFallback>
											</Avatar>
											<div className="font-bold text-base leading-5">
												{getFullName(topMember.person_info)}
											</div>
										</Link>
									))}
								</div>
							) : (
								<div className="text-center italic font-normal text-[#a79f97] w-full">No data</div>
							)
						) : (
							<Spinner />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default TopRanks;
