import { Center, Group, Loader, Pagination, Stack, Text } from '@mantine/core';
import type { Vacancy } from '../../types/vacancy';

import { VacancyCard } from '../VacancyCard/VacancyCard';

interface VacancyListProps {
  vacancies: Vacancy[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

export function VacancyList({
  vacancies,
  page,
  totalPages,
  isLoading,
  onPageChange,
}: VacancyListProps) {
  if (isLoading) {
    return (
      <Center py="xl" data-testid="vacancy-list-loading">
        <Loader color="blue" />
      </Center>
    );
  }

  return (
    <Stack gap="md" data-testid="vacancy-list">
      {totalPages > 0 && (
        <Group justify="flex-end">
          <Pagination
            total={Math.max(totalPages, 1)}
            value={page}
            onChange={onPageChange}
            color="blue"
            withEdges
            data-testid="vacancy-pagination"
          />
        </Group>
      )}

      {vacancies.length === 0 ? (
        <Text ta="center" c="dimmed" py="xl" data-testid="vacancy-list-empty">
          Вакансии не найдены
        </Text>
      ) : (
        vacancies.map((vacancy) => <VacancyCard key={vacancy.id} vacancy={vacancy} />)
      )}
    </Stack>
  );
}
