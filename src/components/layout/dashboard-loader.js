import {
  destroySession,
  isLogged,
  updateSessionUserDetails,
} from "../../services/auth/session";
import { redirect } from "react-router-dom";
import * as AuthApi from "../../services/auth/api";
import { isSuperAdmin } from "../../util/ContestPeople_Role";
import { getContests } from "../../services/contests/api";
import { getCurrentContest } from "../../services/contests/utils";

export async function dashboardLoader({ request }) {
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
}
