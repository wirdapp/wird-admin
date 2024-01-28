import axios from "../../util/axios";

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
