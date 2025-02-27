/* eslint-disable react/prop-types */
import { Box, Button, Flex, FormControl, FormLabel, Input, Select, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from '../../axios';
import { useSelector } from 'react-redux';

export default function AddProduct({ fetchProducts }) {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);
  const toast = useToast();
  const token = useSelector((state) => state.user.token);

  const AddProductSchema = Yup.object().shape({
    name: Yup.string().required("Product name can't be empty"),
    category: Yup.number().required("Category can't be empty"),
    price: Yup.number().required("Price can't be empty").positive("Can't be negative").integer(),
    total_stock: Yup.number().required("Stock can't be empty").positive("Can't be negative").integer(),
    description: Yup.string().optional(),
    image: Yup.mixed().nullable().optional(),
  });

  const getCategory = useCallback(async () => {
    try {
      const response = await axios.get('categories', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategory(response.data.data);
    } catch (err) {
      toast({
        title: 'Error',
        description: `${err.response.data.message} || failed to get category`,
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    }
  }, [token, toast]);

  const handleSubmit = async (data) => {
    setIsLoading(true);

    try {
      await axios.post('products', data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: 'Success',
        description: `${data.get('name')} has been created`,
        status: 'success',
        duration: 3000,
        position: 'top',
      });
      fetchProducts();
    } catch (err) {
      toast({
        title: 'Error',
        description: `${err.response.data.message} || failed to create product`,
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      price: '',
      total_stock: '',
      image: null,
      description: '',
    },
    validationSchema: AddProductSchema,
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('category_id', values.category);
      formData.append('price', values.price);
      formData.append('total_stock', values.total_stock);
      formData.append('description', values.description);
      formData.append('image', values.image);

      handleSubmit(formData);
      resetForm();
      fileInputRef.current && (fileInputRef.current.value = '');
    },
  });

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Flex minH={'80vh'} align={'center'} justifyContent={'center'} direction={'column'} gap={5}>
          <SimpleGrid columns={[1, null, 2]} spacing={10}>
            <Box p={7} rounded={'lg'} bgColor={'white'} shadow={'lg'}>
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  type="text"
                  focusBorderColor="#3C6255"
                  shadow={'md'}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  placeholder="Insert product name"
                />
                {formik.touched.name && formik.errors.name && (
                  <Text mt={2} style={{ color: 'red' }}>
                    {formik.errors.name}
                  </Text>
                )}
              </FormControl>
            </Box>
            <Box p={7} rounded={'lg'} bgColor={'white'} shadow={'lg'}>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  name="category"
                  shadow={'md'}
                  textTransform={'capitalize'}
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                >
                  <option value="">Select a category</option>
                  {category?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <Text mt={2} style={{ color: 'red' }}>
                    {formik.errors.category}
                  </Text>
                )}
              </FormControl>
            </Box>
            <Box p={7} rounded={'lg'} bgColor={'white'} shadow={'lg'}>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  name="price"
                  type="number"
                  value={formik.values.price}
                  shadow={'md'}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  placeholder="Insert product price"
                />
                {formik.touched.price && formik.errors.price && (
                  <Text mt={2} style={{ color: 'red' }}>
                    {formik.errors.price}
                  </Text>
                )}
              </FormControl>
            </Box>
            <Box p={7} rounded={'lg'} bgColor={'white'} shadow={'lg'}>
              <FormControl>
                <FormLabel>Total stock</FormLabel>
                <Input
                  name="total_stock"
                  value={formik.values.total_stock}
                  onChange={formik.handleChange}
                  shadow={'md'}
                  type="number"
                  error={formik.touched.total_stock && Boolean(formik.errors.total_stock)}
                  placeholder="Insert product stock"
                />
                {formik.touched.total_stock && formik.errors.total_stock && (
                  <Text mt={2} style={{ color: 'red' }}>
                    {formik.errors.total_stock}
                  </Text>
                )}
              </FormControl>
            </Box>
            <Box p={7} rounded={'lg'} bgColor={'white'} shadow={'lg'}>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  ref={fileInputRef}
                  name="image"
                  type="file"
                  onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0] || null)}
                  shadow={'md'}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                />
                {formik.touched.image && formik.errors.image && (
                  <Text mt={2} style={{ color: 'red' }}>
                    {formik.errors.image}
                  </Text>
                )}
              </FormControl>
            </Box>
            <Box p={7} rounded={'lg'} bgColor={'white'} shadow={'lg'}>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  shadow={'md'}
                  type="text"
                  placeholder="Insert product description"
                  error={formik.touched.description && Boolean(formik.errors.description)}
                />
                {formik.touched.description && formik.errors.description && (
                  <Text mt={2} style={{ color: 'red' }}>
                    {formik.errors.description}
                  </Text>
                )}
              </FormControl>
            </Box>
          </SimpleGrid>
          <Button
            type="submit"
            bgColor={'#3C6255'}
            color={'white'}
            mt={10}
            isDisabled={isLoading}
            isLoading={isLoading}
            loadingText={'Creating...'}
            p={5}
          >
            Create
          </Button>
        </Flex>
      </form>
    </>
  );
}
