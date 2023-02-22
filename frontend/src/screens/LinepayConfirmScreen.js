import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getLineConfirm } from "../actions/orderActions";
import { useEffect } from "react";

function LinepayConfirmScreen() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const transactionId = searchParams.get("transactionId");
  const orderId = searchParams.get("orderId");

  const orderLineConfirm = useSelector((state) => state.orderLineConfirm);
  const { loading, success, linepay, error } = orderLineConfirm;

  const confirmLinepayHandler = () => {
    dispatch(getLineConfirm(transactionId, orderId));
    if (linepay.returnMessage === "Success.") {
    }
  };

  useEffect(() => {
    //when orderLineConfirm state is success and message is Success.
    //set the payment to be paid in db using dispatch
  }, []);

  return (
    <>
      {loading ? (
        <Loader type="red" />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Linepay Confirmation</h1>
          <p>Your LINEpay transaction ID is {transactionId}</p>
          <p>Your order ID is {orderId}</p>
          <Row>
            <Col md={8}>
              {orderId !== undefined &&
              transactionId !== undefined &&
              success === false ? (
                <ListGroup>
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={confirmLinepayHandler}
                    >
                      Confirm payment
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              ) : success && linepay.returnMessage === "Success." ? (
                <Message variant="success"> Paid</Message>
              ) : (
                <Message>Not Paid</Message>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default LinepayConfirmScreen;
