import { Box, FormControl, FormLabel, Input, Stack, Button, Heading, useColorModeValue, Text, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import instance from '../api/axios'

function ResetPasswordPage() {
  const params = useParams()
  const toast = useToast()
  const navigate = useNavigate()

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().min(3, 'Must be at least 3 characters long').required("Password can't be empty"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password harus sama dengan konfirmasi password') // Validasi konfirmasi password
      .required('Confirm Password tidak boleh kosong')
  })

  const handleSubmit = async (data) => {
    try {
      console.log(data)
      await instance.patch('users/update-user-password', data, {
        headers: { Authorization: `Bearer ${params.token}` }
      })
      toast({ title: 'Success', description: `Password has been updated`, status: 'success', duration: 4000, position: 'top' })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values, action) => {
      handleSubmit(values)
      action.resetForm()
    }
  })
  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} minW={'32vw'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Reset Password</Heading>
      </Stack>
      <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={7}>
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
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                type="password"
                focusBorderColor="#3C6255"
                autoComplete="off"
                rounded={'full'}
                _focus={{ backgroundColor: '#3C6255', color: 'white' }}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <Text mt={2} style={{ color: 'red' }}>
                  {formik.errors.confirmPassword}
                </Text>
              ) : null}
            </FormControl>
            <Stack>
              <Button type="submit" bg={'#3C6255'} color={'white'} _hover={{ bg: '#61876E' }} rounded={'full'}>
                Update
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Stack>
  )
}

export default ResetPasswordPage
