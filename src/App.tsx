import { Navigate, Route, Routes, useParams } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { AboutPage } from './pages/AboutPage/AboutPage';
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
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/vacancies/moscow" replace />} />
        <Route path="/vacancies" element={<Navigate to="/vacancies/moscow" replace />} />
        <Route path="/vacancies/:city" element={<VacanciesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/:id" element={<VacancyIdRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
