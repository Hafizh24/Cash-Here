import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import AddCategory from './addCategory'
import UpdateCategory from './updateCategory'
import instance from '../../api/axios'

const ManageCategory = () => {
  const [data, setData] = useState([])
  const token = localStorage.getItem('token')

  const fetchAPI = async () => {
    try {
      const response = await instance.get('categories', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // console.log(response.data);
      setData(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Flex minH={'100vh'} minW={'50vw'} align={'center'} justify={'center'} bgColor={'#f0f0ec'} direction={'column'}>
        <AddCategory getData={fetchAPI} />
        <UpdateCategory data={data} getData={fetchAPI} />
      </Flex>
    </>
  )
}

export default ManageCategory
