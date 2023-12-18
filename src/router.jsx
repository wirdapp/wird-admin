import {createBrowserRouter, Outlet, redirect} from "react-router-dom";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet/>,
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