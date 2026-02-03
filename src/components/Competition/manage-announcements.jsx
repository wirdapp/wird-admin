import { useDashboardData } from "../../util/routes-data";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NotificationsApi } from "../../services/notifications/api";
import { App, Button, Empty, Form, Input, Modal, Spin, Typography } from "antd";
import { useNavigation, useRevalidator } from "react-router-dom";
import dayjs from "dayjs";
import { css } from "@emotion/css";
import { StyledAnnouncementsList } from "./styles";
import { isAtLeastSuperAdmin } from "../../util/ContestPeople_Role";

export const ManageAnnouncements = () => {
  const { message } = App.useApp();
  const { currentContest, currentUser, notifications } = useDashboardData();
  const { t } = useTranslation();
  const [errors, setErrors] = useState([]);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [announcementFormVisible, setAnnouncementFormVisible] = useState(false);
  const revalidator = useRevalidator();
  const navigation = useNavigation();

  const onFormFinish = async (values) => {
    try {
      setSubmitting(true);
      await NotificationsApi.createNotification(currentContest.id, {
        title: values.title.trim(),
        body: values.body.trim(),
      });
      revalidator.revalidate();
      setAnnouncementFormVisible(false);
      form.resetFields();
    } catch (err) {
      console.log(err);
      const errorsList = [];
      Object.values(err.response?.data ?? {}).forEach((errMsg) => {
        errorsList.push(errMsg);
      });
      if (errorsList.length > 0) {
        setErrors(errorsList);
      } else {
        setErrors([t("something-went-wrong")]);
      }
      message.error(
        errorsList.map((err) => (
          <React.Fragment key={err}>
            {err}
            <br />
          </React.Fragment>
        )),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const canManageAnnouncements = isAtLeastSuperAdmin(currentUser.role);

  return (
    <>
      <div>
        <div className="announcement-header">
          <h2>{t("active-announcements")}</h2>

          {canManageAnnouncements && (
            <Button onClick={() => setAnnouncementFormVisible(true)}>
              {t("new-announcement")}
            </Button>
          )}
        </div>
        {notifications.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Spin spinning={navigation.state !== "idle"}>
            <StyledAnnouncementsList>
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <div
                    className={css`
                      display: flex;
                      flex-direction: column;
                      gap: 4px;
                    `}
                  >
                    <Typography.Text type="secondary" style={{ fontSize: 10 }}>
                      {notification.sent_at
                        ? dayjs(notification.sent_at).format("DD MMM YYYY HH:mm")
                        : t("not-sent-yet")}
                    </Typography.Text>
                    <Typography.Text strong>{notification.title}</Typography.Text>
                    <Typography.Text>{notification.body}</Typography.Text>
                  </div>
                </li>
              ))}
            </StyledAnnouncementsList>
          </Spin>
        )}
      </div>
      <Modal
        title={t("make-an-announcement")}
        open={announcementFormVisible}
        onCancel={() => setAnnouncementFormVisible(false)}
        onOk={() => form.submit()}
        okText={t("add")}
        cancelText={t("cancel")}
        okButtonProps={{
          loading: submitting,
        }}
      >
        <Form onFinish={onFormFinish} form={form} layout="vertical">
          <Form.Item
            name="title"
            label={t("notification-title")}
            rules={[{ required: true, message: t("requiredField") }]}
          >
            <Input placeholder={t("notification-title-placeholder")} />
          </Form.Item>
          <Form.Item
            name="body"
            label={t("notification-body")}
            rules={[{ required: true, message: t("requiredField") }]}
            validateStatus={errors.length > 0 ? "error" : undefined}
            help={
              errors.length
                ? errors.map((err) => <div key={err}>{err}</div>)
                : undefined
            }
          >
            <Input.TextArea
              placeholder={t("notification-body-placeholder")}
              rows={5}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
