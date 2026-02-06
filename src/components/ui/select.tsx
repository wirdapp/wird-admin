import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Check, ChevronDown, ChevronUp, ListX } from "lucide-react";
import * as React from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
	HTMLButtonElement,
	React.ComponentPropsWithoutRef<"button"> & {
		children?: React.ReactNode;
	}
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={cn(
			"flex h-11 w-full items-center justify-between whitespace-nowrap rounded-lg border border-input bg-white px-4 py-2.5 text-base transition-colors data-[placeholder]:text-muted-foreground focus:outline-none focus:border-ring focus:ring-3 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
			className,
		)}
		{...props}
	>
		{children}
		<SelectPrimitive.Icon className="flex items-center">
			<ChevronDown className="h-5 w-5 opacity-50" />
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectScrollUpButton = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollUpArrow
		ref={ref}
		className={cn("flex cursor-default items-center justify-center py-1", className)}
		{...props}
	>
		<ChevronUp className="h-4 w-4" />
	</SelectPrimitive.ScrollUpArrow>
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";

const SelectScrollDownButton = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollDownArrow
		ref={ref}
		className={cn("flex cursor-default items-center justify-center py-1", className)}
		{...props}
	>
		<ChevronDown className="h-4 w-4" />
	</SelectPrimitive.ScrollDownArrow>
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";

const SelectContent = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<"div"> & {
		position?: string;
	}
>(({ className, children, position: _position, ...props }, ref) => {
	const isMobile = useIsMobile();

	const listContent = React.Children.count(children) > 0 ? (
		children
	) : (
		<div className="flex flex-col items-center justify-center gap-1.5 py-6 text-muted-foreground">
			<ListX className="h-5 w-5" />
			<span className="text-sm">Empty list</span>
		</div>
	);

	if (isMobile) {
		return (
			<SelectPrimitive.Portal>
				<SelectPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0" />
				<SelectPrimitive.Positioner className="!fixed !inset-x-0 !bottom-0 !top-auto !w-full !transform-none z-[51]">
					<SelectPrimitive.Popup
						ref={ref}
						className={cn(
							"w-full max-h-[70vh] overflow-y-auto overflow-x-hidden rounded-t-2xl border-t bg-popover text-popover-foreground p-1.5 pb-6 data-[open]:animate-in data-[closed]:animate-out data-[open]:slide-in-from-bottom data-[closed]:slide-out-to-bottom data-[open]:duration-300 data-[closed]:duration-200",
							className,
						)}
						{...props}
					>
						<div className="mx-auto mt-2 mb-3 h-1 w-8 rounded-full bg-muted-foreground/30" />
						<SelectPrimitive.List>{listContent}</SelectPrimitive.List>
					</SelectPrimitive.Popup>
				</SelectPrimitive.Positioner>
			</SelectPrimitive.Portal>
		);
	}

	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Positioner className="z-[51]">
				<SelectPrimitive.Popup
					ref={ref}
					className={cn(
						"relative z-50 max-h-[var(--available-height)] min-w-[calc(var(--anchor-width)+4px)] overflow-y-auto overflow-x-hidden rounded-lg border bg-popover text-popover-foreground data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 p-1.5",
						className,
					)}
					{...props}
				>
					<SelectScrollUpButton />
					<SelectPrimitive.List>{listContent}</SelectPrimitive.List>
					<SelectScrollDownButton />
				</SelectPrimitive.Popup>
			</SelectPrimitive.Positioner>
		</SelectPrimitive.Portal>
	);
});
SelectContent.displayName = "SelectContent";

const SelectLabel = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
	({ className, ...props }, ref) => (
		<SelectPrimitive.GroupLabel
			ref={ref}
			className={cn("px-3 py-2 text-base font-semibold", className)}
			{...props}
		/>
	),
);
SelectLabel.displayName = "SelectLabel";

const SelectItem = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<"div"> & { value: string }
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		className={cn(
			"relative flex w-full cursor-default select-none items-center rounded-md py-3 pl-4 pr-10 text-base outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		{...props}
	>
		<span className="absolute right-3 flex h-5 w-5 items-center justify-center">
			<SelectPrimitive.ItemIndicator>
				<Check className="h-5 w-5" />
			</SelectPrimitive.ItemIndicator>
		</span>
		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

const SelectSeparator = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
	({ className, ...props }, ref) => (
		<SelectPrimitive.Separator
			ref={ref}
			className={cn("-mx-1 my-1 h-px bg-muted", className)}
			{...props}
		/>
	),
);
SelectSeparator.displayName = "SelectSeparator";

export {
	Select,
	SelectGroup,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectLabel,
	SelectItem,
	SelectSeparator,
	SelectScrollUpButton,
	SelectScrollDownButton,
};
