import { doRequest } from "./doRequest";
import axios from "../util/axios";

export const retrieveContestsInfo = async () => {
  const { data } = await axios.get("/contests/");
  return data;
};

export const retrieveCurrentContestInfo = async () => {
  const { data } = await axios.get("/contests/current/");
  return data;
};

export const changeCurrentContest = async (contestId) => {
  const { data } = await axios.post("/contests/switch_contest/", {
    id: contestId,
    contest_id: contestId,
  });
  return data;
};

export const createContest = async (formData) => {
  const { data } = await axios.post("/contests/", formData);
  return data;
};

export const joinContest = async (code) => {
  const { data } = await axios.post("/contests/join_contest/", {
    contest_id: code,
  });
  return data;
};

export const retrieveCompetitions = (successCallback, faiCallback) => {
  doRequest(
    null,
    "/comp-admin/comp-view/",
    {
      "Content-Type": "application/json",
    },
    "get",
    successCallback,
    faiCallback,
    true,
  );
};

export const retrieveTopMembers = (successCallback, faiCallback) => {
  doRequest(
    null,
    "/top-members/",
    {
      "Content-Type": "application/json",
    },
    "get",
    successCallback,
    faiCallback,
    true,
  );
};

export const updateCompetition = (id, data, successCallback, faiCallback) => {
  doRequest(
    data,
    `/comp-admin/comp-view/${id}/`,
    {
      "Content-Type": "application/json",
    },
    "put",
    successCallback,
    faiCallback,
    true,
  );
};

export const updateContest = (id, data, successCallback, faiCallback) => {
  doRequest(
    data,
    `/contests/${id}/`,
    {
      "Content-Type": "application/json",
    },
    "put",
    successCallback,
    faiCallback,
    true,
  );
};

export const retrieveResultsOnDate = (date, successCallback, faiCallback) => {
  doRequest(
    null,
    `/admin_panel/results/${date}`,
    {
      "Content-Type": "application/json",
    },
    "get",
    successCallback,
    faiCallback,
    true,
  );
};

export const retrieveResultsOnDatePerGroup = (
  date,
  groupId,
  successCallback,
  faiCallback,
) => {
  doRequest(
    null,
    `/admin_panel/results/${date}/${groupId}`,
    {
      "Content-Type": "application/json",
    },
    "get",
    successCallback,
    faiCallback,
    true,
  );
};
