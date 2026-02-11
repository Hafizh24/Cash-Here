/* eslint-disable react/prop-types */
import { Search2Icon } from '@chakra-ui/icons';
import { Button, Input, Select, Stack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import axios from '../api/client';
import { useSelector } from 'react-redux';

export default function Filter({ products, setFilteredProduct, setCurrentPage }) {
  const [categories, setCategories] = useState([]);
  const token = useSelector((state) => state.user.token);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data.data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchAndSort = (values) => {
    const keyword = values.name.toLowerCase();
    const filterCategory = parseInt(values.category);

    let filteredItems = products.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword) && (values.category === '' || item.category_id === filterCategory),
    );

    filteredItems.sort((a, b) => {
      const sortField = values.orderBy === 'ByPrice' ? 'price' : 'name';
      const isAscending = values.sortOrder === 'ASC';

      if (sortField === 'name') {
        return isAscending ? a[sortField].localeCompare(b[sortField]) : b[sortField].localeCompare(a[sortField]);
      }
      return isAscending ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
    });

    setFilteredProduct(filteredItems);
    setCurrentPage(1);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      orderBy: 'ByName',
      sortOrder: 'ASC',
    },
    onSubmit: (values) => {
      handleSearchAndSort(values);
    },
  });

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
          mb={4}
          focusBorderColor="#3C6255"
          border={'1px'}
        />
        <Select
          rounded={'full'}
          border={'1px'}
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          focusBorderColor="#3C6255"
        >
          <option value="">Select category</option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
        <Select
          rounded={'full'}
          border={'1px'}
          name="orderBy"
          value={formik.values.orderBy}
          onChange={formik.handleChange}
          focusBorderColor="#3C6255"
          _hover={{}}
        >
          <option value={'ByName'}>Sort by name</option>
          <option value={'ByPrice'}>Sort by price</option>
        </Select>
        <Select
          rounded={'full'}
          name="sortOrder"
          value={formik.values.sortOrder}
          onChange={formik.handleChange}
          focusBorderColor="#3C6255"
          border={'1px'}
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </Select>

        <Button rounded={'full'} type="submit" bgColor={'#3C6255'} _hover={{ bg: '#61876E' }} color={'white'}>
          <Search2Icon />
        </Button>
      </Stack>
    </form>
  );
}
