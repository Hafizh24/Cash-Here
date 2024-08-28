import { Avatar, Box, Flex, HStack, Image, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import logo from '../../assets/cashhere.png'

const NavbarProfile = () => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <Flex
      ml={{ base: 0 }}
      px={{ base: 4 }}
      height="20"
      alignItems="center"
      bg={'fourth'}
      borderBottomWidth="1px"
      borderBottomColor={'gray.200'}
      justifyContent={{ base: 'space-between' }}>
      <Link to={'/home'}>
        <Image src={logo} alt={'logo'} pt={'10px'} h={'50px'} w={'100px'} />
      </Link>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar size={'sm'} bgColor={'white'} color={'black'} border={'1px'} />
                <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                  <Text fontSize="sm" color={'black'}>
                    username
                  </Text>
                  {/* <Text fontSize="xs" color="gray.600">
                  {user.username}
                </Text> */}
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown color="black" />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={useColorModeValue('white', 'gray.900')} borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <Link to={'/home'}>
                <MenuItem>Home</MenuItem>
              </Link>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

export default NavbarProfile
