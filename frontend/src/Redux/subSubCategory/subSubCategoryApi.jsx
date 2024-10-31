import { apiSlice } from "../api/apiSlice";

export const subSubCategoryApi = apiSlice.injectEndpoints({
  tagTypes: ["sub_subCategory"],
  endpoints: (builder) => ({
    getSubSubCategories: builder.query({
      query: () => ({
        url: "/subSubCategory/all",
      }),
      providesTags: ["sub_subCategory"],
    }),

    getSubSubCategory: builder.query({
      query: (id) => ({
        url: `/subSubCategory/${id}`,
      }),
    }),

    addSubSubCategory: builder.mutation({
      query: (data) => ({
        url: `/subSubCategory/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sub_subCategory"],
    }),

    updateSubSubCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subSubCategory/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["sub_subCategory"],
    }),

    deleteSubSubCategory: builder.mutation({
      query: ({ id, subCategoryId }) => ({
        url: `/subSubCategory/delete/${id}`,
        method: "DELETE",
        body: { subCategoryId },
      }),
      invalidatesTags: ["sub_subCategory"],
    }),
  }),
});

export const {
  useGetSubSubCategoriesQuery,
  useGetSubSubCategoryQuery,
  useAddSubSubCategoryMutation,
  useUpdateSubSubCategoryMutation,
  useDeleteSubSubCategoryMutation,
} = subSubCategoryApi;
