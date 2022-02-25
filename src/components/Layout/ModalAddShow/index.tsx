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
import { formatImageURL } from '../../../helpers/formats';
import { useStorageState } from '../../../hooks/storageState';

import { fetchTVShowEpisodesFromSeason } from '../../../services/http/modules/episodes';
import { fetchTVShowDetails } from '../../../services/http/modules/tvShows';
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
  const [episodes, setEpisodes] = useStorageState<ISavedEpisodes[]>({
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

  const fetchTVShowByName = useCallback(async (inputValue: string) => {
    if (!inputValue)
      return [
        { value: 'Continue pesquisando...', label: 'Continue pesquisando...' },
      ];

    const { results } = await fetchTVShowDetails(inputValue);

    const parsedData = results.map(({ id, name, overview, poster_path }) => ({
      value: String(id),
      label: name,
      description: overview,
      thumbnail: formatImageURL(poster_path),
    }));

    return parsedData;
  }, []);

  const fetchEpisodesFromSeason = useCallback(
    async (_: string) => {
      const { 0: tvShow, 1: season } = watchFormFields;

      const { episodes } = await fetchTVShowEpisodesFromSeason({
        tv_show_id: Number(tvShow.value),
        season,
      });

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
      tvShow: { label: tvShowName },
      season,
      episode: { value, description, thumbnail, other },
    }: IFormProps) => {
      try {
        const episodeToSave: ISavedEpisodes = {
          id: Number(value),
          name: tvShowName,
          description: String(description),
          thumbnail: `https://image.tmdb.org/t/p/original${thumbnail}`,
          season_number: season,
          number: Number(other),
        };

        setEpisodes([...episodes, episodeToSave]);

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
              promiseOptions={fetchTVShowByName}
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
