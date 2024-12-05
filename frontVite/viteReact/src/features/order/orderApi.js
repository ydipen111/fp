import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/port";

export const orderApi = createApi({
  reducerPath: 'orderApi',

  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),

  endpoints: (builder) => ({

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

    addOrder: builder.mutation({

      query: (q) => ({
        url: '/orders',
        headers: {
          Authorization: `${q.token}`,
          // 'Content-Type': 'application/json',

        },

        body: q.body,
        method: 'POST'
      }),
      // invalidatesTags: ['Order']
    }),


  })
})

export const {
  useGetAllOrderQuery,
  useAddOrderMutation
} = orderApi;