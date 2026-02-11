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
import { useCallback, useState } from 'react';
import { cashiersApi } from '../../api/cashier';

export default function AddCashier({ fetchCashier }) {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data, resetForm) => {
      setIsLoading(true);

      try {
        await cashiersApi.create(data);

        toast({
          title: 'Success',
          description: `Cashier with username : ${data.username} has been created`,
          status: 'success',
          duration: 3000,
          position: 'top',
        });

        fetchCashier();
        resetForm();
      } catch (err) {
        if (err.response.status === 422) {
          toast({
            title: 'Error',
            description: `${data.username} already exist`,
            status: 'error',
            duration: 3000,
            position: 'top',
          });
        } else {
          toast({
            title: 'Error',
            description: err.response.data.message || 'Something went wrong',
            status: 'error',
            duration: 3000,
            position: 'top',
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCashier, toast],
  );

  const RegisterEventSchema = Yup.object().shape({
    username: Yup.string().required("Username can't be empty"),
    email: Yup.string().email('Must be a valid email format').required("Email can't be empty"),
    password: Yup.string().min(3, 'Must be at least 3 characters long').required("Password can't be empty"),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterEventSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, resetForm);
    },
  });
  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} minW={'32vw'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Add cashier</Heading>
      </Stack>
      <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={7}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                type="text"
                focusBorderColor="#3C6255"
                rounded={'full'}
                _focus={{ backgroundColor: '#3C6255', color: 'white' }}
                error={formik.touched.username && Boolean(formik.errors.username)}
              />
              {formik.touched.username && formik.errors.username && (
                <Text mt={2} style={{ color: 'red' }}>
                  {formik.errors.username}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                type="email"
                focusBorderColor="#3C6255"
                rounded={'full'}
                _focus={{ backgroundColor: '#3C6255', color: 'white' }}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
              {formik.touched.email && formik.errors.email && (
                <Text mt={2} style={{ color: 'red' }}>
                  {formik.errors.email}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                type="password"
                focusBorderColor="#3C6255"
                rounded={'full'}
                _focus={{ backgroundColor: '#3C6255', color: 'white' }}
                error={formik.touched.password && Boolean(formik.errors.password)}
              />
              {formik.touched.password && formik.errors.password && (
                <Text mt={2} style={{ color: 'red' }}>
                  {formik.errors.password}
                </Text>
              )}
            </FormControl>
            <Stack>
              <Button
                isLoading={isLoading}
                loadingText={'Creating...'}
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
}
