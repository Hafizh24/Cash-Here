import { Flex, useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import ListCategory from '../components/category/ListCategory';
import AddCategory from '../components/category/AddCategory';
import { categoriesApi } from '../api/category';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const toast = useToast();

  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoriesApi.getAll();

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
  }, []);

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
