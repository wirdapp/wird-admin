import React, { useEffect } from "react";
import { Checkbox, Form, InputNumber } from "antd";
import { CriteriaTypeSelect } from "./criteria-type-select";
import { useTranslation } from "react-i18next";
import { FieldTypes } from "../../../services/contest-criteria/consts";
import { MultipleChoiceControl } from "./multiple-choice-control";

export const CriteriaTypeFields = ({ initialType }) => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = React.useState(initialType);

  useEffect(() => {
    setSelectedType(initialType);
  }, [initialType]);

  return (
    <>
      <Form.Item
        label={t("criteria-type")}
        name="resourcetype"
        rules={[{ required: true }]}
        initialValue={initialType}
      >
        <CriteriaTypeSelect value={selectedType} onChange={setSelectedType} />
      </Form.Item>
      {selectedType === FieldTypes.Text && (
        <Form.Item
          name="multiline"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox>{t("allow-multiline")}</Checkbox>
        </Form.Item>
      )}
      {selectedType === FieldTypes.Number && (
        <>
          <Form.Item label={t("criteria-min")} name="min">
            <InputNumber />
          </Form.Item>
          <Form.Item label={t("criteria-max")} name="max">
            <InputNumber />
          </Form.Item>
        </>
      )}
      {/*{selectedType === FieldTypes.Checkbox && (*/}
      {/*  <>*/}
      {/*    <Form.Item*/}
      {/*      label={t("checked-label")}*/}
      {/*      name="checked_label"*/}
      {/*      rules={[{ required: true }]}*/}
      {/*    >*/}
      {/*      <Input />*/}
      {/*    </Form.Item>*/}
      {/*    <Form.Item*/}
      {/*      label={t("unchecked-label")}*/}
      {/*      name="unchecked_label"*/}
      {/*      rules={[{ required: true }]}*/}
      {/*    >*/}
      {/*      <Input />*/}
      {/*    </Form.Item>*/}
      {/*  </>*/}
      {/*)}*/}
      {(selectedType === FieldTypes.Radio ||
        selectedType === FieldTypes.MultipleChoices) && (
        <>
          <Form.Item
            label={t("options")}
            name="options"
            rules={[{ required: true }]}
          >
            <MultipleChoiceControl />
          </Form.Item>
        </>
      )}
    </>
  );
};
