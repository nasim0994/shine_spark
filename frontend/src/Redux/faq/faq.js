import { apiSlice } from "../api/apiSlice";

export const faqApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: () => ({
        url: "/faq/all",
      }),
      providesTags: ["faq"],
    }),

    createFaq: builder.mutation({
      query: (formData) => ({
        url: `/faq/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["faq"],
    }),

    deleteFaqById: builder.mutation({
      query: (id) => ({
        url: `/faq/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faq"],
    }),

    updateFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faq/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),

    getFaqById: builder.query({
      query: (id) => ({
        url: `faq/${id}`,
        method: "GET",
      }),
      providesTags: ["faq"],
    }),
  }),
});

export const {
  useGetFaqQuery,
  useCreateFaqMutation,
  useDeleteFaqByIdMutation,
  useUpdateFaqMutation,
  useGetFaqByIdQuery,
} = faqApi;
