import { Flex, Image, SimpleGrid, Skeleton } from '@chakra-ui/react'
import Card from '../../card'
import { useState } from 'react'
import Filter from '../../filter'
import Pagination from '../../pagination'

export default function SeeAllProducts({ productData, setProductData, setIsLoaded, isLoaded, getProducts }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(8)

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = productData.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <>
      <Flex h={'fit-content'} align={'center'} justifyContent={'center'} direction={'column'} alignItems={'center'} gap={5}>
        <Filter setProductData={setProductData} setIsLoaded={setIsLoaded} />
        {productData.length !== 0 ? (
          <>
            <SimpleGrid columns={[1, null, 4]} spacing={8}>
              {currentPosts.map((item) => (
                <>
                  {item.isDeleted !== true && (
                    <>
                      <Skeleton isLoaded={isLoaded} fadeDuration={1}>
                        <Card productData={item} getProducts={getProducts} />
                      </Skeleton>
                    </>
                  )}
                </>
              ))}
            </SimpleGrid>
            <Pagination totalPosts={productData.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
          </>
        ) : (
          <>
            <Image boxSize={'600px'} src={'https://cdn1.iconfinder.com/data/icons/scenarium-silver-vol-8/128/044_error_not_found_page-1024.png'} />
          </>
        )}
      </Flex>
    </>
  )
}
