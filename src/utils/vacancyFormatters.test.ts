import { describe, expect, it } from 'vitest';

import type { Vacancy } from '../types/vacancy';
import { formatSalary, getWorkFormatTags } from './vacancyFormatters';

const baseVacancy: Vacancy = {
  id: '1',
  name: 'Frontend-разработчик',
  salary: { from: 100000, to: 150000, currency: 'RUR', gross: true },
  experience: { id: 'between1And3', name: 'От 1 года до 3 лет' },
  schedule: { id: 'fullDay', name: 'Полный день' },
  employer: { id: '10', name: 'Яндекс' },
  area: { id: '1', name: 'Москва' },
  alternate_url: 'https://hh.ru/vacancy/1',
  apply_alternate_url: 'https://hh.ru/applicant/vacancy_response?vacancyId=1',
};

describe('formatSalary', () => {
  it('форматирует диапазон зарплаты', () => {
    expect(formatSalary(baseVacancy.salary)).toBe('100 000 – 150 000 ₽');
  });

  it('возвращает текст при отсутствии зарплаты', () => {
    expect(formatSalary(null)).toBe('Зарплата не указана');
  });
});

describe('getWorkFormatTags', () => {
  it('возвращает тег удалённой работы', () => {
    const vacancy = {
      ...baseVacancy,
      work_format: [{ id: 'REMOTE', name: 'Удалённо' }],
    };

    expect(getWorkFormatTags(vacancy)).toEqual(['Можно удалённо']);
  });

  it('возвращает тег офиса по графику', () => {
    expect(getWorkFormatTags(baseVacancy)).toEqual(['Офис']);
  });
});
