import { useMatches } from "react-router-dom";

// Re-export from DashboardDataProvider for backwards compatibility
export { useDashboardData } from "../components/layout/DashboardDataProvider";

export function usePageTitle() {
  const matchingRoutes = useMatches();
  const route = matchingRoutes[matchingRoutes.length - 1];
  return route?.data?.title;
}
