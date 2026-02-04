import type {
	DailySubmissionSummary,
	LeaderboardEntry,
	MemberResult,
	PointRecord,
	PointRecordUpdateData,
} from "../../types";
import { BaseService } from "../base.service";

class ContestResultsServiceClass extends BaseService {
	async getResults(params: { contestId?: string } = {}): Promise<DailySubmissionSummary[]> {
		const cid = this.getContestId(params.contestId);
		const res = await this.axios.get<DailySubmissionSummary[]>(`/admin_panel/${cid}/results/`);
		return res.data;
	}

	async getMemberResults(params: { userId: string; contestId?: string }): Promise<MemberResult> {
		const { userId, contestId } = params;
		const cid = this.getContestId(contestId);
		const res = await this.axios.get<MemberResult>(`/admin_panel/${cid}/results/${userId}`);
		return res.data;
	}

	async getMemberDaySubmissions(params: {
		userId: string;
		date: string;
		contestId?: string;
	}): Promise<PointRecord[]> {
		const { userId, date, contestId } = params;
		const cid = this.getContestId(contestId);
		const res = await this.axios.get<PointRecord[]>(
			`/admin_panel/${cid}/point_records/${userId}/${date}/`,
		);
		return res.data;
	}

	async updatePointRecord(params: {
		recordId: string;
		userId: string;
		date: string;
		contestId?: string;
		data: PointRecordUpdateData;
	}): Promise<PointRecord> {
		const { recordId, userId, date, contestId, data } = params;
		const cid = this.getContestId(contestId);
		const res = await this.axios.patch<PointRecord>(
			`/admin_panel/${cid}/point_records/${userId}/${date}/${recordId}/`,
			data,
		);
		return res.data;
	}

	async leaderboard(params: { contestId?: string } = {}): Promise<LeaderboardEntry[]> {
		const cid = this.getContestId(params.contestId);
		const res = await this.axios.get<LeaderboardEntry[]>(`/admin_panel/${cid}/leaderboard/`);
		return res.data;
	}
}

export const ContestResultsService = new ContestResultsServiceClass();
export { ContestResultsServiceClass };
