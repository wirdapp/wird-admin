import { useTranslation } from "react-i18next";
import { AppLinks } from "components/public/landing/app-links";
import { Card, CardContent } from "components/ui/card";
import { Section } from "./Section";

export const OurService = () => {
	const { t } = useTranslation();

	return (
		<Section
			id="our-service"
			title={t("ServiceSection.title")}
			description={t("ServiceSection.description")}
		>
			<div className="flex flex-col gap-8">
				<Card>
					<CardContent className="flex flex-col md:flex-row p-6 gap-8">
						<img
							src="/assets/HomeAdminImg.svg"
							alt="HomeAdminImg"
							className="border-4 border-[#f5e9e9] rounded"
						/>
						<div>
							<h3 className="text-lg text-gray-700 mb-4 font-bold">
								{t("ServiceSection.admin.title")}
							</h3>
							<p className="mb-2">{t("ServiceSection.admin.description")}</p>
							<ul className="list-disc list-inside mb-4 pis-2">
								<li>{t("ServiceSection.admin.items.0")}</li>
								<li>{t("ServiceSection.admin.items.1")}</li>
								<li>{t("ServiceSection.admin.items.2")}</li>
								<li>{t("ServiceSection.admin.items.3")}</li>
							</ul>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="flex flex-col md:flex-row-reverse p-6 gap-8">
						<img
							src="/assets/MobileParticipant.svg"
							alt="MobileParticipantImg"
							className="border-4 border-[#f5e9e9] rounded"
						/>
						<div className="flex-1">
							<h3 className="text-lg text-gray-700 mb-4 font-bold">
								{t("ServiceSection.participant.title")}
							</h3>
							<p className="mb-2">
								{t("ServiceSection.participant.description")}
							</p>
							<ul className="list-disc list-inside mb-4 pis-2">
								<li>{t("ServiceSection.participant.items.0")}</li>
								<li>{t("ServiceSection.participant.items.1")}</li>
								<li>{t("ServiceSection.participant.items.2")}</li>
							</ul>
							<AppLinks className="!justify-start" />
						</div>
					</CardContent>
				</Card>
			</div>
		</Section>
	);
};
