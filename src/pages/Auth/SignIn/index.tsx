import {
  Flex,
  Box,
  Stack,
  Button,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../../../components/Input';
import { IUserCredentials } from '../../../services/http/modules/users/dtos';
import { useCallback, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const schemaSignValidation = yup
  .object({
    email: yup.string().required('Aí na moral preenche esse campo'),
    password: yup.string().required('Esse aqui também'),
  })
  .required();

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

  const toast = useToast();

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserCredentials>({
    resolver: yupResolver(schemaSignValidation),
  });

  const onSubmit = useCallback(
    async ({ email, password }: IUserCredentials) => {
      try {
        setIsLoading(true);

        await signIn({ email, password });

        navigate('/list-shows');
      } catch (error) {
        console.error('Error to authenticate user: ', error);

        toast({
          title: 'Erro na autenticação.',
          description:
            'Ocorreu um erro ao fazer login, cheque as credenciais e tente novamente',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <Input label="Email" {...register('email')} error={errors.email} />

            <Input
              label="Senha"
              type="password"
              {...register('password')}
              error={errors.password}
            />

            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              ></Stack>
              <Button
                isLoading={isLoading}
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export { SignIn };
