import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/port";

export const productApi = createApi({
  reducerPath: 'productApi',

  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),

  endpoints: (builder) => ({

    getProduct: builder.query({
      query: (q) => ({
        url: '/products',
        params: {
          search: q
        },
        method: 'GET',
      }),
      providesTags: 'Product'
    }),

    getTop5: builder.query({
      query: () => ({
        url: '/getTopProducts',
        method: 'GET'
      })
    }),

    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET'
      }),
      providesTags: ['Product']
    }),



    removeProduct: builder.mutation({

      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE'
      })

    })


  })
})

export const {
  useGetProductQuery,
  useGetTop5Query,
  useGetProductByIdQuery,
  useRemoveProductMutation
} = productApi;