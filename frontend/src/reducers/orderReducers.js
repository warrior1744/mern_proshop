import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_RESET,
  ORDER_CANCEL_FAIL,
  ORDER_CANCEL_REQUEST,
  ORDER_CANCEL_RESET,
  ORDER_CANCEL_SUCCESS,
  ORDER_ECPAY_FAIL,
  ORDER_ECPAY_REQUEST,
  ORDER_ECPAY_RESET,
  ORDER_ECPAY_SUCCESS,
  ORDER_LINEPAY_REQUEST_FAIL,
  ORDER_LINEPAY_REQUEST_REQUEST,
  ORDER_LINEPAY_REQUEST_RESET,
  ORDER_LINEPAY_REQUEST_SUCCESS,
  ORDER_LINEPAY_CONFIRM_FAIL,
  ORDER_LINEPAY_CONFIRM_REQUEST,
  ORDER_LINEPAY_CONFIRM_RESET,
  ORDER_LINEPAY_CONFIRM_SUCCESS,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DETAILS_RESET:
      return { orderItems: [], shippingAddress: {} };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_MY_RESET:
      return {
        orders: { orders: [] },
      };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderCancelReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CANCEL_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CANCEL_SUCCESS:
      return {
        loading: false,
        cancelInfo: action.payload,
        success: true,
      };
    case ORDER_CANCEL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CANCEL_RESET:
      return {};
    default:
      return state;
  }
};

export const getECPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ECPAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_ECPAY_SUCCESS:
      return {
        loading: false,
        ecpay: action.payload,
      };
    case ORDER_ECPAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_ECPAY_RESET:
      return {};
    default:
      return state;
  }
};

export const getLineRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LINEPAY_REQUEST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LINEPAY_REQUEST_SUCCESS:
      return {
        loading: false,
        linepay: action.payload,
        success: true,
      };
    case ORDER_LINEPAY_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LINEPAY_REQUEST_RESET:
      return {};
    default:
      return state;
  }
};

export const getLineConfirmReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LINEPAY_CONFIRM_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LINEPAY_CONFIRM_SUCCESS:
      return {
        loading: false,
        linepay: action.payload,
        success: true,
      };
    case ORDER_LINEPAY_CONFIRM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LINEPAY_CONFIRM_RESET:
      return {};
    default:
      return state;
  }
};
