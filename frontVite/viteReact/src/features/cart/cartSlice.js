import { createSlice } from "@reduxjs/toolkit";
import { clearCartsFromLocal, getCartsFromLocal, setCartsLocal } from "../../hooks/local";


export const cartSlice = createSlice({
  name: 'cartSlice',

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
    },

    //clearCarts
    removeCart: (state, action) => {
      state.carts.splice(action.payload, 1);
      setCartsLocal(state.carts);

    },
    //removeCarts
    clearCarts: (state, action) => {
      state = [];
      clearCartsFromLocal();

    }

  }
})

export const { setCarts, clearCarts, removeCart } = cartSlice.actions