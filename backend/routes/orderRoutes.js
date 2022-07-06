import express from 'express'
const router = express.Router()
import { addOrderItems,
         getOrderById,
         updateOrderToPaid,
         getMyOrders,
         getOrders,
         updateOrderToDelivered,
         getECPayment,
         savePaymentResult,
         getPaymentResult } from '../controllers/orderController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

//      '/api/orders'
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)

router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid) //update the order object, ex isPaid = true...
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

router.route('/ecpay/:id/payment').post(protect, getECPayment)
router.route('/ecpay/:id/savePaymentResult').post(savePaymentResult) //conducted by ECPay
router.route('/ecpay/:id/getPaymentResult').get(protect, getPaymentResult)


export default router