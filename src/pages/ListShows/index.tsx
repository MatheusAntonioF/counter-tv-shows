import { Flex, Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { EPISODES_LOCAL_STORAGE_KEY } from '../../config/localStorageKey';
import { ISavedEpisodes } from '../../dtos/IEpisodes';
import { useStorageState } from '../../hooks/storageState';
import { TVShow } from '../../components/TVShow';

const NAVBAR_HEIGHT = '75.19px';

const ListShows: React.FC = () => {
  const [episodes, _] = useStorageState<ISavedEpisodes[]>({
    initialValue: null,
    labelStorage: EPISODES_LOCAL_STORAGE_KEY,
  });

  return (
    <Flex
      w="100%"
      h="100%"
      display="flex"
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      mt={NAVBAR_HEIGHT}
    >
      <Box w="62%" pt={12}>
        <Heading size="xl" pb="8">
          Séries favoritadas
        </Heading>

        {episodes &&
          episodes.map(episode => (
            <TVShow key={episode.id} episode={episode} />
          ))}
      </Box>
    </Flex>
  );
};

export { ListShows };
