import { useMatches } from "react-router-dom";
import { useMemo } from "react";

export function useMatchesData(id) {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id],
  );
  return route?.data;
}

export function useDashboardData() {
  return useMatchesData("dashboard") || {};
}

export function usePageTitle() {
  const matchingRoutes = useMatches();
  const route = matchingRoutes[matchingRoutes.length - 1];
  return route?.data?.title;
}
