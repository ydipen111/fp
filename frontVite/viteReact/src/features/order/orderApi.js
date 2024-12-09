import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/port";

export const orderApi = createApi({
  reducerPath: 'orderApi',

  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),

  endpoints: (builder) => ({

    //getting all order
    getAllOrder: builder.query({
      query: (token) => ({
        url: '/orders',
        headers: {
          Authorization: token,
        },
        method: 'GET'
      }),
      providesTags: ['Order']
    }),

    //getOrderByUser
    getUserOrder: builder.query({
      query: (token) => ({
        url: '/orders/users',
        headers: {
          Authorization: token
        },
        method: 'GET'
      }),
      providesTags: ['Order']
    }),


    //getOrderDetais
    getOrderDetails: builder.query({
      query: (q) => ({
        url: `/orders/users/${q.id}`,
        headers: {
          Authorization: q.token
        },
        method: 'GET'
      }),
      providesTags: ['Order']
    }),





    //addOrder
    addOrder: builder.mutation({
      query: (q) => ({
        url: `/orders`, // /${id}
        headers: {
          Authorization: `${q.token}`,
          'Content-Type': 'application/json',

        },

        body: q.body,
        method: 'POST'
      }),
      invalidatesTags: ['Order']
    }),



  })
})

export const {
  useGetAllOrderQuery,
  useAddOrderMutation,
  useGetUserOrderQuery,
  useGetOrderDetailsQuery
} = orderApi;