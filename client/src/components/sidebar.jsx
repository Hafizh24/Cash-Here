import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Stack
} from '@chakra-ui/react'
import { FiHome, FiMenu, FiChevronDown, FiShoppingCart } from 'react-icons/fi'
import { PiPackageDuotone, PiUserListLight } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GoGraph } from 'react-icons/go'
import logo from '../assets/cashhere.png'

const LinkItems = [
  { name: 'Home', icon: FiHome, route: '/home', cashier: true },
  { name: 'Cashier', icon: PiUserListLight, route: '/manage-cashier' },
  { name: 'Product', icon: PiPackageDuotone, route: '/manage-product' },
  { name: 'Sales Report', icon: GoGraph, route: '/sales-report' }
]

const SidebarContent = ({ user, onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('#EAE7B1', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image src={logo} alt={'logo'} pt={'10px'} h={'50px'} w={'100px'} />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <>
          {user?.isAdmin === true ? (
            <>
              <Link to={link.route}>
                <NavItem key={link.name} icon={link.icon}>
                  {link.name}
                </NavItem>
              </Link>
            </>
          ) : (
            <>
              {link.cashier === true && (
                <>
                  <Link to={link.route}>
                    <NavItem key={link.name} icon={link.icon}>
                      {link.name}
                    </NavItem>
                  </Link>
                </>
              )}
            </>
          )}
        </>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box as="a" href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#3C6255',
          color: 'white'
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

const MobileNav = ({ onOpen, user, onOpening, handleLogout, ...rest }) => {
  const total = useSelector((state) => state.cart.total)
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('#3C6255', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton display={{ base: 'flex', md: 'none' }} onClick={onOpen} variant="outline" aria-label="open menu" icon={<FiMenu />} />

      <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold" color={'white'}>
        CashHere
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        {user?.isAdmin === false ? (
          <Stack as={'button'} direction={'row'} spacing={'0px'} onClick={onOpening} _hover={{ bg: 'second', py: '8px' }}>
            <FiShoppingCart color="white" fontSize={'23px'} />
            {total > 0 ? (
              <Text position={'relative'} top={-2} color={'white'} bgColor={'red'} fontSize={['11px']} w={'15px'} h={'15px'} borderRadius={'100%'}>
                {total}
              </Text>
            ) : (
              ''
            )}
          </Stack>
        ) : (
          ''
        )}
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar size={'sm'} name={user.username} bgColor={'white'} color={'black'} border={'1px'} />
                <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                  <Text fontSize="sm" color={'white'}>
                    {user.username}
                  </Text>
                  {/* <Text fontSize="xs" color="gray.600">
                    {user.username}
                  </Text> */}
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown color="white" />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={useColorModeValue('white', 'gray.900')} borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <Link to={'/profile'}>
                <MenuItem>Profile</MenuItem>
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

const SidebarWithHeader = ({ onOpening }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = useSelector((state) => state.user.value)

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} user={user} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav user={user} onOpening={onOpening} onOpen={onOpen} handleLogout={handleLogout} />
    </Box>
  )
}

export default SidebarWithHeader
