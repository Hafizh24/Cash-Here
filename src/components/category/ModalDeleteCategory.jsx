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

export default function ModalDeleteCategory({ isOpen, onClose, clickedData, fetchCategories, setIsLoading }) {
  const toast = useToast();

  const handleDelete = async (id) => {
    setIsLoading(true);

    try {
      const response = await axios.patch(`categories/delete/${id}`);

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: 'Selected category has been deleted',
          status: 'success',
          duration: 3000,
          position: 'top',
        });

        fetchCategories();
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err?.response?.data?.message || "Selected category can't be deleted",
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
      onClose();
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
            All data related to <span style={{ color: 'red' }}>{clickedData.name}</span> will be deleted.
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
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
