import { useMatches } from "react-router";

// Re-export from DashboardDataProvider for backwards compatibility
export { useDashboardData } from "../components/layout/DashboardDataProvider";
export type { DashboardContextValue, EnrichedUser } from "../types";

interface RouteData {
	title?: string;
}

export function usePageTitle(): string | undefined {
	const matchingRoutes = useMatches();
	const route = matchingRoutes[matchingRoutes.length - 1];
	return (route?.data as RouteData)?.title;
}
