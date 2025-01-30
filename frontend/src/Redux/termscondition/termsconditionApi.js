import { apiSlice } from "../api/apiSlice";

export const termsconditionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTermsCondition: builder.query({
      query: () => ({
        url: "/terms-condition",
        method: "GET",
      }),
      providesTags: ["termsconditionApi"],
    }),

    addTermsCondition: builder.mutation({
      query: (data) => ({
        url: "/terms-condition/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["termsconditionApi"],
    }),

    updateTermsCondition: builder.mutation({
      query: ({ id, data }) => ({
        url: `/terms-condition/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["termsconditionApi"],
    }),
  }),
});

export const {
  useGetTermsConditionQuery,
  useAddTermsConditionMutation,
  useUpdateTermsConditionMutation,
} = termsconditionApi;
