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

export default function ModalDeleteProduct({ isOpenWarning, onCloseWarning, productData, getProducts }) {
  const toast = useToast();

  const handleDelete = async () => {
    try {
      //   await axios.patch(
      //     `products/delete-product`,
      //     { id: productData.id },
      //     { headers: { Authorization: `Bearer ${token}` } },
      //   );
      await axios.patch(`products/delete/${productData.id}`);

      toast({
        title: 'Success',
        description: 'Selected product has been deleted',
        status: 'success',
        duration: 3000,
        position: 'top',
      });
      getProducts();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error',
        description: "Selected product can't be deleted",
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    }
  };

  return (
    <Modal isOpen={isOpenWarning} onClose={onCloseWarning} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Are you sure? <WarningIcon color={'red'} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            All data related to <span style={{ color: 'red' }}>{productData.name}</span> will be deleted.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button bgColor={'#3C6255'} _hover={{ bg: '#61876E' }} color={'white'} mr={3} onClick={onCloseWarning}>
            Cancel
          </Button>
          <Button
            variant="ghost"
            colorScheme="red"
            onClick={() => {
              handleDelete();
              onCloseWarning();
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
