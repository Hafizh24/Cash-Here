/* eslint-disable react/prop-types */
import {
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Button,
  HStack,
  useDisclosure,
  useToast,
  Image,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import ModalUpdateProduct from './product/ModalUpdateProduct';
import ModalDeleteProduct from './product/ModalDeleteProduct';
import { addToCart } from '../redux/cartSlice';
import { formatMoney } from '../lib/utils';

export default function Card({ products, fetchProducts }) {
  const toast = useToast();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const updateModal = useDisclosure();
  const deleteModal = useDisclosure();

  const isAdmin = user?.is_admin;
  const isOutOfStock = products?.total_stock === 0;

  const handleAddToCart = () => {
    dispatch(addToCart({ id: products.id, amount: products.price }));
    toast({
      title: 'Success',
      description: `${products.name} has been added to cart`,
      status: 'success',
      duration: 1000,
      position: 'top',
    });
  };

  return (
    <>
      <Box
        maxW={{ base: '280px', md: '280x' }}
        maxH={{ base: '650px', md: '650px' }}
        w={['16rem', '16rem']}
        h={['400px', '535px']}
        bg={useColorModeValue('white', 'gray.900')}
        shadow={'lg'}
        rounded={'md'}
        p={5}
        flex="0 0 auto" // Allow flex item to shrink if needed
        mx={'5px'}
        transition="transform 0.2s ease-in-out" // Smooth transition over 0.3 seconds
        _hover={{
          transform: 'scale(1.05)', // Scale up to 105% when hovered
        }}
      >
        <Image
          boxSize={'240px'}
          mb={6}
          objectFit={'cover'}
          src={products?.image ? products?.image : 'https://fakeimg.pl/240x240'}
          fill
          alt={products?.name}
        />
        <Stack>
          <Heading color={'#3C6255'} fontSize={['xs', 'lg']} fontFamily={'body'} textTransform={'capitalize'}>
            {products?.name}
          </Heading>
          <Text color={'black'} fontWeight={800} fontSize={['xs', 'sm']} letterSpacing={1.1}>
            {formatMoney(products?.price)}
          </Text>
          {isAdmin && (
            <>
              <Text color={'black'} noOfLines={3} fontSize={['xs', 'sm']} letterSpacing={1.1}>
                {products?.description}
              </Text>
              <Text color={'black'} fontSize={['xs', 'sm']} letterSpacing={1.1}>
                {products?.total_stock}
              </Text>
              <Text color={'black'} fontSize={['xs', 'sm']} letterSpacing={1.1}>
                Status : {products?.is_active ? 'Active' : 'Inactive'}
              </Text>
            </>
          )}
          {isAdmin ? (
            <HStack justifyContent={'space-evenly'}>
              <Button
                onClick={updateModal.onOpen}
                size={['sm', 'md']}
                bgColor={'#3C6255'}
                _hover={{ bg: '#61876E' }}
                mr={2}
                color={'white'}
              >
                <EditIcon />
              </Button>
              <Button onClick={deleteModal.onOpen} size={['sm', 'md']} colorScheme="red">
                <DeleteIcon />
              </Button>
            </HStack>
          ) : (
            <Stack justifyContent={'center'} alignItems={'center'} mt={14}>
              <Button
                w={48}
                isDisabled={isOutOfStock}
                bgColor={'#3C6255'}
                _hover={{ bgColor: '#61876E' }}
                color={'white'}
                onClick={handleAddToCart}
                size={['sm', 'md']}
              >
                {isOutOfStock ? 'out of stock' : 'Add to cart'}
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>

      <ModalUpdateProduct
        isOpen={updateModal.isOpen}
        onClose={updateModal.onClose}
        products={products}
        fetchProducts={fetchProducts}
      />

      <ModalDeleteProduct
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        products={products}
        fetchProducts={fetchProducts}
      />
    </>
  );
}
