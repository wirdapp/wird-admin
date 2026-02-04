import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useCurrentUser } from '../../services/auth/queries';
import { useContests, useContestDetails } from '../../services/contests/queries';
import { useNotifications } from '../../services/notifications/queries';
import {
  isLogged,
  destroySession,
  updateSessionUserDetails,
} from '../../services/auth/session';
import {
  getCurrentContestId,
  changeCurrentContest,
} from '../../services/contests/utils';

const DashboardDataContext = createContext(null);

export function DashboardDataProvider({ children }) {
  const location = useLocation();

  // If not logged in, redirect to login
  if (!isLogged()) {
    const redirectTo = location.pathname;
    return <Navigate to={`/login?redirectTo=${redirectTo}`} replace />;
  }

  return <DashboardDataLoader>{children}</DashboardDataLoader>;
}

function DashboardDataLoader({ children }) {
  const location = useLocation();

  // Fetch current user
  const {
    data: currentUser,
    isLoading: userLoading,
    isError: userError,
  } = useCurrentUser();

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
  const {
    data: contests = [],
    isLoading: contestsLoading,
  } = useContests({
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
  const {
    data: currentContest,
    isLoading: contestDetailsLoading,
  } = useContestDetails(currentContestId, {
    enabled: !!currentContestId,
  });

  // Fetch notifications
  const {
    data: notifications = [],
  } = useNotifications(currentContestId, {
    enabled: !!currentContestId,
  });

  // Handle auth error redirect
  if (userError) {
    const redirectTo = location.pathname;
    return <Navigate to={`/login?redirectTo=${redirectTo}`} replace />;
  }

  // Show loading state
  const isLoading = userLoading || contestsLoading || (currentContestId && contestDetailsLoading);
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  // Enrich user with role from current contest
  const enrichedUser = currentUser ? {
    ...currentUser,
    role: currentContest?.person_contest_role,
  } : null;

  const value = {
    currentUser: enrichedUser,
    contests,
    currentContest,
    notifications,
  };

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  );
}

export function useDashboardData() {
  const context = useContext(DashboardDataContext);
  if (!context) {
    return {};
  }
  return context;
}
