import { createBrowserRouter, redirect } from "react-router";
import Competition from "./components/Competition";
import ContestCriteria from "./components/ContestCriteria";
import { ContestResults } from "./components/contest-results";
import EditProfile from "./components/EditProfile";
import Groups from "./components/Groups";
import Home from "./components/Home";
import Login from "./components/Login";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Leaderboard from "./components/leaderboard";
import Signup from "./components/Signup";
import Students from "./components/users";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import { GroupDetailPage } from "./components/Groups/group-detail-page";
import { DashboardDataProvider } from "./components/layout/DashboardDataProvider";
import { PublicLayout } from "./components/public/layouts/PublicLayout";
import { EmailConfirmPage } from "./pages/public/EmailConfirmPage";
import { ForgotPasswordPage } from "./pages/public/ForgotPasswordPage";
import { ForgotUsernamePage } from "./pages/public/ForgotUsernamePage";
import { HelpPage } from "./pages/public/HelpPage";
import { HomePage } from "./pages/public/HomePage";
import { PolicyPage } from "./pages/public/PolicyPage";
import { ResetPasswordPage } from "./pages/public/ResetPasswordPage";
import { ErrorBoundary } from "./ui/error-boundary";
import { MainLayout } from "./ui/main-layout";

interface RouteData {
	title: string;
}

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		errorElement: <ErrorBoundary />,
		children: [
			// Public pages (no auth required)
			{
				element: <PublicLayout />,
				children: [
					{ index: true, element: <HomePage /> },
					{ path: "help", element: <HelpPage /> },
					{ path: "policy", element: <PolicyPage /> },
					{ path: "user/email-confirm", element: <EmailConfirmPage /> },
					{ path: "user/forgot-password", element: <ForgotPasswordPage /> },
					{ path: "user/forgot-username", element: <ForgotUsernamePage /> },
					{ path: "user/reset-password", element: <ResetPasswordPage /> },
				],
			},
			// Auth pages
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
			// Dashboard (auth required)
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
						loader: (): RouteData => ({
							title: "home-page",
						}),
						element: <Home />,
						errorElement: <ErrorBoundary />,
					},
					{
						id: "profile",
						path: "profile",
						loader: (): RouteData => ({
							title: "edit-profile",
						}),
						element: <EditProfile />,
						errorElement: <ErrorBoundary />,
					},
					{
						path: "competition",
						loader: (): RouteData => ({
							title: "contest-information",
						}),
						element: <Competition />,
						errorElement: <ErrorBoundary />,
					},
					{
						path: "leaderboard",
						loader: (): RouteData => ({
							title: "leaders-board",
						}),
						element: <Leaderboard />,
						errorElement: <ErrorBoundary />,
					},
					{
						path: "participants",
						loader: (): RouteData => ({
							title: "participants",
						}),
						element: <Students />,
						errorElement: <ErrorBoundary />,
					},
					{
						path: "groups",
						loader: (): RouteData => ({ title: "groups" }),
						element: <Groups />,
						errorElement: <ErrorBoundary />,
						children: [
							{
								path: ":groupId",
								element: <GroupDetailPage />,
								loader: (): RouteData => ({ title: "groups" }),
								errorElement: <ErrorBoundary />,
							},
						],
					},
					{
						path: "contest-criteria",
						loader: (): RouteData => ({
							title: "criterias",
						}),
						element: <ContestCriteria />,
						errorElement: <ErrorBoundary />,
					},
					{
						path: "results/:tab",
						loader: (): RouteData => ({
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
