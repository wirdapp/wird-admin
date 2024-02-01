import React, { useEffect, useState } from "react";
import { MembersSelect } from "./members-select";
import {
  Avatar,
  Button,
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
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { DailyUserSubmissions } from "./daily-user-submissions";
import { AnimatePresence, motion } from "framer-motion";
import { Role } from "../../../util/ContestPeople_Role";

export const MembersResults = () => {
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(undefined);
  const [dailySubmissionsPopupOpen, setDailySubmissionsPopupOpen] =
    useState(false);
  const { t, i18n } = useTranslation();

  const loadMemberResults = async (userId) => {
    setLoading(true);
    try {
      const res = await ContestResultsApi.getMemberResults({ userId });
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onValuesChange = async (_, values) => {
    setSearchParams(new URLSearchParams(values));
    await loadMemberResults(values.userId);
  };

  useEffect(() => {
    if (searchParams.has("userId")) {
      form.setFieldsValue({ userId: searchParams.get("userId") });
      loadMemberResults(searchParams.get("userId"));
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
          <Flex vertical gap={48}>
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
            <AnimatePresence mode="wait">
              {dailySubmissionsPopupOpen ? (
                <motion.div
                  key="daily-submissions"
                  initial={{ opacity: 0, x: i18n.dir() === "rtl" ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: i18n.dir() === "rtl" ? -100 : 100 }}
                  transition={{ duration: 0.1 }}
                >
                  <DailyUserSubmissions
                    onBack={() => setDailySubmissionsPopupOpen(false)}
                    userId={result?.person_data?.id}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="member-results"
                  initial={{ opacity: 0, x: i18n.dir() === "rtl" ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: i18n.dir() === "rtl" ? 100 : -100 }}
                  transition={{ duration: 0.1 }}
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12} xl={6} style={{ paddingBottom: 16 }}>
                      <Card bordered={false} style={{ height: "100%" }}>
                        <Statistic
                          title={t("totalPoints")}
                          value={result?.total_points || 0}
                          loading={loading}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={12} xl={6} style={{ paddingBottom: 16 }}>
                      <Card bordered={false} style={{ height: "100%" }}>
                        <Statistic
                          title={t("rank")}
                          value={result?.rank}
                          loading={loading}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={12} xl={6} style={{ paddingBottom: 16 }}>
                      <Card bordered={false} style={{ height: "100%" }}>
                        <Space gap={8} direction="vertical">
                          <Typography.Text type="secondary">
                            {t("submissions")}
                          </Typography.Text>
                          <Button
                            size="small"
                            onClick={() => setDailySubmissionsPopupOpen(true)}
                            disabled={loading}
                            icon={
                              i18n.dir() === "rtl" ? (
                                <ArrowLeftIcon />
                              ) : (
                                <ArrowRightIcon />
                              )
                            }
                          >
                            {t("viewSubmissionsPerDay")}
                          </Button>
                        </Space>
                      </Card>
                    </Col>
                  </Row>
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
                  </Row>
                </motion.div>
              )}
            </AnimatePresence>
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
