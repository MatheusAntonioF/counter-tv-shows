import {
  FormLabel,
  FormErrorMessage,
  useColorModeValue,
  FormControl,
} from '@chakra-ui/react';

import { AsyncSelect } from 'chakra-react-select';
import { ActionMeta } from 'react-select';

import {
  FieldError,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

import './select.styles.scss';

import { OptionWithThumbnail } from './CustomOptions/OptionsWithImage';

export interface ISelectOption {
  value: string;
  label: string;
  thumbnail?: string;
  description?: string;
  other?: string | number | undefined;
}

type ISelectProps<T> = UseControllerProps<T> & {
  label: string;
  error?: FieldError | null;
  placeholder?: string;
  isDisabled?: boolean;
  defaultOptions?: boolean | undefined;
  promiseOptions: (inputValue: string) => Promise<ISelectOption[]>;
};

const Select = <T extends FieldValues>({
  label,
  control,
  name,
  isDisabled = false,
  placeholder = 'Pesquisar aqui',
  defaultOptions = undefined,
  promiseOptions,
  ...rest
}: ISelectProps<T>): JSX.Element => {
  const {
    field: { onChange, value, ...fieldProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <FormControl
      isRequired
      isInvalid={!!error?.message}
      isDisabled={isDisabled}
      id={name}
    >
      <FormLabel
        fontSize="sm"
        color={useColorModeValue('gray.800', 'gray.400')}
      >
        {label}
      </FormLabel>
      <AsyncSelect
        {...rest}
        {...fieldProps}
        classNamePrefix="react_select-component"
        className={error?.message && 'react-select__is-errored'}
        cacheOptions
        defaultOptions={true}
        components={{ Option: OptionWithThumbnail }}
        loadOptions={promiseOptions}
        placeholder={placeholder}
        styles={{
          container: () => ({
            background: useColorModeValue('gray.800', 'gray.400'),
          }),
        }}
        noOptionsMessage={() => 'Um maluco no pedaço...'}
        loadingMessage={({ inputValue }) => `Procurando por ${inputValue}`}
        isClearable
        isDisabled={isDisabled}
        onChange={(newValue: unknown, _: ActionMeta<unknown>): void =>
          onChange(newValue as ISelectOption)
        }
        value={value}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export { Select };
