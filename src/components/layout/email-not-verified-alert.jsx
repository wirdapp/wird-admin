import React from "react";
import { Alert, Button, message, Space } from "antd";
import { useTranslation } from "react-i18next";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useDashboardData } from "../../util/routes-data";
import { resendVerificationEmail } from "../../services/auth/api";

export const EmailNotVerifiedAlert = () => {
  const { t } = useTranslation();
  const { currentUser } = useDashboardData();
  const [submitting, setSubmitting] = React.useState(false);

  const handleResendVerificationEmail = async () => {
    setSubmitting(true);
    try {
      await resendVerificationEmail(currentUser.email);
      message.success(t("verificationEmailSent"));
    } catch (e) {
      console.error(e);
      if (e.message === "email-already-sent") {
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
                email: currentUser.email,
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
