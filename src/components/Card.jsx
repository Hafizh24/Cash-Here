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
// import { addToCart } from '../redux/cartSlice';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import ModalUpdateProduct from './product/ModalUpdateProduct';
import ModalDeleteProduct from './product/ModalDeleteProduct';
import { addToCart } from '../redux/cartSlice';

export default function Card({ productData, getProducts }) {
  const toast = useToast();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  // const token = localStorage.getItem('token');

  const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure();
  const { isOpen: isOpenWarning, onOpen: onOpenWarning, onClose: onCloseWarning } = useDisclosure();

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
        {/* <Box overflow={'hidden'} h={{ base: '140px', md: '140px', lg: '200px' }} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <Image src={`http://localhost:2000/${productData.image}`} fill alt={productData?.name} />
        </Box>{' '}
        */}
        <Image
          boxSize={'240px'}
          mb={6}
          objectFit={'cover'}
          src={productData?.image ? `http://localhost:2000/${productData?.image}` : 'https://fakeimg.pl/240x240'}
          fill
          alt={productData?.name}
        />
        <Stack>
          <Heading color={'#3C6255'} fontSize={['xs', 'lg']} fontFamily={'body'} textTransform={'capitalize'}>
            {productData?.name}
          </Heading>
          <Text color={'black'} fontWeight={800} fontSize={['xs', 'sm']} letterSpacing={1.1}>
            {productData?.price.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            })}
          </Text>
          <Text color={'black'} noOfLines={3} fontSize={['xs', 'sm']} letterSpacing={1.1}>
            {user?.is_admin && <>{productData?.description}</>}
          </Text>
          <Text color={'black'} fontSize={['xs', 'sm']} letterSpacing={1.1}>
            {user?.is_admin && <>Stock : {productData?.total_stock}</>}
          </Text>
          <Text color={'black'} fontSize={['xs', 'sm']} letterSpacing={1.1}>
            {user?.is_admin && <>Status : {productData?.is_active === true ? <>Active</> : <>Inactive</>}</>}
          </Text>
          {user?.is_admin ? (
            <HStack justifyContent={'space-evenly'}>
              <Button
                onClick={() => {
                  onOpenUpdate();
                }}
                size={['sm', 'md']}
                bgColor={'#3C6255'}
                _hover={{ bg: '#61876E' }}
                mr={2}
                color={'white'}
              >
                <EditIcon />
              </Button>
              <Button
                onClick={() => {
                  onOpenWarning();
                }}
                size={['sm', 'md']}
                colorScheme="red"
              >
                <DeleteIcon />
              </Button>
            </HStack>
          ) : (
            <Stack justifyContent={'center'} alignItems={'center'} mt={14}>
              <Button
                w={48}
                isDisabled={productData.total_stock <= 0 ? true : false}
                bgColor={'#3C6255'}
                _hover={{ bgColor: '#61876E' }}
                color={'white'}
                onClick={() => {
                  dispatch(addToCart({ id: productData.id, quantity: 1, amount: productData.price }));
                  toast({
                    title: 'Success',
                    description: `${productData.name} has been added to cart`,
                    status: 'success',
                    duration: 1000,
                    position: 'top',
                  });
                }}
                size={['sm', 'md']}
              >
                {productData?.total_stock <= 0 ? 'out of stock' : 'Add to cart'}
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>

      <ModalUpdateProduct
        isOpenUpdate={isOpenUpdate}
        onCloseUpdate={onCloseUpdate}
        productData={productData}
        getProducts={getProducts}
      />

      <ModalDeleteProduct
        isOpenWarning={isOpenWarning}
        onCloseWarning={onCloseWarning}
        productData={productData}
        getProducts={getProducts}
      />
    </>
  );
}
