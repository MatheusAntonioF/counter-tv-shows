import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

const ListShows: React.FC = () => {
  return (
    <Box
      w="100%"
      h="100%"
      bgColor="blue.100"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box w="62%" bgColor="pink.100" pt={12}>
        <Heading size="xl">Séries favoritadas</Heading>
      </Box>
    </Box>
  );
};

export { ListShows };
