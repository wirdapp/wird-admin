import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const mobileCalendarClassNames =
	"w-full [--cell-size:max(2.75rem,calc((100cqw-24px)/7))] text-lg [&_.rdp-weekday]:text-sm [&_.rdp-caption_label]:text-base [&_.rdp-dropdowns]:text-base [&_.rdp-root]:w-full";

export interface DatePickerProps {
	value?: Date;
	onChange?: (date: Date | undefined) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	dateFormat?: string;
	disabledDates?: (date: Date) => boolean;
	fromDate?: Date;
	toDate?: Date;
	title?: string;
}

export function DatePicker({
	value,
	onChange,
	placeholder = "Pick a date",
	disabled = false,
	className,
	dateFormat = "PPP",
	disabledDates,
	fromDate,
	toDate,
	title,
}: DatePickerProps) {
	const { t } = useTranslation();
	const isMobile = useIsMobile();
	const [open, setOpen] = useState(false);

	const triggerButton = (
		<Button
			variant="outline"
			className={cn(
				"w-full justify-start text-left font-normal",
				!value && "text-muted-foreground",
				className,
			)}
			disabled={disabled}
			onClick={isMobile ? () => setOpen(true) : undefined}
		>
			<CalendarIcon className="me-2 h-4 w-4" />
			{value ? format(value, dateFormat) : <span>{placeholder}</span>}
		</Button>
	);

	const calendar = (
		<Calendar
			mode="single"
			selected={value}
			onSelect={(date) => {
				onChange?.(date);
				if (isMobile && date) setOpen(false);
			}}
			disabled={disabledDates}
			fromDate={fromDate}
			toDate={toDate}
			initialFocus
			className={cn(isMobile && mobileCalendarClassNames)}
		/>
	);

	if (isMobile) {
		return (
			<>
				{triggerButton}
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogContent className="flex flex-col items-center px-2">
						<DialogHeader>
							<DialogTitle>{title || t("select-date")}</DialogTitle>
						</DialogHeader>
						<div className="@container w-full">{calendar}</div>
					</DialogContent>
				</Dialog>
			</>
		);
	}

	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button
						variant="outline"
						className={cn(
							"w-full justify-start text-left font-normal",
							!value && "text-muted-foreground",
							className,
						)}
						disabled={disabled}
					/>
				}
			>
				<CalendarIcon className="me-2 h-4 w-4" />
				{value ? format(value, dateFormat) : <span>{placeholder}</span>}
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				{calendar}
			</PopoverContent>
		</Popover>
	);
}

export interface DateRangePickerProps {
	value?: { from: Date | undefined; to: Date | undefined };
	onChange?: (range: { from: Date | undefined; to: Date | undefined }) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	dateFormat?: string;
	title?: string;
}

export function DateRangePicker({
	value,
	onChange,
	placeholder = "Pick a date range",
	disabled = false,
	className,
	dateFormat = "LLL dd, y",
	title,
}: DateRangePickerProps) {
	const { t } = useTranslation();
	const isMobile = useIsMobile();
	const [open, setOpen] = useState(false);

	const triggerButton = (
		<Button
			variant="outline"
			className={cn(
				"w-full justify-start text-left font-normal",
				!value?.from && "text-muted-foreground",
				className,
			)}
			disabled={disabled}
			onClick={isMobile ? () => setOpen(true) : undefined}
		>
			<CalendarIcon className="mr-2 h-4 w-4" />
			{value?.from ? (
				value.to ? (
					<>
						{format(value.from, dateFormat)} - {format(value.to, dateFormat)}
					</>
				) : (
					format(value.from, dateFormat)
				)
			) : (
				<span>{placeholder}</span>
			)}
		</Button>
	);

	const calendar = (
		<Calendar
			mode="range"
			selected={value}
			onSelect={(range) => {
				onChange?.({
					from: range?.from,
					to: range?.to,
				});
				if (isMobile && range?.from && range?.to) setOpen(false);
			}}
			numberOfMonths={isMobile ? 1 : 2}
			initialFocus
			className={cn(isMobile && mobileCalendarClassNames)}
		/>
	);

	if (isMobile) {
		return (
			<>
				{triggerButton}
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogContent className="flex flex-col items-center px-2">
						<DialogHeader>
							<DialogTitle>{title || t("select-date")}</DialogTitle>
						</DialogHeader>
						<div className="@container w-full">{calendar}</div>
					</DialogContent>
				</Dialog>
			</>
		);
	}

	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button
						variant="outline"
						className={cn(
							"w-full justify-start text-left font-normal",
							!value?.from && "text-muted-foreground",
							className,
						)}
						disabled={disabled}
					/>
				}
			>
				<CalendarIcon className="mr-2 h-4 w-4" />
				{value?.from ? (
					value.to ? (
						<>
							{format(value.from, dateFormat)} - {format(value.to, dateFormat)}
						</>
					) : (
						format(value.from, dateFormat)
					)
				) : (
					<span>{placeholder}</span>
				)}
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				{calendar}
			</PopoverContent>
		</Popover>
	);
}
