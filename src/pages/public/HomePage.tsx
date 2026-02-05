import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { GetStarted } from "components/public/landing/GetStarted";
import { HomeBanner } from "components/public/landing/HomeBanner";
import { OurService } from "components/public/landing/OurService";
import { VideoIntro } from "components/public/landing/VideoIntro";
import { WirdStats } from "components/public/landing/WirdStats";
import { SEO } from "components/public/SEO";

export function HomePage() {
	const { t, i18n } = useTranslation();
	const locale = i18n.language as "ar" | "en";
	const location = useLocation();

	useEffect(() => {
		if (location.hash) {
			const id = location.hash.replace("#", "");
			const element = document.getElementById(id);
			if (element) {
				const headerOffset = 90 + 16;
				const elementPosition = element.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.scrollY - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
				});
			}
		}
	}, [location.hash]);

	return (
		<>
			<SEO
				title={t("wird")}
				description={t("siteDescription")}
				ogTitle={t("wird")}
				ogDescription={t("siteDescription")}
			/>
			<main className="flex min-h-screen flex-col">
				<div className="bg-white pb-12 flex-1 flex flex-col gap-16 md:gap-20">
					<HomeBanner />
					<GetStarted />
					<WirdStats />
					<VideoIntro
						locale={locale}
						title={t("introTitle")}
						description={t("introText")}
					/>
					<OurService />
				</div>
			</main>
		</>
	);
}
