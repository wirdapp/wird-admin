import axios from "../../util/axios";
import { Role } from "../../util/ContestPeople_Role";

export const MembersApi = {
  getUsers: async (contestId, role, search) => {
    const res = await axios.get(`/admin_panel/${contestId}/contest_people/`, {
      params: {
        contest_role: role,
        search,
      },
    });
    return res.data;
  },
  getMembers: (contestId, search) =>
    MembersApi.getUsers(contestId, Role.MEMBER, search),
  getAdmins: (contestId, search) =>
    MembersApi.getUsers(contestId, Role.ADMIN, search),
  getPending: (contestId, search) =>
    MembersApi.getUsers(contestId, Role.PENDING, search),
  getDeactivated: (contestId, search) =>
    MembersApi.getUsers(contestId, Role.DEACTIVATED, search),
  async addUserToContest(username, contestId, role) {
    const res = await axios.post(`/admin_panel/${contestId}/contest_people/`, {
      username,
      contest_role: role,
    });
    return res.data;
  },
  async addAdminToContest(username, contestId) {
    return MembersApi.addUserToContest(username, contestId, Role.ADMIN);
  },
};
