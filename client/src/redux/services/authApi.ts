import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addAuthHeader } from "../../utils/addAuthHeader";
import { roles } from "../../interface/role";
import { endPoints } from "../../utils/endPoints";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
interface LoginResponse {
  token: string;
  role: roles;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface User {
  name: string;
}
const baseApiUrl = import.meta.env.VITE_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseApiUrl}`,
    prepareHeaders: addAuthHeader,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: endPoints.REGISTER,
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: endPoints.LOGIN,
        method: "POST",
        body,
      }),
      transformResponse: (response: { response: LoginResponse }) =>
        response.response,
    }),
    profile: builder.query<User, void>({
      query: () => "/user/profile",
      transformResponse: (response: { response: User }) => response.response,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useProfileQuery } =
  authApi;
