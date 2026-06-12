import { MantineProvider } from '@mantine/core';
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { theme } from '../theme/theme';

const BASENAME = '/vacancies-v2';

interface CustomRenderOptions extends RenderOptions {
  initialEntries?: string[];
}

function withBasename(entries: string[]): string[] {
  return entries.map((entry) =>
    entry.startsWith(BASENAME) ? entry : `${BASENAME}${entry.startsWith('/') ? entry : `/${entry}`}`,
  );
}

export function renderWithProviders(ui: ReactElement, options?: CustomRenderOptions) {
  const { initialEntries = ['/vacancies/moscow'], ...renderOptions } = options ?? {};

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MantineProvider theme={theme}>
        <MemoryRouter basename={BASENAME} initialEntries={withBasename(initialEntries)}>
          {children}
        </MemoryRouter>
      </MantineProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
