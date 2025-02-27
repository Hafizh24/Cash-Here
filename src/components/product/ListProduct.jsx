/* eslint-disable react/prop-types */
import { Flex, Image, SimpleGrid, Skeleton } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import Filter from '../Filter';
import Pagination from '../Pagination';
import Card from '../Card';

export default function ListProducts({ products, isLoading, fetchProducts, filteredProduct, setFilteredProduct }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const currentPost = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return filteredProduct.slice(indexOfFirstPost, indexOfLastPost);
  }, [filteredProduct, currentPage]);

  return (
    <Flex
      h={'fit-content'}
      align={'center'}
      justifyContent={'center'}
      direction={'column'}
      alignItems={'center'}
      gap={5}
    >
      <Filter products={products} setFilteredProduct={setFilteredProduct} setCurrentPage={setCurrentPage} />

      {currentPost.length > 0 ? (
        <>
          <SimpleGrid columns={[1, null, 4]} spacing={8}>
            {currentPost.map((item, index) => (
              <React.Fragment key={index}>
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
        </>
      ) : (
        <Image
          boxSize={'600px'}
          src={'https://cdn1.iconfinder.com/data/icons/scenarium-silver-vol-8/128/044_error_not_found_page-1024.png'}
        />
      )}
    </Flex>
  );
}
