import { doRequest } from "./doRequest";
import cookie from "react-cookies";
import {Role} from "../util/ContestPeople_Role";

export const retrieveAdmins = (
  successCallback,
  faiCallback,
  searchQuery = "",
) => {
  let url = `/admin_panel/contest_people/?contest_role=${Role.SUPER_ADMIN}&contest_role=${Role.ADMIN}`;
  if (searchQuery) url += `&search=${searchQuery}`;

  doRequest(
    null,
    url,
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.load("token")}`,
    },
    "get",
    successCallback,
    faiCallback,
    true,
  );
};

export const updateContestPeopleRole = (
  username,
  data,
  successCallback,
  faiCallback,
) => {
  doRequest(
    data,
    `/admin_panel/contest_people/${username}/`,
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.load("token")}`,
    },
    "put",
    successCallback,
    faiCallback,
    true,
  );
};

export const addAdmin = (data, successCallback, faiCallback) => {
  doRequest(
    data,
    `/admin_panel/contest_people/${data.username}/`,
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.load("token")}`,
    },
    "post",
    successCallback,
    faiCallback,
    true,
  );
};
export const resetMemberPassword = (data, successCallback, faiCallback) => {
  doRequest(
    data,
    `/admin_panel/reset-members-password`,
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.load("token")}`,
    },
    "post",
    successCallback,
    faiCallback,
    true,
  );
};

export const updateAdmin = (username, data, successCallback, faiCallback) => {
  doRequest(
    data,
    `/comp-admin/comp-admins/${username}/`,
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.load("token")}`,
    },
    "put",
    successCallback,
    faiCallback,
    true,
  );
};

export const deleteAdmin = (username, successCallback, faiCallback) => {
  doRequest(
    null,
    `/comp-admin/comp-admins/${username}/`,
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.load("token")}`,
    },
    "delete",
    successCallback,
    faiCallback,
    true,
  );
};

export const resetAdminPassword = (
  username,
  data,
  successCallback,
  faiCallback,
) => {
  doRequest(
    data,
    `/comp-admin/comp-admins/${username}/change_password/`,
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.load("token")}`,
    },
    "put",
    successCallback,
    faiCallback,
    true,
  );
};

export const exportPoints = (fromDay, toDay, successCallback, faiCallback) => {
  doRequest(
    null,
    `/comp-admin/export-comp-info/?from_date=${fromDay}&to_date=${toDay}`,
    {
      responseType: "arraybuffer",
      Authorization: `Bearer ${cookie.load("token")}`,
    },
    "get",
    successCallback,
    faiCallback,
    true,
  );
};
