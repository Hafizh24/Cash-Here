import { Stack, Button, Heading, useToast } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import instance from '../../api/axios'

function AdminSettings() {
  const token = localStorage.getItem('token')
  const toast = useToast()
  const user = useSelector((state) => state.user.value)

  const resetPassword = async () => {
    try {
      await instance.get(`users/reset-password?username=${user.username}&email=${user.email}`, {
        headers: { Authorization: `Bearer ${token}` }
      }) //sending data to database
      toast({
        title: 'Success',
        description: `We've sent an email confirmation to reset your password`,
        status: 'success',
        duration: 4000,
        position: 'top'
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} minW={'32vw'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Reset Password</Heading>
          <Button
            onClick={() => {
              resetPassword()
            }}
            colorScheme="green">
            Reset Password
          </Button>
        </Stack>
      </Stack>
    </>
  )
}

export default AdminSettings
