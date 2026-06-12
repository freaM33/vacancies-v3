import {
  Box,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { fetchVacancies } from '../../api/vacanciesApi';
import { ServiceUnavailableBanner } from '../../components/ServiceUnavailableBanner/ServiceUnavailableBanner';
import { SkillsFilter } from '../../components/SkillsFilter/SkillsFilter';
import { VacancyList } from '../../components/VacancyList/VacancyList';
import type { Vacancy } from '../../types/vacancy';
import {
  CITY_SLUG_LABELS,
  CITY_SLUGS,
  citySlugToArea,
  isCitySlug,
  type CitySlug,
} from '../../utils/citySlug';
import { buildVacancySearchParams, parseSkillsParam } from '../../utils/vacancySearchParams';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

export function VacanciesPage() {
  const { city } = useParams<{ city: string }>();

  if (!isCitySlug(city)) {
    return <NotFoundPage />;
  }

  return <VacanciesPageContent city={city} />;
}

interface VacanciesPageContentProps {
  city: CitySlug;
}

function VacanciesPageContent({ city }: VacanciesPageContentProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const area = citySlugToArea(city);
  const searchText = searchParams.get('text') ?? '';
  const skillsParam = searchParams.get('skills');
  const skills = useMemo(() => parseSkillsParam(skillsParam), [skillsParam]);
  const skillsKey = skills.join(',');
  const querySuffix = searchParams.toString() ? `?${searchParams.toString()}` : '';

  const [searchInput, setSearchInput] = useState(searchText);
  const [page, setPage] = useState(1);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isServiceUnavailable, setIsServiceUnavailable] = useState(false);

  useEffect(() => {
    setSearchInput(searchText);
    setPage(1);
  }, [searchText, city, skillsKey]);

  const updateFilters = useCallback(
    (nextFilters: { text: string; skills: string[] }) => {
      setSearchParams(buildVacancySearchParams(nextFilters), { replace: true });
    },
    [setSearchParams],
  );

  const loadVacancies = useCallback(async () => {
    setIsLoading(true);

    const result = await fetchVacancies({
      text: searchText,
      area,
      skills,
      page,
    });

    setVacancies(result.data.items);
    setTotalPages(result.data.pages);
    setIsServiceUnavailable(result.isServiceUnavailable);
    setIsLoading(false);
  }, [area, page, searchText, skills]);

  useEffect(() => {
    void loadVacancies();
  }, [loadVacancies]);

  const applySearch = () => {
    updateFilters({
      text: searchInput.trim(),
      skills,
    });
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      applySearch();
    }
  };

  const handleSkillsChange = (nextSkills: string[]) => {
    updateFilters({
      text: searchText,
      skills: nextSkills,
    });
  };

  return (
    <Box bg="gray.0" py="xl">
      <Container size="xl">
        <Group justify="space-between" align="flex-end" mb="xl" wrap="wrap" gap="lg">
          <Stack gap={4} data-testid="vacancies-title">
            <Title order={1} size={32} fw={700}>
              Список вакансий
            </Title>
            <Text c="dimmed" size="md">
              по профессии Frontend-разработчик
            </Text>
          </Stack>

          <Group gap="xs" wrap="nowrap" style={{ flex: '1 1 360px', maxWidth: 520 }}>
            <TextInput
              flex={1}
              placeholder="Должность или название компании"
              value={searchInput}
              onChange={(event) => setSearchInput(event.currentTarget.value)}
              onKeyDown={handleSearchKeyDown}
              leftSection={<IconSearch size={16} stroke={1.5} />}
              data-testid="search-input"
            />
            <Button color="blue" onClick={applySearch} data-testid="search-button">
              Найти
            </Button>
          </Group>
        </Group>

        {isServiceUnavailable && <ServiceUnavailableBanner />}

        <Grid gap="lg">
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Paper shadow="sm" radius="md" p="md" bg="white">
              <Text fw={600} size="sm" mb="sm">
                Ключевые навыки
              </Text>
              <SkillsFilter skills={skills} onChange={handleSkillsChange} />
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 9 }}>
            <Stack gap="md">
              <Tabs value={city} color="blue" data-testid="city-tabs">
                <Tabs.List>
                  {CITY_SLUGS.map((slug) => (
                    <Tabs.Tab
                      key={slug}
                      value={slug}
                      renderRoot={(props) => (
                        <Link {...props} to={`/vacancies/${slug}${querySuffix}`} />
                      )}
                    >
                      {CITY_SLUG_LABELS[slug]}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs>

              <VacancyList
                vacancies={vacancies}
                page={page}
                totalPages={totalPages}
                isLoading={isLoading}
                onPageChange={setPage}
              />
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
