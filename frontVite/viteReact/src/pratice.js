

dispatch(setCarts({
  name: product.product.title,
  qty: Number(formik.values.qty),
  image: product.product.image,
  price: product.product.price,
  product: product.product.product,
  stock: product.product.stock,
  rating: product.product.rating
}));








//////////////////////////////////
import { createSlice } from "@reduxjs/toolkit";
import { clearUser, getUserFromLocal, setUserToLocal } from "../../hooks/local";
import { getActiveElement } from "formik";
import { getCartsFromLocal, setCartsLocal } from "./hooks/local";

export const cartSlice = createSlice({
  name: "cartSlice",

  initialState: {
    user: getCartsFromLocal()
  },

  reducers: {

    setCarts: (state, action) => {

      const isExist = state.carts.find((cart) => cart.id === action.payload.id);//check the id
      if (isExist) {
        state.carts = state.carts((cart) => cart.id === isExist.id ? action.payload : cart);

      } else {
        state.carts.push(action.payload);
      }
    }
  }


})

export const { userAdd, userLogout } = userSlice.actions;