import { forwardRef, ForwardRefRenderFunction } from 'react';

import {
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface IInputProps extends InputProps {
  label: string;
  error?: FieldError | null;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { label, error, ...rest },
  ref
) => {
  return (
    <>
      <FormLabel
        fontSize={{ base: 'sm', sm: 'md' }}
        color={useColorModeValue('gray.800', 'gray.400')}
      >
        {label}
      </FormLabel>
      <ChakraInput
        ref={ref}
        isInvalid={!!error?.message}
        _placeholder={{ color: 'gray.500' }}
        {...rest}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </>
  );
};

const InputForwardedRef = forwardRef(Input);

export { InputForwardedRef as Input };
