import { BaseService } from '../base.service';
import type {
  Section,
  SectionCreateData,
  SectionUpdateData,
  Criterion,
  CriterionCreateData,
  CriterionUpdateData,
} from '../../types';

interface OrderItem {
  id: string;
  position?: number;
  order_in_section?: number;
}

class ContestCriteriaServiceClass extends BaseService {
  // Sections
  async getSections(params: { contestId?: string } = {}): Promise<Section[]> {
    const cid = this.getContestId(params.contestId);
    const { data } = await this.axios.get<Section[]>(`/admin_panel/${cid}/sections/`);
    return data;
  }

  async addSection(params: {
    section: SectionCreateData;
    contestId?: string;
  }): Promise<Section> {
    const { section, contestId } = params;
    const cid = this.getContestId(contestId);
    const { data } = await this.axios.post<Section>(
      `/admin_panel/${cid}/sections/`,
      section
    );
    return data;
  }

  async updateSection(params: {
    id: string;
    section: SectionUpdateData;
    contestId?: string;
  }): Promise<Section> {
    const { id, section, contestId } = params;
    const cid = this.getContestId(contestId);
    const { data } = await this.axios.patch<Section>(
      `/admin_panel/${cid}/sections/${id}/`,
      section
    );
    return data;
  }

  async deleteSection(params: {
    id: string;
    contestId?: string;
  }): Promise<void> {
    const { id, contestId } = params;
    const cid = this.getContestId(contestId);
    await this.axios.delete(`/admin_panel/${cid}/sections/${id}/`);
  }

  async updateSectionsOrder(params: {
    newSections: OrderItem[];
    contestId?: string;
  }): Promise<Section[]> {
    const { newSections, contestId } = params;
    const cid = this.getContestId(contestId);
    const { data } = await this.axios.post<Section[]>(
      `/admin_panel/${cid}/sections/update_order/`,
      { sections: newSections }
    );
    return data;
  }

  // Criteria
  async getCriteria(params: { contestId?: string } = {}): Promise<Criterion[]> {
    const cid = this.getContestId(params.contestId);
    const { data } = await this.axios.get<Criterion[]>(`/admin_panel/${cid}/criteria/`);
    return data;
  }

  async getById(params: {
    id: string;
    contestId?: string;
  }): Promise<Criterion> {
    const { id, contestId } = params;
    const cid = this.getContestId(contestId);
    const { data } = await this.axios.get<Criterion>(
      `/admin_panel/${cid}/criteria/${id}/`
    );
    return data;
  }

  async addCriteria(params: {
    criterion: CriterionCreateData;
    contestId?: string;
  }): Promise<Criterion> {
    const { criterion, contestId } = params;
    const cid = this.getContestId(contestId);
    const { data } = await this.axios.post<Criterion>(
      `/admin_panel/${cid}/criteria/`,
      criterion
    );
    return data;
  }

  async updateCriteria(params: {
    id: string;
    criterion: CriterionUpdateData;
    contestId?: string;
  }): Promise<Criterion> {
    const { id, criterion, contestId } = params;
    const cid = this.getContestId(contestId);
    const { data } = await this.axios.patch<Criterion>(
      `/admin_panel/${cid}/criteria/${id}/`,
      criterion
    );
    return data;
  }

  async deleteCriteria(params: {
    id: string;
    contestId?: string;
  }): Promise<void> {
    const { id, contestId } = params;
    const cid = this.getContestId(contestId);
    await this.axios.delete(`/admin_panel/${cid}/criteria/${id}/`);
  }

  async updateCriteriaOrder(params: {
    newCriteriaItems: OrderItem[];
    contestId?: string;
  }): Promise<Criterion[]> {
    const { newCriteriaItems, contestId } = params;
    const cid = this.getContestId(contestId);
    const { data } = await this.axios.post<Criterion[]>(
      `/admin_panel/${cid}/criteria/update_order/`,
      { criteria: newCriteriaItems }
    );
    return data;
  }
}

export const ContestCriteriaService = new ContestCriteriaServiceClass();
export { ContestCriteriaServiceClass };
