/* eslint-disable react/prop-types */
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
} from '@chakra-ui/react';

export default function ModalConfirmPayment({ isOpen, onClose, handleSubmit }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure to proceed the order</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme={'red'} mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                handleSubmit();
                onClose();
              }}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
