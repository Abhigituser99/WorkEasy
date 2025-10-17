// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/api/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});
