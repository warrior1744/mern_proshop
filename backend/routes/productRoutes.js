import express from 'express'
const router = express.Router()
import { getProductById,
         getProducts,
         deleteProductById, 
         updateProduct, 
         createProduct, 
         createProductReivew,
         getTopProducts,
         updateProductQty } from '../controllers/productController.js'
import { protect, admin} from '../middleware/authMiddleware.js'

//      '/api/products'
router.route('/')
      .get(getProducts)
      .post(protect, admin, createProduct)

router.route('/top').get(getTopProducts)

router.route('/:id')
      .get(getProductById)
      .delete(protect, admin, deleteProductById)
      .put(protect, admin, updateProduct)

router.route('/:id/reviews').post(protect, createProductReivew)

router.route('/qty/:id').post(protect, updateProductQty)


export default router