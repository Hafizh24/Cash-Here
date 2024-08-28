import { Box, Heading, Text, Button, Stack, Flex, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import admin from '../assets/admin.png'
export default function WelcomePage() {
  return (
    <>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack ml={'9'} as={Box} textAlign={'left'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
            <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight={'110%'}>
              Point of Sale and Inventory Management Website <br />
              <Text as={'span'} color={'#3C6255'}>
                With Cash Here
              </Text>
            </Heading>
            <Flex w={'70%'}>
              <Text color={'gray.900'} fontSize={'medium'}>
                Manage your store sales, inventory, and employees with such convenience; draw customers and increase your revenue. Build your business together with us.
              </Text>
            </Flex>
            <Stack direction={'row'} spacing={3} align={'left'} alignSelf={'left'} position={'relative'}>
              <Link to="/login-cashier">
                <Button
                  w={'20rem'}
                  colorScheme={'green'}
                  bg={'#3C6255'}
                  borderRadius={'5px'}
                  px={6}
                  _hover={{
                    bg: '#61876E'
                  }}>
                  Sign In
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Flex>
        <Flex justifyItems={'center'} justifyContent={'center'} alignContent={'center'} flex={1}>
          <Box maxW={'100%'}>
            <Image mt={'100px'} display={{ base: 'none', md: 'block' }} h={'45rem'} alt={'Login Image'} objectFit={'cover'} src={admin} />
          </Box>
        </Flex>
      </Stack>
    </>
  )
}
