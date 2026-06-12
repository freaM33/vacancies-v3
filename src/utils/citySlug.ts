import type { CityFilter } from '../types/vacancy';

export type CitySlug = 'moscow' | 'petersburg';

export const CITY_SLUGS: CitySlug[] = ['moscow', 'petersburg'];

export const CITY_SLUG_TO_FILTER: Record<CitySlug, CityFilter> = {
  moscow: '1',
  petersburg: '2',
};

export const CITY_SLUG_LABELS: Record<CitySlug, string> = {
  moscow: 'Москва',
  petersburg: 'Санкт-Петербург',
};

export function isCitySlug(value: string | undefined): value is CitySlug {
  return value === 'moscow' || value === 'petersburg';
}

export function citySlugToArea(slug: CitySlug): CityFilter {
  return CITY_SLUG_TO_FILTER[slug];
}
