import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  useToast,
  Input,
  Text,
  Switch,
  HStack,
  Select
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import instance from '../../../api/axios'

function ModalUpdateProduct({ isOpenUpdate, onCloseUpdate, productData, getProducts }) {
  const toast = useToast()
  const token = localStorage.getItem('token')
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const [toggle, setToggle] = useState(productData.isActive)
  const [toggleText, setToggleText] = useState('Set this product status')

  const handleSwitchChange = () => {
    setToggle(!toggle)
    setToggleText(`This product will be set to ${toggle === true ? 'inactive' : 'active'}`)
  }

  const handleSubmit = async (data) => {
    try {
      setLoading(true)
      await instance.patch('products/update-product', data, {
        headers: { Authorization: `Bearer ${token}` }
      }) //sending data to database
      setLoading(false)
      getProducts()
      toast({ title: 'Success', description: `Data updated`, status: 'success', duration: 4000, position: 'top' })
      onCloseUpdate()
    } catch (err) {
      console.log(err.response.data.message)
      toast({ title: 'Error', description: `Something's wrong`, status: 'error', duration: 4000, position: 'top' })
      setLoading(false)
    }
  }

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

  const handleCancel = () => {
    setToggleText('Set this product status')
    onCloseUpdate()
  }

  useEffect(() => {
    getCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formik = useFormik({
    initialValues: {
      id: productData?.id,
      name: '',
      price: '',
      image: '',
      category: productData.CategoryId,
      description: '',
      total_stock: '',
      isActive: productData.isActive
    },
    onSubmit: (values, action) => {
      console.log(values.category)
      const formData = new FormData()
      formData.append('id', values.id)
      formData.append('name', values.name)
      formData.append('CategoryId', values.category)
      formData.append('price', values.price)
      formData.append('total_stock', values.total_stock)
      formData.append('description', values.description)
      formData.append('image', values.image)
      values.isActive = toggle === true ? true : false
      formData.append('isActive', values.isActive)
      handleSubmit(formData)
      action.resetForm()
    }
  })

  return (
    <>
      <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{productData?.name}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody pb={8}>
              <FormControl mt={3}>
                <FormLabel>Product Name</FormLabel>
                <Input
                  name="name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  autoComplete="new"
                  border={'1px'}
                  placeholder={productData?.name}></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  defaultValue={productData.CategoryId}
                  name="category"
                  textTransform={'capitalize'}
                  value={formik.setFieldValue.category}
                  onChange={(e) => {
                    formik.setFieldValue('category', parseInt(e.target.value))
                  }}
                  border={'1px'}>
                  {category.map((item) => (
                    <>
                      <option value={item.id}>{item.name}</option>
                    </>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>Price</FormLabel>
                <Input
                  name="price"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  autoComplete="new"
                  border={'1px'}
                  placeholder={productData?.price}></Input>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  type="text"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  autoComplete="new"
                  border={'1px'}
                  placeholder={productData?.description}></Input>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>Total Stock</FormLabel>
                <Input
                  name="total_stock"
                  type="number"
                  value={formik.values.total_stock}
                  onChange={formik.handleChange}
                  autoComplete="new"
                  border={'1px'}
                  placeholder={productData?.total_stock}></Input>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>Change image</FormLabel>
                <Input name="image" type="file" onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])} autoComplete="new" border={'1px'}></Input>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>
                  {productData?.isActive === true ? (
                    <>
                      <Text>
                        This product is currently <span style={{ color: 'green' }}>Active</span>
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text>
                        This product is currently <span style={{ color: 'red' }}>Inactive</span>
                      </Text>
                    </>
                  )}
                </FormLabel>
                <HStack border={'1px'} p={5} rounded={'md'}>
                  <Switch
                    colorScheme="green"
                    size={'lg'}
                    id="productStatus"
                    isChecked={toggle}
                    onChange={() => {
                      handleSwitchChange()
                    }}></Switch>
                  <Text>{toggleText}</Text>
                </HStack>
                {/* {productData?.isActive === true? <><Button colorScheme='red'>Disable this product</Button></> : <><Button colorScheme='green'>Enable this product</Button></>} */}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                isLoading={loading}
                loadingText="Updating"
                bg={'#3C6255'}
                color={'white'}
                colorScheme="blue"
                mr={3}
                _hover={{ bg: '#61876E' }}
                rounded={'full'}>
                Update
              </Button>
              <Button onClick={handleCancel} rounded={'full'}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalUpdateProduct
