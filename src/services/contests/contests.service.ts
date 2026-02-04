import dayjs from 'dayjs';
import { BaseService } from '../base.service';
import { getContestStatus } from './utils';
import type {
  ContestRaw,
  Contest,
  ContestCreateData,
  ContestUpdateData,
} from '../../types';

class ContestsServiceClass extends BaseService {
  async getContests(): Promise<ContestRaw[]> {
    const { data } = await this.axios.get<ContestRaw[]>('/contests/');
    return data;
  }

  async createContest(formData: ContestCreateData): Promise<ContestRaw> {
    const { data } = await this.axios.post<ContestRaw>('/contests/', formData);
    return data;
  }

  async joinContest(code: string): Promise<ContestRaw> {
    const { data } = await this.axios.post<ContestRaw>('/contests/join_contest/', {
      contest_id: code,
    });
    return data;
  }

  async updateContest(
    id: string,
    dataToUpdate: ContestUpdateData
  ): Promise<ContestRaw> {
    const { data } = await this.axios.patch<ContestRaw>(
      `/admin_panel/${id}/edit_contest/`,
      dataToUpdate
    );
    return data;
  }

  async getContestDetails(id: string): Promise<Contest> {
    const { data } = await this.axios.get<ContestRaw>(`/contests/${id}/`);
    return {
      ...data,
      start_date: dayjs(data.start_date),
      end_date: dayjs(data.end_date),
      daterange: [dayjs(data.start_date), dayjs(data.end_date)],
      status: getContestStatus(data),
    };
  }

  async drop(id: string, confirmed: boolean): Promise<void> {
    await this.axios.delete(`/admin_panel/${id}/edit_contest/`, {
      params: { sure: confirmed },
    });
  }
}

export const ContestsService = new ContestsServiceClass();
export { ContestsServiceClass };
