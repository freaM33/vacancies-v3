import { Badge, Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

import type { Vacancy } from '../../types/vacancy';
import { formatSalary, getWorkFormatTags } from '../../utils/vacancyFormatters';

interface VacancyCardProps {
  vacancy: Vacancy;
}

export function VacancyCard({ vacancy }: VacancyCardProps) {
  const workFormatTags = getWorkFormatTags(vacancy);

  return (
    <Card
      withBorder
      radius="md"
      padding="lg"
      bg="white"
      shadow="sm"
      data-testid={`vacancy-card-${vacancy.id}`}
    >
      <Stack gap="sm">
        <Title order={3} size="h4" fw={600}>
          {vacancy.name}
        </Title>

        <Text fw={600} c="blue.6">
          {formatSalary(vacancy.salary)}
        </Text>

        <Text size="sm" c="dimmed">
          {vacancy.experience.name}
        </Text>

        <Group gap="xs">
          {workFormatTags.map((tag) => (
            <Badge key={tag} variant="light" color="blue">
              {tag}
            </Badge>
          ))}
        </Group>

        <Text fw={500}>{vacancy.employer.name}</Text>

        <Text size="sm" c="dimmed">
          {vacancy.area.name}
        </Text>

        <Group gap="sm" mt="xs">
          <Button
            component={Link}
            to={`/${vacancy.id}`}
            variant="default"
            data-testid={`view-vacancy-${vacancy.id}`}
          >
            Смотреть вакансию
          </Button>
          <Button
            component="a"
            href={vacancy.apply_alternate_url}
            target="_blank"
            rel="noopener noreferrer"
            color="blue"
            data-testid={`apply-vacancy-${vacancy.id}`}
          >
            Откликнуться
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
