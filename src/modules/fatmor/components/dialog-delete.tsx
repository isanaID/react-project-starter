import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    Button,
    ModalFooter,
  } from '@chakra-ui/react';
  
  import {useRemove} from '../context/hooks';
  
  function DialogDelete({
    isOpen,
    onClose,
    selectedDevice,
  }: {
    isOpen: boolean;
    onClose: () => void;
    selectedDevice: any;
  }): JSX.Element {
    const {mutate} = useRemove({
      onSuccess: () => {
        onClose();
      },
    });
  
    const onConfirmRemove = (): void => {
      // eslint-disable-next-line no-underscore-dangle
      mutate(selectedDevice._id);
    };
  
    return (
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove Device</ModalHeader>
          <ModalCloseButton />
          <ModalBody px={6} py={7}>
            {/* Are you sure you want to remove this <b>{selectedCategory?.name}</b>? */}
            There are patients assigned to this Device. Are you sure to delete?
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={onConfirmRemove} colorScheme="red">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  export default DialogDelete;
  