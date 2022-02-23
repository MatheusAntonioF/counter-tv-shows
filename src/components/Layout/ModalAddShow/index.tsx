import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

interface IModalAddShowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAddShow: React.FC<IModalAddShowProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicione uma nova série</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Modal</Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost">Fechar</Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { ModalAddShow };
