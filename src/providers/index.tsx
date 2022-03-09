import { ChakraProvider } from '@chakra-ui/react';

import CustomHookProviders from '../hooks';

import { systemDefaultTheme } from '../styles/theme/dark';

const AppProviders: React.FC = ({ children }) => {
  return (
    <ChakraProvider resetCSS theme={systemDefaultTheme}>
      <CustomHookProviders>{children} </CustomHookProviders>
    </ChakraProvider>
  );
};

export { AppProviders };
