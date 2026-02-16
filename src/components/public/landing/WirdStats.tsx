import { StatCard } from "components/public/landing/StatsCard";
import { Globe, LayoutGrid, PenSquare, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGeneralStats } from "services/contests/queries";
import { getCountryFlagElement, getCountryName } from "util/countries";

export function WirdStats() {
	const { data: stats } = useGeneralStats();
	const { t, i18n } = useTranslation();
	const locale = i18n.language as "ar" | "en";

	if (!stats) {
		return null;
	}

	const sortedCountries = [...stats.countries].sort((a, b) => b.country_count - a.country_count);

	return (
		<div className="text-gray-500 px-6 lg:px-8 bg-[#fbf9f7] relative overflow-hidden">
			<img
				src="/assets/wirdLogo.svg"
				alt="Wird Logo"
				className="h-[170%] w-auto absolute block-end-0 inline-end-0 opacity-10"
			/>
			<div className="max-w-5xl mx-auto w-full flex flex-col items-center justify-center py-8 relative">
				<div className="text-2xl font-bold my-4 text-gray-500">{t("wirdStats.title")}</div>
				<div className="flex flex-col md:flex-row gap-6 md:gap-8 text-center py-4 w-full">
					<StatCard
						title={t("wirdStats.registeredMembers")}
						value={stats.members_count}
						icon={<Users className="h-10 text-rose-600" />}
					/>
					<StatCard
						title={t("wirdStats.createdContests")}
						value={stats.contest_count}
						icon={<LayoutGrid className="h-10 text-rose-600" />}
					/>
					<StatCard
						title={t("wirdStats.submissions")}
						value={stats.submission_count}
						icon={<PenSquare className="h-10 text-rose-600" />}
					/>
				</div>
				{sortedCountries.length > 0 && (
					<div className="flex flex-row flex-wrap gap-0 md:gap-4 items-start py-4 w-full md:items-center">
						<div className="flex gap-3 text-start p-4 w-full md:w-52">
							<Globe className="h-10 text-rose-600" />
							<div className="text-lg font-bold text-gray-600">
								{t("wirdStats.contestsPerCountry")}
							</div>
						</div>
						{sortedCountries
							.filter((c) => c.country)
							.slice(0, 3)
							.map((country) => {
								const Flag = getCountryFlagElement(country.country, locale, 30);
								return (
									<StatCard
										small
										ghost
										key={country.country}
										title={getCountryName(country.country, locale)}
										value={country.country_count}
										icon={<Flag className="h-10" />}
										classNames={{
											root: "p-6 min-w-[50%] w-1/2 md:min-w-0 md:w-auto",
										}}
									/>
								);
							})}
						{sortedCountries.length > 3 && (
							<StatCard
								ghost
								classNames={{
									root: "p-6 min-w-[50%] w-1/2 md:min-w-0 md:w-auto self-center",
									content: "justify-center",
								}}
								small
								title={
									<span
										dangerouslySetInnerHTML={{
											__html: t("wirdStats.inCountries", {
												count: sortedCountries.length - 3,
											}),
										}}
									/>
								}
								value={
									<span
										dangerouslySetInnerHTML={{
											__html: t("wirdStats.contestsCount", {
												count: sortedCountries
													.slice(3)
													.reduce((acc: number, c) => acc + c.country_count, 0),
											}),
										}}
									/>
								}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
