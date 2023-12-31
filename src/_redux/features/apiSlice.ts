import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/sql' }),
  endpoints: (builder) => ({
    getUserData: builder.query<any, string>({
      query: (email) => `/getUser?email=${email}`,
    }),
  }),
})
// export {  } = taskApi.endpoints
export const { useGetUserDataQuery } = taskApi
// make a call to the next route
// next route will get from the api, and process the data
// returned data will be sent to redux
// and redux hook will just initialize the process