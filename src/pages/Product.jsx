/* eslint-disable no-unused-vars */
import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SidebarWithHeader from '../components/SidebarWithHeader';
// import SeeAllProducts from './subcomponents/seeAllProducts';
// import AddProduct from './subcomponents/addProduct';
import axios from '../axios';
import Category from './Category';
import ListProducts from '../components/product/ListProduct';
import AddProduct from '../components/product/AddProduct';

export default function Product() {
  const token = localStorage.getItem('token');
  const [productData, setProductData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchAPI = async () => {
    try {
      setIsLoaded(false);
      // const response = await axios.get('products/get-product', {
      //   headers: { Authorization: `Bearer ${token}` },
      // });

      const response = await axios.get('products');

      setProductData(response.data.data);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <SidebarWithHeader></SidebarWithHeader>
      <Flex minH={'100vh'} pt={5} justify={'center'} pl={[null, '14rem']} bgColor={'#f0f0ec'}>
        <Tabs variant="soft-rounded">
          <TabList justifyContent={'center'}>
            <Tab _selected={{ color: 'white', bg: '#3C6255' }} textAlign={'center'}>
              Add product
            </Tab>
            <Tab _selected={{ color: 'white', bg: '#3C6255' }} textAlign={'center'}>
              Manage Category
            </Tab>
            <Tab _selected={{ color: 'white', bg: '#3C6255' }} textAlign={'center'}>
              Manage products
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AddProduct getProducts={fetchAPI} />
            </TabPanel>
            <TabPanel>
              <Category />
            </TabPanel>
            <TabPanel>
              <ListProducts
                productData={productData}
                setProductData={setProductData}
                setIsLoaded={setIsLoaded}
                getProducts={fetchAPI}
                isLoaded={isLoaded}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}
