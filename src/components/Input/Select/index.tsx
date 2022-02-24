import {
  FormLabel,
  FormErrorMessage,
  useColorModeValue,
  FormControl,
} from '@chakra-ui/react';

import AsyncSelect from 'react-select/async';

import {
  FieldError,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { OptionWithThumbnail } from './CustomOptions/OptionsWithImage';
import { useState } from 'react';
import { ActionMeta } from 'react-select';

export interface ISelectOption {
  value: string;
  label: string;
  thumbnail?: string;
  description?: string;
}

type ISelectProps<T> = UseControllerProps<T> & {
  label: string;
  error?: FieldError | null;
  placeholder?: string;
  promiseOptions: (inputValue: string) => Promise<ISelectOption[]>;
};

const Select = <T extends FieldValues>({
  label,
  control,
  name,
  placeholder = 'Pesquisar aqui',
  promiseOptions,
  ...rest
}: ISelectProps<T>): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState({} as ISelectOption);

  const {
    field: { onChange, value, ...fieldProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <FormControl isRequired isInvalid={!!error?.message} id={name}>
      <FormLabel
        fontSize={{ base: 'sm', sm: 'md' }}
        color={useColorModeValue('gray.800', 'gray.400')}
      >
        {label}
      </FormLabel>
      <AsyncSelect
        {...rest}
        {...fieldProps}
        cacheOptions
        components={{ Option: OptionWithThumbnail }}
        defaultOptions
        loadOptions={promiseOptions}
        placeholder={placeholder}
        isClearable
        onChange={(newValue: unknown, _: ActionMeta<unknown>): void => {
          setSelectedOption(newValue as ISelectOption);
          onChange(newValue as ISelectOption);
        }}
        value={value}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export { Select };
