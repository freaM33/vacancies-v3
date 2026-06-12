import type { Salary, Vacancy, WorkFormatTag } from '../types/vacancy';

const currencySymbols: Record<string, string> = {
  RUR: '₽',
  USD: '$',
  EUR: '€',
};

function formatAmount(value: number): string {
  return value.toLocaleString('ru-RU');
}

export function formatSalary(salary: Salary | null): string {
  if (!salary) {
    return 'Зарплата не указана';
  }

  const symbol = currencySymbols[salary.currency] ?? salary.currency;
  const prefix = salary.gross ? '' : 'на руки ';

  if (salary.from && salary.to) {
    return `${prefix}${formatAmount(salary.from)} – ${formatAmount(salary.to)} ${symbol}`;
  }

  if (salary.from) {
    return `${prefix}от ${formatAmount(salary.from)} ${symbol}`;
  }

  if (salary.to) {
    return `${prefix}до ${formatAmount(salary.to)} ${symbol}`;
  }

  return 'Зарплата не указана';
}

export function getWorkFormatTags(vacancy: Vacancy): WorkFormatTag[] {
  if (vacancy.work_format?.length) {
    return vacancy.work_format
      .map((item) => {
        const id = item.id.toUpperCase();

        if (id.includes('REMOTE') || id === 'REMOTE') {
          return 'Можно удалённо' as WorkFormatTag;
        }

        if (id.includes('HYBRID') || id === 'HYBRID') {
          return 'Гибрид' as WorkFormatTag;
        }

        return 'Офис' as WorkFormatTag;
      })
      .filter((tag, index, array) => array.indexOf(tag) === index);
  }

  if (vacancy.schedule.id === 'remote') {
    return ['Можно удалённо'];
  }

  if (vacancy.schedule.id === 'flexible') {
    return ['Гибрид'];
  }

  return ['Офис'];
}
