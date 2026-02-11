import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from '../api/client';

import cashier from '../assets/inikasir.png';
import { setToken, setUser } from '../redux/userSlice';
import { authApi } from '../api/auth';

export default function LoginCashier() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleButtonClick = () => {
    onOpen();
  };

  // const [checkedItems, setCheckedItems] = useState(false);
  // const handleCheckBoxChange = () => {
  //   setCheckedItems(!checkedItems);
  // };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (data) => {
    try {
      // if (checkedItems === true) {
      //   data.rememberme = true;
      // } else {
      //   data.rememberme = false;
      // }

      // const response = await axios.get(`auth/login?email=${data.email}&password=${data.password}`, data);
      const response = await authApi.login(data);
      // const response = await axios.get(
      //   `users/user-login?username=${data.username}&password=${data.password}&rememberme=${data.rememberme}`,
      //   data,
      // );
      if (response.status === 200) {
        // dispatch(setUser(response.data?.data));
        // dispatch(setToken(response.data?.token));
        navigate('/home');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: `${err.response.data.message}`,
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm();
    },
  });

  return (
    <>
      <Stack minH={'100vh'} direction={{ base: 'column', sm: 'row', md: 'column', lg: 'row' }}>
        <Flex justifyContent={'center'} alignContent={'center'} flex={1}>
          <Image alt={'Login Image'} objectFit={'cover'} src={cashier} />
        </Flex>
        <Flex p={8} flex={1} align={'center'} justify={'center'} bgColor={'gray.200'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'} color={'#3C6255'}>
              Enter your Cash Here account!
            </Heading>
            <form onSubmit={formik.handleSubmit}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  _hover={{ border: '2px solid #61876E' }}
                  border={'1px solid #61876E'}
                  focusBorderColor="#3C6255"
                  type="email"
                  error={formik.touched.email && Boolean(formik.errors.email)}
                />
                {formik.touched.email && formik.errors.email && (
                  <Text mt={2} style={{ color: 'red' }}>
                    {formik.errors.email}
                  </Text>
                )}
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  _hover={{ border: '2px solid #61876E' }}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  border={'1px solid #61876E '}
                  focusBorderColor="#3C6255"
                  type="password"
                />
                {formik.touched.password && formik.errors.password && (
                  <Text mt={2} style={{ color: 'red' }}>
                    {formik.errors.password}
                  </Text>
                )}
              </FormControl>
              <Stack spacing={6}>
                <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                  {/* <Checkbox
                    isChecked={checkedItems}
                    onChange={() => {
                      handleCheckBoxChange();
                    }}
                    border={'#3C6255'}
                    colorScheme="green"
                  >
                    Remember me
                  </Checkbox> */}
                  <Button
                    variant={'unstyled'}
                    color={'#61876E'}
                    _hover={{ color: '#3C6255' }}
                    onClick={() => {
                      handleButtonClick();
                    }}
                  >
                    Forgot password?
                  </Button>
                </Stack>
                <Button
                  type="submit"
                  bgColor={'#3C6255'}
                  variant={'solid'}
                  color={'white'}
                  _hover={{ color: 'black', bgColor: '#61876E' }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Flex>
      </Stack>
      {/* <ForgotPassword isOpen={isOpen} onClose={onClose} isCentered /> */}
    </>
  );
}
