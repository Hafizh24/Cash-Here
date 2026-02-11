import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import SidebarWithHeader from '../components/SidebarWithHeader';
import Category from './Category';
import ListProducts from '../components/product/ListProduct';
import AddProduct from '../components/product/AddProduct';
import { productsApi } from '../api/products';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await productsApi.getAll();

      setProducts(response.data.data);
      setFilteredProduct(response.data.data);
    } catch (err) {
      console.log(err);
      toast({ title: 'Error', description: `Something's wrong`, status: 'error', duration: 4000, position: 'top' });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <SidebarWithHeader />
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
              <AddProduct fetchProducts={fetchProducts} />
            </TabPanel>
            <TabPanel>
              <Category />
            </TabPanel>
            <TabPanel>
              <ListProducts
                setFilteredProduct={setFilteredProduct}
                filteredProduct={filteredProduct}
                products={products}
                fetchProducts={fetchProducts}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}
