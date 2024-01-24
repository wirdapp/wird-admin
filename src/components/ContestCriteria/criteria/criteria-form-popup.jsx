import React, { useEffect } from "react";
import { Form, message, Modal, Spin, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { CriteriaBasicFields } from "./criteria-basic-fields";
import { CriteriaTypeFields } from "./criteria-type-fields";
import { CriteriaAdvancedFields } from "./criteria-advanced-fields";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useContestCriteria } from "./use-contest-criteria";
import { FieldTypes } from "../../../services/contest-criteria/consts";

export const CriteriaFormPopup = ({
  criterionId,
  section,
  open,
  onClose,
  index,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { actions } = useContestCriteria({ sectionId: section.id });

  useEffect(() => {
    if (!open) return;
    if (criterionId) {
      setLoading(true);
      actions
        .getById(criterionId)
        .then((criterion) => {
          form.setFieldsValue({
            ...criterion,
            // pa
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      form.resetFields();
    }
  }, [open, criterionId, form]);

  const handleFormSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (criterionId) {
        await actions.update(criterionId, {
          ...values,
        });
        messageApi.success(t("criteria-updated"));
      } else {
        await actions.add({
          ...values,
          section: section.id,
          order_in_section: index,
        });
        messageApi.success(t("criteria-added"));
      }
      handleClose();
    } catch (e) {
      messageApi.error(t("criteria-operation-failed"));
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title={criterionId ? t("update-criteria") : t("add-criteria")}
      onOk={() => form.submit()}
      okText={criterionId ? t("update") : t("add")}
      cancelText={t("cancel")}
      okButtonProps={{
        loading: submitting,
        disabled: loading,
        icon: <CheckIcon />,
      }}
      width={600}
      destroyOnClose
    >
      {contextHolder}
      <Spin spinning={loading}>
        <Form
          onFinish={handleFormSubmit}
          form={form}
          layout="vertical"
          style={{ marginBottom: 24 }}
          initialValues={{
            resourcetype: FieldTypes.Text,
          }}
          disabled={submitting || loading}
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
                children: <CriteriaTypeFields form={form} />,
              },
              {
                label: t("criteria-advanced"),
                key: "advanced",
                children: <CriteriaAdvancedFields form={form} />,
              },
            ]}
          />
        </Form>
      </Spin>
    </Modal>
  );
};
