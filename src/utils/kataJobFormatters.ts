import type { KataJobSpace } from '../types/kataJob';
import type { WorkFormatTag } from '../types/vacancy';

export function formatKataSalary(salary: string): string {
  const amount = Number(salary);

  if (!salary || Number.isNaN(amount)) {
    return 'Зарплата не указана';
  }

  return `от ${amount.toLocaleString('ru-RU')} ₽`;
}

export function getKataSpaceTag(space: KataJobSpace): WorkFormatTag {
  if (space === 'remote') {
    return 'Можно удалённо';
  }

  if (space === 'hybrid') {
    return 'Гибрид';
  }

  return 'Офис';
}
