import { cn } from "lib/utils";

type Props = {
	id?: string;
	title: string;
	description?: string;
	children: React.ReactNode;
	classNames?: {
		title?: string;
		description?: string;
		root?: string;
		wrapper?: string;
	};
};

export const Section = ({
	id,
	title,
	description,
	children,
	classNames,
}: Props) => {
	return (
		<div id={id} className={cn("text-gray-500 px-6 lg:px-8", classNames?.root)}>
			<div className={cn("max-w-5xl mx-auto w-full", classNames?.wrapper)}>
				<h2
					className={cn(
						"text-3xl font-bold mb-4 text-gray-700",
						classNames?.title,
					)}
				>
					{title}
				</h2>
				{description && (
					<p className={cn("mb-4", classNames?.description)}>{description}</p>
				)}
				{children}
			</div>
		</div>
	);
};
