// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { addAuthHeader } from "../../utils/addAuthHeader";
// import type {
//   AppointmentPayload,
//   IAppointment,
// } from "../../interface/appointment";
// const baseApiUrl = import.meta.env.VITE_API_URL;

// export const appointmentApi = createApi({
//   reducerPath: "appointmentApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: baseApiUrl,
//     prepareHeaders: addAuthHeader,
//   }),
//   endpoints: (builder) => ({
//     createAppointment: builder.mutation<IAppointment, AppointmentPayload>({
//       query: (payload) => ({
//         url: "appointment",
//         method: "POST",
//         body: payload,
//       }),
//       transformResponse: (res: any) => res.data,
//     }),
//   }),
// });

// export const { useCreateAppointmentMutation } = appointmentApi;
