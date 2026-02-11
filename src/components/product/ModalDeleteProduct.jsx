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
import axios from '../../api/client';
import { productsApi } from '../../api/products';

export default function ModalDeleteProduct({ isOpen, onClose, products, fetchProducts }) {
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await axios.patch(`products/delete/${products.id}`);
      await productsApi.delete(products.id);

      toast({
        title: 'Success',
        description: 'Selected product has been deleted',
        status: 'success',
        duration: 3000,
        position: 'top',
      });

      fetchProducts();
    } catch (err) {
      toast({
        title: 'Error',
        description: err?.response?.data?.message || "Selected product can't be deleted",
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    } finally {
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
            All data related to <span style={{ color: 'red' }}>{products.name}</span> will be deleted.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button bgColor={'#3C6255'} _hover={{ bg: '#61876E' }} color={'white'} mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="ghost" colorScheme="red" onClick={() => handleDelete()}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
