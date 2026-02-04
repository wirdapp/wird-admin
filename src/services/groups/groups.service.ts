import type {
	Group,
	GroupCreateData,
	GroupMember,
	GroupUpdateData,
	LeaderboardEntry,
} from "../../types";
import { GroupRole } from "../../types";
import { BaseService } from "../base.service";

interface GroupMemberBody {
	user_id?: string;
	username?: string;
	group_role?: GroupRole;
}

class GroupsServiceClass extends BaseService {
	async getGroups(contestId?: string): Promise<Group[]> {
		const cid = this.getContestId(contestId);
		const res = await this.axios.get<Group[]>(`/admin_panel/${cid}/groups/`);
		return res.data;
	}

	async getGroup(params: { id: string; contestId?: string }): Promise<Group> {
		const { id, contestId } = params;
		const cid = this.getContestId(contestId);
		const { data } = await this.axios.get<Group>(`/admin_panel/${cid}/groups/${id}/`);
		return data;
	}

	async createGroup(params: { body: GroupCreateData; contestId?: string }): Promise<Group> {
		const { body, contestId } = params;
		const cid = this.getContestId(contestId);
		const { data } = await this.axios.post<Group>(`/admin_panel/${cid}/groups/`, body);
		return data;
	}

	async updateGroup(params: {
		id: string;
		body: GroupUpdateData;
		contestId?: string;
	}): Promise<Group> {
		const { id, body, contestId } = params;
		const cid = this.getContestId(contestId);
		const { data } = await this.axios.patch<Group>(`/admin_panel/${cid}/groups/${id}/`, body);
		return data;
	}

	async deleteGroup(params: { id: string; contestId?: string }): Promise<void> {
		const { id, contestId } = params;
		const cid = this.getContestId(contestId);
		await this.axios.delete(`/admin_panel/${cid}/groups/${id}/`);
	}

	async getGroupMembers(params: { groupId: string; contestId?: string }): Promise<GroupMember[]> {
		const { groupId, contestId } = params;
		const cid = this.getContestId(contestId);
		const { data } = await this.axios.get<{ results: GroupMember[] } | GroupMember[]>(
			`/admin_panel/${cid}/groups/${groupId}/members/`,
		);
		return Array.isArray(data) ? data : data.results;
	}

	async addMemberToGroup(params: {
		groupId: string;
		body: GroupMemberBody;
		contestId?: string;
	}): Promise<GroupMember> {
		const body = { ...params.body, group_role: GroupRole.MEMBER };
		return this.addGroupMember({ ...params, body });
	}

	async addAdminToGroup(params: {
		groupId: string;
		body: GroupMemberBody;
		contestId?: string;
	}): Promise<GroupMember> {
		const body = { ...params.body, group_role: GroupRole.ADMIN };
		return this.addGroupMember({ ...params, body });
	}

	async addGroupMember(params: {
		groupId: string;
		body: GroupMemberBody;
		contestId?: string;
	}): Promise<GroupMember> {
		const { groupId, body, contestId } = params;
		const cid = this.getContestId(contestId);
		const { data } = await this.axios.post<GroupMember>(
			`/admin_panel/${cid}/groups/${groupId}/members/`,
			body,
		);
		return data;
	}

	async removeGroupMember(params: {
		memberId: string;
		groupId: string;
		contestId?: string;
	}): Promise<void> {
		const { memberId, groupId, contestId } = params;
		const cid = this.getContestId(contestId);
		await this.axios.delete(`/admin_panel/${cid}/groups/${groupId}/members/${memberId}/`);
	}

	async updateGroupMember(params: {
		memberId: string;
		groupId: string;
		body: GroupMemberBody;
		contestId?: string;
	}): Promise<GroupMember> {
		const { memberId, groupId, body, contestId } = params;
		const cid = this.getContestId(contestId);
		const { data } = await this.axios.patch<GroupMember>(
			`/admin_panel/${cid}/groups/${groupId}/members/${memberId}/`,
			body,
		);
		return data;
	}

	async leaderboard(params: { groupId: string; contestId?: string }): Promise<LeaderboardEntry[]> {
		const { groupId, contestId } = params;
		const cid = this.getContestId(contestId);
		const { data } = await this.axios.get<LeaderboardEntry[]>(
			`/admin_panel/${cid}/groups/${groupId}/leaderboard/`,
		);
		return data;
	}
}

export const GroupsService = new GroupsServiceClass();
export { GroupsServiceClass };
