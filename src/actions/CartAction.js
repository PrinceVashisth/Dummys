import axios from "axios";
import {
  ADD_TO_CART, REMOVE_ALL_CART_ITEM,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/CartContant";
import { SERVER_URL } from "../constants/ServerConstant";

//add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  // Make the axios GET request to fetch product data
  const { data } = await axios.get(SERVER_URL + `/api/product/${id}`);
  // console.log("image:",data.product.image);
  // Dispatch the action with the retrieved product data
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id, //using product as id
      name: data.product.name,
      price: data.product.price,
      image: data.product.image,
      offPrice: data.product.offPrice,
      quantity,
    },
  });

  // Update localStorage with the latest cart items
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//remove from cart
export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeAllItemsFromCart = () => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ALL_CART_ITEM
  });
  sessionStorage.removeItem("orderInfo");
  localStorage.removeItem("cartItems");
};

//shipping information
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
