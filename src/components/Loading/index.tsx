import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

const Loading: React.FC = () => {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        label="Por favor aguarde! Carregando..."
      />
    </Flex>
  );
};

export { Loading };
