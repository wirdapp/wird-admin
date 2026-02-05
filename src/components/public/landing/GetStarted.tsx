import { LayoutGrid, Lock, UserPlus, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { AppLinks } from "components/public/landing/app-links";
import { Button } from "components/ui/button";
import { Card, CardContent } from "components/ui/card";
import { Section } from "./Section";

export const GetStarted = () => {
	const { t } = useTranslation();

	return (
		<Section
			title={t("GetStartedSection.title")}
			id="get-started"
			description={t("GetStartedSection.description")}
			classNames={{ wrapper: "text-center" }}
		>
			<div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 w-full pt-8">
				<Card className="w-full">
					<CardContent className="flex flex-col items-center gap-3 text-center px-4 py-6">
						<LayoutGrid className="h-10 text-[#fb862b]" />
						<h3 className="text-lg text-gray-700 mb-4 font-bold">
							{t("GetStartedSection.startContest")}
						</h3>
						<p className="mb-4">{t("GetStartedSection.asTeacherSignUp")}</p>
						<div className="flex gap-3 justify-center items-center mt-auto">
							<Button render={<Link to="/login" />}>
								<Lock className="h-5 w-5" />
								{t("GetStartedSection.login")}
							</Button>
							<Button render={<Link to="/signup" />}>
								<UserPlus className="h-5 w-5" />
								{t("GetStartedSection.signup")}
							</Button>
						</div>
					</CardContent>
				</Card>
				<Card className="w-full">
					<CardContent className="flex flex-col items-center gap-3 text-center px-4 py-6">
						<Users className="h-10 text-[#fb862b]" />
						<h3 className="text-lg text-gray-700 mb-4 font-bold">
							{t("GetStartedSection.downloadNow")}
						</h3>
						<p className="mb-4">
							{t("GetStartedSection.asStudentDownloadApp")}
						</p>
						<AppLinks />
					</CardContent>
				</Card>
			</div>
		</Section>
	);
};
