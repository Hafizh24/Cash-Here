import { Button, Flex } from '@chakra-ui/react'
import React from 'react'

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  let pages = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i)
  }

  return (
    <Flex direction={'row'} gap={3} mb={68}>
      {pages.map((page, index) => {
        return (
          <Button
            bgColor={'#3C6255'}
            _hover={{ bg: '#61876E' }}
            color={'white'}
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? 'active' : ''}>
            {page}
          </Button>
        )
      })}
    </Flex>
  )
}

export default Pagination
