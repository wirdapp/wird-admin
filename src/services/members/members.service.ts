import { BaseService } from '../base.service';
import { Role } from '../../util/roles';
import type {
  Member,
  PaginatedResponse,
  MembersQueryParams,
  AddUserToContestParams,
  UpdateUserRoleParams,
} from '../../types';

class MembersServiceClass extends BaseService {
  async getUsers(params: MembersQueryParams = {}): Promise<PaginatedResponse<Member>> {
    const {
      contestId,
      role,
      search,
      page_size = 10,
      page = 1,
    } = params;

    const cid = this.getContestId(contestId);
    const res = await this.axios.get<PaginatedResponse<Member> | Member[]>(
      `/admin_panel/${cid}/members/`,
      {
        params: {
          contest_role__in: role,
          search,
          page_size,
          page,
        },
      }
    );

    // Handle both array and paginated responses
    if (Array.isArray(res.data)) {
      return {
        count: res.data.length,
        next: null,
        previous: null,
        results: res.data,
      };
    }

    return res.data;
  }

  getAllMembers(params: Omit<MembersQueryParams, 'role'> = {}): Promise<PaginatedResponse<Member>> {
    return this.getUsers({ ...params, role: '' });
  }

  getMembers(params: Omit<MembersQueryParams, 'role'> = {}): Promise<PaginatedResponse<Member>> {
    return this.getUsers({ ...params, role: Role.MEMBER });
  }

  getAdmins(params: Omit<MembersQueryParams, 'role'> = {}): Promise<PaginatedResponse<Member>> {
    return this.getUsers({ ...params, role: Role.ADMIN });
  }

  getPending(params: Omit<MembersQueryParams, 'role'> = {}): Promise<PaginatedResponse<Member>> {
    return this.getUsers({ ...params, role: Role.PENDING });
  }

  getDeactivated(params: Omit<MembersQueryParams, 'role'> = {}): Promise<PaginatedResponse<Member>> {
    return this.getUsers({ ...params, role: Role.DEACTIVATED });
  }

  async addUserToContest(params: AddUserToContestParams): Promise<Member> {
    const { username, contestId, role } = params;
    const cid = this.getContestId(contestId);
    const res = await this.axios.post<Member>(`/admin_panel/${cid}/members/`, {
      username,
      contest_role: role,
    });
    return res.data;
  }

  async updateUserContestRole(params: UpdateUserRoleParams): Promise<Member> {
    const { userId, contestId, role } = params;
    const cid = this.getContestId(contestId);
    const res = await this.axios.patch<Member>(
      `/admin_panel/${cid}/members/${userId}/`,
      {
        contest_role: role,
      }
    );
    return res.data;
  }

  async addAdminToContest(params: {
    userId: string;
    contestId?: string;
  }): Promise<Member> {
    return this.addUserToContest({
      username: params.userId,
      contestId: params.contestId,
      role: Role.ADMIN,
    });
  }

  async removeUserFromContest(params: {
    userId: string;
    contestId?: string;
  }): Promise<void> {
    const { userId, contestId } = params;
    const cid = this.getContestId(contestId);
    await this.axios.delete(`/admin_panel/${cid}/members/${userId}/`);
  }
}

export const MembersService = new MembersServiceClass();
export { MembersServiceClass };
