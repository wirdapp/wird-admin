import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { config } from "data/public-config";
import { ContactUs } from "./ContactUs";

export function Footer() {
	const { t, i18n } = useTranslation();
	const locale = i18n.language;

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<>
			<ContactUs />
			<div className="text-gray-500 px-6 lg:px-8 py-12 bg-neutral-100">
				<div className="max-w-5xl mx-auto w-full">
					<div className="flex flex-col-reverse md:flex-row justify-between w-full gap-6">
						<div className="flex items-start gap-6 max-w-[400px]">
							<img
								src="/assets/wirdLogo.svg"
								alt={t("wirdLogo")}
								width={50}
								height={48}
							/>
							<div className="flex flex-col gap-2">
								<div className="font-bold text-gray-700">{t("wird")}</div>
								<div className="text-sm text-gray-500">
									{t("siteDescription")}
									<br />
									<br />
									{t("allRightsReserved", { year: new Date().getFullYear() })}
								</div>
							</div>
						</div>
						<div className="flex flex-col md:flex-row gap-10 text-sm">
							<div className="flex flex-col gap-2">
								<strong className="text-gray-700 font-bold text-xs">
									{t("links")}
								</strong>
								<ul className="flex flex-col gap-2">
									<li>
										<Link
											to="/dashboard"
											className="text-gray-700 underline"
										>
											{t("adminPanel")}
										</Link>
									</li>
									<li>
										<Link
											to="/#our-service"
											className="text-gray-700 underline"
										>
											{t("ourService")}
										</Link>
									</li>
									<li>
										<Link
											to="/#get-started"
											className="text-gray-700 underline"
										>
											{t("getStarted")}
										</Link>
									</li>
									<li>
										<Link
											to="/policy"
											className="text-gray-700 underline"
											onClick={scrollToTop}
										>
											{t("policy")}
										</Link>
									</li>
									<li>
										<Link
											to="/help"
											className="text-gray-700 underline"
											onClick={scrollToTop}
										>
											{t("help")}
										</Link>
									</li>
								</ul>
							</div>
							<div className="flex flex-col gap-2">
								<strong className="text-gray-700 font-bold text-xs">
									{t("getStudentsApp")}
								</strong>
								<ul className="flex flex-row md:flex-col -mis-[7px]">
									<li>
										<a
											target="_blank"
											rel="noopener noreferrer"
											href={config.playStoreLink}
											className="text-gray-700 hover:underline"
										>
											<img
												alt={t("GetStartedSection.getOnGooglePlay")}
												src={
													locale === "ar"
														? "/assets/ar-play-store-badge.png"
														: "/assets/en-play-store-badge.png"
												}
												style={{ objectFit: "contain" }}
												className="w-auto h-[50px]"
											/>
										</a>
									</li>
									<li>
										<a
											target="_blank"
											rel="noopener noreferrer"
											href={config.appStoreLink}
											className="text-gray-700 hover:underline"
										>
											<img
												alt={t("GetStartedSection.downloadOnAppStore")}
												src={
													locale === "ar"
														? "/assets/ar-app-store-badge.svg"
														: "/assets/en-app-store-badge.svg"
												}
												style={{ objectFit: "contain" }}
												className="w-auto h-[50px] p-[7px]"
											/>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
