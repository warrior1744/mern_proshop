import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import Header from "../components/Header";
import { savePaymentMethod } from "../actions/cartActions";

//route '/payment'
const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod: savedPaymentMethod } = cart;
  const [paymentMethod, setPaymentMethod] = useState(
    savedPaymentMethod || "PayPal"
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }

  }, [navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/login?redirect=placeorder");
  };

  const setPaymentMethodHandler = (e) => {
    setPaymentMethod(e.target.value)
    dispatch(savePaymentMethod(e.target.value));
  }

  return (
    <>
      <Header />
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="PayPal"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethodHandler(e)}
              ></Form.Check>

              <Form.Check
                type="radio"
                label="ecpay or Credit Card"
                id="ecPay"
                name="ecPay"
                value="ecPay"
                checked={paymentMethod === 'ecPay'}
                onChange={(e) => setPaymentMethodHandler(e)}
              ></Form.Check>

              <Form.Check
                type="radio"
                label="LINEpay"
                id="linePay"
                name="linePay"
                value="linePay"
                checked={paymentMethod === 'linePay'}
                onChange={(e) => setPaymentMethodHandler(e)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
