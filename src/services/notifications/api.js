import axios from "../../util/axios";

export const NotificationsApi = {
  async getNotifications(contestId) {
    const { data } = await axios.get(`/notifications/${contestId}/all/`);
    return data;
  },

  async createNotification(contestId, { title, body }) {
    const { data } = await axios.post(`/notifications/${contestId}/all/`, {
      title,
      body,
    });
    return data;
  },
};
