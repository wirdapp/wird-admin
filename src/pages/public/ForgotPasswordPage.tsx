import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Paper } from "components/public/paper";
import { SEO } from "components/public/SEO";
import { ForgotPasswordForm } from "components/public/user/forgot-password-form";

export function ForgotPasswordPage() {
	const { t } = useTranslation();

	return (
		<>
			<SEO
				title={`${t("ForgotPasswordPage.title")} - ${t("wird")}`}
				description="Reset your Wird App password"
			/>
			<Paper>
				<div className="flex flex-col items-center justify-center gap-6 md:gap-8 text-center mb-24 py-8 md:py-16">
					<ForgotPasswordForm />
					<Link
						to="/user/forgot-username"
						className="text-gray-500 hover:text-gray-700 text-sm md:text-base underline"
					>
						{t("ForgotPasswordPage.forgotUsername")}
					</Link>
				</div>
			</Paper>
		</>
	);
}
