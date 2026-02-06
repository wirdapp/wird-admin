import { Menu } from "@base-ui/react/menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import * as React from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const DropdownMenu = Menu.Root;

const DropdownMenuTrigger = React.forwardRef<
	HTMLButtonElement,
	React.ComponentPropsWithoutRef<"button"> & {
		asChild?: boolean;
		render?: React.ReactElement;
	}
>(({ asChild, render, children, ...props }, ref) => {
	const renderProp =
		render ||
		(asChild && React.isValidElement(children) ? (children as React.ReactElement) : undefined);

	if (renderProp && asChild) {
		return <Menu.Trigger ref={ref} render={renderProp} {...props} />;
	}

	return (
		<Menu.Trigger ref={ref} render={render} {...props}>
			{children}
		</Menu.Trigger>
	);
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuGroup = Menu.Group;

const DropdownMenuPortal = Menu.Portal;

const DropdownMenuSub = Menu.SubmenuRoot;

const DropdownMenuRadioGroup = Menu.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<"div"> & {
		inset?: boolean;
	}
>(({ className, inset, children, ...props }, ref) => (
	<Menu.SubmenuTrigger
		ref={ref}
		className={cn(
			"flex cursor-default select-none items-center gap-2.5 rounded-md px-3 py-2.5 text-base outline-none focus:bg-accent data-[popup-open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
			inset && "pl-8",
			className,
		)}
		{...props}
	>
		{children}
		<ChevronRight className="ml-auto" />
	</Menu.SubmenuTrigger>
));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

const DropdownMenuSubContent = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<Menu.Portal>
				<Menu.Backdrop className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0" />
				<Menu.Positioner className="!fixed !inset-x-0 !bottom-0 !top-auto !w-full !transform-none z-[51]">
					<Menu.Popup
						ref={ref}
						className={cn(
							"mobile-drawer w-full max-h-[70vh] overflow-y-auto overflow-x-hidden rounded-t-2xl border-t bg-popover text-popover-foreground p-1.5 pb-6 data-[open]:animate-in data-[closed]:animate-out data-[open]:slide-in-from-bottom data-[closed]:slide-out-to-bottom data-[open]:duration-300 data-[closed]:duration-200",
							className,
						)}
						{...props}
					>
						<div className="mx-auto mt-2 mb-3 h-1 w-8 rounded-full bg-muted-foreground/30" />
						{children}
					</Menu.Popup>
				</Menu.Positioner>
			</Menu.Portal>
		);
	}

	return (
		<Menu.Portal>
			<Menu.Positioner className="z-50">
				<Menu.Popup
					ref={ref}
					className={cn(
						"min-w-[8rem] overflow-hidden rounded-lg border bg-popover p-1.5 text-popover-foreground data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
						className,
					)}
					{...props}
				>
					{children}
				</Menu.Popup>
			</Menu.Positioner>
		</Menu.Portal>
	);
});
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

const DropdownMenuContent = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<"div"> & {
		sideOffset?: number;
		side?: "top" | "right" | "bottom" | "left";
		align?: "start" | "center" | "end";
	}
>(({ className, children, sideOffset = 4, side, align, ...props }, ref) => {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<Menu.Portal>
				<Menu.Backdrop className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0" />
				<Menu.Positioner className="!fixed !inset-x-0 !bottom-0 !top-auto !w-full !transform-none z-[51]">
					<Menu.Popup
						ref={ref}
						className={cn(
							"mobile-drawer w-full max-h-[70vh] overflow-y-auto overflow-x-hidden rounded-t-2xl border-t bg-popover text-popover-foreground p-1.5 pb-6 data-[open]:animate-in data-[closed]:animate-out data-[open]:slide-in-from-bottom data-[closed]:slide-out-to-bottom data-[open]:duration-300 data-[closed]:duration-200",
							className,
						)}
						{...props}
					>
						<div className="mx-auto mt-2 mb-3 h-1 w-8 rounded-full bg-muted-foreground/30" />
						{children}
					</Menu.Popup>
				</Menu.Positioner>
			</Menu.Portal>
		);
	}

	return (
		<Menu.Portal>
			<Menu.Positioner className="z-50" sideOffset={sideOffset} side={side} align={align}>
				<Menu.Popup
					ref={ref}
					className={cn(
						"max-h-[var(--available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-lg border bg-popover p-1.5 text-popover-foreground",
						"data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
						className,
					)}
					{...props}
				>
					{children}
				</Menu.Popup>
			</Menu.Positioner>
		</Menu.Portal>
	);
});
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<"div"> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<Menu.Item
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center gap-2.5 rounded-md px-3 py-2.5 text-base outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-5 [&>svg]:shrink-0 [.mobile-drawer_&]:py-3.5",
			inset && "pl-8",
			className,
		)}
		{...props}
	/>
));
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuCheckboxItem = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<"div"> & {
		checked?: boolean;
		onCheckedChange?: (checked: boolean) => void;
	}
>(({ className, children, checked, onCheckedChange, ...props }, ref) => (
	<Menu.CheckboxItem
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-md py-2.5 pl-10 pr-3 text-base outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [.mobile-drawer_&]:py-3.5",
			className,
		)}
		checked={checked}
		onCheckedChange={onCheckedChange}
		{...props}
	>
		<span className="absolute left-3 flex h-5 w-5 items-center justify-center">
			<Menu.CheckboxItemIndicator>
				<Check className="h-5 w-5" />
			</Menu.CheckboxItemIndicator>
		</span>
		{children}
	</Menu.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

const DropdownMenuRadioItem = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<"div"> & {
		value: string;
	}
>(({ className, children, ...props }, ref) => (
	<Menu.RadioItem
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-md py-2.5 pl-10 pr-3 text-base outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [.mobile-drawer_&]:py-3.5",
			className,
		)}
		{...props}
	>
		<span className="absolute left-3 flex h-5 w-5 items-center justify-center">
			<Menu.RadioItemIndicator>
				<Circle className="h-2.5 w-2.5 fill-current" />
			</Menu.RadioItemIndicator>
		</span>
		{children}
	</Menu.RadioItem>
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

const DropdownMenuLabel = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<"div"> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("px-3 py-2 text-base font-semibold", inset && "pl-8", className)}
		{...props}
	/>
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
	<Menu.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
	return (
		<span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
	);
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuGroup,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuRadioGroup,
};
