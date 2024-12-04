import { createSlice } from "@reduxjs/toolkit";
import { getCartsFromLocal, setCartsLocal } from "../../hooks/local";


export const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    carts: getCartsFromLocal()
  },

  reducers: {
    setCarts: (state, action) => {
      const isExist = state.carts.find((cart) => cart.product === action.payload.product);

      if (isExist) {
        state.carts = state.carts.map((cart) => cart.product === action.payload.product ? action.payload : cart);
        setCartsLocal(state.carts);
      } else {
        state.carts.push(action.payload);
        setCartsLocal(state.carts);
      }
    }
  }
})

export const { setCarts } = cartSlice.actions