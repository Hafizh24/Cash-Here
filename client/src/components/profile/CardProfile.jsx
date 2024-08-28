import { Avatar, AvatarBadge, Box, Button, Card, CardBody, Flex, FormControl, FormLabel, Input, Stack, Text, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { EditIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import instance from '../../api/axios'

const FILE_SIZE = 1024 * 1024
const SUPPORTED_FORMATS = ['image/jpg', 'image/gif', 'image/png', 'image/jpeg']

const validationSchema = Yup.object().shape({
  username: Yup.string().notRequired(),
  image: Yup.mixed()
    .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type))
    .test('fileSize', 'File size must be less than 1MB', (file) => {
      if (file) {
        return file.size <= FILE_SIZE
      } else {
        return true
      }
    })
    .notRequired()
})

const CardProfile = () => {
  const [selectedFile, setSelectedFile] = useState({ file: undefined, previewURI: undefined })
  const user = useSelector((state) => state.user.value)
  const token = localStorage.getItem('token')
  const toast = useToast()

  const handleSubmit = async (value) => {
    try {
      const data = new FormData()
      data.append('image', value)

      await instance.patch('users/change-img', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast({
        title: 'Success',
        description: `profile picture has been changed`,
        status: 'success',
        duration: 3000,
        position: 'top'
      })
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        status: 'error',
        duration: 3000,
        position: 'top'
      })
    }
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      image: null
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      handleSubmit(values.image)
      setTimeout(() => action.setSubmitting(false), 3000)
      // alert(JSON.stringify(values, null, 2));
    }
  })

  const handleChange = (e) => {
    const file = e.currentTarget.files[0]
    const reader = new FileReader()

    if (file) {
      reader.onloadend = () => {
        setSelectedFile({
          file,
          previewURI: reader.result
        })
      }
      reader.readAsDataURL(file)
      formik.setFieldValue('image', file)
    }
  }

  return (
    <>
      <Box display={'flex'} justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <Card w={'96'} h={'29rem'} mt={14}>
            <CardBody>
              <Flex alignItems={'center'} direction={'column'} rowGap={'10px'}>
                <Avatar
                  name={user?.username}
                  size={'xl'}
                  bg={'third'}
                  src={!formik.errors.image && selectedFile.previewURI ? selectedFile.previewURI : `http://localhost:2000/${user.image}`}>
                  <AvatarBadge boxSize={'0.9em'} bg={'white'} borderRadius={'full'}>
                    <FormControl>
                      <FormLabel cursor={'pointer'} htmlFor="image">
                        <EditIcon color={'black'} w={4} h={4} />
                        <Input
                          id="image"
                          name="image"
                          type="file"
                          display={'none'}
                          onChange={(e) => {
                            formik.setFieldTouched('image')
                            handleChange(e)
                          }}
                        />
                      </FormLabel>
                    </FormControl>
                  </AvatarBadge>
                </Avatar>
                {formik.errors.image && formik.touched.image ? <Text style={{ color: 'red' }}>{formik.errors.image}</Text> : null}
              </Flex>
              <Text mt={8} fontSize={'2xl'} color={'first'} letterSpacing={1}>
                Edit Profile
              </Text>
              <Stack mt={3} spacing="2">
                <FormControl mt={3}>
                  <FormLabel htmlFor="username" color={'first'}>
                    Username
                  </FormLabel>
                  <Input
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    border={'1px'}
                    placeholder={user?.username}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <Text mt={2} style={{ color: 'red' }}>
                      {formik.errors.username}
                    </Text>
                  ) : null}
                </FormControl>
                {/* <Text textAlign={'center'} fontSize={'2xl'}>
                  {user?.email}
                </Text> */}
              </Stack>
              <Flex justifyContent={'center'} mt={20}>
                <Button
                  type="submit"
                  w={280}
                  bgColor={'second'}
                  color={'white'}
                  size={'md'}
                  borderRadius={'xl'}
                  _hover={{
                    bgColor: 'third'
                  }}>
                  {!formik.isSubmitting ? 'Save' : 'Loading...'}
                </Button>
              </Flex>
            </CardBody>
          </Card>
        </form>
      </Box>
    </>
  )
}

export default CardProfile
