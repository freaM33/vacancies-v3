import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '../../test/test-utils';
import { SkillsFilter } from './SkillsFilter';

describe('SkillsFilter', () => {
  it('отображает начальные навыки', () => {
    renderWithProviders(
      <SkillsFilter skills={['TypeScript', 'React', 'Redux']} onChange={vi.fn()} />,
    );

    expect(screen.getByTestId('skill-pill-TypeScript')).toBeInTheDocument();
    expect(screen.getByTestId('skill-pill-React')).toBeInTheDocument();
    expect(screen.getByTestId('skill-pill-Redux')).toBeInTheDocument();
  });

  it('добавляет навык по Enter', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithProviders(<SkillsFilter skills={['React']} onChange={onChange} />);

    await user.type(screen.getByTestId('skills-input'), 'Vue{Enter}');

    expect(onChange).toHaveBeenCalledWith(['React', 'Vue']);
  });

  it('добавляет навык по кнопке +', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithProviders(<SkillsFilter skills={['React']} onChange={onChange} />);

    await user.type(screen.getByTestId('skills-input'), 'Vue');
    await user.click(screen.getByTestId('add-skill-button'));

    expect(onChange).toHaveBeenCalledWith(['React', 'Vue']);
  });

  it('удаляет навык по крестику', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithProviders(
      <SkillsFilter skills={['TypeScript', 'React']} onChange={onChange} />,
    );

    const typescriptPill = screen.getByTestId('skill-pill-TypeScript');
    await user.click(within(typescriptPill).getByRole('button', { hidden: true }));

    expect(onChange).toHaveBeenCalledWith(['React']);
  });
});
