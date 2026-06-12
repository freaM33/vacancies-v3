import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '../../test/test-utils';
import { Header } from './Header';

describe('Header', () => {
  it('отображает логотип и пункт меню', () => {
    renderWithProviders(<Header />);

    expect(screen.getByTestId('site-logo')).toHaveTextContent('.FrontEnd');
    expect(screen.getByText('hh')).toBeInTheDocument();
    expect(screen.getByTestId('nav-vacancies')).toHaveTextContent('Вакансии FE');
    expect(screen.getByTestId('nav-about')).toHaveTextContent('Обо мне');
  });
});
