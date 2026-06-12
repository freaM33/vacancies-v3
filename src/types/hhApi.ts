import type { DictionaryItem, Salary } from './vacancy';

export interface HhApiVacancyItem {
  id: string;
  name: string;
  salary: Salary | null;
  experience?: DictionaryItem;
  schedule: DictionaryItem;
  work_format?: DictionaryItem[];
  employer: {
    id: string;
    name: string;
  };
  area: DictionaryItem;
  alternate_url: string;
  apply_alternate_url: string;
  key_skills?: Array<{ name: string }>;
}

export interface HhVacanciesApiResponse {
  items: HhApiVacancyItem[];
  found: number;
  pages: number;
  page: number;
  per_page: number;
}
