import type React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";
import { allCountries } from "../../data/countries";
import { createNormalizedFilter } from "../../util/normalize-text";

interface CountryOption {
	value: string;
	label: string;
}

interface CountrySelectProps {
	value?: string;
	onValueChange?: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
	value,
	onValueChange,
	placeholder,
	disabled,
	className,
}) => {
	const { i18n } = useTranslation();

	const countryFilter = useMemo(
		() => createNormalizedFilter<CountryOption>((item) => item.label),
		[],
	);

	const countries = useMemo(() => {
		return allCountries(i18n.language)
			.filter((country): country is { code: string; name: string } => Boolean(country))
			.map((country) => ({
				label: country.name,
				value: country.code,
			}))
			.sort((a, b) => a.label.localeCompare(b.label));
	}, [i18n.language]);

	const selectedOption = useMemo(
		() => countries.find((c) => c.value === value) ?? null,
		[countries, value],
	);

	return (
		<Combobox
			items={countries}
			itemToStringValue={(item: CountryOption) => item.label}
			filter={countryFilter}
			value={selectedOption}
			onValueChange={(item: CountryOption | null) => {
				onValueChange?.(item?.value ?? "");
			}}
		>
			<ComboboxInput
				showClear
				placeholder={placeholder}
				disabled={disabled}
				className={className}
			/>
			<ComboboxContent>
				<ComboboxEmpty>No countries found</ComboboxEmpty>
				<ComboboxList>
					{(item: CountryOption) => (
						<ComboboxItem key={item.value} value={item}>
							{item.label}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
};
