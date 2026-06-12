import { Box, Container, Stack, Text, Title } from '@mantine/core';

export function AboutPage() {
  return (
    <Box bg="gray.0" py="xl">
      <Container size="xl">
        <Stack gap="md" data-testid="about-page">
          <Title order={1} size={32} fw={700}>
            Дмитрий Кирчанов
          </Title>
          <Text size="md" c="dark">
            Привет! Я - Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
