import { CheckCircle, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { Paper } from "components/public/paper";
import { SEO } from "components/public/SEO";
import { useVerifyEmail } from "services/auth/queries";

export function EmailConfirmPage() {
	const [searchParams] = useSearchParams();
	const { t } = useTranslation();
	const [emailConfirmed, setEmailConfirmed] = useState<boolean | null>(null);
	const verifyEmail = useVerifyEmail();

	useEffect(() => {
		const key = searchParams.get("key");
		if (key) {
			verifyEmail
				.mutateAsync(key)
				.then(() => setEmailConfirmed(true))
				.catch(() => setEmailConfirmed(false));
		} else {
			setEmailConfirmed(false);
		}
		// Only run on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (emailConfirmed === null) {
		return (
			<>
				<SEO
					title={`${t("EmailConfirmPage.confirmed")} - ${t("wird")}`}
					description="Confirming your email address for Wird App"
				/>
				<Paper>
					<div className="flex flex-col items-center justify-center gap-6 md:gap-8 text-center py-8">
						<div className="text-gray-500">{t("EmailConfirmPage.loading")}</div>
					</div>
				</Paper>
			</>
		);
	}

	if (emailConfirmed) {
		return (
			<>
				<SEO
					title={`${t("EmailConfirmPage.confirmed")} - ${t("wird")}`}
					description={t("EmailConfirmPage.confirmedMessage")}
				/>
				<Paper>
					<div className="flex flex-col items-center justify-center gap-6 md:gap-8 text-center py-8">
						<div>
							<CheckCircle className="w-12 h-12 md:w-24 md:h-24 text-green-500" />
						</div>
						<div className="text-lg md:text-2xl font-bold text-gray-700">
							{t("EmailConfirmPage.confirmed")}
						</div>
						<div className="text-gray-500">
							{t("EmailConfirmPage.confirmedMessage")}
						</div>
					</div>
				</Paper>
			</>
		);
	}

	return (
		<>
			<SEO
				title={`${t("EmailConfirmPage.invalidLink")} - ${t("wird")}`}
				description={t("EmailConfirmPage.invalidLinkMessage")}
			/>
			<Paper>
				<div className="flex flex-col items-center justify-center gap-6 md:gap-8 text-center py-8">
					<div>
						<TriangleAlert className="w-12 h-12 md:w-24 md:h-24 text-rose-500" />
					</div>
					<div className="text-lg md:text-2xl font-bold text-gray-700">
						{t("EmailConfirmPage.invalidLink")}
					</div>
					<div className="text-gray-500">
						{t("EmailConfirmPage.invalidLinkMessage")}
					</div>
				</div>
			</Paper>
		</>
	);
}
