import React, { useState } from "react";
import { FieldTypes } from "../../../services/contest-criteria/consts";
import { Button, Form, InputNumber, Space } from "antd";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export const CriterionRecordPoints = ({ onSave, pointRecord, criteria }) => {
  const [form] = Form.useForm();
  const newPoints = Form.useWatch("point_total", form);
  const [submitting, setSubmitting] = useState(false);

  const criterion = criteria.find(
    (c) => c.id === pointRecord.contest_criterion,
  );
  const canEdit = criterion.resourcetype === FieldTypes.Text;

  const onFormFinish = async (values) => {
    setSubmitting(true);
    await onSave({
      record: pointRecord,
      data: {
        point_total: values.point_total,
      },
    });
    setSubmitting(false);
  };

  return (
    <Form form={form} onFinish={onFormFinish}>
      <Form.Item
        name="point_total"
        initialValue={pointRecord.point_total}
        noStyle
      >
        <InputNumber max={criterion.points} min={0} disabled={!canEdit} />
      </Form.Item>
      {newPoints !== pointRecord.point_total && (
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
