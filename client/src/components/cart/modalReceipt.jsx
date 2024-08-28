import { Button, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, ModalFooter, Stack, Text, HStack } from '@chakra-ui/react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import ReactToPrint from 'react-to-print'
import { clearCart } from '../../redux/cartSlice'

const ModalReceipt = ({ products, carts, change, total, onReceiptModalClose, isReceiptModalOpen, setAmount, getProducts, onClose }) => {
  const dispatch = useDispatch()
  const ref = useRef()

  const handleClose = () => {
    onReceiptModalClose()
    dispatch(clearCart())
    setAmount('')
  }

  return (
    <>
      <Modal onClose={onReceiptModalClose} isOpen={isReceiptModalOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Stack ref={ref}>
            <ModalHeader>Invoice Cash Here</ModalHeader>
            <ModalBody borderTopWidth={'1px'}>
              <Stack mt={4} mb={4}>
                {carts.map((item) => {
                  const product = products.find((product) => product.id === item.id)
                  return (
                    <HStack key={item.id} justifyContent={'space-between'} spacing={1}>
                      <Text>{product?.name}</Text>
                      <Text>{item.quantity}x</Text>
                      <Text>
                        {product?.price.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0
                        })}
                      </Text>
                    </HStack>
                  )
                })}
              </Stack>
              <Stack spacing={1} borderTopWidth={'1px'}>
                <HStack justifyContent={'space-between'} mt={8}>
                  <Text>Total Price</Text>
                  <Text>
                    {total.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    })}
                  </Text>
                </HStack>
                <HStack justifyContent={'space-between'}>
                  <Text>Change </Text>
                  <Text>
                    {change.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    })}
                  </Text>
                </HStack>
              </Stack>
              <Stack borderTopWidth={'1px'} mt={4} textAlign={'center'}>
                <Text tex mt={8}>
                  Thank You For Shopping With Us
                </Text>
              </Stack>
            </ModalBody>
          </Stack>
          <ModalFooter>
            <HStack direction={'row'} spacing={8} mt={4} mb={2} justifyContent={'center'} w={'full'}>
              <ReactToPrint
                bodyClass="print-agreement"
                content={() => ref.current}
                trigger={() => (
                  <Button bgColor={'first'} color={'white'} ml={'8px'} _hover={{ bg: 'third' }} size={['sm', 'md']}>
                    Print
                  </Button>
                )}
              />
              <Button bgColor={'navy'} color="white" ml={'8px'} _hover={{ bg: 'skyblue' }} onClick={handleClose} size={['sm', 'md']}>
                Close
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalReceipt
