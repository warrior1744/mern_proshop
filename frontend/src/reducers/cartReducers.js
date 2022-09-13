import { CART_ADD_ITEM,
         CART_REMOVE_ITEM,
         CART_SAVE_SHIPPING_ADDRESS,
         CART_SAVE_PAYMENT_METHOD,
         CART_EMPTY_ITEM
       } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippingAddress:{}}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const actionItem = action.payload
            const existItem = state.cartItems.find((item) => item.product === actionItem.product) //cart.cartItems:[{...}]
            if(existItem){
                return {
                    ...state, //no action, just return the state, so the application won't lose it's state
                    cartItems: state.cartItems.map((item) => item.product === existItem.product ? actionItem : item)
                    //Add item to cart and comparing the id. 
                    //Iterate the cart, if exist, add Add item, if not, add the item that already in the cart
                }
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, actionItem]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.product !== action.payload),
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        case CART_EMPTY_ITEM:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state
    }
}

