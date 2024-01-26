import axios from "../../util/axios";
import dayjs from "dayjs";

export const ContestsApi = {
  async getContests() {
    const { data } = await axios.get(`/contests/`);
    return data;
  },
  async createContest(formData) {
    const { data } = await axios.post("/contests/", formData);
    return data;
  },

  async joinContest(code) {
    const { data } = await axios.post("/contests/join_contest/", {
      contest_id: code,
    });
    return data;
  },

  async updateContest(id, dataToUpdate) {
    const { data } = await axios.patch(`/contests/${id}/`, dataToUpdate);
    return data;
  },

  async getContestDetails(id) {
    const { data } = await axios.get(`/contests/${id}/`);
    return {
      ...data,
      start_date: dayjs(data.start_date),
      end_date: dayjs(data.end_date),
      daterange: [dayjs(data.start_date), dayjs(data.end_date)],
    };
  },
};
