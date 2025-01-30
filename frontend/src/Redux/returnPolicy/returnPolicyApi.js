import { apiSlice } from "../api/apiSlice";

export const returnPolicyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReturnPolicy: builder.query({
      query: () => ({
        url: "/return-policy",
        method: "GET",
      }),
      providesTags: ["returnPolicy"],
    }),

    addReturnPolicy: builder.mutation({
      query: (data) => ({
        url: "/return-policy/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["returnPolicy"],
    }),

    updateReturnPolicy: builder.mutation({
      query: ({ id, data }) => ({
        url: `/return-policy/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["returnPolicy"],
    }),
  }),
});

export const {
  useGetReturnPolicyQuery,
  useAddReturnPolicyMutation,
  useUpdateReturnPolicyMutation,
} = returnPolicyApi;
