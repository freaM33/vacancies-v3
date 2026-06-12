import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    blue: [
      '#E7F5FF',
      '#D0EBFF',
      '#A5D8FF',
      '#74C0FC',
      '#4DABF7',
      '#339AF0',
      '#228BE6',
      '#1C7ED6',
      '#1971C2',
      '#1864AB',
    ],
    hhRed: [
      '#FFE3E3',
      '#FFC9C9',
      '#FFA8A8',
      '#FF8787',
      '#FF6B6B',
      '#FA5252',
      '#F03E3E',
      '#E03131',
      '#D6001C',
      '#C92A2A',
    ],
  },
  fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
  headings: {
    fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    fontWeight: '700',
  },
  defaultRadius: 'md',
});
