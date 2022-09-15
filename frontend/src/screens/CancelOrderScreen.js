import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, useParams} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap'
import Header from '../components/Header'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {cancelOrder} from '../actions/orderActions'
import { emptyCart } from '../actions/cartActions'

function CancelOrderScreen() {

  const params = useParams()
  const orderId = params.id

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      }, "3000")
    }

    if(errorCancel){
      setTimeout(() => {
        navigate('/cart')
      }, "3000")
    }

  },[success, errorCancel])

  const confirmCancelOrderHandler = () => {
    if(order && orderId === order._id){
      dispatch(cancelOrder({id:order._id, reason:'test reason'}))
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
        <ListGroup>
          <ListGroup.Item>

            {!success ? (
              <Button type='button' className='btn btn-block btn-warning' onClick={confirmCancelOrderHandler}>
                Confirm Cancel
              </Button>
            ):
            (
              <Message variant='info'> {cancelInfo._id} has been cancelled </Message>
            )}

            </ListGroup.Item>
          </ListGroup> 
        </Row>
    </>
  )
}

export default CancelOrderScreen