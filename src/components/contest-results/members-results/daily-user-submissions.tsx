import { Button, DatePicker, Form } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import type React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCriteria } from "../../../services/contest-criteria/queries";
import { useMemberDaySubmissions } from "../../../services/contest-results/queries";
import { useDashboardData } from "../../../util/routes-data";
import { DailySubmissionsTable } from "./daily-submissions-table";

interface DailyUserSubmissionsProps {
	onUpdated?: () => void;
	userId?: string;
}

interface FormValues {
	date: Dayjs;
}

export const DailyUserSubmissions: React.FC<DailyUserSubmissionsProps> = ({
	onUpdated,
	userId,
}) => {
	const { t } = useTranslation();
	const { currentContest } = useDashboardData();
	const [form] = Form.useForm<FormValues>();
	const [selectedDate, setSelectedDate] = useState<string | null>(null);

	const { data: criteriaData = [] } = useCriteria(currentContest?.id);
	const {
		data: submissionsData,
		isLoading: loading,
		refetch,
	} = useMemberDaySubmissions(userId, selectedDate ?? undefined, currentContest?.id);

	const submissions = (submissionsData as { points?: unknown[] } | undefined)?.points ?? [];

	useEffect(() => {
		setSelectedDate(null);
		form.resetFields();
	}, [userId, form]);

	const onFormFinish = async (values: FormValues): Promise<void> => {
		setSelectedDate(values.date.format("YYYY-MM-DD"));
	};

	const afterRecordUpdate = (): void => {
		refetch();
		onUpdated?.();
	};

	return (
		<div>
			<Form form={form} layout="inline" onFinish={onFormFinish} style={{ marginBottom: 24 }}>
				<Form.Item
					label={t("dailySubmissionsPopup.date")}
					name="date"
					rules={[{ required: true, message: t("requiredField") as string }]}
					initialValue={currentContest?.start_date}
				>
					<DatePicker
						disabledDate={(current: Dayjs) => {
							// Can not select days before today and today
							return (
								current &&
								(dayjs(currentContest?.start_date).startOf("day").isAfter(current) ||
									dayjs(currentContest?.end_date).endOf("day").isBefore(current))
							);
						}}
					/>
				</Form.Item>
				<Button type="primary" htmlType="submit" loading={loading}>
					{t("dailySubmissionsPopup.load")}
				</Button>
			</Form>
			<DailySubmissionsTable
				submissions={submissions as never[]}
				criteria={criteriaData}
				onUpdated={afterRecordUpdate}
			/>
		</div>
	);
};
