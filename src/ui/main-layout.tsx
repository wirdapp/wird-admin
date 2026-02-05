import dayjs from "dayjs";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const MainLayout = () => {
	const { i18n } = useTranslation();

	useEffect(() => {
		dayjs.locale(i18n.language);
	}, [i18n.language]);

	const direction = i18n.dir();

	return (
		<DirectionProvider direction={direction}>
			<TooltipProvider>
				<Helmet>
					<html lang={i18n.language || "en"} dir={direction} />
					<meta charSet="utf-8" />
				</Helmet>
				<Outlet />
				<Toaster position={direction === "rtl" ? "bottom-left" : "bottom-right"} />
			</TooltipProvider>
		</DirectionProvider>
	);
};
