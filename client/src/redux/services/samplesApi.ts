// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { addAuthHeader } from "../../utils/addAuthHeader";
// import type { Sample } from "../../interface/samples";
// const baseApiUrl = import.meta.env.VITE_API_URL;

// export const samplesApi = createApi({
//   reducerPath: "samplesApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: baseApiUrl,
//     prepareHeaders: addAuthHeader,
//   }),
//   tagTypes: ["Samples", "GetOneSample"],
//   endpoints: (builder) => ({
//     getOneSample: builder.query<Sample, string>({
//       query: (sampleId) => `samples/${sampleId}`,
//       transformResponse: (res: any) => res.response,
//       providesTags: ["GetOneSample"],
//     }),
//     getAssignedSamples: builder.query<
//       {
//         samples: Sample[];
//         totalPages: number;
//       },
//       { page: number; limit: number; search: string }
//     >({
//       query: ({ page, limit, search }) =>
//         `/samples/assigned?page=${page}&limit=${limit}&search=${search}`,
//       transformResponse: (res) => (res as any).response,
//       providesTags: ["Samples"],
//     }),
//     CreateSamplesCollection: builder.mutation<Sample, any>({
//       query: (payload) => ({
//         url: "samples-collection",
//         method: "POST",
//         body: payload,
//       }),
//       transformResponse: (res: any) => {
//         console.log("RTK Query raw response:", res);
//         return res.response;
//       },
//       invalidatesTags: ["Samples"],
//     }),

//     getAllSamplesCollection: builder.query<Sample, any>({
//       query: ({ page, limit }) =>
//         `/sample-collection?page=${page}&limit=${limit}`,
//       transformResponse: (res: any) => {
//         console.log("RTK Query raw response for getAllAPI:", res.response);
//         return res.response;
//       },
//       providesTags: ["Samples"],
//     }),
//   }),
// });

// export const {
//   useLazyGetAssignedSamplesQuery,
//   useCreateSamplesCollectionMutation,
//   useGetAllSamplesCollectionQuery,
//   useGetOneSampleQuery,
//   useGetAssignedSamplesQuery,
// } = samplesApi;
