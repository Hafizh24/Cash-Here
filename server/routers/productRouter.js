const router = require('express').Router()
const { productController } = require('../controllers')
const { multerUpload } = require('../middleware/multer')
const { verifyToken } = require('../middleware/auth')

router.post('/add-product', verifyToken, multerUpload().single('image'), productController.addProduct) //register user
router.get('/get-product', verifyToken, productController.getProduct)
router.get('/get-product-filter', verifyToken, productController.getProductByFilter)
router.patch('/update-product', verifyToken, multerUpload().single('image'), productController.updateProduct)
router.patch('/delete-product', verifyToken, productController.deleteProduct)

module.exports = router
