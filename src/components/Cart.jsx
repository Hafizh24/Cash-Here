/* eslint-disable react/prop-types */
import { AddIcon, DeleteIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import axios from '../axios';
import ModalConfirmPayment from './cart/ModalConfirmPayment';
import ModalReceipt from './cart/ModalReceipt';
import CurrencyInput from 'react-currency-input-field';
import { formatMoney } from '../lib/utils';
import { addToCart, decreaseQuantity, removeFromCart } from '../redux/cartSlice';

const Cart = ({ data, onClose, isOpen }) => {
  const dispatch = useDispatch();
  const firstField = useRef();
  const toast = useToast();

  const paymentModal = useDisclosure();
  const receiptModal = useDisclosure();

  const carts = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.user.token);

  const [amount, setAmount] = useState('');

  const total = useSelector((state) => state.cart.total);
  const change = amount - total;

  const handleRemoveFromCart = (item, product) => {
    dispatch(removeFromCart({ id: item.id }));
    toast({
      title: 'success',
      description: `${product.name} has been removed from cart`,
      status: 'success',
      duration: 1000,
      position: 'top',
    });
  };

  const handleDecreaseQuantity = (item, product) => {
    dispatch(decreaseQuantity({ id: item.id, quantity: 1 }));

    if (item.quantity === 1) {
      toast({
        title: 'success',
        description: `${product.name} has been removed from cart`,
        status: 'success',
        duration: 1000,
        position: 'top',
      });
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        'transactions',
        { cart: carts, total_price: total, amount, change: change },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      onClose();
      receiptModal.onOpen();
    } catch (error) {
      toast({
        title: 'Error',
        description: `${error.response.data.message}`,
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" initialFocusRef={firstField} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader mt={10} borderBottomWidth="1px">
            Current order
          </DrawerHeader>
          <DrawerBody mt={10}>
            {carts.map((item) => {
              const product = data.find((product) => product.id === item.id);
              return (
                <Stack mb={3} key={item.id}>
                  <Card direction={'row'} overflow={'hidden'} variant={'outline'}>
                    <Image
                      src={product?.image ? product?.image : 'https://fakeimg.pl/240x240'}
                      borderRadius="full"
                      w={'6rem'}
                      h={'6rem'}
                      px={2}
                      py={2}
                      backgroundSize={'cover'}
                    />
                    <CardBody>
                      <Stack direction={'column'}>
                        <Heading fontSize={'md'} fontWeight={'700'} textTransform={'capitalize'}>
                          {product?.name}
                        </Heading>
                        <Text fontSize={'md'} fontWeight={'900'} color={'first'}>
                          {formatMoney(product?.price)}
                        </Text>
                      </Stack>
                      <Stack direction={'row'} mt={8} alignItems={'center'} justifyContent={'end'}>
                        <IconButton
                          onClick={() => handleRemoveFromCart(item, product)}
                          variant="filled"
                          size="sm"
                          // w={3}
                          color={'red'}
                          icon={<DeleteIcon />}
                        />
                        <IconButton
                          onClick={() => handleDecreaseQuantity(item, product)}
                          variant={'outline'}
                          size="sm"
                          icon={<MinusIcon />}
                        />
                        <Text>{item.quantity}</Text>
                        <IconButton
                          isDisabled={item.quantity >= product.total_stock}
                          onClick={() => dispatch(addToCart({ id: item.id }))}
                          variant={'outline'}
                          size="sm"
                          icon={<AddIcon />}
                        />
                      </Stack>
                    </CardBody>
                  </Card>
                </Stack>
              );
            })}
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px" display={'flex'} flexDirection={'column'}>
            {carts.length > 0 ? (
              <>
                <Stack mb={'30px'} direction={'row'} alignItems={'center'} columnGap={'100px'}>
                  <Text fontSize={'xl'} fontWeight={600}>
                    Total
                  </Text>
                  <Text fontSize={'xl'} fontWeight={600}>
                    {formatMoney(total)}
                  </Text>
                </Stack>
                <Stack mb={'50px'}>
                  <Input
                    as={CurrencyInput}
                    defaultValue={amount}
                    placeholder="Enter amount"
                    intlConfig={{ locale: 'id-ID', currency: 'IDR' }}
                    onValueChange={(value) => setAmount(value)}
                  />
                </Stack>
                <Flex direction={'column'}>
                  <Button
                    isDisabled={amount < total || amount === ''}
                    onClick={() => paymentModal.onOpen()}
                    bgColor={'#3C6255'}
                    color={'white'}
                    _hover={{ bgColor: '#61876E' }}
                  >
                    Checkout
                  </Button>
                </Flex>
              </>
            ) : (
              <Text fontSize={'xl'} fontWeight={400} position={'fixed'} top={'50%'}>
                There&apos;s no order
              </Text>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <ModalConfirmPayment isOpen={paymentModal.isOpen} onClose={paymentModal.onClose} handleSubmit={handleSubmit} />
      <ModalReceipt
        products={data}
        carts={carts}
        total={total}
        change={change}
        onClose={receiptModal.onClose}
        isOpen={receiptModal.isOpen}
        setAmount={setAmount}
      />
    </>
  );
};

export default Cart;
