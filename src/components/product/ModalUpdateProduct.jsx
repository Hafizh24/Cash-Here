/* eslint-disable react/prop-types */
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
  Select,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import axios from '../../axios';

function ModalUpdateProduct({ isOpenUpdate, onCloseUpdate, productData, getProducts }) {
  const toast = useToast();
  // const token = localStorage.getItem('token');
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [toggle, setToggle] = useState(productData.is_active);
  // const [toggleText, setToggleText] = useState('Set this product status');

  // const handleSwitchChange = () => {
  //   setToggle(!toggle);
  //   setToggleText(`This product will be set to ${toggle === true ? 'inactive' : 'active'}`);
  // };

  const handleSubmit = async (data) => {
    try {
      // console.log(data, 'data');

      setLoading(true);
      // await axios.patch('products/update-product', data, {
      //   headers: { Authorization: `Bearer ${token}` },
      // }); //sending data to database
      await axios.patch(`products/${productData?.id}`, data);

      setLoading(false);
      getProducts();
      toast({ title: 'Success', description: `Data updated`, status: 'success', duration: 4000, position: 'top' });
      onCloseUpdate();
    } catch (err) {
      console.log(err.response.data.message);
      toast({ title: 'Error', description: `Something's wrong`, status: 'error', duration: 4000, position: 'top' });
      setLoading(false);
    }
  };

  const getCategory = async () => {
    try {
      // const response = await instance.get('categories/', {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      const response = await axios.get('categories/');
      setCategory(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    // setToggleText('Set this product status');
    onCloseUpdate();
  };

  useEffect(() => {
    getCategory();
  }, []);

  const formik = useFormik({
    initialValues: {
      // id: productData?.id,
      name: productData?.name,
      price: productData?.price,
      image: '',
      category: productData.category_id,
      description: productData?.description,
      total_stock: productData?.total_stock,
      isActive: productData.is_active,
    },
    onSubmit: (values, action) => {
      console.log(values.category);

      const formData = new FormData();
      // formData.append('id', values.id);
      formData.append('name', values.name);
      formData.append('category_id', values.category);
      formData.append('price', values.price);
      formData.append('total_stock', values.total_stock);
      formData.append('description', values.description);
      formData.append('image', values.image);
      // values.isActive = toggle === true ? true : false;
      formData.append('is_active', values.isActive ? 1 : 0);
      handleSubmit(formData);
      action.resetForm();
    },
  });

  return (
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
                defaultValue={productData?.name}
                value={formik.values.name}
                onChange={formik.handleChange}
                border={'1px'}
                placeholder={productData?.name}
              ></Input>
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                defaultValue={productData.category_id}
                name="category"
                textTransform={'capitalize'}
                value={formik.values.category}
                // onChange={(e) => {
                //   formik.setFieldValue('category', parseInt(e.target.value));
                // }}
                onChange={formik.handleChange}
                border={'1px'}
              >
                {category?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Price</FormLabel>
              <Input
                name="price"
                type="number"
                defaultValue={productData?.price}
                value={formik.values.price}
                onChange={formik.handleChange}
                border={'1px'}
                placeholder={productData?.price}
              />
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                type="text"
                defaultValue={productData?.description}
                value={formik.values.description}
                onChange={formik.handleChange}
                border={'1px'}
                placeholder={productData?.description}
              />
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Total Stock</FormLabel>
              <Input
                name="total_stock"
                type="number"
                defaultValue={productData?.total_stock}
                value={formik.values.total_stock}
                onChange={formik.handleChange}
                border={'1px'}
                placeholder={productData?.total_stock}
              />
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Change image</FormLabel>
              <Input
                name="image"
                type="file"
                onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])}
                border={'1px'}
              ></Input>
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>
                {formik.values.isActive ? (
                  <Text>
                    This product is currently <span style={{ color: 'green' }}>Active</span>
                  </Text>
                ) : (
                  <Text>
                    This product is currently <span style={{ color: 'red' }}>Inactive</span>
                  </Text>
                )}
              </FormLabel>
              <HStack border={'1px'} p={5} rounded={'md'}>
                <Switch
                  name="isActive"
                  colorScheme="green"
                  size={'lg'}
                  id="productStatus"
                  defaultChecked={productData?.is_active}
                  // isChecked={toggle}
                  // onChange={() => {
                  //   handleSwitchChange();
                  // }}
                  onChange={formik.handleChange}
                ></Switch>
                {/* <Text>{toggleText}</Text> */}
                <Text>Set this product status</Text>
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
              rounded={'full'}
            >
              Update
            </Button>
            <Button onClick={handleCancel} rounded={'full'}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ModalUpdateProduct;
