
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./port";



export const appApi = createApi({

  reducerPath: 'appApi',

  //baseQuery
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.18.108:1999/api',
    credentials: 'include'
  }),

  //endPoints
  endpoints: (builder) => ({})

});