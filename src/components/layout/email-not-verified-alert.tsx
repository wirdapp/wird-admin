import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Alert, App, Button, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { AuthService } from "../../services/auth/auth.service";
import { useDashboardData } from "../../util/routes-data";

export const EmailNotVerifiedAlert: React.FC = () => {
	const { message } = App.useApp();
	const { t } = useTranslation();
	const { currentUser } = useDashboardData();
	const [submitting, setSubmitting] = React.useState<boolean>(false);

	const handleResendVerificationEmail = async (): Promise<void> => {
		setSubmitting(true);
		try {
			await AuthService.resendVerificationEmail(currentUser?.email ?? "");
			message.success(t("verificationEmailSent"));
		} catch (e) {
			console.error(e);
			if ((e as Error).message === "email-already-sent") {
				message.error(t("emailAlreadySent"));
				return;
			}
			message.error(t("somethingWentWrong"));
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Alert
			type="warning"
			message={t("emailNotVerified")}
			description={
				<Space direction="vertical">
					<div
						dangerouslySetInnerHTML={{
							__html: t("emailNotVerifiedDescription", {
								email: currentUser?.email ?? "",
							}),
						}}
					/>
					<div>
						{t("didntReceiveEmail")}{" "}
						<Button
							type="link"
							icon={<EnvelopeIcon />}
							loading={submitting}
							onClick={handleResendVerificationEmail}
						>
							{t("resendVerificationEmail")}
						</Button>
					</div>
				</Space>
			}
			banner
		/>
	);
};
