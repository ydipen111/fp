import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/port";

export const productApi = createApi({
  reducerPath: 'productApi',

  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),

  endpoints: (builder) => ({

    getProduct: builder.query({
      query: () => ({
        url: '/products',
        method: 'GET',

      })
    }),

    removeProduct: builder.mutation({

      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      })

    })


  })
})

export const {
  useGetProductQuery,
  useRemoveProductMutation
} = productApi;