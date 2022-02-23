import { ChakraProvider } from '@chakra-ui/react';

const AppProviders: React.FC = ({ children }) => {
  return <ChakraProvider resetCSS>{children}</ChakraProvider>;
};

export { AppProviders };
