import {doRequest} from "./doRequest";

export const retrieveGroups = (successCallback, faiCallback) => {
  doRequest(null, "/admin-panel/groups/",
    {
      "Content-Type": "application/json",

    },
    "get",
    successCallback,
    faiCallback,
    true);
};

export const retrieveGroupById = (groupId, successCallback, faiCallback) => {
  doRequest(null, `/admin-panel/groups/${groupId}/`,
    {
      "Content-Type": "application/json",

    },
    "get",
    successCallback,
    faiCallback,
    true);
};

export const addGroup = (data, successCallback, faiCallback) => {
  doRequest(data, "/admin-panel/groups/",
    {
      "Content-Type": "application/json",

    },
    "post",
    successCallback,
    faiCallback,
    true);
};

export const addOrRemoveAdminToGroup = (data, id, successCallback, faiCallback) => {
  doRequest(data, `/admin-panel/groups/${id}/add_or_remove_admin/`,
    {
      "Content-Type": "application/json",

    },
    "post",
    successCallback,
    faiCallback,
    true);
};

export const addOrRemoveMemberToGroup = (data, id, successCallback, faiCallback) => {
  doRequest(data, `/admin-panel/groups/${id}/add_or_remove_member/`,
    {
      "Content-Type": "application/json",

    },
    "post",
    successCallback,
    faiCallback,
    true);
};

export const updateGroup = (id, data, successCallback, faiCallback) => {
  doRequest(data, `/admin-panel/groups/${id}/`,
    {
      "Content-Type": "application/json",

    },
    "put",
    successCallback,
    faiCallback,
    true);
};

export const deleteGroup = (id, successCallback, faiCallback) => {
  doRequest(null, `/admin-panel/groups/${id}/`,
    {
      "Content-Type": "application/json",

    },
    "delete",
    successCallback,
    faiCallback,
    true);
};
