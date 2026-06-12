import type { HhApiVacancyItem } from '../types/hhApi';
import type { Vacancy } from '../types/vacancy';

import { VACANCIES } from './vacanciesResponse';

const feTitles = [
  'Frontend-разработчик (React)',
  'Senior Frontend Developer',
  'Middle Frontend-разработчик',
  'React-разработчик',
  'Frontend Engineer',
  'Разработчик интерфейсов',
  'Frontend-разработчик TypeScript',
  'Ведущий frontend-разработчик',
  'Junior Frontend Developer',
  'Frontend-разработчик (Redux)',
];

const experiences = [
  { id: 'noExperience', name: 'Нет опыта' },
  { id: 'between1And3', name: 'От 1 года до 3 лет' },
  { id: 'between3And6', name: 'От 3 до 6 лет' },
  { id: 'moreThan6', name: 'Более 6 лет' },
];

const workFormats = [
  [{ id: 'REMOTE', name: 'Удалённо' }],
  [{ id: 'ON_SITE', name: 'В офисе' }],
  [{ id: 'HYBRID', name: 'Гибрид' }],
  [{ id: 'REMOTE', name: 'Удалённо' }, { id: 'HYBRID', name: 'Гибрид' }],
];

const schedules = [
  { id: 'remote', name: 'Удаленная работа' },
  { id: 'fullDay', name: 'Полный день' },
  { id: 'flexible', name: 'Гибкий график' },
];

const skillSets = [
  ['TypeScript', 'React', 'Redux'],
  ['TypeScript', 'React', 'Redux', 'Webpack'],
  ['TypeScript', 'React'],
  ['JavaScript', 'React', 'Redux'],
  ['TypeScript', 'React', 'Redux', 'Jest'],
  ['TypeScript', 'React', 'Redux', 'CSS'],
];

const MOCK_VACANCIES_COUNT = 30;

const baseItem = VACANCIES.items[0] as HhApiVacancyItem;

function mapApiItemToVacancy(item: HhApiVacancyItem, index: number): Vacancy {
  const areaId = index % 3 === 0 ? '2' : '1';
  const areaName = areaId === '1' ? 'Москва' : 'Санкт-Петербург';

  return {
    id: index === 0 ? item.id : String(Number(item.id) + index),
    name: feTitles[index % feTitles.length],
    salary: {
      from: 120000 + (index % 5) * 20000,
      to: 180000 + (index % 5) * 25000,
      currency: 'RUR',
      gross: true,
    },
    experience: experiences[index % experiences.length],
    schedule: schedules[index % schedules.length],
    work_format: workFormats[index % workFormats.length],
    employer: {
      id: item.employer.id,
      name: item.employer.name,
    },
    area: {
      id: areaId,
      name: areaName,
    },
    alternate_url:
      index === 0 ? item.alternate_url : `https://hh.ru/vacancy/${Number(item.id) + index}`,
    apply_alternate_url:
      index === 0
        ? item.apply_alternate_url
        : `https://hh.ru/applicant/vacancy_response?vacancyId=${Number(item.id) + index}`,
    key_skills: skillSets[index % skillSets.length].map((name) => ({ name })),
  };
}

export const mockVacancies: Vacancy[] = Array.from(
  { length: MOCK_VACANCIES_COUNT },
  (_, index) => mapApiItemToVacancy(baseItem, index),
);

export { VACANCIES };
