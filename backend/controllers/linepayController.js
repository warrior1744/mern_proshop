
import Order from '../models/orderModel.js'
import crypto from 'crypto-js'
import axios from 'axios'
import asyncHandler from 'express-async-handler'
import {v4 as uuidv4} from 'uuid'



const lineAxios = axios.create({
            baseURL: process.env.LINE_URI_SANDBOX,
            // headers: {Authorization: `token ${GITHUB_TOKEN}` }
})
// encryption medthod

function __encrypt (method, api, body, nonce){
    const channelSecret = process.env.LINE_CHANNEL_SECRET_KEY
    let encrypt = null
    if (method === 'GET') {
      encrypt = crypto.HmacSHA256(channelSecret + api + body + nonce, channelSecret)
    }
    if (method === 'POST') {
      encrypt = crypto.HmacSHA256(channelSecret + api + JSON.stringify(body) + nonce, channelSecret)
    }
    return crypto.enc.Base64.stringify(encrypt)
}

function __header (method, api, body){
    let nonce = uuidv4()
    return {
        'Content-Type': 'application/json',
        'X-LINE-ChannelId': process.env.LINE_CHANNEL_ID,
        'X-LINE-Authorization-Nonce': nonce,
        'X-LINE-Authorization': __encrypt(method, api, body, nonce)
    }
}

//@desc Process linePay
//@rout /api/orders/linepay/:id/payment
//@access Private
// ID : test_202209192349@line.pay
// PW : test_202209192349	
// 如果您需要管理您自己伺服器的ACL(Access Control List),請註冊以下的LINE Pay server IP:
// 211.249.40.1~211.249.40.30
// https://sandbox-api-pay.line.me/

const getLineRequest = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    let body = {}
    let items = []
    const itemsPrice = order.orderItems.reduce((acc, item) =>
      acc + item.price * item.qty, 0)

    if(order.orderItems.length > 0){
      order.orderItems.forEach(item => {
        let obj = {}
        obj.name = item.name
        obj.quantity = item.qty
        obj.price = item.price
        items.push(obj)
      })
    }
    if(order){
      body = {
        amount: order.totalPrice - (order.shippingPrice + order.taxPrice),
        currency: 'TWD',
        orderId: 'linepay' + order._id,
        packages: [
          {
            id: order._id,
            amount: itemsPrice,
            name: 'Line Payment Sandbox',
            products: items
          }
        ],
        redirectUrls:{
          confirmUrl: 'https://www.google.com.tw',
          cancelUrl: 'https://www.twitter.com.tw'
        },
        options:{
          shipping:{
            feeAmount:order.shippingPrice + order.taxPrice,
          }
        }
      }
    }
    const uri = process.env.LINE_URI_SANDBOX
    const api = '/v3/payments/request'
    const lineHeader = __header('POST', api, body)
    const config = { headers: lineHeader }
    const {data} = await axios.post(uri+api, body, config)
    res.json(data) 
})



const getLineShippingFeeInquiry = asyncHandler(async (req, res) => {
  res.json({message:'shipping msg'})
})

const getLineConfirm = asyncHandler(async (req, res) => {
  res.json({message: 'confirm msg'})
})







//@desc Process linePay
//@rout /api/orders/linepay/:id/saveLinePaymentresult
//@access Public
const saveLinePaymentResult = asyncHandler(async (req, res) => {

    console.log('saveLinePaymentResult')
})



export {
    getLineRequest,
    saveLinePaymentResult,
}