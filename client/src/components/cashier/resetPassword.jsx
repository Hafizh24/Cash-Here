import { Button, FormControl, Heading, Input, Stack, Text, useColorModeValue, Modal, ModalContent, ModalBody, ModalOverlay, ModalCloseButton } from '@chakra-ui/react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import instance from '../../api/axios'

export default function ForgotPassword({ isOpen, onClose }) {
  const ValidationSchema = Yup.object({
    email: Yup.string().email('Invalid address format').required('Email is required')
  })
  const handleSubmit = async (data) => {
    try {
      const response = await instance.get(`users/reset-password?email=${data.email}`, data)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: ValidationSchema,
    onSubmit: (values, action) => {
      handleSubmit(values)
      action.resetForm()
    }
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={6} w={'full'} maxW={'md'} bg={useColorModeValue('white', 'gray.700')} rounded={'xl'} boxShadow={'lg'} p={6} my={12}>
              <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                Forgot password?
              </Heading>
              <Text fontSize={{ base: 'sm', sm: 'md' }} color={useColorModeValue('gray.800', 'gray.400')}>
                You&apos;ll get an email with a reset link
              </Text>
              <form onSubmit={formik.handleSubmit}>
                <FormControl>
                  <Input
                    placeholder="youremail@gmail.com"
                    _placeholder={{ color: 'gray.500' }}
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <Text mt={2} style={{ color: 'red' }}>
                      {formik.errors.email}
                    </Text>
                  ) : null}
                </FormControl>
                <Stack spacing={6} marginTop={6}>
                  <Button
                    type="submit"
                    bg={'#61876E'}
                    color={'white'}
                    _hover={{
                      bg: '#A6BB8D',
                      color: 'black'
                    }}>
                    Request Reset
                  </Button>
                </Stack>
              </form>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
