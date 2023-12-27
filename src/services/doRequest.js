import axios from "../util/axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const doRequest = (
  data,
  uri,
  config,
  method,
  successCallback,
  failCallback,
  beforeRefresh,
) => {
  axios({
    method: method,
    url: `${apiUrl}${uri}`,
    data: data,
  }).then(
    (data) => {
      successCallback(data);
    },
    (err) => {
      failCallback?.(err);
    },
  );
};
