import { useDashboardData } from "../../util/routes-data";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "../../styles";
import { useTranslation } from "react-i18next";
import { TrashIcon } from "@heroicons/react/20/solid";
import { ContestsApi } from "../../services/contests/api";
import { Button, Empty, Form, Input, message, Modal } from "antd";

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

const StyledAnnouncementsList = styled.ul`
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
      border-radius: 8px 8px 0 0;
    }

    &:last-child {
      border-radius: 0 0 8px 8px;
    }
  }
`;

export const ManageAnnouncements = () => {
  const { currentContest } = useDashboardData();
  const { t } = useTranslation();
  const [errors, setErrors] = useState([]);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const [announcements, setAnnouncments] = useState(
    currentContest.announcements ?? [],
  );
  const [announcementFormVisible, setAnnouncementFormVisible] = useState(false);

  const onFormFinish = async (values) => {
    try {
      setSubmitting(true);
      const newAnnouncement = values.announcement.trim();
      const newAnnouncements = [...announcements, newAnnouncement];
      await ContestsApi.updateContest({
        announcements: newAnnouncements,
      });
      setAnnouncments(newAnnouncements);
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

  const handleAnnouncementDelete = (index) => {
    setAnnouncments(announcements.filter((_, i) => i !== index));
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
        {announcements.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <StyledAnnouncementsList>
            {announcements.map((announcement, index) => (
              <li key={index}>
                {announcement}
                <Button
                  type="text"
                  onClick={() => handleAnnouncementDelete(index)}
                >
                  <TrashIcon />
                </Button>
              </li>
            ))}
          </StyledAnnouncementsList>
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
