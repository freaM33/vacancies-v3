import { describe, expect, it } from 'vitest';

import { mockVacancies } from '../mocks/vacancies';
import { filterVacancies, paginateVacancies } from './filterVacancies';

describe('filterVacancies', () => {
  it('фильтрует вакансии по тексту поиска', () => {
    const result = filterVacancies(mockVacancies, {
      text: 'Яндекс',
      area: 'all',
      skills: [],
      page: 1,
    });

    expect(result.every((vacancy) => vacancy.employer.name.includes('Яндекс'))).toBe(
      true,
    );
  });

  it('фильтрует вакансии по городу', () => {
    const result = filterVacancies(mockVacancies, {
      text: '',
      area: '2',
      skills: [],
      page: 1,
    });

    expect(result.every((vacancy) => vacancy.area.id === '2')).toBe(true);
  });

  it('фильтрует вакансии по ключевым навыкам', () => {
    const result = filterVacancies(mockVacancies, {
      text: '',
      area: 'all',
      skills: ['TypeScript', 'React', 'Redux'],
      page: 1,
    });

    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every((vacancy) =>
        ['TypeScript', 'React', 'Redux'].every((skill) =>
          vacancy.key_skills?.some(
            (item) => item.name.toLowerCase() === skill.toLowerCase(),
          ),
        ),
      ),
    ).toBe(true);
  });
});

describe('paginateVacancies', () => {
  it('возвращает 10 элементов на странице', () => {
    const result = paginateVacancies(mockVacancies, 1, 10);

    expect(result.items).toHaveLength(10);
    expect(result.per_page).toBe(10);
  });
});
