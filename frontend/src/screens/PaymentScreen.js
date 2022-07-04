import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'
import { Form, Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import Header from '../components/Header'
import { savePaymentMethod } from '../actions/cartActions'


//route '/payment'
const PaymentScreen = () => {

const dispatch = useDispatch()
const navigate = useNavigate()

const cart = useSelector(state => state.cart) //bugs appear here, cart info needs to be updated
const { shippingAddress } = cart

if(!shippingAddress){
  navigate('/shipping')
}

const [paymentMethod, setPaymentMethod] = useState('PayPal')


const submitHandler = (e) => {
  e.preventDefault()
  console.log(`paymentMethod >>> ${paymentMethod}`)
  dispatch(savePaymentMethod(paymentMethod))
  navigate('/placeorder')
}

  return (
    <>
      <Header/>
      <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check 
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked 
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check 
              type='radio'
              label='ecpay or Credit Card'
              id='ecPay'
              name='paymentMethod'
              value='ecPay'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

          </Col>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen