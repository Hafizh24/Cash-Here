import { Box, Stack, Button, Heading, Center, useColorModeValue, useToast, Spinner } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios';
import { useState } from 'react';

export default function Verify() {
  const { token } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      await axios.patch(
        'auth/verify',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast({
        title: 'Success',
        description: 'User has been verified',
        status: 'success',
        duration: 4000,
        position: 'top',
      });
      navigate('/');
    } catch (err) {
      toast({
        title: 'Error',
        description: `${err.response.data.message} || Something went wrong`,
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center>
      <Stack
        spacing={8}
        mx={'auto'}
        maxW={'lg'}
        p={8}
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
      >
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color={useColorModeValue('teal.500', 'teal.300')}>
            Account Verification
          </Heading>
        </Stack>
        <Box>
          <Button
            colorScheme="teal"
            size={'lg'}
            onClick={handleSubmit}
            isLoading={isLoading}
            loadingText="Verifying..."
          >
            {isLoading ? <Spinner size={'sm'} /> : 'Verify'}
          </Button>
        </Box>
      </Stack>
    </Center>
  );
}
