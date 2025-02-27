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
  Text,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import ModalUpdateCategory from './ModalUpdateCategory';
import ModalDeleteCategory from './ModalDeleteCategory';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const ListCategory = ({ categories, fetchCategories }) => {
  const [clickedData, setClickedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const deleteModal = useDisclosure();
  const updateModal = useDisclosure();

  const openModal = (item, action) => {
    setClickedData(item);
    action();
  };

  return (
    <Stack spacing={8} mx={'auto'} minW={'32vw'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Manage product category</Heading>
      </Stack>
      <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
        {isLoading ? (
          <Stack align={'center'} py={6}>
            <Spinner size={'xl'} color="#3C6255" />
            <Text>Loading...</Text>
          </Stack>
        ) : (
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
                {categories.length > 0 ? (
                  <>
                    {categories.map((item) => (
                      <Tr key={item.id}>
                        <Td textTransform={'capitalize'}>{item.name}</Td>
                        <Td>
                          <Button
                            bgColor={'#3C6255'}
                            color={'white'}
                            onClick={() => openModal(item, updateModal.onOpen)}
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
                            onClick={() => openModal(item, deleteModal.onOpen)}
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
                      Product category data is empty
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <ModalUpdateCategory
        isOpen={updateModal.isOpen}
        onClose={updateModal.onClose}
        fetchCategories={fetchCategories}
        clickedData={clickedData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      <ModalDeleteCategory
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        clickedData={clickedData}
        fetchCategories={fetchCategories}
        setIsLoading={setIsLoading}
      />
    </Stack>
  );
};

export default ListCategory;
