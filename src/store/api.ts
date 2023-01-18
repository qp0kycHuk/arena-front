import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL, prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      headers.set('Accept', 'application/json')
      headers.set('X-Requested-With', 'XMLHttpRequest')
      return headers
    }
  }),
  endpoints: () => ({}),
})