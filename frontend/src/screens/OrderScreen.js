import React, { useEffect, useState } from "react";
import axios from "axios";
// import { PayPalButton } from "react-paypal-button-v2";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  getECPayment,
  getLineRequest,
} from "../actions/orderActions";
import { updateProductQtyByOrder } from "../actions/productActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_ECPAY_RESET,
} from "../constants/orderConstants";

import { cancelOrder } from "../actions/orderActions";
import { emptyCart } from "../actions/cartActions";
import { ORDER_CANCEL_RESET } from "../constants/orderConstants";
import CancelOrder from "../components/CancelOrder";

//route '/order/:id'
export const OrderScreen = () => {
  const [clientId, setClientId] = useState(null);
  const [cancelButton, setCancelButton] = useState(false);

  const params = useParams();
  const orderId = params.id; //check the passed order Id from createOrder

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderECPayment = useSelector((state) => state.orderECPayment);
  const { loading: ecpayLoading, ecpay } = orderECPayment;

  const orderLineRequest = useSelector((state) => state.orderLineRequest);
  const {
    loading: linePayLoading,
    success: lineSuccess,
    linepay,
  } = orderLineRequest;

  const orderCancel = useSelector((state) => state.orderCancel);
  const { cancelInfo, success: successOrderCancel } = orderCancel;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  useEffect(() => {
    const getPaypalClientId = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      setClientId(clientId);
    };

    if (!clientId) {
      getPaypalClientId();
    }

    if (!userInfo) {
      navigate("/login");
    }

    if (ecpay) {
      if (ecpay.result) {
        localStorage.setItem("ecpayState", ecpay.result);
      }
      dispatch({ type: ORDER_ECPAY_RESET });
      window.open("/ecpay", "_blank", "noreferrer");
    }

    if (
      !order ||
      successPay ||
      order._id !== orderId ||
      successDeliver ||
      successOrderCancel
    ) {
      console.log("Loading order details...");
      dispatch(getOrderDetails(orderId));
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
    } else {
      if (
        order.paymentMethod === "ecPay" &&
        order.paymentResult.status === "交易成功"
      ) {
        console.log("ecpay is successfully handled");
      }

      if (order.paymentMethod === "linePay" && !order.isPaid && lineSuccess) {
        if (linepay.returnMessage === "Success.") {
          window.open(linepay.info.paymentUrl.web, "_blank");
          // dispatch({ type: ORDER_LINEPAY_REQUEST_RESET})
        }

        //   //confirmUrl -> https://example.com/?transactionId=2022092100727542210&orderId=linepay632ab4989445ccf0bd4f4b6a
      }
    }
  }, [
    successOrderCancel,
    dispatch,
    orderId,
    successPay,
    JSON.stringify(order),
    successDeliver,
    ecpay,
    linepay,
  ]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
    dispatch(updateProductQtyByOrder(order));
  };

  //Paypal onApprove
  const successPaypalHandler = (details) => {
    const { status, purchase_units } = details;
    //returned details => {id: string, intent:'CAPTURE', status: 'COMPLETED', create_time:"Data format", payer: {address: {country_code: 'US'}, email_address: String, purchase_units: [{amount: {value: Number}, reference_id: "order._id"}]name: {given_name: 'John', surname: 'Doe}}}
    if (
      status === "COMPLETED" &&
      purchase_units[0].reference_id === order._id
    ) {
      dispatch(payOrder(order._id, details));
    } else {
      throw new Error(
        "The payment has completed but for the incorrect product, please contact support"
      );
    }
  };
  //ECPay
  const getECPayHandler = () => {
    dispatch(getECPayment(order._id));
  };
  //LinePay
  const getLinePayHandler = () => {
    dispatch(getLineRequest(order._id));
  };

  const cancelOrderHandler = () => {
    setCancelButton(true);
  };

  const confirmCancelOrder = (reason) => {
    if (order && orderId === order._id) {
      dispatch(cancelOrder({ id: order._id, reason }));
      dispatch(emptyCart()); //optional
    }
    setCancelButton(false);
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loader type="red" />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}{" "}
                    {order.shippingAddress.district}{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>

                  {order.isDelivered ? (
                    <Message variant="success">
                      {" "}
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success"> Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is Empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={3}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x${item.price} = $
                              {item.qty * item.price}
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
                <ListGroup variant="flush">
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
                      {loadingPay && <Loader type="orange" />}
                      {!order.isCancelled ? (
                        <ListGroup>
                          <ListGroup.Item>
                            {order.paymentMethod === "PayPal" && (
                              <PayPalScriptProvider
                                options={{
                                  "client-id": clientId,
                                  currency: "TWD",
                                  intent: "capture",
                                }}
                              >
                                <PayPalButtons
                                  createOrder={(data, actions) => {
                                    return actions.order.create({
                                      purchase_units: [
                                        {
                                          amount: {
                                            value: order.totalPrice,
                                          },
                                          reference_id: order._id,
                                        },
                                      ],
                                    });
                                  }}
                                  onApprove={async (data, actions) => {
                                    return actions.order
                                      .capture()
                                      .then((details) => {
                                        console.log("details", details);
                                        successPaypalHandler(details);
                                        const name =
                                          details.payer.name.given_name;
                                        console.log(
                                          `Transaction completed by ${name}`
                                        );
                                      });
                                  }}
                                ></PayPalButtons>
                              </PayPalScriptProvider>
                            )}
                          </ListGroup.Item>

                          {order.paymentMethod === "ecPay" && (
                            <ListGroup.Item>
                              <Row>
                                <Col md={7}>
                                  <Image
                                    src="/images/ecpay.png"
                                    alt="ecpay"
                                    onClick={getECPayHandler}
                                    fluid
                                  />
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          )}
                          {order.paymentMethod === "linePay" && (
                            <ListGroup.Item>
                              <Row>
                                <Col md={7}>
                                  <Image
                                    src="/images/linePay.png"
                                    alt="linepay"
                                    onClick={getLinePayHandler}
                                    fluid
                                  />
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          )}
                        </ListGroup>
                      ) : (
                        <ListGroup>
                          <ListGroup.Item>
                            <Badge bg="warning" text="dark">
                              <h1>This Order is Cancelled</h1>
                            </Badge>
                          </ListGroup.Item>
                        </ListGroup>
                      )}
                    </>
                  )}
                  {loadingDeliver && <Loader type="blue" />}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type="button"
                          className="btn btn-block"
                          onClick={deliverHandler}
                        >
                          Mark As Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                </ListGroup>
              </Card>

              {!order.isCancelled && !order.isPaid && !cancelButton && (
                <ListGroup>
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={cancelOrderHandler}
                    >
                      Cancel Order
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              )}

              {cancelButton && (
                <CancelOrder confirmCancelOrder={confirmCancelOrder} />
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
