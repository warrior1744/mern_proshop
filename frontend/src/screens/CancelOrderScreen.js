import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, useParams} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, Form} from 'react-bootstrap'
import Header from '../components/Header'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {cancelOrder} from '../actions/orderActions'
import { emptyCart } from '../actions/cartActions'
import { ORDER_CANCEL_RESET } from '../constants/orderConstants'

function CancelOrderScreen() {

  const params = useParams()
  const orderId = params.id

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [reason, setReason] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error} = orderDetails //current state of the details to show on the screen

  const orderCancel = useSelector((state) => state.orderCancel)
  const { loading: loadingCancel , cancelInfo, success, error: errorCancel} = orderCancel

  useEffect(() => {

    if(success){
      setTimeout(() => {
        navigate('/cart')
        dispatch({type: ORDER_CANCEL_RESET})
      }, "3000")
    }

    if(errorCancel){
      setTimeout(() => {
        navigate('/cart')
        dispatch({type: ORDER_CANCEL_RESET})
      }, "3000")
    }

  },[success, errorCancel])

  const confirmCancelOrderHandler = (e) => {
    e.preventDefault()
    if(order && orderId === order._id){
      dispatch(cancelOrder({id:order._id, reason}))

      //also clear order details
      dispatch(emptyCart())
      
      
    }      
  }
  
  return (
    <>
        <Header/>

        <h1>Hi, {userInfo.name}, you are about to cancel the order {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                   <h2>Please check again the order to be cancelled</h2>
                   {order.orderItems.length === 0 ? <Message>Order is Empty</Message>
                   : (
                       <ListGroup variant='flush'>
                         {order.orderItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                              <Row>
                                <Col md={2}>
                                  <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col>
                                  {item.name}
                                </Col>
                                <Col md={4}>
                                  {item.qty} x${item.price} = ${item.qty * item.price}
                                </Col>
                              </Row>
                            </ListGroup.Item>
                         ))
                         }
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
                  </ListGroup>
              </Card>
          </Col>
        </Row>
        <Row>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>Your payment method is {order.paymentMethod}</Col>
              </Row>
              {order.isPaid > (
                <Row>
                <Col>You have already paid at {order.createdAt}</Col>
                </Row>
              )}
              {order.isDelivered > (
                <Row>
                <Col>The product has been delivered at {order.isDelivered}</Col>
                </Row>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Row>
        <Row>
            {!success ? (
              <div>
                <Form onSubmit={confirmCancelOrderHandler}>
                  <Form.Group controlId='reason'>
                    <Form.Label>Reason</Form.Label>
                    <Form.Control
                      style={{height:'180px', width:'auto'}}
                      maxLength={50}
                      className='mb-4'
                      as='textarea'
                      type='text'
                      placeholder='enter reason here...'
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}>
                    </Form.Control>
                  </Form.Group>
                  <Button type='submit' className='btn btn-block btn-warning'>
                    Confirm Cancel
                  </Button>
                </Form>
              </div>
            ):(
              <Message variant='info'> {cancelInfo._id} has been cancelled </Message>
            )}
        </Row>
    </>
  )
}

export default CancelOrderScreen