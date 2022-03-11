import { extendTheme } from '@chakra-ui/react';

export const systemDefaultTheme = extendTheme({
  config: {
    useSystemColorMode: true,
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
});
