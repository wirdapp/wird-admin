import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import * as React from "react";

import { cn } from "@/lib/utils";

type SwitchProps = Omit<SwitchPrimitive.Root.Props, "ref"> & {
	checkedText?: string;
	uncheckedText?: string;
};

/** Border (2×2) + thumb (20) + text side-padding (8+8) + gap between thumb and text (2) */
const FIXED_PADDING = 40;
const MIN_WIDTH = 48;
/** border(4) + thumb(20) + gap(2) */
const THUMB_OFFSET = 26;
const THUMB_REST = 2;

function useTextSwitchLayout(checkedText?: string, uncheckedText?: string) {
	const [layout, setLayout] = React.useState<{
		width: number;
		travel: number;
	} | null>(null);

	React.useEffect(() => {
		if (!checkedText && !uncheckedText) {
			setLayout(null);
			return;
		}

		const span = document.createElement("span");
		span.style.cssText =
			"position:absolute;visibility:hidden;white-space:nowrap;font-size:10px;font-weight:500;line-height:1";
		document.body.appendChild(span);

		span.textContent = checkedText ?? "";
		const w1 = span.offsetWidth;
		span.textContent = uncheckedText ?? "";
		const w2 = span.offsetWidth;

		document.body.removeChild(span);

		const maxTextWidth = Math.max(w1, w2);
		const width = Math.max(maxTextWidth + FIXED_PADDING, MIN_WIDTH);
		const travel = width - THUMB_OFFSET;

		setLayout({ width, travel });
	}, [checkedText, uncheckedText]);

	return layout;
}

function isRtl() {
	return document.documentElement.dir === "rtl";
}

const Switch = React.forwardRef<HTMLElement, SwitchProps>(
	(
		{ className, checkedText, uncheckedText, checked, defaultChecked, onCheckedChange, ...props },
		ref,
	) => {
		const hasText = checkedText || uncheckedText;
		const layout = useTextSwitchLayout(checkedText, uncheckedText);

		const isControlled = checked !== undefined;
		const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
		const isChecked = isControlled ? checked : internalChecked;

		const handleCheckedChange = React.useCallback<NonNullable<SwitchProps["onCheckedChange"]>>(
			(val, event) => {
				if (!isControlled) setInternalChecked(val);
				onCheckedChange?.(val, event);
			},
			[isControlled, onCheckedChange],
		);

		const thumbTransform =
			hasText && layout
				? (() => {
						const dir = isRtl() ? -1 : 1;
						const px = isChecked ? dir * layout.travel : dir * THUMB_REST;
						return `translateX(${px}px)`;
					})()
				: undefined;

		return (
			<SwitchPrimitive.Root
				className={cn(
					"group peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[checked]:bg-primary data-[unchecked]:bg-input",
					hasText ? "relative h-7 overflow-hidden" : "h-7 w-12",
					className,
				)}
				style={hasText && layout ? { width: layout.width } : undefined}
				checked={checked}
				defaultChecked={defaultChecked}
				onCheckedChange={handleCheckedChange}
				{...props}
				ref={ref}
			>
				{hasText && (
					<span className="pointer-events-none absolute inset-y-0 start-2 flex select-none items-center text-[10px] font-medium leading-none text-primary-foreground transition-opacity duration-200 group-data-[checked]:opacity-100 group-data-[unchecked]:opacity-0">
						{checkedText}
					</span>
				)}
				<SwitchPrimitive.Thumb
					className={cn(
						"pointer-events-none block h-5 w-5 shrink-0 rounded-full bg-background ring-0 transition-transform duration-200",
						!hasText &&
							"data-[checked]:translate-x-5 data-[unchecked]:translate-x-0.5 rtl:data-[checked]:-translate-x-5 rtl:data-[unchecked]:-translate-x-0.5",
					)}
					style={thumbTransform ? { transform: thumbTransform } : undefined}
				/>
				{hasText && (
					<span className="pointer-events-none absolute inset-y-0 end-2 flex select-none items-center text-[10px] font-medium leading-none text-muted-foreground transition-opacity duration-200 group-data-[checked]:opacity-0 group-data-[unchecked]:opacity-100">
						{uncheckedText}
					</span>
				)}
			</SwitchPrimitive.Root>
		);
	},
);
Switch.displayName = "Switch";

export { Switch };
