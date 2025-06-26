import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { githubUsername, githubToken } from "../config";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://api.github.com",
    prepareHeaders: (headers) => {
      if (githubToken) {
        headers.set('Authorization', `token ${githubToken}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/users/${githubUsername}`,
    }),
    getSocials: builder.query({
      query: () => `/users/${githubUsername}/social_accounts`,
    }),
    getProjects: builder.query({
      query: () => `/users/${githubUsername}/repos`,
    }),
  }),
});

export const { useGetUsersQuery, useGetSocialsQuery, useGetProjectsQuery } = apiSlice;
