import axios from "../../util/axios";
import Cookies from "js-cookie";

const LAST_EMAIL_RESEND_KEY = "wj3TrwBaUsM5Sc6dpPMlGhxoNA0n7plv2";

export async function doLogin(username, password) {
  const res = await axios.post("/auth/login/", {
    username,
    password,
  });

  return {
    token: res.data.access,
    refreshToken: res.data.refresh,
    user: res.data.user,
  };
}

export async function signup(formData, isCreator) {
  const { data } = await axios.post("/auth/registration/", formData, {
    params: {
      type: isCreator ? "creator" : undefined,
    },
  });

  return data;
}

export async function currentUserInfo() {
  const { data } = await axios.get("/auth/user/");

  return data;
}

export async function updateUserInfo(formData) {
  const { data } = await axios.patch("/auth/user/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function changePassword(formData) {
  const { data } = await axios.post("/auth/password/change/", formData);

  return data;
}

export async function resendVerificationEmail(email) {
  const lastEmailResend = Cookies.get(LAST_EMAIL_RESEND_KEY);
  if (lastEmailResend === email) {
    throw new Error("email-already-sent");
  }

  // 15 minutes
  Cookies.set(LAST_EMAIL_RESEND_KEY, email, { expires: 1 / 96 });
  const { data } = await axios.post("/auth/registration/resend-email/", {
    email,
  });

  return data;
}
