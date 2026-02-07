import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import * as React from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
	({ className, ...props }, ref) => (
		<DialogPrimitive.Backdrop
			ref={ref}
			className={cn(
				"fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[open]:duration-300 data-[closed]:duration-200",
				className,
			)}
			{...props}
		/>
	),
);
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
	({ className, children, ...props }, ref) => {
		const isMobile = useIsMobile();
		const popupRef = React.useRef<HTMLDivElement>(null);

		const mergedRef = React.useCallback(
			(node: HTMLDivElement | null) => {
				popupRef.current = node;
				if (typeof ref === "function") ref(node);
				else if (ref) ref.current = node;
			},
			[ref],
		);

		const handleAnimationEnd = React.useCallback(
			(e: React.AnimationEvent) => {
				if (!isMobile || e.target !== e.currentTarget) return;
				const el = popupRef.current?.querySelector<HTMLElement>(
					"input:not([disabled]):not([type='hidden']), textarea:not([disabled]), select:not([disabled])",
				);
				el?.focus({ preventScroll: true });
			},
			[isMobile],
		);

		return (
			<DialogPortal>
				<DialogOverlay />
				<DialogPrimitive.Popup
					ref={mergedRef}
					initialFocus={isMobile ? false : undefined}
					onAnimationEnd={handleAnimationEnd}
					className={cn(
						isMobile
							? "fixed inset-x-0 bottom-0 z-50 grid w-full min-h-[50vh] max-h-[85vh] gap-5 overflow-y-auto rounded-t-2xl border-t bg-background p-6 pb-8 shadow-lg data-[open]:animate-in data-[closed]:animate-out data-[open]:slide-in-from-bottom data-[closed]:slide-out-to-bottom data-[open]:duration-300 data-[closed]:duration-200"
							: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg max-h-[85vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] gap-5 border bg-background p-8 shadow-lg duration-150 data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-[0.97] data-[open]:zoom-in-[0.97] sm:rounded-xl",
						className,
					)}
					{...props}
				>
					{isMobile && (
						<div className="mx-auto -mt-2 mb-1 h-1 w-8 rounded-full bg-muted-foreground/30" />
					)}
					{children}
					<DialogPrimitive.Close className="absolute end-5 top-5 rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[open]:bg-accent data-[open]:text-muted-foreground">
						<X className="h-5 w-5" />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				</DialogPrimitive.Popup>
			</DialogPortal>
		);
	},
);
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex flex-col space-y-2 text-center sm:text-start", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:space-x-3 rtl:space-x-reverse",
			className,
		)}
		{...props}
	/>
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithoutRef<"h2">>(
	({ className, ...props }, ref) => (
		<DialogPrimitive.Title
			ref={ref}
			className={cn("text-lg font-semibold leading-none tracking-tight", className)}
			{...props}
		/>
	),
);
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
	HTMLParagraphElement,
	React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={cn("text-base text-muted-foreground", className)}
		{...props}
	/>
));
DialogDescription.displayName = "DialogDescription";

export {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogTrigger,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
};
