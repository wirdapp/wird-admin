import React, { useMemo } from "react";
import { Checkbox, Empty, Flex, Input, InputNumber, Radio, Switch } from "antd";
import { css } from "@emotion/css";
import { useContestCriteriaContext } from "./contest-criteria-context";
import { FieldTypes } from "../../services/contest-criteria/consts";
import { useTranslation } from "react-i18next";

export const ContestPreview = () => {
  const { t } = useTranslation();
  const { sections, criteria } = useContestCriteriaContext();

  const sortedSections = useMemo(
    () => sections.items.sort((a, b) => a.position - b.position),
    [sections.items],
  );

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
      `}
    >
      {sections.items.length === 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={t("no-sections")}
        />
      )}
      {sortedSections.map((section) => {
        const sectionCriteria = criteria.items
          .filter((c) => c.section === section.id)
          .sort((a, b) => a.order_in_section - b.order_in_section);

        return (
          <Flex
            vertical
            gap={16}
            key={section.id}
            className={css`
              padding: 16px;
              border-bottom: 1px solid #eee;
            `}
          >
            <div
              className={css`
                font-weight: bold;
                font-size: 16px;
                line-height: 24px;
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
              <Flex vertical key={c.id} gap="small">
                <div
                  className={css`
                    font-size: 14px;
                    line-height: 20px;
                  `}
                >
                  {c.label}
                </div>
                <div
                  className={css`
                    font-size: 14px;
                    line-height: 20px;
                  `}
                >
                  {c.resourcetype === FieldTypes.Text && (
                    <Input placeholder={c.label} />
                  )}
                  {c.resourcetype === FieldTypes.Number && <InputNumber />}
                  {c.resourcetype === FieldTypes.Checkbox && (
                    <Switch
                      checkedChildren={t("yes")}
                      unCheckedChildren={t("no")}
                    />
                  )}
                  {c.resourcetype === FieldTypes.MultipleChoices && (
                    <Checkbox.Group options={c.options} />
                  )}
                  {c.resourcetype === FieldTypes.Radio && (
                    <Radio.Group options={c.options} />
                  )}
                </div>
              </Flex>
            ))}
          </Flex>
        );
      })}
    </Flex>
  );
};
