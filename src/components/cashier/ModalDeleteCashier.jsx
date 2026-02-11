/* eslint-disable react/prop-types */
import { WarningIcon } from '@chakra-ui/icons';
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
  useToast,
} from '@chakra-ui/react';
import { cashiersApi } from '../../api/cashier';

export default function ModalDeleteCashier({ isOpen, onClose, clickedData, fetchCashier }) {
  const toast = useToast();

  const handleDelete = async (id) => {
    try {
      await cashiersApi.delete(id);

      toast({
        title: 'Success',
        description: 'Selected cashier has been deleted',
        status: 'success',
        duration: 3000,
        position: 'top',
      });

      fetchCashier();
      onClose();
    } catch (err) {
      toast({
        title: 'Error',
        description: err?.response?.data?.message || 'Failed to delete cashier',
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Are you sure? <WarningIcon color={'red'} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            All data related to <span style={{ color: 'red' }}>{clickedData?.username}</span> will be deleted.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="ghost" colorScheme="red" onClick={() => handleDelete(clickedData?.id)}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
