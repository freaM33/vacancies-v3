import { Anchor, Box, Container, Group, Text } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <Box component="header" bg="white" py="md">
      <Container size="xl">
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
          }}
        >
          <Group gap="xs" align="center" justify="flex-start">
            <Box
              w={36}
              h={36}
              bg="hhRed.8"
              style={{
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-hidden
            >
              <Text c="white" fw={700} size="sm" lh={1}>
                hh
              </Text>
            </Box>
            <Text fw={700} size="xl" c="dark" data-testid="site-logo">
              .FrontEnd
            </Text>
          </Group>

          <Group gap="xl" justify="center" wrap="nowrap">
            <Group gap={6} align="center">
              <Anchor
                component={Link}
                to="/vacancies/moscow"
                fw={500}
                c="dark"
                underline="never"
                data-testid="nav-vacancies"
              >
                Вакансии FE
              </Anchor>
              <Box w={6} h={6} bg="blue.6" style={{ borderRadius: '50%' }} aria-hidden />
            </Group>

            <Group gap={6} align="center" c="dimmed" data-testid="nav-about">
              <IconUser size={18} stroke={1.5} aria-hidden />
              <Text size="sm" c="dimmed">
                Обо мне
              </Text>
            </Group>
          </Group>

          <Box aria-hidden />
        </Box>
      </Container>
    </Box>
  );
}
