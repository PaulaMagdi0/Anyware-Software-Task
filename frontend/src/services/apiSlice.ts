import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:5000/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getQuizzes: builder.query({
      query: () => "/quizzes",
    }),
    getAnnouncements: builder.query({
      query: () => "/announcements",
    }),
  }),
});

export const {
  useLoginMutation,
  useGetQuizzesQuery,
  useGetAnnouncementsQuery,
} = apiSlice;
