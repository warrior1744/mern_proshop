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
         cancelOrder,
         deleteOrders,
       } from '../controllers/orderController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

//      '/api/orders'
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)

router.route('/myorders').get(protect, getMyOrders)
router.route('/delete').delete(protect, deleteOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid) //update the order object, ex isPaid = true...
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id/cancel').put(protect, cancelOrder)
router.route('/ecpay/:id/payment').post(protect, getECPayment)
router.route('/ecpay/:id/savePaymentResult').post(savePaymentResult) //conducted by ECPay



export default router