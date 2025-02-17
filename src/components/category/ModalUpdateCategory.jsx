/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  useToast,
  Input,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import axios from '../../axios';

function ModalUpdateCategory({ isOpenUpdate, onCloseUpdate, data, fetchAPI, clickedData }) {
  const toast = useToast();
  //   const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      //   await instance.patch(`categories/${clickedData?.id}`, data, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });
      await axios.patch(`categories/${clickedData?.id}`, data);

      setLoading(false);
      fetchAPI();
      toast({
        title: 'Success',
        description: `Category has been updated`,
        status: 'success',
        duration: 4000,
        position: 'top',
      });
      onCloseUpdate();
    } catch (err) {
      console.log(err.response?.data);
      toast({
        title: 'Error',
        description: `Something's wrong`,
        status: 'error',
        duration: 4000,
        position: 'top',
      });
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCloseUpdate();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values, action) => {
      handleSubmit(values);
      action.resetForm();
    },
  });

  return (
    <>
      <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{data?.name}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody pb={8}>
              <FormControl mt={3}>
                <FormLabel>Category Name</FormLabel>
                <Input
                  name="name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  autoComplete="new"
                  border={'1px'}
                  placeholder={data?.name}
                ></Input>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                isLoading={loading}
                loadingText="Updating"
                bg={'#3C6255'}
                color={'white'}
                colorScheme="blue"
                mr={3}
                _hover={{ bg: '#61876E' }}
                rounded={'full'}
              >
                Update
              </Button>
              <Button onClick={handleCancel} rounded={'full'}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalUpdateCategory;
