import { apiSlice } from "../api/apiSlice";

export const topHeaderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTopHeader: builder.query({
      query: () => ({
        url: "/topHeader/all",
      }),
      providesTags: ["topHeader"],
    }),

    addTopHeader: builder.mutation({
      query: (formData) => ({
        url: `/topHeader/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["topHeader"],
    }),

    deleteTopHeader: builder.mutation({
      query: (id) => ({
        url: `/topHeader/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["topHeader"],
    }),

    updateTopHeader: builder.mutation({
      query: ({ id, data }) => ({
        url: `/topHeader/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["topHeader"],
    }),

    getTopHeaderById: builder.query({
      query: (id) => ({
        url: `/topHeader/${id}`,
        method: "GET",
      }),
      providesTags: ["topHeader"],
    }),
  }),
});

export const {
  useGetAllTopHeaderQuery,
  useAddTopHeaderMutation,
  useDeleteTopHeaderMutation,
  useUpdateTopHeaderMutation,
  useGetTopHeaderByIdQuery,
} = topHeaderApi;
