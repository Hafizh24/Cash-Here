import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import AddCashier from '../components/cashier/AddCashier';
import SidebarWithHeader from '../components/SidebarWithHeader';
import ListCashier from '../components/cashier/ListCashier';
import { cashiersApi } from '../api/cashier';

export default function Cashier() {
  const [cashiers, setCashiers] = useState([]);
  const toast = useToast();

  const fetchCashier = useCallback(async () => {
    try {
      const response = await cashiersApi.getAll();
      setCashiers(response.data.data);
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response.data.message,
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchCashier();
  }, [fetchCashier]);

  return (
    <>
      <SidebarWithHeader />
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
              <AddCashier fetchCashier={fetchCashier} />
            </TabPanel>
            <TabPanel>
              <ListCashier cashiers={cashiers} fetchCashier={fetchCashier} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}
