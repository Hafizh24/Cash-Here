import { Box, Button, Flex, Input, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import ReportSidebar from '../components/reports/sidebar'
import { useState } from 'react'
import { saveAs } from 'file-saver'
import Papa from 'papaparse'
import instance from '../api/axios'

export default function SalesbyDateRange() {
  const token = localStorage.getItem('token')
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [salesData, setSalesData] = useState([])

  const handleSubmit = async () => {
    try {
      const response = await instance.post(
        `transaction-details/date-range`,
        { startdate: startDate, enddate: endDate },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setSalesData(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const csvData = salesData.map((item) => ({
    'Transaction Id': item.id,
    Date: item.createdAt,
    Qty: item.quantity,
    'Product Name': item.Product?.name,
    Cashier: item.Transaction?.User?.username
  }))

  const handleDownloadCSV = () => {
    saveAs(new Blob([Papa.unparse(csvData)], { type: 'text/csv;charset=utf-8' }), 'sales_data.csv')
  }

  return (
    <>
      <ReportSidebar />
      <Flex pl={[null, '15rem']} justifyContent={'center'} direction={'column'} gap={5} minH={'60vh'}>
        <Stack spacing={5} p={5}>
          <Flex justifyContent={'center'}>
            <Box ml={'50px'}>
              <Input
                type="date"
                onChange={(e) => {
                  setStartDate(e.target.value)
                }}
              />
            </Box>
            <Box ml={'20px'}>
              <Input
                type="date"
                onChange={(e) => {
                  setEndDate(e.target.value)
                }}
              />
            </Box>
            <Button bgColor={'#3C6255'} _hover={{ bg: '#61876E' }} color={'white'} ml={'50px'} onClick={handleSubmit}>
              {' '}
              Select Date{' '}
            </Button>
          </Flex>
          <Flex p={9} justifyContent={'center'} direction={'column'} gap={'5'}>
            <TableContainer>
              <Table variant="striped" colorScheme="teal" border={'1px'} size={['xs', 'md']}>
                <TableCaption>Product Sales</TableCaption>
                <Thead>
                  <Tr>
                    <Th fontSize={['xs']}>Transaction Id</Th>
                    <Th fontSize={['xs']}>Date</Th>
                    <Th fontSize={['xs']}>Qty</Th>
                    <Th fontSize={['xs']}> Product Name</Th>
                    <Th fontSize={['xs']}> Cashier</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {salesData.length > 0 ? (
                    <>
                      {salesData.map((item, index) => (
                        <Tr key={index}>
                          <Td>{item.id}</Td>
                          <Td>{item.createdAt}</Td>
                          <Td>{item.quantity}</Td>
                          <Td>{item.Product?.name}</Td>
                          <Td>{item.Transaction?.User?.username}</Td>
                        </Tr>
                      ))}
                    </>
                  ) : (
                    <Tr>
                      <Td colSpan={3} textAlign={'center'}>
                        Sales data is empty
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
            <Button bgColor={'#3C6255'} _hover={{ bg: '#61876E' }} color={'white'} onClick={handleDownloadCSV}>
              Download .csv
            </Button>
          </Flex>
        </Stack>
      </Flex>
    </>
  )
}
