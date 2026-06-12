export interface DictionaryItem {
  id: string;
  name: string;
}

export interface Salary {
  from: number | null;
  to: number | null;
  currency: string;
  gross: boolean;
}

export interface Vacancy {
  id: string;
  name: string;
  salary: Salary | null;
  experience: DictionaryItem;
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

export interface VacanciesResponse {
  items: Vacancy[];
  found: number;
  pages: number;
  page: number;
  per_page: number;
}

export type WorkFormatTag = 'Можно удалённо' | 'Офис' | 'Гибрид';

export type CityFilter = 'all' | '1' | '2';

export interface VacancySearchParams {
  text: string;
  area: CityFilter;
  skills: string[];
  page: number;
}

export const PER_PAGE = 10;

export const DEFAULT_SKILLS = ['TypeScript', 'React', 'Redux'];

