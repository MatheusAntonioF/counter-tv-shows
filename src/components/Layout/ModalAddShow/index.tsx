import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Select } from '../../Input/Select';

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
  name: string;
}

const schemaAddShowValidator = yup
  .object({
    name: yup.object().required('Campo obrigatório'),
  })
  .required();

const ModalAddShow: React.FC<IModalAddShowProps> = ({ isOpen, onClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormProps>({
    resolver: yupResolver(schemaAddShowValidator),
  });

  const fetchTvShowByName = async (inputValue: string) => {
    // const { results }: { results: ITVShowProps[] } = await api.get(
    //   `/SearchSeries/${import.meta.env.VITE_IMDB_API_KEY}/${inputValue}`
    // );

    const { results }: { results: ITVShowProps[] } = await new Promise(
      resolve => {
        setTimeout(() => {
          const mock = {
            searchType: 'string',
            expression: 'string',
            results: [
              {
                id: 'string',
                resultType: 'string',
                image:
                  'https://images.unsplash.com/photo-1645643669596-f01625304083?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                title: 'Title tv show',
                description:
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
              },
              {
                id: 'string',
                resultType: 'string',
                image:
                  'https://images.unsplash.com/photo-1645643669596-f01625304083?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                title: 'Title tv show',
                description: 'Description tv show',
              },
              {
                id: 'string',
                resultType: 'string',
                image:
                  'https://images.unsplash.com/photo-1645643669596-f01625304083?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                title: 'Title tv show',
                description: 'Description tv show',
              },
              {
                id: 'string',
                resultType: 'string',
                image:
                  'https://images.unsplash.com/photo-1645643669596-f01625304083?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                title: 'Title tv show',
                description: 'Description tv show',
              },
            ],
            errorMessage: 'string',
          };

          resolve(mock);
        }, 500);
      }
    );

    const parsedData = results.map(({ id, title, image, description }) => ({
      value: id,
      label: title,
      thumbnail: image,
      description: description,
    }));

    return parsedData;
  };

  const getTVShowByName = async (inputValue: string) => {
    if (!inputValue)
      return [
        { value: 'Continue pesquisando...', label: 'Continue pesquisando...' },
      ];

    const data = await fetchTvShowByName(inputValue);

    return data;
  };

  const onSubmit = (data: IFormProps) => console.log('submit data', data);

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
              name="name"
              control={control}
              error={errors.name}
              promiseOptions={getTVShowByName}
            />
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
