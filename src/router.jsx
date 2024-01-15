import {
  createBrowserRouter,
  Outlet,
  redirect,
  useRouteError,
} from "react-router-dom";
import Login from "./components/Login";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";
import ContestModerator from "./components/ContestModerator";
import Competition from "./components/Competition";
import Leaderboard from "./components/leaderboard";
import Loader from "./components/Loader";
import Students from "./components/Students";
import Groups from "./components/Groups";
import ContestCriteria from "./components/ContestCriteria";
import ReviewOtherPoints from "./components/ReviewOtherPoints";
import ExportPoints from "./components/ExportPoints";
import { ContestResults } from "./components/contest-results";
import {
  destroySession,
  isLogged,
  updateSessionUserDetails,
} from "./services/auth/session";
import { isSuperAdmin } from "./util/ContestPeople_Role";
import * as AuthApi from "./services/auth/api";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import { ReactComponent as WirdLogo } from "assets/icons/Shared/wirdLogo.svg";
import { getContests } from "./services/contests/api";
import { Helmet } from "react-helmet";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import dayjs from "dayjs";
import { getCurrentContest } from "./services/contests/utils";

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  if (error.status === 404) {
    return (
      <div className="error-page">
        <WirdLogo />
        <hr />
        <h2>404 Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <a href="/dashboard">Go to Home</a>
      </div>
    );
  }

  // Uncaught ReferenceError: path is not defined
  return (
    <div className="error-page">
      <WirdLogo />
      <hr />
      <h2>Something went wrong :(</h2>
    </div>
  );
}

const MainLayout = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === "ar") {
      dayjs.locale("ar");
    } else {
      dayjs.locale("en");
    }
  }, [i18n.language]);

  return (
    <>
      <Helmet>
        <html lang={i18n.language || "en"} dir={i18n.dir()} />
        <meta charSet="utf-8" />
      </Helmet>
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        loader: () => redirect("/dashboard"),
      },
      {
        path: "login",
        loader: () => {
          if (localStorage.getItem("token")) {
            return redirect("/dashboard");
          }
          return null;
        },
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        id: "dashboard",
        path: "dashboard",
        loader: async ({ request }) => {
          const redirectTo = new URL(request.url).pathname;
          if (!isLogged()) {
            return redirect(`/login?redirectTo=${redirectTo}`);
          }
          const data = {};

          try {
            // make sure session still valid
            data.currentUser = await AuthApi.currentUserInfo();
            updateSessionUserDetails(data.currentUser);
            data.isSuperAdmin = isSuperAdmin(data.currentUser);
          } catch (e) {
            destroySession();
            return redirect(`/login?redirectTo=${redirectTo}`);
          }

          try {
            data.contests = await getContests();
            data.currentContest = await getCurrentContest(data.contests);
          } catch (e) {
            console.log(`Failed to get current contest: ${e}`);
            data.currentContest = null;
          }
          return data;
        },
        element: <DashboardLayout />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
          },
          {
            path: "competition",
            element: <Competition />,
          },
          {
            path: "leaderboard",
            element: <Leaderboard />,
          },
          {
            path: "loading",
            element: <Loader />,
          },
          {
            path: "students",
            element: <Students />,
          },
          {
            path: "groups",
            element: <Groups />,
          },
          {
            path: "admins",
            element: <ContestModerator />,
          },
          {
            path: "contest-criteria",
            element: <ContestCriteria />,
          },
          {
            path: "review-other-points",
            element: <ReviewOtherPoints />,
          },
          {
            path: "results/:tab",
            element: <ContestResults />,
          },
          {
            path: "export-points",
            element: <ExportPoints />,
          },
        ],
      },
    ],
  },
]);
