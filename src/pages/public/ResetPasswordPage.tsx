import { TriangleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { Paper } from "components/public/paper";
import { SEO } from "components/public/SEO";
import { ResetPasswordForm } from "components/public/user/reset-password-form";

export function ResetPasswordPage() {
	const [searchParams] = useSearchParams();
	const { t } = useTranslation();
	const token = searchParams.get("token");
	const uid = searchParams.get("uid");

	if (!token || !uid) {
		return (
			<>
				<SEO
					title={`${t("ResetPasswordPage.invalidLink")} - ${t("wird")}`}
					description={t("ResetPasswordPage.invalidLinkMessage")}
				/>
				<Paper>
					<div className="flex flex-col items-center justify-center gap-6 md:gap-8 text-center py-8 px-8">
						<div>
							<TriangleAlert className="w-12 h-12 md:w-24 md:h-24 text-rose-500" />
						</div>
						<div className="text-lg md:text-2xl font-bold text-gray-700">
							{t("ResetPasswordPage.invalidLink")}
						</div>
						<div className="text-gray-500">
							{t("ResetPasswordPage.invalidLinkMessage")}
						</div>
					</div>
				</Paper>
			</>
		);
	}

	return (
		<>
			<SEO
				title={`${t("ResetPasswordPage.title")} - ${t("wird")}`}
				description="Reset your Wird App password"
			/>
			<Paper>
				<div className="flex flex-col items-center justify-center gap-6 md:gap-8 text-center mb-24 py-8 md:py-16">
					<ResetPasswordForm token={token} uid={uid} />
				</div>
			</Paper>
		</>
	);
}
