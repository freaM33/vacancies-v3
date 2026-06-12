import type { Vacancy, VacancySearchParams } from '../types/vacancy';
import { PER_PAGE } from '../types/vacancy';

function matchesSearch(vacancy: Vacancy, text: string): boolean {
  const query = text.trim().toLowerCase();

  if (!query) {
    return true;
  }

  return (
    vacancy.name.toLowerCase().includes(query) ||
    vacancy.employer.name.toLowerCase().includes(query)
  );
}

function matchesArea(vacancy: Vacancy, area: VacancySearchParams['area']): boolean {
  if (area === 'all') {
    return true;
  }

  return vacancy.area.id === area;
}

function matchesSkills(vacancy: Vacancy, skills: string[]): boolean {
  if (skills.length === 0) {
    return true;
  }

  const vacancySkills = (vacancy.key_skills ?? []).map((skill) =>
    skill.name.toLowerCase(),
  );

  return skills.every((skill) => vacancySkills.includes(skill.toLowerCase()));
}

export function filterVacancies(
  vacancies: Vacancy[],
  params: VacancySearchParams,
): Vacancy[] {
  return vacancies.filter(
    (vacancy) =>
      matchesSearch(vacancy, params.text) &&
      matchesArea(vacancy, params.area) &&
      matchesSkills(vacancy, params.skills),
  );
}

export function paginateVacancies(
  vacancies: Vacancy[],
  page: number,
  perPage = PER_PAGE,
) {
  const total = vacancies.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(page, 1), pages);
  const start = (safePage - 1) * perPage;

  return {
    items: vacancies.slice(start, start + perPage),
    found: total,
    pages,
    page: safePage,
    per_page: perPage,
  };
}
