import { css } from "@emotion/css";
import { Flex, Select } from "antd";
import type React from "react";
import { useTranslation } from "react-i18next";
import { FieldTypesIcons, FieldTypesOptions } from "../../../services/contest-criteria/consts";
import { colors } from "../../../styles";

interface CriteriaTypeSelectProps {
	value?: string;
	onChange?: (value: string) => void;
	disabled?: boolean;
}

export const CriteriaTypeSelect: React.FC<CriteriaTypeSelectProps> = ({
	value,
	onChange,
	...props
}) => {
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
