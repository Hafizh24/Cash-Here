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
import axios from '../../axios';
import { useSelector } from 'react-redux';

function ModalUpdate({ isOpen, onClose, clickedData, getCashierData }) {
  const toast = useToast();
  const token = useSelector((state) => state.user.token);

  const handleSubmit = async (data) => {
    try {
      data.id = clickedData.id;
      if (clickedData.is_enabled === false) {
        data.is_enabled = true;
      } else {
        data.is_enabled = false;
      }

      await axios.patch('users/update-status', data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: 'Success',
        description: `${clickedData.username} has been ${data.isEnabled ? 'enabled' : 'disabled'}`,
        status: 'success',
        duration: 4000,
        position: 'top',
      });

      getCashierData();
      onClose();
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      is_enabled: false,
    },
    onSubmit: (values, action) => {
      handleSubmit(values);
      action.resetForm();
    },
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {clickedData.is_enabled ? 'Disable' : 'Enable'}{' '}
            <span style={{ color: 'blue' }}>{clickedData.username} </span>?
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
                {clickedData.is_enabled ? 'Disable' : 'Enable'}
              </Button>
              <Button onClick={onClose} rounded={'full'}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalUpdate;
