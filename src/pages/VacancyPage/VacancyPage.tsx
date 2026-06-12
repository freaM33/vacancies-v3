import {
  Anchor,
  Badge,
  Box,
  Button,
  Center,
  Container,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { fetchVacancyById } from '../../api/vacancyDetailApi';
import { ServiceUnavailableBanner } from '../../components/ServiceUnavailableBanner/ServiceUnavailableBanner';
import type { KataJob } from '../../types/kataJob';
import { formatKataSalary, getKataSpaceTag } from '../../utils/kataJobFormatters';

export function VacancyPage() {
  const { id } = useParams<{ id: string }>();
  const [vacancy, setVacancy] = useState<KataJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isServiceUnavailable, setIsServiceUnavailable] = useState(false);

  const loadVacancy = useCallback(async () => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const result = await fetchVacancyById(id);

    setVacancy(result.data);
    setIsServiceUnavailable(result.isServiceUnavailable);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    void loadVacancy();
  }, [loadVacancy]);

  if (isLoading) {
    return (
      <Center py="xl" data-testid="vacancy-page-loading">
        <Loader color="blue" />
      </Center>
    );
  }

  if (!vacancy) {
    return (
      <Container size="xl" py="xl">
        <Text ta="center" c="dimmed" data-testid="vacancy-page-not-found">
          Вакансия не найдена
        </Text>
      </Container>
    );
  }

  const workFormatTag = getKataSpaceTag(vacancy.space);

  return (
    <Box bg="gray.0" py="xl">
      <Container size="xl">
        <Stack gap="lg">
          <Anchor
            component={Link}
            to="/vacancies/moscow"
            c="dimmed"
            size="sm"
            underline="hover"
            data-testid="vacancy-back-link"
          >
            <Group gap={6}>
              <IconArrowLeft size={16} stroke={1.5} />
              <span>Назад к списку вакансий</span>
            </Group>
          </Anchor>

          {isServiceUnavailable && <ServiceUnavailableBanner />}

          <Paper shadow="sm" radius="md" p="xl" bg="white" data-testid="vacancy-page-card">
            <Stack gap="sm">
              <Title order={1} size={32} fw={700} data-testid="vacancy-page-title">
                {vacancy.name}
              </Title>

              <Text fw={600} c="blue.6" size="lg" data-testid="vacancy-page-salary">
                {formatKataSalary(vacancy.salary)}
              </Text>

              <Text size="sm" c="dimmed" data-testid="vacancy-page-experience">
                {vacancy.experience}
              </Text>

              <Group gap="xs">
                <Badge variant="light" color="blue" data-testid="vacancy-page-work-format">
                  {workFormatTag}
                </Badge>
              </Group>

              <Text fw={500} size="lg" data-testid="vacancy-page-company">
                {vacancy.company_name}
              </Text>

              <Text size="sm" c="dimmed" data-testid="vacancy-page-city">
                {vacancy.city}
              </Text>

              <Button
                component="a"
                href={`https://hh.ru/search/vacancy?text=${encodeURIComponent(vacancy.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                color="blue"
                w="fit-content"
                mt="xs"
                data-testid="vacancy-page-apply"
              >
                Откликнуться
              </Button>
            </Stack>
          </Paper>

          <Paper shadow="sm" radius="md" p="xl" bg="white" data-testid="vacancy-page-description">
            <Stack gap="md">
              <Title order={2} size="h3" fw={600}>
                Описание вакансии
              </Title>
              <Text size="md" style={{ whiteSpace: 'pre-line' }}>
                {vacancy.description}
              </Text>
            </Stack>
          </Paper>

          <Paper shadow="sm" radius="md" p="xl" bg="white" data-testid="vacancy-page-about-company">
            <Stack gap="md">
              <Title order={2} size="h3" fw={600}>
                О компании
              </Title>
              <Text size="md" style={{ whiteSpace: 'pre-line' }}>
                {vacancy.about_company}
              </Text>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
