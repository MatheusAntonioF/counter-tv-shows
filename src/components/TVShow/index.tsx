import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { ISavedEpisodes } from '../../dtos/IEpisodes';

import fallbackImg from '../../assets/fallback-img.png';

interface ITVShowProps {
  episode: ISavedEpisodes;
}

const TVShow = ({
  episode: { name, description, thumbnail, episode_number, season_number },
}: ITVShowProps): JSX.Element => {
  return (
    <Flex
      w="100%"
      h="250px"
      borderRadius="2xl"
      p="6"
      mt="4"
      shadow="lg"
      bg={useColorModeValue('white', 'gray.700')}
    >
      <Box w="50%" h="100%" minW="200px">
        <Image
          w="100%"
          h="100%"
          objectFit="cover"
          borderRadius="2xl"
          src={thumbnail}
          fallbackSrc={fallbackImg}
          alt={name}
        />
      </Box>
      <Flex direction="column" pl="6" pt="2">
        <Heading size="lg">{name}</Heading>
        <Heading size="md" pt="4">
          Episódio
        </Heading>
        <Text pt="2" noOfLines={1}>
          {description}
        </Text>

        <Flex align="center" pt="6" justify="space-between">
          <Heading size="md">{`Temporada: ${season_number}`}</Heading>

          <Flex direction="column" align="center">
            <Flex align="center">
              <Button variant="ghost" w="40px" mr="2">
                <ChevronLeftIcon boxSize="10" />
              </Button>
              <Heading size="lg">{episode_number}</Heading>
              <Button variant="ghost" w="40px" ml="2">
                <ChevronRightIcon boxSize="10" />
              </Button>
            </Flex>
            <Text>Episódio</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { TVShow };
