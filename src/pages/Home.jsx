import { Flex, Heading, SimpleGrid, Skeleton, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import Cart from '../components/Cart';
import SidebarWithHeader from '../components/SidebarWithHeader';
import Card from '../components/Card';

export default function Home() {
  const [apiProduct, setApiProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // const token = localStorage.getItem('token');

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredProduct.slice(indexOfFirstPost, indexOfLastPost);

  const getProducts = async () => {
    try {
      setIsLoaded(false);
      // const response = await axios.get('products/get-product', {
      //   headers: { Authorization: `Bearer ${token}` },
      // });

      const response = await axios.get('products');

      setApiProduct(response.data.data);
      setFilteredProduct(response.data.data);
      setIsLoaded(true);
    } catch (err) {
      console.log(err.response.data.message);
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <SidebarWithHeader onOpening={onOpen}></SidebarWithHeader>
      <Flex
        pl={[null, '14rem']}
        bgColor={'#f0f0ec'}
        align={'center'}
        justifyContent={'center'}
        direction={'column'}
        pt={5}
        gap={5}
      >
        <Filter
          setIsLoaded={setIsLoaded}
          apiProduct={apiProduct}
          setFilteredProduct={setFilteredProduct}
          setCurrentPage={setCurrentPage}
        />
        {currentPosts.length > 0 ? (
          <>
            <SimpleGrid columns={[1, null, 4]} spacing={8} mb={55}>
              {currentPosts?.map((item) => (
                <React.Fragment key={item.id}>
                  <Skeleton isLoaded={isLoaded} fadeDuration={1}>
                    <Card productData={item} getProducts={getProducts} />
                  </Skeleton>
                </React.Fragment>
              ))}
            </SimpleGrid>
            <Pagination
              totalPosts={filteredProduct.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
            <Cart onClose={onClose} isOpen={isOpen} data={apiProduct} getProducts={getProducts} />
          </>
        ) : (
          <>
            <Heading size={'xl'} mt={'40vh'} mb={'35vh'} height={'max-content'}>
              Data is empty
            </Heading>
          </>
        )}
      </Flex>
      {/* <Heading size={'xl'} mt={'40vh'} mb={'43vh'}>
          Data is empty
        </Heading> */}
    </>
  );
}
