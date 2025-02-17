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

const AddCategory = ({ fetchAPI }) => {
  const toast = useToast();
  // const token = localStorage.getItem('token');

  const validationtSchema = Yup.object().shape({
    name: Yup.string().required("Name can't be empty"),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationtSchema,
    onSubmit: (values, action) => {
      handleSubmit(values);
      action.resetForm();
    },
  });

  const handleSubmit = async (data) => {
    try {
      // await axios.post('categories', data, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      console.log(data);

      const response = await axios.post('categories', data);

      if (response.status === 201) {
        fetchAPI();
        toast({
          title: 'Success',
          description: 'Category has been added',
          status: 'success',
          duration: 3000,
          position: 'top',
        });
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
        toast({ title: 'Error', status: 'error', duration: 3000, position: 'top' });
      }
    }
  };

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
              {formik.touched.name && formik.errors.name ? (
                <Text mt={2} style={{ color: 'red' }}>
                  {formik.errors.name}
                </Text>
              ) : null}
            </FormControl>
            <Stack>
              <Button
                type="submit"
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
