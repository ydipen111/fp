import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/port.js";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),

  endpoints: (builder) => ({

    userLogin: builder.mutation({

      query: (query) => ({
        url: "/users/login",
        body: query,
        method: 'POST'

      })
    }),

    userSignUp: builder.mutation({

      query: (query) => ({
        url: "/users/signup",
        body: query,
        method: 'POST'
      })
    }),


  })
})

export const { useUserSignUpMutation, useUserLoginMutation } = authApi;