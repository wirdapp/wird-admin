import { doRequest } from "./doRequest";

export const retrieveStandards = (successCallback, faiCallback) => {
  doRequest(
    null,
    "/admin_panel/point-template/",
    {
      "Content-Type": "application/json",
    },
    "get",
    successCallback,
    faiCallback,
    true,
  );
};

export const retrieveSections = (successCallback, faiCallback) => {
  doRequest(
    null,
    "/admin_panel/section/",
    {
      "Content-Type": "application/json",
    },
    "get",
    successCallback,
    faiCallback,
    true,
  );
};

export const addStandard = (data, successCallback, faiCallback) => {
  doRequest(
    data,
    "/admin_panel/point-template/",
    {
      "Content-Type": "application/json",
    },
    "post",
    successCallback,
    faiCallback,
    true,
  );
};

export const addSection = (data, successCallback, faiCallback) => {
  doRequest(
    data,
    "/admin_panel/section/",
    {
      "Content-Type": "application/json",
    },
    "post",
    successCallback,
    faiCallback,
    true,
  );
};

export const updateStandard = (id, data, successCallback, faiCallback) => {
  doRequest(
    data,
    `/admin_panel/point-template/${id}/`,
    {
      "Content-Type": "application/json",
    },
    "put",
    successCallback,
    faiCallback,
    true,
  );
};

export const updateSection = (id, data, successCallback, faiCallback) => {
  doRequest(
    data,
    `/admin_panel/section/${id}/`,
    {
      "Content-Type": "application/json",
    },
    "put",
    successCallback,
    faiCallback,
    true,
  );
};

export const deleteStandard = (id, successCallback, faiCallback) => {
  doRequest(
    null,
    `/admin_panel/point-template/${id}/`,
    {
      "Content-Type": "application/json",
    },
    "delete",
    successCallback,
    faiCallback,
    true,
  );
};

export const deleteSection = (id, successCallback, faiCallback) => {
  doRequest(
    null,
    `/admin_panel/section/${id}/`,
    {
      "Content-Type": "application/json",
    },
    "delete",
    successCallback,
    faiCallback,
    true,
  );
};
