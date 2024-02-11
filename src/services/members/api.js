import axios from "../../util/axios";
import { Role } from "../../util/ContestPeople_Role";
import { getCurrentContestId } from "../contests/utils";

export const MembersApi = {
  getUsers: async ({
    contestId,
    role,
    search,
    page_size = 10,
    page = 1,
  } = {}) => {
    const cid = contestId ?? getCurrentContestId();
    const res = await axios.get(`/admin_panel/${cid}/members/`, {
      params: {
        contest_role__in: role,
        search,
        page_size,
        page,
      },
    });

    return res.data;
  },
  getAllMemebers: ({ contestId, search, page_size, page } = {}) =>
    MembersApi.getUsers({ contestId, role: "", search, page_size, page }),
  getMembers: ({ contestId, search, page_size, page } = {}) =>
    MembersApi.getUsers({
      contestId,
      role: Role.MEMBER,
      search,
      page_size,
      page,
    }),
  getAdmins: ({ contestId, search } = {}) =>
    MembersApi.getUsers({ contestId, role: Role.ADMIN, search }),
  getPending: ({ contestId, search } = {}) =>
    MembersApi.getUsers({ contestId, role: Role.PENDING, search }),
  getDeactivated: ({ contestId, search, page_size } = {}) =>
    MembersApi.getUsers({
      contestId,
      role: Role.DEACTIVATED,
      search,
      page_size,
    }),

  async addUserToContest({ username, contestId, role }) {
    const cid = contestId ?? getCurrentContestId();
    const res = await axios.post(`/admin_panel/${cid}/members/`, {
      username,
      contest_role: role,
    });
    return res.data;
  },

  async updateUserContestRole({ username, contestId, role }) {
    const cid = contestId ?? getCurrentContestId();
    const res = await axios.patch(`/admin_panel/${cid}/members/${username}/`, {
      contest_role: role,
    });
    return res.data;
  },

  async addAdminToContest({ username, contestId }) {
    return MembersApi.addUserToContest({
      username,
      contestId,
      role: Role.ADMIN,
    });
  },

  async removeUserFromContest({ username, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const res = await axios.delete(`/admin_panel/${cid}/members/${username}/`);
    return res.data;
  },
};
