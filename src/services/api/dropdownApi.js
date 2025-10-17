import { baseApi } from "./baseApi";

export const dropdownApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
  
    getCountries: build.query({
      query: () => "/dropdown/country", // Matches the backend route: GET /api/countries
      // Provides a cache tag. If another mutation invalidates 'Country', this query will be re-fetched.
      providesTags: ["Country"], 
    }),

   
  }),
  overrideExisting: false,
});

// Export the auto-generated hooks for use in components
export const {
  useGetCountriesQuery,
  useGetRolesQuery, // Example for another hook
} = dropdownApi;