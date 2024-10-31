import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: () => ({
        url: "/user/allUsers",
      }),
      providesTags: ["users"],
    }),

    allCustomers: builder.query({
      query: () => ({
        url: "/user/allCustomers",
      }),
      providesTags: ["users"],
    }),

    editUserInfo: builder.mutation({
      query: ({ id, userInfo }) => ({
        url: `/user/update/info/${id}`,
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),

    updateUserPassword: builder.mutation({
      query: ({ id, info }) => ({
        url: `/user/update/password/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useAllCustomersQuery,
  useEditUserInfoMutation,
  useUpdateUserPasswordMutation,
} = userApi;
