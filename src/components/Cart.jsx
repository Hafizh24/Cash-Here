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
import CurrencyInput from 'react-currency-input-field';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addTotal, removeFromCart, subtractQuantity } from '../redux/cartSlice';
import { useRef, useState } from 'react';

// import ModalConfirmPayment from './modalConfirmPayment';
// import ModalReceipt from './modalReceipt';

import axios from '../axios';
import ModalConfirmPayment from './cart/ModalConfirmPayment';
import ModalReceipt from './cart/ModalReceipt';

const Cart = ({ data, onClose, isOpen, getProducts }) => {
  const dispatch = useDispatch();
  const firstField = useRef();
  const toast = useToast();
  const [amount, setAmount] = useState('');
  const { isOpen: isPaymentModalOpen, onOpen: onPaymentModalOpen, onClose: onPaymentModalClose } = useDisclosure();
  const { isOpen: isReceiptModalOpen, onOpen: onReceiptModalOpen, onClose: onReceiptModalClose } = useDisclosure();

  const carts = useSelector((state) => state.cart.data);
  const token = useSelector((state) => state.user.token);
  const total = carts.reduce((total, item) => total + item.amount * item.quantity, 0);
  const change = amount - total;

  dispatch(addTotal(carts.reduce((total, item) => total + item.quantity, 0)));

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

      // onReceiptModalOpen();
    } catch (error) {
      console.log(error.response.data.message);
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
                      src={product?.image ? `http://localhost:2000/${product?.image}` : 'https://fakeimg.pl/240x240'}
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
                          {product?.price.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                          })}
                        </Text>
                      </Stack>
                      <Stack direction={'row'} mt={8} alignItems={'center'} justifyContent={'end'}>
                        <IconButton
                          onClick={() => {
                            dispatch(removeFromCart({ id: item.id }));
                            toast({
                              title: 'success',
                              description: `${product.name} has been removed from cart`,
                              status: 'success',
                              duration: 1000,
                              position: 'top',
                            });
                          }}
                          variant="filled"
                          size="sm"
                          // w={3}
                          color={'red'}
                          icon={<DeleteIcon />}
                        />
                        <IconButton
                          onClick={() => {
                            if (item.quantity === 1) {
                              dispatch(subtractQuantity({ id: item.id, quantity: 1 }));
                              toast({
                                title: 'success',
                                description: `${product.name} has been removed from cart`,
                                status: 'success',
                                duration: 1000,
                                position: 'top',
                              });
                            } else {
                              dispatch(subtractQuantity({ id: item.id, quantity: 1 }));
                            }
                          }}
                          variant={'outline'}
                          size="sm"
                          icon={<MinusIcon />}
                        />
                        <Text>{item.quantity}</Text>
                        <IconButton
                          isDisabled={item.quantity >= product.total_stock ? true : false}
                          onClick={() => dispatch(addToCart({ id: item.id, quantity: 1 }))}
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
                    {total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
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
                    isDisabled={amount < total || amount === '' ? true : false}
                    onClick={() => onPaymentModalOpen()}
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
      <ModalConfirmPayment
        isPaymentModalOpen={isPaymentModalOpen}
        onPaymentModalClose={onPaymentModalClose}
        handleSubmit={handleSubmit}
      />
      <ModalReceipt
        isReceiptModalOpen={isReceiptModalOpen}
        onReceiptModalClose={onReceiptModalClose}
        products={data}
        carts={carts}
        change={change}
        total={total}
        setAmount={setAmount}
        getProducts={getProducts}
        onClose={onClose}
      />
    </>
  );
};

export default Cart;
