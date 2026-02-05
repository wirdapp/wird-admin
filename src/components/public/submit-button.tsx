import { Loader2 } from "lucide-react";
import { Button } from "components/ui/button";

export const SubmitButton = ({
	children,
	loading = false,
	disabled,
	...props
}: React.ComponentProps<typeof Button> & { loading?: boolean }) => {
	return (
		<Button type="submit" disabled={loading || disabled} {...props}>
			{loading && <Loader2 className="size-4 animate-spin" />}
			{children}
		</Button>
	);
};
