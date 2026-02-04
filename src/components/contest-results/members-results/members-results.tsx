import { css } from "@emotion/css";
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
import type React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useMemberResults } from "../../../services/contest-results/queries";
import { colors } from "../../../styles";
import { Role } from "../../../util/roles";
import { getFullName, getInitials } from "../../../util/user-utils";
import { DailyUserSubmissions } from "./daily-user-submissions";
import { MemberScorePerCategoryChart } from "./member-score-per-category-chart";
import { MemberScorePerDayChart } from "./member-score-per-day-chart";
import { StyledMembersResultsWrapper } from "./members-results.styles";
import { MembersSelect } from "./members-select";

interface FormValues {
	userId?: string;
}

export const MembersResults: React.FC = () => {
	const [form] = Form.useForm<FormValues>();
	const [searchParams, setSearchParams] = useSearchParams();
	const { t } = useTranslation();
	const userId = searchParams.get("userId");

	const { data: result, isLoading: loading, refetch } = useMemberResults(userId ?? undefined);

	const reload = async (): Promise<void> => {
		await refetch();
	};

	const onValuesChange = async (_: Partial<FormValues>, values: FormValues): Promise<void> => {
		setSearchParams(new URLSearchParams(values as Record<string, string>));
	};

	useEffect(() => {
		if (userId) {
			form.setFieldsValue({ userId });
		}
	}, [form, userId]);

	return (
		<StyledMembersResultsWrapper>
			<div className="side-filters">
				<Form
					form={form}
					layout="vertical"
					onValuesChange={onValuesChange}
					initialValues={{ userId: searchParams.get("userId") ?? undefined }}
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
									{getInitials(result?.person_data)}
								</Avatar>
								<Space direction="vertical">
									<Typography.Title level={3} style={{ marginBottom: 0 }}>
										{getFullName(result?.person_data)}
									</Typography.Title>
									<Typography.Text>{result?.person_data?.username}</Typography.Text>
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
								<Statistic title={t("rank")} value={result?.rank} loading={loading} />
							</Card>
						</Flex>
						<Row gutter={16}>
							<Col xs={24} lg={12} style={{ paddingBottom: 24 }}>
								<Card bordered={false} title={t("pointsPerDay")} loading={loading}>
									<MemberScorePerDayChart data={result?.days} />
								</Card>
							</Col>
							<Col xs={24} lg={12} style={{ paddingBottom: 24 }}>
								<Card bordered={false} title={t("scorePerCategory")} loading={loading}>
									<MemberScorePerCategoryChart data={result?.scores} />
								</Card>
							</Col>
							<Col span={24}>
								<Card bordered={false} title={t("dailySubmissionsPopup.title")} loading={loading}>
									<DailyUserSubmissions userId={result?.person_data?.id} onUpdated={reload} />
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
