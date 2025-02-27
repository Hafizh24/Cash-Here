import { Flex, useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import axios from '../axios';
import ListCategory from '../components/category/ListCategory';
import AddCategory from '../components/category/AddCategory';
import { useSelector } from 'react-redux';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const token = useSelector((state) => state.user.token);
  const toast = useToast();

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get('categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(response.data.data);
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response.data.message,
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    }
  }, [token, toast]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Flex minH={'100vh'} minW={'81vw'} align={'center'} justify={'center'} bgColor={'#f0f0ec'} direction={'column'}>
      <AddCategory fetchCategories={fetchCategories} />
      <ListCategory categories={categories} fetchCategories={fetchCategories} />
    </Flex>
  );
};

export default Category;
