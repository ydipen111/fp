import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/auth/userSlice";
import { authApi } from "../features/auth/authApi";
import { productApi } from "../features/product/productApi";


export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer
  },

  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat([
    authApi.middleware,
    productApi.middleware
  ])
})