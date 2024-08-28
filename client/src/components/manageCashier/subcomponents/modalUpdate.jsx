import { Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import instance from '../../../api/axios'

function ModalUpdate({ isOpen, onClose, clickedData, getCashierData }) {
  const toast = useToast()
  const token = localStorage.getItem('token')

  const handleSubmit = async (data) => {
    try {
      data.id = clickedData.id
      if (clickedData.isEnabled === false) {
        data.isEnabled = true
      } else {
        data.isEnabled = false
      }

      await instance.patch('users/update-user', data, {
        headers: { Authorization: `Bearer ${token}` }
      }) //sending data to database
      getCashierData()
      toast({
        title: 'Success',
        description: `${clickedData.username} has been ${data.isEnabled === true ? 'enabled' : 'disabled'}`,
        status: 'success',
        duration: 4000,
        position: 'top'
      })
      onClose()
    } catch (err) {
      console.log(err.response.data.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      isEnabled: false
    },
    onSubmit: (values, action) => {
      handleSubmit(values)
      action.resetForm()
    }
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {clickedData.isEnabled === false ? <>Enable</> : <>Disable</>} <span style={{ color: 'blue' }}>{clickedData.username}</span>?
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody pb={8}>
              <FormControl>
                <FormLabel>
                  {clickedData.username} will be{' '}
                  {clickedData.isEnabled === false ? <>enabled, and he/she can log in to the website.</> : <>disabled and, he/she can't log in to the website.</>}{' '}
                </FormLabel>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" bg={'#3C6255'} color={'white'} colorScheme="blue" mr={3} _hover={{ bg: '#61876E' }} rounded={'full'}>
                {clickedData.isEnabled === false ? <>Enable</> : <>Disable</>}
              </Button>
              <Button onClick={onClose} rounded={'full'}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalUpdate
