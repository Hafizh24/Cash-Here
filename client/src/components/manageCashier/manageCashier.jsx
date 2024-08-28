import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import AddCashier from './subcomponents/addCashier'
import UpdateCashier from './subcomponents/updateCashier'
import { useEffect, useState } from 'react'
import SidebarWithHeader from '../sidebar'
import instance from '../../api/axios'

export default function ManagerCashier() {
  const [cashierData, setCashierData] = useState([])
  const token = localStorage.getItem('token')

  const getCashierData = async () => {
    try {
      const response = await instance.get('users/get-user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCashierData(response.data.dataCashier)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getCashierData()
  }, [])

  return (
    <>
      <SidebarWithHeader></SidebarWithHeader>
      <Flex minH={'90vh'} minW={'100vw'} align={'center'} justify={'center'} pl={[null, '14rem']} bgColor={'#f0f0ec'}>
        <Tabs variant="soft-rounded">
          <TabList justifyContent={'center'}>
            <Tab _selected={{ color: 'white', bg: '#3C6255' }} textAlign={'center'}>
              Register a new cashier
            </Tab>
            <Tab _selected={{ color: 'white', bg: '#3C6255' }} textAlign={'center'}>
              Manage cashier
            </Tab>
          </TabList>
          <TabPanels h={'80vh'}>
            <TabPanel>
              <AddCashier getCashierData={getCashierData}></AddCashier>
            </TabPanel>
            <TabPanel>
              <UpdateCashier cashierData={cashierData} getCashierData={getCashierData}></UpdateCashier>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  )
}
