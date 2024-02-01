import React from "react";
import { App, Button, Flex, Form, Input, List, Space, Typography } from "antd";
import { TrashIcon } from "@heroicons/react/20/solid";
import { css } from "@emotion/css";
import { colors } from "../../styles";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { useRevalidator } from "react-router-dom";
import { GroupsApi } from "../../services/groups/api";

export const GroupAnnouncement = ({ group }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [adding, setAdding] = React.useState(false);
  const [deleting, setDeleting] = React.useState();
  const revalidator = useRevalidator();

  const handleSaveAnnouncement = async (announcements) => {
    try {
      await GroupsApi.updateGroup({
        id: group.id,
        body: { announcements },
      });
      message.success(t("group-updated"));
      revalidator.revalidate();
    } catch (e) {
      console.error(e);
      message.error(t("something-went-wrong"));
    }
  };

  const handleAddAnnouncement = async (values) => {
    setAdding(true);
    await handleSaveAnnouncement([
      ...group.announcements,
      values.newAnnouncementText,
    ]);
    form.resetFields();
    setAdding(false);
  };

  const handleDeleteAnnouncement = async (index) => {
    setDeleting(index);
    const updatedAnnouncements = [...group.announcements];
    updatedAnnouncements.splice(index, 1);
    await handleSaveAnnouncement(updatedAnnouncements);
    setDeleting(null);
  };

  const newAnnouncementText = Form.useWatch("newAnnouncementText", form);

  return (
    <Flex vertical gap={24}>
      <List
        className={css`
          background: ${colors.white};

          .ant-list-item-action li:last-child {
            padding: 0 !important;
          }

          .ant-list-item-meta-title {
            margin-bottom: 0;
            white-space: pre-wrap;
          }
        `}
        bordered
        dataSource={group.announcements}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="text"
                danger
                size="small"
                icon={<TrashIcon />}
                onClick={() => handleDeleteAnnouncement(index)}
                loading={deleting === item}
              />,
            ]}
          >
            <List.Item.Meta
              title={item}
              avatar={
                <Typography.Text type="secondary">{index + 1}.</Typography.Text>
              }
            />
          </List.Item>
        )}
      />
      <Form
        layout="vertical"
        onFinish={handleAddAnnouncement}
        requiredMark={false}
        form={form}
      >
        <Form.Item
          rules={[{ required: true, message: t("requiredField") }]}
          label={
            <Space align="center">
              <PlusCircleIcon
                style={{ display: "block", width: 20, height: 20 }}
              />
              {t("make-an-announcement")}
            </Space>
          }
          name="newAnnouncementText"
        >
          <Input.TextArea placeholder={t("make-an-announcement")} />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={adding}
          icon={<PlusIcon />}
          size="small"
          disabled={!newAnnouncementText}
        >
          {t("new-announcement")}
        </Button>
      </Form>
    </Flex>
  );
};
