import React, { useEffect, useState } from "react";
import { MembersSelect } from "./members-select";
import {
  Avatar,
  Card,
  Col,
  Empty,
  Flex,
  Form,
  Row,
  Skeleton,
  Space,
  Statistic,
  Typography,
} from "antd";
import { useSearchParams } from "react-router-dom";
import { ContestResultsApi } from "../../../services/contest-results/api";
import { StyledMembersResultsWrapper } from "./members-results.styles";
import { getFullName, getInitials } from "../../../util/user-utils";
import { colors } from "../../../styles";
import { useTranslation } from "react-i18next";
import { MemberScorePerDayChart } from "./member-score-per-day-chart";
import { MemberScorePerCategoryChart } from "./member-score-per-category-chart";
import { DailyUserSubmissions } from "./daily-user-submissions";
import { Role } from "../../../util/ContestPeople_Role";
import { css } from "@emotion/css";

export const MembersResults = () => {
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(undefined);
  const { t } = useTranslation();

  const loadMemberResults = async (userId) => {
    try {
      const res = await ContestResultsApi.getMemberResults({ userId });
      setResult(res);
    } catch (error) {
      console.error(error);
    }
  };

  const reload = async () => {
    return loadMemberResults(searchParams.get("userId"));
  };

  const onValuesChange = async (_, values) => {
    setSearchParams(new URLSearchParams(values));
    setLoading(true);
    await loadMemberResults(values.userId);
    setLoading(false);
  };

  useEffect(() => {
    if (searchParams.has("userId")) {
      form.setFieldsValue({ userId: searchParams.get("userId") });
      setLoading(true);
      loadMemberResults(searchParams.get("userId")).finally(() =>
        setLoading(false),
      );
    }
  }, [form, searchParams]);

  return (
    <StyledMembersResultsWrapper>
      <div className="side-filters">
        <Form
          form={form}
          layout="vertical"
          onValuesChange={onValuesChange}
          initialValues={{ userId: searchParams.get("userId") }}
        >
          <Form.Item label={t("selectMember")} name="userId">
            <MembersSelect placeholder={t("selectMember")} role={Role.MEMBER} />
          </Form.Item>
        </Form>
      </div>
      <div className="main-content">
        {result || loading ? (
          <Flex vertical gap={32}>
            {loading ? (
              <Space size="large" align="center">
                <Skeleton.Avatar active size={64} />
                <Skeleton.Input active />
              </Space>
            ) : (
              <Space size="large" align="center">
                <Avatar
                  style={{
                    backgroundColor: colors.yellow,
                    color: colors.white,
                  }}
                  size={64}
                >
                  {getInitials(result.person_data)}
                </Avatar>
                <Space direction="vertical">
                  <Typography.Title level={3} style={{ marginBottom: 0 }}>
                    {getFullName(result.person_data)}
                  </Typography.Title>
                  <Typography.Text>
                    {result.person_data.username}
                  </Typography.Text>
                </Space>
              </Space>
            )}
            <Flex wrap="wrap" gap={16}>
              <Card
                bordered={false}
                className={css`
                  width: 100%;
                  flex-shrink: 0;
                  @media (min-width: 768px) {
                    max-width: 300px;
                  }
                `}
              >
                <Statistic
                  title={t("totalPoints")}
                  value={result?.total_points || 0}
                  loading={loading}
                />
              </Card>
              <Card
                bordered={false}
                className={css`
                  width: 100%;
                  flex-shrink: 0;
                  @media (min-width: 768px) {
                    max-width: 300px;
                  }
                `}
              >
                <Statistic
                  title={t("rank")}
                  value={result?.rank}
                  loading={loading}
                />
              </Card>
            </Flex>
            <Row gutter={16}>
              <Col xs={24} lg={12} style={{ paddingBottom: 24 }}>
                <Card
                  bordered={false}
                  title={t("pointsPerDay")}
                  loading={loading}
                >
                  <MemberScorePerDayChart data={result?.days} />
                </Card>
              </Col>
              <Col xs={24} lg={12} style={{ paddingBottom: 24 }}>
                <Card
                  bordered={false}
                  title={t("scorePerCategory")}
                  loading={loading}
                >
                  <MemberScorePerCategoryChart data={result?.scores} />
                </Card>
              </Col>
              <Col span={24}>
                <Card
                  bordered={false}
                  title={t("dailySubmissionsPopup.title")}
                  loading={loading}
                >
                  <DailyUserSubmissions
                    userId={result?.person_data?.id}
                    onUpdated={reload}
                  />
                </Card>
              </Col>
            </Row>
          </Flex>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Select a person to see results"
          />
        )}
      </div>
    </StyledMembersResultsWrapper>
  );
};
