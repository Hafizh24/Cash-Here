const router = require('express').Router()
const { userController } = require('../controllers')
const { multerUpload } = require('../middleware/multer')
const { verifyToken } = require('../middleware/auth')
const { checkRegister, checkResetPassword } = require('../middleware/validator')

router.get('/user-login', userController.userLogin) //login user
router.get('/keep-login', verifyToken, userController.keepLogin) //keep login butuh verify token
router.patch('/change-img', verifyToken, multerUpload().single('image'), userController.updateImage)
router.post('/add-user', checkRegister, userController.addUser) //register user
router.post('/register', checkRegister, userController.addAdmin) //register admin
router.get('/get-user', verifyToken, userController.getUser)
router.patch('/update-user', verifyToken, userController.updateUser)
router.patch('/update-user-password', verifyToken, checkResetPassword, userController.updateUserPassword)
router.patch('/update-user-verified', verifyToken, userController.updateUserVerified) //update verified email cashier
router.get('/reset-password', userController.resetPassword)
router.delete('/delete-cashier/:id', verifyToken, userController.deleteCashier)

module.exports = router
