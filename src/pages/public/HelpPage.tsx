import { SEO } from "components/public/SEO";
import { useTranslation } from "react-i18next";

export function HelpPage() {
	const { t, i18n } = useTranslation();
	const locale = i18n.language;

	return (
		<>
			<SEO
				title={`${t("help")} - ${t("wird")}`}
				description={t("adminPanelHelpText")}
				ogTitle={`${t("help")} - ${t("wird")}`}
				ogDescription={t("adminPanelHelpText")}
			/>
			<div className="max-w-5xl mx-auto w-full py-10 px-4">
				<h1 className="text-3xl font-bold mb-8 text-gray-700">{t("help")}</h1>
				<h2 className="text-xl font-bold mb-8 text-gray-700">{t("adminPanelHelp")}</h2>
				<p className="mb-4">{t("adminPanelHelpText")}</p>
				{locale === "ar" ? (
					<iframe
						className="w-full aspect-video rounded-lg"
						src="https://www.youtube.com/embed/videoseries?si=5mEH8TTChJZNjlOc&amp;list=PLh7mINmitSDXo2A2G6LqA8zRxZZJuhzvs"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
					/>
				) : (
					<iframe
						className="w-full aspect-video rounded-lg"
						src="https://www.youtube.com/embed/videoseries?si=ztRGDPgN8vWw5EZ2&amp;list=PLh7mINmitSDWIaTMeL0saoYNEFsCV8Wow"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
					/>
				)}
			</div>
		</>
	);
}
