import {doRequest} from "./doRequest";
import axios from "../util/axios";

export const retrieveContestsInfo = async () => {
  // const {data} = await axios.get("/contests/");
  // return data;
  return [
    {
      id: 1,
      name: "مسابقة رمضان 2024",
      isActive: true,
      access_code: "K4Q2OHP56",
    },
    {
      id: 2,
      name: "مسابقة رمضان 2023",
      isActive: false,
      access_code: "K4Q2OHP56",
    },
    {
      id: 3,
      name: "مسابقة رمضان 2022",
      isActive: false,
      access_code: "K4Q2OHP56",
    }
  ]
};

export const retrieveCurrentContestInfo = async () => {
  // const {data} = await axios.get("/contests/current/")
  // return data;
  return {
    "id": 1,
    "name": "مسابقة رمضان 2024",
    "isActive": true,
    "access_code": "K4Q2OHP56",
  }
};

export const switchContest = (data, successCallback, faiCallback) => {
  doRequest(data, "/contests/switch_contest/",
    {
      "Content-Type": "application/json",

    },
    "post",
    successCallback,
    faiCallback,
    true);
};

export const createContest = async (formData) => {
  const {data} = await axios.post("/contests/", formData)
  return data;
};

export const joinContest = async (formData) => {
  const {data} = await axios.post("/join-contest/", formData)
  return data;
};

export const retrieveCompetitions = (successCallback, faiCallback) => {
  doRequest(null, "/comp-admin/comp-view/",
    {
      "Content-Type": "application/json",

    },
    "get",
    successCallback,
    faiCallback,
    true);
};

export const retrieveTopMembers = (successCallback, faiCallback) => {
  doRequest(null, "/top-members/",
    {
      "Content-Type": "application/json",

    },
    "get",
    successCallback,
    faiCallback,
    true);
};

export const updateCompetition = (id, data, successCallback, faiCallback) => {
  doRequest(data, `/comp-admin/comp-view/${id}/`,
    {
      "Content-Type": "application/json",

    },
    "put",
    successCallback,
    faiCallback,
    true);
};

export const updateContest = (id, data, successCallback, faiCallback) => {
  doRequest(data, `/contests/${id}/`,
    {
      "Content-Type": "application/json",

    },
    "put",
    successCallback,
    faiCallback,
    true);
};

export const retrieveResultsOnDate = (date, successCallback, faiCallback) => {
  doRequest(null, `/admin-panel/results/${date}`,
    {
      "Content-Type": "application/json",

    },
    "get",
    successCallback,
    faiCallback,
    true);
};

export const retrieveResultsOnDatePerGroup = (date, groupId, successCallback, faiCallback) => {
  doRequest(null, `/admin-panel/results/${date}/${groupId}`,
    {
      "Content-Type": "application/json",

    },
    "get",
    successCallback,
    faiCallback,
    true);
};