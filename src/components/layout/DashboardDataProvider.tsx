import { Spin } from "antd";
import React, { createContext, type ReactNode, useContext, useEffect, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCurrentUser } from "../../services/auth/queries";
import { destroySession, isLogged, updateSessionUserDetails } from "../../services/auth/session";
import { useContestDetails, useContests } from "../../services/contests/queries";
import { changeCurrentContest, getCurrentContestId } from "../../services/contests/utils";
import { useNotifications } from "../../services/notifications/queries";
import type { DashboardContextValue, EnrichedUser } from "../../types";

const DashboardDataContext = createContext<DashboardContextValue | null>(null);

interface DashboardDataProviderProps {
	children: ReactNode;
}

export function DashboardDataProvider({ children }: DashboardDataProviderProps) {
	const location = useLocation();

	// If not logged in, redirect to login
	if (!isLogged()) {
		const redirectTo = location.pathname;
		return <Navigate to={`/login?redirectTo=${redirectTo}`} replace />;
	}

	return <DashboardDataLoader>{children}</DashboardDataLoader>;
}

interface DashboardDataLoaderProps {
	children: ReactNode;
}

function DashboardDataLoader({ children }: DashboardDataLoaderProps) {
	const location = useLocation();

	// Fetch current user
	const { data: currentUser, isLoading: userLoading, isError: userError } = useCurrentUser();

	// Update session when user data changes
	useEffect(() => {
		if (currentUser) {
			updateSessionUserDetails(currentUser);
		}
	}, [currentUser]);

	// Handle auth error - session expired
	useEffect(() => {
		if (userError) {
			destroySession();
		}
	}, [userError]);

	// Fetch contests
	const { data: contests = [], isLoading: contestsLoading } = useContests({
		enabled: !!currentUser,
	});

	// Determine current contest ID
	const currentContestId = useMemo(() => {
		if (contests.length === 0) return null;
		let id = getCurrentContestId();
		if (!contests.find((c) => c.id === id)) {
			id = contests[0]?.id;
		}
		if (id) {
			changeCurrentContest(id);
		}
		return id;
	}, [contests]);

	// Fetch current contest details
	const { data: currentContest, isLoading: contestDetailsLoading } = useContestDetails(
		currentContestId ?? undefined,
	);

	// Fetch notifications
	const { data: notifications = [] } = useNotifications(currentContestId ?? undefined);

	// Handle auth error redirect
	if (userError) {
		const redirectTo = location.pathname;
		return <Navigate to={`/login?redirectTo=${redirectTo}`} replace />;
	}

	// Show loading state
	const isLoading = userLoading || contestsLoading || (currentContestId && contestDetailsLoading);
	if (isLoading) {
		return (
			<div
				style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
			>
				<Spin size="large" />
			</div>
		);
	}

	// Enrich user with role from current contest
	const enrichedUser: EnrichedUser | null = currentUser
		? {
				...currentUser,
				role: currentContest?.person_contest_role,
			}
		: null;

	const value: DashboardContextValue = {
		currentUser: enrichedUser,
		contests,
		currentContest: currentContest ?? null,
		notifications,
	};

	return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData(): DashboardContextValue {
	const context = useContext(DashboardDataContext);
	if (!context) {
		return {
			currentUser: null,
			contests: [],
			currentContest: null,
			notifications: [],
		};
	}
	return context;
}
