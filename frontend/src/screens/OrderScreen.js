import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link, useParams, useNavigate} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder, getECPayment, getLineRequest} from '../actions/orderActions'
import { updateProductQtyByOrder} from '../actions/productActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET} from '../constants/orderConstants'
import { emptyCart } from '../actions/cartActions'


//route '/order/:id'
export const OrderScreen = () => {

    const params = useParams()
    const orderId = params.id //check the passed order Id from createOrder

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

    const orderECPayment = useSelector((state) => state.orderECPayment)
    const { loading: ecpayLoading, ecpay} = orderECPayment

    const orderLineRequest = useSelector((state) => state.orderLineRequest)
    const { loading: linePayLoading, success: lineSuccess, linepay} = orderLineRequest

    const [sdkReady, setSdkReady] = useState(false)

    if(!loading){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    }

    dispatch(emptyCart())

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }

        if(ecpay){ //when a html page is returned, navigate to the content
            navigate('/ecpay')
        }

        const addPayPalScript = async () => {
            const { data:clientId } = await axios.get('/api/config/paypal')//get clientId from env
            const script = document.createElement('script')
            script.type  = 'text/javascript'
            script.async = true
            script.src   = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay || order._id !== orderId || successDeliver){ //we also need to check if the details is passed by ProfileScreen that might be different
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        }else if(order.paymentMethod === 'PayPal' && !order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }else if(order.paymentMethod === 'ecPay' && order.paymentResult.status === '交易成功'){
            console.log('ecpay is successfully handled')
        }else if(order.paymentMethod === 'linePay' && !order.isPaid && lineSuccess){ 

            if(linepay.returnMessage === 'Success.'){
                window.open(linepay.info.paymentUrl.web, "_blank")
                // dispatch({ type: ORDER_LINEPAY_REQUEST_RESET})
            }
            //confirmUrl -> https://example.com/?transactionId=2022092100727542210&orderId=linepay632ab4989445ccf0bd4f4b6a
              
        }

    }, [dispatch, orderId, successPay, order, successDeliver, ecpay, linepay])
    
    //when Paypal button onSuccess is called
    const successPaymentHandler = (paymentResult) => { //Paypal returned message, please check README.md
        if(paymentResult.status === 'COMPLETED'){
            dispatch(payOrder(orderId, paymentResult))
        }else{
            throw new Error('The payment has failed')
        }
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
        dispatch(updateProductQtyByOrder(order))
    }

    const cancelOrderHandler = () => {
        navigate(`/cancel/${orderId}`) //orderId is params of the current component
    }

    const getECPayHandler = () => {
        dispatch(getECPayment(order._id))
    }

    const getLinePayHandler = () => {
        dispatch(getLineRequest(order._id))
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
                                                        <Col md={3}>
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
                                                {order.paymentMethod=== 'ecPay' ? (
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col md={7}>
                                                                <Image src='/images/ecpay.png' alt='ecpay' onClick={getECPayHandler}  fluid />
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ) : order.paymentMethod === 'linePay' ?(
                                                    <ListGroup.Item>
                                                    <Row>
                                                        <Col md={7}>
                                                            <Image src='/images/linePay.png' alt='linepay' onClick={getLinePayHandler}  fluid />
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                ) : {


                                                }}                                               
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


                            {!order.isCancelled &&
                            <ListGroup>
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' onClick={cancelOrderHandler}>
                                            Cancel Order
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup> 
                            }                                 
                        </Col>
                    </Row>         
                </>
                
            }
        </>
    )
}

export default OrderScreen