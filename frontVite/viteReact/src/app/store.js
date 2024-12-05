import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/auth/userSlice";
import { authApi } from "../features/auth/authApi";
import { productApi } from "../features/product/productApi";
import { cartSlice } from "../features/cart/cartSlice";
import { orderApi } from "../features/order/orderApi";


export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer
  },

  //CACHING, POING, AND
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat([
    authApi.middleware,
    productApi.middleware,
    orderApi.middleware
  ])
})