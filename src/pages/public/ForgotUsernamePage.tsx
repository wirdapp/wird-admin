import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Paper } from "components/public/paper";
import { SEO } from "components/public/SEO";
import { ForgotUsernameForm } from "components/public/user/forgot-username-form";

export function ForgotUsernamePage() {
	const { t } = useTranslation();

	return (
		<>
			<SEO
				title={`${t("ForgotUsernamePage.title")} - ${t("wird")}`}
				description="Recover your Wird App username"
			/>
			<Paper>
				<div className="flex flex-col items-center justify-center gap-6 md:gap-8 text-center mb-24 py-8 md:py-16">
					<ForgotUsernameForm />
					<Link
						to="/user/forgot-password"
						className="text-gray-500 hover:text-gray-700 text-sm md:text-base underline"
					>
						{t("ForgotUsernamePage.forgotPassword")}
					</Link>
				</div>
			</Paper>
		</>
	);
}
