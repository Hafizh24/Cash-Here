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
  Text,
  Switch,
  HStack,
  Select,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import axios from '../../axios';
import { useSelector } from 'react-redux';

function ModalUpdateProduct({ isOpen, onClose, products, fetchProducts }) {
  const toast = useToast();
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.user.token);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axios.patch(`products/${products?.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchProducts();
      toast({ title: 'Success', description: `Data updated`, status: 'success', duration: 4000, position: 'top' });
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response.data.message || `Something's wrong`,
        status: 'error',
        duration: 4000,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const getCategory = async () => {
    try {
      const response = await axios.get('categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategory(response.data.data);
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response.data.message,
        status: 'error',
        duration: 4000,
        position: 'top',
      });
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: products?.name,
      price: products?.price,
      image: '',
      category: products.category_id,
      description: products?.description,
      total_stock: products?.total_stock,
      isActive: products.is_active,
    },
    onSubmit: (values, action) => {
      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('category_id', values.category);
      formData.append('price', values.price);
      formData.append('total_stock', values.total_stock);
      formData.append('description', values.description);
      formData.append('image', values.image);
      formData.append('is_active', values.isActive ? 1 : 0);
      handleSubmit(formData);
      action.resetForm();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{products?.name}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody pb={8}>
            <FormControl mt={3}>
              <FormLabel>Product Name</FormLabel>
              <Input
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                border={'1px'}
              ></Input>
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                textTransform={'capitalize'}
                value={formik.values.category}
                onChange={formik.handleChange}
                border={'1px'}
              >
                {category?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Price</FormLabel>
              <Input
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                border={'1px'}
              />
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                type="text"
                value={formik.values.description}
                onChange={formik.handleChange}
                border={'1px'}
              />
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Total Stock</FormLabel>
              <Input
                name="total_stock"
                type="number"
                value={formik.values.total_stock}
                onChange={formik.handleChange}
                border={'1px'}
              />
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Change image</FormLabel>
              <Input
                name="image"
                type="file"
                onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])}
                border={'1px'}
              ></Input>
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>
                {formik.values.isActive ? (
                  <Text>
                    This product is currently <span style={{ color: 'green' }}>Active</span>
                  </Text>
                ) : (
                  <Text>
                    This product is currently <span style={{ color: 'red' }}>Inactive</span>
                  </Text>
                )}
              </FormLabel>
              <HStack border={'1px'} p={5} rounded={'md'}>
                <Switch
                  name="isActive"
                  colorScheme="green"
                  size={'lg'}
                  defaultChecked={products?.is_active}
                  onChange={formik.handleChange}
                ></Switch>
                <Text>Set this product status</Text>
              </HStack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              disabled={isLoading}
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
            <Button onClick={onClose} rounded={'full'}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ModalUpdateProduct;
