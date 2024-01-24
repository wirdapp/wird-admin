import axios from "../../util/axios";
import { getCurrentContestId } from "../contests/utils";

export const ContestCriteriaApi = {
  // Sections
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
    const { data } = await axios.patch(
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
  async updateSectionsOrder({ newSections, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.post(
      `/admin_panel/${cid}/sections/update_order/`,
      { sections: newSections },
    );
    return data;
  },

  // Criteria
  async getCriteria({ contestId } = {}) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.get(`/admin_panel/${cid}/criteria/`);
    return data;
  },
  async getById({ id, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.get(`/admin_panel/${cid}/criteria/${id}/`);
    return data;
  },
  async addCriteria({ criterion, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.post(
      `/admin_panel/${cid}/criteria/`,
      criterion,
    );
    return data;
  },
  async updateCriteria({ id, criterion, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.patch(
      `/admin_panel/${cid}/criteria/${id}/`,
      criterion,
    );
    return data;
  },
  async deleteCriteria({ id, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.delete(`/admin_panel/${cid}/criteria/${id}/`);
    return data;
  },
  async updateCriteriaOrder({ newCriteriaItems, contestId }) {
    const cid = contestId ?? getCurrentContestId();
    const { data } = await axios.post(
      `/admin_panel/${cid}/criteria/update_order/`,
      { criteria: newCriteriaItems },
    );
    return data;
  },
};
