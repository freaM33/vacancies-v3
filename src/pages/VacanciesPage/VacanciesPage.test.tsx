import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { mockVacancies } from '../../mocks/vacancies';
import { filterVacancies, paginateVacancies } from '../../utils/filterVacancies';
import { DEFAULT_SKILLS } from '../../types/vacancy';
import { renderWithProviders } from '../../test/test-utils';
import { VacanciesPage } from './VacanciesPage';

function renderVacanciesPage(initialEntries = ['/vacancies/moscow']) {
  return renderWithProviders(
    <Routes>
      <Route path="/vacancies/:city" element={<VacanciesPage />} />
    </Routes>,
    { initialEntries },
  );
}

function getFirstMoscowVacancy() {
  return paginateVacancies(
    filterVacancies(mockVacancies, {
      text: '',
      area: '1',
      skills: DEFAULT_SKILLS,
      page: 1,
    }),
    1,
  ).items[0];
}

describe('VacanciesPage', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('отображает заголовок и начальные навыки', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 403,
    } as Response);

    renderVacanciesPage();

    const title = screen.getByTestId('vacancies-title');
    expect(title).toHaveTextContent('Список вакансий');
    expect(title).toHaveTextContent('по профессии Frontend-разработчик');

    await waitFor(() => {
      expect(screen.getByTestId('skill-pill-TypeScript')).toBeInTheDocument();
      expect(screen.getByTestId('skill-pill-React')).toBeInTheDocument();
      expect(screen.getByTestId('skill-pill-Redux')).toBeInTheDocument();
    });
  });

  it('отображает табы городов', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 403,
    } as Response);

    renderVacanciesPage();

    const tabs = screen.getByTestId('city-tabs');
    expect(tabs).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Москва' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Санкт-Петербург' })).toBeInTheDocument();
  });

  it('показывает плашку и моковые данные при ошибке 403', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 403,
    } as Response);

    renderVacanciesPage();

    await waitFor(() => {
      expect(screen.getByTestId('service-unavailable-banner')).toBeInTheDocument();
      expect(screen.getByTestId('vacancy-list')).toBeInTheDocument();
    });

    const firstMoscowVacancy = getFirstMoscowVacancy();
    const cards = screen.getAllByTestId(/vacancy-card-/);
    expect(cards).toHaveLength(10);
    expect(
      screen.getByTestId(`vacancy-card-${firstMoscowVacancy.id}`),
    ).toBeInTheDocument();
  });

  it('отображает кнопку отклика со ссылкой на hh.ru', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 403,
    } as Response);

    renderVacanciesPage();

    const firstMoscowVacancy = getFirstMoscowVacancy();

    await waitFor(() => {
      const applyButton = screen.getByTestId(`apply-vacancy-${firstMoscowVacancy.id}`);
      expect(applyButton).toHaveAttribute('href', firstMoscowVacancy.apply_alternate_url);
    });
  });

  it('меняет страницу пагинации', async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 403,
    } as Response);

    renderVacanciesPage();

    await waitFor(() => {
      expect(screen.getByTestId('vacancy-pagination')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: '2' }));

    const secondPageVacancy = paginateVacancies(
      filterVacancies(mockVacancies, {
        text: '',
        area: '1',
        skills: DEFAULT_SKILLS,
        page: 1,
      }),
      2,
    ).items[0];

    await waitFor(() => {
      expect(
        screen.getByTestId(`vacancy-card-${secondPageVacancy.id}`),
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(`vacancy-card-${getFirstMoscowVacancy().id}`),
      ).not.toBeInTheDocument();
    });
  });

  it('показывает 404 для несуществующего города', () => {
    renderVacanciesPage(['/vacancies/unknown']);

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    expect(screen.getByTestId('not-found-image')).toBeInTheDocument();
  });
});
