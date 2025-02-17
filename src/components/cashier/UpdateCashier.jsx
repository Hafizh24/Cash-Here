/* eslint-disable react/prop-types */
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
} from '@chakra-ui/react';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
// import ModalUpdate from './modalUpdate';
import ModalDelete from './ModalDelete';
import ModalUpdate from './ModalUpdate';

export default function UpdateCashier({ cashierData, getCashierData }) {
  const [clickedData, setClickedData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  //   const token = localStorage.getItem('token');

  const handleEdit = (item) => {
    setClickedData(item);
    onOpen();
  };

  const handleModalDelete = (item) => {
    setClickedData(item);
    onDeleteModalOpen();
  };

  return (
    <Stack spacing={8} mx={'auto'} minW={'32vw'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Manage cashier</Heading>
      </Stack>
      <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
        <TableContainer>
          <Table variant="simple" size={['xs', 'md']}>
            <TableCaption>All cashiers</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={['xs']}>Username</Th>
                <Th fontSize={['xs']}>Email</Th>
                <Th fontSize={['xs']}>Verified</Th>
                <Th fontSize={['xs']}>Status</Th>
                <Th fontSize={['xs']}>Edit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cashierData.length > 0 ? (
                <>
                  {cashierData.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item.username}</Td>
                      <Td>{item.email}</Td>
                      <Td>
                        {item.is_verified === false ? (
                          <span style={{ color: 'red', fontWeight: 'bold' }}>Not Verified</span>
                        ) : (
                          <span style={{ color: 'green', fontWeight: 'bold' }}>Verified</span>
                        )}
                      </Td>
                      <Td>
                        {item.is_enabled === false ? (
                          <span style={{ color: 'red', fontWeight: 'bold' }}>Disabled</span>
                        ) : (
                          <span style={{ color: 'green', fontWeight: 'bold' }}>Enabled</span>
                        )}
                      </Td>
                      <Td>
                        <Button
                          bgColor={'#3C6255'}
                          color={'white'}
                          onClick={() => {
                            handleEdit(item);
                          }}
                          ml={'8px'}
                          _hover={{ bg: '#61876E' }}
                          size={['sm', 'md']}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          colorScheme="red"
                          color={'white'}
                          ml={'8px'}
                          onClick={() => handleModalDelete(item)}
                          size={['sm', 'md']}
                        >
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </>
              ) : (
                <Tr>
                  <Td colSpan={3} textAlign={'center'}>
                    Cashier data is empty
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <ModalUpdate isOpen={isOpen} onClose={onClose} clickedData={clickedData} getCashierData={getCashierData} />

      <ModalDelete
        clickedData={clickedData}
        getCashierData={getCashierData}
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
      />
    </Stack>
  );
}
