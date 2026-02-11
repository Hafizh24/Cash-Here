import { Button, Center, FormControl, FormLabel, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAuth } from '../context/AuthContext';

export default function LoginAdmin() {
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuth();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email can't be empty"),
    password: Yup.string().min(3, 'Must be at least 3 characters long').required("Password can't be empty"),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values, action) => {
      handleSubmitLogin(values);
      action.resetForm();
    },
  });

  const handleSubmitLogin = async (data) => {
    try {
      const response = await login(data);

      if (response.status === 200) {
        navigate('/home');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `${error.response.data.message}`,
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    }
  };

  return (
    <Center minH={'100vh'}>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={7}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              type="email"
              focusBorderColor="#3C6255"
              autoComplete="off"
              rounded={'full'}
              _focus={{ backgroundColor: '#3C6255', color: 'white' }}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            {formik.touched.email && formik.errors.email ? (
              <Text mt={2} style={{ color: 'red' }}>
                {formik.errors.email}
              </Text>
            ) : null}
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              type="password"
              focusBorderColor="#3C6255"
              autoComplete="off"
              rounded={'full'}
              _focus={{ backgroundColor: '#3C6255', color: 'white' }}
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
            {formik.touched.password && formik.errors.password ? (
              <Text mt={2} style={{ color: 'red' }}>
                {formik.errors.password}
              </Text>
            ) : null}
          </FormControl>
          <Stack>
            <Button type="submit" bg={'#3C6255'} color={'white'} _hover={{ bg: '#61876E' }} rounded={'full'}>
              Login
            </Button>
          </Stack>
        </Stack>
      </form>
    </Center>
  );
}
