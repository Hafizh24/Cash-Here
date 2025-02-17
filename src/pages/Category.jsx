import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
// import AddCategory from './addCategory';
// import UpdateCategory from './updateCategory';
import axios from '../axios';
import UpdateCategory from '../components/category/UpdateCategory';
import AddCategory from '../components/category/AddCategory';

const Category = () => {
  const [data, setData] = useState([]);
  //   const token = localStorage.getItem('token');

  const fetchAPI = async () => {
    try {
      //   const response = await axios.get('categories', {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });
      const response = await axios.get('categories');

      setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <Flex minH={'100vh'} minW={'81vw'} align={'center'} justify={'center'} bgColor={'#f0f0ec'} direction={'column'}>
      <AddCategory fetchAPI={fetchAPI} />
      <UpdateCategory data={data} fetchAPI={fetchAPI} />
    </Flex>
  );
};

export default Category;
