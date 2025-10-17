// src/services/api/baseApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL=import.meta.env.VITE_API_BASE_URL

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL, // set your API root
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
    credentials: "include", // if you use cookies; remove if not needed
  }),
  tagTypes: ["Auth", "User"],
  endpoints: () => ({}),
});
