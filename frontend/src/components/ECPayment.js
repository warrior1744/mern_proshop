
import React, { useRef, useEffect, useState} from 'react'
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
  const contentRef = useRef()

  useEffect(() => {
    const fragment = document.createRange().createContextualFragment(ecpay.result)

    if(contentRef.current){
      contentRef.current.appendChild(fragment)
    }else{
      return
    }
  })

  return (

    <div ref={contentRef}/>

  )
}

export default ECPayment