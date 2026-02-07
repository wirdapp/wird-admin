import { Footer } from "components/public/Footer";
import { Header } from "components/public/Header";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useSearchParams } from "react-router";

export function PublicLayout() {
	const [searchParams] = useSearchParams();
	const { i18n } = useTranslation();
	const locale = searchParams.get("locale");

	useEffect(() => {
		if (!locale) return;
		i18n.changeLanguage(locale);
	}, [locale, i18n.changeLanguage, i18n]);

	useEffect(() => {
		document.documentElement.lang = i18n.language;
		document.documentElement.dir = i18n.dir();

		// Apply font class based on locale
		document.body.classList.remove("font-arabic", "font-english");
		document.body.classList.add(i18n.language === "ar" ? "font-arabic" : "font-english");
	}, [i18n.language, i18n.dir, i18n]);

	return (
		<div className="public-theme flex flex-col min-h-screen bg-[#fbf9f7]">
			<Header />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
