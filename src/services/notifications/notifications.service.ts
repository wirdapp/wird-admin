import { BaseService } from '../base.service';
import type { Notification, NotificationCreateData } from '../../types';

class NotificationsServiceClass extends BaseService {
  async getNotifications(contestId: string): Promise<Notification[]> {
    const { data } = await this.axios.get<Notification[]>(
      `/notifications/${contestId}/all/`
    );
    return data;
  }

  async createNotification(
    contestId: string,
    notificationData: NotificationCreateData
  ): Promise<Notification> {
    const { data } = await this.axios.post<Notification>(
      `/notifications/${contestId}/all/`,
      notificationData
    );
    return data;
  }
}

export const NotificationsService = new NotificationsServiceClass();
export { NotificationsServiceClass };
