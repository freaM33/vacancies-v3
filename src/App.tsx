import { Box } from '@mantine/core';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { VacanciesPage } from './pages/VacanciesPage/VacanciesPage';
import { VacancyPage } from './pages/VacancyPage/VacancyPage';

function VacancyIdRoute() {
  const { id } = useParams<{ id: string }>();

  if (!id || !/^\d+$/.test(id)) {
    return <NotFoundPage />;
  }

  return <VacancyPage />;
}

function App() {
  return (
    <Box bg="gray.0" mih="100vh">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/vacancies/moscow" replace />} />
        <Route path="/vacancies" element={<Navigate to="/vacancies/moscow" replace />} />
        <Route path="/vacancies/:city" element={<VacanciesPage />} />
        <Route path="/:id" element={<VacancyIdRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Box>
  );
}

export default App;
