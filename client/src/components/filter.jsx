import { Search2Icon } from '@chakra-ui/icons'
import { Button, Input, Select, Stack } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'

import instance from '../api/axios'

export default function Filter({ setProductData, setIsLoaded }) {
  const token = localStorage.getItem('token')
  const [orderBy, setOrderBy] = useState('ByName')
  const [category, setCategory] = useState([])

  const getCategory = async () => {
    try {
      const response = await instance.get('categories/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCategory(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSearch = async (keyword) => {
    try {
      setIsLoaded(false)
      const response = await instance.get(`products/get-product-filter?${keyword}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProductData(response.data.dataProduct)
      setIsLoaded(true)
    } catch (err) {
      console.log(err)
      setIsLoaded(false)
    }
  }

  useEffect(() => {
    getCategory()
  }, [])

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      sort_alphabetical: 'ASC',
      sort_price: 'ASC'
    },
    onSubmit: (values, action) => {
      console.log(values)
      const params = new URLSearchParams()
      if (values.name !== '') {
        params.append('name', values.name)
      }
      if (values.category !== '') {
        params.append('category', values.category)
      }

      if (orderBy === 'ByName') {
        params.append('sort_alphabetical', values.sort_alphabetical)
        params.delete('sort_price')
      }

      if (orderBy === 'ByPrice') {
        params.append('sort_price', values.sort_price)
        params.delete('sort_alphabetical')
      }

      let queryString = params.toString()
      queryString = queryString.replace(/\+/g, '%')
      handleSearch(queryString)
      // action.resetForm();
    }
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack w={['70vw', '50vw']} direction={['column', 'row']} spacing={5}>
        <Input
          rounded={'full'}
          name="name"
          type="text"
          placeholder="Search by name"
          value={formik.values.name}
          onChange={formik.handleChange}
          autoComplete="new"
          mb={4}
          focusBorderColor="#3C6255"
          _hover={{}}
          border={'1px'}
        />
        <Select
          rounded={'full'}
          border={'1px'}
          name="category"
          value={formik.setFieldValue.category}
          onChange={(e) => {
            formik.setFieldValue('category', parseInt(e.target.value))
          }}
          focusBorderColor="#3C6255"
          _hover={{}}
          defaultValue={''}>
          <option value="" disabled hidden>
            Select category
          </option>
          {category.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </Select>
        <Select
          rounded={'full'}
          border={'1px'}
          onChange={(e) => {
            setOrderBy(e.target.value)
          }}
          value={orderBy}
          focusBorderColor="#3C6255"
          _hover={{}}>
          <option value={'ByName'}>Sort by name</option>
          <option value={'ByPrice'}>Sort by price</option>
        </Select>
        {orderBy === 'ByName' ? (
          <>
            <Select
              rounded={'full'}
              name="sort_alphabetical"
              value={formik.values.sort_alphabetical}
              onChange={(e) => {
                formik.setFieldValue('sort_alphabetical', e.target.value)
              }}
              defaultValue={''}
              focusBorderColor="#3C6255"
              _hover={{}}
              border={'1px'}>
              <option value="ASC">A-Z</option>
              <option value="DESC">Z-A</option>
            </Select>
          </>
        ) : (
          <>
            <Select
              rounded={'full'}
              name="sort_price"
              value={formik.values.sort_price}
              onChange={(e) => {
                formik.setFieldValue('sort_price', e.target.value)
              }}
              defaultValue={''}
              focusBorderColor="#3C6255"
              _hover={{}}
              border={'1px'}>
              <option value="ASC">Price: Low to High</option>
              <option value="DESC">Price: High to Low</option>
            </Select>
          </>
        )}
        <Button rounded={'full'} type="submit" bgColor={'#3C6255'} _hover={{ bg: '#61876E' }} color={'white'}>
          {' '}
          <Search2Icon />
        </Button>
      </Stack>
    </form>
  )
}
