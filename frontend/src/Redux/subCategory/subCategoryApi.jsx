import { apiSlice } from "../api/apiSlice";

export const subCategoryApi = apiSlice.injectEndpoints({
  tagTypes: ["sub_category"],
  endpoints: (builder) => ({
    getSubCategories: builder.query({
      query: (query) => ({
        url: "/subCategory/all",
        params: query,
      }),
      providesTags: ["sub_category"],
    }),

    getSubCategory: builder.query({
      query: (id) => ({
        url: `/subCategory/${id}`,
      }),
    }),

    addSubCategory: builder.mutation({
      query: (data) => ({
        url: `/subCategory/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sub_category"],
    }),

    updateSubCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subCategory/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["sub_category"],
    }),

    deleteSubCategory: builder.mutation({
      query: ({ id, categoryId }) => ({
        url: `/subCategory/delete/${id}`,
        method: "DELETE",
        body: { categoryId },
      }),
      invalidatesTags: ["sub_category"],
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useGetSubCategoryQuery,
  useAddSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApi;
