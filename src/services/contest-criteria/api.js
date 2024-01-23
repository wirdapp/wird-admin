import axios from "../../util/axios";
import { getCurrentContestId } from "../contests/utils";

export const ContestCriteriaApi = {
  async getSections({ contestId } = {}) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.get(`/admin_panel/${cid}/sections/`);
    return data;
  },
  async addSection({ section, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.post(`/admin_panel/${cid}/sections/`, section);
    return data;
  },
  async updateSection({ id, section, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.put(
      `/admin_panel/${cid}/sections/${id}/`,
      section,
    );
    return data;
  },
  async deleteSection({ id, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.delete(`/admin_panel/${cid}/sections/${id}/`);
    return data;
  },

  async getCriteria({ contestId } = {}) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.get(`/admin_panel/${cid}/criteria/`);
    return data;
  },
  async addCriteria({ criteria, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.post(
      `/admin_panel/${cid}/criteria/`,
      criteria,
    );
    return data;
  },
  async updateCriteria({ id, criteria, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.patch(
      `/admin_panel/${cid}/criteria/${id}/`,
      criteria,
    );
    return data;
  },
  async deleteCriteria({ id, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.delete(`/admin_panel/${cid}/criteria/${id}/`);
    return data;
  },
};
