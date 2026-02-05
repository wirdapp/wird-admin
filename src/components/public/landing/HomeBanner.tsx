import { useTranslation } from "react-i18next";

export function HomeBanner() {
	const { t } = useTranslation();

	return (
		<div className="mt-8 px-6 lg:px-8">
			<div
				id="HomeBanner"
				className="max-w-5xl mx-auto bg-[#ff5367] rounded-2xl relative w-full md:h-[300px]"
			>
				<div className="absolute w-full h-full rounded-2xl overflow-hidden flex">
					<div
						className="w-full h-full bg-[#fe7786] rtl:scale-x-[-1]"
						style={{ clipPath: "circle(73% at -4% -1%)" }}
					/>
					<div
						className="w-full h-full bg-[#fdd561] rtl:scale-x-[-1]"
						style={{ clipPath: "circle(55% at 108% 116%)" }}
					/>
				</div>

				<div className="flex flex-col-reverse md:flex-row justify-between items-center w-full h-full pt-5 md:pt-0">
					<div className="relative mx-auto md:mis-12 flex flex-col items-center md:items-start gap-0 md:gap-2 lg:gap-5 py-6 md:py-2">
						<div className="flex flex-col items-center md:items-start gap-2 max-w-[650px] text-center md:text-start">
							<div className="font-bold text-xl lg:text-2xl text-white ">
								{t("welcome")}
							</div>
							<div className="text-base lg:text-lg text-[#ffe7ea] px-1">
								{t("siteDescription")}
							</div>
						</div>
					</div>

					<div className="-mie-4 md:mie-5 flex items-end z-10 max-w-[200px] md:max-w-none">
						<div className="relative -mie-[20%] -mb-2 z-10">
							<img src="/assets/studentBanner3.svg" alt="StudentBannerimg" />
						</div>
						<div className="relative">
							<img src="/assets/studentBanner2.svg" alt="StudentBannerimg" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
