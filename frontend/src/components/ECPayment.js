
import React, { useRef, useEffect} from 'react'
import {  useSelector } from 'react-redux'



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