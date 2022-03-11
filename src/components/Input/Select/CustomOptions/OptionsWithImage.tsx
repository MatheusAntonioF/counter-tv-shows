import { Text, Flex, Image } from '@chakra-ui/react';
import React from 'react';

import { OptionProps } from 'react-select';

import fallbackImg from '../../../../assets/fallback-img.png';

import { ISelectOption } from '../';

const OptionWithThumbnail: React.FC<OptionProps> = ({
  innerProps,
  isDisabled,
  data,
}) => {
  const { value, label, thumbnail, description } = data as ISelectOption;

  return !isDisabled ? (
    <Flex
      key={value}
      w="100%"
      h={thumbnail ? '100px' : 'auto'}
      align="center"
      justify="center"
      p="2"
      cursor={thumbnail && 'pointer'}
      {...innerProps}
    >
      {thumbnail && (
        <Image
          boxSize="80px"
          objectFit="cover"
          borderRadius="2xl"
          src={thumbnail}
          alt={label}
          fallbackSrc={fallbackImg}
        />
      )}
      <Flex
        h="100%"
        flex="1"
        pl="2"
        mt={thumbnail && '1'}
        direction="column"
        align="flex-start"
        justify="flex-start"
      >
        <Text fontSize="md">{label}</Text>
        <Text noOfLines={3} lineHeight="shorter" fontSize="small">
          {description}
        </Text>
      </Flex>
    </Flex>
  ) : null;
};

export { OptionWithThumbnail };
