
import React, { useEffect, useState} from 'react'
import { Link, useParams} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder, getECPayment} from '../actions/orderActions'
import { updateProductQty} from '../actions/productActions'







const ECPayment = () => {


  const ecpayScreen = useSelector((state) => state.orderECPayment)
const { loading: ecpayLoading, success: ecpaySuccess, ecpay} = ecpayScreen



// useEffect(() => {
//   const script = document.createElement('script')
//   script.type = 'text/javascript'
//   script.async = true
//   script.src = ecpay.result
//   document.body.appendChild(script)

//   return () => {
//     document.body.removeChild(script)
//   }

// }, [])


  return (


    <>
     
      </>
    
  )
}

export default ECPayment