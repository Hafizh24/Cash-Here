import { Flex, Heading, SimpleGrid, Skeleton, Spinner, useDisclosure } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import Cart from '../components/Cart';
import SidebarWithHeader from '../components/SidebarWithHeader';
import Card from '../components/Card';
import { productsApi } from '../api/products';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredProduct.slice(indexOfFirstPost, indexOfLastPost);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await productsApi.getAll();

      setProducts(response.data.data);
      setFilteredProduct(response.data.data);
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <SidebarWithHeader onOpening={onOpen} />
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
          setIsLoaded={setIsLoading}
          products={products}
          setFilteredProduct={setFilteredProduct}
          setCurrentPage={setCurrentPage}
        />
        {isLoading && <Spinner mt={'40vh'} mb={'35vh'} size={'xl'} />}

        {currentPosts.length > 0 ? (
          <>
            <SimpleGrid columns={[1, null, 4]} spacing={8} mb={55}>
              {currentPosts?.map((item) => (
                <React.Fragment key={item.id}>
                  <Skeleton isLoaded={!isLoading} fadeDuration={1}>
                    <Card products={item} fetchProducts={fetchProducts} />
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
            <Cart onClose={onClose} isOpen={isOpen} data={products} />
          </>
        ) : (
          <Heading size={'xl'} mt={'40vh'} mb={'35vh'} height={'max-content'}>
            Data is empty
          </Heading>
        )}
      </Flex>
    </>
  );
}
