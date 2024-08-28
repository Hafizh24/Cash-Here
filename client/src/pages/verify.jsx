import { Box, Stack, Button, Heading, Center, useColorModeValue, useToast } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import instance from '../api/axios'

function Verify() {
  const params = useParams()
  const toast = useToast()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      await instance.patch(
        'users/update-user-verified',
        {},
        {
          headers: { Authorization: `Bearer ${params.token}` }
        }
      )
      toast({ title: 'Success', description: 'User has been verified', status: 'success', duration: 4000, position: 'top' })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Center>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} p={8} rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color={useColorModeValue('teal.500', 'teal.300')}>
            Account Verification
          </Heading>
        </Stack>
        <Box>
          <Button colorScheme="teal" size={'lg'} onClick={handleSubmit}>
            Verify Account
          </Button>
        </Box>
      </Stack>
    </Center>
  )
}

export default Verify
