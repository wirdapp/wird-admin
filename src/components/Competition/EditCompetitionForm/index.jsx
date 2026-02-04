import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { ParticipantsTitelsAtHome } from "../ContestMembers/ContestMembers.styles";
import {
  EditContestFormWrapper,
  ParticipantsNumbers,
} from "./EditCompetition.styles";
import {
  Alert,
  App,
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
import { css } from "@emotion/css";
import dayjs from "dayjs";
import { isAtLeastSuperAdmin } from "../../../util/ContestPeople_Role";
import { useDashboardData } from "../../../util/routes-data";
import { allCountries } from "../../../data/countries";
import { useUpdateContest } from "../../../services/contests/queries";

export default function EditCompetitionForm({ contest }) {
  const { message } = App.useApp();
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);
  const { currentUser } = useDashboardData();
  const updateContest = useUpdateContest();

  const countries = useMemo(() => {
    return allCountries(i18n.language).map((country) => ({
      label: country.name,
      value: country.code,
    }));
  }, [i18n.language]);

  const handleUpdateContest = async (values) => {
    try {
      setMessages([]);
      await updateContest.mutateAsync({
        id: contest.id,
        data: {
          ...values,
          start_date: values.start_date.format("YYYY-MM-DD"),
          end_date: values.end_date.format("YYYY-MM-DD"),
        },
      });
      message.success(t("contest-has-been-edited-successfully"));
    } catch (err) {
      let errMessages = [];
      if (err.response?.data) {
        let obj = err.response.data;
        Object.keys(obj).forEach((e) => {
          errMessages.push(obj[e]);
        });
      }
      setMessages(errMessages);
    }
  };

  const canEdit = isAtLeastSuperAdmin(currentUser.role);

  return (
    <EditContestFormWrapper>
      <ParticipantsNumbers>
        <ParticipantsTitelsAtHome>
          {t("contest-information")}
        </ParticipantsTitelsAtHome>

        <Form
          onFinish={handleUpdateContest}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 15 }}
          initialValues={contest}
          style={{ width: "100%" }}
          disabled={!canEdit || updateContest.isPending}
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
            label={t("country")}
            name="country"
            rules={[{ required: true }]}
          >
            <Select options={countries} showSearch optionFilterProp="label" />
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
            name="days_to_record_in_past"
            label={t("days-to-record-in-past")}
            extra={t("days-to-record-in-past-msg")}
          >
            <InputNumber min={1} addonAfter={t("days")} />
          </Form.Item>

          <Form.Item
            name="show_standings"
            wrapperCol={{ offset: 7, span: 15 }}
            valuePropName="checked"
            style={{ marginBottom: "0px" }}
          >
            <Checkbox>{t("show-leaderboard-for-students")}</Checkbox>
          </Form.Item>
          <Form.Item
            name="readonly_mode"
            wrapperCol={{ offset: 7, span: 15 }}
            valuePropName="checked"
          >
            <Checkbox>{t("readonly")}</Checkbox>
          </Form.Item>

          {messages.length > 0 && (
            <Form.Item
              wrapperCol={{ offset: 7, span: 15 }}
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

          {canEdit && (
            <Form.Item wrapperCol={{ offset: 7, span: 15 }}>
              <Space>
                <Button htmlType="submit" type="primary" loading={updateContest.isPending}>
                  {t("update")}
                </Button>
                <Button htmlType="reset">{t("reset")}</Button>
              </Space>
            </Form.Item>
          )}
        </Form>
      </ParticipantsNumbers>
    </EditContestFormWrapper>
  );
}
