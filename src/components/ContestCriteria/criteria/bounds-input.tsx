import { Form, InputNumber } from "antd";
import type React from "react";
import { useTranslation } from "react-i18next";

interface BoundsInputProps {
	value?: [number | undefined, number | undefined];
	onChange?: (value: [number | undefined, number | undefined]) => void;
}

export const BoundsInput: React.FC<BoundsInputProps> = ({ value, onChange }) => {
	const { t } = useTranslation();

	const handleChange = (type: "min" | "max", val: number | null): void => {
		const newValue: [number | undefined, number | undefined] = [
			...(value ?? [undefined, undefined]),
		] as [number | undefined, number | undefined];
		newValue[type === "min" ? 0 : 1] = val ?? undefined;
		onChange?.(newValue);
	};

	return (
		<>
			<Form.Item label={t("criteria-min")}>
				<InputNumber value={value?.[0]} onChange={(val) => handleChange("min", val)} />
			</Form.Item>
			<Form.Item label={t("criteria-max")}>
				<InputNumber value={value?.[1]} onChange={(val) => handleChange("max", val)} />
			</Form.Item>
		</>
	);
};
