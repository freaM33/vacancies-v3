import type { KataJob } from '../types/kataJob';
import type { Vacancy } from '../types/vacancy';
import { getWorkFormatTags } from '../utils/vacancyFormatters';

import { mockVacancies } from './vacancies';

function mapSpace(vacancy: Vacancy): KataJob['space'] {
  const tags = getWorkFormatTags(vacancy);

  if (tags.includes('Можно удалённо') && !tags.includes('Офис') && !tags.includes('Гибрид')) {
    return 'remote';
  }

  if (tags.includes('Гибрид')) {
    return 'hybrid';
  }

  return 'office';
}

function mapSalary(vacancy: Vacancy): string {
  if (!vacancy.salary?.from) {
    return '';
  }

  return String(vacancy.salary.from);
}

function mapVacancyToKataJob(vacancy: Vacancy): KataJob {
  return {
    id: Number(vacancy.id),
    published_at: new Date().toISOString(),
    company_name: vacancy.employer.name,
    name: vacancy.name,
    city: vacancy.area.name,
    salary: mapSalary(vacancy),
    skills: vacancy.key_skills?.map((skill) => skill.name).join(', ') ?? '',
    short_description: vacancy.experience.name,
    description:
      'Мы ищем талантливого специалиста для работы над современными frontend-проектами. Вам предстоит разрабатывать интерфейсы, участвовать в code review и взаимодействовать с командой дизайнеров и backend-разработчиков.',
    space: mapSpace(vacancy),
    about_company: `${vacancy.employer.name} — технологическая компания, которая развивает цифровые продукты и создаёт комфортные условия для профессионального роста сотрудников.`,
    experience: vacancy.experience.name,
  };
}

export function getMockKataJob(id: string): KataJob {
  const vacancy = mockVacancies.find((item) => item.id === id) ?? mockVacancies[0];

  return mapVacancyToKataJob(vacancy);
}
