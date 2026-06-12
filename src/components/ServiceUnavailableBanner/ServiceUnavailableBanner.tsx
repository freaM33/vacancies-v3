import { Alert } from '@mantine/core';

export function ServiceUnavailableBanner() {
  return (
    <Alert
      color="yellow"
      title="Сервис временно недоступен"
      variant="light"
      radius="md"
      mb="lg"
      data-testid="service-unavailable-banner"
    >
      Не удалось получить актуальные данные с hh.ru. Показаны демонстрационные вакансии.
    </Alert>
  );
}
