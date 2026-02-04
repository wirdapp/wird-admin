import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Form, InputNumber, Space } from "antd";
import type React from "react";
import { useEffect, useState } from "react";
import { FieldTypes } from "../../../services/contest-criteria/consts";
import type { Criterion } from "../../../types";
import { isAtLeastSuperAdmin } from "../../../util/roles";
import { useDashboardData } from "../../../util/routes-data";

interface PointRecordData {
	id: string;
	point_total: number;
	contest_criterion_data: {
		id: string;
		label: string;
	};
	resourcetype: string;
	record_date: string;
	person: string;
	timestamp: string;
	user_input?: string;
	number?: number;
	checked?: boolean;
	choices?: string[];
	choice?: string;
}

interface SaveData {
	point_total?: number;
	points?: number;
	number?: number;
	checked?: boolean;
	choice?: string;
	choices?: string[];
	user_input?: string;
}

interface SaveParams {
	record: PointRecordData;
	data: SaveData;
}

interface CriterionRecordPointsProps {
	onSave: (params: SaveParams) => Promise<PointRecordData>;
	pointRecord: PointRecordData;
	criteria: Criterion[];
}

interface FormValues {
	point_total: number;
}

export const CriterionRecordPoints: React.FC<CriterionRecordPointsProps> = ({
	onSave,
	pointRecord: recordFromProps,
	criteria,
}) => {
	const [pointRecord, setPointRecord] = useState<PointRecordData>(recordFromProps);
	const [form] = Form.useForm<FormValues>();
	const newPoints = Form.useWatch("point_total", form);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const { currentUser } = useDashboardData();

	useEffect(() => {
		setPointRecord(recordFromProps);
	}, [recordFromProps]);

	const criterion = criteria.find((c) => c.id === pointRecord.contest_criterion_data.id);

	const canEdit =
		currentUser?.role !== undefined &&
		isAtLeastSuperAdmin(currentUser.role) &&
		criterion?.resourcetype === FieldTypes.Text;

	const onFormFinish = async (values: FormValues): Promise<void> => {
		if (!canEdit) return;
		setSubmitting(true);
		const updatedRecord = await onSave({
			record: pointRecord,
			data: {
				point_total: values.point_total,
			},
		});
		setPointRecord(updatedRecord);
		setSubmitting(false);
	};

	return (
		<Form form={form} onFinish={onFormFinish}>
			{canEdit ? (
				<Form.Item name="point_total" initialValue={pointRecord.point_total} noStyle>
					<InputNumber max={criterion?.max_points} min={0} />
				</Form.Item>
			) : (
				pointRecord.point_total
			)}
			{canEdit && newPoints !== pointRecord.point_total && (
				<Space style={{ marginInlineStart: 4 }} size={4}>
					<Button
						type="primary"
						size="small"
						htmlType="submit"
						icon={<CheckIcon />}
						loading={submitting}
					/>
					<Button size="small" htmlType="reset" icon={<XMarkIcon />} disabled={submitting} />
				</Space>
			)}
		</Form>
	);
};
