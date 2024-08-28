import { Box, Button, Flex, FormControl, FormLabel, Input, Select, SimpleGrid, Text, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CurrencyInput from 'react-currency-input-field'
import { useEffect, useState } from 'react'
import instance from '../../../api/axios'

function AddProduct({ getProducts }) {
  const token = localStorage.getItem('token')
  const toast = useToast()
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)

  const AddProductSchema = Yup.object().shape({
    name: Yup.string().required("Product name can't be empty"),
    category: Yup.string().required("Category can't be empty"),
    price: Yup.number().required("Price can't be empty").positive("Can't be negative").integer(),
    total_stock: Yup.number().required("Stock can't be empty").positive("Can't be negative").integer(),
    description: Yup.string().required("Description can't be empty"),
    image: Yup.mixed().required('Image is required')
  })

  const getCategory = async () => {
    try {
      const response = await instance.get('categories/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCategory(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (data) => {
    try {
      setLoading(true)
      await instance.post('products/add-product', data, {
        headers: { Authorization: `Bearer ${token}` }
      }) //sending data to database
      toast({ title: 'Success', description: `${data.get('name')} has been created`, status: 'success', duration: 3000, position: 'top' })
      getProducts()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast({ title: 'Error', description: `${err.response.data.message}`, status: 'error', duration: 3000, position: 'top' })
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      category: category[0]?.id,
      price: null,
      total_stock: null,
      image: null,
      description: ''
    },
    validationSchema: AddProductSchema,
    onSubmit: (values, action) => {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('category', values.category)
      formData.append('price', values.price)
      formData.append('total_stock', values.total_stock)
      formData.append('description', values.description)
      formData.append('image', values.image)
      handleSubmit(formData)
      action.resetForm()
    }
  })

  useEffect(() => {
    getCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Flex minH={'80vh'} align={'center'} justifyContent={'center'} direction={'column'} gap={5}>
          <SimpleGrid columns={[1, null, 2]} spacing={10}>
            <Box height="auto" p={7} rounded={'lg'} bgColor={'white'} shadow={'lg'}>
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  type="text"
                  focusBorderColor="#3C6255"
                  _hover={{}}
                  autoComplete="new"
                  shadow={'md'}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  placeholder="Insert product name"
                />
                {formik.touched.name && formik.errors.name ? (
                  <Text mt={2} style={{ color: 'red' }}>
                    {formik.errors.name}
                  </Text>
                ) : null}
              </FormControl>
            </Box>
            <Box height="auto" p={7} rounded={'lg'} bgColor={'white'} shadow={'lg'}>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  defaultValue={category[0]?.id}
                  name="category"
                  _hover={{}}
                  shadow={'md'}
                  textTransform={'capitalize'}
                  value={formik.setFieldValue.category}
                  onChange={(e) => {
                    formik.setFieldValue('category', parseInt(e.target.value))
                  }}
                  error={formik.touched.category && Boolean(formik.errors.category)}>
                  {category.map((item) => (
                    <>
                      <option value={item.id}>{item.name}</option>
                    </>
                  ))}
                </Select>
                {formik.touched.category && formik.errors.category ? (
                  <Text mt={2} style={{ color: 'red' }}>
                    {formik.errors.category}
                  </Text>
                ) : null}
              </FormControl>
            </Box>
            <Box height="auto" p={7} rounded={'lg'} bgColor={'white'} shadow={'lg'}>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  name="price"
                  as={CurrencyInput}
                  defaultValue={formik.values.price}
                  intlConfig={{ locale: 'id-ID', currency: 'IDR' }}
                  shadow={'md'}
                  onValueChange={(value, name) => {
                    formik.setFieldValue('price', parseInt(value))
                  }}
                  autoComplete="new"
                  _hover={{}}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  placeholder="Insert product price"
                />
                {formik.touched.price && formik.errors.price ? (
                  <Text mt={2} style={{ color: 'red' }}>
                    {formik.errors.price}
                  </Text>
                ) : null}
              </FormControl>
            </Box>
            <Box height="auto" p={7} rounded={'lg'} bgColor={'white'} shadow={'lg'}>
              <FormControl>
                <FormLabel>Total stock</FormLabel>
                <Input
                  name="total_stock"
                  value={formik.values.total_stock}
                  onChange={formik.handleChange}
                  shadow={'md'}
                  type="number"
                  autoComplete="new"
                  error={formik.touched.total_stock && Boolean(formik.errors.total_stock)}
                  placeholder="Insert product stock"
                  _hover={{}}
                />
                {formik.touched.total_stock && formik.errors.total_stock ? (
                  <Text mt={2} style={{ color: 'red' }}>
                    {formik.errors.total_stock}
                  </Text>
                ) : null}
              </FormControl>
            </Box>
            <Box height="auto" p={7} rounded={'lg'} bgColor={'white'} shadow={'lg'}>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  name="image"
                  type="file"
                  onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])}
                  _hover={{}}
                  shadow={'md'}
                  autoComplete="new"
                  error={formik.touched.image && Boolean(formik.errors.image)}
                />
                {formik.touched.image && formik.errors.image ? (
                  <Text mt={2} style={{ color: 'red' }}>
                    {formik.errors.image}
                  </Text>
                ) : null}
              </FormControl>
            </Box>
            <Box height="auto" p={7} rounded={'lg'} bgColor={'white'} shadow={'lg'}>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  _hover={{}}
                  shadow={'md'}
                  type="text"
                  autoComplete="new"
                  placeholder="Insert product description"
                  error={formik.touched.description && Boolean(formik.errors.description)}
                />
                {formik.touched.description && formik.errors.description ? (
                  <Text mt={2} style={{ color: 'red' }}>
                    {formik.errors.description}
                  </Text>
                ) : null}
              </FormControl>
            </Box>
          </SimpleGrid>
          <Button type="submit" bgColor={'#3C6255'} color={'white'} _hover={{}} isLoading={loading} loadingText={'loading'}>
            Create
          </Button>
        </Flex>
      </form>
    </>
  )
}

export default AddProduct
