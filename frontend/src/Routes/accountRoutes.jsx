/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import Spinner from "@/components/shared/Spinner/Spinner";
const PrivateRoute = React.lazy(() => import("@/PrivateRoute/PrivateRoute"));
const AccountLayout = React.lazy(() => import("@/Layout/AccountLayout"));
const EditProfile = React.lazy(
  () => import("@/pages/Account/EditProfile/EditProfile"),
);
const OrderDetailsPage = React.lazy(
  () => import("@/pages/Account/OrderDetails/OrderDetails"),
);
const Orders = React.lazy(() => import("@/pages/Account/Orders/Orders"));
const Profile = React.lazy(() => import("@/pages/Account/Profile/Profile"));
const MyReviews = React.lazy(() => import("@/pages/Account/Reviews/MyReviews"));
const Setting = React.lazy(() => import("@/pages/Account/Setting/Setting"));

export const accountRoutes = {
  path: "/account",
  element: (
    <Suspense fallback={<Spinner />}>
      <PrivateRoute>
        <AccountLayout />
      </PrivateRoute>
    </Suspense>
  ),
  children: [
    {
      path: "/account/profile",
      element: <Profile />,
    },
    {
      path: "/account/profile/edit",
      element: <EditProfile />,
    },
    {
      path: "/account/orders",
      element: <Orders />,
    },
    {
      path: "/account/orders/:id",
      element: <OrderDetailsPage />,
    },
    {
      path: "/account/reviews",
      element: <MyReviews />,
    },
    {
      path: "/account/setting",
      element: <Setting />,
    },
  ],
};
