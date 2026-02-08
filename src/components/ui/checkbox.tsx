import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<HTMLElement, Omit<CheckboxPrimitive.Root.Props, "ref">>(
	({ className, ...props }, ref) => (
		<CheckboxPrimitive.Root
			ref={ref}
			className={cn(
				"grid place-content-center peer h-6 w-6 shrink-0 rounded-md border border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[checked]:bg-primary data-[checked]:text-primary-foreground",
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator className={cn("grid place-content-center text-current")}>
				<Check className="h-5 w-5" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	),
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
