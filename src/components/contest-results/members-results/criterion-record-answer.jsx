import React, { useState } from "react";
import { Button, Form, Space } from "antd";
import { CriterionField } from "../../ContestCriteria/criterion-field";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const answerField = {
  UserInputPointRecord: "user_input",
  NumberPointRecord: "number",
  CheckboxPointRecord: "checked",
  MultiCheckboxPointRecord: "choices",
  RadioPointRecord: "choice",
};

export const CriterionRecordAnswer = ({ onSave, pointRecord, criteria }) => {
  const [form] = Form.useForm();
  const newAnswer = Form.useWatch(pointRecord.id, form);
  const [submitting, setSubmitting] = useState(false);

  const criterion = criteria.find(
    (c) => c.id === pointRecord.contest_criterion,
  );
  const fieldName = answerField[pointRecord.resourcetype];
  const answer = pointRecord[fieldName];

  if (!criterion) return null;

  const onFormFinish = async (values) => {
    setSubmitting(true);
    await onSave({
      record: pointRecord,
      data: {
        [fieldName]: values[pointRecord.id],
      },
    });
    setSubmitting(false);
  };

  return (
    <Form form={form} onFinish={onFormFinish}>
      <Form.Item name={pointRecord.id} initialValue={answer} noStyle>
        <CriterionField criterion={criterion} />
      </Form.Item>
      {newAnswer !== answer && (
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
