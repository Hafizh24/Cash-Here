/* eslint-disable react/prop-types */
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
  Stack,
} from '@chakra-ui/react';
import { FiHome, FiMenu, FiChevronDown, FiShoppingCart } from 'react-icons/fi';
import { PiPackageDuotone, PiUserListLight } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { GoGraph } from 'react-icons/go';
import logo from '../assets/cashhere.png';
import { logout } from '../redux/userSlice';

const LinkItems = [
  { name: 'Home', icon: FiHome, route: '/home', cashier: true },
  { name: 'Cashier', icon: PiUserListLight, route: '/manage-cashier' },
  { name: 'Product', icon: PiPackageDuotone, route: '/manage-product' },
  { name: 'Sales Report', icon: GoGraph, route: '/sales-report' },
];

const SidebarContent = ({ user, onClose }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('#EAE7B1', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image src={logo} alt={'logo'} pt={'10px'} h={'50px'} w={'100px'} />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {LinkItems.map(
        (link, index) =>
          (user?.is_admin || link.cashier) && (
            <Link to={link.route} key={index}>
              <NavItem key={link.name} icon={link.icon}>
                {link.name}
              </NavItem>
            </Link>
          ),
      )}
    </Box>
  );
};

const NavItem = ({ icon, children }) => {
  return (
    <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#3C6255',
          color: 'white',
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, user, onOpening, handleLogout }) => {
  const items = useSelector((state) => state.cart.items);

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
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        color="white"
      >
        CashHere
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        {!user?.is_admin && (
          <Stack as="button" direction="row" spacing="0" onClick={onOpening} _hover={{ bg: 'second', py: '8px' }}>
            <FiShoppingCart color="white" fontSize="23px" />
            {items.length > 0 && (
              <Text
                position="relative"
                top={-2}
                color="white"
                bgColor="red"
                fontSize={['11px']}
                w="15px"
                h="15px"
                borderRadius="100%"
              >
                {items.length}
              </Text>
            )}
          </Stack>
        )}

        <Menu>
          <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
            <HStack>
              <Avatar size={'sm'} name={user?.username} bgColor="white" color="black" border="1px" />
              <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                <Text fontSize="sm" color="white">
                  {user?.username}
                </Text>
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
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ onOpening }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} user={user} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} user={user} />
        </DrawerContent>
      </Drawer>
      <MobileNav user={user} onOpening={onOpening} onOpen={onOpen} handleLogout={handleLogout} />
    </Box>
  );
};

export default SidebarWithHeader;
