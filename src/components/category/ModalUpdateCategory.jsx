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
import { categoriesApi } from '../../api/category';

export default function ModalUpdateCategory({
  isOpen,
  onClose,
  fetchCategories,
  clickedData,
  isLoading,
  setIsLoading,
}) {
  const toast = useToast();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await categoriesApi.update(clickedData?.id, values);
      toast({
        title: 'Success',
        description: `Category has been updated`,
        status: 'success',
        duration: 4000,
        position: 'top',
      });

      fetchCategories();
      onClose();
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Something went wrong. Please try again.',
        status: 'error',
        duration: 4000,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      name: clickedData.name,
    },
    onSubmit: (values, action) => {
      handleSubmit(values);
      action.resetForm();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Category</ModalHeader>
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
                defaultValue={clickedData.name}
                border={'1px'}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Updating..."
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
  );
}
