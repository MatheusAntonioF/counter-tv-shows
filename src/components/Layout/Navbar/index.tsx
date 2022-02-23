import { Box, Heading, Button, useDisclosure } from '@chakra-ui/react';

import { ModalAddShow } from '../ModalAddShow';

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        w="100%"
        p={4}
        boxShadow="md"
        display="flex"
        alignItems="center"
        justifyContent="space-around"
      >
        <Heading>Contador de episódios</Heading>
        <Button colorScheme="twitter" onClick={onOpen}>
          Adicionar nova série
        </Button>
      </Box>
      <ModalAddShow isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export { Navbar };
