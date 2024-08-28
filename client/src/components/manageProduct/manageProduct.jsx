import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import SidebarWithHeader from '../sidebar'
import SeeAllProducts from './subcomponents/seeAllProducts'
import AddProduct from './subcomponents/addProduct'
import ManageCategory from '../category/manageCategory'
import instance from '../../api/axios'

export default function ManageProduct() {
  const token = localStorage.getItem('token')
  const [productData, setProductData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const getProducts = async () => {
    try {
      setIsLoaded(false)
      const response = await instance.get('products/get-product', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProductData(response.data.dataProduct)
      setIsLoaded(true)
    } catch (err) {
      console.log(err)
      setIsLoaded(false)
    }
  }

  useEffect(() => {
    getProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SidebarWithHeader></SidebarWithHeader>
      <Flex minH={'200vh'} pt={5} justify={'center'} pl={[null, '14rem']} bgColor={'#f0f0ec'}>
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
          <TabPanels h={'80vh'}>
            <TabPanel>
              <AddProduct getProducts={getProducts} />
            </TabPanel>
            <TabPanel>
              <ManageCategory />
            </TabPanel>
            <TabPanel>
              <SeeAllProducts productData={productData} setProductData={setProductData} setIsLoaded={setIsLoaded} getProducts={getProducts} isLoaded={isLoaded} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  )
}
