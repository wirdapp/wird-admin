import React from "react";
import { useTranslation } from "react-i18next";
import { App, Flex, Grid, Space, Typography } from "antd";
import { useDashboardData } from "../../util/routes-data";
import { ChangePasswordForm } from "./change-password-form";
import { ProfilePictureUploader } from "./profile-picture-uploader";
import { getFullName } from "../../util/user-utils";
import { UserDetailsForm } from "./user-details-form";
import { useUpdateUserInfo } from "../../services/auth/queries";

function EditProfile() {
  const { message } = App.useApp();
  const { currentUser } = useDashboardData();
  const { t } = useTranslation();
  const screens = Grid.useBreakpoint();
  const updateUserInfo = useUpdateUserInfo();

  const handleSubmit = async (values) => {
    try {
      await updateUserInfo.mutateAsync(values);
      message.success(t("profile-has-been-edited-successfully"));
    } catch (err) {
      let errMessages = [];
      if (err.response?.data) {
        let obj = err.response.data;
        Object.keys(obj).forEach((e) => {
          errMessages.push(`${obj[e]} : ${e}`);
        });
      }
      message.error(errMessages ?? t("something-went-wrong"));
    }
  };

  return (
    <div>
      <Space align="center" size="large">
        <ProfilePictureUploader onSubmit={handleSubmit} />
        <Space direction="vertical" size="small">
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            {getFullName(currentUser)}
          </Typography.Title>
          <Typography.Text>{currentUser.email}</Typography.Text>
        </Space>
      </Space>
      <Flex
        vertical={!screens.lg}
        style={{ marginTop: 24, width: "100%" }}
        gap={24}
      >
        <UserDetailsForm onSubmit={handleSubmit} />
        <ChangePasswordForm />
      </Flex>
    </div>
  );
}

export default EditProfile;
