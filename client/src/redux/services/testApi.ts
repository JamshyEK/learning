import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addAuthHeader } from "../../utils/addAuthHeader";
import type {
  CompleteTestPayload,
  StartTestPayload,
} from "../../interface/test";
const baseApiUrl = import.meta.env.VITE_API_URL;

export const testApi = createApi({
  reducerPath: "testApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
    prepareHeaders: addAuthHeader,
  }),
  endpoints: (builder) => ({
    startTest: builder.mutation<void, StartTestPayload>({
      query: (payload) => ({
        url: "test/start",
        method: "POST",
        body: payload,
      }),
    }),
    completeTest: builder.mutation<void, CompleteTestPayload>({
      query: (payload) => ({
        url: "test/complete",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useStartTestMutation, useCompleteTestMutation } = testApi;
