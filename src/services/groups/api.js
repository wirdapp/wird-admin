import axios from "../../util/axios";
import { getCurrentContestId } from "../contests/utils";

export const GroupsApi = {
  async getGroups(contestId) {
    const cid = contestId ?? getCurrentContestId();
    const res = await axios.get(`/admin_panel/${cid}/groups/`);
    return res.data;
  },

  async getGroup({ id, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.get(`/admin_panel/${cid}/groups/${id}/`);
    return data;
  },

  async createGroup({ body, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.post(`/admin_panel/${cid}/groups/`, body);
    return data;
  },

  async updateGroup({ id, body, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.patch(
      `/admin_panel/${cid}/groups/${id}/`,
      body,
    );
    return data;
  },
  async deleteGroup({ id, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.delete(`/admin_panel/${cid}/groups/${id}/`);
    return data;
  },

  async getGroupMembers({ groupId, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.get(
      `/admin_panel/${cid}/groups/${groupId}/members/`,
    );
    return data;
  },

  async addMemberToGroup({ groupId, body, contestId }) {
    body.group_role = 2;
    return this.addGroupMember({ groupId, body, contestId });
  },

  async addAdminToGroup({ groupId, body, contestId }) {
    body.group_role = 1;
    return this.addGroupMember({ groupId, body, contestId });
  },

  async addGroupMember({ groupId, body, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.post(
      `/admin_panel/${cid}/groups/${groupId}/members/`,
      body,
    );
    return data;
  },

  async removeGroupMember({ memberId, groupId, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.delete(
      `/admin_panel/${cid}/groups/${groupId}/members/${memberId}/`,
    );
    return data;
  },

  async updateGroupMember({ memberId, groupId, body, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.patch(
      `/admin_panel/${cid}/groups/${groupId}/members/${memberId}/`,
      body,
    );
    return data;
  },

  async leaderboard({ groupId, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.get(
      `/admin_panel/${cid}/groups/${groupId}/leaderboard/`,
    );
    return data;
  },
};
