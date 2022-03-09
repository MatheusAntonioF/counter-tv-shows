import { extendTheme } from '@chakra-ui/react';

export const systemDefaultTheme = extendTheme({
  config: {
    useSystemColorMode: true,
  },
});
