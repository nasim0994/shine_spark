import { Suspense } from "react";
import Spinner from "@/components/shared/Spinner/Spinner";
import AccountLayout from "@/Layout/AccountLayout";
import EditProfile from "@/pages/Account/EditProfile/EditProfile";
import OrderDetailsPage from "@/pages/Account/OrderDetails/OrderDetails";
import Orders from "@/pages/Account/Orders/Orders";
import Profile from "@/pages/Account/Profile/Profile";
import MyReviews from "@/pages/Account/Reviews/MyReviews";
import Setting from "@/pages/Account/Setting/Setting";
import PrivateRoute from "@/PrivateRoute/PrivateRoute";

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
