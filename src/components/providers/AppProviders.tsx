import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type React from "react";
import type { ReactNode } from "react";
import { queryClient } from "../../lib/query-client";

interface AppProvidersProps {
	children: ReactNode;
}

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export function AppProviders({ children }: AppProvidersProps): React.ReactElement {
	const content = (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);

	if (!googleClientId) {
		return content;
	}

	return <GoogleOAuthProvider clientId={googleClientId}>{content}</GoogleOAuthProvider>;
}
