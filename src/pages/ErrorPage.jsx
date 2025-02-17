import { Box, Button, Image, Stack, Text } from '@chakra-ui/react';
import { Link, useRouteError } from 'react-router-dom';
import notFound from '../assets/admin.png';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  if (error.status == 404) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Image src={notFound} alt="404 Not Found" zIndex={-1} />
        <Stack>
          <Text fontSize="3xl" mt={4}>
            Oops! This page doesn&apos;t exist.
          </Text>
          <Button mt={4} colorScheme="teal" onClick={() => (window.location.href = '/')}>
            Go to Homepage
          </Button>
        </Stack>
      </Box>
    );
  }
  return (
    <>
      <div>
        <h3>something went wrong</h3>
      </div>
    </>
  );
}
