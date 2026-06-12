import { Box, Container } from '@mantine/core';
import { Link } from 'react-router-dom';

const NOT_FOUND_IMAGE = `${import.meta.env.BASE_URL}vac.svg`;

export function NotFoundPage() {
  return (
    <Box bg="gray.0" py="xl">
      <Container size="md">
        <Box
          pos="relative"
          maw={707}
          w="100%"
          mx="auto"
          data-testid="not-found-page"
        >
          <Box
            component="img"
            src={NOT_FOUND_IMAGE}
            alt="Упс! Такой страницы не существует"
            data-testid="not-found-image"
            w="100%"
            style={{ height: 'auto', display: 'block' }}
          />
          <Box
            component={Link}
            to="/vacancies/moscow"
            pos="absolute"
            top="13.1%"
            right="4.5%"
            w="19.1%"
            h="7.6%"
            aria-label="На главную"
            data-testid="not-found-home-button"
            style={{ opacity: 0 }}
          />
        </Box>
      </Container>
    </Box>
  );
}
