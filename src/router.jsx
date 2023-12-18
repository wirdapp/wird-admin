import {createBrowserRouter, Outlet, redirect, useRouteError} from "react-router-dom";
import Login from "./components/Login";
import {DashboardLayout} from "./components/layout/DashboardLayout";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";
import ContestModerator from "./components/ContestModerator";
import Competition from "./components/Competition";
import TopStudents from "./components/TopStudents";
import Loader from "./components/Loader";
import Students from "./components/Students";
import Groups from "./components/Groups";
import ContestCriteria from "./components/ContestCriteria";
import ReviewOtherPoints from "./components/ReviewOtherPoints";
import ExportPoints from "./components/ExportPoints";
import StudentsPoints from "./components/studentsPoints";
import {destroySession, isLogged, updateSessionUserDetails} from "./services/auth/session";
import {isSuperAdmin} from "./util/ContestPeople_Role";
import * as AuthApi from "./services/auth/api";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import {ReactComponent as WirdLogo} from "assets/icons/Shared/wirdLogo.svg";

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  if (error.status === 404) {
    return (<div className="error-page">
      <WirdLogo/>
      <hr/>
      <h2>404 Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <a href="/dashboard">Go to Home</a>
    </div>);
  }

  // Uncaught ReferenceError: path is not defined
  return (<div className="error-page">
    <WirdLogo/>
    <hr/>
    <h2>Something went wrong :(</h2>
  </div>);
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet/>,
    errorElement: <ErrorBoundary/>,
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
        element: <Login/>,
      },
      {
        path: "signup",
        element: <Signup/>,
      },
      {
        path: "reset-password",
        element: <ResetPassword/>,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword/>,
      },
      {
        id: "dashboard",
        path: "dashboard",
        loader: async ({request}) => {
          const redirectTo = new URL(request.url).pathname;
          if (!isLogged()) {
            return redirect(`/login?redirectTo=${redirectTo}`);
          }

          try {
            // make sure session still valid
            const user = await AuthApi.currentUserInfo();
            updateSessionUserDetails(user);

            return {
              currentUser: user,
              isSuperAdmin: isSuperAdmin(user)
            };
          } catch (e) {
            destroySession();
            return redirect(`/login?redirectTo=${redirectTo}`);
          }
        },
        element: <DashboardLayout/>,
        errorElement: <ErrorBoundary/>,
        children: [
          {
            index: true,
            element: <Home/>,
          },
          {
            path: "edit-profile",
            element: <EditProfile/>,
          },
          {
            path: "competition",
            element: <Competition/>,
          },
          {
            path: "top-students",
            element: <TopStudents/>,
          },
          {
            path: "loading",
            element: <Loader/>,
          },
          {
            path: "students",
            element: <Students/>,
          },
          {
            path: "groups",
            element: <Groups/>,
          },
          {
            path: "admins",
            element: <ContestModerator/>,
          },
          {
            path: "contest-criteria",
            element: <ContestCriteria/>,
          },
          {
            path: "review-other-points",
            element: <ReviewOtherPoints/>,
          },
          {
            path: "students-points",
            element: <StudentsPoints/>,
          },
          {
            path: "export-points",
            element: <ExportPoints/>,
          }
        ],
      }
    ]
  }
]);