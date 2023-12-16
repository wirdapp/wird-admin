import Axios from "axios";

const SkipAuthHeader = ["/token/", "/signup"];

const apiUrl = process.env.REACT_APP_BASE_URL;

const axios = Axios.create({
  baseURL: apiUrl,
});

axios.interceptors.request.use((config) => {
  if (SkipAuthHeader.includes(config.url)) return config;

  config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default axios;