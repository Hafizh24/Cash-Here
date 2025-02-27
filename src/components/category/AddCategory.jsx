/* eslint-disable react/prop-types */
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

const AddCategory = ({ fetchCategories }) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const token = useSelector((state) => state.user.token);

  const validationtSchema = Yup.object().shape({
    name: Yup.string().required("Name can't be empty"),
  });

  const handleSubmit = useCallback(
    async (data, resetForm) => {
      setIsLoading(true);

      try {
        const response = await axios.post('categories', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          fetchCategories();
          toast({
            title: 'Success',
            description: 'Category has been added',
            status: 'success',
            duration: 3000,
            position: 'top',
          });

          resetForm();
        }
      } catch (err) {
        if (err.response.status === 422) {
          toast({
            title: 'Error',
            description: `${data.name} already exist`,
            status: 'error',
            duration: 3000,
            position: 'top',
          });
        } else {
          toast({
            title: 'Error',
            description: err.response.data.message,
            status: 'error',
            duration: 3000,
            position: 'top',
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCategories, setIsLoading, toast, token],
  );

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationtSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, resetForm);
    },
  });

  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} minW={'32vw'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Add product category</Heading>
      </Stack>
      <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={7}>
            <FormControl>
              <FormLabel>name</FormLabel>
              <Input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                type="text"
                focusBorderColor="#3C6255"
                autoComplete="off"
                rounded={'full'}
                _focus={{ backgroundColor: '#3C6255', color: 'white' }}
                error={formik.touched.name && Boolean(formik.errors.name)}
              />
              {formik.touched.name && formik.errors.name && (
                <Text mt={2} style={{ color: 'red' }}>
                  {formik.errors.name}
                </Text>
              )}
            </FormControl>
            <Stack>
              <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Creating..."
                bg={'#3C6255'}
                color={'white'}
                _hover={{
                  bg: '#61876E',
                }}
                rounded={'full'}
              >
                Create
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default AddCategory;
