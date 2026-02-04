import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./components/Login";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";
import Competition from "./components/Competition";
import Leaderboard from "./components/leaderboard";
import Students from "./components/users";
import Groups from "./components/Groups";
import ContestCriteria from "./components/ContestCriteria";
import { ContestResults } from "./components/contest-results";
import Signup from "./components/Signup";
import React from "react";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import { DashboardDataProvider } from "./components/layout/DashboardDataProvider";
import { MainLayout } from "./ui/main-layout";
import { ErrorBoundary } from "./ui/error-boundary";
import { GroupDetailPage } from "./components/Groups/group-detail-page";

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
        id: "dashboard",
        path: "dashboard",
        element: (
          <DashboardDataProvider>
            <DashboardLayout />
          </DashboardDataProvider>
        ),
        errorElement: <ErrorBoundary />,
        children: [
          {
            index: true,
            loader: () => ({
              title: "home-page",
            }),
            element: <Home />,
            errorElement: <ErrorBoundary />,
          },
          {
            id: "profile",
            path: "profile",
            loader: () => ({
              title: "edit-profile",
            }),
            element: <EditProfile />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "competition",
            loader: () => ({
              title: "contest-information",
            }),
            element: <Competition />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "leaderboard",
            loader: () => ({
              title: "leaders-board",
            }),
            element: <Leaderboard />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "participants",
            loader: () => ({
              title: "participants",
            }),
            element: <Students />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "groups",
            loader: () => ({ title: "groups" }),
            element: <Groups />,
            errorElement: <ErrorBoundary />,
            children: [
              {
                path: ":groupId",
                element: <GroupDetailPage />,
                loader: () => ({ title: "groups" }),
                errorElement: <ErrorBoundary />,
              },
            ],
          },
          {
            path: "contest-criteria",
            loader: () => ({
              title: "criterias",
            }),
            element: <ContestCriteria />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "results/:tab",
            loader: () => ({
              title: "results-page",
            }),
            element: <ContestResults />,
            errorElement: <ErrorBoundary />,
          },
        ],
      },
    ],
  },
]);
