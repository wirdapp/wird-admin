import React from "react";
import {
  Alert,
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  InputNumber,
  Tooltip,
  Typography,
} from "antd";
import { CriteriaTypeSelect } from "./criteria-type-select";
import { useTranslation } from "react-i18next";
import { FieldTypes } from "../../../services/contest-criteria/consts";
import { TrashIcon } from "@heroicons/react/20/solid";
import { v4 as uuidv4 } from "uuid";
import { css } from "@emotion/css";

export const CriteriaTypeFields = ({ form, isEdit }) => {
  const { t } = useTranslation();
  const selectedType = Form.useWatch("resourcetype", form);

  return (
    <>
      {isEdit && (
        <Alert
          showIcon
          type="info"
          message={t("criteria-type-change-warning")}
          style={{ marginBottom: 16 }}
        />
      )}
      <Form.Item
        label={t("criteria-type")}
        name="resourcetype"
        rules={[{ required: true }]}
      >
        <CriteriaTypeSelect disabled={isEdit} />
      </Form.Item>
      {selectedType === FieldTypes.Text && (
        <Form.Item
          name="allow_multiline"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox>{t("allow-multiline")}</Checkbox>
        </Form.Item>
      )}
      {selectedType === FieldTypes.Number && (
        <>
          <Form.Item
            label={t("criteria-min")}
            name="lower_bound"
            initialValue={0}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label={t("criteria-max")}
            name="upper_bound"
            initialValue={20}
          >
            <InputNumber />
          </Form.Item>
        </>
      )}
      {selectedType === FieldTypes.Checkbox && (
        <>
          <Form.Item
            label={t("checked-label")}
            name="checked_label"
            initialValue={t("yes")}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("unchecked-label")}
            name="unchecked_label"
            rules={[{ required: true }]}
            initialValue={t("no")}
          >
            <Input />
          </Form.Item>
        </>
      )}
      {selectedType === FieldTypes.MultipleChoices && (
        <Form.Item
          name="partial_points"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox>{t("partial-points")}</Checkbox>
        </Form.Item>
      )}
      {(selectedType === FieldTypes.Radio ||
        selectedType === FieldTypes.MultipleChoices) && (
        <>
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                <Typography.Text>{t("options")}:</Typography.Text>
                <ol>
                  {fields.map((field, index) => (
                    <li
                      key={field.key}
                      className={css`
                        margin-bottom: 16px;
                      `}
                    >
                      <Flex gap="small" align="center">
                        <Form.Item hidden name={[field.name, "id"]} />
                        <Form.Item
                          name={[field.name, "label"]}
                          rules={[{ required: true }]}
                          style={{ width: "100%" }}
                          noStyle
                        >
                          <Input size="small" placeholder={t("option")} />
                        </Form.Item>
                        <Tooltip title={t("is-correct")}>
                          <div>
                            <Form.Item
                              noStyle
                              name={[field.name, "is_correct"]}
                              valuePropName="checked"
                            >
                              <Checkbox />
                            </Form.Item>
                          </div>
                        </Tooltip>
                        <Button
                          onClick={() => remove(index)}
                          type="text"
                          size="small"
                          danger
                          icon={<TrashIcon />}
                        />
                      </Flex>
                    </li>
                  ))}
                </ol>
                <Button
                  type="dashed"
                  size="small"
                  onClick={() =>
                    add({
                      id: uuidv4(),
                      label: "",
                      is_correct: false,
                    })
                  }
                  block
                >
                  {t("add-option")}
                </Button>
              </>
            )}
          </Form.List>
        </>
      )}
    </>
  );
};
