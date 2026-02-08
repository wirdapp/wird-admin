import { Radio } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { Circle } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<HTMLDivElement, Omit<RadioGroupPrimitive.Props, "ref">>(
	({ className, ...props }, ref) => {
		return <RadioGroupPrimitive className={cn("grid gap-3", className)} {...props} ref={ref} />;
	},
);
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<HTMLElement, Omit<Radio.Root.Props, "ref">>(
	({ className, ...props }, ref) => {
		return (
			<Radio.Root
				ref={ref}
				className={cn(
					"aspect-square h-5 w-5 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring data-disabled:cursor-not-allowed data-disabled:opacity-50",
					className,
				)}
				{...props}
			>
				<Radio.Indicator className="flex items-center justify-center">
					<Circle className="h-4 w-4 fill-primary" />
				</Radio.Indicator>
			</Radio.Root>
		);
	},
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
