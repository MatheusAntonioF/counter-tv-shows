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
        bg="white"
        position="fixed"
      >
        <Heading>Contador de episódios</Heading>
        <Button colorScheme="twitter" onClick={onOpen}>
          Nova série
        </Button>
      </Box>
      <ModalAddShow isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export { Navbar };
