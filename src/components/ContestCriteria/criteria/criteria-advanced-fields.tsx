import type React from "react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
} from "@/components/ui/combobox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { getContestDays } from "../../../util/contest-utils";
import { createNormalizedFilter } from "../../../util/normalize-text";
import { useDashboardData } from "../../../util/routes-data";

interface DateOption {
	value: string;
	label: string;
}

export const CriteriaAdvancedFields: React.FC = () => {
	const { t } = useTranslation();
	const { currentContest } = useDashboardData();
	const form = useFormContext();
	const dateFilter = useMemo(() => createNormalizedFilter<DateOption>((item) => item.label), []);
	const activateOnDates: string[] | undefined = form.watch("activate_on_dates");
	const deactivateOnDates: string[] | undefined = form.watch("deactivate_on_dates");

	const { activateOnDatesOptions, deactivateOnDatesOptions } = useMemo<{
		activateOnDatesOptions: DateOption[];
		deactivateOnDatesOptions: DateOption[];
	}>(() => {
		if (!currentContest) {
			return { activateOnDatesOptions: [], deactivateOnDatesOptions: [] };
		}
		const contestDays = getContestDays(currentContest);
		const activateOnDatesOptions: DateOption[] = [];
		const deactivateOnDatesOptions: DateOption[] = [];
		for (const d of contestDays) {
			const value = d.format("YYYY-MM-DD");
			const label = d.format("dddd, DD MMMM YYYY");
			if (!deactivateOnDates?.includes(value)) {
				activateOnDatesOptions.push({ value, label });
			}
			if (!activateOnDates?.includes(value)) {
				deactivateOnDatesOptions.push({ value, label });
			}
		}
		return { activateOnDatesOptions, deactivateOnDatesOptions };
	}, [currentContest, activateOnDates, deactivateOnDates]);

	return (
		<div className="space-y-4">
			<div className="flex gap-6">
				<FormField
					control={form.control}
					name="visible"
					render={({ field }) => (
						<FormItem className="flex items-center gap-2 space-y-0">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<FormLabel className="font-normal">{t("criteria-visible")}</FormLabel>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="active"
					render={({ field }) => (
						<FormItem className="flex items-center gap-2 space-y-0">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<FormLabel className="font-normal">{t("criteria-active")}</FormLabel>
						</FormItem>
					)}
				/>
			</div>
			<FormField
				control={form.control}
				name="activate_on_dates"
				render={({ field }) => (
					<FormItem>
						<FormLabel>{t("criteria-show-on-dates")}</FormLabel>
						<FormControl>
							<Combobox
								items={activateOnDatesOptions}
								itemToStringValue={(item: DateOption) => item.label}
								filter={dateFilter}
								multiple
								value={
									field.value
										? activateOnDatesOptions.filter((opt: DateOption) =>
												field.value.includes(opt.value),
											)
										: []
								}
								onValueChange={(items: DateOption[]) => {
									field.onChange(items.map((item: DateOption) => item.value));
								}}
							>
								<ComboboxChips className="min-h-10 text-base">
									<ComboboxValue>
										{(field.value || []).map((dateValue: string) => {
											const option = activateOnDatesOptions.find((opt) => opt.value === dateValue);
											return option ? (
												<ComboboxChip key={option.value} className="text-sm py-1">
													{option.label}
												</ComboboxChip>
											) : null;
										})}
									</ComboboxValue>
									<ComboboxChipsInput placeholder={t("select-dates")} className="text-base" />
								</ComboboxChips>
								<ComboboxContent>
									<ComboboxEmpty>{t("no-dates-found")}</ComboboxEmpty>
									<ComboboxList>
										{(item) => (
											<ComboboxItem key={item.value} value={item} className="py-2 text-base">
												{item.label}
											</ComboboxItem>
										)}
									</ComboboxList>
								</ComboboxContent>
							</Combobox>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="deactivate_on_dates"
				render={({ field }) => (
					<FormItem>
						<FormLabel>{t("criteria-hide-on-dates")}</FormLabel>
						<FormControl>
							<Combobox
								items={deactivateOnDatesOptions}
								itemToStringValue={(item: DateOption) => item.label}
								filter={dateFilter}
								multiple
								value={
									field.value
										? deactivateOnDatesOptions.filter((opt: DateOption) =>
												field.value.includes(opt.value),
											)
										: []
								}
								onValueChange={(items: DateOption[]) => {
									field.onChange(items.map((item: DateOption) => item.value));
								}}
							>
								<ComboboxChips className="min-h-10 text-base">
									<ComboboxValue>
										{(field.value || []).map((dateValue: string) => {
											const option = deactivateOnDatesOptions.find(
												(opt) => opt.value === dateValue,
											);
											return option ? (
												<ComboboxChip key={option.value} className="text-sm py-1">
													{option.label}
												</ComboboxChip>
											) : null;
										})}
									</ComboboxValue>
									<ComboboxChipsInput placeholder={t("select-dates")} className="text-base" />
								</ComboboxChips>
								<ComboboxContent>
									<ComboboxEmpty>{t("no-dates-found")}</ComboboxEmpty>
									<ComboboxList>
										{(item) => (
											<ComboboxItem key={item.value} value={item} className="py-2 text-base">
												{item.label}
											</ComboboxItem>
										)}
									</ComboboxList>
								</ComboboxContent>
							</Combobox>
						</FormControl>
					</FormItem>
				)}
			/>
		</div>
	);
};
