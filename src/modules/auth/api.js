import axios from "../../util/axios";

export async function getTokens(username, password) {
  const {data} = await axios.post("/token/", {
    username,
    password
  });

  return {token: data.access, refreshToken: data.refresh};
}

export async function signup(formData, isCreator) {
  const {data} = await axios.post("/signup/", formData, {
    params: {
      type: isCreator ? "creator" : undefined
    }
  });

  return data;
}

export async function currentUserInfo() {
  const {data} = await axios.get("/current-user/");

  return data;
}