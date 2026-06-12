import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { mockVacancies } from '../../mocks/vacancies';
import { renderWithProviders } from '../../test/test-utils';
import { VacancyCard } from './VacancyCard';

describe('VacancyCard', () => {
  const vacancy = mockVacancies[0];

  it('отображает информацию о вакансии', () => {
    renderWithProviders(<VacancyCard vacancy={vacancy} />);

    expect(screen.getByText(vacancy.name)).toBeInTheDocument();
    expect(screen.getByText(vacancy.experience.name)).toBeInTheDocument();
    expect(screen.getByText(vacancy.employer.name)).toBeInTheDocument();
    expect(screen.getByText(vacancy.area.name)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Смотреть вакансию' })).toHaveAttribute(
      'href',
      `/v3/${vacancy.id}`,
    );
    expect(screen.getByRole('link', { name: 'Откликнуться' })).toBeInTheDocument();
  });
});
