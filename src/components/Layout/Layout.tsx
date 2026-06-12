import { Box } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { Header } from '../Header/Header';

export function Layout() {
  return (
    <Box bg="gray.0" mih="100vh">
      <Header />
      <Outlet />
    </Box>
  );
}
