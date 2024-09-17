import { apiSlice } from "../api/apiSlice";

export const colorApi = apiSlice.injectEndpoints({
  tagTypes: ["color"],
  endpoints: (builder) => ({
    addColor: builder.mutation({
      query: (data) => ({
        url: `/color/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["color"],
    }),

    allColors: builder.query({
      query: () => ({
        url: `/color/all`,
      }),
      providesTags: ["color"],
    }),

    ColorById: builder.query({
      query: (id) => ({
        url: `/color/${id}`,
      }),
      providesTags: ["color"],
    }),

    deleteColor: builder.mutation({
      query: (id) => ({
        url: `/color/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["color"],
    }),

    editColor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/color/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["color"],
    }),
  }),
});

export const {
  useAddColorMutation,
  useAllColorsQuery,
  useDeleteColorMutation,
  useColorByIdQuery,
  useEditColorMutation,
} = colorApi;
