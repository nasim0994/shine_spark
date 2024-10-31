import { apiSlice } from "../api/apiSlice";

export const BrandApi = apiSlice.injectEndpoints({
  tagTypes: ["brand"],
  endpoints: (builder) => ({
    addBrand: builder.mutation({
      query: (formData) => ({
        url: `/brand/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["brand"],
    }),

    allBrands: builder.query({
      query: () => ({
        url: `/brand/all`,
      }),
      providesTags: ["brand"],
    }),

    brandById: builder.query({
      query: (id) => ({
        url: `/brand/${id}`,
      }),
      providesTags: ["brand"],
    }),

    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brand/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"],
    }),

    editBrand: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/brand/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["brand"],
    }),
  }),
});

export const {
  useAddBrandMutation,
  useAllBrandsQuery,
  useDeleteBrandMutation,
  useBrandByIdQuery,
  useEditBrandMutation,
} = BrandApi;
