import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/port.js";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),

  endpoints: (builder) => ({
    //login
    userLogin: builder.mutation({

      query: (query) => ({
        url: "/users/login",
        body: query,
        method: 'POST'

      })
    }),

    //userSignUp
    userSignUp: builder.mutation({

      query: (query) => ({
        url: "/users/signup",
        body: query,
        method: 'POST'
      })
    }),

    //userProfile
    userProfile: builder.query({
      query: (token) => ({
        url: `/profile`,
        headers: {
          Authorization: token,
        },
        method: 'GET'
      }),
      providesTags: ['Profile']
    }),


    //updateProfile
    updateUserProfile: builder.mutation({
      query: (q) => ({
        url: `/profile`,
        body: q.body,
        headers: {
          Authorization: q.token
        },
        method: 'PATCH'
      }),
      providesTags: ['User']

    })





  })
})

export const {
  useUserSignUpMutation,
  useUserLoginMutation,
  useUserProfileQuery,
  useUpdateUserProfileMutation
} = authApi;