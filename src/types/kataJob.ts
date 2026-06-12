export type KataJobSpace = 'office' | 'remote' | 'hybrid';

export interface KataJob {
  id: number;
  published_at: string;
  company_name: string;
  name: string;
  city: string;
  salary: string;
  skills: string;
  short_description: string;
  description: string;
  space: KataJobSpace;
  about_company: string;
  experience: string;
}

export interface KataJobResponse {
  success: boolean;
  job: KataJob;
}
