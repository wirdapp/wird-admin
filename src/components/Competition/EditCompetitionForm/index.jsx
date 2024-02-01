import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { ParticipantsTitelsAtHome } from "../ContestMembers/ContestMembers.styles";
import {
  EditContestFormWrapper,
  ParticipantsNumbers,
} from "./EditCompetition.styles";
import { Alert, App, Button, Checkbox, Form, Input, Space } from "antd";
import { ContestsApi } from "../../../services/contests/api";
import { css } from "@emotion/css";
import { useRevalidator } from "react-router-dom";
import dayjs from "dayjs";

export default function EditCompetitionForm({ contest }) {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [classColor, setClassColor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const revalidator = useRevalidator();

  const handleUpdateContest = async (values) => {
    try {
      setClassColor("");
      setMessages([]);
      setSubmitting(true);
      await ContestsApi.updateContest(contest.id, {
        ...values,
        start_date: values.start_date.format("YYYY-MM-DD"),
        end_date: values.end_date.format("YYYY-MM-DD"),
      });
      revalidator.revalidate();
      message.success(t("contest-has-been-edited-successfully"));
    } catch (err) {
      let errMessages = [];
      if (err.response.data) {
        let obj = err.response.data;
        Object.keys(obj).forEach((e) => {
          errMessages.push(obj[e]);
        });
      }
      setClassColor("red");
      setMessages(errMessages);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <EditContestFormWrapper>
      <ParticipantsNumbers>
        <ParticipantsTitelsAtHome>
          {t("contest-information")}
        </ParticipantsTitelsAtHome>

        <Form
          onFinish={handleUpdateContest}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          initialValues={contest}
          style={{ width: "100%" }}
          disabled={submitting}
          validateMessages={{
            required: t("requiredField"),
          }}
        >
          <Form.Item
            label={t("name-label")}
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder={t("name-label")} />
          </Form.Item>
          <Form.Item label={t("description-label")} name="description">
            <Input placeholder={t("description-label")} />
          </Form.Item>
          <Form.Item
            label={t("start-date")}
            name="start_date"
            rules={[{ required: true }]}
            getValueFromEvent={(e) => dayjs(e.target.value)}
            getValueProps={(value) => ({
              value: value?.format("YYYY-MM-DD"),
            })}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label={t("end-date")}
            name="end_date"
            rules={[{ required: true }]}
            getValueFromEvent={(e) => dayjs(e.target.value)}
            getValueProps={(value) => ({
              value: value?.format("YYYY-MM-DD"),
            })}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="show_standings"
            wrapperCol={{ offset: 4, span: 18 }}
            valuePropName="checked"
            style={{ marginBottom: "0px" }}
          >
            <Checkbox>{t("show-leaderboard-for-students")}</Checkbox>
          </Form.Item>
          <Form.Item
            name="readonly_mode"
            wrapperCol={{ offset: 4, span: 18 }}
            valuePropName="checked"
          >
            <Checkbox>{t("readonly")}</Checkbox>
          </Form.Item>

          {messages.length > 0 && (
            <Form.Item
              wrapperCol={{ offset: 4, span: 18 }}
              style={{ marginBottom: "4px" }}
            >
              <Alert
                className={css`
                  margin-bottom: 14px;
                `}
                message={t("contest-isn't-edited-successfully")}
                description={messages.map((message, index) => {
                  return <div key={index}>{message}</div>;
                })}
                type="error"
                showIcon
              />
            </Form.Item>
          )}

          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Space>
              <Button htmlType="submit" type="primary" loading={submitting}>
                {t("update")}
              </Button>
              <Button htmlType="reset">{t("reset")}</Button>
            </Space>
          </Form.Item>
        </Form>
      </ParticipantsNumbers>
    </EditContestFormWrapper>
  );
}
