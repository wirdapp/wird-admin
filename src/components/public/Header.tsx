import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { cn } from "lib/utils";
import { Nav } from "./Nav";

export function Header() {
	const { t, i18n } = useTranslation();
	const locale = i18n.language;

	return (
		<header className="w-full flex items-center h-[90px] px-4 sm:px-6 lg:px-8 py-4 bg-white shadow shadow-gray-200 sticky top-0 z-30">
			<div className="max-w-5xl mx-auto w-full flex">
				<Link to="/" className="flex gap-4 items-center">
					<img
						src="/assets/wirdLogo.svg"
						alt="Wird Logo"
						className="!h-full w-[50px] h-[48px]"
					/>
					<div className={cn("flex ltr:flex-col rtl:flex-col-reverse")}>
						<div className="text-xl font-bold text-gray-700">{t("wird")}</div>
						<div className="text-sm text-gray-500">{t("contests")}</div>
					</div>
				</Link>
				<Nav
					locale={locale}
					items={[
						{ href: "/#our-service", label: t("ourService") },
						{ href: "/#get-started", label: t("getStarted") },
						{ href: "/#contact-us", label: t("contactUs") },
						{
							href: "/dashboard",
							label: t("adminPanel"),
							className:
								"flex items-center justify-center gap-1 border border-rose-500",
						},
					]}
				/>
			</div>
		</header>
	);
}
