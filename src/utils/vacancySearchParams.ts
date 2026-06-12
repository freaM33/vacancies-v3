import { DEFAULT_SKILLS } from '../types/vacancy';

function areSkillsEqual(left: string[], right: string[]): boolean {
  if (left.length !== right.length) {
    return false;
  }

  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();

  return sortedLeft.every((skill, index) => skill === sortedRight[index]);
}

export function parseSkillsParam(value: string | null): string[] {
  if (value === null) {
    return DEFAULT_SKILLS;
  }

  if (value === '') {
    return [];
  }

  return value.split(',').filter(Boolean);
}

export function buildVacancySearchParams(filters: {
  text: string;
  skills: string[];
}): URLSearchParams {
  const params = new URLSearchParams();

  const trimmedText = filters.text.trim();

  if (trimmedText) {
    params.set('text', trimmedText);
  }

  if (!areSkillsEqual(filters.skills, DEFAULT_SKILLS)) {
    params.set('skills', filters.skills.join(','));
  }

  return params;
}
