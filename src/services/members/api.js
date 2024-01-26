import axios from "../../util/axios";
import { Role } from "../../util/ContestPeople_Role";
import { getCurrentContestId } from "../contests/utils";

export const MembersApi = {
  getUsers: async ({ contestId, role, search } = {}) => {
    const cid = contestId ?? getCurrentContestId();
    const res = await axios.get(`/admin_panel/${cid}/members/`, {
      params: {
        contest_role__in: role,
        search,
      },
    });
    return res.data;
  },
  getMembers: ({ contestId, search } = {}) =>
    MembersApi.getUsers({ contestId, role: Role.MEMBER, search }),
  getAdmins: ({ contestId, search } = {}) =>
    MembersApi.getUsers({ contestId, role: Role.ADMIN, search }),
  getPending: ({ contestId, search } = {}) =>
    MembersApi.getUsers({ contestId, role: Role.PENDING, search }),
  getDeactivated: ({ contestId, search } = {}) =>
    MembersApi.getUsers({ contestId, role: Role.DEACTIVATED, search }),
  async addUserToContest({ username, contestId, role }) {
    const cid = contestId ?? getCurrentContestId();
    const res = await axios.post(`/admin_panel/${cid}/contest_people/`, {
      username,
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
};
