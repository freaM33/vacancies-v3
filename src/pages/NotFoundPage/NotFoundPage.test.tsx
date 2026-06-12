import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '../../test/test-utils';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('отображает иллюстрацию и кнопку «На главную»', () => {
    renderWithProviders(<NotFoundPage />);

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();

    const image = screen.getByTestId('not-found-image');
    expect(image.getAttribute('src')).toContain('vac.svg');

    const homeButton = screen.getByTestId('not-found-home-button');
    expect(homeButton).toHaveAttribute('href', '/v3/vacancies/moscow');
    expect(homeButton).toHaveAttribute('aria-label', 'На главную');

    expect(screen.queryByTestId('not-found-back-button')).not.toBeInTheDocument();
  });
});
