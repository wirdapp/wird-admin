import type { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import axios from "../util/axios";

export abstract class BaseService {
	protected axios: AxiosInstance = axios;

	protected getContestId(contestId?: string): string {
		const cid = contestId ?? Cookies.get("currentContest");
		if (!cid) {
			throw new Error("No contest ID provided and no current contest set");
		}
		return String(cid);
	}

	protected getContestIdOrUndefined(contestId?: string): string | undefined {
		return contestId ? String(contestId) : Cookies.get("currentContest");
	}
}
