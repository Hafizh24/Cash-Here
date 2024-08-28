import { Box, FormControl, FormLabel, Input, Stack, Button, Heading, useColorModeValue, Text, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import instance from '../../../api/axios'

function AddCashier({ getCashierData }) {
  const toast = useToast()
  const token = localStorage.getItem('token')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data) => {
    try {
      setLoading(true)
      await instance.post('users/add-user', data, {
        headers: { Authorization: `Bearer ${token}` }
      }) //sending data to database
      getCashierData()
      toast({ title: 'Success', description: `Cashier with username : ${data.username} has been created`, status: 'success', duration: 3000, position: 'top' })
      setLoading(false)
    } catch (err) {
      console.log(err.response.data.message)
      setLoading(false)
      toast({ title: 'Error', description: `${data.username} already exist`, status: 'error', duration: 3000, position: 'top' })
    }
  }

  const RegisterEventSchema = Yup.object().shape({
    username: Yup.string().required("Username can't be empty"),
    email: Yup.string().email('Must be a valid email format').required("Email can't be empty"),
    password: Yup.string().min(3, 'Must be at least 3 characters long').required("Password can't be empty")
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterEventSchema,
    onSubmit: (values, action) => {
      handleSubmit(values)
      action.resetForm()
    }
  })
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
                autoComplete="off"
                rounded={'full'}
                _focus={{ backgroundColor: '#3C6255', color: 'white' }}
                error={formik.touched.username && Boolean(formik.errors.username)}
              />
              {formik.touched.username && formik.errors.username ? (
                <Text mt={2} style={{ color: 'red' }}>
                  {formik.errors.username}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                type="email"
                focusBorderColor="#3C6255"
                autoComplete="new"
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
              <Button
                isLoading={loading}
                loadingText={'loading'}
                type="submit"
                bg={'#3C6255'}
                color={'white'}
                _hover={{
                  bg: '#61876E'
                }}
                rounded={'full'}>
                Create
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Stack>
  )
}

export default AddCashier
