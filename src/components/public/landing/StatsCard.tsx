import CountUp from "react-countup";
import { Card, CardContent } from "components/ui/card";
import { cn } from "lib/utils";

export const StatCard = ({
	title,
	value,
	icon,
	small,
	ghost,
	classNames,
}: {
	title: string | React.ReactNode;
	value: number | string | React.ReactNode;
	icon?: React.ReactNode;
	small?: boolean;
	ghost?: boolean;
	classNames?: {
		root?: string;
		content?: string;
	};
}) => {
	const content = (
		<>
			{icon}
			<div
				className={cn(
					"flex flex-col text-start items-start",
					small ? "gap-1 text-sm" : "gap-3",
					classNames?.content,
				)}
			>
				{typeof value === "number" ? (
					<div
						className={cn(
							"font-bold text-gray-700",
							small ? "text-lg md:text-xl" : "text-2xl md:text-3xl",
						)}
					>
						<CountUp end={value} />
					</div>
				) : (
					value
				)}
				{title && <div className="text-gray-500">{title}</div>}
			</div>
		</>
	);

	if (ghost) {
		return (
			<div
				className={cn(
					"flex flex-1",
					small ? "gap-2 md:gap-3" : "gap-3 md:gap-4",
					classNames?.root,
				)}
			>
				{content}
			</div>
		);
	}

	return (
		<Card className={cn("flex-1", classNames?.root)}>
			<CardContent
				className={cn(
					"flex",
					small ? "gap-2 md:gap-3 p-4" : "gap-3 md:gap-4 p-6",
				)}
			>
				{content}
			</CardContent>
		</Card>
	);
};
