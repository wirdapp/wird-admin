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
import Students from "./components/Students";
import Groups from "./components/Groups";
import ContestCriteria from "./components/ContestCriteria";
import ReviewOtherPoints from "./components/ReviewOtherPoints";
import ExportPoints from "./components/ExportPoints";
import { ContestResults } from "./components/contest-results";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import { ReactComponent as WirdLogo } from "assets/icons/Shared/wirdLogo.svg";
import { Helmet } from "react-helmet";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import dayjs from "dayjs";
import { dashboardLoader } from "./components/layout/dashboard-loader";

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
        loader: dashboardLoader,
        element: <DashboardLayout />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            index: true,
            loader: () => ({
              title: "home-page",
            }),
            element: <Home />,
          },
          {
            path: "edit-profile",
            loader: () => ({
              title: "edit-profile",
            }),
            element: <EditProfile />,
          },
          {
            path: "competition",
            loader: () => ({
              title: "contest-information",
            }),
            element: <Competition />,
          },
          {
            path: "leaderboard",
            loader: () => ({
              title: "leaders-board",
            }),
            element: <Leaderboard />,
          },
          {
            path: "students",
            loader: () => ({
              title: "students",
            }),
            element: <Students />,
          },
          {
            path: "groups",
            loader: () => ({
              title: "groups",
            }),
            element: <Groups />,
          },
          {
            path: "admins",
            loader: () => ({
              title: "admins",
            }),
            element: <ContestModerator />,
          },
          {
            path: "contest-criteria",
            loader: () => ({
              title: "criterias",
            }),
            element: <ContestCriteria />,
          },
          {
            path: "review-other-points",
            loader: () => ({
              title: "text-inputs",
            }),
            element: <ReviewOtherPoints />,
          },
          {
            path: "results/:tab",
            loader: () => ({
              title: "results-page",
            }),
            element: <ContestResults />,
          },
          {
            path: "export-points",
            loader: () => ({
              title: "export-points",
            }),
            element: <ExportPoints />,
          },
        ],
      },
    ],
  },
]);
