import type React from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemberResults } from "../../../services/contest-results/queries";
import { Role } from "../../../util/roles";
import { getFullName, getInitials } from "../../../util/user-utils";
import { DailyUserSubmissions } from "./daily-user-submissions";
import { MemberScorePerCategoryChart } from "./member-score-per-category-chart";
import { MemberScorePerDayChart } from "./member-score-per-day-chart";
import { MembersSelect } from "./members-select";

export const MembersResults: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { t } = useTranslation();
	const userId = searchParams.get("userId");

	const { data: result, isLoading: loading, refetch } = useMemberResults(userId ?? undefined);

	const reload = async (): Promise<void> => {
		await refetch();
	};

	const handleUserChange = (value: string | null): void => {
		if (value) {
			setSearchParams(new URLSearchParams({ userId: value }));
		}
	};

	return (
		<div className="flex flex-col gap-4 h-full">
			{/* Side filters */}
			<div className="w-full max-w-[350px]">
				<div className="flex flex-col gap-2">
					<Label>{t("selectMember")}</Label>
					<MembersSelect
						placeholder={t("selectMember")}
						role={Role.MEMBER}
						value={userId ?? undefined}
						onValueChange={handleUserChange}
					/>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 min-h-[500px] bg-muted/50 p-4 md:p-8 -mx-3.5 md:mx-0 md:rounded-2xl border border-background relative overflow-hidden">
				{result || loading ? (
					<div className="flex flex-col gap-8">
						{/* User header */}
						{loading ? (
							<div className="flex items-center gap-4">
								<Skeleton className="h-16 w-16 rounded-full" />
								<div className="flex flex-col gap-2">
									<Skeleton className="h-6 w-40" />
									<Skeleton className="h-4 w-24" />
								</div>
							</div>
						) : (
							<div className="flex items-center gap-4">
								<Avatar className="h-16 w-16 bg-yellow-400 text-white">
									<AvatarFallback className="bg-yellow-400 text-white text-xl">
										{getInitials(result?.person_data)}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col">
									<h3 className="text-2xl font-semibold">{getFullName(result?.person_data)}</h3>
									<span className="text-muted-foreground">{result?.person_data?.username}</span>
								</div>
							</div>
						)}

						{/* Stats cards */}
						<div className="flex flex-wrap gap-4">
							<Card className="w-full md:max-w-[300px] shrink-0 border-none">
								<CardHeader className="pb-2">
									<CardTitle className="text-sm font-normal text-muted-foreground">
										{t("totalPoints")}
									</CardTitle>
								</CardHeader>
								<CardContent>
									{loading ? (
										<Skeleton className="h-8 w-20" />
									) : (
										<p className="text-3xl font-bold">{result?.total_points || 0}</p>
									)}
								</CardContent>
							</Card>
							<Card className="w-full md:max-w-[300px] shrink-0 border-none">
								<CardHeader className="pb-2">
									<CardTitle className="text-sm font-normal text-muted-foreground">
										{t("rank")}
									</CardTitle>
								</CardHeader>
								<CardContent>
									{loading ? (
										<Skeleton className="h-8 w-12" />
									) : (
										<p className="text-3xl font-bold">{result?.rank}</p>
									)}
								</CardContent>
							</Card>
						</div>

						{/* Charts row */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
							<Card className="border-none">
								<CardHeader>
									<CardTitle className="text-base">{t("pointsPerDay")}</CardTitle>
								</CardHeader>
								<CardContent>
									{loading ? (
										<Skeleton className="h-[250px] w-full" />
									) : (
										<MemberScorePerDayChart data={result?.days} />
									)}
								</CardContent>
							</Card>
							<Card className="border-none">
								<CardHeader>
									<CardTitle className="text-base">{t("scorePerCategory")}</CardTitle>
								</CardHeader>
								<CardContent>
									{loading ? (
										<Skeleton className="h-[250px] w-full" />
									) : (
										<MemberScorePerCategoryChart data={result?.scores} />
									)}
								</CardContent>
							</Card>
						</div>

						{/* Daily submissions */}
						<Card className="border-none">
							<CardHeader>
								<CardTitle className="text-base">{t("dailySubmissionsPopup.title")}</CardTitle>
							</CardHeader>
							<CardContent>
								{loading ? (
									<Skeleton className="h-[200px] w-full" />
								) : (
									<DailyUserSubmissions userId={result?.person_data?.id} onUpdated={reload} />
								)}
							</CardContent>
						</Card>
					</div>
				) : (
					<Empty description="Select a person to see results" className="mt-24" />
				)}
			</div>
		</div>
	);
};
