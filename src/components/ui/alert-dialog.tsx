import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = React.forwardRef<
	HTMLButtonElement,
	React.ComponentPropsWithoutRef<"button"> & {
		asChild?: boolean;
	}
>(({ asChild, children, ...props }, ref) => {
	if (asChild && React.isValidElement(children)) {
		return <DialogPrimitive.Trigger ref={ref} render={children} {...props} />;
	}
	return (
		<DialogPrimitive.Trigger ref={ref} {...props}>
			{children}
		</DialogPrimitive.Trigger>
	);
});
AlertDialogTrigger.displayName = "AlertDialogTrigger";

const AlertDialogPortal = DialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
	({ className, ...props }, ref) => (
		<DialogPrimitive.Backdrop
			className={cn(
				"fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0",
				className,
			)}
			{...props}
			ref={ref}
		/>
	),
);
AlertDialogOverlay.displayName = "AlertDialogOverlay";

const AlertDialogContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
	({ className, ...props }, ref) => (
		<AlertDialogPortal>
			<AlertDialogOverlay />
			<DialogPrimitive.Popup
				ref={ref}
				className={cn(
					"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-150 data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-[0.97] data-[open]:zoom-in-[0.97] sm:rounded-lg",
					className,
				)}
				{...props}
			/>
		</AlertDialogPortal>
	),
);
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
		{...props}
	/>
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithoutRef<"h2">>(
	({ className, ...props }, ref) => (
		<DialogPrimitive.Title
			ref={ref}
			className={cn("text-lg font-semibold", className)}
			{...props}
		/>
	),
);
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = React.forwardRef<
	HTMLParagraphElement,
	React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogAction = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
	<button ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = React.forwardRef<
	HTMLButtonElement,
	React.ComponentPropsWithoutRef<"button">
>(({ className, children, ...props }, ref) => (
	<DialogPrimitive.Close
		ref={ref}
		className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
		{...props}
	>
		{children}
	</DialogPrimitive.Close>
));
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
	AlertDialog,
	AlertDialogPortal,
	AlertDialogOverlay,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
};
