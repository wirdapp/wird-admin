import React from "react";
import { Flex, Select } from "antd";
import {
  FieldTypesIcons,
  FieldTypesOptions,
} from "../../../services/contest-criteria/consts";
import { useTranslation } from "react-i18next";
import { colors } from "../../../styles";
import { css } from "@emotion/css";

export const CriteriaTypeSelect = ({ value, onChange, ...props }) => {
  const { t } = useTranslation();
  return (
    <Select
      {...props}
      value={value}
      onChange={onChange}
      options={FieldTypesOptions.map((o) => {
        const Icon = FieldTypesIcons[o.value];
        return {
          label: (
            <Flex align="center" gap="small">
              <Icon
                className={css`
                  color: ${colors.orange};
                  display: block;
                  width: 16px;
                `}
              />
              {t(o.label)}
            </Flex>
          ),
          value: o.value,
        };
      })}
    />
  );
};
