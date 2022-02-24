import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { EPISODES_LOCAL_STORAGE_KEY } from '../../../config/localStorageKey';
import { ISavedEpisodes } from '../../../dtos/IEpisodes';
import { useStorageState } from '../../../hooks/storageState';
import { episodesMock } from '../../../mock/episodesFromSeason';
import { tvShowMock } from '../../../mock/tvShowMock';
import { api } from '../../../services/http/api';
import { Input } from '../../Input';

import { ISelectOption, Select } from '../../Input/Select';

interface IModalAddShowProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ITVShowProps {
  id: string;
  description: string;
  title: string;
  image: string;
}

interface IFormProps {
  tvShow: ISelectOption;
  season: number;
  episode: ISelectOption;
}

const schemaAddShowValidator = yup
  .object({
    tvShow: yup.object().nullable().required('Campo obrigatório'),
    season: yup.number().required('Campo obrigatório'),
    episode: yup.object().nullable().required('Campo obrigatório'),
  })
  .required();

const ModalAddShow: React.FC<IModalAddShowProps> = ({ isOpen, onClose }) => {
  const [_, setEpisodes] = useStorageState({
    initialValue: [] as ISavedEpisodes[],
    labelStorage: EPISODES_LOCAL_STORAGE_KEY,
  });

  const toast = useToast();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm<IFormProps>({
    resolver: yupResolver(schemaAddShowValidator),
  });

  const watchFormFields = watch(['tvShow', 'season']);

  const fetchTvShowByName = async (inputValue: string) => {
    // const { results }: { results: ITVShowProps[] } = await api.get(
    //   `/SearchSeries/${import.meta.env.VITE_IMDB_API_KEY}/${inputValue}`
    // );

    const { results }: { results: ITVShowProps[] } = await new Promise(
      resolve => {
        setTimeout(() => {
          const { results } = {
            results: [tvShowMock],
          };

          const parsed: ITVShowProps[] = results.map(
            ({ id, name, overview, backdrop_path }) => ({
              id: String(id),
              description: overview,
              title: name,
              image: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
            })
          );

          resolve({ results: parsed });
        }, 500);
      }
    );

    const parsedData = results.map(({ id, title, image, description }) => ({
      value: id,
      label: title,
      description: description,
      thumbnail: image,
    }));

    return parsedData;
  }; // add try catch here

  const getTVShowByName = async (inputValue: string) => {
    if (!inputValue)
      return [
        { value: 'Continue pesquisando...', label: 'Continue pesquisando...' },
      ];

    const data = await fetchTvShowByName(inputValue);

    return data;
  };

  const fetchEpisodesFromSeason = useCallback(
    async (inputValue: string) => {
      const input = watchFormFields[0] as unknown;

      const { value } = input as ISelectOption; // Fix this in the future dumb

      // const { data } = await api.get(
      //   `https://api.themoviedb.org/3/tv/${value}/season/1?api_key=40a9ca2277bf962f6349e56c06fb8c0e&language=pt-BR`
      // );

      const { episodes } = episodesMock;

      const parsedEpisodes = episodes.map(
        ({ id, name, overview, still_path, episode_number }) => ({
          value: String(id),
          label: name,
          description: overview,
          thumbnail: `https://image.tmdb.org/t/p/original${still_path}`,
          other: episode_number,
        })
      );

      return parsedEpisodes;
    },
    [watchFormFields]
  );

  const onSubmit = useCallback(
    ({
      season,
      episode: { value, label, description, thumbnail, other },
    }: IFormProps) => {
      try {
        const episodeToSave: ISavedEpisodes = {
          id: Number(value),
          name: label,
          description: String(description),
          thumbnail: `https://image.tmdb.org/t/p/original${thumbnail}`,
          season_number: season,
          number: Number(other),
        };

        // setEpisodes(episodeToSave);

        toast({
          title: 'Salvo com sucesso',
          description: 'Série salva com sucesso',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });

        onClose();
      } catch (err) {
        console.log('Error to save tv show: ', err);
        toast({
          title: 'Erro ao salvar',
          description: 'Não foi possível salvar a série! Tente novamente',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      } finally {
        reset({});
      }
    },
    []
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar uma nova série</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Select
              label="Nome"
              name="tvShow"
              control={control}
              error={errors.tvShow?.value}
              promiseOptions={getTVShowByName}
            />
            <Stack direction="row" mt="4">
              <Box w="35%">
                <Input
                  label="Temporada"
                  type="number"
                  placeholder="Números"
                  {...register('season')}
                  error={errors.season}
                  isDisabled={!watchFormFields[0]}
                />
              </Box>

              <Box flex="1">
                <Select
                  label="Episódio"
                  name="episode"
                  defaultOptions
                  control={control}
                  error={errors.episode?.value}
                  promiseOptions={fetchEpisodesFromSeason}
                  isDisabled={!(!!watchFormFields[0] && !!watchFormFields[1])}
                />
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme="blue" ml={3} type="submit">
              Salvar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export { ModalAddShow };
