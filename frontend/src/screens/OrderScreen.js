import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link, useParams} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder, getECPayment} from '../actions/orderActions'
import { updateProductQty} from '../actions/productActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET, ORDER_CREATE_RESET, ORDER_DETAILS_RESET } from '../constants/orderConstants'
import { CART_EMPTY_ITEM} from '../constants/cartConstants'
import { ORDER_ECPAY_RESET} from '../constants/orderConstants'
import { Redirect } from 'react-router-dom'


//route '/order/:id'
export const OrderScreen = () => {

    const params = useParams()
    const orderId = params.id //check the pass order Id

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error} = orderDetails //current state of the details to show on the screen

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay} = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver} = orderDeliver

    const ecpayScreen = useSelector((state) => state.orderECPayment)
    const { loading: ecpayLoading, success: ecpaySuccess, ecpay} = ecpayScreen

    const [sdkReady, setSdkReady] = useState(false)

    if(!loading){
        const addDecimals = (num) => {
            return (Math.round(num * 100)/ 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }

        if(ecpaySuccess){
            //render ecpay.result page
            navigate('/ecpay')
        }

        const addPayPalScript = async () => {
            const { data:clientId } = await axios.get('/api/config/paypal') //get clientId from env
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay || order._id !== orderId || successDeliver){ //we also need to check if the details is passed by ProfileScreen that might be different
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, order, successDeliver, ecpaySuccess])

    const successPaymentHandler = (paymentResult) => {
        if(paymentResult.status === 'COMPLETED'){
            dispatch(payOrder(orderId, paymentResult))
        }else{
            throw new Error('The payment has failed')
        }
        // The return paymentResult information >>> {
        // create_time: "2022-06-22T08:21:27Z"
        // id: "9G347725GY476814C"
        // intent: "CAPTURE"
        // links: [{…}]
        // payer:
        // address: {country_code: 'US'}
        // email_address: "sb-bze6217163584@personal.example.com"
        // name: {given_name: 'John', surname: 'Doe'}
        // payer_id: "J2HB3MJVQJT4Q"
        // [[Prototype]]: Object
        // purchase_units: Array(1)
        // 0: {reference_id: 'default', amount: {…}, payee: {…}, shipping: {…}, payments: {…}}
        // length: 1
        // [[Prototype]]: Array(0)
        // status: "COMPLETED"
        // update_time: "2022-06-22T08:22:33Z" }
       
    }

    const successECPaymentHandler = (paymentResult) => {
        if(paymentResult.RtnMsg === '交易成功'){
            console.log('transaction successful')
        }else{
            throw new Error('The ECPayment has failed')
        }
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const cancelOrderHandler = () => {
        dispatch(updateProductQty(orderId, {cancelRequest: true}))
    }

    const getECPayHandler = () => {

        dispatch(getECPayment(order._id))
    }


    return (
        <>
            <Header/>
            {loading? <Loader type='red'/> : error ? <Message variant='danger'>{error}</Message>
            : <>
                    <h1>Order {order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p><strong>Name: </strong>{order.user.name}</p>
                                    <p><strong>Email: </strong><a href={`mailto:${order.user.email}`} >{order.user.email}</a></p>
                                    <p>
                                        <strong>Address:</strong>
                                        {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                        {order.shippingAddress.postalCode},{' '}
                                        {order.shippingAddress.country}
                                    </p>

                                    {order.isDelivered ? (<Message variant='success'> Delivered on {order.deliveredAt}</Message>
                                    ) : (<Message variant='danger'>Not Delivered</Message>)}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? ( <Message variant='success'> Paid on {order.paidAt}</Message>
                                    ) : (<Message variant='danger'>Not Paid</Message>)}
                                </ListGroup.Item>


                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0 ? <Message>Order is Empty</Message>
                                    : (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded/> 
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x${item.price} = ${item.qty * item.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {!order.isPaid && (
                                        <>
                                            {loadingPay && <Loader type='orange' />}
                                            <ListGroup.Item>
                                                {order.paymentMethod==='PayPal' &&(
                                                    !sdkReady? <Loader type='green'/> : (
                                                        <PayPalButton amount={order.totalPrice}
                                                        onSuccess={successPaymentHandler} />
                                                        )
                                                    )
                                                }
                                            </ListGroup.Item>

                                            <ListGroup>
                                                {order.paymentMethod==='ecPay' &&(
                                                    <ListGroup.Item>
                                                    <Row>
                                                        <Col md={7}>
                                                            <Image src='/images/ecpay.png' alt='ecpay' onClick={getECPayHandler}  fluid />
                                                        </Col>
                                                    </Row>
                                                    </ListGroup.Item>
                                                )}                                               
                                            </ListGroup>
                                        </>
                                    )}
                                    {loadingDeliver && <Loader type='blue'/>}
                                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>



                            <ListGroup>
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' onClick={cancelOrderHandler}>
                                            Cancel Order
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>                                  
                        </Col>
                    </Row>         
                </>
                
            }
        </>
    )
}

export default OrderScreen