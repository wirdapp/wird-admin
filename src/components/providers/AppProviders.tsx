import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type React from "react";
import type { ReactNode } from "react";
import { queryClient } from "../../lib/query-client";

interface AppProvidersProps {
	children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps): React.ReactElement {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
