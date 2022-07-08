import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import ecpay_payment from 'ecpay_aio_nodejs'




// @desc Create new order (placeOrderHandler in PlaceOrderScreen Component)
// @route POST /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
    const { 
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
    } = req.body

    if( orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order Items')
    }else{
        const order = new Order({
            orderItems,
            user: req.user._id,  //remember the authMiddleware saves token and req.user
            shippingAddress,
            paymentResult:{id:'',status:'', update_time:'', email_address:''},
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})


// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        {
            path: 'user',
            select:'name email'
        })

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order Not Found!')
    }
})

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else {
        res.status(400)
        throw new Error('payment failed')

    }
})

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id})////remember the authMiddleware saves token and req.user
    res.json(orders)
})

// @desc Get all orders
// @route GET /api/orders/
// @access Private/Admin

const getOrders = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        'user.name' : {
            $regex: req.query.keyword,
            $options: 'im'
        }
    }: {}
    
    const count = await Order.countDocuments({...keyword})
    
    const orders = await Order.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1)).populate({
        path: 'user',
        select: 'id name email'
    })
    const orderList = {
        orders,
        page,
        pages: Math.ceil(count/pageSize)
    }
    
    res.json(orderList)
})


// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else {
        res.status(400)
        throw new Error('delivery failed')
    }
})


//**********************ECPay********************************** */
function create_UUID(stringLen){
    var dt = new Date().getTime();const stringArr = ['x','y'];let xyString = '';
    for(let i=0; i<stringLen; i++){ const randomEle = Math.floor(Math.random()* stringArr.length);let randomXY = stringArr[randomEle];xyString += randomXY;}
    let uuid = xyString.replace(/[xy]/g, function(c) { var r = (dt + Math.random()*16)%16 | 0;dt = Math.floor(dt/16);return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });return uuid;}
function barcode_generator(){var barcode ='/' + create_UUID(7);return barcode}
const onTimeValue = function () {
    var date = new Date();var mm = date.getMonth() + 1;var dd = date.getDate();var hh = date.getHours();var mi = date.getMinutes();var ss = date.getSeconds();
    return [date.getFullYear(), "/" + (mm > 9 ? '' : '0') + mm, "/" + (dd > 9 ? '' : '0') + dd, " " + (hh > 9 ? '' : '0') + hh, ":" + (mi > 9 ? '' : '0') + mi, ":" + (ss > 9 ? '' : '0') + ss].join('');};

// @desc Update order to delivered
// @route POST /api/orders/ecpay/:id/payment
// @access Private
// @desc when done successfuly ,will create html string and scrip tag data and return to the frontend
// @usage use these following test input when neccessary
        //Test Credit Card 4311-9522-2222-2222
        //Valid  12/25
        //Secure  222
const getECPayment = asyncHandler(async (req, res) => {

    const options = JSON.parse(process.env.ECPAY_OPTIONS)
    const order = await Order.findById(req.params.id)
    if(order){
        let resultOrder = ''
        order.orderItems.forEach(element => {
         resultOrder += element.name+'#'
        });
        resultOrder = resultOrder.slice(0, -1)//get orderItem string
        const total = Math.round(order.totalPrice).toString()

        let base_param = {
            MerchantTradeNo: create_UUID(20), //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
            MerchantTradeDate: onTimeValue(), //ex: 2017/02/13 15:45:30
            TotalAmount: total,   //
            TradeDesc: order.paymentMethod,
            ItemName: resultOrder,
            ReturnURL: `https://jimshop1984.herokuapp.com/api/orders/ecpay/${order._id}/savePaymentResult`,
            // ChooseSubPayment: '',
            // OrderResultURL: 'https://meadowlark1984.herokuapp.com/REST/ecpay/orderResult',
            // NeedExtraPaidInfo: 'Y',
            ClientBackURL: `https://jimshop1984.herokuapp.com/order/${order._id}`,
            // ItemURL: 'https://meadowlark1984.herokuapp.com',
            Remark: 'This is Remark',
            // HoldTradeAMT: '1',
            // StoreID: '',
            CustomField1: order.shippingAddress.address,
            CustomField2: order.shippingAddress.city,
            CustomField3: order.shippingAddress.postalCode,
            CustomField4: order.shippingAddress.country
            // Language: 'ENG'
        }
        let inv_params = {
            RelateNumber: create_UUID(30),  //請帶30碼uid ex: SJDFJGH24FJIL97G73653XM0VOMS4K
            CustomerID: '',  //會員編號
            CustomerIdentifier: '42845993',   //統一編號
            CustomerName: '張帥帥',
            CustomerAddr: '海奧華住宅',
            CustomerPhone: '0975661440',
            CustomerEmail: 'warrior1744@gmail.com',
            ClearanceMark: '2',
            TaxType: '1',
            CarruerType: '', //must be 3 when CustomerID is not empty
            CarruerNum: '',
            Donation: '0',
            LoveCode: '1234567',
            Print: '1', //can not be 1 when CustomerID is not empty
            InvoiceItemName: '哥吉拉玩偶|拉面|亂馬|手機|包包',
            InvoiceItemCount: '1|3|1|2|9',
            InvoiceItemWord: '個|碗|組|支|個',
            InvoiceItemPrice: '35|10|100|2000|30000',
            InvoiceItemTaxType: '1|1|1|1|1',
            InvoiceRemark: '測哥吉拉玩偶的說明|拉面的說明|亂馬的說明|手機的說明|包包的說明',
            DelayDay: '0',
            InvType: '07'
        }
        let ecpay = new ecpay_payment(options)
        let htm = ecpay.payment_client.aio_check_out_all(base_param,inv_params)
        res.json({result: htm})
    }else{
        res.status(400)
        throw new Error('order not found')
    }
})

// @desc Save order information to the database
// @route POST /api/orders/ecpay/:id/savePaymentResult
// @access Public
// @desc When POST /api/orders/ecpay/:id/payment called and the returned page is submitted
//       the ECpay server sends POST to the url as we passed the params with the ReturnURL

const savePaymentResult = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order && req.body.RtnMsg === '交易成功'){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.TradeNo, //bugs no data can be read
            status: req.body.RtnMsg,
            update_time: req.body.PaymentDate,
            email_address: ''
        }
        await order.save()

    }else {
        res.status(400)
        throw new Error('ECPayment failed')
    }
})


export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
    getECPayment,
    savePaymentResult
}