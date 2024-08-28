import {
  Box,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useDisclosure,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
  Text
} from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, WarningIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import ModalUpdateCategory from './modalUpdateCategory'
import instance from '../../api/axios'

const UpdateCategory = ({ data, getData }) => {
  const [clickedData, setClickedData] = useState([])
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure()
  const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure()
  const toast = useToast()
  const token = localStorage.getItem('token')

  const handleModalDelete = (item) => {
    setClickedData(item)
    onDeleteModalOpen()
  }
  const handleModalEdit = (item) => {
    setClickedData(item)
    onOpenUpdate()
  }

  const handleDelete = async (id) => {
    try {
      await instance.patch(`categories/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      getData()

      toast({
        title: 'Success',
        description: 'Selected category has been deleted',
        status: 'success',
        duration: 3000,
        position: 'top'
      })
    } catch (err) {
      console.log(err)
      toast({
        title: 'Error',
        description: "Selected category can't be deleted",
        status: 'error',
        duration: 3000,
        position: 'top'
      })
    }
  }

  return (
    <>
      <Stack spacing={8} mx={'auto'} minW={'32vw'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Manage product category</Heading>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <TableContainer>
            <Table variant="simple" size={['xs', 'md']}>
              <TableCaption>All product categories</TableCaption>
              <Thead>
                <Tr>
                  <Th fontSize={['xs']}>Name</Th>
                  <Th fontSize={['xs']}>Edit</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.length > 0 ? (
                  <>
                    {data.map((item) => (
                      <Tr key={item.id}>
                        <Td textTransform={'capitalize'}>{item.name}</Td>
                        <Td>
                          <Button
                            bgColor={'#3C6255'}
                            color={'white'}
                            onClick={() => {
                              handleModalEdit(item)
                            }}
                            ml={'8px'}
                            _hover={{ bg: '#61876E' }}
                            size={['sm', 'md']}>
                            <EditIcon />
                          </Button>
                          <Button
                            colorScheme="red"
                            color={'white'}
                            ml={'8px'}
                            onClick={() => {
                              handleModalDelete(item)
                            }}
                            size={['sm', 'md']}>
                            <DeleteIcon />
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </>
                ) : (
                  <Tr>
                    <Td colSpan={3} textAlign={'center'}>
                      Product category data is empty
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <ModalUpdateCategory isOpenUpdate={isOpenUpdate} onCloseUpdate={onCloseUpdate} data={data} getData={getData} clickedData={clickedData} />

        <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Are you sure? <WarningIcon color={'red'} />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                All data related to <span style={{ color: 'red' }}>{clickedData.name}</span> will be deleted.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onDeleteModalClose}>
                Cancel
              </Button>
              <Button
                variant="ghost"
                colorScheme="red"
                onClick={() => {
                  handleDelete(clickedData?.id)
                  onDeleteModalClose()
                }}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>
    </>
  )
}

export default UpdateCategory
