import { useDashboardData } from "../../util/routes-data";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TrashIcon } from "@heroicons/react/20/solid";
import { ContestsApi } from "../../services/contests/api";
import { App, Button, Empty, Form, Input, Modal, Spin, Typography } from "antd";
import { useNavigation, useRevalidator } from "react-router-dom";
import dayjs from "dayjs";
import { css } from "@emotion/css";
import { StyledAnnouncementsList } from "./styles";
import { isAtLeastSuperAdmin } from "../../util/ContestPeople_Role";

export const ManageAnnouncements = () => {
  const { message } = App.useApp();
  const { currentContest, currentUser } = useDashboardData();
  const { t } = useTranslation();
  const [errors, setErrors] = useState([]);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState([]);
  const [announcementFormVisible, setAnnouncementFormVisible] = useState(false);
  const revalidator = useRevalidator();
  const navigation = useNavigation();

  const onFormFinish = async (values) => {
    try {
      setSubmitting(true);
      const newAnnouncement = {
        text: values.announcement.trim(),
        date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      };
      await ContestsApi.updateContest(currentContest.id, {
        announcements: [...currentContest.announcements, newAnnouncement],
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

  const handleAnnouncementDelete = async (index) => {
    try {
      setDeleting((prev) => [...prev, index]);
      const newAnnouncements = [...currentContest.announcements];
      newAnnouncements.splice(index, 1);
      await ContestsApi.updateContest(currentContest.id, {
        announcements: newAnnouncements,
      });
      revalidator.revalidate();
      setDeleting((prev) => prev.filter((i) => i !== index));
    } catch (err) {
      console.log(err);
      message.error(t("something-went-wrong"));
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
        {currentContest.announcements.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Spin spinning={navigation.state !== "idle"}>
            <StyledAnnouncementsList>
              {currentContest.announcements.map((announcement, index) => (
                <li key={announcement.date}>
                  <div
                    className={css`
                      display: flex;
                      flex-direction: column;
                      gap: 4px;
                    `}
                  >
                    <Typography.Text type="secondary" style={{ fontSize: 10 }}>
                      {dayjs(announcement.date).format("DD MMM YYYY HH:mm")}
                    </Typography.Text>
                    {announcement.text}
                  </div>
                  {canManageAnnouncements && (
                    <Button
                      type="text"
                      danger
                      size="small"
                      onClick={() => handleAnnouncementDelete(index)}
                      loading={deleting.includes(index)}
                    >
                      <TrashIcon />
                    </Button>
                  )}
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
        <Form onFinish={onFormFinish} form={form}>
          <Form.Item
            name="announcement"
            rules={[{ required: true, message: t("requiredField") }]}
            validateStatus={errors.length > 0 ? "error" : undefined}
            help={
              errors.length
                ? errors.map((err) => <div key={err}>{err}</div>)
                : undefined
            }
          >
            <Input.TextArea
              placeholder={t("announcement-placeholder")}
              rows={5}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
