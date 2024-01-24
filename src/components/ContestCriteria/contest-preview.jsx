import React from "react";
import {
  Checkbox,
  Empty,
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
} from "antd";
import { css } from "@emotion/css";
import { FieldTypes } from "../../services/contest-criteria/consts";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useContestSections } from "./sections/use-contest-sections";
import { useContestCriteria } from "./criteria/use-contest-criteria";

export const ContestPreview = () => {
  const { t } = useTranslation();
  const { sections } = useContestSections();
  const { criteriaItems } = useContestCriteria();

  return (
    <Flex
      vertical
      gap="small"
      className={css`
        max-width: 350px;
        width: 100%;
        background: #fff;
        border-radius: 4px;
        margin: 0 auto;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
        @media (min-width: 992px) {
          height: 600px;
          overflow-y: auto;
        }
      `}
    >
      {sections.length === 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={t("no-sections")}
        />
      )}
      <AnimatePresence>
        {sections.map((section) => {
          const sectionCriteria = criteriaItems.filter(
            (c) => c.section === section.id && c.visible,
          );

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Form
                layout="vertical"
                className={css`
                  padding: 16px;
                  border-bottom: 3px solid #eee;
                `}
              >
                <div
                  className={css`
                    font-weight: bold;
                    font-size: 18px;
                    line-height: 24px;
                    margin-bottom: 16px;
                  `}
                >
                  {section.label}
                </div>
                {sectionCriteria.length === 0 && (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={t("no-criteria")}
                  />
                )}
                {sectionCriteria.map((c) => (
                  <Form.Item
                    className={css`
                      margin: 4px -6px;
                      padding: 6px;
                      border-radius: 4px;
                      border-bottom: 1px solid #f5f5f5;

                      &:last-child {
                        border-bottom: none;
                      }

                      .ant-form-item-label label {
                        width: 100%;
                        justify-content: space-between;
                        font-weight: 600;

                        &:after {
                          content: none;
                        }
                      }
                    `}
                    label={
                      <>
                        <span>{c.label}</span>
                        <i
                          className={css`
                            color: #aaa;
                          `}
                        >
                          ({t("points", { count: c.points })})
                        </i>
                      </>
                    }
                    key={c.id}
                    extra={c.description}
                  >
                    {c.resourcetype === FieldTypes.Text &&
                      (c.allow_multiline ? (
                        <Input.TextArea placeholder={c.label} />
                      ) : (
                        <Input placeholder={c.label} />
                      ))}
                    {c.resourcetype === FieldTypes.Number && (
                      <InputNumber
                        defaultValue={c.lower_bound || 0}
                        min={c.lower_bound}
                        max={c.upper_bound}
                      />
                    )}
                    {c.resourcetype === FieldTypes.Checkbox && (
                      <Switch
                        checkedChildren={c.checked_label ?? t("yes")}
                        unCheckedChildren={c.unchecked_label ?? t("no")}
                      />
                    )}
                    {c.resourcetype === FieldTypes.MultipleChoices && (
                      <Checkbox.Group
                        options={c.options.map((o) => ({
                          label: o.label,
                          value: o.id,
                        }))}
                      />
                    )}
                    {c.resourcetype === FieldTypes.Radio && (
                      <Radio.Group
                        options={c.options.map((o) => ({
                          label: o.label,
                          value: o.id,
                        }))}
                      />
                    )}
                  </Form.Item>
                ))}
              </Form>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Flex>
  );
};
