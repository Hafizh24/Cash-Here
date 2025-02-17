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
import axios from '../../axios';

export default function ModalDelete({ isOpen, onClose, clickedData, getCashierData }) {
  const toast = useToast();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`users/${id}`);
      //   await axios.delete(`users/delete-cashier/${id}`, {
      //     headers: { Authorization: `Bearer ${token}` },
      //   });

      toast({
        title: 'Success',
        description: 'Selected cashier has been deleted',
        status: 'success',
        duration: 3000,
        position: 'top',
      });

      getCashierData();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error',
        description: "Selected cashier can't be deleted",
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
          <Button
            variant="ghost"
            colorScheme="red"
            onClick={() => {
              handleDelete(clickedData?.id);
              onClose();
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
