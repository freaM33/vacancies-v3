import { mockVacancies } from '../mocks/vacancies';
import type { VacanciesResponse, VacancySearchParams } from '../types/vacancy';
import { PER_PAGE } from '../types/vacancy';
import { filterVacancies, paginateVacancies } from '../utils/filterVacancies';

const API_URL = 'https://api.hh.ru/vacancies';

function buildSearchParams(params: VacancySearchParams): URLSearchParams {
  const searchParams = new URLSearchParams({
    industry: '7',
    professional_role: '96',
    text: 'frontend',
    search_field: 'name',
    per_page: String(PER_PAGE),
    page: String(params.page - 1),
  });

  if (params.text.trim()) {
    searchParams.set('text', params.text.trim());
    searchParams.append('search_field', 'company_name');
  }

  if (params.area !== 'all') {
    searchParams.set('area', params.area);
  }

  params.skills.forEach((skill) => {
    searchParams.append('skill_set', skill);
  });

  return searchParams;
}

function getMockResponse(params: VacancySearchParams): VacanciesResponse {
  const filtered = filterVacancies(mockVacancies, params);
  return paginateVacancies(filtered, params.page, PER_PAGE);
}

export async function fetchVacancies(
  params: VacancySearchParams,
): Promise<{ data: VacanciesResponse; isServiceUnavailable: boolean }> {
  const searchParams = buildSearchParams(params);

  try {
    const response = await fetch(`${API_URL}?${searchParams.toString()}`);

    if (response.status === 403) {
      return {
        data: getMockResponse(params),
        isServiceUnavailable: true,
      };
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch vacancies: ${response.status}`);
    }

    const data = (await response.json()) as VacanciesResponse;

    return {
      data: {
        ...data,
        page: data.page + 1,
      },
      isServiceUnavailable: false,
    };
  } catch {
    return {
      data: getMockResponse(params),
      isServiceUnavailable: true,
    };
  }
}
