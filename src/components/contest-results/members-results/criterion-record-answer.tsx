import React, { useEffect, useState } from "react";
import { Button, Flex, Form, Space } from "antd";
import { CriterionField } from "../../ContestCriteria/criterion-field";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { Criterion } from "../../../types";

type AnswerValue = string | number | boolean | string[];

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
  [key: string]: AnswerValue | undefined;
}

interface SaveParams {
  record: PointRecordData;
  data: SaveData;
}

interface CriterionRecordAnswerProps {
  onSave: (params: SaveParams) => Promise<PointRecordData>;
  pointRecord: PointRecordData;
  criteria: Criterion[];
}

const answerField: Record<string, keyof PointRecordData> = {
  UserInputPointRecord: "user_input",
  NumberPointRecord: "number",
  CheckboxPointRecord: "checked",
  MultiCheckboxPointRecord: "choices",
  RadioPointRecord: "choice",
};

export const CriterionRecordAnswer: React.FC<CriterionRecordAnswerProps> = ({
  onSave,
  pointRecord: recordFromProps,
  criteria,
}) => {
  const [pointRecord, setPointRecord] = useState<PointRecordData>(recordFromProps);
  const [form] = Form.useForm();
  const newAnswer = Form.useWatch(pointRecord.id, form);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setPointRecord(recordFromProps);
  }, [recordFromProps]);

  const criterion = criteria.find(
    (c) => c.id === pointRecord.contest_criterion_data.id,
  );
  const fieldName = answerField[pointRecord.resourcetype];
  const answer = fieldName ? pointRecord[fieldName] : undefined;

  if (!criterion) return null;

  const onFormFinish = async (values: Record<string, AnswerValue>): Promise<void> => {
    setSubmitting(true);
    const updatedRecord = await onSave({
      record: pointRecord,
      data: {
        [fieldName]: values[pointRecord.id],
      },
    });
    setPointRecord(updatedRecord);
    setSubmitting(false);
  };

  const isText = pointRecord.resourcetype === "UserInputPointRecord";

  return (
    <Form form={form} onFinish={onFormFinish}>
      <Flex wrap="nowrap" align="center">
        <Form.Item name={pointRecord.id} initialValue={answer} noStyle>
          <CriterionField criterion={criterion} />
        </Form.Item>
        {newAnswer !== answer && (
          <Space
            direction={isText ? "vertical" : "horizontal"}
            style={{ marginInlineStart: 4 }}
            size={4}
          >
            <Button
              type="primary"
              size="small"
              htmlType="submit"
              icon={<CheckIcon />}
              loading={submitting}
            />
            <Button
              size="small"
              htmlType="reset"
              icon={<XMarkIcon />}
              disabled={submitting}
            />
          </Space>
        )}
      </Flex>
    </Form>
  );
};
