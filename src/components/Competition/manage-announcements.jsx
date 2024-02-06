import { useDashboardData } from "../../util/routes-data";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "../../styles";
import { useTranslation } from "react-i18next";
import { TrashIcon } from "@heroicons/react/20/solid";
import { ContestsApi } from "../../services/contests/api";
import { App, Button, Empty, Form, Input, Modal, Spin, Typography } from "antd";
import { useNavigation, useRevalidator } from "react-router-dom";
import dayjs from "dayjs";
import { css } from "@emotion/css";

const StyledAnnouncementWrapper = styled.div`
  width: 100%;

  > div {
    padding: 24px;
    background-color: ${colors.warmWheat};
    border-radius: 24px;
    height: 100%;
  }

  h2 {
    font-size: 16px;
    font-weight: 700;
  }

  .announcement-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const StyledAnnouncementsList = styled.ul`
  list-style: none;
  padding: 16px 0;
  margin: 0;
  display: flex;
  gap: 2px;
  flex-direction: column;

  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${colors.white};
    padding: 12px;
    border-radius: 0;
    white-space: pre-wrap;

    button {
      min-width: 0;
    }

    &:first-child {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    &:last-child {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
`;

export const ManageAnnouncements = () => {
  const { message } = App.useApp();
  const { currentContest } = useDashboardData();
  const { t } = useTranslation();
  const [errors, setErrors] = useState([]);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState({});
  const [announcementFormVisible, setAnnouncementFormVisible] = useState(false);
  const revalidator = useRevalidator();
  const navigation = useNavigation();

  const onFormFinish = async (values) => {
    try {
      setSubmitting(true);
      const newAnnouncement = values.announcement.trim();
      const newAnnouncementKey = dayjs().format("YYYY-MM-DD HH:mm:ss");
      const newAnnouncements = {
        ...currentContest.announcements,
        [newAnnouncementKey]: newAnnouncement,
      };
      await ContestsApi.updateContest(currentContest.id, {
        announcements: newAnnouncements,
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

  const handleAnnouncementDelete = async (key) => {
    try {
      setDeleting((prev) => ({ ...prev, [key]: true }));
      const newAnnouncements = { ...currentContest.announcements };
      delete newAnnouncements[key];
      await ContestsApi.updateContest(currentContest.id, {
        announcements: newAnnouncements,
      });
      revalidator.revalidate();
    } catch (err) {
      console.log(err);
      message.error(t("something-went-wrong"));
    }
  };

  return (
    <StyledAnnouncementWrapper>
      <div>
        <div className="announcement-header">
          <h2>{t("active-announcements")}</h2>

          <Button onClick={() => setAnnouncementFormVisible(true)}>
            {t("new-announcement")}
          </Button>
        </div>
        {currentContest.announcements.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Spin spinning={navigation.state !== "idle"}>
            <StyledAnnouncementsList>
              {Object.entries(currentContest.announcements).map(
                ([date, announcement]) => (
                  <li key={date}>
                    <div
                      className={css`
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                      `}
                    >
                      <Typography.Text
                        type="secondary"
                        style={{ fontSize: 10 }}
                      >
                        {dayjs(date).format("DD MMM YYYY HH:mm")}
                      </Typography.Text>
                      {announcement}
                    </div>
                    <Button
                      type="text"
                      danger
                      size="small"
                      onClick={() => handleAnnouncementDelete(date)}
                      loading={deleting[date]}
                    >
                      <TrashIcon />
                    </Button>
                  </li>
                ),
              )}
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
    </StyledAnnouncementWrapper>
  );
};
