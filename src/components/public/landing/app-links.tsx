import { useTranslation } from "react-i18next";
import { config } from "data/public-config";
import { cn } from "lib/utils";

type Props = {
	className?: string;
};

export const AppLinks = ({ className }: Props) => {
	const { i18n, t } = useTranslation();
	const locale = i18n.language;

	return (
		<div className={cn("flex gap-2 justify-center mt-auto", className)}>
			{config.playStoreLink && (
				<a
					target="_blank"
					rel="noreferrer"
					className="h-[70px]"
					href={config.playStoreLink}
				>
					<img
						alt={t("GetStartedSection.getOnGooglePlay")}
						src={
							locale === "ar"
								? "/assets/ar-play-store-badge.png"
								: "/assets/en-play-store-badge.png"
						}
						className="h-full w-auto object-contain"
					/>
				</a>
			)}
			{config.appStoreLink ? (
				<a
					target="_blank"
					rel="noreferrer"
					className="h-[70px] p-[10px]"
					href={config.appStoreLink}
				>
					<img
						alt={t("GetStartedSection.downloadOnAppStore")}
						src={
							locale === "ar"
								? "/assets/ar-app-store-badge.svg"
								: "/assets/en-app-store-badge.svg"
						}
						className="h-full w-auto object-contain"
					/>
				</a>
			) : (
				<div className="h-[70px] w-[150px]">
					{t("GetStartedSection.comingSoonOnIOS")}
				</div>
			)}
			{config.appGalleryLink && (
				<a
					target="_blank"
					rel="noreferrer"
					className="h-[70px] p-[10px]"
					href={config.appGalleryLink}
				>
					<img
						alt={t("GetStartedSection.downloadOnAppGallery")}
						src={
							locale === "ar"
								? "/assets/ar-app-gallary-badge.png"
								: "/assets/app-gallary-badge.png"
						}
						className="h-full w-auto object-contain"
					/>
				</a>
			)}
		</div>
	);
};
