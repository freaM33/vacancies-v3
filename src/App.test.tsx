import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';
import { renderWithProviders } from './test/test-utils';

describe('App routing', () => {
  it('показывает 404 для несуществующего маршрута', () => {
    renderWithProviders(<App />, { initialEntries: ['/unknown/path'] });

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  it('показывает страницу «Обо мне» на маршруте /about', () => {
    renderWithProviders(<App />, { initialEntries: ['/about'] });

    expect(screen.getByTestId('about-page')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Дмитрий Кирчанов' })).toBeInTheDocument();
    expect(
      screen.getByText(
        'Привет! Я - Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit.',
      ),
    ).toBeInTheDocument();
  });

  it('показывает 404 для невалидного id вакансии', () => {
    renderWithProviders(<App />, { initialEntries: ['/not-a-number'] });

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
