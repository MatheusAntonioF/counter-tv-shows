import React, { useEffect } from 'react';

import { Flex, Box, Heading, Stack, Skeleton } from '@chakra-ui/react';

import { TVShow } from '../../components/TVShow';
import { useTvShow } from '../../hooks/useTvShow';
import { fetchTvShows } from '../../services/http/modules/tvShows';

const NAVBAR_HEIGHT = '75.19px';

const ListShows: React.FC = () => {
  const { tvShows, setTvShows } = useTvShow();

  useEffect(() => {
    async function fetchInitialTvShows() {
      try {
        const data = await fetchTvShows();

        setTvShows(data);
        console.log(data);
      } catch (err) {
        console.error('Error to fetch tv shows: ', err);
      }
    }

    fetchInitialTvShows();
  }, []);

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

        {tvShows.length > 0 ? (
          tvShows.map(episode => <TVShow key={episode.id} episode={episode} />)
        ) : (
          <Stack>
            <Skeleton
              w="100%"
              h="250px"
              borderRadius="2xl"
              p="6"
              mt="4"
              shadow="lg"
            />
          </Stack>
        )}
      </Box>
    </Flex>
  );
};

export { ListShows };
