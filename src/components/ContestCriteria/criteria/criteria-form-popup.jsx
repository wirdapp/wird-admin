import React, { useEffect } from "react";
import { Form, message, Modal, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { useContestCriteriaContext } from "../contest-criteria-context";
import { CriteriaBasicFields } from "./criteria-basic-fields";
import { CriteriaTypeFields } from "./criteria-type-fields";
import { CriteriaAdvancedFields } from "./criteria-advanced-fields";
import { CheckIcon } from "@heroicons/react/24/outline";
import { FieldTypes } from "../../../services/contest-criteria/consts";

export const CriteriaFormPopup = ({
  criterion,
  section,
  open,
  onClose,
  index,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { criteria } = useContestCriteriaContext();

  useEffect(() => {
    form.setFieldsValue(criterion);
  }, [criterion, form]);

  const handleFormSubmit = async (values) => {
    try {
      if (criterion) {
        await criteria.update(criterion.id, {
          ...criterion,
          ...values,
        });
        messageApi.success(t("criteria-updated"));
      } else {
        await criteria.add({
          ...values,
          section: section.id,
          order_in_section: index,
        });
        messageApi.success(t("criteria-added"));
      }
      onClose();
    } catch (e) {
      messageApi.error(t("criteria-add-failed"));
      console.error(e);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      title={criterion ? t("update-criteria") : t("add-criteria")}
      onOk={() => form.submit()}
      okText={criterion ? t("update") : t("add")}
      cancelText={t("cancel")}
      okButtonProps={{ loading: false, icon: <CheckIcon /> }}
      width={600}
    >
      {contextHolder}
      <Form
        onFinish={handleFormSubmit}
        form={form}
        layout="vertical"
        style={{ marginBottom: 24 }}
        initialValues={criterion}
      >
        <Tabs
          items={[
            {
              label: t("criteria-basic"),
              key: "basic",
              children: <CriteriaBasicFields />,
            },
            {
              label: t("criteria-type"),
              key: "type",
              children: (
                <CriteriaTypeFields
                  initialType={criterion?.resourcetype || FieldTypes.Text}
                />
              ),
            },
            {
              label: t("criteria-advanced"),
              key: "advanced",
              children: <CriteriaAdvancedFields />,
            },
          ]}
        />
      </Form>
    </Modal>
  );
};
