import React, { useEffect, useState } from "react";
import { Button, Form, InputNumber, Space } from "antd";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDashboardData } from "../../../util/routes-data";
import { isAtLeastSuperAdmin } from "../../../util/ContestPeople_Role";

export const CriterionRecordPoints = ({
  onSave,
  pointRecord: recordFromProps,
  criteria,
}) => {
  const [pointRecord, setPointRecord] = useState(recordFromProps);
  const [form] = Form.useForm();
  const newPoints = Form.useWatch("point_total", form);
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useDashboardData();

  const canEdit = isAtLeastSuperAdmin(currentUser.role);

  useEffect(() => {
    setPointRecord(recordFromProps);
  }, [recordFromProps]);

  const criterion = criteria.find(
    (c) => c.id === pointRecord.contest_criterion_data.id,
  );

  const onFormFinish = async (values) => {
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
      <Form.Item
        name="point_total"
        initialValue={pointRecord.point_total}
        noStyle
      >
        <InputNumber max={criterion.points} min={0} readOnly={!canEdit} />
      </Form.Item>
      {canEdit && newPoints !== pointRecord.point_total && (
        <Space style={{ marginInlineStart: 4 }} size={4}>
          <Button
            type="text"
            size="small"
            htmlType="submit"
            icon={<CheckIcon />}
            loading={submitting}
          />
          <Button
            type="text"
            size="small"
            htmlType="reset"
            icon={<XMarkIcon />}
            disabled={submitting}
          />
        </Space>
      )}
    </Form>
  );
};
