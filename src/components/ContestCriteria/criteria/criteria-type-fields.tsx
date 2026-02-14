import { TrashIcon } from "@heroicons/react/20/solid";
import { Info } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
// @ts-expect-error - uuid types not installed
import { v4 as uuidv4 } from "uuid";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FieldTypes } from "../../../services/contest-criteria/consts";
import { CriteriaTypeSelect } from "./criteria-type-select";

interface CriteriaTypeFieldsProps {
	isEdit: boolean;
}

interface CriterionOption {
	id: string;
	label: string;
	is_correct: boolean;
}

export const CriteriaTypeFields: React.FC<CriteriaTypeFieldsProps> = ({ isEdit }) => {
	const { t, i18n } = useTranslation();
	const form = useFormContext();
	const selectedType: string | undefined = form.watch("resourcetype");
	const options: CriterionOption[] = form.watch("options") || [];

	const onCheckboxChecked = (checked: boolean, index: number): void => {
		const currentOptions: CriterionOption[] = form.getValues("options") ?? [];

		if (selectedType === FieldTypes.Radio) {
			if (checked) {
				form.setValue(
					"options",
					currentOptions.map((option, i) => ({
						...option,
						is_correct: i === index,
					})),
				);
			}
		} else if (selectedType === FieldTypes.MultipleChoices) {
			form.setValue(
				"options",
				currentOptions.map((option, i) => ({
					...option,
					is_correct: i === index ? checked : option.is_correct,
				})),
			);
		}
	};

	const addOption = () => {
		const currentOptions: CriterionOption[] = form.getValues("options") ?? [];
		form.setValue("options", [
			...currentOptions,
			{
				id: uuidv4(),
				label: "",
				is_correct: false,
			},
		]);
	};

	const removeOption = (index: number) => {
		const currentOptions: CriterionOption[] = form.getValues("options") ?? [];
		form.setValue(
			"options",
			currentOptions.filter((_, i) => i !== index),
		);
	};

	return (
		<div className="space-y-4">
			{isEdit && (
				<Alert>
					<Info className="h-4 w-4" />
					<AlertDescription>{t("criteria-type-change-warning")}</AlertDescription>
				</Alert>
			)}
			<FormField
				control={form.control}
				name="resourcetype"
				rules={{ required: t("requiredField") }}
				render={({ field }) => (
					<FormItem>
						<FormLabel>{t("criteria-type")}</FormLabel>
						<FormControl>
							<CriteriaTypeSelect
								value={field.value}
								onChange={field.onChange}
								disabled={isEdit}
								title={t("criteria-type")}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			{selectedType === FieldTypes.Text && (
				<FormField
					control={form.control}
					name="allow_multiline"
					render={({ field }) => (
						<FormItem className="flex items-center gap-2 space-y-0">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<FormLabel className="font-normal">{t("allow-multiline")}</FormLabel>
						</FormItem>
					)}
				/>
			)}
			{selectedType === FieldTypes.Number && (
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="lower_bound"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("criteria-min")}</FormLabel>
								<FormControl>
									<Input
										type="number"
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="upper_bound"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("criteria-max")}</FormLabel>
								<FormControl>
									<Input
										type="number"
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			)}
			{selectedType === FieldTypes.Checkbox && (
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="checked_label"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("checked-label")}</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="unchecked_label"
						rules={{ required: t("requiredField") }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("unchecked-label")}</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			)}
			{selectedType === FieldTypes.MultipleChoices && (
				<FormField
					control={form.control}
					name="partial_points"
					render={({ field }) => (
						<FormItem className="flex items-center gap-2 space-y-0">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<FormLabel className="font-normal">{t("partial-points")}</FormLabel>
						</FormItem>
					)}
				/>
			)}
			{(selectedType === FieldTypes.Radio || selectedType === FieldTypes.MultipleChoices) && (
				<div className="space-y-4">
					<Label>{t("options")}:</Label>
					<ol className="list-decimal list-inside space-y-4">
						{options.map((option, index) => (
							<li key={option.id} className="flex items-center gap-2">
								<FormField
									control={form.control}
									name={`options.${index}.label`}
									rules={{ required: t("requiredField") }}
									render={({ field }) => (
										<Input className="flex-1 h-8" placeholder={t("option")} {...field} />
									)}
								/>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<div>
												<Checkbox
													checked={options[index]?.is_correct}
													onCheckedChange={(checked) =>
														onCheckboxChecked(checked as boolean, index)
													}
												/>
											</div>
										</TooltipTrigger>
										<TooltipContent side={i18n.dir() === "ltr" ? "right" : "left"}>
											{t("is-correct")}
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => removeOption(index)}
									className="text-destructive hover:text-destructive"
								>
									<TrashIcon className="h-4 w-4" />
								</Button>
							</li>
						))}
					</ol>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={addOption}
						className="w-full border-dashed"
					>
						{t("add-option")}
					</Button>
				</div>
			)}
		</div>
	);
};
