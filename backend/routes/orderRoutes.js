import express from 'express'
const router = express.Router()
import { addOrderItems,
         getOrderById,
         updateOrderToPaid,
         getMyOrders,
         getOrders,
         updateOrderToDelivered,
         getECPayment,
        routeTest } from '../controllers/orderController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

//      '/api/orders'
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)

router.route('/routeTest').get(routeTest)

router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid) //update the order object, ex isPaid = true...
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

// router.route('/ecpay/:id/payment').post(protect, getECPayment)

router.route('/ecpay/:id/payment').post(protect, getECPayment)


export default router