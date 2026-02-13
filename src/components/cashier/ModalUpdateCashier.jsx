/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { cashiersApi } from '../../api/cashier';
import { useState } from 'react';

function ModalUpdateCashier({ isOpen, onClose, clickedData, fetchCashier }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const updatedStatus = !clickedData.is_enabled;

      const response = await cashiersApi.updateStatus(clickedData.id, {
        id: clickedData.id,
        is_enabled: updatedStatus,
      });

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: `${clickedData.username} has been ${updatedStatus ? 'enabled' : 'disabled'}`,
          status: 'success',
          duration: 4000,
          position: 'top',
        });

        fetchCashier();
        onClose();
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response.data.message || 'Something went wrong',
        status: 'error',
        duration: 4000,
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      is_enabled: clickedData.is_enabled,
    },
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm();
    },
  });

  const actionText = clickedData.is_enabled ? 'Disable' : 'Enable';

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {actionText} <span style={{ color: 'blue' }}>{clickedData.username} </span>?
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody pb={8}>
            <FormControl>
              <FormLabel>
                {`${clickedData.username} will be ${
                  clickedData.is_enabled
                    ? "disabled and he/she can't log in to the website"
                    : 'enabled and he/she can log in to the website'
                }.`}
              </FormLabel>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              bg={'#3C6255'}
              color={'white'}
              colorScheme="blue"
              mr={3}
              _hover={{ bg: '#61876E' }}
              rounded={'full'}
            >
              {loading ? 'Loading...' : actionText}
            </Button>
            <Button onClick={onClose} rounded={'full'}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ModalUpdateCashier;
