import { getCurrentContestId } from "../contests/utils";
import axios from "../../util/axios";

export const ContestResultsApi = {
  async getResults({ contestId } = {}) {
    const cid = contestId || getCurrentContestId();
    const res = await axios.get(`/admin_panel/${cid}/results/`);
    return res.data;
  },
  async getMemberResults({ userId, contestId } = {}) {
    const cid = contestId || getCurrentContestId();
    const res = await axios.get(`/admin_panel/${cid}/results/${userId}`);
    return res.data;
  },
  async getMemberDaySubmissions({ userId, date, contestId }) {
    const cid = contestId || getCurrentContestId();
    const res = await axios.get(
      `/admin_panel/${cid}/point_records/${userId}/${date}/`,
    );
    return res.data;
  },
  async updatePointRecord({ recordId, userId, date, contestId, data }) {
    const cid = contestId || getCurrentContestId();
    const res = await axios.patch(
      `/admin_panel/${cid}/point_records/${userId}/${date}/${recordId}/`,
      data,
    );
    return res.data;
  },
  async leaderboard({ contestId } = {}) {
    const cid = contestId || getCurrentContestId();
    const res = await axios.get(`/admin_panel/${cid}/leaderboard/`);
    return res.data;
  },
};
