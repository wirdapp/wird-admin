import React from "react";
import { Button, Input } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { css } from "@emotion/css";

interface MultipleChoiceControlProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}

export const MultipleChoiceControl: React.FC<MultipleChoiceControlProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  const addOption = (): void => {
    onChange?.([...(value ?? []), ""]);
  };

  return (
    <>
      <ol
        className={css`
          padding-inline-start: 40px;

          > li {
            margin-bottom: 8px;
          }
        `}
      >
        {value?.map((item, index) => (
          <li key={index}>
            <Input
              value={item}
              onChange={(e) => {
                const newValue = [...(value ?? [])];
                newValue[index] = e.target.value;
                onChange?.(newValue);
              }}
            />
          </li>
        ))}
      </ol>
      <Button
        type="dashed"
        icon={<PlusIcon />}
        onClick={addOption}
        className={css`
          margin-inline-start: 40px;
        `}
      >
        {t("add-option")}
      </Button>
    </>
  );
};
